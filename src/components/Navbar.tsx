import React from 'react';
import { Link } from 'react-router-dom';
import { Home, PlusCircle, Users, Wrench, ClipboardList } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Home className="mr-2" />
            <span className="font-bold text-xl">Gestión de Activos TI</span>
          </Link>
          <div className="flex space-x-4">
            <NavLink to="/registro" icon={<PlusCircle />} text="Registro" />
            <NavLink to="/asignacion" icon={<Users />} text="Asignación" />
            <NavLink to="/mantenimiento" icon={<Wrench />} text="Mantenimiento" />
            <NavLink to="/inventario" icon={<ClipboardList />} text="Inventario" />
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink: React.FC<{ to: string; icon: React.ReactNode; text: string }> = ({ to, icon, text }) => (
  <Link to={to} className="flex items-center hover:bg-blue-700 px-3 py-2 rounded">
    {icon}
    <span className="ml-1">{text}</span>
  </Link>
);

export default Navbar;