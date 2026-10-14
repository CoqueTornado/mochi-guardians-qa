# DEF-004 — Reliquias de alcance, congelación y cambio de oferta sin efecto
**Jira Ticket:** KAN-12

**Summary:**
Ciertas reliquias (Alcance, Congelación y Cambio de Oferta) no aplicaban sus modificadores correspondientes tanto en el modo campaña como en La Gran Grieta, a pesar de mostrarse correctamente en el HUD.

**Description:**
El sistema de reliquias lee correctamente la lista de objetos obtenidos y los muestra en el HUD, pero la lógica que consulta los modificadores (`relics.range`, `relics.freeze`, `relics.reroll`) estaba accesando siempre el objeto por defecto vacío debido a un error de scope en el módulo de combate.

**Steps to Reproduce:**
1. Obtener una reliquia de Alcance +1 (ya sea mediante nodo, jefe o tienda).
2. Verificar que el ícono aparezca en el HUD con el texto "Alcance +1".
3. Seleccionar una torre de rango (arquera) y comprobar su rango real de ataque (debería ser base +1).
4. Repetir el proceso con reliquia de Congelación (debería aumentar la duración del efecto) y Cambio de Oferta (debería reducir el costo de la tienda en un 10%).

**Expected Result:**
- Alcance +1 aumenta el rango de todas las torres de rango en 1 tile.
- Congelación +X aumenta la duración de todos los efectos de congelación en X% (ej. +20% → 1.2s → 1.44s).
- Cambio de Oferta reduce el precio de todos los objetos de la tienda en el porcentaje indicado (ej. oferta 20% → costo ×0.8).

**Actual Result:**
El HUD muestra la reliquia, pero los valores de `relics.range`, `relics.freeze` y `relics.reroll` leídos por los sistemas de combate y tienda eran siempre 0 o el objeto vacío, haciendo que los efectos fueran nulos.

**Root Cause:**
En `src/combat/CombatModifier.ts`, la función `getActiveRelics()` retornaba `this.defaultRelics` (un objeto vacío) en lugar de `this.save.getRelics()` debido a una referencia incorrecta al objeto `save` dentro del contexto de módulo.

**Fix:**
Corregir la referencia para que lea directamente del persistence layer:
```ts
getActiveRelics(): RelicMap {
  return this.save.getRelics();
}
```
Este cambio se introdujo en el commit `f19a39a`.

**Verification Steps:**
1. Equipar una reliquia conocida (ej. Alcance +1).
2. Medir el efecto correspondiente:
   - Para Alcance: colocar una torre arquera y observar que su círculo de rango alcance un tile adicional.
   - Para Congelación: aplicar un golpe de congelación a un enemigo y cronometrar la duración; debe ser mayor que la base según el porcentaje de la reliquia.
   - Para Cambio de Oferta: abrir la tienda y verificar que los precios mostrados coincidan con el descuento esperado.
3. Confirmar que el efecto se aplica tanto en campaña como en La Gran Grieta.

**Test Cases Affected:**
- TC-ROGU-03 (Reliquias en Grieta).
- Cualquier caso de prueba que implique reliquias de alcance, congelación o cambio de oferta (no listados explícitamente pero implícitos en equilibrio y gameplay).

**Attachments:**
- Video `def004-before.mp4` (reliquia mostrada sin efecto en rango/congelación/oferta).
- Video `def004-after.mp4` (reliquia con efecto activo tras fix).
