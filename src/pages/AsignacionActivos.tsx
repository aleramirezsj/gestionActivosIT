import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';

type Activo = {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
};

type Empleado = {
  id: number;
  nombre: string;
  departamento: string;
};

const AsignacionActivos: React.FC = () => {
  const [selectedActivo, setSelectedActivo] = useState<number | null>(null);
  const [selectedEmpleado, setSelectedEmpleado] = useState<number | null>(null);

  const { data: activos, isLoading: isLoadingActivos } = useQuery({
    queryKey: ['activos'],
    queryFn: async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, tipo: 'Computadora', marca: 'Dell', modelo: 'Latitude', numeroSerie: 'ABC123' },
        { id: 2, tipo: 'Impresora', marca: 'HP', modelo: 'LaserJet', numeroSerie: 'XYZ789' },
      ] as Activo[];
    }
  });

  const { data: empleados, isLoading: isLoadingEmpleados } = useQuery({
    queryKey: ['empleados'],
    queryFn: async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, nombre: 'Juan Pérez', departamento: 'IT' },
        { id: 2, nombre: 'María García', departamento: 'Ventas' },
      ] as Empleado[];
    }
  });

  const asignacionMutation = useMutation({
    mutationFn: (asignacion: { activoId: number; empleadoId: number }) => {
      // Simular una llamada a la API para asignar el activo
      return new Promise(resolve => setTimeout(() => resolve(asignacion), 1000));
    },
    onSuccess: () => {
      alert('Activo asignado con éxito');
      setSelectedActivo(null);
      setSelectedEmpleado(null);
    },
  });

  const handleAsignar = () => {
    if (selectedActivo && selectedEmpleado) {
      asignacionMutation.mutate({ activoId: selectedActivo, empleadoId: selectedEmpleado });
    }
  };

  if (isLoadingActivos || isLoadingEmpleados) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Asignación de Activos</h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Activos Disponibles</h2>
          <ul className="space-y-2">
            {activos?.map(activo => (
              <li
                key={activo.id}
                className={`p-2 border rounded cursor-pointer ${selectedActivo === activo.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedActivo(activo.id)}
              >
                {activo.tipo} - {activo.marca} {activo.modelo} (S/N: {activo.numeroSerie})
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Empleados</h2>
          <ul className="space-y-2">
            {empleados?.map(empleado => (
              <li
                key={empleado.id}
                className={`p-2 border rounded cursor-pointer ${selectedEmpleado === empleado.id ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedEmpleado(empleado.id)}
              >
                {empleado.nombre} - {empleado.departamento}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-6">
        <button
          onClick={handleAsignar}
          disabled={!selectedActivo || !selectedEmpleado || asignacionMutation.isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {asignacionMutation.isPending ? 'Asignando...' : 'Asignar Activo'}
        </button>
      </div>
    </div>
  );
};

export default AsignacionActivos;