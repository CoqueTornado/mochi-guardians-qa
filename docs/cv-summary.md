# Cifras defendibles para el CV

## Texto recomendado

> Arquitectura de testing en Mochi Guardians (TypeScript, Node.js y Playwright): diseño e implementación de más de 50 suites y miles de aserciones automáticas para validar lógica de juego, integridad de datos y reglas de balance; pruebas de regresión en cinco idiomas y dos orientaciones, documentación de defectos y evidencias reproducibles.

## Qué respalda cada cifra

- **53 suites y al menos 5.929 comprobaciones**: ejecución histórica registrada el 13–14/10/2026 en [automation.md](automation.md). Es un logro del proyecto válido para describir su alcance histórico; no significa que todas las suites actuales hayan pasado.
- **Configuración actual**: `npm test` encadena 53 comandos de suite y después `posttest` ejecuta `test:engagement`: 54 entradas configuradas. Las pruebas de navegador adicionales no están todas incluidas en esa cadena. Contar scripts disponibles no demuestra ejecución ni independencia de las suites.
- **Cinco idiomas y dos orientaciones**: [evidencia de producción de demo](../evidence/2026-10-18/production/results.json), [versión completa](../evidence/2026-10-18/full-production/results.json) e [integración](../evidence/integration/results.json). Son viewports simulados con Chromium/Edge, no teléfonos físicos ni certificación lingüística nativa.
- **Documentación de defectos y evidencia reproducible**: fichas DEF-001 a DEF-005, comandos de ejecución, resultados JSON, salidas y capturas. Las fichas históricas identifican las verificaciones basadas solamente en código.

## Cobertura de código

**No medida / no acreditada.** No hay configuración de instrumentación de cobertura ni informes LCOV, Istanbul, c8/nyc o V8 que permitan sostener un 92 %. Esto no significa 0 % de código cubierto: significa que no se dispone de una medición válida.

Las aserciones comprueban resultados; la cobertura instrumentada mide qué líneas, funciones o ramas se ejecutaron. Una cifra no se puede deducir de la otra. Quitar el porcentaje del CV y evitar «exhaustiva» conserva una afirmación fuerte que se puede defender mostrando el repositorio.

La última ejecución general registrada en [el informe del 18/10](release-2026-10-18.md) se detuvo en `test:guardian-visual` tras 11 suites. Las comprobaciones específicas aprobadas se documentan por separado; no se presentan 54 suites actuales como aprobadas.
