import { useState } from 'react';

export default function Customizer({ onGenerate }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '', nationality: '', role: '', years: '', clearance: '', issueYear: '',
    stacks: 'Java, 3\nPython, 2\nReact, 1',
  });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function handleGenerate() {
    const stackLines = form.stacks.split('\n').filter(l => l.trim());
    const stacks = stackLines.map(line => {
      const parts = line.split(',');
      return { name: (parts[0] || '').trim(), years: parseInt((parts[1] || '1').trim()) || 1 };
    }).filter(s => s.name);
    onGenerate({ ...form, years: parseInt(form.years) || 1, stacks });
  }

  const inputStyle = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    borderRadius: '4px',
    color: 'var(--text)',
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '12px',
    padding: '10px 12px',
    outline: 'none',
    width: '100%',
  };

  const labelStyle = {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: '9px',
    letterSpacing: '2px',
    color: 'var(--muted)',
    textTransform: 'uppercase',
    marginBottom: '5px',
    display: 'block',
  };

  return (
    <div style={{
      width: 'min(680px, 95vw)',
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 1,
      marginBottom: '60px',
    }}>
      <div onClick={() => setOpen(o => !o)} style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', letterSpacing: '4px', color: 'var(--muted)' }}>
          // BUILD YOUR STACK PASSPORT //
        </span>
        <span style={{ color: 'var(--accent)', fontFamily: 'monospace' }}>{open ? '▲' : '▼'}</span>
      </div>

      {open && (
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[['name','Full Name'],['nationality','Nationality'],['role','Dev Role'],['years','Years Exp'],['clearance','Clearance Label'],['issueYear','Issue Year']].map(([k, label]) => (
              <div key={k}>
                <label style={labelStyle}>{label}</label>
                <input style={inputStyle} value={form[k]} onChange={e => set(k, e.target.value)} placeholder={label} />
              </div>
            ))}
          </div>
          <div>
            <label style={labelStyle}>Technologies (one per line: Name, Years)</label>
            <textarea
              style={{ ...inputStyle, resize: 'vertical', minHeight: '100px' }}
              value={form.stacks}
              onChange={e => set('stacks', e.target.value)}
            />
          </div>
          <button onClick={handleGenerate} style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '3px',
            padding: '16px',
            borderRadius: '4px',
            border: '1px solid rgba(0,212,255,0.4)',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,212,255,0.05))',
            color: 'var(--accent)',
            cursor: 'pointer',
            width: '100%',
          }}>
            ⬡ GENERATE PASSPORT
          </button>
        </div>
      )}
    </div>
  );
}