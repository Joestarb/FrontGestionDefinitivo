// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
import EquipoLider from './pages/Lider/Equipo/EquipoLider';
import SideBarLider from './components/Lider/SidebarLider';
import Erro404 from './pages/Erro404';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />


        <Route
          path="/administrador/*"
          element={
            <div className='flex flex-row'>
              <SideBar />
              <div className='  mt-24  w-full'>

                <Routes>
                  <Route path="/proyectos" element={<Proyectos />} />
                </Routes>
              </div>
              <Footer />
            </div>
          }
        />


        <Route
          path="/Lider/*"
          element={
            <div className='flex flex-row'>
              <SideBarLider />
              <div className='  mt-24  w-full'>
                <Routes>
                  <Route path="/proyectos" element={<EquipoLider />} />

                </Routes>
              </div>
              <Footer />
            </div>
          }
        />
        <Route path="/*" element={<Erro404 />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
