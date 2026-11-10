import type { Register } from 'claude-code'

import { isOn, palette } from './palette'

export const register: Register = (on, options) => {
  const c = palette(options.theme)

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!isOn(options) || e.props.hasSurvey) return next(e)
    const cwd = await $.session.cwd()
    const r = await $.process.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], { cwd, timeoutMs: 2000 }).catch(() => undefined)
    const branch = r && r.exitCode === 0 ? r.stdout.trim() : ''
    if (!branch) return next(e) // no es repo git
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
