// Importa la función que vacía todo el carrito en el backend
import { clearCart } from '@/app/libs/cart.api';

type CleanProps = {
  handleClearCart: () => void; // Función que borra los ítems del carrito en el estado local
};

// Componente funcional que renderiza un botón para vaciar el carrito
const Clean = ({ handleClearCart }: CleanProps) => {

  // Lógica que se ejecuta cuando el usuario hace clic en el botón
  const handleClick = async () => {
    try {
      await clearCart();       // Llama a la API para vaciar el carrito del backend
      handleClearCart();       // Luego borra los ítems del carrito en el estado de React
    } catch (error) {
      // Muestra errores en consola y con una alerta simple
      console.error('Error al vaciar el carrito:', error);
      alert('No se pudo vaciar el carrito');
    }
  };

  return (
    // Botón con estilos Tailwind
    <button
      onClick={handleClick}
      className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 active:text-red-700 cursor-pointer"
    >
      Vaciar Carrito
    </button>
  );
};

export default Clean;
