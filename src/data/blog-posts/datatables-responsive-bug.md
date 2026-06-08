DataTables Responsive Modal no funciona en Bootstrap Tabs: Solución completa al bug conocido
Resumen del problema
Después de 5 horas de debugging, finalmente resolvimos un bug frustrante y bien conocido: DataTables con Responsive extension no muestra el modal correctamente cuando la tabla está en un tab de Bootstrap que no es el activo al cargar la página.
Palabras clave
DataTables, Bootstrap tabs, Responsive modal, shown.bs.tab, columns.adjust, responsive.recalc, jQuery, Laravel, tab-pane, display none, column width bug
El síntoma específico
✅ Tabla en el primer tab: El modal responsive funciona perfectamente
❌ Tabla en tabs secundarios: El modal responsive NO aparece o se muestra incorrectamente
🔄 Workaround temporal: Solo funciona si ambos tabs tienen active show (lo cual rompe la funcionalidad de tabs)
¿Por qué ocurre este bug?
DataTables calcula dimensiones al inicializarse: Cuando la tabla está en un tab-pane con display: none, no puede medir el ancho disponible
Responsive extension depende de estas dimensiones: Necesita saber cuándo mostrar el modal basándose en breakpoints
Bootstrap oculta tabs inactivos: Los tabs con display: none hacen que DataTables "piense" que tiene 0px de ancho
La solución definitiva
Este es el código que resuelve el problema completamente:
// ✨ LA SOLUCIÓN AL BUG ✨
$('button[data-bs-toggle="tab"]').on('shown.bs.tab', function (e) {
    $($.fn.dataTable.tables(true)).DataTable()
.columns.adjust() // Recalcula anchos de columnas
.responsive.recalc(); // Recalcula breakpoints responsive
});

Métodos alternativos que NO funcionan
❌ Tener múltiples tabs con active show - Rompe la funcionalidad de Bootstrap
❌ Inicializar DataTables después de mostrar el tab - Problemas de rendimiento
❌ Usar setTimeout - No es confiable y es un hack
❌ Solo columns.adjust() - No recalcula los breakpoints responsive
Documentación oficial
Este bug está documentado oficialmente en:
GitHub Issue #40 de DataTables Responsive
