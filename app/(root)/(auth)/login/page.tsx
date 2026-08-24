import type {Metadata} from "next";
import Link from "next/link";

import {AuthForm, ResetPasswordInput} from "@/components/auth/auth-form";
import {AuthShell} from "@/components/auth/auth-shell";
import {getSafeRedirectPath} from "@/lib/auth/redirect";
import {loginAction, requestPasswordResetAction, updatePasswordAction} from "@/queries/auth/auth-actions";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your SmartRent account.",
};

export default async function LoginPage({searchParams}: PageProps<"/login">) {
  const params = await searchParams;
  const next = getSafeRedirectPath(typeof params.next === "string" ? params.next : undefined);
  const reset = params.reset === "1";
  const update = params.update === "1";
  const initialError = params.error === "confirmation_failed" ? "That confirmation link is invalid or has expired. Please request a new one." : params.error === "invalid_confirmation_link" ? "That confirmation link is incomplete. Please open the latest link from your email." : undefined;

  return (
    <AuthShell eyebrow="Welcome back" title="Sign in to SmartRent" description="Access your bookings, properties, and conversations.">
      {reset ? (
        <form action={requestPasswordResetAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Email address</Label>
            <Input id="reset-email" name="email" type="email" required autoComplete="email" />
          </div>
          {params.sent === "1" && <p className="text-sm text-emerald-700">Check your email for the password reset link.</p>}
          {params.error && <p className="text-sm text-red-600">We could not send the reset link. Check the email and try again.</p>}
          <Button className="w-full">Send reset link</Button>
          <Button variant="ghost" className="w-full" asChild>
            <Link href="/login">Back to sign in</Link>
          </Button>
        </form>
      ) : update ? (
        <form action={updatePasswordAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="new-password">New password</Label>
            <ResetPasswordInput />
          </div>
          {params.error && <p className="text-sm text-red-600">Use at least 8 characters or request a new reset link.</p>}
          <Button className="w-full">Update password</Button>
        </form>
      ) : (
        <>
          <AuthForm mode="login" action={loginAction} next={next} initialError={initialError} />
          {params.password_updated === "1" && <p className="mt-4 text-center text-sm text-emerald-700">Password updated. You can now sign in.</p>}
        </>
      )}
    </AuthShell>
  );
}
