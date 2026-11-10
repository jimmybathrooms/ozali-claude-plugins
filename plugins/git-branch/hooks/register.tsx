import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import { isOn, palette } from './palette'

const POLL_MS = 3000

const branchAtom = atom({ plugin: 'git-branch', key: 'branch' } as const, '')

const git = async ($: any, cwd: string, args: string[]) => {
  const r = await $.process.run(['git', ...args], { cwd, timeoutMs: 2000 }).catch(() => undefined)
  return r && r.exitCode === 0 ? String(r.stdout).trim() : ''
}

// Rama actual: nombre, o `@sha` si el HEAD está desacoplado; '' si no es repo git.
const currentBranch = async ($: any): Promise<string> => {
  const cwd = await $.session.cwd()
  const name = await git($, cwd, ['rev-parse', '--abbrev-ref', 'HEAD'])
  if (name !== 'HEAD') return name
  const sha = await git($, cwd, ['rev-parse', '--short', 'HEAD'])
  return sha ? `@${sha}` : ''
}

// Relee la rama y solo escribe el átomo si cambió (cada escritura repinta la banda).
const refresh = async ($: any) => {
  const next = await currentBranch($)
  if (next !== (await read($, branchAtom))) await update($, branchAtom, () => next)
}

let timer: { cancel: () => void } | undefined

export const register: Register = (on, options) => {
  const c = palette(options.theme)

  on('session.start', async ($, e, next) => {
    await refresh($)
    // El render se cachea: sin un reloj la rama quedaba fija si cambiaba por fuera (otra terminal, checkout, etc.).
    timer?.cancel()
    timer = $.clock.every(POLL_MS, () => void refresh($).catch(() => {}))
    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const branch = await read($, branchAtom)
    if (!isOn(options) || e.props.hasSurvey || !branch) return next(e) // sin repo git
    const rest = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Box justifyContent="flex-end">
          <Box width={46}>
            <Text color={c.branch}>⎇ </Text>
            <Text color={c.branch} wrap="truncate-end">{branch}</Text>
          </Box>
        </Box>
        {rest}
      </Box>
    )
  })
}
