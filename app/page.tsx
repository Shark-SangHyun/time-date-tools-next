import Link from "next/link";
import { t } from "@/content";

export default function HomePage() {
  return (
    <section className="stack">
      <h1>{t.home.title}</h1>
      <p className="muted">{t.home.desc}</p>

      <div className="grid">
        <Link className="card" href="/tools/time-zone">
          <h2>{t.nav.timeZone}</h2>
          <p className="muted">Seoul ↔ New York, DST 자동 반영</p>
        </Link>

        <Link className="card" href="/tools/date-diff">
          <h2>{t.nav.dateDiff}</h2>
          <p className="muted">두 날짜/시간 차이 계산</p>
        </Link>

        <Link className="card" href="/tools/d-day">
          <h2>{t.nav.dday}</h2>
          <p className="muted">앞으로/지난 날짜 카운트</p>
        </Link>
      </div>
    </section>
  );
}
