export type Line = string

declare module 'claude-code' {
  interface PluginState {
    'usage-meter': { line: Line }
  }
}
