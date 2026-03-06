import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TECH_META, THEMES, PASSPORT_TYPES } from '../data/defaultPassport'
import ParticleField from '../components/ParticleField'
import PassportCard from '../components/PassportCard'

const SUGGESTED = ['Java','C++','C','Python','React','JavaScript','TypeScript','Node','PostgreSQL','MongoDB','SQLite','Docker','Kubernetes','AWS','Android','Swift','Kotlin','Rust','Go','Vue','Redis','GraphQL','Git','Linux','HTML','CSS']

const COUNTER_KEY = 'sp_visit_count'
function getCount() { try { return parseInt(localStorage.getItem(COUNTER_KEY) || '0') } catch { return 0 } }
function incrementCount() { try { const n = getCount() + 1; localStorage.setItem(COUNTER_KEY, n); return n } catch { return 1 } }

export default function Generator() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '', nationality: '', role: '', years: '1', clearance: '',
    issueYear: new Date().getFullYear().toString(), gender: 'boy',
    theme: 'cyber', passportType: 'fullstack',
  })
  const [stacks, setStacks] = useState([])
  const [stackInput, setStackInput] = useState({ name: '', years: '1' })
  const [errors, setErrors] = useState({})
  const [count, setCount] = useState(11200)
  const [showPreview, setShowPreview] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    const real = incrementCount()
    setCount(11200 + real)
  }, [])

  const theme = THEMES[form.theme] || THEMES.cyber

  const previewData = {
    ...form,
    name: form.name || 'Your Name',
    nationality: form.nationality || 'Earth',
    role: form.role || 'Developer',
    clearance: form.clearance || 'Unknown',
    issueYear: form.issueYear || '2024',
    gender: form.gender || 'boy',
    theme: form.theme || 'cyber',
    passportType: form.passportType || 'fullstack',
    years: parseInt(form.years) || 1,
    stacks: stacks.length > 0 ? stacks : [{ name: 'Your Stack', years: 1 }],
  }

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: '' })) }

  function addStack() {
    if (!stackInput.name.trim()) return
    if (stacks.find(s => s.name.toLowerCase() === stackInput.name.toLowerCase())) return
    setStacks(s => [...s, { name: stackInput.name.trim(), years: parseInt(stackInput.years) || 1 }])
    setStackInput({ name: '', years: '1' })
  }

  function removeStack(name) { setStacks(s => s.filter(x => x.name !== name)) }

  function addSuggested(name) {
    if (stacks.find(s => s.name.toLowerCase() === name.toLowerCase())) { removeStack(name); return }
    setStacks(s => [...s, { name, years: parseInt(form.years) || 1 }])
  }

  function updateStackYears(name, years) {
    setStacks(s => s.map(x => x.name === name ? { ...x, years: parseInt(years) || 1 } : x))
  }

  function validate() {
    const e = {}
    if (!form.name.trim()) e.name = 'Required'
    if (!form.nationality.trim()) e.nationality = 'Required'
    if (!form.role.trim()) e.role = 'Required'
    if (!form.clearance.trim()) e.clearance = 'Required'
    if (stacks.length === 0) e.stacks = 'Add at least one technology'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function generate() {
    if (!validate()) return
    const data = { ...form, years: parseInt(form.years) || 1, stacks }
    const encoded = btoa(encodeURIComponent(JSON.stringify(data)))
    navigate(`/passport?d=${encoded}`, { state: { avatarUrl } })
  }

  function getTechMeta(name) {
    const key = name.toLowerCase().replace(/\s/g, '')
    return TECH_META[key] || { icon: '◆', color: '#00d4ff' }
  }

  const hasEnoughForPreview = form.name.trim().length > 1

  const inputStyle = (err) => ({
    background: 'rgba(255,255,255,0.03)',
    border: `1px solid ${err ? '#ef4444' : 'var(--border)'}`,
    borderRadius: '6px', color: 'var(--text)',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '13px', padding: '12px 14px',
    outline: 'none', width: '100%',
    transition: 'border-color 0.2s',
    colorScheme: 'dark',
    boxSizing: 'border-box',
  })

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px', letterSpacing: '2px',
    color: 'var(--muted)', textTransform: 'uppercase',
    marginBottom: '6px', display: 'block',
  }

  return (
    <div style={{
      minHeight: '100vh', width: '100%',
      background: theme.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: 'clamp(32px, 6vw, 60px) clamp(12px, 4vw, 20px) 100px',
      position: 'relative', zIndex: 1,
      boxSizing: 'border-box',
    }}>
      <ParticleField color={theme.accent} />

      <style>{`
        * { box-sizing: border-box; }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { filter: invert(1); opacity: 0.5; }
        input[type=number] { color-scheme: dark; }
        @media (max-width: 480px) {
          .stack-chip { padding: 4px 8px !important; font-size: 9px !important; }
          .tech-btn   { padding: 4px 8px !important; font-size: 9px !important; }
          .two-col    { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 48px)', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(8px, 2vw, 10px)', letterSpacing: '4px', color: theme.accent, marginBottom: '10px', opacity: 0.6 }}>
          // DEVELOPER IDENTITY SYSTEM //
        </div>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(24px, 6vw, 52px)', fontWeight: 900,
          color: theme.accent,
          letterSpacing: '2px', marginBottom: '12px',
          textShadow: `0 0 30px ${theme.accent}60, 0 0 60px ${theme.accent}30`,
        }}>STACK PASSPORT</h1>
        <p style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: 'clamp(13px, 2vw, 16px)',
          color: 'var(--muted)', letterSpacing: '1px',
          maxWidth: '400px', lineHeight: 1.6, margin: '0 auto 16px',
        }}>
          Your developer identity card. Fill in your stack, generate your passport, share it everywhere.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 11px)',
          color: theme.accent, opacity: 0.7,
          border: `1px solid ${theme.accent}25`,
          background: `${theme.accent}08`,
          padding: '6px 16px', borderRadius: '20px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 6px #10b981', display: 'inline-block' }} />
          {count.toLocaleString()} PASSPORTS GENERATED
        </div>
      </div>

      {/* Live preview toggle (mobile) */}
      {hasEnoughForPreview && (
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '20px' }}>
          <button onClick={() => setShowPreview(p => !p)} style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
            letterSpacing: '3px', padding: '10px 20px', borderRadius: '4px',
            cursor: 'pointer', border: `1px solid ${theme.accent}40`,
            background: showPreview ? `${theme.accent}15` : 'transparent',
            color: theme.accent, transition: 'all 0.2s',
          }}>
            {showPreview ? '▲ HIDE PREVIEW' : '▼ SHOW LIVE PREVIEW'}
          </button>
        </div>
      )}

      {/* Mobile preview */}
      {showPreview && hasEnoughForPreview && (
        <div style={{ position: 'relative', zIndex: 1, marginBottom: '32px', width: '100%', maxWidth: '680px' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '12px', textAlign: 'center', opacity: 0.6 }}>
            // LIVE PREVIEW · UPDATES AS YOU TYPE //
          </div>
          <PassportCard data={previewData} cardRef={null} avatarUrl={avatarUrl} />
        </div>
      )}

      {/* Main layout */}
      <div style={{ width: '100%', maxWidth: '1300px', display: 'flex', gap: 'clamp(20px, 3vw, 40px)', alignItems: 'flex-start', justifyContent: 'center', position: 'relative', zIndex: 1 }}>

        {/* Form */}
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '20px', flexShrink: 0 }}>

          {/* 01 Identity */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '4px', color: theme.accent, opacity: 0.7 }}>
              01 · IDENTITY
            </div>
            <div style={{ padding: 'clamp(16px, 3vw, 24px)', display: 'flex', flexDirection: 'column', gap: '14px' }}>

              <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input style={inputStyle(errors.name)} value={form.name} onChange={e => set('name', e.target.value)} placeholder="Diptanil Sen" />
                  {errors.name && <div style={{ color: '#ef4444', fontSize: '10px', marginTop: '4px', fontFamily: 'monospace' }}>{errors.name}</div>}
                </div>
                <div>
                  <label style={labelStyle}>Nationality *</label>
                  <input style={inputStyle(errors.nationality)} value={form.nationality} onChange={e => set('nationality', e.target.value)} placeholder="Indian" />
                  {errors.nationality && <div style={{ color: '#ef4444', fontSize: '10px', marginTop: '4px', fontFamily: 'monospace' }}>{errors.nationality}</div>}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Dev Role / Title *</label>
                <input style={inputStyle(errors.role)} value={form.role} onChange={e => set('role', e.target.value)} placeholder="Full Stack · Android Dev" />
                {errors.role && <div style={{ color: '#ef4444', fontSize: '10px', marginTop: '4px', fontFamily: 'monospace' }}>{errors.role}</div>}
              </div>

              <div className="two-col" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Years of Experience</label>
                  <input style={inputStyle()} type="number" min="0" max="50" value={form.years} onChange={e => set('years', e.target.value)} placeholder="3" />
                </div>
                <div>
                  <label style={labelStyle}>Issue Year</label>
                  <input style={inputStyle()} type="number" min="1990" max="2099" value={form.issueYear} onChange={e => set('issueYear', e.target.value)} placeholder="2026" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Clearance Label *</label>
                <input style={inputStyle(errors.clearance)} value={form.clearance} onChange={e => set('clearance', e.target.value)} placeholder="Self-Taught / CS Graduate / Bootcamp Grad" />
                {errors.clearance && <div style={{ color: '#ef4444', fontSize: '10px', marginTop: '4px', fontFamily: 'monospace' }}>{errors.clearance}</div>}
              </div>

              {/* Avatar upload */}
              <div>
                <label style={labelStyle}>Avatar</label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
                      letterSpacing: '2px', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer',
                      border: `1px solid ${theme.accent}50`,
                      background: `${theme.accent}10`, color: theme.accent,
                    }}>
                      📁 UPLOAD PHOTO
                      <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                        const file = e.target.files[0]
                        if (!file) return
                        const reader = new FileReader()
                        reader.onload = ev => setAvatarUrl(ev.target.result)
                        reader.readAsDataURL(file)
                      }} />
                    </label>
                    {avatarUrl && (
                      <button onClick={() => setAvatarUrl(null)} style={{
                        fontFamily: "'Share Tech Mono', monospace", fontSize: '9px',
                        letterSpacing: '2px', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer',
                        border: '1px solid rgba(239,68,68,0.4)', background: 'rgba(239,68,68,0.08)', color: '#ef4444',
                      }}>✕ REMOVE</button>
                    )}
                  </div>

                  {avatarUrl ? (
                    <div style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', border: `2px solid ${theme.accent}60`, boxShadow: `0 0 16px ${theme.accent}30`, flexShrink: 0 }}>
                      <img src={avatarUrl} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[
                        { key: 'boy',  label: 'Boy',  emoji: '👨‍💻', color: theme.accent },
                        { key: 'girl', label: 'Girl', emoji: '👩‍💻', color: '#d400ff' },
                      ].map(({ key, label, emoji, color }) => (
                        <button key={key} onClick={() => set('gender', key)} style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                          fontFamily: "'Share Tech Mono', monospace", fontSize: '9px',
                          letterSpacing: '1px', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer',
                          border: `1px solid ${form.gender === key ? color : 'var(--border)'}`,
                          background: form.gender === key ? `${color}18` : 'transparent',
                          color: form.gender === key ? color : 'var(--muted)',
                          transition: 'all 0.15s ease',
                        }}>
                          <span style={{ fontSize: '24px' }}>{emoji}</span>
                          {label.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Theme picker */}
              <div>
                <label style={labelStyle}>Card Theme</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Object.entries(THEMES).map(([key, t]) => (
                    <button key={key} onClick={() => set('theme', key)} style={{
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
                      padding: '7px 12px', borderRadius: '6px', cursor: 'pointer',
                      border: `1px solid ${form.theme === key ? t.accent : 'var(--border)'}`,
                      background: form.theme === key ? `${t.accent}18` : 'transparent',
                      color: form.theme === key ? t.accent : 'var(--muted)',
                      transition: 'all 0.15s ease',
                      boxShadow: form.theme === key ? `0 0 12px ${t.accent}30` : 'none',
                      display: 'inline-flex', alignItems: 'center', gap: '6px',
                    }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.accent, boxShadow: `0 0 6px ${t.accent}`, flexShrink: 0 }} />
                      {t.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Passport type */}
              <div>
                <label style={labelStyle}>Passport Type</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {Object.entries(PASSPORT_TYPES).map(([key, t]) => (
                    <button key={key} onClick={() => set('passportType', key)} style={{
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
                      padding: '7px 12px', borderRadius: '6px', cursor: 'pointer',
                      border: `1px solid ${form.passportType === key ? theme.accent : 'var(--border)'}`,
                      background: form.passportType === key ? `${theme.accent}18` : 'transparent',
                      color: form.passportType === key ? theme.accent : 'var(--muted)',
                      transition: 'all 0.15s ease',
                    }}>
                      {t.icon} {t.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 02 Technologies */}
          <div style={{ background: 'var(--surface)', border: `1px solid ${errors.stacks ? '#ef444440' : 'var(--border)'}`, borderRadius: '12px', overflow: 'hidden' }}>
            <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '4px', color: theme.accent, opacity: 0.7 }}>
              02 · TECHNOLOGIES
            </div>
            <div style={{ padding: 'clamp(16px, 3vw, 24px)', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div>
                <label style={labelStyle}>Quick Add</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {SUGGESTED.map(name => {
                    const meta = getTechMeta(name)
                    const active = stacks.find(s => s.name.toLowerCase() === name.toLowerCase())
                    return (
                      <button className="tech-btn" key={name} onClick={() => addSuggested(name)} style={{
                        fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
                        padding: '5px 10px', borderRadius: '4px', cursor: 'pointer',
                        border: `1px solid ${active ? meta.color : 'var(--border)'}`,
                        background: active ? `${meta.color}20` : 'transparent',
                        color: active ? meta.color : 'var(--muted)',
                        transition: 'all 0.15s ease',
                      }}>
                        {meta.icon} {name}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Custom Technology</label>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <input
                    style={{ ...inputStyle(), flex: '1', minWidth: '120px' }}
                    value={stackInput.name}
                    onChange={e => setStackInput(s => ({ ...s, name: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && addStack()}
                    placeholder="e.g. Terraform"
                  />
                  <input
                    style={{ ...inputStyle(), width: '65px' }}
                    type="number" min="1" max="30"
                    value={stackInput.years}
                    onChange={e => setStackInput(s => ({ ...s, years: e.target.value }))}
                    placeholder="Yrs"
                  />
                  <button onClick={addStack} style={{
                    fontFamily: "'Orbitron', sans-serif", fontSize: '10px', fontWeight: 700,
                    padding: '0 14px', borderRadius: '6px', cursor: 'pointer',
                    border: `1px solid ${theme.accent}60`,
                    background: `${theme.accent}15`, color: theme.accent,
                    whiteSpace: 'nowrap', height: '44px',
                  }}>+ ADD</button>
                </div>
              </div>

              {stacks.length > 0 && (
                <div>
                  <label style={labelStyle}>Your Stack ({stacks.length}) — edit years inline</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {stacks.map((stack) => {
                      const meta = getTechMeta(stack.name)
                      return (
                        <div className="stack-chip" key={stack.name} style={{
                          display: 'flex', alignItems: 'center', gap: '6px',
                          padding: '6px 10px', borderRadius: '6px',
                          border: `1px solid ${meta.color}40`,
                          background: `${meta.color}10`,
                        }}>
                          <span style={{ fontSize: '13px' }}>{meta.icon}</span>
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: meta.color }}>{stack.name}</span>
                          <input
                            type="number" min="1" max="30"
                            value={stack.years}
                            onChange={e => updateStackYears(stack.name, e.target.value)}
                            style={{
                              width: '34px', background: 'rgba(255,255,255,0.05)',
                              border: `1px solid ${meta.color}40`, borderRadius: '3px',
                              color: meta.color, fontFamily: "'Share Tech Mono', monospace",
                              fontSize: '10px', padding: '2px 4px', outline: 'none',
                              textAlign: 'center', colorScheme: 'dark',
                            }}
                          />
                          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted)' }}>y</span>
                          <button onClick={() => removeStack(stack.name)} style={{
                            background: 'none', border: 'none', color: 'var(--muted)',
                            cursor: 'pointer', fontSize: '14px', padding: '0 0 0 2px', lineHeight: 1,
                          }}>×</button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
              {errors.stacks && <div style={{ color: '#ef4444', fontSize: '10px', fontFamily: 'monospace' }}>{errors.stacks}</div>}
            </div>
          </div>

          {/* Generate button */}
          <button onClick={generate} style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(11px, 2vw, 13px)', fontWeight: 900,
            letterSpacing: '4px', padding: '20px', borderRadius: '8px', cursor: 'pointer',
            border: `1px solid ${theme.accent}80`,
            background: `linear-gradient(135deg, ${theme.accent}25, ${theme.accent3}15)`,
            color: theme.accent,
            boxShadow: `0 0 40px ${theme.accent}20, inset 0 1px 0 ${theme.accent}15`,
            transition: 'all 0.2s ease', width: '100%',
          }}>
            ⬡ GENERATE YOUR PASSPORT
          </button>

        </div>

        {/* Sticky desktop preview */}
        {hasEnoughForPreview && (
          <div style={{ display: 'none', position: 'sticky', top: '40px', flexDirection: 'column', gap: '12px' }} className="desktop-preview">
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: 'var(--muted)', textAlign: 'center', opacity: 0.6 }}>
              // LIVE PREVIEW //
            </div>
            <PassportCard data={previewData} cardRef={null} avatarUrl={avatarUrl} />
          </div>
        )}
      </div>

      <style>{`
        @media (min-width: 1200px) { .desktop-preview { display: flex !important; } }
      `}</style>

    </div>
  )
}