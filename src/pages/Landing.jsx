import { useNavigate } from 'react-router-dom'
import ParticleField from '../components/ParticleField'

const EXAMPLES = [
  { name: 'ANYA SHARMA',    role: 'Frontend Engineer',  level: 'SENIOR',    theme: '#00d4ff', stacks: ['React','TypeScript','Vue','CSS','GraphQL'], years: 5 },
  { name: 'MARCUS LEE',     role: 'DevOps · Cloud',     level: 'PRINCIPAL', theme: '#00ff88', stacks: ['Docker','Kubernetes','AWS','Linux','Go'], years: 8 },
  { name: 'PRIYA NAIR',     role: 'ML Engineer',        level: 'ENGINEER',  theme: '#bf00ff', stacks: ['Python','TensorFlow','PyTorch','SQL','Rust'], years: 3 },
  { name: 'DIPTANIL SEN',   role: 'Full Stack · Android', level: 'SENIOR',  theme: '#ff2244', stacks: ['Java','React','Android','Docker','Git'], years: 3 },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: '#030712', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', overflow: 'hidden', boxSizing: 'border-box' }}>
      <ParticleField color="#00d4ff" />

      <style>{`
        * { box-sizing: border-box; }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
        @keyframes neonPulse {
          0%, 100% { text-shadow: 0 0 20px #00d4ff80, 0 0 40px #00d4ff40; }
          50%       { text-shadow: 0 0 40px #00d4ffcc, 0 0 80px #00d4ff60; }
        }
        @keyframes borderGlow {
          0%, 100% { box-shadow: 0 0 8px #00d4ff30; }
          50%       { box-shadow: 0 0 24px #00d4ff60; }
        }
        .example-card:hover { transform: translateY(-4px) scale(1.02) !important; }
        .cta-btn:hover { transform: scale(1.04); box-shadow: 0 0 60px #00d4ff50 !important; }
        @media (max-width: 700px) {
          .examples-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 420px) {
          .examples-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: 'clamp(60px, 10vw, 120px) 20px clamp(40px, 6vw, 60px)', position: 'relative', zIndex: 1, width: '100%', maxWidth: '800px' }}>

        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '6px', color: '#00d4ff', opacity: 0.6, marginBottom: '20px' }}>
          // DEVELOPER IDENTITY SYSTEM v2.0 //
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(32px, 9vw, 80px)', fontWeight: 900,
          color: '#00d4ff', letterSpacing: '3px',
          margin: '0 0 8px',
          animation: 'neonPulse 3s ease-in-out infinite',
        }}>STACK</h1>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(32px, 9vw, 80px)', fontWeight: 900,
          color: '#fff', letterSpacing: '3px',
          margin: '0 0 32px',
          textShadow: '0 0 40px rgba(255,255,255,0.2)',
        }}>PASSPORT</h1>

        <p style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontSize: 'clamp(16px, 3vw, 22px)', color: 'rgba(255,255,255,0.5)',
          lineHeight: 1.7, maxWidth: '520px', margin: '0 auto 40px',
          letterSpacing: '0.5px',
        }}>
          Your developer identity card. Show the world your tech stack, experience level, and everything that makes you, <em style={{ color: '#00d4ff', fontStyle: 'normal' }}>you</em>.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
          <button className="cta-btn" onClick={() => navigate('/generate')} style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(11px, 2vw, 14px)', fontWeight: 900,
            letterSpacing: '4px', padding: 'clamp(14px, 3vw, 20px) clamp(24px, 5vw, 48px)',
            borderRadius: '8px', cursor: 'pointer',
            border: '1px solid rgba(0,212,255,0.6)',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.25), rgba(124,58,237,0.1))',
            color: '#00d4ff',
            boxShadow: '0 0 40px rgba(0,212,255,0.2)',
            transition: 'all 0.2s ease',
          }}>
            ⬡ GENERATE YOURS — FREE
          </button>
          <button onClick={() => document.getElementById('examples').scrollIntoView({ behavior: 'smooth' })} style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(10px, 2vw, 12px)',
            letterSpacing: '3px', padding: 'clamp(14px, 3vw, 20px) clamp(20px, 4vw, 36px)',
            borderRadius: '8px', cursor: 'pointer',
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'transparent', color: 'rgba(255,255,255,0.4)',
            transition: 'all 0.2s ease',
          }}>
            SEE EXAMPLES ↓
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 'clamp(24px, 5vw, 60px)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            ['11,200+', 'Passports Generated'],
            ['5',       'Card Themes'],
            ['8',       'Passport Types'],
            ['100%',    'Free Forever'],
          ].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 900, color: '#00d4ff', textShadow: '0 0 20px rgba(0,212,255,0.5)' }}>{num}</div>
              <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(8px, 1.5vw, 10px)', color: 'var(--muted)', letterSpacing: '2px', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div id="examples" style={{ width: '100%', maxWidth: '1000px', padding: '0 clamp(12px, 4vw, 40px) 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '4px', color: '#00d4ff', opacity: 0.5, marginBottom: '12px' }}>// EXAMPLE PASSPORTS //</div>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(18px, 4vw, 28px)', fontWeight: 900, color: '#fff', margin: 0, opacity: 0.9 }}>SEE WHAT OTHERS BUILT</h2>
        </div>

        <div className="examples-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'clamp(10px, 2vw, 20px)', marginBottom: '60px' }}>
          {EXAMPLES.map((ex, i) => (
            <div key={ex.name} className="example-card" style={{
              background: 'rgba(10,15,30,0.8)',
              border: `1px solid ${ex.theme}30`,
              borderRadius: '12px', padding: 'clamp(14px, 3vw, 24px)',
              cursor: 'pointer', transition: 'all 0.3s ease',
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              boxShadow: `0 0 20px ${ex.theme}10`,
            }} onClick={() => navigate('/generate')}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '6px', flexShrink: 0,
                  background: `linear-gradient(135deg, ${ex.theme}30, ${ex.theme}10)`,
                  border: `1px solid ${ex.theme}50`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '18px',
                }}>👨‍💻</div>
                <div>
                  <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(8px, 1.5vw, 11px)', fontWeight: 900, color: '#fff', letterSpacing: '1px' }}>{ex.name}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(7px, 1.2vw, 9px)', color: ex.theme, opacity: 0.8, marginTop: '2px' }}>{ex.role}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                {ex.stacks.map(s => (
                  <span key={s} style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(7px, 1.2vw, 9px)', padding: '2px 6px', borderRadius: '3px', color: ex.theme, border: `1px solid ${ex.theme}30`, background: `${ex.theme}10` }}>{s}</span>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(8px, 1.5vw, 10px)', fontWeight: 900, color: ex.theme, letterSpacing: '2px' }}>◆ {ex.level}</span>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(7px, 1.2vw, 9px)', color: 'var(--muted)' }}>{ex.years} YRS</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 12px)', color: 'var(--muted)', letterSpacing: '3px', marginBottom: '24px', opacity: 0.6 }}>
            // YOUR PASSPORT IS WAITING //
          </div>
          <button className="cta-btn" onClick={() => navigate('/generate')} style={{
            fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(11px, 2vw, 14px)', fontWeight: 900,
            letterSpacing: '4px', padding: 'clamp(16px, 3vw, 22px) clamp(32px, 6vw, 64px)',
            borderRadius: '8px', cursor: 'pointer',
            border: '1px solid rgba(0,212,255,0.6)',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.1))',
            color: '#00d4ff',
            boxShadow: '0 0 40px rgba(0,212,255,0.2)',
            transition: 'all 0.2s ease',
          }}>
            ⬡ CREATE MY PASSPORT
          </button>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 11px)', color: 'var(--muted)', opacity: 0.4, marginTop: '16px', letterSpacing: '2px' }}>
            free · no signup · instant
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color: 'var(--muted)', letterSpacing: '2px', opacity: 0.3, paddingBottom: '32px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        crafted by diptanil sen · stackpassport.dev
      </div>
    </div>
  )
}