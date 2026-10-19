# Mochi Guardians — Arquitectura de Testing y QA

> **Proyecto interno:** `scrapline`\
> **Título público:** Mochi Guardians\
> **Responsable de QA:** Jorge

Portfolio de estrategia de pruebas, automatización y documentación de defectos de **Mochi Guardians**, un juego web de defensa por carriles y fusión de criaturas desarrollado con **Phaser 3 y TypeScript**.

Incluye pruebas de navegador ejecutables con **JavaScript, Node.js Test Runner y Playwright**, junto con planes, casos y evidencias. El código comercial del juego y las suites que dependen de sus fuentes permanecen en el repositorio privado.

## Resumen de resultados

| Área | Resultado documentado |
|---|---|
| Automatización de lógica, datos y balance | **53 suites y al menos 5.929 comprobaciones**, correspondientes al registro histórico del 13–14/10/2026 |
| Pruebas de producción de la demo | **10 combinaciones aprobadas**: cinco idiomas × dos orientaciones, más una comprobación del paquete |
| Pruebas de producción de la versión completa | **10 combinaciones aprobadas**, más una comprobación del paquete |
| Integración del cierre de demo y guardados | **20 combinaciones aprobadas**: dos bandos × dos orientaciones × cinco idiomas |
| Regresión del selector de idioma | **10 casos aprobados** con entrada de ratón o toque automatizada |
| Diseño de pruebas manuales | **28 casos** estructurados en siete áreas; ejecución manual pendiente de registrar |
| Defectos documentados | **5 fichas**: cuatro históricas verificadas en código y una corrección de interfaz verificada con captura y prueba de integración |
| Cobertura de código | **No instrumentada**; no se publica un porcentaje |
| GitHub Actions | Workflow preparado para ejecución manual; ejecución remota pendiente |

Los resultados identifican versiones y fechas concretas; no se suman como un único recuento de casos independientes. El registro histórico de 53 suites no certifica que toda la batería actual esté aprobada. La última ejecución general registrada del proyecto privado se detuvo en `test:guardian-visual`, después de 11 suites; el diagnóstico y la salida están en el [informe del 18/10](docs/release-2026-10-18.md).

## Alcance de las pruebas

| Área | Enfoque y evidencia |
|---|---|
| Lógica de juego, integridad de datos y reglas de balance | Suites del proyecto original, con desglose y registro histórico en [automation.md](docs/automation.md) |
| Arranque y paquete de producción | Canvas visible, bundle de producción y ausencia de referencias a sourcemaps |
| Localización | Español, inglés, ruso, japonés y chino simplificado; detección, persistencia y regresiones de interfaz |
| Orientación y guardado | Recarga, cambio entre horizontal y vertical y separación de guardados entre demo y versión completa |
| Cierre de la demo | Límite del nivel 2, mensaje final y ajuste del texto en la matriz de integración |
| Selector de idiomas | Selección directa, cancelación, conservación de preferencia y límites del popup |
| Errores y recursos | Errores JavaScript, respuestas HTTP fallidas y peticiones externas inesperadas |
| Gestión de defectos | Pasos de reproducción, resultado esperado y observado, causa, corrección y alcance de la verificación |

Las pruebas de navegador registradas utilizan **Chromium mediante el canal Microsoft Edge**, con viewports de escritorio y móvil simulados. No equivalen a pruebas en teléfonos físicos ni acreditan Firefox, Safari o una revisión lingüística nativa. La localización añadida requiere revisión de hablantes nativos.

## Recorrido recomendado

1. [Plan de pruebas](docs/test-plan.md): objetivos, riesgos y alcance.
2. [Entrega del 18/10](docs/release-2026-10-18.md): resultados, fallo general y limitaciones.
3. [Actualización del 19/10](docs/update-2026-10-19.md): selector de idiomas, etiqueta rusa de zoom y regresiones.
4. [Defecto de localización DEF-005](docs/defects/DEF-005-cjk-demo-wrap.md): diagnóstico y verificación del ajuste de texto chino.
5. [Automatización pública](automation/demo-smoke.test.mjs): pruebas ejecutables contra el juego compilado.
6. [Justificación de métricas](docs/cv-summary.md): alcance de las cifras históricas y distinción entre aserciones y cobertura.

## Ejecutar las pruebas

Requisitos: **Node.js 22 o posterior**, dependencias instaladas y una URL directa de la demo compilada. El juego se obtiene por separado: no está incluido en este repositorio.

```bash
npm ci
npx playwright install chromium
```

Para una demo local, extraer su ZIP y ejecutar desde este repositorio, en PowerShell:

```powershell
$env:DEMO_DIR='C:\ruta\demo-extraida'
npm run serve:demo
```

En una segunda terminal, también desde este repositorio:

```powershell
$env:BASE_URL='http://127.0.0.1:4173/'
npm test
```

También puede usarse una URL remota directa del juego. La ficha de itch.io no sirve como `BASE_URL`: debe ser la URL del contenido HTML5 de su iframe.

Opciones disponibles:

- `BROWSER_CHANNEL=msedge`: usar Edge instalado; por defecto se usa Chromium de Playwright.
- `EDITION=full`: comprobar la versión completa con sus claves de guardado.
- `QA_OUTPUT`: cambiar el directorio de resultados; por defecto, `artifacts/latest/`.

La ejecución genera capturas, resultados JSON y salida del ejecutor de Node.js. Capturar una pantalla no equivale a aprobar automáticamente su diseño. El [workflow de GitHub Actions](.github/workflows/qa.yml) permite lanzar estas pruebas indicando la URL del juego.

## Estructura del repositorio

```text
README.md                  Presentación, resultados y ejecución
package.json               Comandos y dependencias
package-lock.json          Versiones de dependencias
.github/workflows/qa.yml    Ejecución manual en GitHub Actions
automation/                Smoke tests y servidor local
docs/test-plan.md          Estrategia, alcance y riesgos
docs/automation.md         Registro histórico de automatización
docs/release-2026-10-18.md  Informe de entrega
docs/update-2026-10-19.md   Regresión del selector de idiomas
docs/test-cases/           Siete documentos con 28 casos manuales
docs/test-run.md           Hoja de ejecución manual
docs/defects/              Fichas DEF-001 a DEF-005
docs/jira.md               Borradores de tickets en formato Jira
docs/cv-summary.md         Justificación de cifras y alcance
docs/history/              Documentación histórica
evidence/                  Salidas, resultados, capturas y manifiestos
```

## Criterios de documentación

Cada informe distingue pruebas ejecutadas, análisis de código y trabajo pendiente. Los borradores de Jira no acreditan tickets creados ni uso real de la herramienta. Los 28 casos manuales se presentan como diseñados; su hoja de ejecución permanece pendiente.

El código y la documentación se han preparado con asistencia de IA. Los resultados se respaldan mediante salidas, fechas, entornos y evidencias disponibles en el repositorio.

Se excluyen dependencias instaladas, resultados temporales, credenciales y el código comercial del juego. La publicación de este portfolio no concede una licencia abierta sobre el juego ni sus imágenes.