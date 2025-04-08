// Importamos React y tipos útiles para props con children
import { FC, PropsWithChildren } from "react";

// Importamos los estilos globales (Tailwind y demás)
import '@/app/ui/global.css';

// Tipo para configurar metadatos del documento HTML (Next.js 13+)
import { Metadata } from "next";

// Definimos los metadatos básicos para la página
export const metadata: Metadata = {
  title: 'Shopping cart', // Título que aparecerá en la pestaña del navegador
};

// Componente raíz del layout que envolverá toda la app
// Utiliza PropsWithChildren para recibir contenido interno (children)
const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html>
      <head>
        {/* Configuración para que la vista sea responsiva en dispositivos móviles */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* Cuerpo del HTML, donde se inyecta el contenido principal */}
      <body className="bg-gray-100"> {/* Fondo gris claro en toda la app */}
        {children} {/* Aquí se renderizan los componentes hijos */}
      </body>
    </html>
  );
};

export default RootLayout;
