/** Tiny isometric projection helpers: grid units → SVG px. */
export type P = [number, number]

const COS30 = Math.cos(Math.PI / 6)

export function makeIso(ox: number, oy: number, u: number) {
  const iso = (x: number, y: number, z = 0): P => [ox + (x - y) * u * COS30, oy + (x + y) * u * 0.5 - z * u]
  /** Ellipse radii of a ground circle of radius r. */
  const circle = (r: number) => ({ rx: Math.SQRT2 * r * u * COS30, ry: Math.SQRT2 * r * u * 0.5 })
  return { iso, circle, u }
}

export const pts = (list: P[]) => list.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
export const path = (list: P[]) => list.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ')
