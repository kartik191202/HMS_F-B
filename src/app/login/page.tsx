"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

function ActivityIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M3 12h4l2.2-7 4.1 14 2.2-7H21"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M20 21a8 8 0 0 0-16 0" strokeLinecap="round" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return hidden ? (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 4.2A10.8 10.8 0 0 1 12 4c5 0 8.7 4 10 8a12.7 12.7 0 0 1-3.1 5.1M6.2 6.2A12.8 12.8 0 0 0 2 12c1.3 4 5 8 10 8 1 0 2-.2 2.9-.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <path
        d="M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z"
        strokeLinejoin="round"
      />
      <path
        d="m8.5 12 2.2 2.2 4.8-4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <main className="flex min-h-screen w-full bg-[#f4faf7] text-[#17352b]">
      <section className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#198754] p-10 text-white lg:flex">
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
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#198754] text-white">
            <ActivityIcon />
          </div>
          <span className="text-xl font-semibold tracking-tight">
            MediNext HMS
          </span>
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md rounded-xl border border-[#d8e9e0] bg-white p-6 shadow-[0_18px_45px_rgba(25,135,84,0.10)] sm:p-7"
        >
          <div className="mb-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-1 text-sm text-[#668078]">
              Sign in to access your hospital workspace.
            </p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                User ID
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#78948a]">
                  <UserIcon />
                </span>
                <input
                  id="username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Enter your user ID"
                  autoComplete="username"
                  required
                  className="h-10 w-full rounded-md border border-[#cfe1d8] bg-transparent px-3 pl-10 text-sm outline-none transition-colors placeholder:text-[#9aafa7] focus:border-[#198754] focus:ring-2 focus:ring-[#198754]/15"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#78948a]">
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
                  className="h-10 w-full rounded-md border border-[#cfe1d8] bg-transparent px-3 pl-10 pr-10 text-sm outline-none transition-colors placeholder:text-[#9aafa7] focus:border-[#198754] focus:ring-2 focus:ring-[#198754]/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78948a] transition-colors hover:text-[#17352b]"
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
            className="mt-6 h-10 w-full rounded-md bg-[#198754] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#157347] focus:outline-none focus:ring-2 focus:ring-[#198754]/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
