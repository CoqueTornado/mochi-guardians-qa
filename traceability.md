# Matriz de Trazabilidad — Mochi Guardians

Esta matriz vincula requisitos de alto nivel, casos de prueba manuales, defects, tickets Jira y cobertura automatizada.

| Requisito / Funcionalidad | Test Cases Manuales | Defects Asociados | Tickets Jira | Cobertura Automatizada (Suites) |
|---------------------------|---------------------|-------------------|--------------|---------------------------------|
| **Combate pausa durante ads** | TC-GAME-01..06, TC-UI-03 | DEF-001 | KAN-9 | `test:functional-ads`, `test:unit-ads` |
| **Rotación de pantalla preserva estado** | TC-UI-01 | DEF-002 | KAN-10 | `test:integration-scenes`, `test:unit-battlecarry` |
| **Persistencia de nodo pendiente en Grieta** | TC-ROGU-05 | DEF-003 | KAN-11 | `test:integration-rift`, `test:unit-save` |
| **Efecto de reliquias (alcance, congelación, cambio de oferta)** | TC-ROGU-03, TC-BAL-03 | DEF-004 | KAN-12 | `test:unit-relics`, `test:unit-balancing` |
| **Lógica de invocación y fusión** | TC-GAME-01, TC-GAME-02, TC-GAME-03 | — | — | `test:unit-core` (fábricas, gold manager) |
| **Curva de vida de oleadas estándar** | TC-BAL-02 | — | — | `test:unit-balancing` |
| **Gestión de oro y compras** | TC-SAVE-01, TC-SAVE-02, TC-SAVE-03, TC-SAVE-04 | — | — | `test:unit-save` |
| **Idioma y localización (cambio, contenedores, fallback)** | TC-I18N-01, TC-I18N-02, TC-I18N-03 | — | — | `test:unit-i18n` |
| **Toque y áreas mínimas** | TC-UI-02 | — | — | `test:functional-touch` (43 comprobaciones) |
| **Generación de mapa de La Grieta por semilla** | TC-ROGU-01 | — | — | `test:integration-rift` (validación de árbol) |
| **Conexiones válidas entre pisos** | TC-ROGU-02 | — | — | `test:integration-rift` (validación de enlaces) |
| **Jefe de dos fases (aparición, transición, muerte)** | TC-BOSS-01..04 | — | — | `test:unit-core` (patrones de jefe) + `test:integration-scenes` |
| **Persistencia de sesión completa** | TC-SAVE-01..04 | — | — | `test:unit-save` (migraciones, default values) |

**Leyenda:**
- ✅ Cobertura directa exista.
- ⚠️ Cobertura parcial (requiere extensión de pruebas o ticket técnico).
- — No aplica (cubierto por otras capas o fuera de alcance actual).

--- 

*Fin de la documentación actualizada.*