> **Registro histórico (13–14/10/2026).** Estas cifras no certifican la demo actual. Consulta [el README](../README.md) y el informe de la entrega de 18/10/2026.

# Comprobaciones Automatizadas — Mochi Guardians

| Campo | Valor |
|---|---|
| **Proyecto** | Mochi Guardians (identificador de paquete npm: `scrapline`) |
| **Árbol de código analizado** | Commit `f19a39a95ce7679343b15c5758c51f705a6eac54` (`f19a39a`), rama `checkpoint/pre-poki-polish` del repositorio del juego |
| **Fecha del recuento** | 13/10/2026; reproducido el 14/10/2026 sobre el mismo commit con idéntico resultado |
| **Suites encadenadas por `npm test`** | 53 (54 cabeceras `> scrapline@0.1.0 test…` si se cuenta la propia `test`) |
| **Comprobaciones reportadas** | **5.929, como mínimo** (3.150 líneas `ok` + 2.779 en recuentos consolidados) |
| **Código de salida de `npm test`** | `0` |
| **Rama por defecto del juego** | `master` contiene `f19a39a` desde el 14/10/2026 (avance rápido desde `56c20e3`) |
| **Commits de mantenimiento de tests (repositorio del juego)** | `b302ab6` (arranque y aserción del cráter, §5.1), `bfc0f5c` (robustez ante CRLF, §6), `2d45fa6` y `2fe9e3b` (fixtures y valores límite, §5.2) y `4472086` (aserciones del taller); todos solo `tests/` |
| **Commit de este repositorio de QA** | Ver el historial de Git de este repositorio. Un commit no puede citar su propio hash dentro de los ficheros que contiene |

> **La cifra es un mínimo, no un total.** Cinco suites no imprimen ningún recuento ni líneas `ok` (véase §4) y los 21 scripts `test:browser*` de Playwright no forman parte de `npm test`: su resultado final (18 aprobados y 3 fallidos tras §5.2; 15 y 6 tras §5.1; 11 y 10 antes) está en §5 y no se suma a la cifra.

---

## 1. Qué son estas pruebas

Son **scripts de prueba propios ejecutados con Node.js**: ficheros `tests/*.test.mjs` que importan el código TypeScript del juego, lo empaquetan con **esbuild** y lo ejecutan con **node**. No usan un framework de pruebas ni el ejecutor de pruebas integrado de Node.js. Cada script imprime líneas `ok`/`FAIL` o un recuento y termina con código de salida distinto de cero si algo falla.

Hay cuatro formas de comprobación, según el script:

1. **Lógica y datos sin motor gráfico.** Importan módulos de `src/core/` (fórmulas de daño, tablas de balance, generación de La Grieta por semilla, reliquias, mejoras, reto diario, traducciones) sin Phaser ni DOM.
2. **Análisis del código fuente.** `test:scenes`, `test:battle-preview`, `test:combat-feedback` y `test:guardian-visual` leen el texto de las escenas y verifican con expresiones regulares o con el árbol de sintaxis que ciertas reglas se cumplen (por ejemplo, que una escena reinicia sus campos al reentrar).
3. **Phaser en modo *headless* bajo Node.** `test:geometry` y `test:rift` arrancan el juego real sin navegador: `test:geometry` mide textos y zonas sensibles de las pantallas; `test:rift` entra en La Gran Grieta, pulsa un nodo de combate y comprueba que el combate arranca y vuelve con el resultado.
4. **Pruebas de navegador con Playwright.** 21 scripts `test:browser*` (véase §5). No están en `npm test`.

## 2. Comandos

Se ejecutan desde la raíz del proyecto del juego (`scrapline/`).

```bash
npm test            # encadena las 53 suites de la tabla de §4
npm run check       # tsc --noEmit (tipado estricto)
npm run build       # limpia dist, tsc --noEmit, vite build y tests/build-output.test.mjs
```

`npm run build` **no** ejecuta `npm test`. Son cadenas independientes.

Suites que se citan con frecuencia, con lo que comprueban según la cabecera de su fichero:

| Comando | Qué comprueba |
|---|---|
| `npm run test:logic` | `smoke.test.mjs`: las constantes y fórmulas del juego reproducen las tablas verificadas de `sim/balance.py` (DPS, vida por oleada, cocina de invocación, coste de reclutar, guardado base). |
| `npm run test:scenes` | `scenes.test.mjs`: análisis del código de las escenas. Campos que se reinician en `create()`, listeners del DOM que se retiran al cerrar, efectos de cámara, y que la Grieta pasa su encargo y restaura el combate en ambas orientaciones. |
| `npm run test:i18n` | `i18n.test.mjs`: completitud de la traducción al inglés de cartas, monstruos, jefes, niveles, capítulos y rarezas. **El juego tiene dos idiomas de interfaz, español e inglés** (`type Lang = 'es' \| 'en'` en `src/core/i18n.ts`). |
| `npm run test:labyrinth` | `labyrinth.test.mjs`: La Gran Grieta. Misma semilla, mismo mapa; semillas distintas, mapas distintos; accesibilidad de nodos sobre cientos de mapas; topes de las reliquias acumuladas. |
| `npm run test:rift` | `rift.test.mjs`: Phaser *headless*; entra en La Grieta, pulsa un nodo y comprueba que el combate arranca con el encargo correcto. |
| `npm run test:hooks` | `hooks.test.mjs`: mejoras de partida (`core/boons`), ganchos de oleada (`core/battle-hooks`), rendimiento, flujo del jugador, métricas y reto diario. Recuento consolidado: 1.392. |
| `npm run test:battle-preview` | `battle-preview.test.mjs`: avisos tácticos de la próxima oleada y del resultado de una fusión, que deben salir de las mismas funciones que deciden el juego. Recuento consolidado: 955. |
| `npm run test:cards` | `cards.test.mjs`: cartas, ocho elementos y unidades de dos casillas. |
| `npm run test:touch` | `touch.test.mjs`: reglas del esquema táctil (objetivo mínimo de 44 px CSS, suelo de tamaño de letra, umbral de arrastre). |
| `npm run test:review` | `review-regressions.test.mjs`: reto diario, botín según edificios abiertos, objetivos, visitas y cartas por compañero. No imprime recuento. |
| `npm run test:geometry` | `geometry.test.mjs`: Phaser *headless*; mide cada texto y cada zona sensible de los paneles de la guarida. |

## 3. Salida literal de ejecución

Extractos copiados de la ejecución del 14/10/2026 sobre `f19a39a`. Se conserva el nombre interno del paquete (`scrapline@0.1.0`) tal como lo imprime npm.

```text
> scrapline@0.1.0 test:logic
> esbuild tests/smoke.test.mjs --bundle --format=esm --platform=node --outfile=tests/.smoke.bundle.mjs && node tests/.smoke.bundle.mjs


  tests\.smoke.bundle.mjs  396.9kb

Done in 21ms
ok  : dps(1)=8
ok  : dps(6)=8*2.2^5
ok  : waveHp(50) = la tabla del §8 por la dureza de jefe
ok  : los jefes son cinco veces más duros que antes
ok  : una cocina de nivel 1 siempre saca un 1
ok  : las probabilidades siempre suman uno
```

```text
> scrapline@0.1.0 test:scenes
> node tests/scenes.test.mjs

ok  : BaseScene: reinicia this.hudCells al entrar
ok  : BaseScene: reinicia this.worldHidden al entrar
ok  : BaseScene: reinicia this.deckSlots al entrar
```

```text
> scrapline@0.1.0 test:labyrinth
> esbuild tests/labyrinth.test.mjs --bundle --format=esm --platform=node --outfile=tests/.labyrinth.bundle.mjs && node tests/.labyrinth.bundle.mjs


  tests\.labyrinth.bundle.mjs  404.7kb

Done in 26ms
ok  : la misma semilla da el mismo mapa siempre
ok  : semillas distintas dan mapas distintos
ok  : el generador reparte por todo el rango
```

```text
> scrapline@0.1.0 test:hooks
> esbuild tests/hooks.test.mjs --bundle --format=esm --platform=node --outfile=tests/.hooks.bundle.mjs --log-level=error && node tests/.hooks.bundle.mjs

OK hooks: 1392 comprobaciones
```

```text
> scrapline@0.1.0 test:i18n
> esbuild tests/i18n.test.mjs --bundle --format=esm --platform=node --outfile=tests/.i18n.bundle.mjs && node tests/.i18n.bundle.mjs


  tests\.i18n.bundle.mjs  306.2kb

Done in 16ms
ok  : las 107 cartas tienen entrada en inglés
ok  : los 80 monstruos tienen entrada en inglés
ok  : los 12 jefes tienen entrada en inglés
```

## 4. Desglose de las 53 suites de `npm test`

Método del recuento: se sumó una unidad por cada línea que empieza por `ok` y, en las suites que imprimen `OK <nombre>: N comprobaciones`, se sumó N.

| Suite | Fichero (`tests/`) | Tipo de reporte | Comprobaciones |
|---|---|---|---|
| `test:kitchen` | `kitchen.test.mjs` | Recuento consolidado | 47 |
| `test:platform` | `platform.test.mjs` | Sin cifra (`PASS` sin recuento) | — |
| `test:logic` | `smoke.test.mjs` | Una línea `ok` por comprobación | 126 |
| `test:cards` | `cards.test.mjs` | Una línea `ok` por comprobación | 129 |
| `test:bestiary` | `bestiary.test.mjs` | Una línea `ok` por comprobación | 64 |
| `test:magic` | `magic.test.mjs` | Una línea `ok` por comprobación | 101 |
| `test:ranks` | `ranks.test.mjs` | Una línea `ok` por comprobación | 135 |
| `test:summon` | `summon.test.mjs` | Una línea `ok` por comprobación | 98 |
| `test:rescue` | `rescue.test.mjs` | Una línea `ok` por comprobación | 37 |
| `test:i18n` | `i18n.test.mjs` | Una línea `ok` por comprobación | 45 |
| `test:scenes` | `scenes.test.mjs` | Una línea `ok` por comprobación | 500 |
| `test:guardian-visual` | `guardian-visual.test.mjs` | Sin cifra (`OK` sin recuento) | — |
| `test:libsort` | `libsort.test.mjs` | Recuento consolidado | 235 |
| `test:battle-preview` | `battle-preview.test.mjs` | Recuento consolidado | 955 |
| `test:combat-feedback` | `combat-feedback.test.mjs` | Recuento consolidado | 72 |
| `test:textures` | `textures.test.mjs` | Una línea `ok` por comprobación | 71 |
| `test:minions` | `minions.test.mjs` | Una línea `ok` por comprobación | 47 |
| `test:laneallies` | `laneallies.test.mjs` | Una línea `ok` por comprobación | 67 |
| `test:castle` | `castle.test.mjs` | Una línea `ok` por comprobación | 68 |
| `test:story` | `story.test.mjs` | Una línea `ok` por comprobación | 37 |
| `test:touch` | `touch.test.mjs` | Una línea `ok` por comprobación | 43 |
| `test:faction` | `faction.test.mjs` | Una línea `ok` por comprobación | 114 |
| `test:dark` | `dark.test.mjs` | Una línea `ok` por comprobación | 63 |
| `test:labyrinth` | `labyrinth.test.mjs` | Una línea `ok` por comprobación | 112 |
| `test:tactics` | `tactics.test.mjs` | Una línea `ok` por comprobación | 164 |
| `test:spirit` | `spirit.test.mjs` | Una línea `ok` por comprobación | 65 |
| `test:mines` | `mines.test.mjs` | Una línea `ok` por comprobación | 98 |
| `test:bonds` | `bonds.test.mjs` | Una línea `ok` por comprobación | 63 |
| `test:quick-merge` | `quick-merge.test.mjs` | Una línea `ok` por comprobación | 12 |
| `test:tomes` | `tomes.test.mjs` | Una línea `ok` por comprobación | 49 |
| `test:veterans` | `veterans.test.mjs` | Una línea `ok` por comprobación | 28 |
| `test:loot` | `loot.test.mjs` | Una línea `ok` por comprobación | 81 |
| `test:guardians` | `guardians.test.mjs` | Una línea `ok` por comprobación | 35 |
| `test:tales` | `tales.test.mjs` | Una línea `ok` por comprobación | 32 |
| `test:sheet` | `sheet.test.mjs` | Una línea `ok` por comprobación | 66 |
| `test:sheet-guide` | `sheet-guide.test.mjs` | Una línea `ok` por comprobación | 13 |
| `test:market` | `market.test.mjs` | Una línea `ok` por comprobación | 40 |
| `test:art` | `art.test.mjs` | Una línea `ok` por comprobación | 64 |
| `test:rift` | `rift.test.mjs` | Una línea `ok` por comprobación | 102 |
| `test:intro` | `intro.test.mjs` | Una línea `ok` por comprobación | 5 |
| `test:geometry` | `geometry.test.mjs` | Una línea `ok` por comprobación | 49 |
| `test:lair` | `lair.test.mjs` | Una línea `ok` por comprobación | 67 |
| `test:cheat-mode` | `cheat-mode.test.mjs` | Recuento consolidado | 11 |
| `test:inbox` | `meta-inbox.test.mjs` | Recuento consolidado | 67 |
| `test:hooks` | `hooks.test.mjs` | Recuento consolidado | 1392 |
| `test:deferred-art` | `deferred-art.test.mjs` | Sin cifra (`OK` sin recuento) | — |
| `test:boss-music` | `boss-music.test.mjs` | Sin cifra (`OK` sin recuento) | — |
| `test:wave-pacing` | `wave-pacing.test.mjs` | Una línea `ok` por comprobación | 3 |
| `test:families` | `spell-families.test.mjs` | Una línea `ok` por comprobación | 47 |
| `test:mage-save` | `mage-progress.test.mjs` | Una línea `ok` por comprobación | 74 |
| `test:mage-roster` | `mage-roster.test.mjs` | Una línea `ok` por comprobación | 93 |
| `test:mage-training` | `mage-training.test.mjs` | Una línea `ok` por comprobación | 43 |
| `test:review` | `review-regressions.test.mjs` | Sin cifra (`OK` sin recuento) | — |

**Totales:** 3.150 (líneas `ok`) + 2.779 (recuentos consolidados) = **5.929**.

**Suites sin cifra (5):** `test:platform`, `test:guardian-visual`, `test:deferred-art`, `test:boss-music` y `test:review`. Pasan (código de salida 0) pero no imprimen recuento ni líneas `ok`. `test:platform` imprime 26 líneas `PASS:`, que **no** están incluidas en la cifra de 5.929.

## 5. Pruebas de navegador con Playwright

El proyecto incluye 21 scripts `test:browser*` que usan Playwright con **Chromium en el canal Microsoft Edge** (`channel: process.env.BROWSER_CHANNEL || 'msedge'`), en modo *headless*, sobre un servidor de desarrollo de Vite. **No usan Firefox.** No forman parte de `npm test`.

**Ejecución del 14/10/2026** sobre `f19a39a` (árbol con saltos de línea LF, en una copia fuera del repositorio del juego), un script tras otro, sin reintentos. **Resultado: 11 aprobados y 10 fallidos de 21.** La columna «Líneas de resultado» cuenta las líneas `ok`/`OK`/`passed` que imprime cada script; no es un recuento homogéneo de comprobaciones.

| Script | Resultado | Duración | Líneas de resultado / motivo del fallo |
|---|---|---|---|
| `test:browser-review` | Aprobado | 44 s | 2 |
| `test:browser-engagement` | Aprobado | 28 s | 2 |
| `test:browser-first-minute` | Aprobado | 9 s | 4 |
| `test:browser-opening` | Aprobado | 52 s | 4 |
| `test:browser-first-night` | Aprobado | 77 s | 4 |
| `test:browser-first-five` | Aprobado | 160 s | 8 |
| `test:browser-opening-polish` | Aprobado | 8 s | 1 |
| `test:browser-opening-panels` | Aprobado | 13 s | 1 |
| `test:browser-boon-pick` | Aprobado | 44 s | 1 |
| `test:browser-inn-roster` | Aprobado | 9 s | 3 |
| `test:browser-companion-fusion` | Aprobado | 16 s | 4 |
| `test:browser-inbox` | **Fallido** | 95 s | Tiempo agotado (90 s) esperando la escena `Intro` o `Menu` |
| `test:browser-cheat-mode` | **Fallido** | 96 s | Tiempo agotado (90 s) en `tryCheat` esperando una escena |
| `test:browser` | **Fallido** | 64 s | Tiempo agotado (60 s) esperando `Intro` o `Menu` |
| `test:browser-guardian-visual` | **Fallido** | 63 s | Tiempo agotado (60 s) esperando `Intro` o `Menu` |
| `test:browser-battle-preview` | **Fallido** | 64 s | Tiempo agotado (60 s) esperando `Intro` o `Menu` |
| `test:browser-combat-feedback` | **Fallido** | 64 s | Tiempo agotado (60 s) esperando `Intro` o `Menu` |
| `test:browser-projectiles` | **Fallido** | 94 s | Tiempo agotado (90 s) esperando `Intro` o `Menu` |
| `test:browser-combat-direction` | **Fallido** | 93 s | Tiempo agotado (90 s) esperando una escena |
| `test:browser-gameplay-polish` | **Fallido** | 9 s | `AssertionError`: `-0.5 !== 0` |
| `test:browser-tester-feedback` | **Fallido** | 5 s | `AssertionError`: «starter tutorial pieces do not mean continue» (`true !== false`) |

**Lo que se sabe de los fallos.** En los ocho fallos por tiempo agotado, el script espera una escena `Intro` o `Menu` justo después de abrir la página con un perfil sin partida guardada. Un sondeo manual con un perfil nuevo mostró las escenas `Music` y `Game` activas durante 50 s, sin `Intro` ni `Menu`, y sin errores de página ni de consola. Esto coincide con el comportamiento descrito en el `README.md` del juego (la primera visita entra directamente al combate). **Causa raíz: [PENDIENTE]** (no se ha determinado si los scripts están desactualizados respecto a ese arranque o si se esperaba otra configuración). Los dos fallos por aserción no se han analizado: [PENDIENTE]. Ninguno de los diez fallos se ha registrado como defecto del juego.

### 5.1 Mantenimiento de tests tras el cambio de flujo de arranque (14/10/2026)

Decisión de diseño de Jorge (14/10/2026): que un perfil nuevo entre directamente en combate es **intencional** («la primera visita empieza jugando»). Por tanto, los ocho scripts que esperaban `Intro` o `Menu` estaban desactualizados. Se cambiaron **solo tests**, sin tocar código del juego, en el commit `b302ab6` del repositorio del juego («Maintain browser tests after the start-up flow change»):

| Cambio | Ficheros | Motivo |
|---|---|---|
| Nuevo ayudante `tests/seed-save.mjs`: siembra una partida mínima ya empezada (`tutorialDone`) antes de abrir la página, solo si no existe ya una | `seed-save.mjs` (nuevo) | Mantenimiento de tests tras cambio de flujo de arranque |
| Los ocho scripts llaman al ayudante antes de `page.goto` | `browser-inbox`, `browser-cheat-mode`, `browser-review` (usado por `test:browser`), `browser-guardian-visual`, `browser-battle-preview`, `browser-combat-feedback`, `browser-projectiles`, `browser-combat-direction` | Mantenimiento de tests tras cambio de flujo de arranque |
| La aserción `impact.crater === 0` pasa a `-1 < impact.crater < 0` | `browser-gameplay-polish` | Aserción caducada: el código fija la profundidad del cráter en `-0.5` a propósito («por encima del terreno (-1) y por debajo de cualquier enemigo (>= 0)»). Test y código se modificaron en el mismo commit (`f19a39a`) y se contradicen en el valor, lo que indica un commit confirmado sin ejecutar esa suite. Verificación visual del cráter en Firefox: [PENDIENTE] (Jorge) |

**Antes y después (nueva ejecución del 14/10/2026 de los scripts afectados):** de **11 de 21** aprobados a **15 de 21** (y a **18 de 21** tras §5.2).

| Script | Antes | Después |
|---|---|---|
| `test:browser-gameplay-polish` | Fallido: `-0.5 !== 0` | **Aprobado** |
| `test:browser-inbox` | Fallido: tiempo agotado | **Aprobado** |
| `test:browser-cheat-mode` | Fallido: tiempo agotado | **Aprobado** |
| `test:browser-projectiles` | Fallido: tiempo agotado | **Aprobado** |
| `test:browser` | Fallido: tiempo agotado | Fallido, ahora más adelante: `assert.ok(quote.refused && quote.affordable)` (línea 117) |
| `test:browser-guardian-visual` | Fallido: tiempo agotado | Fallido, ahora más adelante: aprueba los 5 casos de Mochi y falla en `hollin/pilot horizontal`, «exactly one main sprite per logical unit» (`0 !== 9`) |
| `test:browser-battle-preview` | Fallido: tiempo agotado | Fallido, ahora más adelante: se esperaba el texto `10 → 11` y se obtuvo `Honō  1 → 2` |
| `test:browser-combat-feedback` | Fallido: tiempo agotado | Fallido, ahora más adelante: «mochi-es-h: el premio del cinco ha salido de verdad» (`6 !== 10`) |
| `test:browser-combat-direction` | Fallido: tiempo agotado | Fallido, ahora más adelante: «mochi-h: roca delante antes de rebasarla» |
| `test:browser-tester-feedback` | Fallido: aserción | Sin cambios; **pendiente de decisión de diseño** de Jorge (véase `docs/test-plan.md`) |

**Estado actual de los seis fallos:** cinco **pendientes de análisis** (`test:browser`, `test:browser-guardian-visual`, `test:browser-battle-preview`, `test:browser-combat-feedback`, `test:browser-combat-direction`) y uno **pendiente de decisión de diseño** (`test:browser-tester-feedback`). Ninguno se ha registrado como defecto del juego.

**Resultado de Playwright tras §5.1: 15 de 21 aprobados.**

**Estado tras el mantenimiento de §5.2 (14/10/2026): 18 de 21 aprobados.** Los tres restantes:

| Script | Estado | Situación |
|---|---|---|
| `test:browser-combat-feedback` | Fallido | **Pendiente de veredicto de diseño:** rama `fiveJackpot` inalcanzable con `boardValues` definidos (siempre en el juego). La aserción del premio del cinco (`tier === 10`) no se toca hasta el veredicto de Jorge, que lo reproducirá en Firefox |
| `test:browser-tester-feedback` | Fallido | **Pendiente de decisión de diseño** de Jorge (¿«continuar» con solo piezas del tutorial?) |
| `test:browser` | Fallido | **Pendiente de análisis.** Las aserciones del taller se actualizaron al modelo actual (commit `4472086`) y ya pasan; el script avanza y falla más adelante, en el flujo de derrota (véase «Comprobación del taller») |

### 5.2 Fixtures incompletas y valores límite (14/10/2026)

Cambios solo en `tests/`, sin tocar código del juego:

| Commit | Cambio | Motivo |
|---|---|---|
| `2d45fa6` | `browser-guardian-visual`: la fixture rellena `save.boardSides` con el bando probado | Fixture incompleta tras introducir `boardSides`: sin él, todas las fichas se dibujan con el atlas de Mochi (por defecto `'mochi'`) y en la variante `hollin` había 0 sprites principales de 9 esperados. `boardSides` aparece por primera vez en `f19a39a` |
| `2d45fa6` | `browser-battle-preview`: la fixture rellena `save.boardValues`; la aserción de «sin promesa de nombre» pasa a exigir que la etiqueta termine en las cifras (`10 → 11`) | Fixture incompleta tras introducir `boardValues` (por defecto 1, de ahí «1 → 2»). El formato de la etiqueta empieza ahora por el nombre de la ficha fusionada («Honō  10 → 11»), que la expresión anterior (`/Hon\|Resc/`) confundía con una promesa de sorpresa |
| `2d45fa6` | `browser-battle-preview`: el resultado de la suma 2 + 3 se comprueba por **número** (5) y no por escalón (**cambio adicional**, no incluido en la lista inicial de Jorge; aceptado por él el 14/10/2026) | Aserción caducada: el 5 anunciado en la etiqueta es el número de la ficha, no su escalón. La ficha resultante tiene escalón 4 y número 5, así que comprobar el escalón era comprobar otra magnitud. `unitAt()` devuelve ahora también `value` |
| `2d45fa6` | `browser-combat-feedback`: la fixture rellena `boardValues` de las dos fichas de 5 | Fixture incompleta tras introducir `boardValues`. La aserción del premio del cinco **no** se modifica (véase arriba) |
| `2fe9e3b` | `browser-combat-direction`: la roca empieza claramente por delante del jefe y se añaden casos de valores límite del contacto jefe-roca | Aserción inconsistente con la regla de contacto `refreshRockDepths` (introducida en `f19a39a`, el mismo commit que el test) |

**Valores límite del contacto jefe-roca.** La regla es: la roca queda detrás del jefe cuando la distancia que le falta es menor o igual que `alcance = max(80, 0,55 × lado mayor del jefe dibujado)`. Los 80 px son solo el mínimo; para el jefe del test (317 × 275 px) el alcance real es **174,3 px**, igual en horizontal y en vertical (medido ejecutando el juego). El test comprueba 30, 80, 174, 175 y 400 px: 30, 80 y 174 → detrás; 175 y 400 → delante. El valor de 80 px es decisión de diseño de Jorge; si cambia el umbral, hay que ajustar el cálculo del alcance en el test (`Math.max(80, …)`).

**Comprobación del taller (`test:browser`, 14/10/2026, solo lectura).** Pregunta: ¿`tryWorkshop()` cobra oro sin mejorar nada? **No cobra.**

- Código (`f19a39a`): `BattleScene.tryWorkshop()` solo llama a `tapOven()`, que reproduce un sonido, sacude el botón y muestra el aviso «Horno a fuego …». No hay ningún descuento de `gold`. Las únicas escrituras a `save.workshop` son reinicios a 1 (`state.ts`, `daily.ts`, `BattleScene.ts`, `BaseScene*.ts`). El calor del horno sube solo con la noche (`kitchenHeatLevel`).
- Interfaz: el botón del taller muestra el nombre del calor (por ejemplo «🔥 FUEGO SAGRADO») y no muestra ningún precio; el aviso de oro insuficiente (`kitchenWarn`) se oculta siempre.
- Ejecución (copia fuera del repositorio, horizontal y vertical): con taller 10 y oro = 3 × `kitchenQuote(10, 0).cost` (3.259.626 monedas), tres llamadas a `tryWorkshop()` más un `pointerdown` sobre el botón dejan **oro y taller sin cambios** (`workshop` 10, `gold` 3.259.626).
- Diagnóstico: expectativa caducada, no un cobro sin efecto. En `1e0d939`, `tryWorkshop()` descontaba `kitchenQuote(...).cost` y subía `save.workshop`; el test es de septiembre y no se actualizó al cambiar la mecánica en `f19a39a`. Observación: `kitchenQuote()` sigue existiendo en `core/kitchen.ts` y hoy solo la usa este test.
- Cambio aplicado (commit `4472086`, solo test, con el visto bueno de Jorge): las aserciones del taller comprueban ahora que tocar el botón no cambia el oro ni `save.workshop` y que el botón muestra el nombre del calor del horno. Motivo: aserción caducada tras el cambio de mecánica del taller.
- Resultado tras el cambio: esas aserciones pasan (Mochi/Hollín, español/inglés) y el script avanza hasta el flujo de derrota, donde falla: tras `onDefeat()` con `revivesLeft = 0`, el test espera pulsar el botón «GUARIDA» (palabras del bando) y la pantalla muestra «¿UNA SEGUNDA OPORTUNIDAD?» («Mira un vídeo y la muralla se levanta a media vida»), una oferta de resurrección con anuncio. Causa: [PENDIENTE] (no se sabe aún si el test está desactualizado o si la oferta no debería aparecer con `revivesLeft = 0`). El recuento de Playwright sigue en **18 de 21**.

**Antes y después de §5.2:**

| Script | 15 de 21 | 18 de 21 |
|---|---|---|
| `test:browser-guardian-visual` | Fallido (`0 !== 9`) | **Aprobado** |
| `test:browser-battle-preview` | Fallido (`10 → 11`) | **Aprobado** |
| `test:browser-combat-direction` | Fallido («roca delante antes de rebasarla») | **Aprobado** (4 variantes: Mochi/Hollín × horizontal/vertical) |
| `test:browser-combat-feedback` | Fallido (`6 !== 10`) | Fallido, pendiente de veredicto de diseño |
| `test:browser` | Fallido | Fallido, pendiente de análisis (el taller ya pasa; falla después en el flujo de derrota) |
| `test:browser-tester-feedback` | Fallido | Fallido, pendiente de decisión de diseño |


## 6. Interpretación y limitaciones

- **Código de salida 0:** la suite terminó sin excepción ni fallo de aserción. Un código distinto de 0 interrumpe la cadena de `npm test` en esa suite.
- **Cifra mínima:** véanse las 5 suites sin cifra y el resultado de Playwright en §5, que no se suma.
- **Nota técnica: dependencia de los saltos de línea (resuelta en las pruebas, `bfc0f5c`).** Tres suites de análisis de código fuente (`test:scenes`, `test:guardian-visual`, `test:battle-preview`) contienen expresiones regulares con `\n`. Sobre un árbol extraído con saltos de línea CRLF fallaron el 14/10/2026; con LF pasaron (53 de 53 con código de salida 0). Para reproducir el recuento hay que usar ficheros con LF. Medido el 14/10/2026 en el árbol de trabajo del juego (Windows, `core.autocrlf=true`, ficheros con CRLF): `test:battle-preview` y `test:guardian-visual` terminan con código 1 y `test:scenes` con código 0; el resultado dependía, por tanto, de la configuración de saltos de línea del entorno.

  **Corrección (14/10/2026, commit `bfc0f5c`, «robustez ante CRLF»).** Las tres suites leían el código fuente con expresiones regulares que contienen un salto de línea LF. Ahora leen los ficheros mediante `readSourceFile()` (`tests/scene-source.mjs`), que normaliza CRLF a LF. Cambio solo en `tests/`: no se tocó código del juego, ni `.gitattributes`, ni se renormalizaron ficheros.

  | Medición en el árbol de trabajo de Windows (CRLF, `core.autocrlf=true`) | Antes | Después |
  |---|---|---|
  | `test:scenes` | código 0 | código 0 |
  | `test:guardian-visual` | código 1 | código 0 |
  | `test:battle-preview` | código 1 | código 0 |
  | `npm test` completo | no ejecutado en ese árbol; con dos suites en código 1 la cadena se interrumpe | **código 0**: 54 cabeceras (53 suites), 3.150 líneas `ok` + 2.779 en recuentos consolidados = 5.929 |
- **Lo que no demuestran:** estas comprobaciones no sustituyen la verificación manual de la experiencia de juego, del rendimiento ni del comportamiento en navegadores y dispositivos distintos de los declarados en `docs/test-plan.md`.
