import React from 'react';
import { BrowserRouter, Link, Route, Routes, Navigate } from 'react-router-dom';
import Login from "./pages/Login/Login";
import Proyectos from "./pages/Admin/Proyectos/Proyectos";
import SideBar from "./components/SideBar";
import Footer from './components/Footer';
import cerrar from './assets/Sidebar/cerrar.svg';
import proyectos from './assets/Sidebar/proyectos.svg';
import Tareas from "./pages/Miembro/Tareas/Tareas";
import SideBarLider from "./components/Lider/SidebarLider";
import Inicio from './pages/Lider/Inicio';
import Equipos from './pages/Admin/Equipos/Equipos';
import RecursosAdmin from './pages/Admin/Recursos/Recursos';
import Error404 from './pages/Erro404'

function App() {
  const cerrarSesion = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  // Función para verificar el rol almacenado en localStorage
  const verificarRol = (rolAutorizado) => {
    const rolUsuario = sessionStorage.getItem('rol');
  
    // Verificar si el rol del usuario coincide con el rol autorizado
    if (rolUsuario === rolAutorizado) {
      return true;
    } else {
      // Redirigir a la página de inicio de sesión si no tiene permisos
      return <Navigate to="/" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/*" element={<Error404 />} />
        <Route path="/admin/*" element={<Error404 />} />
        <Route path="/miembro/*" element={<Error404 />} />
        <Route path="/lider/*" element={<Error404 />} />
        {/* Rutas para el rol de administrador */}
        <Route
          path="/admin/*"
          element={verificarRol('Administrador') && (
            <div>
              <SideBar />
              <div className='flex '>
                <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                  <img className='w-[50%]' src={proyectos} />
                  <Link to="/">
                    <img className='w-[100%]' src={cerrar} onClick={cerrarSesion} />
                  </Link>
                </div>

                <Routes>
                  <Route path="proyectos" element={<Proyectos />} />
                </Routes>

                <Routes>
                  <Route path="equipos" element={<Equipos />} />
                </Routes>

                <Routes>
                  <Route path="recursos" element={<RecursosAdmin />} />
                </Routes>
              </div>
              

              <Footer />
            </div>
          )}
        />

        {/* Rutas para el rol de miembro */}
        <Route
          path="/miembro/*"
          element={(verificarRol('Diseñador') || verificarRol('Analista') || verificarRol('Programador')) && (
            <div>
              <SideBar />
              <div className='flex '>
                <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                  <img className='w-[50%]' src={proyectos} />
                  <Link to="/">
                    <img className='w-[100%]' src={cerrar} onClick={cerrarSesion} />
                  </Link>
                </div>

                <Routes>
                  <Route path="tareas" element={<Tareas />} />
                </Routes>
              </div>

              <Footer />
            </div>
          )}
        />

        {/* Rutas para el rol de líder */}
        <Route
          path="/lider/*"
          element={verificarRol('Lider') && (




                        <div>
              <SideBar />
              <div className='flex '>
                <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                  <img className='w-[50%]' src={proyectos} />
                  <Link to="/">
                    <img className='w-[100%]' src={cerrar} onClick={cerrarSesion} />
                  </Link>
                </div>

                <Routes>
                <Route path="proyectos" element={<Inicio />} />
                </Routes>
              </div>

              <Footer />
            </div>
          )}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
