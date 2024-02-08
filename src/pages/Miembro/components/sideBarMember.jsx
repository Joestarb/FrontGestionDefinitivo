import React from "react";
import EsquinaMember from "./EsquinaMember";
import NavbarMember from "./NavBarMember";

function SideBarMember() {
  return (
    <div className="flex">
      <EsquinaMember />
      <div className="w-32 border-r-2 border-black p-4">
        <NavbarMember />
        <div className="mt-20">
          <p className="bg-white rounded-lg h-16 mb-4 flex items-center justify-center text-2xl">
            Cerrar sesión
          </p>
        </div>
      </div>
    </div>
  );
}

export default SideBarMember;
