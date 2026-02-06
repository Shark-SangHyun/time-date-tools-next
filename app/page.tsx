"use client";

import { useMemo, useState } from "react";

type TabKey = "diff" | "add" | "timestamp";

const TABS: Array<{ key: TabKey; label: string; desc: string }> = [
  { key: "diff", label: "날짜 차이", desc: "두 날짜/시간의 차이를 계산" },
  { key: "add", label: "더하기/빼기", desc: "기준 시간에 기간을 더하거나 빼기" },
  { key: "timestamp", label: "타임스탬프", desc: "Unix ↔ 날짜 변환" },
];

export default function Page() {
  const [tab, setTab] = useState<TabKey>("diff");
  const tabMeta = useMemo(() => TABS.find(t => t.key === tab)!, [tab]);

  return (
    <>
      <div className="header">
        <div>
          <div className="title">Time / Date Tools</div>
          <div className="subtitle">깔끔한 UI로 정리한 시간·날짜 계산기</div>
        </div>
        <div className="badge">
          <span>UI v1</span>
          <span className="mono">Next.js</span>
        </div>
      </div>

      <div className="grid">
        <section className="card">
          <div className="cardHead">
            <div>
              <div className="cardTitle">{tabMeta.label}</div>
              <div className="cardDesc">{tabMeta.desc}</div>
            </div>
            <div className="tabs" role="tablist" aria-label="tools">
              {TABS.map(t => (
                <button
                  key={t.key}
                  type="button"
                  className={`tab ${tab === t.key ? "tabActive" : ""}`}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="cardBody">
            {tab === "diff" && <DiffPanel />}
            {tab === "add" && <AddSubPanel />}
            {tab === "timestamp" && <TimestampPanel />}
          </div>
        </section>

        <aside className="card">
          <div className="cardHead">
            <div>
              <div className="cardTitle">결과 요약</div>
              <div className="cardDesc">현재 탭에서 계산된 결과를 보기 좋게 표시</div>
            </div>
          </div>
          <div className="cardBody">
            {/* TODO: 기존 결과 state를 여기로 연결 */}
            <div className="kv">
              <div className="kvItem">
                <div className="kvKey">상태</div>
                <div className="kvVal">연결 전</div>
              </div>
              <div className="kvItem">
                <div className="kvKey">힌트</div>
                <div className="kvVal">로직 state를 바인딩</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

function DiffPanel() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="row">
        <div>
          <div className="label">시작</div>
          <input className="input" type="datetime-local" />
        </div>
        <div>
          <div className="label">끝</div>
          <input className="input" type="datetime-local" />
        </div>
      </div>

      <div className="actions">
        <button className="btn btnPrimary" type="button">계산</button>
        <button className="btn btnGhost" type="button">초기화</button>
      </div>

      <div className="kv">
        <div className="kvItem">
          <div className="kvKey">차이(일)</div>
          <div className="kvVal">-</div>
        </div>
        <div className="kvItem">
          <div className="kvKey">차이(시간)</div>
          <div className="kvVal">-</div>
        </div>
      </div>
    </div>
  );
}

function AddSubPanel() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div>
        <div className="label">기준 날짜/시간</div>
        <input className="input" type="datetime-local" />
      </div>

      <div className="row">
        <div>
          <div className="label">일</div>
          <input className="input" type="number" placeholder="0" />
        </div>
        <div>
          <div className="label">시간</div>
          <input className="input" type="number" placeholder="0" />
        </div>
      </div>

      <div className="actions">
        <button className="btn btnPrimary" type="button">더하기</button>
        <button className="btn" type="button">빼기</button>
      </div>

      <div className="kv">
        <div className="kvItem">
          <div className="kvKey">결과</div>
          <div className="kvVal mono">-</div>
        </div>
      </div>
    </div>
  );
}

function TimestampPanel() {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="row">
        <div>
          <div className="label">Unix timestamp (초)</div>
          <input className="input mono" type="number" placeholder="예: 1700000000" />
        </div>
        <div>
          <div className="label">날짜/시간</div>
          <input className="input" type="datetime-local" />
        </div>
      </div>

      <div className="actions">
        <button className="btn btnPrimary" type="button">Unix → 날짜</button>
        <button className="btn" type="button">날짜 → Unix</button>
      </div>

      <div className="kv">
        <div className="kvItem">
          <div className="kvKey">결과</div>
          <div className="kvVal mono">-</div>
        </div>
      </div>
    </div>
  );
}
