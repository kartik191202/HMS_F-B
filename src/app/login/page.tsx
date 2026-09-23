"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Activity, Eye, EyeOff, LockKeyhole, ShieldCheck, User } from "lucide-react";
import { useAuth } from "@/providers/AuthProvider";

function ActivityIcon({ className = "h-6 w-6" }: { className?: string }) {
  return <Activity className={className} aria-hidden="true" />;
}

function UserIcon() {
  return <User className="h-4 w-4" aria-hidden="true" />;
}

function LockIcon() {
  return <LockKeyhole className="h-4 w-4" aria-hidden="true" />;
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  const Icon = hidden ? EyeOff : Eye;
  return <Icon className="h-4 w-4" aria-hidden="true" />;
}

function ShieldIcon() {
  return <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden="true" />;
}

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthLoading, login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && user) {
      router.replace("/dashboard");
    }
  }, [isAuthLoading, user, router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(username, password);
      router.replace("/dashboard");
    } catch (loginError) {
      setError(
        loginError instanceof Error ? loginError.message : "Login failed",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen w-full bg-brand-soft text-ink">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-brand p-10 text-white lg:flex">
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
            <ActivityIcon />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            MediNext HMS
          </span>
        </div>
        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight">
            Enterprise healthcare, simplified.
          </h1>
          <p className="mt-4 text-lg leading-7 text-white/80">
            Secure access to patient records, scheduling, billing, and clinical
            workflows — all in one place.
          </p>
          <div className="mt-10 grid gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <ShieldIcon />
              <p className="text-sm font-medium">
                Secure role-based access for your hospital team
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
              <ActivityIcon className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">
                Connected workflows for modern hospital operations
              </p>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-sm text-white/60">
          © {new Date().getFullYear()} MediNext Health Systems. All rights
          reserved.
        </p>
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-1/4 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      </section>

      <section className="flex w-full flex-col items-center justify-center px-6 py-10 lg:w-1/2 lg:p-12">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand text-white">
            <ActivityIcon />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            MediNext HMS
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-xl border border-brand-line bg-surface p-6 shadow-login sm:p-7"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              Sign in to access your hospital workspace.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                User ID
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle">
                  <UserIcon />
                </span>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your user ID"
                  autoComplete="username"
                  required
                  className="h-10 w-full rounded-md border border-line bg-transparent px-3 pl-10 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand/15"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle">
                  <LockIcon />
                </span>
                <input
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  className="h-10 w-full rounded-md border border-line bg-transparent px-3 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-ink-subtle focus:border-brand focus:ring-2 focus:ring-brand/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-subtle transition-colors hover:text-ink"
                >
                  <EyeIcon hidden={!showPassword} />
                </button>
              </div>
            </div>
          </div>
          {error && (
            <p
              role="alert"
              className="mt-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 h-10 w-full rounded-md bg-brand px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-brand/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
