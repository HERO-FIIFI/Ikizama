import { useEffect, useRef } from 'react'
import { useMediaQuery, useReducedMotion } from '../lib/hooks'
import styles from './SystemsVisual.module.css'

import { makeIso, pts, path, type P } from '../lib/iso'

const U = 46
const { iso, circle } = makeIso(340, 262, U)

/** Grid-aligned ground path, e.g. [[-2,1],[-1,1],[-1,2]] */
const ground = (route: P[]) => path(route.map(([x, y]) => iso(x, y)))

function Box({ x, y, s, h, z = 0, className }: { x: number; y: number; s: number; h: number; z?: number; className?: string }) {
  const top = [iso(x, y, z + h), iso(x + s, y, z + h), iso(x + s, y + s, z + h), iso(x, y + s, z + h)]
  const left = [iso(x, y + s, z), iso(x + s, y + s, z), iso(x + s, y + s, z + h), iso(x, y + s, z + h)]
  const right = [iso(x + s, y + s, z), iso(x + s, y, z), iso(x + s, y, z + h), iso(x + s, y + s, z + h)]
  return (
    <g className={className}>
      <polygon points={pts(left)} className={styles.faceL} />
      <polygon points={pts(right)} className={styles.faceR} />
      <polygon points={pts(top)} className={styles.faceT} />
    </g>
  )
}

function Cylinder({ cx, cy, r, h }: { cx: number; cy: number; r: number; h: number }) {
  const { rx, ry } = circle(r)
  const [tx, ty] = iso(cx, cy, h)
  const [bx, by] = iso(cx, cy, 0)
  const body = `M${tx - rx} ${ty} L${bx - rx} ${by} A${rx} ${ry} 0 0 0 ${bx + rx} ${by} L${tx + rx} ${ty}`
  const [mx, my] = iso(cx, cy, h * 0.5)
  return (
    <g>
      <path d={body} className={styles.faceL} />
      <ellipse cx={tx} cy={ty} rx={rx} ry={ry} className={styles.faceT} />
      {/* a second ring reads as stacked storage */}
      <path d={`M${mx - rx} ${my} A${rx} ${ry} 0 0 0 ${mx + rx} ${my}`} className={styles.edge} />
    </g>
  )
}

/** Floating octahedron: the reasoning core. Wireframe with lightly filled front faces. */
function Octahedron({ cx, cy, z, r, h }: { cx: number; cy: number; z: number; r: number; h: number }) {
  const T = iso(cx, cy, z + h)
  const B = iso(cx, cy, z - h)
  const A = iso(cx - r, cy, z)
  const Bm = iso(cx, cy - r, z)
  const C = iso(cx + r, cy, z)
  const D = iso(cx, cy + r, z)
  const core = iso(cx, cy, z)
  const [sx, sy] = iso(cx, cy, 0)
  return (
    <g>
      <ellipse cx={sx} cy={sy} rx={r * U * 0.9} ry={r * U * 0.45} className={styles.shadow} />
      <polygon points={pts([T, Bm, C])} className={styles.faceR} />
      <polygon points={pts([T, D, A])} className={styles.faceL} />
      <polygon points={pts([T, C, D])} className={styles.faceT} />
      <polygon points={pts([B, C, D])} className={styles.faceL} />
      <polygon points={pts([A, Bm, C, D])} className={styles.hidden} />
      <line x1={T[0]} y1={T[1]} x2={B[0]} y2={B[1]} className={styles.hidden} />
      <line x1={A[0]} y1={A[1]} x2={C[0]} y2={C[1]} className={styles.hidden} />
      <line x1={Bm[0]} y1={Bm[1]} x2={D[0]} y2={D[1]} className={styles.hidden} />
      <circle cx={core[0]} cy={core[1]} r={3} className={styles.core} />
      <circle cx={core[0]} cy={core[1]} r={9} className={styles.coreRing} />
    </g>
  )
}

/** Standing documents in the x–z plane. */
function Documents({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  const docs = [0.6, 0.3, 0].map((dy, i) => {
    const yy = y + dy
    const xx = x + i * 0.08
    return (
      <g key={i}>
        <polygon points={pts([iso(xx, yy, 0), iso(xx + w, yy, 0), iso(xx + w, yy, h), iso(xx, yy, h)])} className={i === 2 ? styles.docFront : styles.doc} />
        {i === 2 &&
          [0.72, 0.56, 0.4].map((lh, j) => {
            const a = iso(xx + 0.14, yy, h * lh)
            const b = iso(xx + w * (j === 1 ? 0.55 : 0.8), yy, h * lh)
            return <line key={j} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={styles.docLine} />
          })}
      </g>
    )
  })
  return <g>{docs}</g>
}

function Label({ at, children, dx = 0, dy = 0 }: { at: P; children: string; dx?: number; dy?: number }) {
  return (
    <text x={at[0] + dx} y={at[1] + dy} className={styles.label}>
      {children}
    </text>
  )
}

/* ---------- Static geometry ---------- */
const GRID = (() => {
  const lines: string[] = []
  for (let i = -4; i <= 4; i++) {
    lines.push(path([iso(i, -4), iso(i, 4)]))
    lines.push(path([iso(-4, i), iso(4, i)]))
  }
  return lines
})()

const FLOWS: { d: string; dur: number; delay: number }[] = [
  { d: ground([[-2.55, 1.35], [-1.2, 1.35], [-1.2, 2.2]]), dur: 6, delay: 0 },
  { d: ground([[-0.55, 2.8], [0.6, 2.8], [0.6, 1.35]]), dur: 6, delay: 1.5 },
  { d: ground([[0.6, -0.15], [0.6, -1.75], [0.9, -1.75]]), dur: 5, delay: 3 },
  { d: ground([[1.8, -1.75], [2.5, -1.75], [2.5, 0.8], [2.8, 0.8]]), dur: 7, delay: 4 },
  // governance loop: output returns to the data layer for review
  { d: ground([[3.3, 1.3], [3.3, 3.5], [-1.2, 3.5], [-1.2, 3.35]]), dur: 11, delay: 2 },
]

const CODE = [1.4, 0.8, 1.15].map((len, i) => {
  const a = iso(1.3, -3.6 + i * 0.36, 1.5)
  const b = iso(1.3 + len, -3.6 + i * 0.36, 1.5)
  return { a, b }
})

const DATA_LABEL = iso(-1.2, 3.55, 0)
const REASON_LABEL = iso(0.6, 0.6, 2.85)
const VALIDATE_LABEL = iso(1.35, -2.75, 0)
const ACTION_LABEL = iso(3.3, 0.05, 1.05)
const INPUT_LABEL = iso(-3.5, 2.1, 0)
const ACTION_DOT = iso(3.3, 0.8, 0.8)
const VALIDATE_DOT = iso(1.35, -1.75, 0.5)

export function SystemsVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const pointerFine = useMediaQuery('(hover: hover) and (pointer: fine)')

  // Restrained depth: layers translate a few px against pointer position.
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !pointerFine) return
    let frame = 0
    const onMove = (e: PointerEvent) => {
      if (frame) return
      frame = requestAnimationFrame(() => {
        frame = 0
        const px = (e.clientX / window.innerWidth) * 2 - 1
        const py = (e.clientY / window.innerHeight) * 2 - 1
        el.style.setProperty('--px', px.toFixed(3))
        el.style.setProperty('--py', py.toFixed(3))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [reduced, pointerFine])

  return (
    <div ref={ref} className={styles.stage} aria-hidden="true">
      <svg viewBox="50 100 600 390" className={styles.svg} role="img" focusable="false">
        <g className={styles.back}>
          {GRID.map((d, i) => (
            <path key={i} d={d} className={styles.grid} />
          ))}
        </g>

        <g className={styles.mid}>
          <g className={styles.drift}>
            {FLOWS.map((f, i) => (
              <path key={i} d={f.d} className={styles.route} />
            ))}
            {!reduced &&
              FLOWS.map((f, i) => (
                <path
                  key={`f${i}`}
                  d={f.d}
                  pathLength={100}
                  className={styles.flow}
                  style={{ animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s` }}
                />
              ))}

            <Documents x={-3.4} y={1.0} w={0.75} h={1.0} />
            <Cylinder cx={-1.2} cy={2.8} r={0.5} h={0.8} />
            <Box x={0.9} y={-2.2} s={0.9} h={0.45} />
            <Box x={2.8} y={0.3} s={1} h={0.8} />
            <Octahedron cx={0.6} cy={0.6} z={1.35} r={0.62} h={0.82} />

            <circle cx={VALIDATE_DOT[0]} cy={VALIDATE_DOT[1]} r={2} className={styles.dot} />
            <circle cx={ACTION_DOT[0]} cy={ACTION_DOT[1]} r={2.5} className={styles.dotAccent} />

            <Label at={INPUT_LABEL} dy={12}>
              input
            </Label>
            <Label at={DATA_LABEL} dy={14}>
              retrieve
            </Label>
            <Label at={REASON_LABEL} dx={-16}>
              reason
            </Label>
            <Label at={VALIDATE_LABEL} dy={10}>
              validate
            </Label>
            <Label at={ACTION_LABEL} dx={10}>
              commit
            </Label>
          </g>
        </g>

        <g className={styles.front}>
          <g className={styles.driftSlow}>
            {CODE.map(({ a, b }, i) => (
              <line key={i} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} className={styles.code} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  )
}
