# Mochi Guardians — QA portfolio

QA de un juego de navegador con Phaser 3 y TypeScript: defensa por carriles, fusión, campaña y modo roguelike. El código comercial del juego no se publica aquí.

Este repositorio permite **ejecutar pruebas contra la demo compilada sin acceso al código del juego**. Incluye estrategia, casos manuales, defectos y evidencias. Código y documentación preparados con asistencia de IA; las ejecuciones se identifican por salida y entorno.

## Empezar por aquí

- [Selector de idiomas y cifras del CV, 19/10](docs/update-2026-10-19.md).

- [Informe actual](docs/release-2026-10-18.md): alcance, resultados y limitaciones.
- [Pruebas ejecutables](automation/demo-smoke.test.mjs): Node.js Test Runner + Playwright.
- [Plan y riesgos](docs/test-plan.md).
- [28 casos manuales](docs/test-cases/): diseñados; ejecución manual sin registrar en [la hoja de ejecución](docs/test-run.md).
- [4 defectos históricos](docs/defects/): verificados en código; no se afirma reproducción manual.
- [DEF-005, corrección de esta entrega](docs/defects/DEF-005-cjk-demo-wrap.md): texto chino cortado en vertical, con evidencia posterior y regresión de geometría.
- [Automatización histórica](docs/automation.md): las 5.929 comprobaciones mínimas pertenecen a una versión anterior. No son 5.929 casos manuales ni certifican la demo actual.

## Ejecutar

Requisitos: Node.js 22 o posterior y una URL directa del juego HTML5. La ficha de itch.io no sirve como BASE_URL: hace falta la URL del iframe del juego.

```bash
npm ci
npx playwright install chromium
BASE_URL=http://127.0.0.1:4173/ npm test
```

En PowerShell:

```powershell
$env:BASE_URL='http://127.0.0.1:4173/'
npm test
```

Para un ZIP local: extraerlo, definir DEMO_DIR y lanzar el servidor en otra terminal. Por defecto busca ../demo-release/web, junto al proyecto original.

```powershell
$env:DEMO_DIR='C:\ruta\demo-extraida'
npm run serve:demo
```

Windows con Edge instalado: `$env:BROWSER_CHANNEL='msedge'`. Sin canal definido se usa Chromium de Playwright. QA_OUTPUT cambia la salida (por defecto artifacts/latest/).

Para comprobar la versión completa local se puede definir `$env:EDITION='full'` y usar su URL como BASE_URL.

La batería valida el paquete de producción y diez combinaciones (cinco idiomas × dos orientaciones): canvas visible, idioma del documento, recarga, giro, errores JavaScript, recursos fallidos, peticiones externas y ausencia del puente de pruebas. Guarda capturas y results.json. **Capturar una imagen no equivale a aprobar su diseño.**

El [workflow](.github/workflows/qa.yml) permite ejecutar manualmente las pruebas en GitHub Actions. No se afirma ejecución remota hasta tener un enlace real al job.

## Evidencia y límites

| Tecnología | Evidencia |
|---|---|
| JavaScript / Node.js Test Runner | Scripts, aserciones y resultados TAP |
| Playwright / Chromium | Navegador real, capturas, eventos de red y errores |
| TypeScript / esbuild | Comprobaciones del proyecto original, documentadas aparte |
| Git / GitHub Actions | Historial local y workflow preparado; ejecución remota pendiente |
| Diseño de pruebas | Plan, 28 casos manuales pendientes y 4 fichas históricas |
| Jira | Solo borradores en su formato; no acredita tickets creados ni uso real |

No acredita dispositivos físicos, Safari, WebKit, Firefox automatizado, sesiones de usuarios aleatorios, rendimiento móvil ni calidad lingüística nativa. La demo contiene dos niveles y cinco idiomas: español, inglés, ruso, japonés y chino simplificado. La completa tiene 107 criaturas y la Gran Grieta.

## Qué subir

Esta carpeta con README.md, package.json, package-lock.json, .gitignore, .github/, automation/, docs/ y la evidencia seleccionada en evidence/. Excluir node_modules/, artifacts/, credenciales, el ZIP del juego, su código comercial y los modelos de traducción. No se concede una licencia abierta sobre el juego ni sus imágenes.

Texto para el CV: **«Arquitectura de testing en Mochi Guardians (TypeScript, Node.js y Playwright): diseño e implementación de más de 50 suites y miles de aserciones automáticas para validar lógica de juego, integridad de datos y reglas de balance; pruebas de regresión en cinco idiomas y dos orientaciones, documentación de defectos y evidencias reproducibles.»**

[Justificación de cifras y cobertura](docs/cv-summary.md). No se ha medido un porcentaje de cobertura de código; no hay evidencia que respalde el 92 %.
