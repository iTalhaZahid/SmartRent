import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { loginAction } from "../actions";

export const metadata: Metadata = { title: "Sign in", description: "Sign in to your SmartRent account." };

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = getSafeRedirectPath(typeof params.next === "string" ? params.next : undefined);
  const initialError = params.error === "confirmation_failed"
    ? "That confirmation link is invalid or has expired. Please request a new one."
    : params.error === "invalid_confirmation_link"
      ? "That confirmation link is incomplete. Please open the latest link from your email."
      : undefined;

  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to SmartRent" description="Access your bookings, properties, and conversations.">
      <AuthForm mode="login" action={loginAction} next={next} initialError={initialError} />
    </AuthShell>
  );
}
