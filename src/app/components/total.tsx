// Define un tipo (interface) para las props del componente `Total`
type TotalProps = {
  total: number; // El total del carrito (número decimal, normalmente en dólares o la moneda que uses)
};

// Componente funcional de React que muestra el total del carrito.
// Desestructura `total` directamente desde las props
const Total = ({ total }: TotalProps) => {
  return (
    // Contenedor con flexbox que separa el texto "Total:" del valor total a los extremos
    <div className="flex justify-between font-bold text-lg">
      <span>Total:</span> {/* Texto fijo que dice "Total:" */}
      <span>${total.toFixed(2)}</span> {/* Muestra el total con dos decimales, por ejemplo: $12.00 */}
    </div>
  );
};

// Exporta el componente para poder usarlo en otras partes de la app
export default Total;
