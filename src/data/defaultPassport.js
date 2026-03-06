export const defaultPassport = {
  name: 'Diptanil Sen',
  nationality: 'Indian',
  role: 'Full Stack · Android · Systems Dev',
  years: 3,
  clearance: 'Self-Taught',
  issueYear: '2022',
  gender: 'boy',
  passportType: 'fullstack',
  theme: 'cyber',
  stacks: [
    { name: 'Java',       years: 3 },
    { name: 'C++',        years: 3 },
    { name: 'C',          years: 3 },
    { name: 'Python',     years: 2 },
    { name: 'React',      years: 2 },
    { name: 'JavaScript', years: 3 },
    { name: 'PostgreSQL', years: 2 },
    { name: 'SQLite',     years: 2 },
    { name: 'Docker',     years: 1 },
    { name: 'Android',    years: 2 },
    { name: 'Git',        years: 3 },
  ]
}

export const PASSPORT_TYPES = {
  fullstack:  { label: 'Full Stack',    badge: 'TYPE FS', icon: '⚡' },
  frontend:   { label: 'Frontend',      badge: 'TYPE FE', icon: '🎨' },
  backend:    { label: 'Backend',       badge: 'TYPE BE', icon: '⚙️' },
  devops:     { label: 'DevOps',        badge: 'TYPE DO', icon: '🐳' },
  mobile:     { label: 'Mobile Dev',    badge: 'TYPE MB', icon: '📱' },
  ml:         { label: 'ML Engineer',   badge: 'TYPE ML', icon: '🧠' },
  security:   { label: 'Security',      badge: 'TYPE SC', icon: '🔒' },
  gamedev:    { label: 'Game Dev',      badge: 'TYPE GD', icon: '🎮' },
}

export const THEMES = {
  cyber:    { name: 'Cyber Blue',      accent: '#00d4ff', accent2: '#ff6b35', accent3: '#7c3aed', bg: '#030712',   surface: '#0a0f1e', border: '#1a2744' },
  hacker:   { name: 'Hacker Green',   accent: '#00ff88', accent2: '#ff6b35', accent3: '#00cc66', bg: '#010f07',   surface: '#041a0d', border: '#0a3d1a' },
  blood:    { name: 'Blood Red',       accent: '#ff2244', accent2: '#ff8800', accent3: '#cc0033', bg: '#0f0306',   surface: '#1a040a', border: '#3d0a14' },
  purple:   { name: 'Midnight Purple', accent: '#bf00ff', accent2: '#ff6b35', accent3: '#7c3aed', bg: '#06010f',   surface: '#0d0420', border: '#2a1044' },
  gold:     { name: 'Golden Hour',     accent: '#fbbf24', accent2: '#f59e0b', accent3: '#d97706', bg: '#0a0800',   surface: '#141000', border: '#3d2e00' },
}

export function getLevel(stacks, years) {
  const score = stacks.length * 2 + years * 3
  if (score >= 60) return { label: 'LEGEND',    color: '#fbbf24', rank: 5 }
  if (score >= 40) return { label: 'PRINCIPAL',  color: '#bf00ff', rank: 4 }
  if (score >= 25) return { label: 'SENIOR',     color: '#00d4ff', rank: 3 }
  if (score >= 12) return { label: 'ENGINEER',   color: '#00ff88', rank: 2 }
  return                  { label: 'RECRUIT',    color: '#64748b', rank: 1 }
}

export const TECH_META = {
  'java':       { icon: '☕', color: '#f89820' },
  'c++':        { icon: '⚙️', color: '#00599c' },
  'c':          { icon: '🔩', color: '#a8b9cc' },
  'python':     { icon: '🐍', color: '#3776ab' },
  'react':      { icon: '⚛️', color: '#61dafb' },
  'javascript': { icon: '𝙅',  color: '#f7df1e' },
  'js':         { icon: '𝙅',  color: '#f7df1e' },
  'postgresql': { icon: '🐘', color: '#336791' },
  'sqlite':     { icon: '🗄️', color: '#003b57' },
  'docker':     { icon: '🐳', color: '#2496ed' },
  'android':    { icon: '🤖', color: '#3ddc84' },
  'git':        { icon: '🌿', color: '#f05032' },
  'kotlin':     { icon: '🟣', color: '#7f52ff' },
  'swift':      { icon: '🐦', color: '#f05138' },
  'rust':       { icon: '⚙',  color: '#ce4a14' },
  'go':         { icon: '🔵', color: '#00add8' },
  'typescript': { icon: '🔷', color: '#3178c6' },
  'ts':         { icon: '🔷', color: '#3178c6' },
  'node':       { icon: '🌱', color: '#339933' },
  'nodejs':     { icon: '🌱', color: '#339933' },
  'vue':        { icon: '💚', color: '#4fc08d' },
  'css':        { icon: '🎨', color: '#264de4' },
  'html':       { icon: '📄', color: '#e34f26' },
  'aws':        { icon: '☁️', color: '#ff9900' },
  'linux':      { icon: '🐧', color: '#fcc624' },
  'mongodb':    { icon: '🍃', color: '#47a248' },
  'redis':      { icon: '🔴', color: '#dc382d' },
  'graphql':    { icon: '◈',  color: '#e10098' },
  'kubernetes': { icon: '☸️', color: '#326ce5' },
  'flutter':    { icon: '💙', color: '#54c5f8' },
}

export function getTechMeta(name) {
  const key = name.toLowerCase().replace(/\s/g, '')
  return TECH_META[key] || { icon: '◆', color: '#00d4ff' }
}