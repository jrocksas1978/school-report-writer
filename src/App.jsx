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
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor"
