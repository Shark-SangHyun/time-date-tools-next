"use client";

import { useEffect, useMemo, useState } from "react";
import ToolShell from "@/components/ToolShell";
import ResultCard from "@/components/ResultCard";
import { Field } from "@/components/Field";
import { convertZonedToZoned, listCommonTimeZones } from "@/lib/tz";
import { readQS, writeQS } from "@/lib/urlState";

export default function TimeZonePage() {
  const zones = useMemo(() => listCommonTimeZones(), []);
  const [fromTz, setFromTz] = useState("Asia/Seoul");
  const [toTz, setToTz] = useState("America/New_York");
  const [dt, setDt] = useState("");

  useEffect(() => {
    const s = readQS({ fromTz: "Asia/Seoul", toTz: "America/New_York", dt: "" });
    setFromTz(s.fromTz);
    setToTz(s.toTz);
    setDt(s.dt);
  }, []);

  useEffect(() => {
    writeQS({ fromTz, toTz, dt });
  }, [fromTz, toTz, dt]);

  const result = dt ? convertZonedToZoned(dt, fromTz, toTz) : null;

  return (
    <ToolShell
      title="Time Zone Converter"
      subtitle="datetime-local + IANA time zone 입력. DST 자동 반영."
    >
      <div className="grid2">
        <div className="card stack">
          <Field label="From time zone (IANA)">
            <select value={fromTz} onChange={(e) => setFromTz(e.target.value)}>
              {zones.map((z) => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Local date & time">
            <input
              type="datetime-local"
              value={dt}
              onChange={(e) => setDt(e.target.value)}
            />
          </Field>

          <Field label="To time zone (IANA)">
            <select value={toTz} onChange={(e) => setToTz(e.target.value)}>
              {zones.map((z) => (
                <option key={z.value} value={z.value}>{z.label}</option>
              ))}
            </select>
          </Field>

          <div className="row">
            <button
              className="btn"
              type="button"
              onClick={() => {
                setFromTz(toTz);
                setToTz(fromTz);
              }}
            >
              Swap
            </button>
            <button
              className="btn"
              type="button"
              onClick={() => {
                setDt("");
              }}
            >
              Clear
            </button>
          </div>
        </div>

        <ResultCard title="Result">
          {!dt ? (
            <p className="muted">날짜/시간을 입력하세요.</p>
          ) : !result ? (
            <p className="muted">입력 형식을 확인하세요.</p>
          ) : (
            <>
              <div className="kv">
                <div className="k">To ({toTz})</div>
                <div className="v mono">{result.toISO}</div>
              </div>
              <div className="kv">
                <div className="k">Epoch (ms)</div>
                <div className="v mono">{String(result.epochMs)}</div>
              </div>
              <p className="muted">
                공유 링크는 주소창 쿼리스트링에 자동 저장됩니다.
              </p>
            </>
          )}
        </ResultCard>
      </div>
    </ToolShell>
  );
}
