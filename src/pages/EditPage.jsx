import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [dispositivo, setDispositivo] = useState({
    IdDispositivo: "",
    CodigoDispositivo: "",
    Importe: "",
    FechaCompra: "",
    IdUbicacion: "",
    IdTipoDisp: "",
    IdSO: "",
    IdOffice: "",
    IdEstado: "",
    TieneOffice: false,
    IdHardware: "",
    Observaciones: "",
  });

  const [ubicaciones, setUbicaciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [offices, setOffices] = useState([]);
  const [estados, setEstados] = useState([]);
  const [hardwares, setHardwares] = useState([]);

  const getDispositivo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/dispositivos/${id}`);
      setDispositivo({
        IdDispositivo: response.data.IdDispositivo,
        CodigoDispositivo: response.data.CodigoDispositivo,
        Importe: response.data.Importe,
        FechaCompra: response.data.FechaCompra,
        IdUbicacion: response.data.IdUbicacion,
        IdTipoDisp: response.data.IdTipoDisp,
        IdSO: response.data.IdSO,
        IdOffice: response.data.IdOffice,
        IdEstado: response.data.IdEstado,
        TieneOffice: response.data.TieneOffice,
        IdHardware: response.data.IdHardware,
        Observaciones: response.data.Observaciones,
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const fetchSelectData = async () => {
    try {
      const [ubic, tipos, so, office, estados, hw] = await Promise.all([
        axios.get("http://localhost:3000/Ubicacion"),
        axios.get("http://localhost:3000/tipos"),
        axios.get("http://localhost:3000/so"),
        axios.get("http://localhost:3000/Office"),
        axios.get("http://localhost:3000/estados"),
        axios.get("http://localhost:3000/Hardware"),
      ]);
      setUbicaciones(ubic.data);
      setTipos(tipos.data);
      setSistemas(so.data);
      setOffices(office.data);
      setEstados(estados.data);
      setHardwares(hw.data);
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Error al cargar opciones de selección");
    }
  };

  const updateDispositivo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`http://localhost:3000/dispositivos/${dispositivo.IdDispositivo}`, dispositivo);
      toast.success("Device updated successfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getDispositivo();
    fetchSelectData();
  }, []);

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">
        Update Device
      </h2>
      {isLoading ? (
        "Loading"
      ) : (
        <form onSubmit={updateDispositivo}>
          <div className="space-y-2">
            <div>
              <label>CodigoDispositivo</label>
              <input
                type="text"
                value={dispositivo.CodigoDispositivo}
                onChange={(e) =>
                  setDispositivo({ ...dispositivo, CodigoDispositivo: e.target.value })
                }
                className="w-full block border p-3"
              />
            </div>
            <div>
              <label>Importe</label>
              <input
                type="number"
                step="0.01"
                value={dispositivo.Importe}
                onChange={(e) =>
                  setDispositivo({ ...dispositivo, Importe: e.target.value })
                }
                className="w-full block border p-3"
              />
            </div>
            <div>
              <label>FechaCompra</label>
              <input
                type="date"
                value={dispositivo.FechaCompra}
                onChange={(e) =>
                  setDispositivo({ ...dispositivo, FechaCompra: e.target.value })
                }
                className="w-full block border p-3"
              />
            </div>
            <div>
              <label>Ubicación</label>
              <select
                value={dispositivo.IdUbicacion}
                onChange={(e) => setDispositivo({ ...dispositivo, IdUbicacion: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione una ubicación</option>
                {ubicaciones.map((u) => (
                  <option key={u.IdUbicacion} value={u.IdUbicacion}>{u.Departamento}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Tipo de Dispositivo</label>
              <select
                value={dispositivo.IdTipoDisp}
                onChange={(e) => setDispositivo({ ...dispositivo, IdTipoDisp: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione tipo</option>
                {tipos.map((t) => (
                  <option key={t.IdTipoDisp} value={t.IdTipoDisp}>{t.ValorTipo}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Sistema Operativo</label>
              <select
                value={dispositivo.IdSO}
                onChange={(e) => setDispositivo({ ...dispositivo, IdSO: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione sistema</option>
                {sistemas.map((s) => (
                  <option key={s.IdSO} value={s.IdSO}>{s.NomSO} - {s.Licencia}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Licencia Office</label>
              <select
                value={dispositivo.IdOffice}
                onChange={(e) => setDispositivo({ ...dispositivo, IdOffice: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione licencia</option>
                {offices.map((o) => (
                  <option key={o.IdOffice} value={o.IdOffice}>{o.Licencia}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Estado</label>
              <select
                value={dispositivo.IdEstado}
                onChange={(e) => setDispositivo({ ...dispositivo, IdEstado: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione estado</option>
                {estados.map((e) => (
                  <option key={e.IdEstado} value={e.IdEstado}>{e.ValorEstado}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={dispositivo.TieneOffice}
                onChange={(e) => setDispositivo({ ...dispositivo, TieneOffice: e.target.checked })}
                className="mr-2"
              />
              <label>TieneOffice</label>
            </div>
            <div>
              <label>Hardware</label>
              <select
                value={dispositivo.IdHardware}
                onChange={(e) => setDispositivo({ ...dispositivo, IdHardware: e.target.value })}
                className="w-full block border p-3"
              >
                <option value="">Seleccione hardware</option>
                {hardwares.map((h) => (
                  <option key={h.IdHardware} value={h.IdHardware}>{h.CPU} / {h.RAM} / {h.DisDur}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Observaciones</label>
              <textarea
                value={dispositivo.Observaciones}
                onChange={(e) => setDispositivo({ ...dispositivo, Observaciones: e.target.value })}
                className="w-full block border p-3"
              ></textarea>
            </div>
            <div className="flex items-center mt-6">
              <button
                className="bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4"
              >
                Regresar
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPage;
