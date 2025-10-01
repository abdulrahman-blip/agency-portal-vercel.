import { useEffect, useState } from "react";
import { supa } from "../lib/supaClient";

type Hotel = {
  id: string;
  name: string;
  city: string | null;
  stars: number | null;
  net_price: number | null;
};

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supa.auth.getUser();
      setEmail(user?.email ?? null);

      // مثال: اسحب فنادق الوكالة (RLS يضمن وكالتك فقط)
      const { data, error } = await supa
        .from("hotels")
        .select("id,name,city,stars,net_price")
        .order("created_at", { ascending: false })
        .limit(20);

      if (!error && data) setHotels(data as Hotel[]);
      setLoading(false);
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui, Arial" }}>
      <h1>Dashboard</h1>
      <p>{email ? `Signed in as ${email}` : "Not signed in"}</p>

      <h2 style={{ marginTop: 24 }}>Hotels</h2>
      {loading ? <p>Loading…</p> : hotels.length === 0 ? <p>No hotels yet.</p> : (
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
            {hotels.map(h => (
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
