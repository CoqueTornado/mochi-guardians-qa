# DEF-003 — Recargar la página en La Gran Grieta pierde el nodo pendiente y encalla la expedición

| Campo | Valor |
|---|---|
| **ID** | DEF-003 |
| **Severidad** | Alto |
| **Estado** | Cerrado (verificado en código) |
| **Componente** | `src/core/labyrinth.ts`, `src/scenes/LabyrinthScene.ts` |
| **Versión con el defecto** | `1e0d939` (sin `pendingNode`, `pendingRelics`, `pendingResult` ni `battle` en `RunState`) |
| **Versión de la corrección** | [PENDIENTE] (no hay un commit específico; primer commit que la contiene: `f19a39a`) |
| **Entorno** | Análisis de código fuente. No reproducido en ejecución. |

## Descripción
Al recargar el navegador con un nodo de la Grieta elegido pero no resuelto, la expedición no recordaba ese nodo y quedaba sin forma de continuar.

## Pasos de reproducción (reconstruidos del código; no ejecutados)
1. Iniciar una expedición y elegir un nodo sin resolverlo (o dejar abierta una oferta de reliquias).
2. Recargar la página (F5).
3. Volver a abrir La Gran Grieta.

## Resultado esperado
La expedición se reanuda en el mismo nodo y estado.

## Resultado obtenido (versión anterior)
El estado de la expedición no incluía el nodo pendiente: la elección se perdía y la expedición no podía avanzar.

## Evidencia
- `f19a39a`: `pendingNode(run)` identifica un nodo elegido y no resuelto; `RunState` guarda `pendingRelics`, `pendingResult` y `battle`; `LabyrinthScene.create()` reabre el combate, la oferta de reliquias o el nodo pendiente («Encuentro pendiente tras recargar el navegador»); `choicesOf()` no ofrece nodos nuevos mientras haya uno pendiente.
- `1e0d939`: ninguna de esas cuatro construcciones existe en `core/labyrinth.ts`.
- `tests/labyrinth.test.mjs` fija `pendingRelics` y `pendingResult` en algunos casos; no hay una prueba de recarga completa. `test:browser-review` (Playwright) cubre «recarga de ofertas y combates de Grieta» según el `README.md` del juego; no se ha ejecutado: [PENDIENTE].
