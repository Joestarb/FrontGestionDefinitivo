import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import cerrar from './assets/Sidebar/cerrar.svg'
import proyectos from './assets/Sidebar/proyectos.svg'
import Tareas from "./pages/Miembro/Tareas/Tareas"


function App() {



  const cerrarSesion = () => {
    sessionStorage.clear()
    localStorage.clear()
  } 

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route
          path="/administrador/*"
          element={
            <div>
              <SideBar />
              <div className='flex '>
              <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                <img className='w-[50%]' src={proyectos}/>
                <Link to="/">
                  <img className='w-[100%]' src={cerrar} onClick={cerrarSesion}/>
                </Link>
              </div>
  
                  <Routes>
                    <Route path="proyectos" element={<Proyectos />} />
                  </Routes>
              </div>

              <Footer/>

            </div>
          }
        />
        <Route path="/miembro/*" element={
        
        
        <div>
              <SideBar />
              <div className='flex '>
              <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                <img className='w-[50%]' src={proyectos}/>
                <Link to="/">
                  <img className='w-[100%]' src={cerrar} onClick={cerrarSesion}/>
                </Link>
              </div>
  
                  <Routes>
                  <Route path="tareas" element={<Tareas />} />
                  </Routes>
              </div>

              <Footer/>

            </div>
        
        
        } />
      </Routes>
    </BrowserRouter>
  );
}

function MemberRoutes() {
  return (
    <div className='mt-16 w-full'>
      <Routes>
        
      </Routes>
    </div>
  );
}

export default App;
