"use client";

import { useEffect, useState } from "react";
import ToolShell from "@/components/ToolShell";
import ResultCard from "@/components/ResultCard";
import { Field } from "@/components/Field";
import { breakdownMs, diffMs } from "@/lib/dateMath";
import { readQS, writeQS } from "@/lib/urlState";

export default function DateDiffPage() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  useEffect(() => {
    const s = readQS({ a: "", b: "" });
    setA(s.a);
    setB(s.b);
  }, []);

  useEffect(() => {
    writeQS({ a, b });
  }, [a, b]);

  const ms = a && b ? diffMs(a, b) : null;
  const br = ms == null ? null : breakdownMs(ms);

  return (
    <ToolShell title="Date Difference" subtitle="두 datetime-local의 차이를 계산합니다.">
      <div className="grid2">
        <div className="card stack">
          <Field label="Start (A)">
            <input type="datetime-local" value={a} onChange={(e) => setA(e.target.value)} />
          </Field>
          <Field label="End (B)">
            <input type="datetime-local" value={b} onChange={(e) => setB(e.target.value)} />
          </Field>
          <div className="row">
            <button className="btn" type="button" onClick={() => { setA(b); setB(a); }}>
              Swap
            </button>
            <button className="btn" type="button" onClick={() => { setA(""); setB(""); }}>
              Clear
            </button>
          </div>
        </div>

        <ResultCard title="Result">
          {ms == null ? (
            <p className="muted">A와 B를 입력하세요.</p>
          ) : (
            <>
              <div className="kv">
                <div className="k">Diff (ms)</div>
                <div className="v mono">{String(ms)}</div>
              </div>
              <div className="kv">
                <div className="k">Direction</div>
                <div className="v">{br?.sign === -1 ? "B earlier than A" : "B later than A"}</div>
              </div>
              <div className="kv">
                <div className="k">Breakdown</div>
                <div className="v mono">
                  {br ? `${br.days}d ${br.hours}h ${br.minutes}m ${br.seconds}s` : "-"}
                </div>
              </div>
            </>
          )}
        </ResultCard>
      </div>
    </ToolShell>
  );
}
