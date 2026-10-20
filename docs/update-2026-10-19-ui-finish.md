# Regresión de interfaz y recorridos — 19/10/2026

Correcciones solicitadas a partir de capturas de juego. La validación usa Edge/Chromium con viewports simulados; no son sesiones en dispositivos físicos.

## Cambios comprobados

- Mapa horizontal: círculos suaves, detalle de enemigos separado del aviso del nivel y cierre visible por encima del fondo, también al repintar el mapa.
- Ejército vertical: bordes de tarjeta y barras de fragmentos sin estirar las texturas pequeñas anteriores.
- Taberna/Posada horizontal: tarjeta «Tu mago» contenida en el panel, con borde redondeado y texto ajustado.
- Vida de fortaleza horizontal: etiqueta visible, mago separado y ayuda al tocar las dos primeras veces. Después permanece disponible con pulsación larga. Solo confirmar la explicación incrementa el contador guardado.
- Grieta vertical: equis abajo a la derecha en el panel de entrada y en el mapa de expedición; la salida de la expedición conserva su confirmación de retirada.
- Mina: cantidades completas ajustadas a su espacio, con ocho dígitos en la prueba de estrés.
- Nombres de invocación: se conservan completos reduciendo el tamaño; se comprueban las 107 cartas en cada escenario, sin presentar esas repeticiones como escenarios independientes.
- Recorridos: accesos a Tendedero, Biblioteca/Cripta, Barracones, Santuario, Torre y Grieta; pasos tras árboles, altar y edificios. La ocultación usa recortes del fondo y ordenación por la altura de los pies. La parte tapada de una criatura no intercepta el clic de un edificio.
- «Gota Muerta» pasa a «Gota Chunga».
- Foso vertical: agua con gradiente, orilla y reflejos, terminando antes de la muralla pintada. Sin modificar las fórmulas de frenado o daño.

## Evidencia

[`integration.json`](../evidence/2026-10-19/ui-finish/integration.json) reúne cuatro escenarios de integración: dos bandos × dos orientaciones, con doce aperturas de panel. Se usan fixtures de progreso y recursos; no se afirma una partida humana completa. El script del proyecto privado es `npm run test:browser-ui-finish`.

Las aserciones verifican clic/toque real de salida, separación entre aviso y criaturas, límites de cantidades, nombres completos, secuencia de dos explicaciones y persistencia, límite del agua antes de la muralla, diferencia de imagen entre criatura delante/detrás de una máscara y retorno real de la Grieta a la guarida.

[`residents.json`](../evidence/2026-10-19/ui-finish/residents.json) recoge cuatro escenarios adicionales de paseos: desplazamiento por los tramos definidos, ficha de la criatura pulsada, incorporación de una nueva carta, zoom/pellizco y conservación de habitantes al girar. El foco de la criatura se fija en la fixture para evitar que otra que pasa por delante sustituya el objetivo durante la prueba.

Capturas representativas:

- [Mapa horizontal](../evidence/2026-10-19/ui-finish/mochi-landscape-map.png).
- [Tarjeta del mago](../evidence/2026-10-19/ui-finish/hollin-landscape-inn.png).
- [Ejército vertical](../evidence/2026-10-19/ui-finish/hollin-portrait-army.png).
- [Foso vertical](../evidence/2026-10-19/ui-finish/mochi-portrait-battle.png).
- [Explicación de la vida](../evidence/2026-10-19/ui-finish/mochi-landscape-health-help.png).
- [Cierre del panel de Grieta](../evidence/2026-10-19/ui-finish/mochi-portrait-rift.png).
- [Confirmación de retirada](../evidence/2026-10-19/ui-finish/mochi-portrait-rift-retreat.png).

## Estado de las comprobaciones

Tipado, compilación de ambas ediciones y pruebas centradas en escenas, rutas y catálogos: aprobados. Las pruebas de navegador anteriores están aprobadas. El [manifiesto](../evidence/2026-10-19/ui-finish/demo-manifest.json) y la [validación del paquete](../evidence/2026-10-19/ui-finish/package-validation.json) identifican la nueva demo.

La auditoría general `test:geometry`, limitada en esta ejecución a iPhone SE simulado en horizontal y dos bandos, **no pasa**. Tras corregir el uso de texturas en modo HEADLESS, mide 68 pantallas y sigue señalando textos por debajo de 11 px CSS, zonas táctiles menores de 44 px y solapes de zonas. No detecta textos fuera del lienzo, enterrados o escritos encima de otros en esas dos configuraciones. [Salida completa](../evidence/2026-10-19/ui-finish/test-geometry.txt).

No se ha repetido toda la cadena general `npm test`; no se anuncia como aprobada. Tampoco se acredita FPS en teléfonos, revisión nativa de traducciones ni aprobación editorial de portales.
