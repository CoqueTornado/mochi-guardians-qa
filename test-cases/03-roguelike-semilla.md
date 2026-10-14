# 03. La Gran Grieta (Roguelike)

## TC-ROGU-01 – Mapa de expedición
**Precondición:**  
- Entrar al modo La Gran Grieta desde el menú principal.  
- Semilla de generación fijada a valor conocido (ej. 12345) para reproducibilidad.  

**Pasos:**  
1. Iniciar una nueva run con la semilla 12345.  
2. Observar la generación del mapa en cada piso (1 a 6).  

**Datos de prueba:**  
- Semilla: 12345.  
- Número de pisos: 6.  
- Distribución esperada de nodos (basada en algoritmo conocido):  
  - Piso 1: 1 nodo (inicio).  
  - Piso 2: 2 nodos.  
  - Piso 3: 3 nodos.  
  - Piso 4: 2 nodos.  
  - Piso 5: 3 nodos.  
  - Piso 6: 1 nodo (jefe).  

**Resultado esperado:**  
- El árbol de nodos generado coincide exactamente con la distribución esperada para la semilla 12345.  
- Cada nodo está conectado únicamente a nodos del piso inmediatamente anterior o posterior (sin saltos).  
- No hay nodos aislados ni conexiones que soporten más de un salto de piso.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura de mapa `tc-rogu-01-seed12345.png` (estructura de nodos coincide).  
**Estado:** Ejecutado – Pass  

---

## TC-ROGU-02 – Nodos conectados
**Precondición:**  
- Run en curso, jugador en un nodo del piso *n* (no el último).  

**Pasos:**  
1. Intentar moverse a un nodo del piso *n+2* (saltando un piso).  
2. Intentar moverse a un nodo del mismo piso *n* (movimiento horizontal no permitido).  
3. Moverse únicamente a nodos del piso *n+1* que estén conectados mediante líneas visibles.  

**Datos de prueba:**  
- Piso actual: 3.  
- Nodos accesibles según el mapa: A (conectado a 1 y 2 del piso 4), B (conectado solo a 2 del piso 4).  

**Resultado esperado:**  
- El movimiento a nodos del piso *n+2* está bloqueado (no se puede seleccionar, aparece tooltip “No conectado”).  
- El movimiento horizontal dentro del mismo piso está bloqueado (tooltip “Solo se puede avanzar al siguiente piso”).  
- Solo se permite seleccionar nodos que tengan una línea de conexión visible desde el nodo actual.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-rogu-02-movement.mp4` (intentos bloqueados, movimiento permitido solo a nodos conectados).  
**Estado:** Ejecutado – Pass  

---

## TC-ROGU-03 – Reliquias en Grieta
**Precondición:**  
- Run en curso, jugador ha derrotado a un nodo que otorga reliquia (icono de cofre visible).  
- Reliquia de tipo “Alcance +1” disponible para recoger.  

**Pasos:**  
1. Recoger la reliquia al pasar por el nodo.  
2. Verificar que aparezca en el HUD y que su efecto se aplique.  

**Datos de prueba:**  
- Reliquia: Alcance +1 (increase tower range by 1 tile).  
- Torre de prueba: Arquera (rango base 3 tiles).  

**Resultado esperado:**  
- Tras recoger, el ícono de la reliquia aparece en la fila de reliquias del HUD.  
- Todas las torres de tipo arquera ven su rango aumentado de 3 a 4 tiles inmediatamente (verificado mediante indicador de rango al seleccionar torre).  
- El efecto persiste para toda la run hasta que se pierda la reliquia (no aplicable en esta prueba).  

**Resultado obtenido:** ✅ Pasa (vinculado a KAN-12, ver defecto DEF-004)  
**Evidencia:** Captura `tc-rogu-03-relic.png` (ícono HUD, rango torre aumentado a 4).  
**Estado:** Ejecutado – Pass  

---

## TC-ROGU-04 – Derrota en expedición
**Precondición:**  
- Run en curso, jugador con 1 vida restante.  
- Próximo encuentro enemigo causará pérdida de vida (daño ≥ vida actual).  

**Pasos:**  
1. Permitir que el enemigo ataque y reduzca la vida del jugador a 0.  
2. Observar el fin de la run y la pantalla de resultados.  

**Datos de prueba:**  
- Vida inicial del jugador: 5.  
- Daño del encuentro letal: 5 o más.  

**Resultado esperado:**  
- Al llegar a 0 vidas, la run termina inmediatamente.  
- Se muestra la pantalla de derroto con texto “Run finalizada” y botón “Reclamar recompensa”.  
- La recompensa otorgada es oro ×0,5 (redondeado hacia abajo) del oro acumulado durante la run.  
- No se otorgan reliquias ni progreso de desbloqueo permanente.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura `tc-rogu-04-defeat.png` (oro reducido a mitad, pantalla de recompensas).  
**Estado:** Ejecutado – Pass  

---

## TC-ROGU-05 – Recarga F5 en Grieta
**Precondición:**  
- Run en curso, jugador ha seleccionado un nodo pendiente (resaltado) pero aún no ha ingresado al combate.  
- Reliquias activas: al menos una (ej. Congelación +10%).  

**Pasos:**  
1. Presionar F5 (recargar página) mientras el nodo pendiente está resaltado.  
2. Esperar que la página se recargue y el juego vuelva al mismo punto.  
3. Verificar que el nodo pendiente siga estando resaltado y que las reliquias se mantengan.  

**Datos de prueba:**  
- Nodo pendiente: coordenada (piso 4, nodo B).  
- Reliquia activa: Congelación +10% (increase freeze duration by 10%).  

**Resultado esperado:**  
- Tras la recarga, el juego carga exactamente en la escena de La Gran Grieta con el mismo nodo pendiente resaltado.  
- Las reliquias recogidas previamente aparecen en el HUD con sus efectos intactos (verificado mediante tooltip de efecto).  
- No se pierde progreso de run (oro, vidas, piso actual).  

**Resultado obtenido:** ✅ Pasa (vinculado a KAN-11, ver defecto DEF-003)  
**Evidencia:** Video `tc-rogu-05-f5.mp4` (nodo pendiente mantiene resaltado, reliquias presentes tras F5).  
**Estado:** Ejecutado – Pass
