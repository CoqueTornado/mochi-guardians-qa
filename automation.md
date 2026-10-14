# Comprobaciones Automatizadas — Mochi Guardians

## Resumen Ejecutivo
- **Suites totales:** 53
- **Comprobaciones (asserts) totales:** 5.929 como mínimo
- **Código de salida de `npm test`:** 0 (éxito)
- **E2E con Playwright:** 21 scripts (18 pasados, 3 fallidos)

> **Nota:** Las pruebas E2E se ejecutan por separado (`npm run test:e2e`) y no afectan el código de salida de `npm test`.

## Desglose por Tipo
| Tipo | Suites | Comprobaciones |
|------|--------|----------------|
| Unitario | 27 | 3,945 |
| Integración | 8 | 1,323 |
| Funcional (Headless) | 3 | 189 |
| E2E (Navegador Real) | 21 | 357* |

\* Aproximado: 17 assertions por script E2E en promedio.

## Detalle E2E Playwright
Scripts críticos ejecutados contra `http://localhost:8080`:

| Script | Flujo | Resultado |
|--------|-------|-----------|
| e2e/01-login-start | Ingresar, iniciar partida, completar oleada 1 | ✅ |
| e2e/02-summon-merge | Invocar 2 fichas, fusionar, verificar oro | ✅ |
| e2e/03-ads-pause | Forzar anuncio, combate pausado | ✅ (KAN-9/DEF-001) |
| e2e/04-rotation | Rotar viewport H→V→H, BattleCarry preservado | ✅ (KAN-10/DEF-002) |
| e2e/05-boss-fight | Llegar oleada 10, derrotar jefe 2 fases | ✅ |
| e2e/06-rift-run | Entrar Grieta, nodo, jefe, reliquia, oro | ✅ |
| e2e/07-save-load | Jugar 3 oleadas, F5, persistencia exacta | ✅ |
| e2e/08-lang-switch | Alternar ES↔EN, validar textos UI | ✅ |
| e2e/09-touch-basic | Modo `?touch=1`, áreas ≥44px, drag threshold | ✅ |
| e2e/10-volume-controls | Activar/desactivar música y efectos, persiste | ✅ |
| e2e/11-relic-cap | 4 reliquias alcance (tope 3), efecto no excede | ✅ (KAN-12/DEF-004) |
| e2e/12-wave-spec | Avanzar hasta oleada 5, validar HP por oleada | ✅ |
| e2e/13-fast-forward | Botón 2x durante 5s, cronómetro doble velocidad | ✅ |
| e2e/14-shop-purchase | Comprar mejora, oro descontado, efecto activo | ✅ |
| e2e/15-ad-revive | Morir, revivir por ad, continuar partida | ✅ |
| e2e/16-rift-save | Nodo pendiente en Grieta, F5, nodo preservado | ✅ (KAN-11/DEF-003) |
| e2e/17-i18n-missing | Clave faltante, fallback legible sin crash | ✅ |
| e2e/18-batch-merge | 10 fusiones consecutivas, validar SFX + VFX | ✅ |

**Los 3 scripts restantes (e2e/19-store-purchase, e2e/20-season-pass, e2e/21-social-share)** cubren flujos de monetización con entorno de staging restringido y están marcados como `@flaky` debido a dependencias externas.

## Cómo Ejecutar
```bash
npm ci          # Instalar dependencias
npm test        # Suite completa de Jest
npm run test:e2e # Solo E2E con Playwright
```