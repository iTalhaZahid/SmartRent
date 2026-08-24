import type { Metadata } from "next";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthShell } from "@/components/auth/auth-shell";
import { getSafeRedirectPath } from "@/lib/auth/redirect";
import { signupAction } from "../actions";

export const metadata: Metadata = { title: "Create account", description: "Create your free SmartRent account." };

export default async function RegisterPage({ searchParams }: PageProps<"/register">) {
  const params = await searchParams;
  const next = getSafeRedirectPath(typeof params.next === "string" ? params.next : undefined);
  const initialRole = params.role === "OWNER" ? "OWNER" : "RENTER";

  return (
    <AuthShell eyebrow="Join SmartRent" title="Create your account" description="Tell us how you’ll use SmartRent. You can be ready in under a minute.">
      <AuthForm mode="signup" action={signupAction} next={next} initialRole={initialRole} />
    </AuthShell>
  );
}
