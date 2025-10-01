import { useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  async function sendMagicLink(e: React.FormEvent) {
    e.preventDefault();
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(url, key);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) alert(error.message);
    else setSent(true);
  }

  return (
    <main style={{ maxWidth: 420, margin: "64px auto", fontFamily: "system-ui, Arial" }}>
      <h1>Sign in</h1>
      <p>We’ll email you a magic link.</p>
      {sent ? (
        <p>✅ Check your inbox for the link.</p>
      ) : (
        <form onSubmit={sendMagicLink}>
          <input
            type="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 12, margin: "12px 0" }}
          />
          <button type="submit" style={{ padding: "10px 16px" }}>Send Link</button>
        </form>
      )}
    </main>
  );
}
