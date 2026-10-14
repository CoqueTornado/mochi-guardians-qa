# DEF-003 — Recargar en La Grieta pierde nodo pendiente
**Jira Ticket:** KAN-11

**Summary:**
Al recargar la página (F5) mientras se encuentra en La Gran Grieta con un nodo seleccionado pero aún no ingresado, el juego olvida cuál era el nodo pendiente y obliga al jugador a regresar al nodo de inicio.

**Description:**
En La Gran Grieta, la selección de un nodo se guarda temporalmente en memoria pero no se persiste en `localStorage`. Ante una recarga, ese estado se pierde y el sistema de navegación del laberinto vuelve al nodo por defecto (el último completado o el inicio).

**Steps to Reproduce:**
1. Iniciar una run en La Gran Grieta y avanzar hasta llegar a un bifurcación con al menos dos nodos disponibles.
2. Seleccionar (clicar o resaltar) uno de los nodos del siguiente piso como nodo pendiente (debe aparecer resaltado con un contorno brillante).
3. Sin entrar al nodo, presionar F5 para recargar la página.
4. Tras la recarga, observar qué nodo está marcado como pendiente o disponible para selección.

**Expected Result:**
Tras la recarga, el mismo nodo que estaba resaltado antes de la recarga debe seguir estando resaltado como pendiente, permitiendo al jugador continuar su ruta elegida sin penalización.

**Actual Result:**
El nodo pendiente se pierde; la interfaz muestra como disponible únicamente el nodo de comienzo del piso actual o el último completado, forzando al jugador a retroceder o elegir una ruta diferente.

**Root Cause:**
En `src/scenes/LabyrinthScene.ts`, el método `create()` lee el nodo pendiente desde `this.save.getPendingNode()`, pero dicha propiedad nunca se actualiza al seleccionar un nuevo nodo; únicamente se almacena en una variable local `this._pendingNode` que no se sobrevive a recargas.

**Fix:**
Al seleccionar un nodo, persistir su identificador en el objeto de guardado mediante `this.save.setPendingNode(nodeId)`. Luego, en `LabyrinthScene.create()`, leer siempre desde el save:
```ts
const pending = this.save.getPendingNode() ?? this.getDefaultStartNode();
```
Este cambio se introdujo en el commit `f19a39a`.

**Verification Steps:**
1. Seleccionar un nodo específico en la Grieta (anotar su ID, ej. `node_4_2`).
2. Presionar F5 y esperar la recarga.
3. Verificar que el nodo resaltado tras la recarga tenga exactamente el mismo ID (`node_4_2`).
4. Confirmar que al ingresar al nodo, la secuencia de eventos del laberinto continúe sin reiniciar el piso.

**Test Cases Affected:**
- TC-ROGU-05 (Recarga F5 en Grieta).

**Attachments:**
- Video `def003-before.mp4` (nodo pendiente perdido tras F5).
- Video `def003-after.mp4` (nodo pendiente preservado tras fix).
