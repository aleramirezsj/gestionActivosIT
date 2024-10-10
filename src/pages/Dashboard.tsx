import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { PieChart, Laptop, Printer, Server, Users, Wrench } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      // Simular una llamada a la API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        totalActivos: 150,
        activosAsignados: 120,
        mantenimientosPendientes: 5,
        distribucionTipos: {
          computadoras: 80,
          impresoras: 30,
          servidores: 40
        }
      };
    }
  });

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total de Activos"
          value={stats?.totalActivos}
          icon={<PieChart className="h-8 w-8 text-blue-500" />}
        />
        <StatCard
          title="Activos Asignados"
          value={stats?.activosAsignados}
          icon={<Users className="h-8 w-8 text-green-500" />}
        />
        <StatCard
          title="Mantenimientos Pendientes"
          value={stats?.mantenimientosPendientes}
          icon={<Wrench className="h-8 w-8 text-yellow-500" />}
        />
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Distribución de Activos</h2>
        <div className="flex justify-around">
          <TypeDistribution
            icon={<Laptop className="h-12 w-12 text-blue-500" />}
            type="Computadoras"
            count={stats?.distribucionTipos.computadoras}
          />
          <TypeDistribution
            icon={<Printer className="h-12 w-12 text-green-500" />}
            type="Impresoras"
            count={stats?.distribucionTipos.impresoras}
          />
          <TypeDistribution
            icon={<Server className="h-12 w-12 text-purple-500" />}
            type="Servidores"
            count={stats?.distribucionTipos.servidores}
          />
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string; value?: number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-white shadow rounded-lg p-6 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

const TypeDistribution: React.FC<{ icon: React.ReactNode; type: string; count?: number }> = ({ icon, type, count }) => (
  <div className="text-center">
    <div className="mb-2">{icon}</div>
    <h3 className="font-semibold">{type}</h3>
    <p className="text-2xl font-bold">{count}</p>
  </div>
);

export default Dashboard;