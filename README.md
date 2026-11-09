# ozali-claude-plugins

Plugins ("mods") para Claude Code que muestran datos de uso en una banda sobre el prompt.

| Plugin | Qué muestra |
| --- | --- |
| `usage-meter` | % usado de la ventana de 5 h (con tiempo de reset) y % de contexto de la sesión |
| `token-cost` | Tokens de entrada / salida de la sesión y costo aproximado (el mismo que `/cost`) |

## Instalación

En una sesión de Claude Code (terminal):

```
/plugin install usage-meter --marketplace jimmybathrooms/ozali-claude-plugins
/plugin install token-cost --marketplace jimmybathrooms/ozali-claude-plugins
```

Responde `y` para agregar el marketplace y elige el alcance.

Desde un shell:

```
claude plugin install usage-meter --marketplace jimmybathrooms/ozali-claude-plugins
claude plugin install token-cost --marketplace jimmybathrooms/ozali-claude-plugins
```

## Notas
- El % de las 5 h solo aparece con una suscripción de Claude; fuera de ella muestra `–`.
- Los tokens de `token-cost` se acumulan por turno desde que se carga el plugin.

## Desarrollo
`./sync-dev.sh <carpeta-de-mods>` copia `plugins/*` a la carpeta de mods de una sesión.
Validar: `claude plugin validate plugins/<nombre>` y `claude plugin validate .`
