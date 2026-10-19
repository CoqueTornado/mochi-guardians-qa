# Tickets de Jira — Mochi Guardians

Borradores en formato Jira (tipo **Bug**). No hay claves, exportación ni evidencias de tickets creados en Jira; este documento no acredita uso de la herramienta. Los cuatro defectos están **cerrados (verificado en código)**; se redactan como registro de lo ocurrido. Clave de Jira de cada ticket: [PENDIENTE].

---

## DEF-001

**Resumen:** El combate avanza durante un anuncio intersticial

**Tipo:** Bug  **Prioridad:** Alta  **Estado:** Cerrado  **Componente:** Combate / Plataforma  **Versión de corrección:** [PENDIENTE]

**Descripción:**
Mientras se muestra un anuncio intersticial de la plataforma, la simulación del combate sigue avanzando (enemigos que se mueven, aparecen y atacan) sin que el jugador pueda actuar. Magnitud (duración del anuncio, enemigos nuevos): [PENDIENTE].

**Pasos para reproducir (reconstruidos del código, no ejecutados):**
1. Iniciar un combate en `GameScene` o `GameSceneVertical`.
2. Provocar un anuncio intersticial.
3. Observar el combate mientras el anuncio está activo.

**Resultado esperado:** El combate queda detenido mientras haya un anuncio activo.

**Resultado obtenido:** En `1e0d939`, el manejador de anuncios solo desactiva la entrada y `BattleScene.update()` no comprueba si hay un anuncio, por lo que sigue simulando.

**Entorno:** Análisis de código fuente. No reproducido en ejecución.

**Evidencia / resolución:** En `f19a39a`, `update()` empieza con `if (pokiIsAdActive()) return` y `main.ts` pausa las escenas activas durante el anuncio. Sin prueba automatizada de la guarda. Verificación manual en navegador: [PENDIENTE].

---

## DEF-002

**Resumen:** Girar la pantalla durante un combate pierde vida de unidades, enfriamientos y resurrección por anuncio

**Tipo:** Bug  **Prioridad:** Alta  **Estado:** Cerrado  **Componente:** Combate / Orientación  **Versión de corrección:** [PENDIENTE]

**Descripción:**
La batalla horizontal y la vertical son escenas distintas. Al cambiar de orientación, la escena nueva reconstruía el combate sin la vida de las unidades del tablero, los enfriamientos de los hechizos ni la marca de resurrección por anuncio ya gastada.

**Pasos para reproducir (reconstruidos del código, no ejecutados):**
1. Iniciar un combate; dejar que una unidad pierda vida y que un hechizo quede en enfriamiento.
2. Cambiar la orientación del viewport.
3. Comparar vida de las unidades, enfriamientos y resurrección por anuncio.

**Resultado esperado:** El combate continúa idéntico en la otra orientación.

**Resultado obtenido:** La escena nueva partía de la partida guardada, que no contiene esos datos. En `1e0d939`, `battle-carry.ts` no define `boardUnits`, `spellCooldowns` ni `adReviveUsed`.

**Entorno:** Análisis de código fuente. No reproducido en ejecución.

**Evidencia / resolución:** En `f19a39a`, `BattleCarry` transporta esos campos por el `data` de `scene.start`. Sin prueba automatizada de la restauración de `boardUnits` y `spellCooldowns`. Verificación manual: [PENDIENTE].

---

## DEF-003

**Resumen:** Recargar la página en La Gran Grieta pierde el nodo pendiente y encalla la expedición

**Tipo:** Bug  **Prioridad:** Alta  **Estado:** Cerrado  **Componente:** La Gran Grieta / Guardado  **Versión de corrección:** [PENDIENTE]

**Descripción:**
Al recargar el navegador con un nodo elegido y no resuelto, la expedición no recordaba ese nodo y no podía continuar.

**Pasos para reproducir (reconstruidos del código, no ejecutados):**
1. Iniciar una expedición y elegir un nodo sin resolverlo (o dejar abierta una oferta de reliquias).
2. Recargar la página (F5).
3. Volver a abrir La Gran Grieta.

**Resultado esperado:** La expedición se reanuda en el mismo nodo y estado.

**Resultado obtenido:** En `1e0d939`, `RunState` no tiene `pendingNode`, `pendingRelics`, `pendingResult` ni `battle`; la elección se perdía.

**Entorno:** Análisis de código fuente. No reproducido en ejecución.

**Evidencia / resolución:** En `f19a39a`, `pendingNode()` y los campos pendientes de `RunState` se restauran en `LabyrinthScene.create()`. Sin prueba automatizada de recarga completa; `test:browser-review` (Playwright) no se ha ejecutado: [PENDIENTE].

---

## DEF-004

**Resumen:** Reliquias de alcance, congelación y cambio de oferta sin efecto en el juego

**Tipo:** Bug  **Prioridad:** Media  **Estado:** Cerrado  **Componente:** La Gran Grieta / Reliquias  **Versión de corrección:** [PENDIENTE]

**Descripción:**
Las reliquias de alcance (Catalejo Empañado +60, Ojo del Ciclón +200), congelación (Canica de Hielo y similares) y cambio de oferta (Moneda de Dos Caras) se podían obtener pero no tenían efecto: `relicMods()` calculaba `range`, `freeze` y `reroll` y ningún otro código los leía.

**Pasos para reproducir (reconstruidos del código, no ejecutados):**
1. Iniciar una expedición de La Gran Grieta y obtener una de esas reliquias.
2. Entrar en combate y comparar el alcance de las fichas, la duración del hielo o el botón de cambiar oferta con y sin la reliquia.

**Resultado esperado:** Alcance +60 / +200, congelación más larga y un cambio de oferta por reliquia de reroll.

**Resultado obtenido:** Sin efecto. En `1e0d939`, ninguna lectura de `relics.range`, `relics.freeze` ni de `relicMods(...).reroll` fuera de `labyrinth.ts`.

**Entorno:** Análisis de código fuente. No reproducido en ejecución.

**Evidencia / resolución:** En `f19a39a`, `canHit()` (`GameScene.ts`, `GameSceneVertical.ts`), `freezeEnemy()` (`BattleScene.ts`) y `LabyrinthScene.rerollRelics()` consumen los tres valores. Sin prueba automatizada del consumo. Verificación manual: [PENDIENTE].
