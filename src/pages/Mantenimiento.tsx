import React, { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { format, addDays } from 'date-fns';

type Activo = {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  ultimoMantenimiento: string | null;
};

const Mantenimiento: React.FC = () => {
  const [selectedActivo, setSelectedActivo] = useState<number | null>(null);

  const { data: activos, isLoading, refetch } = useQuery({
    queryKey: ['activosMantenimiento'],
    queryFn: async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, tipo: 'Computadora', marca: 'Dell', modelo: 'Latitude', numeroSerie: 'ABC123', ultimoMantenimiento: '2023-03-15' },
        { id: 2, tipo: 'Impresora', marca: 'HP', modelo: 'LaserJet', numeroSerie: 'XYZ789', ultimoMantenimiento: null },
      ] as Activo[];
    }
  });

  const mantenimientoMutation = useMutation({
    mutationFn: (activoId: number) => {
      // Simular una llamada a la API para registrar el mantenimiento
      return new Promise(resolve => setTimeout(() => resolve(activoId), 1000));
    },
    onSuccess: () => {
      alert('Mantenimiento registrado con éxito');
      setSelectedActivo(null);
      refetch();
    },
  });

  const handleMantenimiento = () => {
    if (selectedActivo) {
      mantenimientoMutation.mutate(selectedActivo);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mantenimiento de Activos</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Modelo</th>
            <th className="border p-2">Número de Serie</th>
            <th className="border p-2">Último Mantenimiento</th>
            <th className="border p-2">Próximo Mantenimiento</th>
            <th className="border p-2">Acción</th>
          </tr>
        </thead>
        <tbody>
          {activos?.map(activo => (
            <tr key={activo.id} className={selectedActivo === activo.id ? 'bg-blue-100' : ''}>
              <td className="border p-2">{activo.tipo}</td>
              <td className="border p-2">{activo.marca}</td>
              <td className="border p-2">{activo.modelo}</td>
              <td className="border p-2">{activo.numeroSerie}</td>
              <td className="border p-2">{activo.ultimoMantenimiento ? format(new Date(activo.ultimoMantenimiento), 'dd/MM/yyyy') : 'N/A'}</td>
              <td className="border p-2">
                {activo.ultimoMantenimiento
                  ? format(addDays(new Date(activo.ultimoMantenimiento), 90), 'dd/MM/yyyy')
                  : 'Pendiente'}
              </td>
              <td className="border p-2">
                <button
                  onClick={() => setSelectedActivo(activo.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                >
                  Seleccionar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-6">
        <button
          onClick={handleMantenimiento}
          disabled={!selectedActivo || mantenimientoMutation.isPending}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-300"
        >
          {mantenimientoMutation.isPending ? 'Registrando...' : 'Registrar Mantenimiento'}
        </button>
      </div>
    </div>
  );
};

export default Mantenimiento;