"use client";

import { useEffect, useState } from "react";
import ToolShell from "@/components/ToolShell";
import ResultCard from "@/components/ResultCard";
import { Field } from "@/components/Field";
import { dayCounter } from "@/lib/dateMath";
import { formatSignedDays } from "@/lib/format";
import { readQS, writeQS } from "@/lib/urlState";

export default function DDayPage() {
  const [date, setDate] = useState("");
  const [includeToday, setIncludeToday] = useState("0"); // "1" | "0"

  useEffect(() => {
    const s = readQS({ date: "", includeToday: "0" });
    setDate(s.date);
    setIncludeToday(s.includeToday);
  }, []);

  useEffect(() => {
    writeQS({ date, includeToday });
  }, [date, includeToday]);

  const r = date ? dayCounter(date, includeToday === "1") : null;
  const display = r ? formatSignedDays(r.adjusted) : null;

  return (
    <ToolShell title="D-Day / Day Counter" subtitle="날짜만 입력(YYYY-MM-DD). 오늘 포함 옵션 제공.">
      <div className="grid2">
        <div className="card stack">
          <Field label="Target date">
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Field>

          <Field label="Options" hint="오늘을 1일로 칠지 여부">
            <div className="row">
              <label className="chip">
                <input
                  type="radio"
                  name="inc"
                  value="0"
                  checked={includeToday === "0"}
                  onChange={(e) => setIncludeToday(e.target.value)}
                />
                미포함
              </label>
              <label className="chip">
                <input
                  type="radio"
                  name="inc"
                  value="1"
                  checked={includeToday === "1"}
                  onChange={(e) => setIncludeToday(e.target.value)}
                />
                포함
              </label>
            </div>
          </Field>

          <div className="row">
            <button className="btn" type="button" onClick={() => { setDate(""); }}>
              Clear
            </button>
          </div>
        </div>

        <ResultCard title="Result">
          {!date ? (
            <p className="muted">날짜를 입력하세요.</p>
          ) : !r ? (
            <p className="muted">입력 형식을 확인하세요.</p>
          ) : (
            <>
              <div className="kv">
                <div className="k">Display</div>
                <div className="v mono" style={{ fontSize: 22 }}>{display}</div>
              </div>
              <div className="kv">
                <div className="k">Raw diff days</div>
                <div className="v mono">{String(r.diffDays)}</div>
              </div>
              <div className="kv">
                <div className="k">Adjusted</div>
                <div className="v mono">{String(r.adjusted)}</div>
              </div>
            </>
          )}
        </ResultCard>
      </div>
    </ToolShell>
  );
}
