// Componente funcional que representa la cabecera del carrito, con título y botón de cerrar
const Title = () => {
    return (
        // Contenedor con flexbox:
        // - `justify-between`: coloca el título a la izquierda y el botón a la derecha
        // - `items-center`: alinea verticalmente al centro
        // - `border-b`: añade una línea debajo (borde inferior)
        // - `pb-2`: padding inferior para separar el contenido del borde
        <div className="flex justify-between items-center border-b pb-2">

            {/* Título del carrito */}
            <h2 className="text-xl font-bold">Tu Carrito</h2>

            {/* Botón con una "X" para cerrar el carrito */}
            {/*
              - `text-gray-500`: color gris por defecto
              - `hover:text-black`: se pone negro al pasar el mouse (hover)
              - Podrías agregar funcionalidad con un onClick más adelante
            */}
            <button className="text-gray-500 hover:text-black">✖</button>
        </div>
    );
};

// Exporta el componente para que pueda ser usado en otras partes del proyecto
export default Title;
