import Link from "next/link";
import { t } from "@/content";

const items = [
  { href: "/", key: "home" },
  { href: "/tools/time-zone", key: "timeZone" },
  { href: "/tools/date-diff", key: "dateDiff" },
  { href: "/tools/d-day", key: "dday" },
] as const;

export default function Nav() {
  return (
    <header className="nav">
      <div className="container navInner">
        <Link className="brand" href="/">
          Time·Date
        </Link>
        <nav className="navLinks">
          {items.map((it) => (
            <Link key={it.href} href={it.href} className="navLink">
              {(t.nav as any)[it.key]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
