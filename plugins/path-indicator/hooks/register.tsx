import type { Register } from 'claude-code'

// Reemplaza el home por ~ para acortar la ruta.
const short = (p: string, home?: string) => (home && p.startsWith(home) ? '~' + p.slice(home.length) : p)

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const cwd = await $.session.cwd()
    const rest = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Box justifyContent="flex-end">
          <Text color="cyan">📁 {short(cwd, '/Users/' + cwd.split('/')[2])}</Text>
        </Box>
        {rest}
      </Box>
    )
  })
}
