import React from 'react';
import { BrowserRouter, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login/Login';
import Proyectos from './pages/Admin/Proyectos/Proyectos';
import Tareas from './pages/Miembro/Tareas/Tareas';
import Error404 from './pages/Erro404';
import SideBar from './components/SideBar';
import Footer from './components/Footer';
import Equipos from './pages/Admin/Equipos/Equipos';
import RecursosAdmin from './pages/Admin/Recursos/Recursos';
import InicioMiembro from './pages/Lider/InicioMiembro';
import InicioRecurso from './pages/Lider/InicioRecurso';
import InicioTareas from './pages/Lider/InicioTareas';
import cerrar from './assets/Sidebar/cerrar.svg';
import proyectos from './assets/Sidebar/proyectos.svg';

const cerrarSesion = () => {
  sessionStorage.clear();
  localStorage.clear();
};

const verificarRol = (rolAutorizado) => {
  const rolUsuario = sessionStorage.getItem('rol');
  return rolUsuario === rolAutorizado;
};

const AdminRoutes = () => (
  <>
    <SideBar />
    <div className="flex">
      <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
        <img className="w-[50%]" src={proyectos} alt="Proyectos" />
        <Link to="/">
          <img className="w-[100%]" src={cerrar} alt="Cerrar Sesión" onClick={cerrarSesion} />
        </Link>
      </div>

      <Routes>
        <Route path="proyectos" element={<Proyectos />} />
        <Route path="equipos" element={<Equipos />} />
        <Route path="recursos" element={<RecursosAdmin />} />
      </Routes>
    </div>
    {/* <Footer /> */}
  </>
);

const MiembroRoutes = () => (
  <>
    <SideBar />
    <div className="flex">
      <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
        <img className="w-[50%]" src={proyectos} alt="Proyectos" />
        <Link to="/">
          <img className="w-[100%]" src={cerrar} alt="Cerrar Sesión" onClick={cerrarSesion} />
        </Link>
      </div>

      <Routes>
        <Route path="tareas" element={<Tareas />} />
      </Routes>
    </div>
    <Footer />
  </>
);

const LiderRoutes = () => (
  <>
    <SideBar />
    <div className="flex flex-row">
      <Routes>
        <Route path="miembros" element={<InicioMiembro />} />
        <Route path="recursos" element={<InicioRecurso />} />
        <Route path="tareas" element={<InicioTareas />} />
      </Routes>
    </div>
    <Footer />
  </>
);

function App() {
<<<<<<< HEAD
=======
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

>>>>>>> 9a59aece085d60d7eff4cf38c845059ebe652f71
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
<<<<<<< HEAD
        <Route path="admin/*" element={verificarRol('Administrador') ? <AdminRoutes /> : <Navigate to="/" />} />
        <Route path="miembro/*" element={(verificarRol('Diseñador') || verificarRol('Analista') || verificarRol('Programador')) ? <MiembroRoutes /> : <Navigate to="/" />} />
        <Route path="lider/*" element={verificarRol('Lider') ? <LiderRoutes /> : <Navigate to="/" />} />
        <Route path="/*" element={<Error404 />} />
=======
        
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
>>>>>>> 9a59aece085d60d7eff4cf38c845059ebe652f71
      </Routes>
    </BrowserRouter>
  );
}

export default App;
