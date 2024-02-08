// App.js
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from "./pages/Login/Login"
import Proyectos from "./pages/Admin/Proyectos/Proyectos"
import SideBar from "./components/SideBar"
import Footer from './components/Footer';
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
              <Footer/>

            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
