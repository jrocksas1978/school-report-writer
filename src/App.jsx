import { useState } from "react";

const AGE_GROUPS_BY_REGION = {
  UK: ["Early Years (3–5)", "KS1 (5–7)", "KS2 (7–11)", "KS3 (11–14)", "KS4 (14–16)", "Sixth Form (16–18)"],
  USA: ["Kindergarten", "Grade 1–2", "Grade 3–5", "Grade 6–8", "Grade 9–10", "Grade 11–12"],
  Australia: ["Foundation", "Year 1–2", "Year 3–4", "Year 5–6", "Year 7–8", "Year 9–10", "Year 11–12"],
  Canada: ["Junior Kindergarten", "Grade 1–3", "Grade 4–6", "Grade 7–9", "Grade 10–12"],
  India: ["Pre-Primary", "Class 1–4", "Class 5–8", "Class 9–10", "Class 11–12"],
  Africa: ["Grade R / Reception", "Grade 1–3", "Grade 4–6", "Grade 7–9", "Grade 10–12"],
};
const REGIONS = {
  UK: { label: "🇬🇧 UK", pupil: "Pupil", curriculum: "UK National Curriculum" },
  USA: { label: "🇺🇸 USA", pupil: "Student", curriculum: "US Common Core" },
  Australia: { label: "🇦🇺 Australia", pupil: "Student", curriculum: "Australian Curriculum" },
  Canada: { label: "🇨🇦 Canada", pupil: "Student", curriculum: "Canadian Curriculum" },
  India: { label: "🇮🇳 India", pupil: "Student", curriculum: "CBSE / ICSE" },
  Africa: { label: "🌍 Africa", pupil: "Learner", curriculum: "National Curriculum" },
};
const SUBJECTS = ["English", "Maths", "Science", "History", "Geography", "Art", "PE", "Music", "Computing", "Religious Studies", "PSHE", "General / Form Tutor"];
const TONES = ["Formal", "Warm", "Encouraging"];
const LENGTHS = ["Short (2–3 sentences)", "Medium (1 paragraph)", "Detailed (2–3 paragraphs)"];

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M3 11H2.5A1.5 1.5 0 011 9.5v-7A1.5 1.5 0 012.5 1h7A1.5 1.5 0 0111 2.5V3" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);
const SparkleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 1.5L10.5 7.5L16.5 9L10.5 10.5L9 16.5L7.5 10.5L1.5 9L7.5 7.5L9 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export default function App() {
  const [region, setRegion] = useState("UK");
  const [pupilName, setPupilName] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [subject, setSubject] = useState("");
  const [tone, setTone] = useState("Warm");
  const [length, setLength] = useState("Medium (1 paragraph)");
  const [strengths, setStrengths] = useState("");
  const [improvements, setImprovements] = useState("");
  const [extra, setExtra] = useState("");
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const reg = REGIONS[region];
  const grades = AGE_GROUPS_BY_REGION[region];
  const canGenerate = pupilName && ageGroup && subject && strengths;

  async function generateReport() {
    if (!canGenerate) return;
    setLoading(true); setReport(""); setError("");
    const lengthGuide = {
      "Short (2–3 sentences)": "2–3 sentences",
      "Medium (1 paragraph)": "one well-structured paragraph of 4–6 sentences",
      "Detailed (2–3 paragraphs)": "2–3 paragraphs covering progress, strengths, and next steps",
    }[length];
    const toneGuide = {
      Formal: "professional and formal, suitable for official school records",
      Warm: "warm and personal, showing genuine care for the pupil",
      Encouraging: "highly encouraging and positive while still being honest",
    }[tone];
    const prompt = `You are an experienced teacher writing an end-of-term report following the ${reg.curriculum}.\n${reg.pupil} name: ${pupilName}\nYear/Grade: ${ageGroup}\nSubject: ${subject}\nTone: ${toneGuide}\nLength: ${lengthGuide}\nStrengths: ${strengths}\n${improvements ? `Areas for improvement: ${improvements}` : ""}\n${extra ? `Additional context: ${extra}` : ""}\nWrite a professional report comment for ${pupilName}. Use their first name naturally. Flowing prose only, no bullet points, no heading.`;
    try {
      const res = await fetch("/.netlify/functions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setReport(data.text.trim());
    } catch (e) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleReset() {
    setReport(""); setStrengths(""); setImprovements(""); setExtra("");
    setPupilName(""); setAgeGroup(""); setSubject("");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f0f4f8", fontFamily: "'Georgia', serif" }}>
      <div style={{ background: "linear-gradient(135deg, #1a3a5c 0%, #2563a8 60%, #1e7fc4 100%)", padding: "36px 24px 28px", textAlign: "center", boxShadow: "0 4px 24px rgba(26,58,92,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", marginBottom: "8px" }}>
          <div style={{ color: "#93c5fd" }}><SparkleIcon /></div>
          <span style={{ color: "#93c5fd", fontSize: "12px", letterSpacing: "3px", textTransform: "uppercase" }}>AI-Powered</span>
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(22px,5vw,34px)", fontWeight: "700", margin: "0 0 8px" }}>School Report Writer</h1>
        <p style={{ color: "#bfdbfe", fontSize: "15px", margin: 0, fontStyle: "italic" }}>Professional reports in seconds — worldwide</p>
      </div>
      <div style={{ maxWidth: "680px", margin: "0 auto", padding: "28px 16px 48px" }}>
        <div style={cardStyle}>
          <h2 style={sectionHead}>🌍 Select Region</h2>
          <div style={pillGroup}>
            {Object.entries(REGIONS).map(([k, v]) => (
              <button key={k} onClick={() => { setRegion(k); setAgeGroup(""); setReport(""); }} style={pill(region === k)}>
                {region === k && <CheckIcon />} {v.label}
              </button>
            ))}
          </div>
          <div style={{ marginTop: "12px", background: "#eff6ff", borderRadius: "8px", padding: "10px 14px", fontSize: "13px", color: "#2563a8" }}>
            📚 <strong>{reg.curriculum}</strong> &nbsp;·&nbsp; Terminology: <strong>{reg.pupil}</strong>
          </div>
        </div>
        <div style={cardStyle}>
          <h2 style={sectionHead}>{reg.pupil} Details</h2>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>{reg.pupil}'s First Name *</label>
            <input value={pupilName} onChange={e => setPupilName(e.target.value)} placeholder="e.g. Emily" style={inputStyle} />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Year / Grade *</label>
            <div style={pillGroup}>{grades.map(g => <button key={g} onClick={() => setAgeGroup(g)} style={pill(ageGroup === g)}>{ageGroup === g && <CheckIcon />} {g}</button>)}</div>
          </div>
          <div>
            <label style={labelStyle}>Subject *</label>
            <div style={pillGroup}>{SUBJECTS.map(s => <button key={s} onClick={() => setSubject(s)} style={pill(subject === s)}>{subject === s && <CheckIcon />} {s}</button>)}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <h2 style={sectionHead}>Style</h2>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Tone</label>
            <div style={pillGroup}>{TONES.map(t => <button key={t} onClick={() => setTone(t)} style={pill(tone === t)}>{tone === t && <CheckIcon />} {t}</button>)}</div>
          </div>
          <div>
            <label style={labelStyle}>Length</label>
            <div style={pillGroup}>{LENGTHS.map(l => <button key={l} onClick={() => setLength(l)} style={pill(length === l)}>{length === l && <CheckIcon />} {l}</button>)}</div>
          </div>
        </div>
        <div style={cardStyle}>
          <h2 style={sectionHead}>Your Notes</h2>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Strengths & Achievements *</label>
            <textarea value={strengths} onChange={e => setStrengths(e.target.value)} placeholder="e.g. great problem solving, creative, participates well..." style={{ ...inputStyle, height: "90px", resize: "vertical" }} />
          </div>
          <div style={{ marginBottom: "18px" }}>
            <label style={labelStyle}>Areas for Improvement <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
            <textarea value={improvements} onChange={e => setImprovements(e.target.value)} placeholder="e.g. needs to check work more carefully..." style={{ ...inputStyle, height: "75px", resize: "vertical" }} />
          </div>
          <div>
            <label style={labelStyle}>Anything Else? <span style={{ color: "#94a3b8", fontWeight: 400 }}>(optional)</span></label>
            <textarea value={extra} onChange={e => setExtra(e.target.value)} placeholder="e.g. joined school play, SEN considerations..." style={{ ...inputStyle, height: "65px", resize: "vertical" }} />
          </div>
        </div>
        <button onClick={generateReport} disabled={!canGenerate || loading} style={{ width: "100%", padding: "16px", background: canGenerate && !loading ? "linear-gradient(135deg,#1a3a5c,#2563a8)" : "#cbd5e1", color: "#fff", border: "none", borderRadius: "12px", fontSize: "16px", fontWeight: "700", fontFamily: "'Georgia',serif", cursor: canGenerate && !loading ? "pointer" : "not-allowed", boxShadow: canGenerate && !loading ? "0 4px 16px rgba(37,99,168,0.3)" : "none", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
          {loading ? <><span style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>⟳</span> Writing report…</> : <><SparkleIcon /> Generate Report</>}
        </button>
        {!canGenerate && <p style={{ textAlign: "center", color: "#94a3b8", fontSize: "13px", marginTop: "8px" }}>Fill in name, grade, subject and strengths to continue</p>}
        {error && <div style={{ marginTop: "16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "10px", padding: "14px", color: "#dc2626", fontSize: "14px" }}>{error}</div>}
        {report && (
          <div style={{ marginTop: "28px", background: "#fff", borderRadius: "16px", boxShadow: "0 2px 20px rgba(26,58,92,0.12)", overflow: "hidden", animation: "fadeIn 0.4s ease" }}>
            <div style={{ background: "linear-gradient(135deg,#1a3a5c,#2563a8)", padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <div style={{ color: "#fff", fontWeight: "700", fontSize: "15px" }}>{pupilName}'s Report — {subject}</div>
                <div style={{ color: "#93c5fd", fontSize: "12px", marginTop: "2px" }}>{reg.label} · {ageGroup} · {tone}</div>
              </div>
              <button onClick={handleCopy} style={{ background: copied ? "#22c55e" : "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: "8px", color: "#fff", padding: "8px 14px", cursor: "pointer", fontSize: "13px", display: "flex", alignItems: "center", gap: "6px" }}>
                <CopyIcon /> {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div style={{ padding: "24px" }}>
              <p style={{ color: "#1e293b", fontSize: "16px", lineHeight: "1.8", margin: 0, fontFamily: "'Georgia',serif" }}>{report}</p>
            </div>
            <div style={{ borderTop: "1px solid #f1f5f9", padding: "14px 20px", display: "flex", gap: "10px" }}>
              <button onClick={generateReport} style={{ flex: 1, padding: "10px", background: "#eff6ff", color: "#2563a8", border: "1px solid #bfdbfe", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>↻ Regenerate</button>
              <button onClick={handleReset} style={{ flex: 1, padding: "10px", background: "#f8fafc", color: "#64748b", border: "1px solid #e2e8f0", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: "600" }}>+ New Report</button>
            </div>
          </div>
        )}
      </div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes fadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}input:focus,textarea:focus{outline:none;border-color:#2563a8!important;box-shadow:0 0 0 3px rgba(37,99,168,0.12)}`}</style>
    </div>
  );
}

const cardStyle = { background: "#fff", borderRadius: "16px", boxShadow: "0 2px 20px rgba(26,58,92,0.10)", padding: "28px 24px", marginBottom: "20px" };
const sectionHead = { color: "#1a3a5c", fontSize: "15px", fontWeight: "700", margin: "0 0 20px", textTransform: "uppercase", letterSpacing: "1.5px" };
const labelStyle = { display: "block", color: "#475569", fontSize: "13px", fontWeight: "600", marginBottom: "8px" };
const inputStyle = { width: "100%", padding: "11px 14px", border: "1.5px solid #e2e8f0", borderRadius: "10px", fontSize: "15px", fontFamily: "'Georgia',serif", color: "#1e293b", background: "#f8fafc", boxSizing: "border-box" };
const pillGroup = { display: "flex", flexWrap: "wrap", gap: "8px" };
const pill = (active) => ({ padding: "7px 14px", borderRadius: "999px", border: active ? "1.5px solid #2563a8" : "1.5px solid #e2e8f0", background: active ? "#eff6ff" : "#f8fafc", color: active ? "#1a3a5c" : "#64748b", fontSize: "13px", fontWeight: active ? "700" : "500", cursor: "pointer", display: "flex", alignItems: "center", gap: "5px" });
