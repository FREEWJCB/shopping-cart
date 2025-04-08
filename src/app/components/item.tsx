import Image from 'next/image'; // Componente optimizado de Next.js para cargar imágenes
import { CartItem } from '@/app/libs/cart.api'; // Tipo de datos del ítem en el carrito
import ButtonProps from '@app/components/button.props'; // Componente reutilizable de botón con estilos y lógica

// Funciones que interactúan con la API del carrito
import { deleteCartItem, updateCartItem } from '@/app/libs/cart.api';

import { X } from 'lucide-react'; // Ícono de una "X" (para botón de eliminar)

type ItemProps = {
  carts: CartItem[]; // Lista de productos en el carrito
  quantities: { [key: string]: number }; // Objeto que guarda la cantidad actual por ID del ítem
  handleIncrement: (id: string) => void; // Función que incrementa la cantidad localmente
  handleDecrement: (id: string) => void; // Función que decrementa la cantidad localmente
  handleQuantityChange: (id: string, newValue: number) => void; // Cambia manualmente la cantidad
  handleRemoveItem: (id: string) => void; // Elimina el ítem del estado local
  loading: boolean; // Estado de carga, para mostrar loader si es necesario
};

// Componente principal: muestra todos los ítems del carrito
const Item = ({
  carts,
  quantities,
  handleIncrement,
  handleDecrement,
  handleQuantityChange,
  handleRemoveItem,
  loading,
}: ItemProps) => {

  // Función que elimina un ítem tanto del backend como del estado local
  const handleDelete = async (id: string) => {
    try {
      await deleteCartItem(id); // Llama a la API para eliminarlo
      handleRemoveItem(id);     // Lo elimina del estado local
    } catch (error) {
      alert(`No se pudo eliminar el producto ${JSON.stringify(error)}`);
      throw new Error(`Error al actualizar el carrito: ${error}`);
    }
  };

  // Función que actualiza el stock (cantidad) en el backend
  const handleUpdate = async (id: string, stock: number) => {
    try {
      await updateCartItem(id, { stock }); // PATCH al backend
    } catch (error) {
      alert(`Error al actualizar el producto: ${error}`);
      throw new Error(`Error al actualizar el carrito: ${error}`);
    }
  };

  // Lógica combinada: aumenta cantidad local y luego actualiza backend
  const handleIncrementWithUpdate = (id: string) => {
    handleIncrement(id);
    handleUpdate(id, quantities[id] + 1);
  };

  // Lógica combinada: disminuye cantidad local y luego actualiza backend
  const handleDecrementWithUpdate = (id: string) => {
    handleDecrement(id);
    handleUpdate(id, quantities[id] - 1);
  };

  // Lógica combinada: cambia la cantidad manualmente y actualiza backend
  const handleQuantityChangeWithUpdate = (id: string, newValue: number) => {
    handleQuantityChange(id, newValue);
    handleUpdate(id, newValue);
  };

  return (
    <>
      {/* Si está cargando, muestra un loader visual */}
      {loading ? (
        <li className="bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition">
          <p className="p-4">Cargando...</p>
        </li>
      ) : (
        // Mapea y renderiza cada ítem del carrito
        carts.map((item) => (
          <li
            key={item.id}
            className="bg-gray-50 rounded-2xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition"
          >
            <div className="relative flex gap-4">
              {/* Botón para eliminar el producto */}
              <button
                onClick={() => handleDelete(item.id)}
                className="absolute top-0 right-0 text-gray-400 hover:text-red-500"
                aria-label="Eliminar producto"
              >
                <X size={18} />
              </button>

              {/* Imagen del producto */}
              <Image
                src={item.product.imageURL}
                width={56}
                height={56}
                className="w-16 h-16 object-cover rounded-md"
                alt="Product"
              />

              {/* Información del producto */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.product.name}</p>

                <p className="text-sm text-gray-600">
                  {/* Precio por unidad * cantidad */}
                  ${(item.product.price * Number(quantities[item.id])).toFixed(2)}
                </p>

                {/* Controles de cantidad: -, input, + */}
                <div className="flex items-center gap-2 mt-2">
                  <ButtonProps
                    label="−"
                    onClick={() => handleDecrementWithUpdate(item.id)}
                  />
                  <input
                    type="number"
                    value={quantities[item.id]}
                    min="1"
                    max={item.product.stock}
                    className="w-12 text-center border rounded text-sm"
                    onChange={(e) => {
                      const newValue = Math.max(1, Math.min(Number(e.target.value), item.product.stock));
                      handleQuantityChangeWithUpdate(item.id, newValue);
                    }}
                  />
                  <ButtonProps
                    label="+"
                    onClick={() => handleIncrementWithUpdate(item.id)}
                  />
                </div>
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default Item;
