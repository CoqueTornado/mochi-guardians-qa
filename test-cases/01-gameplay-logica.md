# 01. Lógica de Gameplay y Combate

## TC-GAME-01 – Invocar ficha
**Precondición:**  
- Partida en oleada 1, oro disponible ≥ 10.  
- Tablero con al menos una celda vacía.  

**Pasos:**  
1. Seleccionar una ficha de invocación (costo 10 oro).  
2. Arrastrarla a una celda vacía del tablero.  
3. Soltar la ficha.  

**Datos de prueba:**  
- Oro inicial: 100.  
- Celda objetivo: (columna 2, fila 1).  

**Resultado esperado:**  
- Se resta 10 oro del total.  
- La ficha aparece en la celda seleccionada.  
- Si el tablero está lleno (15 celdas ocupadas), la acción es rechazada y se muestra tooltip “Tablero lleno”.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura de pantalla `tc-game-01-pass.png` (oro disminuye, ficha colocada).  
**Estado:** Ejecutado – Pass  

---

## TC-GAME-02 – Botón ×2 (doble ganancia)
**Precondición:**  
- Oleada en curso, botón ×2 inicialmente bloqueado (candado visible).  
- Condición de desbloqueo: haber fusionado al menos 3 veces en la oleada actual.  

**Pasos:**  
1. Realizar 3 fusiones válidas en el tablero.  
2. Observar el estado del botón ×2.  
3. Hacer clic en el botón ×2.  

**Datos de prueba:**  
- Número de fusiones necesarias: 3.  

**Resultado esperado:**  
- Tras la tercera fusión, el candado desaparece y el botón se habilita.  
- Al hacer clic, el multiplicador de oro ganado pasa a 2x durante 5 segundos (icono de reloj visible).  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Video `tc-game-02-x2.gif` (candado se desbloquea, icono de 2x aparece).  
**Estado:** Ejecutado – Pass  

---

## TC-GAME-03 – Fusión de fichas
**Precondición:**  
- Dos fichas idénticas (mismo nivel y tipo) adyacentes horizontal o verticalmente.  
- Ninguna de ellas está en proceso de fusión o enfriamiento.  

**Pasos:**  
1. Arrastrar una ficha sobre la otra idéntica.  
2. Soltar para iniciar la fusión.  

**Datos de prueba:**  
- Tipo de ficha: Mochi Básico (nivel 1).  
- Posición inicial: (2,1) y (2,2).  

**Resultado esperado:**  
- Ambas fichas desaparecen.  
- Aparece una ficha del nivel inmediatamente superior (nivel 2) en la celda de destino.  
- Se reproduce una onda expansiva visual y se otorga oro de bonificación (5 oro).  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura `tc-game-03-fusion.png` (ficha nivel 2 creada, +5 oro).  
**Estado:** Ejecutado – Pass  

---

## TC-GAME-04 – Alcance vs voladores
**Precondición:**  
- Enemigo volador (ej. Hollincito Alado) fuera del rango de ataque cuerpo a cuerpo ( > 1 celda).  
- Torre cuerpo a cuerpo posicionada para atacar solo celdas adyacentes.  
- Torre de rango (arquera) posicionada para atacar a distancia.  

**Pasos:**  
1. Dejar que el enemigo volador se acerque a 2 celdas de la torre cuerpo a cuerpo.  
2. Observar si la torre cuerpo a cuerpo dispara.  
3. Dejar que el enemigo entre en rango de la torre de rango y observar su ataque.  

**Datos de prueba:**  
- Rango cuerpo a cuerpo: 1 celda.  
- Rango distancia: 3 celdas.  

**Resultado esperado:**  
- Torre cuerpo a cuerpo **no** ataca mientras el enemigo está fuera de rango (1 celda o más).  
- Torre de rango ataca normalmente cuando el enemigo está dentro de su rango.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Log de combate `tc-game-04-range.log` (cuerpo a cuerpo: 0 disparos; distancia: 3 disparos).  
**Estado:** Ejecutado – Pass  

---

## TC-GAME-05 – Congelación
**Precondición:**  
- Enemigo con efecto de congelación aplicado (ícono de nieve visible).  
- No haber sido congelado en los últimos 5 segundos (inmunidad activa).  

**Pasos:**  
1. Aplicar un nuevo efecto de congelación al enemigo (por torre o habilidad).  
2. Medir la duración del ralentización (velocidad reducida al 50%).  
3. Tras finalizar el ralentización, verificar que se applique inmunidad.  

**Datos de prueba:**  
- Duración base de congelación: 1.2 segundos.  
- Duración de inmunidad post-congelación: 5 segundos.  

**Resultado esperado:**  
- La velocidad del enemigo se reduce al 50% exactamente durante 1.2 segundos.  
- Tras esos 1.2 segundos, el enemigo recupera velocidad normal y gana un efecto de inmunidad que impide cualquier nueva congelación durante 5 segundos.  
- Intentar aplicar congelación nuevamente durante la inmunidad no tiene efecto.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Gráfica de velocidad `tc-game-05-freeze.csv` (velocidad 0.5 durante 1.2s, inmunidad 5s).  
**Estado:** Ejecutado – Pass  

---

## TC-GAME-06 – Fin de oleada
**Precondición:**  
- Último enemigo de la oleada actual en pantalla con HP > 0.  
- Jugador con suficiente daño pendiente para derrotarlo.  

**Pasos:**  
1. Dejar que las torres ataquen hasta reducir el HP del último enemigo a 0.  
2. Observar los eventos que ocurren tras la muerte.  

**Datos de prueba:**  
- Oro otorgado por vencer oleada: 20 oro (base) + bonificaciones de reliquias.  

**Resultado esperado:**  
- Al morir el último enemigo, se otorga inmediatamente el oro de la oleada al jugador.  
- Se abre automáticamente la pausa de preparación (panel “Oleada completada – Presiona Continuar”).  
- Durante la pausa, el combate no avanza y se muestran botones de mejora y tienda.  

**Resultado obtenido:** ✅ Pasa  
**Evidencia:** Captura `tc-game-06-waveend.png` (oro aumentado, pausa de preparación visible).  
**Estado:** Ejecutado – Pass
