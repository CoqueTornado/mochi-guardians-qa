# DEF-004 — Reliquias de alcance, congelación y cambio de oferta sin efecto en el juego

| Campo | Valor |
|---|---|
| **ID** | DEF-004 |
| **Severidad** | Medio |
| **Estado** | Cerrado (verificado en código) |
| **Componente** | `src/core/labyrinth.ts` (`relicMods()`), `src/scenes/GameScene.ts`, `src/scenes/GameSceneVertical.ts`, `src/scenes/BattleScene.ts`, `src/scenes/LabyrinthScene.ts` |
| **Versión con el defecto** | `1e0d939` (y `master` hasta `56c20e3`) |
| **Versión de la corrección** | [PENDIENTE] (no hay un commit específico; el primer commit que la contiene es `f19a39a`, un *checkpoint* que agrupa trabajo sin confirmar) |
| **Entorno** | Análisis de código fuente. No reproducido en ejecución. |

## Descripción
Las reliquias de La Gran Grieta de tipo alcance (Catalejo Empañado, +60; Ojo del Ciclón, +200), congelación (Canica de Hielo y similares) y cambio de oferta (Moneda de Dos Caras) se ofrecían y se podían elegir, pero no tenían ningún efecto en el juego: `relicMods()` calculaba `range`, `freeze` y `reroll`, pero ninguna otra parte del código leía esos valores.

## Pasos de reproducción (reconstruidos del código; no ejecutados)
1. Iniciar una expedición de La Gran Grieta y obtener el Catalejo Empañado o el Ojo del Ciclón.
2. Entrar en un combate y comparar el alcance de las fichas con y sin la reliquia.
3. Repetir con una reliquia de congelación (duración del hielo) y con la Moneda de Dos Caras (botón de cambiar en la oferta de reliquias).

## Resultado esperado
Alcance ampliado en +60 / +200, congelación más larga y un cambio de oferta por reliquia de reroll.

## Resultado obtenido (versión `1e0d939`)
Sin efecto. En `1e0d939`, una búsqueda de `relics.range`, `relics.freeze` y `relicMods(...).reroll` solo encuentra la definición en `labyrinth.ts` y la asignación `this.relics = relicMods(...)` en `GameScene.ts` y `GameSceneVertical.ts`; ningún sitio lee `range` ni `freeze`, y el único `reroll` fuera de `labyrinth.ts` pertenece al sistema de mejoras (`boons.ts`).

## Evidencia
Después (`f19a39a`), el flujo completo está conectado:
- Alcance: `canHit()` suma `this.relics?.range` en `GameScene.ts` y en `GameSceneVertical.ts`.
- Congelación: `freezeEnemy()` en `BattleScene.ts` multiplica la duración por `1 + this.relics.freeze`, con el tope de `relicMods()` (1,2).
- Cambio de oferta: `LabyrinthScene.rerollRelics()` y el botón de cambiar usan `relicMods(this.run.relics).reroll`.
- `tests/labyrinth.test.mjs` comprueba el tope de congelación, pero no que los tres efectos se consuman. Verificación manual en navegador: [PENDIENTE].

## Riesgo residual
Sin prueba automatizada del consumo, un cambio futuro podría volver a desconectar los efectos sin que `npm test` falle. El alcance no tiene tope en `relicMods()`.
