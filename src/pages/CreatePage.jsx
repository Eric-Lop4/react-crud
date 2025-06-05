import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {
  const [CodigoDispositivo, setCodigoDispositivo] = useState("");
  const [Importe, setImporte] = useState("");
  const [FechaCompra, setFechaCompra] = useState("");
  const [IdUbicacion, setIdUbicacion] = useState("");
  const [IdTipoDisp, setIdTipoDisp] = useState("");
  const [IdSO, setIdSO] = useState("");
  const [IdOffice, setIdOffice] = useState("");
  const [IdEstado, setIdEstado] = useState("");
  const [TieneOffice, setTieneOffice] = useState(false);
  const [IdHardware, setIdHardware] = useState("");
  const [Observaciones, setObservaciones] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [ubicaciones, setUbicaciones] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [sistemas, setSistemas] = useState([]);
  const [offices, setOffices] = useState([]);
  const [estados, setEstados] = useState([]);
  const [hardwares, setHardwares] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
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
        toast.error("Error cargando opciones");
      }
    };
    fetchOptions();
  }, []);

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:3000/dispositivos", {
        CodigoDispositivo,
        Importe,
        FechaCompra,
        IdUbicacion,
        IdTipoDisp,
        IdSO,
        IdOffice,
        IdEstado,
        TieneOffice,
        IdHardware,
        Observaciones,
      });
      toast.success(`Saved ${response.data.name} successfully`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
      <h2 className="font-semibold text-2xl mb-4 block text-center">Create a Product</h2>
      <form onSubmit={saveProduct}>
        <div className="space-y-2">
          <div>
            <label>CodigoDispositivo</label>
            <input type="text" value={CodigoDispositivo} onChange={(e) => setCodigoDispositivo(e.target.value)} className="w-full block border p-3" />
          </div>
          <div>
            <label>Importe</label>
            <input type="number" step="0.01" value={Importe} onChange={(e) => setImporte(e.target.value)} className="w-full block border p-3" />
          </div>
          <div>
            <label>FechaCompra</label>
            <input type="date" value={FechaCompra} onChange={(e) => setFechaCompra(e.target.value)} className="w-full block border p-3" />
          </div>
          <div>
            <label>Ubicación</label>
            <select value={IdUbicacion} onChange={(e) => setIdUbicacion(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione una ubicación</option>
              {ubicaciones.map((u) => (
                <option key={u.IdUbicacion} value={u.IdUbicacion}>{u.Departamento}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Tipo de Dispositivo</label>
            <select value={IdTipoDisp} onChange={(e) => setIdTipoDisp(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione tipo</option>
              {tipos.map((t) => (
                <option key={t.IdTipoDisp} value={t.IdTipoDisp}>{t.ValorTipo}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Sistema Operativo</label>
            <select value={IdSO} onChange={(e) => setIdSO(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione sistema</option>
              {sistemas.map((s) => (
                <option key={s.IdSO} value={s.IdSO}>{s.NomSO} - {s.Licencia}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Licencia Office</label>
            <select value={IdOffice} onChange={(e) => setIdOffice(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione licencia</option>
              {offices.map((o) => (
                <option key={o.IdOffice} value={o.IdOffice}>{o.Licencia}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Estado</label>
            <select value={IdEstado} onChange={(e) => setIdEstado(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione estado</option>
              {estados.map((e) => (
                <option key={e.IdEstado} value={e.IdEstado}>{e.ValorEstado}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked={TieneOffice} onChange={(e) => setTieneOffice(e.target.checked)} className="mr-2" />
            <label>TieneOffice</label>
          </div>
          <div>
            <label>Hardware</label>
            <select value={IdHardware} onChange={(e) => setIdHardware(e.target.value)} className="w-full block border p-3">
              <option value="">Seleccione hardware</option>
              {hardwares.map((h) => (
                <option key={h.IdHardware} value={h.IdHardware}>{h.CPU} / {h.RAM} / {h.DisDur}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Observaciones</label>
            <textarea value={Observaciones} onChange={(e) => setObservaciones(e.target.value)} className="w-full block border p-3"></textarea>
          </div>
          <div className="flex items-center mt-6">
            <button className="bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => navigate(-1)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded ml-4">
              Regresar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
