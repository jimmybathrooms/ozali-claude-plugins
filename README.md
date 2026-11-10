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

## Notas
- El % de las 5 h solo aparece con una suscripción de Claude; fuera de ella muestra `–`.
- Los tokens de `token-cost` se acumulan por turno desde que se carga el plugin.

## Desarrollo
`./sync-dev.sh <carpeta-de-mods>` copia `plugins/*` a la carpeta de mods de una sesión.
Validar: `claude plugin validate plugins/<nombre>` y `claude plugin validate .`
