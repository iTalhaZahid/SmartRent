"use client";

import {useActionState, useState} from "react";
import Link from "next/link";
import {AlertCircle, Building2, CheckCircle2, Eye, EyeOff, LoaderCircle, UserRound} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";
import type {FormActionState} from "@/types/forms/action-state";

export type AuthState = FormActionState;

export function ResetPasswordInput() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Input id="new-password" name="password" type={visible ? "text" : "password"} minLength={8} required autoComplete="new-password" className="pr-11" />
      <button type="button" onClick={() => setVisible((value) => !value)} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-500 hover:text-slate-900" aria-label={visible ? "Hide password" : "Show password"}>
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

type AuthAction = (state: AuthState, formData: FormData) => Promise<AuthState>;

export function AuthForm({mode, action, next = "/", initialError, initialRole = "RENTER"}: {mode: "login" | "signup"; action: AuthAction; next?: string; initialError?: string; initialRole?: "RENTER" | "OWNER"}) {
  const [state, formAction, pending] = useActionState(action, initialError ? {error: initialError} : {});
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isSignup = mode === "signup";
  const errorFor = (name: string) => state.fieldErrors?.[name]?.[0];

  return (
    <form action={formAction} className="min-w-0 space-y-5" noValidate>
      <input type="hidden" name="next" value={next} />
      {state.error && (
        <div role="alert" className="flex gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{state.error}</span>
        </div>
      )}
      {state.success && (
        <div role="status" className="flex gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-800">
          <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          <span>{state.success}</span>
        </div>
      )}

      {isSignup && (
        <div className="space-y-2">
          <Label htmlFor="fullName">Full name</Label>
          <Input id="fullName" name="fullName" value={fullName} onChange={(event) => setFullName(event.target.value)} autoComplete="name" placeholder="Your full name" aria-invalid={!!errorFor("fullName")} aria-describedby={errorFor("fullName") ? "fullName-error" : undefined} className="h-11 bg-white focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-teal-100" />
          {errorFor("fullName") && (
            <p id="fullName-error" className="text-sm text-red-600">
              {errorFor("fullName")}
            </p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email address</Label>
        <Input id="email" name="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" placeholder="you@example.com" aria-invalid={!!errorFor("email")} aria-describedby={errorFor("email") ? "email-error" : undefined} className="h-11 bg-white focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-teal-100" />
        {errorFor("email") && (
          <p id="email-error" className="text-sm text-red-600">
            {errorFor("email")}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
        </div>
        <div className="relative">
          <Input id="password" name="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={isSignup ? "new-password" : "current-password"} placeholder={isSignup ? "At least 8 characters" : "Enter your password"} aria-invalid={!!errorFor("password")} aria-describedby={errorFor("password") ? "password-error" : isSignup ? "password-hint" : undefined} className="h-11 bg-white pr-11 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-teal-100" />
          <button type="button" onClick={() => setShowPassword((shown) => !shown)} className="absolute inset-y-0 right-0 grid w-11 place-items-center text-slate-500 transition-colors hover:text-slate-900 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
        {errorFor("password") ? (
          <p id="password-error" className="text-sm text-red-600">
            {errorFor("password")}
          </p>
        ) : isSignup ? (
          <p id="password-hint" className="text-xs text-slate-500">
            Use 8+ characters with uppercase, lowercase, and a number.
          </p>
        ) : null}
      </div>

      {isSignup && (
        <fieldset className="space-y-3">
          <legend className="text-sm font-medium text-slate-900">I want to</legend>
          <div className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
            <RoleOption name="role" value="RENTER" checked={role === "RENTER"} icon={UserRound} title="Find a home" subtitle="I’m a renter" onChange={setRole} />
            <RoleOption name="role" value="OWNER" checked={role === "OWNER"} icon={Building2} title="List property" subtitle="I’m an owner" onChange={setRole} />
          </div>
          {errorFor("role") && <p className="text-sm text-red-600">{errorFor("role")}</p>}
        </fieldset>
      )}

      {!isSignup && (
        <Link href="/login?reset=1" className="block text-right text-sm font-medium text-teal-700 hover:underline">
          Forgot password?
        </Link>
      )}

      <Button type="submit" disabled={pending} className="h-11 w-full bg-teal-700 text-base shadow-sm hover:bg-teal-800 focus-visible:ring-2 focus-visible:ring-teal-200">
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? (isSignup ? "Creating account…" : "Signing in…") : isSignup ? "Create account" : "Sign in"}
      </Button>

      {isSignup && <p className="text-center text-xs leading-5 text-slate-500">By creating an account, you agree to SmartRent&apos;s terms of service and privacy policy.</p>}

      <p className="border-t border-slate-200 pt-5 text-center text-sm text-slate-600">
        {isSignup ? "Already have an account?" : "New to SmartRent?"}{" "}
        <Link href={`${isSignup ? "/login" : "/register"}${next === "/" ? "" : `?next=${encodeURIComponent(next)}`}`} className="font-semibold text-primary hover:text-teal-800 hover:underline">
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}

function RoleOption({name, value, checked, icon: Icon, title, subtitle, onChange}: {name: string; value: "RENTER" | "OWNER"; checked: boolean; icon: typeof UserRound; title: string; subtitle: string; onChange: (value: "RENTER" | "OWNER") => void}) {
  return (
    <label className={cn("relative flex min-h-20 min-w-0 cursor-pointer items-center gap-3 rounded-lg border bg-white p-3 text-left transition-all has-focus-visible:outline-none has-focus-visible:ring-2 has-focus-visible:ring-primary has-focus-visible:ring-offset-2", checked ? "border-primary bg-teal-50 shadow-[0_0_0_1px_#0f766e]" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50")}>
      <input className="sr-only" type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} />
      <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", checked ? "bg-teal-100 text-teal-800" : "bg-slate-100 text-slate-600")}>
        <Icon className="size-4" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold text-slate-900">{title}</span>
        <span className="mt-0.5 block text-xs text-slate-500">{subtitle}</span>
      </span>
    </label>
  );
}
