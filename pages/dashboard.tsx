import { useEffect, useState } from "react";
import { getSupa } from "../lib/supaClient";

export default function Dashboard() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const supa = getSupa(); // ينشأ وقت التشغيل
      const { data: { user } } = await supa.auth.getUser();
      setEmail(user?.email ?? null);
      // ... بقية الاستعلامات
    })();
  }, []);

  return <main style={{ padding: 24 }}>Dashboard {email ? `(${email})` : ""}</main>;
}
