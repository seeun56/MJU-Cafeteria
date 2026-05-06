import { useState, useEffect } from "react";
import menuData from "./menuData.json";

const MEAL_LABELS = { 조식: "🌅 조식", 중식: "☀️ 중식", 석식: "🌙 석식" };

function getTodayKey() {
  const t = new Date();
  return `${String(t.getMonth() + 1).padStart(2, "0")}.${String(t.getDate()).padStart(2, "0")}`;
}

function MealCard({ mealType, items }) {
  const empty = !items || items.length === 0;
  return (
    <div style={{
      background: empty ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.07)",
      borderRadius: 12, padding: "14px 16px", marginBottom: 10,
      border: empty ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(251,191,36,0.2)",
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
        color: empty ? "#555" : "#FBBF24", marginBottom: 10, textTransform: "uppercase",
      }}>
        {MEAL_LABELS[mealType]}
      </div>
      {empty ? (
        <div style={{ fontSize: 13, color: "#444", fontStyle: "italic" }}>휴무</div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {items.map((item, i) => (
            <span key={i} style={{
              background: "rgba(251,191,36,0.1)",
              border: "1px solid rgba(251,191,36,0.15)",
              borderRadius: 20, padding: "3px 10px",
              fontSize: 12, color: "#E5D8B0", lineHeight: 1.6,
            }}>
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function DayTab({ day, isToday, isSelected, onClick }) {
  const allEmpty = ["조식", "중식", "석식"].every(m => !day.meals[m]);
  return (
    <button onClick={onClick} style={{
      background: isSelected ? "rgba(251,191,36,0.15)" : isToday ? "rgba(251,191,36,0.07)" : "transparent",
      border: isSelected ? "1px solid rgba(251,191,36,0.5)" : isToday ? "1px solid rgba(251,191,36,0.25)" : "1px solid rgba(255,255,255,0.07)",
      borderRadius: 14, padding: "11px 8px", cursor: "pointer",
      textAlign: "center", flex: 1, minWidth: 48, transition: "all 0.15s",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 700, letterSpacing: "0.05em", marginBottom: 4,
        color: allEmpty ? "#444" : (isSelected || isToday) ? "#FBBF24" : "#777",
      }}>
        {day.dayName}
      </div>
      <div style={{
        fontSize: 15, fontWeight: 800,
        color: allEmpty ? "#333" : isSelected ? "#FBBF24" : "#bbb",
      }}>
        {day.date.split(".")[1]}
      </div>
      {isToday && (
        <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#FBBF24", margin: "5px auto 0" }} />
      )}
    </button>
  );
}

export default function App() {
  const todayKey = getTodayKey();
  const days = menuData.days;
  const initIdx = Math.max(0, days.findIndex(d => d.date === todayKey));
  const [selectedIdx, setSelectedIdx] = useState(initIdx);
  const selectedDay = days[selectedIdx];

  // PWA 서비스워커 등록
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/mju-cafeteria/sw.js").catch(() => {});
    }
  }, []);

  return (
    <div style={{
      minHeight: "100vh", background: "#0C0C0F",
      fontFamily: "'Pretendard Variable', 'Pretendard', -apple-system, sans-serif",
      color: "#E5E5E5",
    }}>
      {/* 헤더 */}
      <div style={{
        background: "linear-gradient(180deg, #111115 0%, #0C0C0F 100%)",
        borderBottom: "1px solid rgba(251,191,36,0.15)",
        padding: "env(safe-area-inset-top, 28px) 20px 20px",
        paddingTop: "max(28px, env(safe-area-inset-top))",
        position: "sticky", top: 0, zIndex: 10,
      }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          <div style={{
            fontSize: 10, letterSpacing: "0.2em", color: "#FBBF24",
            fontWeight: 700, marginBottom: 6, textTransform: "uppercase",
          }}>
            명지대학교 인문캠퍼스
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0, lineHeight: 1.2 }}>
            학생회관 식단
          </h1>
          <div style={{ fontSize: 11, color: "#555", marginTop: 5 }}>
            {menuData.weekLabel} · 업데이트 {menuData.updatedAt}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "20px 16px" }}>
        {/* 요일 탭 */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24, overflowX: "auto", paddingBottom: 4 }}>
          {days.map((day, i) => (
            <DayTab
              key={day.date} day={day}
              isToday={day.date === todayKey}
              isSelected={i === selectedIdx}
              onClick={() => setSelectedIdx(i)}
            />
          ))}
        </div>

        {/* 날짜 타이틀 */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>
            {selectedDay.date}({selectedDay.dayName})
          </div>
          {selectedDay.date === todayKey && (
            <span style={{
              background: "rgba(251,191,36,0.2)", border: "1px solid rgba(251,191,36,0.4)",
              borderRadius: 20, padding: "2px 10px", fontSize: 10, color: "#FBBF24", fontWeight: 700,
            }}>TODAY</span>
          )}
        </div>

        {/* 식단 카드 */}
        {["조식", "중식", "석식"].map(meal => (
          <MealCard key={meal} mealType={meal} items={selectedDay.meals[meal]} />
        ))}

        {/* 운영시간 */}
        <div style={{ marginTop: 28, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.06)", textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "#555", lineHeight: 1.8 }}>
            조식 08:00–09:00 · 중식 11:30–14:00 · 석식 17:00–18:30
          </div>
          <div style={{ fontSize: 10, color: "#333", marginTop: 4 }}>평일만 운영 · 학생회관 3층</div>
          <a
            href="https://www.mju.ac.kr/mjukr/8595/subview.do"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-block", marginTop: 12, fontSize: 11, color: "#555",
              textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: 1,
            }}
          >
            공식 홈페이지 →
          </a>
        </div>
      </div>
    </div>
  );
}
