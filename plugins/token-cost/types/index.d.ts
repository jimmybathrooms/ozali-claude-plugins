export type Totals = { input: number; output: number; cacheRead: number; cacheWrite: number }

declare module 'claude-code' {
  interface PluginState {
    'token-cost': { totals: Totals; costUsd: number }
  }
}
