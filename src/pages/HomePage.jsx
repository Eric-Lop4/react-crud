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
      console.log(response.data);
      setDispositivos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  console.log(dispositivos)

  return (
    <div>
      <div>
        <Link
          to="/create"
          className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
        >
          Crear un Dispositivo
        </Link>

        <Link
          to="/ubicaciones"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          Ubicaciones
        </Link>
        <Link
          to="/tipos"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          Tipos Dispositivos
        </Link>
        <Link
          to="/sistemas"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          S.O
        </Link>
        <Link
          to="/office"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          Office
        </Link>
        <Link
          to="/estado"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          Estado
        </Link>
        <Link
          to="/hardware"
          className="inline-block mt-4 shadow-md bg-green-700 text-white rounded-sm px-4 py-2 font-bold ml-5 hover:bg-green-600 hover:cursor-pointer"
        >
          HardWare
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {isLoading ? (
          "Loading"
        ) : (
            
          <>
            {dispositivos.length > 0 ? (
              <>
                {
                dispositivos.map((dispositivo, index) => {
                  return (
                    <Dispositivo
                        key={index}
                        dispositivo={dispositivo}
                        getProducts={getProducts}
                    />
                  );
                })}
              </>
            ) : (
              <div>There is no product</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
