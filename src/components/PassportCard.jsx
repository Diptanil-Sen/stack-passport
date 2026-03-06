import QRCode from 'react-qr-code'
import StampGrid from './StampGrid'
import MRZZone from './MRZZone'
import GlitchName from './GlitchName'
import { THEMES, PASSPORT_TYPES, getLevel } from '../data/defaultPassport'

export default function PassportCard({ data, cardRef, avatarUrl }) {
  if (!data || !data.name) return null

  const theme = THEMES[data.theme] || THEMES.cyber
  const ptype = PASSPORT_TYPES[data.passportType] || PASSPORT_TYPES.fullstack
  const level = getLevel(data.stacks || [], data.years || 1)
  const isGirl = data.gender === 'girl'
  const avatarRing = isGirl
    ? 'linear-gradient(135deg, #d400ff, #7c3aed, #ff6b35)'
    : `linear-gradient(135deg, ${theme.accent}, ${theme.accent3}, ${theme.accent2})`
  const shareUrl = typeof window !== 'undefined' ? window.location.href : 'https://stackpassport.dev'

  return (
    <div ref={cardRef} style={{
      width: 'min(680px, 95vw)',
      background: `linear-gradient(135deg, ${theme.surface} 0%, #0d1535 40%, ${theme.surface} 100%)`,
      borderRadius: '16px',
      border: `1px solid ${theme.border}`,
      position: 'relative',
      overflow: 'hidden',
      boxShadow: `0 0 0 1px ${theme.accent}18, 0 25px 80px rgba(0,0,0,0.8), 0 0 60px ${theme.accent}08`,
      marginBottom: '20px',
      transition: 'transform 0.1s ease',
    }}
      onMouseMove={e => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        e.currentTarget.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)'
      }}
    >
      <style>{`
        @keyframes scanLine {
          0%   { top: -2px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes holoShimmer {
          0%   { background-position: 200% 200%; }
          100% { background-position: -200% -200%; }
        }
        @keyframes borderRotate {
          0%   { filter: hue-rotate(0deg); }
          100% { filter: hue-rotate(360deg); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes levelPulse {
          0%, 100% { box-shadow: 0 0 8px ${level.color}60; }
          50%      { box-shadow: 0 0 20px ${level.color}90; }
        }
        .scan-line {
          position: absolute; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, ${theme.accent}99, ${theme.accent}, ${theme.accent}99, transparent);
          box-shadow: 0 0 20px ${theme.accent}cc, 0 0 40px ${theme.accent}66;
          animation: scanLine 3s ease-in-out infinite;
          z-index: 20; pointer-events: none;
        }
        .holo-overlay {
          position: absolute; inset: 0; border-radius: 16px;
          background: linear-gradient(105deg, transparent 20%, ${theme.accent}08 25%, ${theme.accent2}08 30%, ${theme.accent3}08 35%, transparent 40%);
          background-size: 200% 200%;
          animation: holoShimmer 4s linear infinite;
          z-index: 10; pointer-events: none;
        }
        .avatar-ring { position: relative; width: 88px; height: 88px; flex-shrink: 0; }
        .avatar-ring::before {
          content: ''; position: absolute; inset: -3px; border-radius: 8px;
          background: ${avatarRing};
          animation: borderRotate 4s linear infinite; z-index: 0;
        }
        .clearance-dot { width: 10px; height: 10px; border-radius: 50%; animation: dotPulse 2s ease-in-out infinite; }
        .level-badge { animation: levelPulse 2s ease-in-out infinite; }
      `}</style>

      <div className="scan-line" />
      <div className="holo-overlay" />

      {/* Circuit SVG */}
      <svg style={{ position: 'absolute', top: 16, right: 16, width: 60, height: 60, opacity: 0.15, zIndex: 4 }} viewBox="0 0 60 60" fill="none">
        <path d="M10 50 L10 10 L50 10" stroke={theme.accent} strokeWidth="1" />
        <path d="M20 40 L20 20 L40 20" stroke={theme.accent} strokeWidth="0.5" />
        <circle cx="10" cy="10" r="3" fill={theme.accent} />
        <circle cx="50" cy="10" r="2" fill={theme.accent} opacity="0.5" />
      </svg>

      <div style={{ padding: 'clamp(16px, 4vw, 32px)', position: 'relative', zIndex: 5 }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', paddingBottom: '16px', borderBottom: `1px solid ${theme.accent}18` }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '10px', letterSpacing: '4px', color: theme.accent, opacity: 0.6 }}>STACK PASSPORT</span>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: theme.accent2, letterSpacing: '3px', border: `1px solid ${theme.accent2}50`, padding: '3px 10px', borderRadius: '2px', background: `${theme.accent2}10` }}>
            {ptype.icon} {ptype.label.toUpperCase()} · {ptype.badge}
          </span>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '8px', fontWeight: 900, letterSpacing: '2px', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)', padding: '2px 8px', borderRadius: '2px', background: 'rgba(16,185,129,0.08)', textTransform: 'uppercase' }}>
            {data.clearance}
          </span>
        </div>

        {/* Identity row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 'clamp(10px, 2vw, 20px)', marginBottom: '20px', alignItems: 'start' }}>

          {/* Avatar */}
          <div className="avatar-ring">
            <div style={{
              position: 'relative', zIndex: 1, width: '100%', height: '100%',
              background: `linear-gradient(135deg, ${theme.surface}, ${theme.border})`,
              borderRadius: '6px', overflow: 'hidden',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {avatarUrl ? (
                <img src={avatarUrl} alt="avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '6px' }} />
              ) : (
                <span style={{ fontSize: '38px' }}>{isGirl ? '👩‍💻' : '👨‍💻'}</span>
              )}
            </div>
          </div>

          {/* Details */}
          <div style={{ paddingTop: '4px' }}>
            <div style={{ marginBottom: '6px' }}>
              <GlitchName name={data.name} color={theme.accent} />
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 1.5vw, 11px)', color: theme.accent, letterSpacing: '2px', marginBottom: '14px', opacity: 0.8 }}>
              // {(data.role || '').toUpperCase()} //
            </div>
            <div className="card-meta-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '10px' }}>
              {[
                ['NATIONALITY', (data.nationality || '').toUpperCase(), false],
                ['CLEARANCE', (data.clearance || '').toUpperCase(), true],
                ['EXPERIENCE', `${data.years || 1} YRS`, true],
                ['ISSUED', (() => {
                  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
                  const d = new Date()
                  return `${String(d.getDate()).padStart(2, '0')} ${months[d.getMonth()]} ${data.issueYear || d.getFullYear()}`
                })(), true],
              ].map(([label, value, highlight]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', letterSpacing: '2px', color: 'var(--muted)', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontFamily: highlight ? "'Share Tech Mono', monospace" : "'Rajdhani', sans-serif", fontSize: highlight ? '11px' : '13px', fontWeight: 600, color: highlight ? '#fbbf24' : 'var(--text)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QR Code — dark themed */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <div style={{
              background: theme.surface,
              border: `1px solid ${theme.accent}40`,
              padding: '8px', borderRadius: '6px',
              boxShadow: `0 0 12px ${theme.accent}20`,
            }}>
              <QRCode
                value={shareUrl}
                size={80}
                style={{ display: 'block', width: '80px', height: '80px' }}
                fgColor={theme.accent}
                bgColor="transparent"
              />
            </div>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '7px', color: theme.accent, letterSpacing: '1px', opacity: 0.5 }}>SCAN · SHARE</span>
          </div>

        </div>

        {/* Level badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <div className="level-badge" style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: '11px', fontWeight: 900,
            letterSpacing: '3px', color: level.color,
            border: `1px solid ${level.color}60`, padding: '6px 16px', borderRadius: '4px',
            background: `${level.color}12`,
          }}>
            ◆ {level.label}
          </div>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} style={{
                width: '20px', height: '4px', borderRadius: '2px',
                background: i <= level.rank ? level.color : `${level.color}25`,
                boxShadow: i <= level.rank ? `0 0 6px ${level.color}` : 'none',
              }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted)', opacity: 0.6 }}>
            {(data.stacks || []).length} TECH · {data.years || 1} YRS
          </span>
        </div>

        {/* Clearance bar */}
        <div style={{ background: `${theme.accent}08`, border: `1px solid ${theme.accent}25`, borderRadius: '6px', padding: '10px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '3px', color: theme.accent, opacity: 0.7 }}>// SYSTEM ACCESS //</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {[[theme.accent, 0], ['#10b981', 0.3], ['#fbbf24', 0.6], [theme.accent2, 0.9], [theme.accent, 1.2]].map(([color, delay], i) => (
              <div key={i} className="clearance-dot" style={{ background: color, boxShadow: `0 0 6px ${color}`, animationDelay: `${delay}s` }} />
            ))}
          </div>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '11px', fontWeight: 700, color: theme.accent2, letterSpacing: '2px', textShadow: `0 0 10px ${theme.accent2}80` }}>CLEARANCE: ALPHA</span>
        </div>

        {/* Classification tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
          {[['SYSTEMS', '#f59e0b'], ['WEB', theme.accent], ['MOBILE', '#10b981'], ['DATA', '#a855f7'], ['DEVOPS', theme.accent2]].map(([tag, color]) => (
            <span key={tag} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '2px', padding: '4px 10px', borderRadius: '2px', color, border: `1px solid ${color}40`, background: `${color}10` }}>{tag}</span>
          ))}
        </div>

        {/* Stamps */}
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '4px', color: 'var(--muted)', marginBottom: '14px' }}>
          VISA STAMPS · AUTHORIZED TECHNOLOGIES
        </div>
        <StampGrid stacks={data.stacks || []} />

        {/* Stats — fixed alignment */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1px', background: theme.border, border: `1px solid ${theme.border}`, borderRadius: '8px', overflow: 'hidden', marginBottom: '24px' }}>
          {[
            [(data.stacks || []).length, 'Technologies'],
            [data.years || 1, 'Years Active'],
            [level.label, 'Level'],
            ['∞', 'Potential'],
          ].map(([num, label]) => (
            <div key={label} style={{ background: theme.surface, padding: '12px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{
                fontFamily: "'Orbitron', sans-serif",
                fontSize: num.toString().length > 5 ? '10px' : num.toString().length > 3 ? '13px' : '20px',
                fontWeight: 900, color: theme.accent,
                textShadow: `0 0 15px ${theme.accent}80`,
                display: 'block', marginBottom: '4px',
                lineHeight: 1.2,
              }}>{num}</span>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '8px', color: 'var(--muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>{label}</span>
            </div>
          ))}
        </div>

        <MRZZone data={data} />
      </div>
    </div>
  )
}