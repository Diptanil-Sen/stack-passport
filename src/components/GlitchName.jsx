export default function GlitchName({ name, color = '#00d4ff' }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(16px, 3vw, 24px)',
        fontWeight: 900, color: '#fff',
        letterSpacing: '2px', lineHeight: 1.1,
        textShadow: `0 0 10px ${color}40, 0 0 20px ${color}20`,
      }}>
        {name.toUpperCase()}
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(16px, 3vw, 24px)',
        fontWeight: 900, color,
        letterSpacing: '2px', lineHeight: 1.1,
        animation: 'glitch1 6s infinite', pointerEvents: 'none',
      }}>{name.toUpperCase()}</div>
      <div style={{
        position: 'absolute', inset: 0,
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(16px, 3vw, 24px)',
        fontWeight: 900, color: '#ff6b35',
        letterSpacing: '2px', lineHeight: 1.1,
        animation: 'glitch2 6s infinite', pointerEvents: 'none',
      }}>{name.toUpperCase()}</div>
    </div>
  )
}