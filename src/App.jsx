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
import Inicio from './pages/Lider/InicioMiembro';
import Equipos from './pages/Admin/Equipos/Equipos';
import RecursosAdmin from './pages/Admin/Recursos/Recursos';
import Error404 from './pages/Erro404'
import MiembrosLider from './pages/Lider/Miembro/MiembrosLider';
import Recursos from './pages/Lider/Recursos/Recursos';
import InicioMiembro from './pages/Lider/InicioMiembro';
import InicioRecurso from './pages/Lider/InicioRecurso';
import InicioTareas from './pages/Lider/InicioTareas';

function App() {
  const cerrarSesion = () => {
    sessionStorage.clear();
    localStorage.clear();
  };

  // Función para verificar el rol almacenado en localStorage
  const verificarRol = (rolAutorizado) => {
    const rolUsuario = sessionStorage.getItem('rol');

    // Verificar si el rol del usuario coincide con el rol autorizado
    if (rolUsuario === true) {
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


              {/* <Footer /> */}
            </div>
          )}
        />

        {/* Rutas para el rol de miembro */}
        <Route
          path="/miembro/"
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
          path="/lider/"
          element={verificarRol('Lider') && (
            <div>
              <SideBar />
              <div className='flex  flex-row'>


                <Routes>
                  <Route path="miembros" element={<InicioMiembro />} />
                  <Route path="recursos" element={<InicioRecurso />} />
                  <Route path="tareas" element={<InicioTareas />} />
            


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
