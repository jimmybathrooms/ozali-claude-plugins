import type { Register } from 'claude-code'

import { isOn, palette } from './palette'

// Reemplaza el home por ~ para acortar la ruta.
const short = (p: string, home?: string) => (home && p.startsWith(home) ? '~' + p.slice(home.length) : p)

export const register: Register = (on, options) => {
  const c = palette(options.theme)

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (!isOn(options) || e.props.hasSurvey) return next(e)
    const cwd = await $.session.cwd()
    const rest = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Box justifyContent="flex-end">
          <Box width={46}>
            <Text color={c.path}>⌂ </Text>
            <Text color={c.path} wrap="truncate-end">{short(cwd, '/Users/' + cwd.split('/')[2])}</Text>
          </Box>
        </Box>
        {rest}
      </Box>
    )
  })
}
