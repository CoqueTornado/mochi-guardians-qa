# DEF-001 — El combate avanza durante un anuncio intersticial
**Jira Ticket:** KAN-9

**Summary:**
Durante la reproducción de un anuncio intersticial (ads), el lógica de combate continúa ejecutándose, provocando que enemigos sigan avanzando y dañen el castillo mientras el jugador no puede interactuar.

**Description:**
En el juego, cuando se muestra un anuncio intersticial (por ejemplo, tras completar una oleada), se espera que el proceso de juego quede pausado para evitar que el progreso se vea afectado mientras el jugador está indisponible. Sin embargo, el bucle `update()` de `BattleScene` no verifica el estado del anuncio, permitiendo que el combate siga avanzando.

**Steps to Reproduce:**
1. Iniciar una partida y llegar a una oleada que dispare un anuncio intersticial (puede forzarse con modo debug o alta frecuencia de ads).
2. Mientras el anuncio está en pantalla, observar el comportamiento de los enemigos y el castillo.
3. Medir el daño recibido al castillo durante la duración del anuncio.

**Expected Result:**
El combate debe quedar completamente pausado mientras se muestra cualquier tipo de anuncio intersticial; ni los enemigos ni los proyectiles deben avanzar, y el castillo no debe recibir daño.

**Actual Result:**
Los enemigos continúan su movimiento y ataque; el castillo pierde HP proporcional al tiempo que dura el anuncio (ej. 2 HP por segundo de anuncio).

**Root Cause:**
En `src/scenes/BattleScene.ts`, el método `update()` llama a `this.physics.update()` y a los sistemas de IA y proyectiles sin comprobar si `pokiIsAdActive()` retorna true.

**Fix:**
Añadir una guarda temprana en `BattleScene.update()`:
```ts
if (pokiIsAdActive()) return;
```
Este cambio se introdujo en el commit `f19a39a`.

**Verification Steps:**
1. Forzar la aparición de un anuncio intersticial (mediante bandera de depuración o configuración de Poki SDK).
2. Mientras el anuncio está visible, confirmar que:
   - Enemigos no cambian de posición (posición X/Y idéntica a la anterior).
   - Proyectiles no se spawn ni se mueven.
   - El HP del castillo permanece constante.
3. Tras finalizar el anuncio, verificar que el combate reanuda normalmente desde el punto en que se pausó.

**Test Cases Affected:**
- TC-GAME-01 a TC-GAME-06 (cualquier caso que implique paso de tiempo durante anuncio).
- TC-UI-03 (pausa y anuncios).

**Attachments:**
- Video `def001-before.mp4` (combate avanza durante anuncio).
- Video `def001-after.mp4` (combate pausado tras fix).
