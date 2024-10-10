import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import RegistroActivos from './pages/RegistroActivos';
import AsignacionActivos from './pages/AsignacionActivos';
import Mantenimiento from './pages/Mantenimiento';
import Inventario from './pages/Inventario';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/registro" element={<RegistroActivos />} />
              <Route path="/asignacion" element={<AsignacionActivos />} />
              <Route path="/mantenimiento" element={<Mantenimiento />} />
              <Route path="/inventario" element={<Inventario />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;