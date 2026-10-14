# DEF-002 — Girar pantalla pierde estado
**Jira Ticket:** KAN-10

**Summary:**
Al rotar el dispositivo (o simular un cambio de viewport entre horizontal y vertical), el juego pierde el estado de la batalla: posiciones de unidades, enfriamientos de hechizos y bandera de uso de revivir por anuncio.

**Description:**
La transición entre las escenas `Game` (horizontal) y `GameVertical` (vertical) no transfiere adecuadamente los datos críticos de la partida, provocando reinicios visuales y de lógica que rompen la experiencia.

**Steps to Reproduce:**
1. Iniciar una partida en orientación horizontal y avanzar hasta que haya unidades en el tablero y hechizos en enfriamiento.
2. Activar el modo de diseño adaptable de Firefox y cambiar el viewport a una forma vertical (ej. 390×844).
3. Observar qué elementos de la batalla desaparecen o se reinician.
4. Rotar nuevamente a horizontal y verificar si el estado se recupera.

**Expected Result:**
Al cambiar de orientación, el juego debe trasladar todos los datos de batalla relevantes mediante un objeto `BattleCarry` que incluya:
- `boardUnits`: posición, tipo y nivel de cada ficha en el tablero.
- `spellCooldowns`: tiempo restante de enfriamiento para cada hechizo activo.
- `adReviveUsed`: bandera indicando si ya se ha usado el revivir por anuncio en esta oleada.
La escena de destino debe inicializarse con esos valores, haciendo que la batalla continúe exactamente como estaba.

**Actual Result:**
Tras la rotación, el tablero se muestra vacío, los hechizos vuelven a estar listos (enfriamiento 0) y la bandera de revivir se resetea a false, obligando al jugador a perder progreso y recursos.

**Root Cause:**
La llamada a `scene.start` para la escena objetivo no incluía el parámetro `data` con la instancia de `BattleCarry`. Solamente se pasaba la escena clave, sin estado.

**Fix:**
Modificar el listener de resize / cambio de orientación para que construya un `BattleCarry` a partir del estado actual de `BattleScene` y lo pase como segundo argumento:
```ts
const carry = new BattleCarry(this.board.units, this.spellCooldowns, this.adReviveUsed);
this.scene.start(targetSceneKey, carry);
```
Este cambio se introdujo en el commit `f19a39a`.

**Verification Steps:**
1. Preparar una batalla con:
   - Al menos una unidad en el tablero (tipo Mochi Guerrero, posición (2,2)).
   - Un hechizo en enfriamiento (ej. Congelación con 1.5s restantes).
   - `adReviveUsed = true` (simular uso previo).
2. Cambiar la orientación a vertical y luego volver a horizontal.
3. Verificar que:
   - La unidad siga en (2,2) con mismo tipo y nivel.
   - El hechizo de Congelación muestre 1.5s de enfriamiento restante.
   - El indicador de revivir por anuncio siga mostrando "usado".
4. Confirmar que no se haya perdido oro, vida del castillo ni ola actual.

**Test Cases Affected:**
- TC-UI-01 (cambio entre horizontal y vertical).

**Attachments:**
- Video `def002-before.mp4` (pérdida de estado al girar).
- Video `def002-after.mp4` (estado preservado tras fix).
