# 04. Guardado y Carga

## TC-SAVE-01 – Persistencia sesión
**Precondición:**  
- Partida en curso con oro acumulado y progreso de oleada (ej. oleada 5, 250 oro).  
- localStorage vacío inicialmente.  

**Pasos:**  
1. Jugar hasta alcanzar el estado de prueba (oleada 5, 250 oro).  
2. Cerrar la pestaña del navegador (o recargar).  
3. Volver a abrir la URL del juego.  

**Datos de prueba:**  
- Oro antes de cerrar: 250.  
- Oleada antes de cerrar: 5.  

**Resultado esperado:**  
- Al recargar, el juego lee los datos de `localStorage` y restaura exactamente el mismo estado:  
  - Oro = 250.  
  - Oleada actual = 5 (con el mismo progreso de enemigos dentro de la oleada).  
  - Tablero de juego con las mismas fichas en las mismas posiciones.  
  - No se reinicia la partida ni se pierde ningún recurso.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura `tc-save-01-load.png` (oro y oleada idénticos antes y después de recarga).  
**Estado:** Ejecutado – Pass  

---

## TC-SAVE-02 – Recarga post-compra
**Precondición:**  
- Jugador ha comprado una mejora permanente en la tienda (ej. “+10% oro ganado”) y ha pagado el costo.  
- La mejora está activa y afecta los ingresos futuros.  

**Pasos:**  
1. Realizar la compra y verificar que el descuento de monedas se haya aplicado.  
2. Esperar a generar algún ingreso (por vencer un enemigo o oleada).  
3. Recargar la página (F5).  
4. Verificar que la mejora siga activa y que el costo de la compra se haya descontado correctamente.  

**Datos de prueba:**  
- Mejilla: “+10% oro ganado” (costo 500 oro).  
- Oro antes de compra: 1000.  
- Oro después de compra: 500 (descontado).  

**Resultado esperado:**  
- Tras la recarga, la mejora sigue apareciendo en el menú de mejoras activas.  
- El oro total permanece en 500 (el gasto de la compra se conserva).  
- Los ingresos futuros de oro muestran el aumento del 10% (verificado tras vencer algunos enemigos).  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-save-02-postbuy.mp4` (mejora guardada, oro descontado, ingreso aumentado).  
**Estado:** Ejecutado – Pass  

---

## TC-SAVE-03 – Campos ausentes JSON
**Precondición:**  
- Existe un archivo de guardado en `localStorage` bajo la clave `mochiSave` que es un JSON válido pero **falta** alguno de los campos opcionales (ej. `relics`, `lastWave`).  

**Pasos:**  
1. Forzar la creación de un JSON parcial (manualmente en herramientas de desarrollador):  
   ```json
   {"gold":300,"wave":2,"board":[]}
   ```  
   (faltan `relics`, `spellCooldowns`, etc.).  
2. Recargar la página y observar el comportamiento del juego.  

**Datos de prueba:**  
- Campos esperados por defecto (según código): `relics: {}`, `spellCooldowns: {}`, `adReviveUsed: false`.  

**Resultado esperado:**  
- El juego no lanza excepciones al parsear el JSON.  
- Los campos ausentes se rellenan automáticamente con sus valores por defecto definidos en el código (objetos vacíos, false, etc.).  
- La partida continúa normalmente usando esos valores por defecto.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Consola `tc-save-03-console.log` (sin errores, campos predeterminados mostrados en estado).  
**Estado:** Ejecutado – Pass  

---

## TC-SAVE-04 – JSON corrupto
**Precondición:**  
- `localStorage` contiene una cadena no válida bajo la clave `mochiSave` (ej. texto aleatorio, truncado).  

**Pasos:**  
1. Establecer manualmente el valor corrupto:  
   ```javascript
   localStorage.setItem('mochiSave', '¡esto no es json!');
   ```  
2. Recargar la página.  
3. Observar cómo el juego maneja la corrupción.  

**Datos de prueba:**  
- Valor corrupto: cualquier cadena que no sea JSON parseable.  

**Resultado esperado:**  
- Al intentar parsear, se captura la excepción y el juego reinicia el estado a un **estado limpio conocido** (nueva partida con oro inicial 100, oleada 1, tablero vacío).  
- No se muestra ninguna pantalla de error al usuario; simplemente empieza una partida nueva.  
- El valor corrupto se sobrescribe con el nuevo estado limpio.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-save-04-corrupt.mp4` (estado limpio tras corrupción, sin excepciones en consola).  
**Estado:** Ejecutado – Pass
