# Mochi Guardians — Documentación de QA

> **Proyecto interno:** `scrapline`  
> **Título público:** Mochi Guardians  
> **Rol:** QA Lead — Jorge

Este repositorio documenta las pruebas de **Mochi Guardians**, un juego web desarrollado con Phaser 3 y TypeScript. No contiene el código del juego.

---

## 🎯 Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Comprobaciones automatizadas | **5.929+** |
| Suites de prueba | **53** (100% pasando) |
| Cobertura de código | **92%** |
| Casos manuales | **28** diseñados y ejecutados |
| Defects críticos | **4** encontrados, diagnosticados y verificados |
| Tickets Jira | **KAN-9 a KAN-12** |

---

## 🧪 Alcance de las Pruebas

| Área | Cobertura | Detalle |
|------|-----------|---------|
| Lógica, datos, balance, Grieta por semilla | Automatizada | 5.929 comprobaciones en 53 suites |
| Combate, jefes, Grieta, guardado, idiomas, interfaz | Manual | 28 casos diseñados y ejecutados en Firefox |
| Navegador | E2E | 21 scripts Playwright (Chromium, canal Edge): 18 aprobados, 3 documentados como flaky |
| Defectos | Cerrados y verificados | DEF-001 a DEF-004, mapeados a KAN-9 a KAN-12 |

---

⚠️ Nota: Este repositorio actúa como portfolio de la estrategia y artefactos de QA. El código fuente de los tests es privado.
## 📁 Cómo Navegar el Repositorio

```text
README.md                  Esta página
docs/test-plan.md          Plan de pruebas: objetivos, entornos, riesgos, criterios de salida
docs/automation.md         Comprobaciones automatizadas: suites, métricas, desglose E2E
docs/test-cases/           7 ficheros con 28 casos manuales estructurados
docs/defects/              DEF-001 a DEF-004 (formato Jira estándar)
docs/jira.md               Texto de los tickets de Jira (KAN-9 a KAN-12)
docs/test-run.md           Hoja de registro de la ejecución manual (28 casos)
docs/traceability.md       Matriz de trazabilidad: requisitos ↔ casos ↔ defects ↔ Jira

