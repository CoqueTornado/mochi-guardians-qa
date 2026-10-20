# Plan de QA — demo, 18/10/2026

## Objetivo

Demo HTML5 con los niveles 1 y 2, cierre tras el segundo jefe e idioma y progreso local persistentes. La versión completa mantiene su campaña y añade los mismos idiomas.

## Capas

| Capa | Herramienta | Alcance |
|---|---|---|
| Reglas de demo | Node.js + esbuild, proyecto original | Límite de 20 oleadas y recuento real |
| Catálogos | Node.js + esbuild | Claves, marcadores, detección y persistencia; no calidad lingüística |
| Escenas | Playwright + Vite y puente solo de pruebas | Fixture de oleada 20; cinco idiomas, dos bandos y orientaciones |
| Producción | automation/demo-smoke.test.mjs | Build minificado real, arranque, red, errores, recarga y giro |
| Visual | Capturas seleccionadas | Limitado a las pantallas inspeccionadas |
| Manual | 28 casos diseñados | Sin ejecución registrada; automatizar no los convierte en aprobados |

## Criterios de salida

1. Tipado y suites relacionadas sin fallos nuevos sin explicar.
2. ZIP con index.html en raíz, sin TypeScript ni sourcemaps.
3. Producción sin recursos perdidos ni SDK de Poki en la demo.
4. Cierre al vencer al segundo jefe, conservado tras recargar.
5. Guardados separados e idioma persistente.
6. Limitaciones observadas publicadas en el informe.

## Riesgos

- Traducción automática pendiente de revisión nativa y de más pantallas. Rótulos incrustados en imágenes fuera del catálogo de texto.
- Teléfonos físicos, rendimiento y sesiones con jugadores externos pendientes.
- La fixture de cierre no demuestra una partida humana completa ni mide la dificultad.
- Capturas sin comparación con patrón: no tener excepciones no demuestra legibilidad total.
- Workflow remoto pendiente de subir el repositorio y aportar una URL.

Se conservan el [plan anterior](history/test-plan-2026-10-14.md) y las [cifras históricas](automation.md) como registros de otra versión. Las fichas DEF-001 a DEF-004 distinguen revisión de código y reproducción.
