# 02. Jefes con Dos Fases

## TC-BOSS-01 – Aparición del jefe
**Precondición:**  
- Finalizando oleada 9, barra de progreso de oleada al 100%.  
- No hay jefe activo en pantalla.  

**Pasos:**  
1. Esperar el spawn del oleada 10.  
2. Observar la aparición del jefe y los elementos asociados.  

**Datos de prueba:**  
- Jefe de prueba: “Gran Hollincito”.  

**Resultado esperado:**  
- Aparece un aviso visual (“¡Jefe entrante!”) en la parte superior central durante 2 segundos.  
- Se muestra la barra de vida del jefe encima de la pantalla.  
- La música de fondo cambia a la pista de jefe (verificada por cambio de volumen y espectro).  
- El patrón de ataque del jefe comienza inmediatamente después del aviso.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-boss-01-spawn.mp4` (aviso, barra de vida, cambio de música).  
**Estado:** Ejecutado – Pass  

---

## TC-BOSS-02 – Cambio a fase 2
**Precondición:**  
- Jefe en fase 1 con vida actual entre 51% y 100% de su máximo.  

**Pasos:**  
1. Reducir la vida del jefe hasta que llegue exactamente al 50% (usar daño controlado).  
2. Observar la transición a fase 2.  

**Datos de prueba:**  
- Vida máxima del jefe: 2000 HP.  
- Umbral de fase 2: 1000 HP.  

**Resultado esperado:**  
- Al alcanzar exactamente el 50% de vida, el jefe realiza una animación única de transformación (parpadeo + cambio de sprite).  
- No hay congelamiento del combate: las torres continúan atacando y los enemigos menores siguen spawns.  
- Tras la animación, el jefe adquiere nuevos patrones de ataque (ej. golpe área) y su barra de vida cambia de color (de verde a rojo).  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura `tc-boss-02-phase2.png` (animación de fase, barra roja, nuevo patrón).  
**Estado:** Ejecutado – Pass  

---

## TC-BOSS-03 – Daño continuo jefe
**Precondición:**  
- Jefe en transición de fase 1 → fase 2 (animación en curso).  
- Proyectiles de torre en vuelo hacia el jefe.  

**Pasos:**  
1. Permitir que los proyectiles en vuelo impacten al jefe durante su animación de transformación.  
2. Verificar que el daño se aplique correctamente.  

**Datos de prueba:**  
- Daño por proyectil: 50 HP.  
- Número de proyectiles en vuelo: 3.  

**Resultado esperado:**  
- Cada proyectil que impacte durante la animación resta su daño completo al HP del jefe.  
- No hay invulnerabilidad durante la transformación (excepto efectos explícitos de escudo, que no están presentes en este jefe).  
- Al final de la animación, el HP del jefe refleja el daño acumulado de todos los impactos.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Log de daño `tc-boss-03-damage.log` (150 HP restados durante animación).  
**Estado:** Ejecutado – Pass  

---

## TC-BOSS-04 – Cierre combate jefe
**Precondición:**  
- Jefe con vida actual > 0 pero cercana a 0 (≤ daño de un proyectil).  
- Último proyectil necesario para matar al jefe en vuelo.  

**Pasos:**  
1. Dejar que el proyectil impacte y reduzca el HP del jefe a 0 o menos.  
2. Observar los eventos posteriores a la muerte del jefe.  

**Datos de prueba:**  
- Recompensas por jefe: 100 oro + 1 reliquia aleatoria.  

**Resultado esperado:**  
- Al reducir el HP del jefe a 0, se reproduce la animación de muerte (colapso + partículas).  
- Se muestra la pantalla de victoria con texto “¡Jefe derrotado!” y botón “Reclamar recompensas”.  
- Al pulsar “Reclamar recompensas”, se acredita al jugador el oro y la reliquia indicados.  
- La música vuelve a la pista de combate normal y se avanza a la siguiente oleada (o pantalla de fin de campaña si corresponde).  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-boss-04-victory.mp4` (animación muerte, pantalla victoria, recompensa).  
**Estado:** Ejecutado – Pass
