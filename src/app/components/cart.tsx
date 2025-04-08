"use client"; // Esto obliga a que el componente sea renderizado en el cliente (necesario por hooks como useState y useEffect)

import { useState, useEffect } from 'react';

// Importa subcomponentes del carrito
import Item from '@/app/components/item';
import Total from '@/app/components/total';
import Buy from '@/app/components/buy';
import Clean from '@/app/components/clean';

// Importa tipos y funciones del API
import { CartItem, getCart } from '@/app/libs/cart.api';

const Cart = () => {
  // Estado principal del carrito
  const [carts, setCart] = useState<CartItem[]>([]); // Lista de productos en el carrito
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({}); // Mapea cada producto con su cantidad actual
  const [loading, setLoading] = useState(true); // Indica si los datos están cargando

  // Al montar el componente, obtiene los productos del carrito
  useEffect(() => {
    getCart()
      .then((cartItems) => {
        setCart(cartItems); // Guarda los ítems en el estado
        // Inicializa las cantidades según el stock actual de cada producto
        const initialQuantities = cartItems.reduce((acc, item) => {
          acc[item.id] = item.stock;
          return acc;
        }, {} as { [key: string]: number });
        setQuantities(initialQuantities); // Guarda las cantidades
      })
      .catch((err) => console.error('Error:', err)) // Si algo falla, lo muestra por consola
      .finally(() => setLoading(false)); // Desactiva el indicador de carga
  }, []);

  // Aumenta la cantidad de un producto
  const handleIncrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  // Disminuye la cantidad de un producto (mínimo 1)
  const handleDecrement = (id: string) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  // Cambia la cantidad de un producto manualmente
  const handleQuantityChange = (id: string, newValue: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  // Elimina un ítem del carrito (visual, no de la API)
  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Vacía todo el carrito en el estado
  const handleClearCart = () => {
    setCart([]); // Vacía los productos
  };

  // Vacía productos y cantidades (se usa después de comprar)
  const handleResetCart = () => {
    setCart([]);      // Limpia productos
    setQuantities({}); // Limpia cantidades
  };

  // Calcula el total del carrito: precio x cantidad por cada producto
  const total = carts.reduce((sum, item) => {
    const quantity = quantities[item.id] || 0; // Por si aún no se ha cargado
    return sum + item.product.price * quantity;
  }, 0);

  return (
    <>
      {/* Lista de productos del carrito */}
      <ul className="flex-1 overflow-y-auto py-4 space-y-4">
        <Item
          carts={carts}
          quantities={quantities}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleQuantityChange={handleQuantityChange}
          handleRemoveItem={handleRemoveItem}
          loading={loading}
        />
      </ul>

      {/* Sección inferior: acciones y total */}
      <div className="border-t pt-4 space-y-2">
        <Clean handleClearCart={handleClearCart} />
        <Buy total={total} handleResetCart={handleResetCart} />
        <Total total={total} />
      </div>
    </>
  );
};

export default Cart;
