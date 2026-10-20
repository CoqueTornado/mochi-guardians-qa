# Casos de prueba — 06. Idiomas y localización

Actualizados el 18/10/2026. Cinco idiomas: español, inglés, ruso, japonés y chino simplificado. Nombres propios japoneses conservan su escritura. El idioma elegido es común a los dos bandos; demo y completa guardan por separado.

**Estado manual:** los tres casos siguen sin ejecución manual registrada. La automatización y sus fixtures están en el informe actual y no sustituyen estas sesiones.

| ID | Título | Pasos | Esperado | Prioridad | Resultado manual |
|---|---|---|---|---|---|
| TC-I18N-01 | Selector e idioma persistente | Abrir Opciones, recorrer los cinco idiomas; recargar, cambiar de bando y volver. Repetir en demo y completa. | El idioma elegido se conserva; los dos bandos respetan la misma preferencia dentro de cada edición. | Alta | Pendiente |
| TC-I18N-02 | Legibilidad y calidad lingüística | Recorrer Biblioteca, Bestiario, Torre, Opciones, tutorial y cierre de demo en cada idioma y orientación. Revisar con hablantes nativos. | Variables y cifras correctas, sin texto cortado, glifos ausentes ni instrucciones ambiguas. Registrar también texto incrustado en imágenes sin localizar. | Alta | Pendiente |
| TC-I18N-03 | Fallback y claves desconocidas | En una prueba de módulo, consultar clave inexistente y una frase sin traducción. Revisar catálogos y marcadores. | La clave desconocida devuelve su nombre; texto sin catálogo se conserva. El test de catálogos detecta marcadores alterados. | Media | Pendiente |
