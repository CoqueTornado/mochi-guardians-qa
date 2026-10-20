# DEF-002 — Girar la pantalla durante un combate pierde el estado de la batalla

| Campo | Valor |
|---|---|
| **ID** | DEF-002 |
| **Severidad** | Alto |
| **Estado** | Cerrado (verificado en código) |
| **Componente** | `src/core/battle-carry.ts`, `src/scenes/BattleScene.ts` |
| **Versión con el defecto** | Estado de la foto de batalla anterior a `f19a39a` (en `1e0d939` no existen `boardUnits`, `spellCooldowns` ni `adReviveUsed`) |
| **Versión de la corrección** | [PENDIENTE] (no hay un commit específico; primer commit que la contiene: `f19a39a`) |
| **Entorno** | Análisis de código fuente. No reproducido en ejecución. |

## Descripción
La batalla horizontal y la vertical son dos escenas distintas. Al girar el dispositivo, la escena que llega reconstruía el combate y perdía la vida de las unidades del tablero, los enfriamientos de los hechizos y la marca de resurrección por anuncio ya gastada.

## Pasos de reproducción (reconstruidos del código; no ejecutados)
1. Iniciar un combate y dejar que una unidad pierda vida y que un hechizo quede en enfriamiento.
2. Cambiar la orientación del viewport (o girar el dispositivo).
3. Comparar la vida de las unidades, los enfriamientos y la posibilidad de resurrección por anuncio.

## Resultado esperado
El combate continúa idéntico en la otra orientación.

## Resultado obtenido (versión anterior)
La escena nueva partía de la partida guardada, que no contiene esos datos.

## Evidencia
- `BattleCarry` (`f19a39a`) incluye `boardUnits` (vida y enfriamientos de cada unidad), `spellCooldowns`, `adReviveUsed`, además de vida del castillo, enemigos vivos, temporizadores y oleada anunciada. Se transporta por el `data` de `scene.start`.
- `1e0d939`: `grep` de `boardUnits|spellCooldowns|adReviveUsed` en `battle-carry.ts` devuelve 0 resultados.
- `tests/scenes.test.mjs` comprueba que la Grieta pasa su encargo y restaura el combate en ambas orientaciones. No hay una comprobación automatizada de que `boardUnits` y `spellCooldowns` se restauran. Comprobación manual: [PENDIENTE].
