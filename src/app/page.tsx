// Importa el componente principal del carrito de compras
import Cart from "@app/components/cart";

// Importa el componente que muestra el título y el botón de cerrar (✖)
import Title from "@app/components/title";

// Componente por defecto que representa la página principal
export default function Home() {
  return (
    // Contenedor principal del carrito tipo "sidebar"
    <div className="fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl z-40 p-4 flex flex-col">
      {/* Componente que muestra el título del carrito y el botón de cerrar */}
      <Title />

      {/* Componente que contiene la lista de productos, botones y total */}
      <Cart />
    </div>
  );
}
