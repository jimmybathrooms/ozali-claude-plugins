# ozali-claude-plugins

Plugins ("mods") para Claude Code que muestran datos de uso, la carpeta y la rama activa en una banda sobre el prompt, alineada a la derecha (cada plugin en su propia línea).

| Plugin | Qué muestra |
| --- | --- |
| `usage-meter` | `⏲` % usado de la ventana de 5 h (con tiempo de reset, `↻2h11m`) y % de contexto de la sesión |
| `token-cost` | `⇄` Tokens de entrada / salida de la sesión y costo aproximado (el mismo que `/cost`) |
| `path-indicator` | Carpeta activa de la sesión (`⌂ ~/ruta`) |
| `git-branch` | Rama de git activa (`⎇ main`); no muestra nada fuera de un repo |
| `ozali-suite` | Concentrador: instala los cuatro anteriores de una vez |

## Instalación

Todo de una vez (con el concentrador):

```
claude plugin marketplace add jimmybathrooms/ozali-claude-plugins
claude plugin install ozali-suite@ozali-claude-plugins
```

Individual:

En una sesión de Claude Code (terminal):

```
/plugin install usage-meter --marketplace jimmybathrooms/ozali-claude-plugins
/plugin install token-cost --marketplace jimmybathrooms/ozali-claude-plugins
/plugin install path-indicator --marketplace jimmybathrooms/ozali-claude-plugins
/plugin install git-branch --marketplace jimmybathrooms/ozali-claude-plugins
```

Responde `y` para agregar el marketplace y elige el alcance.

Desde un shell:

```
claude plugin install usage-meter --marketplace jimmybathrooms/ozali-claude-plugins
claude plugin install token-cost --marketplace jimmybathrooms/ozali-claude-plugins
claude plugin install path-indicator --marketplace jimmybathrooms/ozali-claude-plugins
claude plugin install git-branch --marketplace jimmybathrooms/ozali-claude-plugins
```

## Personalización

Cada plugin (menos `ozali-suite`) tiene dos opciones, en `/config` (filas `<plugin>.enabled` y `<plugin>.theme`) o en `settings.json` bajo `pluginConfigs`:

| Opción | Valores | Para qué |
| --- | --- | --- |
| `enabled` | `true` (por defecto) / `false` | Oculta o muestra la línea de ese plugin sin desinstalarlo |
| `theme` | `light` (por defecto) / `dark` / `auto` | Paleta de colores. `light` para fondo claro, `dark` para fondo oscuro, `auto` sigue el tema de Claude Code |

Paleta (cada línea, ícono y texto, usa el color de su plugin):

| Elemento | `light` | `dark` |
| --- | --- | --- |
| `⏲` usage-meter | `#B45309` | `#FBBF24` |
| `⇄` token-cost | `#0F766E` | `#5EEAD4` |
| `⌂` path-indicator | `#0369A1` | `#7DD3FC` |
| `⎇` git-branch | `#A21CAF` | `#E879F9` |

Para quitar un plugin por completo (ni siquiera carga), deshabilítalo o desinstálalo:

```
claude plugin disable git-branch@ozali-claude-plugins
claude plugin enable git-branch@ozali-claude-plugins
```

## Notas
- El % de las 5 h solo aparece con una suscripción de Claude; fuera de ella muestra `–`.
- Los tokens de `token-cost` se acumulan por turno desde que se carga el plugin.

## Desarrollo
`./sync-dev.sh <carpeta-de-mods>` copia `plugins/*` a la carpeta de mods de una sesión.
Validar: `claude plugin validate plugins/<nombre>` y `claude plugin validate .`
