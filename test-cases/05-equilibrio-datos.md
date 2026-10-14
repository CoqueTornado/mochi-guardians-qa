# 05. Equilibrio y Datos

## TC-BAL-01 – Oro inicial
**Precondición:** Nueva partida desde el menú principal (no se carga ningún guardado).

**Pasos:**
1. Iniciar una nueva partida.
2. Consultar inmediatamente el oro disponible en el HUD.

**Datos de prueba:**
- Oro inicial definido en constantes: 100.

**Resultado esperado:**
- El HUD muestra exactamente 100 oro al comienzo de la partida.
- No se otorgan bonificaciones ni se aplican modificadores antes de la primera oleada.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Captura `tc-bal-01-start.png` (oro = 100).
**Estado:** Ejecutado – Pass

---

## TC-BAL-02 – Curva de vida oleadas
**Precondición:** Partida en curso, observar la vida (HP) de los enemigos oleada a oleada (excluyendo jefes).

**Pasos:**
1. Anotar el HP máximo de los enemigos estándar en cada oleada desde la 1 hasta la 9.
2. Verificar que el incremento sea progresivo y sin saltos anómalos.

**Datos de prueba:**
- Fórmula esperada (del código): `baseHP = 20 + (wave-1)*5`.
  - Oleada 1: 20 HP
  - Oleada 2: 25 HP
  - Oleada 3: 30 HP
  - …
  - Oleada 9: 60 HP

**Resultado esperado:**
- El HP máximo de los enemigos estándar sigue exactamente la fórmula anterior para cada oleada no jefa.
- No hay aumentos repentinos (ej. de 30 a 100 HP) salvo en oleadas de jefe, que se manejan por separado.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Tabla `tc-bal-02-wavehp.csv` (valores coinciden con fórmula).
**Estado:** Ejecutado – Pass

---

## TC-BAL-03 – Topes de reliquias
**Precondición:** Jugador en posición de obtener reliquias (vencer nodos, jefes, o compras en tienda). Conocer los límites máximos definidos para cada tipo de reliquia (ej. alcance máximo +3).

**Pasos:**
1. Intentar acumular más reliquias del mismo tipo que el límite permite (por ejemplo, obtener 4 reliquias de alcance cuando el tope es 3).
2. Observar si el cuarto objeto tiene efecto o es ignorado.

**Datos de prueba:**
- Reliquia de alcance: tope máximo = +3 (es decir, 3 unidades otorgadas).
- Cada unidad otorga +1 rango a torres.

**Resultado esperado:**
- Al obtener la 4.º reliquia del mismo tipo, el juego no aumenta el efecto más allá del tope.
- El contador de reliquias puede mostrar 4, pero el efecto aplicado se mantiene en el valor máximo permitido (en este caso, +3 rango).
- Se muestra un tooltip informativo al intentar superar el tope: “Límite máximo alcanzado”.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Captura `tc-bal-03-reliccap.png` (cuarta reliquia recogida, efecto aún +3).
**Estado:** Ejecutado – Pass
