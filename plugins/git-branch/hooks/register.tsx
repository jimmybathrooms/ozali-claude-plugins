import type { Register } from 'claude-code'

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const cwd = await $.session.cwd()
    const r = await $.process.run(['git', 'rev-parse', '--abbrev-ref', 'HEAD'], { cwd, timeoutMs: 2000 }).catch(() => undefined)
    const branch = r && r.exitCode === 0 ? r.stdout.trim() : ''
    if (!branch) return next(e) // no es repo git
    const rest = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Box justifyContent="flex-end">
          <Text color="magenta">🌿 {branch}</Text>
        </Box>
        {rest}
      </Box>
    )
  })
}
