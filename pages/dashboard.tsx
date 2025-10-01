import { useEffect, useState } from "react";
import { getSupa } from "../lib/supaClient";

type Hotel = { id: string; name: string; city: string | null; stars: number | null; net_price: number | null };

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const supa = getSupa();

        // من المفيد نعرف إذا المستخدم غير مسجّل
        const { data: { user }, error: userErr } = await supa.auth.getUser();
        if (userErr) throw userErr;
        setEmail(user?.email ?? null);

        // لو عندك RLS بتطلب مستخدم مسجّل، عدم الدخول رح يعطي خطأ أو صفر صفوف
        const { data, error } = await supa
          .from("hotels")
          .select("id,name,city,stars,net_price")
          .order("created_at", { ascending: false })
          .limit(20);

        if (error) throw error;
        setHotels((data ?? []) as Hotel[]);
      } catch (e: any) {
        setErr(e?.message ?? String(e));
        console.error("Dashboard error:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial", color: "#111", background: "#fff" }}>
      <h1 style={{ marginBottom: 8 }}>Dashboard</h1>
      <p style={{ marginTop: 0, opacity: 0.8 }}>
        {email ? `Signed in as ${email}` : "You are not signed in yet."}
      </p>

      {err && (
        <div style={{ marginTop: 16, padding: 12, border: "1px solid #f3c2c2", background: "#fff2f2", color: "#a40000" }}>
          <strong>Error:</strong> {err}
        </div>
      )}

      <h2 style={{ marginTop: 24 }}>Hotels</h2>
      {loading ? (
        <p>Loading…</p>
      ) : hotels.length === 0 ? (
        <p>No hotels yet.</p>
      ) : (
        <table cellPadding={8} style={{ borderCollapse: "collapse", border: "1px solid #ddd" }}>
          <thead>
            <tr>
              <th align="left">Name</th>
              <th align="left">City</th>
              <th align="left">Stars</th>
              <th align="left">Net Price</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((h) => (
              <tr key={h.id} style={{ borderTop: "1px solid #eee" }}>
                <td>{h.name}</td>
                <td>{h.city ?? "-"}</td>
                <td>{h.stars ?? "-"}</td>
                <td>{h.net_price ?? "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
