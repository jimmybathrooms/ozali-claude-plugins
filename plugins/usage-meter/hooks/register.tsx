import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

type Limit = { kind: string; percentUsed: number; resetsAt?: string }

const lineAtom = atom({ plugin: 'usage-meter', key: 'line' } as const, '')

const fmt = (n: number) => `${Math.round(n)}%`

const resetIn = (iso?: string) => {
  if (!iso) return ''
  const mins = Math.max(0, Math.round((Date.parse(iso) - Date.now()) / 60000))
  return ` ↻${Math.floor(mins / 60)}h${String(mins % 60).padStart(2, '0')}m`
}

const line = (context: { percent?: number }, limits: Limit[]) => {
  const five = limits.find(l => l.kind === 'five_hour')
  return [
    five ? `5h: ${fmt(five.percentUsed)}${resetIn(five.resetsAt)}` : '5h: –',
    context.percent !== undefined ? `ctx: ${fmt(context.percent)}` : 'ctx: –',
  ].join(' · ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const u = await $.session.usage()
    await update($, lineAtom, () => line(u.context, u.rateLimits))
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    await update($, lineAtom, () => line(e.context, e.rateLimits))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const text = await read($, lineAtom)
    if (e.props.hasSurvey || !text) return next(e)

    const rest = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Box justifyContent="flex-end">
          <Text dimColor>⏲ {text}</Text>
        </Box>
        {rest}
      </Box>
    )
  })
}
