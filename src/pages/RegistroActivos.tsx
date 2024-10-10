import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

type FormData = {
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  fechaAdquisicion: string;
  proveedor: string;
};

const RegistroActivos: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      // Simular una llamada a la API para registrar el activo
      return new Promise(resolve => setTimeout(() => resolve(data), 1000));
    },
    onSuccess: () => {
      alert('Activo registrado con éxito');
      reset();
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Registro de Activos</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Tipo de Activo</label>
          <select
            {...register('tipo', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          >
            <option value="">Seleccione un tipo</option>
            <option value="computadora">Computadora</option>
            <option value="impresora">Impresora</option>
            <option value="servidor">Servidor</option>
            <option value="red">Equipo de Red</option>
          </select>
          {errors.tipo && <span className="text-red-500 text-sm">{errors.tipo.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Marca</label>
          <input
            type="text"
            {...register('marca', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.marca && <span className="text-red-500 text-sm">{errors.marca.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Modelo</label>
          <input
            type="text"
            {...register('modelo', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.modelo && <span className="text-red-500 text-sm">{errors.modelo.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Número de Serie</label>
          <input
            type="text"
            {...register('numeroSerie', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.numeroSerie && <span className="text-red-500 text-sm">{errors.numeroSerie.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Fecha de Adquisición</label>
          <input
            type="date"
            {...register('fechaAdquisicion', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.fechaAdquisicion && <span className="text-red-500 text-sm">{errors.fechaAdquisicion.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Proveedor</label>
          <input
            type="text"
            {...register('proveedor', { required: 'Este campo es requerido' })}
            className="w-full p-2 border rounded"
          />
          {errors.proveedor && <span className="text-red-500 text-sm">{errors.proveedor.message}</span>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Registrando...' : 'Registrar Activo'}
        </button>
      </form>
    </div>
  );
};

export default RegistroActivos;