// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
import Navbar from './components/Navbar';
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
              <div className='flex'>
              <div className="flex border-r-[#cccccc] border h-[80vh] w-[4.8vw] flex-col">
                
                </div>
  
                  <Routes>
                    <Route path="/proyectos" element={<Proyectos />} />
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
