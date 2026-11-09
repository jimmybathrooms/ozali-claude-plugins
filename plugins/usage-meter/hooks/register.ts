import type { Register } from 'claude-code'

type Limit = { kind: string; percentUsed: number; resetsAt?: string }

const fmt = (n: number) => `${Math.round(n)}%`

const resetIn = (iso?: string) => {
  if (!iso) return ''
  const mins = Math.max(0, Math.round((Date.parse(iso) - Date.now()) / 60000))
  return ` (reset ${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}m)`
}

const line = (context: { percent?: number }, limits: Limit[]) => {
  const five = limits.find(l => l.kind === 'five_hour')
  const parts = [
    five ? `5h: ${fmt(five.percentUsed)}${resetIn(five.resetsAt)}` : '5h: –',
    context.percent !== undefined ? `ctx: ${fmt(context.percent)}` : 'ctx: –',
  ]
  return parts.join(' · ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const u = await $.session.usage()
    $.ui.status(line(u.context, u.rateLimits))
    return next(e)
  })

  on('session.measure', ($, e, next) => {
    $.ui.status(line(e.context, e.rateLimits))
    return next(e)
  })
}
