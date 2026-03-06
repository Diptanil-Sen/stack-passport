import { useEffect, useState, useRef } from 'react'

export default function MRZZone({ data }) {
  const nameParts = data.name.toUpperCase().split(' ')
  const surname = nameParts[nameParts.length - 1]
  const given = nameParts.slice(0, -1).join('<')
  const mrzName = `${surname}<<${given}`.slice(0, 44).padEnd(44, '<')
  const mrzStacks = data.stacks.map(s => s.name.slice(0, 3).toUpperCase()).join('·').slice(0, 30)
  const nat = data.nationality.slice(0, 3).toUpperCase()

  const line1 = `P<${nat}${mrzName}`
  const line2 = `SD${data.issueYear}${nat}${data.years}YRS<${mrzStacks}<<<${data.clearance.toUpperCase().replace(/\s/g, '-')}<DEV`

  const [display1, setDisplay1] = useState('')
  const [display2, setDisplay2] = useState('')
  const [cursor, setCursor] = useState(1) // 1 = line1 active, 2 = line2 active
  const cycleRef = useRef(0)

  useEffect(() => {
    const id = ++cycleRef.current
    setDisplay1('')
    setDisplay2('')
    setCursor(1)

    // Phase 1: type line1
    // Phase 2: pause
    // Phase 3: backspace line1
    // Phase 4: retype line1
    // Phase 5: type line2
    // Phase 6: pause
    // Phase 7: backspace line2
    // Phase 8: retype line2
    // then loop

    let timeout

    function typeOut(line, setter, speed, onDone) {
      let i = 0
      function next() {
        if (cycleRef.current !== id) return
        i++
        setter(line.slice(0, i))
        if (i < line.length) timeout = setTimeout(next, speed)
        else onDone()
      }
      timeout = setTimeout(next, speed)
    }

    function backspace(current, setter, speed, onDone) {
      let text = current
      function next() {
        if (cycleRef.current !== id) return
        text = text.slice(0, -1)
        setter(text)
        if (text.length > 0) timeout = setTimeout(next, speed / 2)
        else onDone()
      }
      timeout = setTimeout(next, speed / 2)
    }

    function runCycle() {
      if (cycleRef.current !== id) return
      setCursor(1)
      // type line1
      typeOut(line1, setDisplay1, 20, () => {
        // pause then backspace line1
        timeout = setTimeout(() => {
          backspace(line1, setDisplay1, 20, () => {
            // retype line1
            typeOut(line1, setDisplay1, 16, () => {
              // now type line2
              setCursor(2)
              typeOut(line2, setDisplay2, 14, () => {
                // pause then backspace line2
                timeout = setTimeout(() => {
                  backspace(line2, setDisplay2, 12, () => {
                    // retype line2
                    typeOut(line2, setDisplay2, 14, () => {
                      // pause then restart whole cycle
                      timeout = setTimeout(runCycle, 4000)
                    })
                  })
                }, 2000)
              })
            })
          })
        }, 1500)
      })
    }

    runCycle()
    return () => { cycleRef.current++; clearTimeout(timeout) }
  }, [data.name, data.nationality, data.stacks.length, data.clearance])

  return (
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      border: '1px solid rgba(0,212,255,0.08)',
      borderRadius: '6px', padding: '12px 16px',
      fontFamily: "'Share Tech Mono', monospace",
    }}>
      <div style={{ fontSize: '8px', letterSpacing: '3px', color: 'var(--muted)', marginBottom: '6px', opacity: 0.5 }}>
        // MACHINE READABLE ZONE · OPTICAL CHARACTER RECOGNITION //
      </div>
      <div style={{ fontSize: 'clamp(7px,1.5vw,10px)', color: 'rgba(0,212,255,0.6)', letterSpacing: '1px', lineHeight: 1.8, wordBreak: 'break-all', minHeight: '1.8em' }}>
        {display1}
        {cursor === 1 && <span style={{ borderRight: '2px solid #00d4ff', marginLeft: '1px' }}>&nbsp;</span>}
      </div>
      <div style={{ fontSize: 'clamp(7px,1.5vw,10px)', color: 'rgba(0,212,255,0.6)', letterSpacing: '1px', lineHeight: 1.8, wordBreak: 'break-all', minHeight: '1.8em' }}>
        {display2}
        {cursor === 2 && <span style={{ borderRight: '2px solid #00d4ff', marginLeft: '1px' }}>&nbsp;</span>}
      </div>
    </div>
  )
}