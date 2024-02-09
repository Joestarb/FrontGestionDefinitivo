import { useState, useEffect } from "react";
import axios from "axios";

const Equipos = () => {
  const [equipos, setEquipos] = useState([]);
  const [nombreEquipo, setNombreEquipo] = useState("");

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const response = await axios.get("https://localhost:8080/equipo");
        setEquipos(response.data);
      } catch (error) {
        console.error("Error fetching equipos:", error);
      }
    };

    fetchEquipos();
  }, []);

  const handleInputChange = (event) => {
    setNombreEquipo(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://localhost:8080/equipo", {
        nombre: nombreEquipo,
      });
      setEquipos([...equipos, response.data]);
      setNombreEquipo("");
    } catch (error) {
      console.error("Error creating equipo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:8080/equipo/${id}`);
      setEquipos(equipos.filter((equipo) => equipo.id_equipo !== id));
    } catch (error) {
      console.error("Error deleting equipo:", error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between mx-[1%] py-[.5%]">
        <p className="text-4xl font-semibold">Equipos</p>
        {/* Botón para agregar nuevo equipo */}
      </div>

      <div className="mx-10">
        <section className="mt-6">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nombre del equipo"
              value={nombreEquipo}
              onChange={handleInputChange}
              className="border-[#CCCCCC] border-2 mx-[1%] border-b-2-[#cccccc] mt-2 rounded-md text-sm px-2 py-1"
            />
            <button
              type="submit"
              className="bg-black text-white px-2 py-1 rounded-md ml-2"
            >
              Agregar equipo
            </button>
          </form>
        </section>

        <div className="overflow-x-auto mt-6">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="border-b-2 px-4 py-2 text-sm">ID</th>
                <th className="border-b-2 px-4 py-2 text-sm">Nombre</th>
                <th className="border-b-2 px-4 py-2 text-sm">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {equipos.map((equipo) => (
                <tr key={equipo.id_equipo} className="text-center">
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {equipo.id_equipo}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    {equipo.nombre}
                  </td>
                  <td className="border-b-2 px-4 py-2 text-sm">
                    <button
                      onClick={() => handleDelete(equipo.id_equipo)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Equipos;
