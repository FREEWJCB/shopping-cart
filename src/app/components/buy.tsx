import { createOrder } from '@/app/libs/order.api'; // Importa la función que crea una orden en la API

// Props que recibe este componente
type BuyProps = {
  total: number; // Monto total de la compra
  handleResetCart: () => void; // Función para reiniciar el carrito (vaciar productos y cantidades)
};

const Buy = ({ total, handleResetCart }: BuyProps) => {
  // Esta función se ejecuta al hacer clic en "Finalizar Compra"
  const handleClick = async () => {
    try {
      // Verifica que el total no sea cero o negativo
      if (total <= 0) {
        alert('El monto total debe ser mayor a 0');
        return;
      }

      // Llama al backend para crear una orden con el total actual
      const order = await createOrder(total);

      // Muestra mensaje de éxito con ID de orden y monto total
      alert(`Compra finalizada correctamente\nFactura: ${order.id}\nMonto: ${total}`);

      // Limpia el carrito (tanto estado visual como cantidades)
      handleResetCart();
    } catch (error) {
      console.error('Error al finalizar la compra:', error); // Muestra el error en consola
      alert('No se pudo finalizar la compra'); // Informa al usuario
    }
  };

  // Botón de compra
  return (
    <button
      className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800 active:text-red-700 cursor-pointer"
      onClick={handleClick}
    >
      Finalizar Compra
    </button>
  );
};

export default Buy;
