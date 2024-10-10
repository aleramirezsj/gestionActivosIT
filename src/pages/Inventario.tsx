import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search } from 'lucide-react';

type Activo = {
  id: number;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  estado: 'En uso' | 'En mantenimiento' | 'Disponible' | 'Dado de baja';
  asignadoA: string | null;
};

const Inventario: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('');

  const { data: activos, isLoading } = useQuery({
    queryKey: ['inventario'],
    queryFn: async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return [
        { id: 1, tipo: 'Computadora', marca: 'Dell', modelo: 'Latitude', numeroSerie: 'ABC123', estado: 'En uso', asignadoA: 'Juan Pérez' },
        { id: 2, tipo: 'Impresora', marca: 'HP', modelo: 'LaserJet', numeroSerie: 'XYZ789', estado: 'Disponible', asignadoA: null },
        { id: 3, tipo: 'Servidor', marca: 'IBM', modelo: 'PowerEdge', numeroSerie: 'SRV456', estado: 'En mantenimiento', asignadoA: null },
      ] as Activo[];
    }
  });

  const filteredActivos = activos?.filter(activo =>
    (activo.tipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     activo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
     activo.modelo.toLowerCase().includes(searchTerm.toLowerCase()) ||
     activo.numeroSerie.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterEstado === '' || activo.estado === filterEstado)
  );

  if (isLoading) {
    return <div>Cargando inventario...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Inventario de Activos</h1>
      <div className="mb-4 flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar por tipo, marca, modelo o número de serie"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" />
        </div>
        <select
          value={filterEstado}
          onChange={(e) => setFilterEstado(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Todos los estados</option>
          <option value="En uso">En uso</option>
          <option value="En mantenimiento">En mantenimiento</option>
          <option value="Disponible">Disponible</option>
          <option value="Dado de baja">Dado de baja</option>
        </select>
      </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Tipo</th>
            <th className="border p-2">Marca</th>
            <th className="border p-2">Modelo</th>
            <th className="border p-2">Número de Serie</th>
            <th className="border p-2">Estado</th>
            <th className="border p-2">Asignado a</th>
          </tr>
        </thead>
        <tbody>
          {filteredActivos?.map(activo => (
            <tr key={activo.id}>
              <td className="border p-2">{activo.tipo}</td>
              <td className="border p-2">{activo.marca}</td>
              <td className="border p-2">{activo.modelo}</td>
              <td className="border p-2">{activo.numeroSerie}</td>
              <td className="border p-2">
                <span className={`px-2 py-1 rounded ${getEstadoColor(activo.estado)}`}>
                  {activo.estado}
                </span>
              </td>
              <td className="border p-2">{activo.asignadoA || 'No asignado'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        Total de activos: {filteredActivos?.length}
      </div>
    </div>
  );
};

const getEstadoColor = (estado: string) => {
  switch (estado) {
    case 'En uso':
      return 'bg-green-200 text-green-800';
    case 'En mantenimiento':
      return 'bg-yellow-200 text-yellow-800';
    case 'Disponible':
      return 'bg-blue-200 text-blue-800';
    case 'Dado de baja':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

export default Inventario;