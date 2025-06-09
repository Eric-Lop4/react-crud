import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ListDispositivosVista = () => {
  const [, setDispositivos] = useState([]);
  const [dispositivosOrdenados, setDispositivosOrdenados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [campoOrdenActual, setCampoOrdenActual] = useState("");
  const [ubicaciones, setUbicaciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [estados, setEstados] = useState([]);

  const getDispositivos = async () => {
    try {
      const [dispRes, ubicRes, tipoRes, soRes, estRes] = await Promise.all([
        axios.get("http://localhost:3000/dispositivos"),
        axios.get("http://localhost:3000/Ubicacion"),
        axios.get("http://localhost:3000/tipos"),
        axios.get("http://localhost:3000/so"),
        axios.get("http://localhost:3000/estados"),
      ]);

      setDispositivos(dispRes.data);
      setDispositivosOrdenados(dispRes.data);
      setUbicaciones(ubicRes.data);
      setTipos(tipoRes.data);
      setSistemas(soRes.data);
      setEstados(estRes.data);
      setLoading(false);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar datos");
      setLoading(false);
    }
  };

  const deleteDispositivo = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este dispositivo?")) return;
    try {
      await axios.delete(`http://localhost:3000/dispositivos/${id}`);
      toast.success("Dispositivo eliminado correctamente");
      getDispositivos();
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al eliminar dispositivo");
    }
  };

  const obtenerNombre = (lista, id, campoTexto) => {
    const item = lista.find((x) =>
      x.IdUbicacion === id ||
      x.IdTipoDisp === id ||
      x.IdSO === id ||
      x.IdEstado === id
    );
    return item ? item[campoTexto] : id;
  };

  const ordenarPorCampo = (campo) => {
    const nuevaDireccion = campo === campoOrdenActual ? !ordenAscendente : true;
    let ordenados = [...dispositivosOrdenados];

    ordenados.sort((a, b) => {
      let valA, valB;

      if (campo === "ValorTipo") {
        valA = obtenerNombre(tipos, a.IdTipoDisp, campo).toLowerCase();
        valB = obtenerNombre(tipos, b.IdTipoDisp, campo).toLowerCase();
      } else if (campo === "FechaCompra") {
        valA = new Date(a[campo]);
        valB = new Date(b[campo]);
      } else {
        valA = a[campo]?.toString().toLowerCase();
        valB = b[campo]?.toString().toLowerCase();
      }

      if (valA < valB) return nuevaDireccion ? -1 : 1;
      if (valA > valB) return nuevaDireccion ? 1 : -1;
      return 0;
    });

    setDispositivosOrdenados(ordenados);
    setOrdenAscendente(nuevaDireccion);
    setCampoOrdenActual(campo);
  };

  useEffect(() => {
    getDispositivos();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Listado de Dispositivos</h2>
        <Link
          to="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear Dispositivo
        </Link>
      </div>

      {loading ? (
        <p>Cargando dispositivos...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th
                  className="border p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => ordenarPorCampo("CodigoDispositivo")}
                  title="Ordenar por código"
                >
                  Código ⬍
                </th>
                <th className="border p-2">Importe</th>
                <th
                  className="border p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => ordenarPorCampo("FechaCompra")}
                  title="Ordenar por fecha"
                >
                  Fecha Compra ⬍
                </th>
                <th className="border p-2">Ubicación</th>
                <th
                  className="border p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => ordenarPorCampo("ValorTipo")}
                  title="Ordenar por tipo"
                >
                  Tipo ⬍
                </th>
                <th className="border p-2">Sistema Operativo</th>
                <th className="border p-2">Estado</th>
                <th className="border p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dispositivosOrdenados.map((d) => (
                <tr key={d.IdDispositivo} className="hover:bg-gray-50">
                  <td className="border p-2">{d.CodigoDispositivo}</td>
                  <td className="border p-2">{d.Importe}</td>
                  <td className="border p-2">{d.FechaCompra?.split("T")[0]}</td>
                  <td className="border p-2">
                    {obtenerNombre(ubicaciones, d.IdUbicacion, "Departamento")}
                  </td>
                  <td className="border p-2">
                    {obtenerNombre(tipos, d.IdTipoDisp, "ValorTipo")}
                  </td>
                  <td className="border p-2">
                    {obtenerNombre(sistemas, d.IdSO, "NomSO")}
                  </td>
                  <td className="border p-2">
                    {obtenerNombre(estados, d.IdEstado, "ValorEstado")}
                  </td>
                  <td className="border p-2 space-x-2">
                    <Link
                      to={`/edit/${d.IdDispositivo}`}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => deleteDispositivo(d.IdDispositivo)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ListDispositivosVista;
