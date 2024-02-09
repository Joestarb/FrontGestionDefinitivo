// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import cerrar from './assets/Sidebar/cerrar.svg'
import proyectos from './assets/Sidebar/proyectos.svg'
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
            <div>
              <SideBar />
              <div className='flex '>
              <div className="flex border-r-[#cccccc] border h-[84vh] w-[5.1vw] flex-col justify-start py-[1.5%] gap-[10%] items-center">
                <img className='w-[50%]' src={proyectos}/>
                <img className='w-[50%]' src={cerrar}/>
              </div>
  
                  <Routes>
                    <Route path="/proyectos" element={<Proyectos />} />
                  </Routes>
              </div>

              <Footer/>

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
