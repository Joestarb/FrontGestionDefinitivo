// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import cerrar from './assets/Sidebar/cerrar.svg'
import proyectos from './assets/Sidebar/proyectos.svg'
import Equipos from './pages/Admin/Equipos/Equipos';
import Recursos from './pages/Admin/Recursos/Recursos';
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
                    <Route path="/equipos" element=  {<Equipos />} />
                    <Route path="/recursos" element= {<Recursos />} />
                  </Routes>
              </div>

              <Footer/>

            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
