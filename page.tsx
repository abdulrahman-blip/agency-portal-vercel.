
import TabBar from "./TabBar";
import { supabase } from "./supabase";

async function getCounts(){
  const [a,b,c] = await Promise.all([
    supabase.from("agencies").select("*",{ count:"exact", head:true }),
    supabase.from("agencies").select("*",{ count:"exact", head:true }).eq("status","Verified"),
    supabase.from("bookings").select("*",{ count:"exact", head:true }),
  ]);
  return { totalAgencies: a.count ?? 0, verifiedAgencies: b.count ?? 0, totalBookings: c.count ?? 0 };
}

export default async function Page(){
  const s = await getCounts();
  return (
    <main className="container-nice space-y-6">
      <TabBar />
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card"><div className="text-3xl font-bold">{s.totalAgencies}</div><div>Total Agencies</div></div>
        <div className="card"><div className="text-3xl font-bold">{s.verifiedAgencies}</div><div>Verified</div></div>
        <div className="card"><div className="text-3xl font-bold">{s.totalBookings}</div><div>Total Bookings</div></div>
      </div>
    </main>
  );
}
