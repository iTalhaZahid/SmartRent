"use server";

import {headers} from "next/headers";
import {redirect} from "next/navigation";
import {z} from "zod";

import {getSafeRedirectPath} from "@/lib/auth/redirect";
import {loginSchema, signupSchema} from "@/lib/auth/validation";
import {createClient} from "@/lib/supabase/server";
import type {FormActionState} from "@/types/forms/action-state";

type AuthActionState = FormActionState;

const emptyState: AuthActionState = {};

function validationState(error: z.ZodError): AuthActionState {
  return {
    error: "Please check the highlighted fields.",
    fieldErrors: z.flattenError(error).fieldErrors,
  };
}

function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (normalized.includes("email not confirmed")) return "Confirm your email address before signing in.";
  if (normalized.includes("user already registered")) return "An account with this email already exists.";
  if (normalized.includes("email address") && normalized.includes("invalid")) {
    return "Enter a real email address that can receive your confirmation link.";
  }
  if (normalized.includes("password") && normalized.includes("weak")) {
    return "Choose a stronger password with uppercase, lowercase, and number characters.";
  }
  if (normalized.includes("signup") && normalized.includes("disabled")) {
    return "New account registration is temporarily unavailable.";
  }
  if (normalized.includes("database error")) {
    return "Your account could not be created right now. Please try again shortly.";
  }
  if (normalized.includes("fetch failed") || normalized.includes("network")) {
    return "SmartRent cannot reach the authentication service. Check the server connection and try again.";
  }
  if (normalized.includes("rate limit") || normalized.includes("too many")) {
    return "Too many attempts. Please wait a moment and try again.";
  }

  return "We could not complete that request. Please try again.";
}

export async function loginAction(_previousState: AuthActionState = emptyState, formData: FormData): Promise<AuthActionState> {
  void _previousState;
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) return validationState(parsed.error);

  const supabase = await createClient();
  const {error} = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return {error: friendlyAuthError(error.message)};

  const {data: claimsData} = await supabase.auth.getClaims();
  const userId = claimsData?.claims?.sub;
  const {data: profile} = userId ? await supabase.from("profiles").select("role").eq("id", userId).maybeSingle() : {data: null};
  if (profile?.role === "OWNER") redirect("/owner/properties");

  redirect(getSafeRedirectPath(formData.get("next")?.toString()));
}

export async function signupAction(_previousState: AuthActionState = emptyState, formData: FormData): Promise<AuthActionState> {
  void _previousState;
  const parsed = signupSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!parsed.success) return validationState(parsed.error);

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
  const next = getSafeRedirectPath(formData.get("next")?.toString());
  const emailRedirectTo = origin ? `${new URL(origin).origin}/auth/callback?next=${encodeURIComponent(next)}` : undefined;
  const supabase = await createClient();
  const {data, error} = await supabase.auth.signUp({
    email: parsed.data.email,
    password: parsed.data.password,
    options: {
      data: {full_name: parsed.data.fullName, role: parsed.data.role},
      emailRedirectTo,
    },
  });

  if (error) return {error: friendlyAuthError(error.message)};
  if (data.session) redirect(next);

  return {
    success: "Account created. Check your email and follow the confirmation link to continue.",
  };
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut({scope: "local"});
  redirect("/login");
}

export async function requestPasswordResetAction(formData: FormData) {
  const email = z.email().safeParse(formData.get("email"));
  if (!email.success) redirect("/login?reset=1&error=invalid_email");
  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL;
  const supabase = await createClient();
  const {error} = await supabase.auth.resetPasswordForEmail(email.data, {
    redirectTo: origin ? `${new URL(origin).origin}/auth/callback?next=${encodeURIComponent("/login?update=1")}` : undefined,
  });
  redirect(error ? "/login?reset=1&error=reset_failed" : "/login?reset=1&sent=1");
}

export async function updatePasswordAction(formData: FormData) {
  const password = z.string().min(8).safeParse(formData.get("password"));
  if (!password.success) redirect("/login?update=1&error=weak_password");
  const supabase = await createClient();
  const {data} = await supabase.auth.getClaims();
  if (!data?.claims?.sub) redirect("/login?reset=1&error=expired_reset");
  const {error} = await supabase.auth.updateUser({password: password.data});
  if (error) redirect("/login?update=1&error=reset_failed");
  redirect("/login?password_updated=1");
}
