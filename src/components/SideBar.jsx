import React from "react";
import Navbar from "./Navbar"
import Esquina from "./Esquina";

function SideBarAdmin() {
  return (
    <>
    <Esquina/>

      <div className=" border-r-2 border-black  w-32 block h-screen left-0 top-0 p-4">
      <Navbar />
        <div className=" mt-20">
            <p className="bg-white rounded-lg  h-16 mb-4 flex items-center justify-center text-2xl">
              Cerrar sesión
            </p>
        </div>
      </div>
    </>
  );
}

export default SideBarAdmin;
