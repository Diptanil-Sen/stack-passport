import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import html2canvas from 'html2canvas'
import confetti from 'canvas-confetti'
import PassportCard from '../components/PassportCard'
import ParticleField from '../components/ParticleField'
import { defaultPassport, THEMES } from '../data/defaultPassport'

export default function Passport() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const cardRef = useRef()
  const [toast, setToast] = useState('')
  const [downloading, setDownloading] = useState(false)
  const avatarUrl = location.state?.avatarUrl || null

  let data = defaultPassport
try {
  const raw = params.get('d')
  if (raw) data = JSON.parse(atob(raw))
} catch (e) {}

  const theme = THEMES[data.theme] || THEMES.cyber

  // Confetti on mount
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: [theme.accent, theme.accent2, theme.accent3, '#ffffff', '#fbbf24'],
        startVelocity: 40,
        gravity: 0.8,
        scalar: 0.9,
      })
    }, 600)
    return () => clearTimeout(t)
  }, [])

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const shareUrl = window.location.href
  const shareText = `Just generated my Stack Passport 🛂 Check out my dev identity →`

  function copyLink() {
    navigator.clipboard.writeText(shareUrl)
      .then(() => showToast('// LINK COPIED · SHARE YOUR PASSPORT //'))
      .catch(() => showToast('// COPY THE URL FROM ADDRESS BAR //'))
  }

  function shareTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  function shareLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank')
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')
  }

  function shareInstagram() {
    navigator.clipboard.writeText(shareUrl)
      .then(() => showToast('// LINK COPIED · PASTE IN INSTAGRAM BIO OR STORY //'))
  }

  async function downloadPNG() {
    if (!cardRef.current) return
    setDownloading(true)
    showToast('// RENDERING PASSPORT //')
    try {
      const clone = cardRef.current.cloneNode(true)
      clone.style.cssText = `
        width: 680px;
        background: linear-gradient(135deg, ${theme.surface} 0%, #0d1535 40%, ${theme.surface} 100%);
        border-radius: 16px;
        border: 1px solid ${theme.border};
        position: fixed;
        top: -9999px; left: -9999px;
        transform: none; box-shadow: none;
        overflow: hidden;
        font-family: 'Rajdhani', sans-serif;
        z-index: -1;
      `
      clone.querySelectorAll('.scan-line, .holo-overlay').forEach(el => el.remove())
      clone.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none'
        el.style.transform = 'none'
        el.style.transition = 'none'
        el.style.clipPath = 'none'
      })
      clone.querySelectorAll('[style*="glitch"]').forEach(el => el.remove())

      // Watermark
      const watermark = document.createElement('div')
      watermark.style.cssText = `
        position: absolute; bottom: 12px; right: 16px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 10px; color: rgba(255,255,255,0.2);
        letter-spacing: 2px; pointer-events: none;
        z-index: 100;
      `
      watermark.innerText = 'stackpassport.dev'
      clone.style.position = 'relative'
      clone.appendChild(watermark)

      document.body.appendChild(clone)
      await new Promise(r => setTimeout(r, 200))

      const canvas = await html2canvas(clone, {
        backgroundColor: theme.surface,
        scale: 2, useCORS: true, logging: false,
        allowTaint: true, width: 680,
      })
      document.body.removeChild(clone)

      const link = document.createElement('a')
      const name = data.name.replace(/\s+/g, '_').toLowerCase()
      link.download = `stack_passport_${name}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
      showToast('// PASSPORT DOWNLOADED //')
    } catch (e) {
      showToast('// DOWNLOAD FAILED · TRY SCREENSHOT MODE //')
      console.error(e)
    }
    setDownloading(false)
  }

  function screenshotMode() {
    const els = document.querySelectorAll('.hide-screenshot')
    const hidden = els[0]?.style.opacity === '0'
    els.forEach(el => el.style.opacity = hidden ? '1' : '0')
    if (!hidden) showToast('// SCREENSHOT MODE · TAKE YOUR SHOT //')
  }

  const btnStyle = (color, glow) => ({
    fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(8px, 2vw, 10px)', fontWeight: 700,
    letterSpacing: '2px', padding: 'clamp(10px, 2vw, 13px) clamp(12px, 2vw, 18px)',
    borderRadius: '4px', cursor: 'pointer',
    border: `1px solid ${color}60`,
    background: `linear-gradient(135deg, ${color}20, ${color}08)`,
    color, transition: 'all 0.2s ease',
    boxShadow: glow ? `0 0 20px ${color}30` : 'none',
    whiteSpace: 'nowrap',
  })

  const shareBtnStyle = (color) => ({
    fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 11px)',
    letterSpacing: '1px', padding: 'clamp(8px, 2vw, 10px) clamp(10px, 2vw, 16px)',
    borderRadius: '4px', cursor: 'pointer',
    border: `1px solid ${color}50`,
    background: `${color}12`, color,
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  })

  return (
    <div style={{ minHeight: '100vh', width: '100%', background: theme.bg, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 'clamp(24px, 5vw, 40px) clamp(12px, 4vw, 20px) 80px', position: 'relative', boxSizing: 'border-box' }}>
      <ParticleField color={theme.accent} />

      <style>{`
        * { box-sizing: border-box; }
        @media (max-width: 480px) {
          .action-btns { gap: 6px !important; }
          .share-btns  { gap: 6px !important; }
        }
      `}</style>

      {/* Header */}
      <div className="hide-screenshot" style={{ textAlign: 'center', marginBottom: 'clamp(20px, 4vw, 40px)', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(8px, 2vw, 10px)', letterSpacing: '4px', color: theme.accent, opacity: 0.6, marginBottom: '8px' }}>
          // IDENTITY VERIFIED //
        </div>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 'clamp(18px, 5vw, 36px)', fontWeight: 900,
          color: theme.accent,
          textShadow: `0 0 30px ${theme.accent}60`,
          letterSpacing: '2px', margin: 0,
        }}>YOUR STACK PASSPORT</h1>
      </div>

      {/* Card */}
      <div className="passport-flip-enter" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '680px', display: 'flex', justifyContent: 'center' }}>
        <PassportCard data={data} cardRef={cardRef} avatarUrl={avatarUrl} />
      </div>

      {/* Action buttons */}
      <div className="hide-screenshot action-btns" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px', marginTop: '4px', position: 'relative', zIndex: 1, width: '100%', maxWidth: '680px' }}>
        <button style={btnStyle('#10b981', true)} onClick={downloadPNG} disabled={downloading}>
          {downloading ? '⟳ RENDERING...' : '↓ DOWNLOAD PNG'}
        </button>
        <button style={btnStyle(theme.accent, false)} onClick={copyLink}>⬡ COPY LINK</button>
        <button style={btnStyle(theme.accent, false)} onClick={screenshotMode}>◈ SCREENSHOT</button>
        <button style={btnStyle('#ff6b35', false)} onClick={() => navigate('/')}>✦ MAKE YOURS</button>
      </div>

      {/* Share buttons */}
      <div className="hide-screenshot" style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '680px', marginBottom: '24px' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: 'var(--muted)', letterSpacing: '2px', textAlign: 'center', marginBottom: '10px', opacity: 0.5 }}>
          // SHARE ON //
        </div>
        <div className="share-btns" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {[
            { label: '𝕏 TWITTER',    color: '#1da1f2', fn: shareTwitter  },
            { label: 'in LINKEDIN',  color: '#0077b5', fn: shareLinkedIn },
            { label: '📱 WHATSAPP',  color: '#25d366', fn: shareWhatsApp },
            { label: '📸 INSTAGRAM', color: '#e1306c', fn: shareInstagram },
          ].map(({ label, color, fn }) => (
            <button key={label} onClick={fn} style={shareBtnStyle(color)}>{label}</button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="hide-screenshot" style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 'clamp(9px, 2vw, 11px)', color: 'var(--muted)', letterSpacing: '2px', opacity: 0.4, position: 'relative', zIndex: 1, textAlign: 'center', lineHeight: 2 }}>
        stackpassport.dev · share your identity<br/>
        <span style={{ opacity: 0.7 }}>crafted by diptanil sen</span>
      </div>

      {/* Toast */}
      <div style={{
        position: 'fixed', bottom: '24px', left: '50%',
        transform: `translateX(-50%) translateY(${toast ? '0' : '120px'})`,
        background: `${theme.accent}18`, border: `1px solid ${theme.accent}50`,
        color: theme.accent, fontFamily: "'Share Tech Mono', monospace",
        fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '2px',
        padding: '12px clamp(16px, 4vw, 24px)',
        borderRadius: '4px', backdropFilter: 'blur(10px)',
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        zIndex: 1000, whiteSpace: 'nowrap', maxWidth: '90vw',
        textAlign: 'center',
      }}>
        {toast}
      </div>
    </div>
  )
}