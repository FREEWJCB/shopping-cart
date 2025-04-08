(function () {
  // Esperamos que el DOM esté listo
  document.addEventListener("DOMContentLoaded", function () {
    // Crea el iframe
    const iframe = document.createElement("iframe");
    iframe.src = "http://127.0.0.1:3000"; // Cambia esto por tu URL real de Next.js
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.border = "none";
    iframe.style.display = "block";
    iframe.loading = "lazy";

    // Puedes personalizar el contenedor donde se inserta
    const containerId = "nextjs-cart-container";

    let container = document.getElementById(containerId);

    // Si no existe, lo creamos al final del body
    if (!container) {
      container = document.createElement("div");
      container.id = containerId;
      document.body.appendChild(container);
    }

    // Insertamos el iframe
    container.appendChild(iframe);
  });
})();
