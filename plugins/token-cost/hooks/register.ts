import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Totals } from '../types'

const zero: Totals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
const totals = atom({ plugin: 'token-cost', key: 'totals' } as const, zero)
const costUsd = atom({ plugin: 'token-cost', key: 'costUsd' } as const, 0)

const k = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(2)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n)

const line = (t: Totals, usd: number) =>
  `in: ${k(t.input + t.cacheRead + t.cacheWrite)} · out: ${k(t.output)} · ~$${usd.toFixed(2)}`

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const u = await $.session.usage()
    if (u.cost) await update($, costUsd, () => u.cost!.usd)
    $.ui.status(line(await read($, totals), await read($, costUsd)))
    return next(e)
  })

  // Acumula los tokens al cerrar cada turno.
  on('turn.complete', async ($, e, next) => {
    const u = e.usage
    if (u) {
      await update($, totals, t => ({
        input: t.input + u.input_tokens,
        output: t.output + u.output_tokens,
        cacheRead: t.cacheRead + u.cache_read_input_tokens,
        cacheWrite: t.cacheWrite + u.cache_creation_input_tokens,
      }))
    }
    $.ui.status(line(await read($, totals), await read($, costUsd)))
    return next(e)
  })

  // El costo lo lleva el motor (/cost); aquí solo se lee.
  on('session.measure', async ($, e, next) => {
    if (e.cost) await update($, costUsd, () => e.cost!.usd)
    $.ui.status(line(await read($, totals), await read($, costUsd)))
    return next(e)
  })
}
