import React from "react";
import Esquina from "../Esquina";
import NavbarLider from "./NabvarLider";

function SideBarLider() {
  return (
    <>
    <Esquina/>

      <div className=" border-r-2 border-black   w-28 block h-screen left-0 top-0 p-4">
      <NavbarLider />
        <div className=" mt-20">
            <p className="bg-white rounded-lg  h-16 mb-4 flex items-center justify-center text-2xl">
              Cerrar sesión
            </p>
        </div>
      </div>
    </>
  );
}

export default SideBarLider;
