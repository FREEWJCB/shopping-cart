'use client';
// Este archivo es un Client Component en Next.js (se ejecuta en el navegador).
// Es necesario para poder usar `fetch` y otras funcionalidades del lado del cliente.

// Tipo que representa un producto disponible en la tienda.
export type ProductItem = {
    id: string;           // ID único del producto
    name: string;         // Nombre del producto
    price: number;        // Precio del producto
    stock: number;        // Stock disponible
    imageURL: string;     // URL de la imagen del producto
};

// Tipo que representa un ítem dentro del carrito de compras.
export type CartItem = {
    id: string;             // ID del ítem en el carrito (puede ser distinto del productId)
    productId: string;      // ID del producto relacionado
    product: ProductItem;   // Datos completos del producto
    stock: number;          // Cantidad que el usuario quiere llevar
    status: string;         // Estado del ítem (por ejemplo: activo, agotado, reservado, etc.)
};

// URL base de la API que se toma de las variables de entorno públicas
const API_BASE = process.env['NEXT_PUBLIC_API_BASE'];
const route = 'cart'; // Ruta base del controlador de carrito

// Función para obtener todos los ítems del carrito desde el backend
export async function getCart(): Promise<CartItem[]> {
  const res = await fetch(`${API_BASE}/${route}`, {
    cache: 'no-store', // Desactiva el cache para siempre obtener la versión más actual del carrito
  });

  // Verifica si la respuesta fue exitosa
  if (!res.ok) {
    throw new Error('Error al cargar carrito'); // Lanza un error si falla
  }

  // Devuelve el contenido del carrito en formato JSON
  return res.json();
}
// Función para actualizar un ítem del carrito (por ejemplo, cambiar la cantidad)
export async function updateCartItem(
  id: string, // ID del ítem en el carrito
  data: { stock?: number } // Objeto con los campos que se van a actualizar (por ahora solo stock)
): Promise<void> {
  const res = await fetch(`${API_BASE}/${route}/${id}`, {
    method: 'PATCH', // PATCH se usa para actualizaciones parciales
    headers: {
      'Content-Type': 'application/json', // Se envía JSON en el cuerpo de la petición
    },
    body: JSON.stringify(data), // Se convierte el objeto a JSON
  });

  if (!res.ok) {
    throw new Error(`Error al actualizar el carrito: ${res.statusText}`);
  }
}
// Función para eliminar un ítem específico del carrito
export async function deleteCartItem(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${route}/${id}`, {
    method: 'DELETE', // DELETE elimina un recurso
  });

  if (!res.ok) {
    throw new Error(`Error al eliminar el elemento del carrito: ${res.statusText}`);
  }
}
// Función para vaciar todo el carrito (eliminar todos los ítems)
export async function clearCart(): Promise<void> {
  const res = await fetch(`${API_BASE}/${route}`, {
    method: 'DELETE', // Al no especificar un ID, se interpreta que se eliminan todos los ítems
  });

  if (!res.ok) {
    throw new Error(`Error al vaciar el carrito: ${res.statusText}`);
  }
}