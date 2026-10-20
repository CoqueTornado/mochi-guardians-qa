# DEF-001 — El combate avanza durante un anuncio intersticial

| Campo | Valor |
|---|---|
| **ID** | DEF-001 |
| **Severidad** | Alto |
| **Estado** | Cerrado (verificado en código) |
| **Componente** | `src/scenes/BattleScene.ts`, `src/main.ts`, `src/platform/poki.ts` |
| **Versión con el defecto** | `1e0d939` (y `master`, `56c20e3`) |
| **Versión de la corrección** | [PENDIENTE] (no hay un commit específico; el primer commit que contiene la corrección es `f19a39a`, un *checkpoint* que agrupa trabajo sin confirmar) |
| **Entorno** | Análisis de código fuente. No reproducido en ejecución. |

## Descripción
Mientras se muestra un anuncio intersticial de la plataforma, la simulación del combate seguía avanzando: los enemigos se movían, aparecían y atacaban sin que el jugador pudiera actuar. Magnitud observada (duración del anuncio, enemigos nuevos): [PENDIENTE].

## Pasos de reproducción (reconstruidos del código; no ejecutados)
1. Iniciar un combate en `GameScene` o `GameSceneVertical`.
2. Provocar un anuncio intersticial (en desarrollo, con el simulador de anuncios del SDK).
3. Observar el combate mientras el anuncio está activo.

## Resultado esperado
El combate queda detenido mientras haya un anuncio activo.

## Resultado obtenido (versión `1e0d939`)
El manejador de anuncios de `main.ts` solo ejecuta `game.input.enabled = false`; `BattleScene.update()` comienza sin ninguna comprobación de anuncio, por lo que sigue simulando.

## Evidencia
- Antes (`1e0d939`): `BattleScene.update()` empieza con `const dtReal = …` y su único `return` temprano depende de `overlay`, `started` y `tutorialText`.
- Después (`f19a39a`): `update()` empieza con `if (pokiIsAdActive()) return`, la condición de simulación incluye `pokiIsAdActive()` y el manejador de `main.ts` guarda la partida y pausa con `game.scene.pause()` todas las escenas activas salvo `Music` y `Boot`, reanudándolas al terminar.
- No existe una comprobación automatizada de esta guarda (búsqueda de `AdActive` en `tests/`: sin resultados). Comprobación manual en navegador: [PENDIENTE].

## Riesgo residual
Sin prueba de regresión automatizada, la guarda podría eliminarse sin que `npm test` falle.
