import { useState } from "react";
import { motion } from "framer-motion";
import { csrfToken } from "../csrf";

export default function LoginOverlay({ onLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const resp = await fetch("/clients/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-CSRF-Token": csrfToken(),
        },
        body: JSON.stringify({ client: { email, password } }),
      });

      const data = await resp.json();

      if (resp.ok) {
        onLoggedIn(data);
      } else {
        setError(data.error || "Invalid email or password.");
      }
    } catch (err) {
      setError("Something went wrong — check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="pointer-events-auto absolute bottom-10 left-1/2 w-[min(92vw,22rem)] -translate-x-1/2 rounded-2xl border border-line bg-surface/95 p-6 shadow-lg backdrop-blur"
    >
      <p className="font-display text-lg font-semibold text-ink">Welcome back</p>
      <p className="mt-1 text-sm text-ink-muted">Log in to step inside.</p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {error && <p className="rounded-md bg-danger-soft px-3 py-2 text-sm text-danger">{error}</p>}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="block w-full rounded-md border-line bg-surface text-sm shadow-sm focus:border-brand focus:ring-brand"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="block w-full rounded-md border-line bg-surface text-sm shadow-sm focus:border-brand focus:ring-brand"
        />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-ink hover:bg-brand-hover disabled:opacity-60"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
      </form>

      <p className="mt-3 text-center text-xs text-ink-muted">
        Don&rsquo;t have an account? <a href="/clients/sign_up" className="text-brand hover:text-brand-hover">Sign up</a>
      </p>
    </motion.div>
  );
}
