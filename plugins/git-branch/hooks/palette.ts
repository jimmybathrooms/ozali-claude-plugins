// Paleta de los plugins ozali. Cada plugin lleva su propia copia (se instalan por separado).
//   light: colores oscuros/saturados, legibles sobre fondo claro.
//   dark:  colores claros/pastel, legibles sobre fondo oscuro.
//   auto:  claves del tema de Claude Code, siguen el tema de la persona.
export type Scheme = 'light' | 'dark' | 'auto'
export type Accent = 'usage' | 'tokens' | 'path' | 'branch'

const PALETTE = {
  light: { usage: '#B45309', tokens: '#0F766E', path: '#0369A1', branch: '#A21CAF' },
  dark: { usage: '#FBBF24', tokens: '#5EEAD4', path: '#7DD3FC', branch: '#E879F9' },
  auto: { usage: 'warning', tokens: 'success', path: 'permission', branch: 'suggestion' },
} as const

export const palette = (theme: unknown) => PALETTE[theme === 'dark' || theme === 'auto' ? theme : 'light']

// Opción `enabled` del plugin: encendido salvo que se apague explícitamente.
export const isOn = (options: Readonly<Record<string, unknown>>) => options.enabled !== false
