<script>
  import { onMount, onDestroy } from "svelte";

  let storageListener;

  function updateZoommentTheme() {
    const theme = localStorage.getItem("theme") || "light";
    const zoommentEl = document.getElementById("zoomment");
    if (zoommentEl) {
      zoommentEl.setAttribute("data-theme", theme);
    }
  }

  onMount(() => {
    // Actualizar al montar el componente
    updateZoommentTheme();

    // Escuchar cambios en localStorage desde otras pestañas
    storageListener = () => updateZoommentTheme();
    window.addEventListener("storage", storageListener);

    // Interceptar localStorage.setItem para detectar cambios en la misma pestaña
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      const event = new Event("storage");
      event.key = key;
      event.newValue = value;
      originalSetItem.apply(this, arguments);
      if (key === "theme") {
        updateZoommentTheme();
      }
    };
  });

  onDestroy(() => {
    // Limpiar el event listener al destruir el componente
    if (storageListener) {
      window.removeEventListener("storage", storageListener);
    }
  });
</script>

<!-- Este componente no renderiza nada, solo maneja la lógica -->
