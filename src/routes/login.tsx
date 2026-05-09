import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Admin Login — Vamshi" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account created! You can now sign in.");
        setMode("login");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center px-5">
      <div className="absolute inset-0 -z-10 grid-bg" />
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-aurora opacity-30 blur-3xl -z-10" />
      <form onSubmit={submit} className="glass rounded-3xl p-8 w-full max-w-md space-y-5">
        <div>
          <h1 className="text-2xl font-bold">{mode === "login" ? "Admin Sign In" : "Create Admin Account"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Owner-only access to edit portfolio content.
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm">Email</label>
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl bg-background/40 border border-border px-3 py-2.5 outline-none focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm">Password</label>
          <input
            type="password" required minLength={6} value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl bg-background/40 border border-border px-3 py-2.5 outline-none focus:border-primary"
          />
        </div>
        <button
          type="submit" disabled={busy}
          className="w-full rounded-full bg-primary-gradient px-5 py-3 text-sm font-medium text-primary-foreground glow-ring disabled:opacity-60"
        >
          {busy ? "Please wait…" : mode === "login" ? "Sign In" : "Sign Up"}
        </button>
        <button
          type="button" onClick={() => setMode(mode === "login" ? "signup" : "login")}
          className="w-full text-xs text-muted-foreground hover:text-foreground"
        >
          {mode === "login" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <Link to="/" className="block text-center text-xs text-muted-foreground hover:text-foreground">← Back to portfolio</Link>
      </form>
    </main>
  );
}
