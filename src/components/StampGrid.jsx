import { getTechMeta } from '../data/defaultPassport';

export default function StampGrid({ stacks }) {
  const maxYears = Math.max(...stacks.map(s => s.years), 1);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(85px, 1fr))',
      gap: '10px',
      marginBottom: '24px',
    }}>
      {stacks.map((stack, i) => {
        const meta = getTechMeta(stack.name);
        const barWidth = Math.round((stack.years / maxYears) * 100);
        return (
          <div key={i} style={{
            position: 'relative',
            borderRadius: '6px',
            padding: '10px 8px',
            textAlign: 'center',
            background: `linear-gradient(135deg, ${meta.color}10, ${meta.color}04)`,
            border: `1px solid ${meta.color}30`,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.04)';
            e.currentTarget.style.boxShadow = `0 8px 24px ${meta.color}20`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>{meta.icon}</div>
            <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '8px', fontWeight: 700, color: '#fff', marginBottom: '3px', letterSpacing: '0.5px', lineHeight: 1.2 }}>
              {stack.name.toUpperCase()}
            </div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', color: meta.color, marginBottom: '5px' }}>
              {stack.years}Y
            </div>
            <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.08)', borderRadius: '1px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${barWidth}%`,
                background: meta.color,
                boxShadow: `0 0 6px ${meta.color}`,
                borderRadius: '1px',
                transition: 'width 1.2s ease-out',
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}