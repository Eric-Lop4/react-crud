import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Dispositivo from "../components/Dispositivo";

const HomePage = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:3000/dispositivos");
      setDispositivos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching dispositivos:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Link
          to="/create"
          className="inline-block shadow-md bg-blue-700 text-white rounded px-4 py-2 font-bold hover:bg-blue-600 transition-colors"
        >
          Crear un Dispositivo
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {isLoading ? (
          <div className="col-span-3 text-center py-4">Cargando dispositivos...</div>
        ) : dispositivos.length > 0 ? (
          dispositivos.map((dispositivo) => (
            <Dispositivo
              key={dispositivo.id}
              dispositivo={dispositivo}
              getProducts={getProducts}
            />
          ))
        ) : (
          <div className="col-span-3 text-center py-4">No hay dispositivos registrados</div>
        )}
      </div>
    </div>
  );
};

export default HomePage;