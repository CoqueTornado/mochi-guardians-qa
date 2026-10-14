# 06. Idiomas y Localización

## TC-I18N-01 – Cambio de idioma
**Precondición:** Juego cargado con idioma inicial español (es). Botón de cambio de idioma disponible en el menú de ajustes.

**Pasos:**
1. Abrir el menú de ajustes (icono de engranaje).
2. Seleccionar el idioma Inglés (en).
3. Observar la actualización de todos los textos visibles.

**Datos de prueba:**
- Textos a verificar: botón “Invocar”, panel “Oleada”, tooltip de torre, menú de pausa.

**Resultado esperado:**
- Al cambiar a inglés, todos los textos de la interfaz cambian instantáneamente a su traducción en inglés sin necesidad de recargar la página.
- No se muestran claves sin traducir (ej. “UI.INVOCAR”) ni texto mezclado.
- El idioma seleccionado se persiste en localStorage para recargas futuras.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Video `tc-i18n-01-switch.mp4` (textos cambian al instante, persistencia tras F5).
**Estado:** Ejecutado – Pass

---

## TC-I18N-02 – Contenedores de texto
**Precondición:** Juego en cualquiera de los dos idiomas (es o en). Elementos de UI que contienen texto dinámico (ej. nombre de torre, descripción de habilidad).

**Pasos:**
1. Inspeccionar visualmente cada contenedor de texto (burbuja, botón, panel).
2. Verificar que el texto no se desborde, no se corte y no solape con otros elementos.

**Datos de prueba:**
- Longest known string in either language (e.g., English “Arcane Tower – +20% daño a jefes”).

**Resultado esperado:**
- Cada contenedor tiene suficiente ancho y altura para mostrar su texto completo en ambos idiomas.
- No hay recortes (elipsis visibles) ni solapamientos que oculten información.
- El uso de `word-wrap` y `text-align` garantiza legibilidad.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Capturas `tc-i18n-02-es.png` y `tc-i18n-02-en.png` (ningún texto cortado ni solapado).
**Estado:** Ejecutado – Pass

---

## TC-I18N-03 – Clave i18n faltante
**Precondición:** Simular la ausencia de una clave de traducción en el archivo de idiomas (por ejemplo, eliminar temporalmente la clave `TOOLTIP.TOWER_ARCANE`).

**Pasos:**
1. Forzar la falta de clave reemplazando su valor por una cadena vacía o eliminándola del JSON de idioma.
2. Acercar el cursor a la torre correspondiente para que se intente mostrar el tooltip.
3. Observar qué se muestra en lugar del texto esperado.

**Datos de prueba:**
- Clave manipulada: `TOOLTIP.TOWER_ARCANE` (español).

**Resultado esperado:**
- En lugar de lanzar una excepción o mostrar `undefined`, el sistema de i18n devuelve la propia clave como texto legible (ej. `TOOLTIP.TOWER_ARCANE`).
- La UI no se rompe; el tooltip se muestra con esa cadena, permitiendo al desarrollador identificar rápidamente la clave faltante.
- No ocurre ningún crash ni error en consola relacionado con la falta de clave.

**Resultado obtenido:** ✅ Pasa
**Evidencia:** Consola `tc-i18n-03-missing.log` (se muestra la clave como fallback, sin traceback).
**Estado:** Ejecutado – Pass
