# Plan de Pruebas — Mochi Guardians

| Campo | Información |
|-------|-------------|
| **Proyecto** | Mochi Guardians (`scrapline`) |
| **Autoría** | Jorge |
| **Commit analizado** | `f19a39a` |
| **Fecha** | 14/10/2026 |

## 1. Objetivo
Reducir el riesgo de fallos graves en combate, guardado, Grieta y adaptación vertical mediante una estrategia de pruebas en capas (unitario, integración, funcional, regresión) y trazabilidad explícita entre requisitos, casos de prueba, defects y tickets Jira.

## 2. Niveles de prueba
- **Unitario**: Scripts Node.js sobre `src/core/` (5.929+ comprobaciones mínimas).
- **Integración**: `test:rift`, `test:geometry` y `test:scenes` (Phaser *headless*).
- **Funcional**: 28 casos manuales y Playwright.
- **Regresión**: `npm test` completo (53 de 53 suites).

## 3. Entornos
- **Exploración manual**: Windows + Firefox horizontal y vertical simulado (390×844 px).
- **E2E Playwright**: Chromium (canal Edge) contra `http://localhost:8080`.

## 4. Criterios de salida
| Métrica | Umbral |
|---------|--------|
| Pruebas Unitarias | ≥ 98% pasar |
| Pruebas de Integración | ≥ 98% pasar |
| Pruebas Funcionales (Headless) | 100% pasar |
| Pruebas E2E (Playwright) | ≥ 90% pasar (máx. 2 fallos aceptables si documentados) |
| Casos Manuales | ≥ 90% pasar (máx. 3 casos bloqueados con justificación) |
| Defectos Críticos | 0 abiertos (severidad S1) |
| Cobertura de Código | ≥ 90% líneas en `src/` |

## 5. Riesgos y Mitigaciones
| Riesgo | Impacto | Probabilidad | Mitigación |
|--------|---------|--------------|------------|
| Fallos de toque en dispositivos reales | Alto | Medio | Validar TC-UI-02/03 en 2 dispositivos físicos antes de release |
| Memory leak en sesiones largas | Medio | Bajo | Monitorear en pruebas de endurance; abordar en próximo sprint |
| Inconsistencia de idioma en textos dinámicos | Bajo | Bajo | Pruebas de i18n cubren claves faltantes; revisión manual de textos nuevos |
| Desincronización de BattleCarry al rotar | Alto | Bajo | Mitigado por DEF-002; cubierto por `test:scenes` |
| Fallos de ads solo en producción (SDK real) | Medio | Bajo | Usar mock en pruebas; validar con cuenta de prueba de Poki en staging |

## 6. Aprobaciones
| Rol | Nombre | Responsabilidad |
|-----|--------|-----------------|
| QA Lead | Jorge | Diseño del plan, revisión de casos, reporte de métricas |
| Desarrollo Lead | Ana | Corrección de defects, mantenimiento de suites |
| Producto | Luis | Validación de criterios, priorización de defects |
| DevOps | Carlos | Pipeline de CI (`npm test` en cada push) |

*Este plan es vigente hasta el próximo commit de referencia o cambio significativo en alcance/arquitectura.*