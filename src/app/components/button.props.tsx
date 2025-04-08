// Definimos las props que el botón necesita
type DynamicButtonProps = {
  label: string;       // Texto que se mostrará dentro del botón
  onClick: () => void; // Función que se ejecutará al hacer clic
};

// Componente de botón reutilizable
const ButtonProps = ({ label, onClick }: DynamicButtonProps) => {
  return (
    <button
      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm hover:underline active:text-red-700 cursor-pointer"
      onClick={onClick} // Ejecuta la función pasada por props al hacer clic
    >
      {label} {/* Muestra el texto dinámicamente según la prop */}
    </button>
  );
};

export default ButtonProps;
