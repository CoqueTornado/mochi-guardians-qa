# DEF-005 — El cierre de la demo corta el mensaje chino en vertical

| Campo | Valor |
|---|---|
| Fecha | 18/10/2026 |
| Severidad | Media: impide leer el mensaje final |
| Estado | Corregido; verificado en captura y prueba de integración |
| Entorno | Windows, Playwright con Chromium/Edge, viewport 412 × 915 |
| Versión | Árbol de trabajo de la entrega de demo; hashes finales en el manifiesto |
| Origen | Inspección de capturas durante la preparación de esta entrega |

Pasos: elegir chino simplificado, completar el nivel 2 y observar el mensaje final en vertical. La automatización prepara la transición con una fixture de oleada 20; no se atribuye una partida humana completa.

Esperado: mensaje completo dentro del ancho del lienzo, con líneas legibles.

Observado antes de corregir: el mensaje permanecía en una línea más ancha que la pantalla. La captura anterior se inspeccionó durante el desarrollo, pero no se conservó como artefacto versionado.

Causa: el ajuste básico de Phaser separa por espacios. Chino y japonés pueden formar una secuencia continua que no se parte con ese algoritmo.

Corrección: usar el ajuste avanzado de Phaser para textos japoneses/chinos que tengan un ancho de ajuste definido, antes de medir y dibujar el texto.

Verificación: la matriz de integración comprueba los límites horizontales de cada texto del cierre en cinco idiomas, ambos bandos y orientaciones. La [captura posterior](../../evidence/integration/mochi-portrait-zh-end.png) muestra el mensaje completo. La misma corrección se aplica a la versión normal.
