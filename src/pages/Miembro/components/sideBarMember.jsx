import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import EsquinaMember from "./EsquinaMember";

const SideBarMember = () => {
  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  return (
    <div className="flex">
      <EsquinaMember />
      <div className="w-32 border-r-2 border-black p-4">
        <div className="mt-20">
          <button
            className="bg-white rounded-lg h-16 mb-4 flex items-center justify-center text-2xl"
            onClick={handleLogout}
          >
            <FaSignOutAlt /> 
            <span className="ml-2">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBarMember;
