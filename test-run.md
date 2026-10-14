# Hoja de Registro de Ejecución Manual

**Commit base:** `f19a39a`  
**Fecha de ejecución:** 14/10/2026  
**Entorno:** Windows + Firefox (viewport horizontal 1366×768 y vertical simulado 390×844).

| ID | Título | Prioridad | Resultado real observado | Resultado | Defecto / Jira | Comentario |
|----|--------|-----------|--------------------------|-----------|----------------|------------|
| TC-GAME-01 | Invocar ficha | Crítica | Oro disminuye correctamente, ficha colocada; rechazado si tablero lleno. | ✅ Pasa | — | |
| TC-GAME-02 | Botón ×2 | Alta | Candado inicial; se habilita tras 3 fusiones; efecto 2x activo 5s. | ✅ Pasa | — | |
| TC-GAME-03 | Fusión de fichas | Alta | Fusión correcta, onda expansiva, oro de bonificación +5. | ✅ Pasa | — | |
| TC-GAME-04 | Alcance vs voladores | Alta | Cuerpo a cuerpo ignora voladores fuera de rango; distancia ataca. | ✅ Pasa | — | |
| TC-GAME-05 | Congelación | Media | Hielo respeta tope de 1,2 s y aplica inmunidad posterior de 5 s. | ✅ Pasa | — | |
| TC-GAME-06 | Fin de oleada | Crítica | Entrega oro al vencer último enemigo y abre pausa de preparación. | ✅ Pasa | — | |
| TC-BOSS-01 | Aparición del jefe | Alta | Aviso de jefe en oleada 10, barra superior y música operativa. | ✅ Pasa | — | |
| TC-BOSS-02 | Cambio a fase 2 | Crítica | Transición visual única al 50% de PS sin bloquear el combate. | ✅ Pasa | — | |
| TC-BOSS-03 | Daño continuo jefe | Alta | Daño en vuelo cuenta durante transición; bonificador de debilidad. | ✅ Pasa | — | |
| TC-BOSS-04 | Cierre combate jefe | Crítica | Pantalla de victoria y acreditación de recompensas al reducir PS a 0. | ✅ Pasa | — | |
| TC-ROGU-01 | Mapa de expedición | Alta | Generación correcta del árbol de 6 profundidades en La Grieta (semilla 12345). | ✅ Pasa | — | |
| TC-ROGU-02 | Nodos conectados | Alta | Bloqueo estricto de nodos no conectados en el piso inferior. | ✅ Pasa | — | |
| TC-ROGU-03 | Reliquias en Grieta | Alta | Reliquias añadidas al HUD; modificadores de alcance y hielo aplicados. | ✅ Pasa | KAN-12 | Ver defecto DEF-004. |
| TC-ROGU-04 | Derrota en expedición | Crítica | Fin de run al perder vidas, entrega de recompensa parcial (oro ×0,5). | ✅ Pasa | — | |
| TC-ROGU-05 | Recarga F5 en Grieta | Alta | Restauración correcta de nodo pendiente y reliquias tras F5. | ✅ Pasa | KAN-11 | Ver defecto DEF-003. |
| TC-SAVE-01 | Persistencia sesión | Crítica | Mantenimiento de oro y progreso en `localStorage` al reabrir. | ✅ Pasa | — | |
| TC-SAVE-02 | Recarga post-compra | Alta | Guardado síncrono conserva mejora y descuento de monedas tras F5. | ✅ Pasa | — | |
| TC-SAVE-03 | Campos ausentes JSON | Alta | Rellenado de valores por defecto ante claus ausentes en JSON. | ✅ Pasa | — | |
| TC-SAVE-04 | JSON corrupto | Crítica | Reinicio limpio a estado funcional ante cadena corrupta. | ✅ Pasa | — | |
| TC-BAL-01 | Oro inicial | Alta | 100 monedas permiten invocar primeras fichas de oleada 1. | ✅ Pasa | — | |
| TC-BAL-02 | Curva de vida oleadas | Alta | Escalado progresivo de PS sin saltos anómalos fuera de jefes. | ✅ Pasa | — | |
| TC-BAL-03 | Topes de reliquias | Media | Acumulación de reliquias respeta límites máximos establecidos. | ✅ Pasa | — | |
| TC-I18N-01 | Cambio de idioma | Alta | Actualización instantánea de textos al alternar español/inglés. | ✅ Pasa | — | |
| TC-I18N-02 | Contenedores de texto | Media | Cajas de texto correctas sin solapamientos en ambos idiomas. | ✅ Pasa | — | |
| TC-I18N-03 | Clave i18n faltante | Media | Devolución de clave legible sin excepciones fatales de render. | ✅ Pasa | — | |
| TC-UI-01 | Cambio entre horizontal y vertical simulado | Crítica | `BattleCarry` transfiere tablero, PS y enfriamientos al rotar (ver DEF-002). | ✅ Pasa | KAN-10 | |
| TC-UI-02 | Zonas táctiles y umbral de arrastre | Alta | En escritorio sin `?touch=1` el esquema táctil no se aplica; en modo `?touch=1` se cumplen áreas mínimas 44px y drag threshold (validado por pruebas automatizadas `test:touch`). En dispositivo físico pendiente de validación. | ⚠️ Pass con restricción | — | Requiere dispositivo físico para certificación completa; se acepta como Pass basado en evidencia automatizada y manual en simulador. |
| TC-UI-03 | Pausa y opciones de sonido | Alta | Con la pausa abierta el combate no avanza. Música y efectos se activan y desactivan con interruptores. Al continuar, el combate sigue donde estaba. | ✅ Pasa | KAN-9 | Ver defecto DEF-001. |

**Resumen:**
- **Total casos ejecutados:** 28
- **Pasados:** 27
- **Pass con restricción (requiere dispositivo físico):** 1 (TC-UI-02)
- **Fallidos:** 0
- **Bloqueados:** 0

**Evidencias adjuntadas:** carpeta `evidence/` (capturas, videos y logs mencionados en cada caso).