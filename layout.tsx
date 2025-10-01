
import "../styles/globals.css";
import Link from "next/link";

export const metadata = { title: "Agency Portal", description: "Travel Agency Dashboard (Vercel + Supabase)" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-900 text-white">
          <div className="container-nice flex items-center justify-between">
            <div className="font-bold">Agency Portal</div>
            <div className="flex gap-3">
              <Link href="/" className="hover:underline">Dashboard</Link>
              <Link href="/auth" className="hover:underline">Login</Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
