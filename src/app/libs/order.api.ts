'use client';
// Este archivo es un "Client Component" de Next.js 15 (App Router).
// Esto significa que se ejecutará en el navegador, no en el servidor.
// Es necesario cuando usas cosas como hooks, eventos del DOM o APIs del navegador.

// Tipo que representa un ítem de orden que devuelve el backend.
export type OrderItem = {
    id: string;      // ID único de la orden (probablemente generado por la base de datos)
    price: number;   // Precio asociado a la orden
};

// Variable que toma la URL base de la API desde una variable de entorno pública.
const API_BASE = process.env['NEXT_PUBLIC_API_BASE'];

// Define el nombre de la ruta a base en el backend
const route = 'order';

// Función que crea una nueva orden enviando un precio al backend.
export async function createOrder(price: number): Promise<OrderItem> {
  // Hace una petición POST al endpoint `${API_BASE}/order` enviando el precio como JSON.
  const res = await fetch(`${API_BASE}/${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indica que se está enviando un cuerpo en formato JSON
    },
    body: JSON.stringify({ price }), // El cuerpo de la petición contiene un objeto con el precio
  });

  // Si la respuesta no fue exitosa (status != 200-299), lanza un error
  if (!res.ok) {
    throw new Error(`Error al crear la orden: ${res.statusText}`);
  }

  // Si todo salió bien, devuelve el JSON parseado con los datos de la orden creada
  return res.json();
}
