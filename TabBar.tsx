
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const tabs = [
  { href: "/", label: "Overview" },
  { href: "/services/hotels", label: "Hotels" },
  { href: "/services/activities", label: "Activities" },
  { href: "/services/translators", label: "Translators" },
  { href: "/services/drivers", label: "Drivers" },
  { href: "/bookings", label: "Bookings" },
  { href: "/invoices", label: "Invoices" },
  { href: "/profile", label: "Profile" },
];
export default function TabBar() {
  const pathname = usePathname();
  return <div className="flex gap-2 flex-wrap">{tabs.map(t=>(
    <Link key={t.href} href={t.href} className={`tab ${pathname===t.href ? "tab-active":""}`}>{t.label}</Link>
  ))}</div>;
}
