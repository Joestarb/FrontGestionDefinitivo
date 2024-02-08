
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Tareas from "./pages/Miembro/Tareas/Tareas"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/administrador/*" element={<AdminRoutes />} />
        <Route path="/miembro/*" element={<MemberRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

function AdminRoutes() {
  return (
    <div className='flex flex-row'>
      <SideBar />
      <div className='mt-16 w-full'>
        <Routes>
          <Route path="/proyectos" element={<Proyectos />} />
        </Routes>
      </div>
    </div>
  );
}

function MemberRoutes() {
  return (
    <div className='mt-16 w-full'>
      <Routes>
      <Route path="/tareas" element={<Tareas />} />
      </Routes>
    </div>
  );
}

export default App;
