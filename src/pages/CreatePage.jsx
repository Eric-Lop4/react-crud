import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatePage = () => {
    const [CodigoDispositivo, setCodigoDispositivo] = useState("");
    const [IdDispositivo, setIdDispositivo] = useState("");
    const [Importe, setImporte] = useState("");
    const [FechaCompra, setFechaCompra] = useState("");
    const [IdUbicacion, setIdUbicacion] = useState("");
    const [IdTipoDisp, setIdTipoDisp] = useState("");
    const [IdSO, setIdSO] = useState("");
    const [IdOffice, setIdOffice] = useState("");
    const [IdEstado, setIdEstado] = useState("");
    const [TieneOffice, setTieneOffice] = useState(false);
    const [IdHardware, setIdHardware] = useState("");
    const [IdEmpleado, setIdEmpleado] = useState("");
    const [Observaciones, setObservaciones] = useState("");
    const [Image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        if(IdDispositivo === ""){
            alert('Please fill out the required fields');
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/dispositivos", {
                CodigoDispositivo: CodigoDispositivo,
                IdDispositivo: IdDispositivo,
                Importe: Importe,
                FechaCompra: FechaCompra,
                IdUbicacion: IdUbicacion,
                IdTipoDisp: IdTipoDisp,
                IdSO: IdSO,
                IdOffice: IdOffice,
                IdEstado: IdEstado,
                TieneOffice: TieneOffice,
                IdHardware: IdHardware,
                IdEmpleado: IdEmpleado,
                Observaciones: Observaciones,
                Image: Image
            });
            toast.success(`Save ${response.data.name} sucessfully`);
            setIsLoading(false);
            navigate("/");
        }catch (error){
            toast.error(error.message);
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2x1 mb-4 block text-center">
                Create a Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label>CodigoDispositivo</label>
                        <input type="text" value={CodigoDispositivo} onChange={(e) => setCodigoDispositivo(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter CodigoDispositivo" />
                    </div>
                    <div>
                        <label>IdDispositivo*</label>
                        <input type="number" value={IdDispositivo} onChange={(e) => setIdDispositivo(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdDispositivo" required />
                    </div>
                    <div>
                        <label>Importe</label>
                        <input type="number" step="0.01" value={Importe} onChange={(e) => setImporte(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Importe" />
                    </div>
                    <div>
                        <label>FechaCompra</label>
                        <input type="date" value={FechaCompra} onChange={(e) => setFechaCompra(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" />
                    </div>
                    <div>
                        <label>IdUbicacion</label>
                        <input type="number" value={IdUbicacion} onChange={(e) => setIdUbicacion(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdUbicacion" />
                    </div>
                    <div>
                        <label>IdTipoDisp</label>
                        <input type="number" value={IdTipoDisp} onChange={(e) => setIdTipoDisp(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdTipoDisp" />
                    </div>
                    <div>
                        <label>IdSO</label>
                        <input type="number" value={IdSO} onChange={(e) => setIdSO(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdSO" />
                    </div>
                    <div>
                        <label>IdOffice</label>
                        <input type="number" value={IdOffice} onChange={(e) => setIdOffice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdOffice" />
                    </div>
                    <div>
                        <label>IdEstado</label>
                        <input type="number" value={IdEstado} onChange={(e) => setIdEstado(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdEstado" />
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" checked={TieneOffice} onChange={(e) => setTieneOffice(e.target.checked)} className="mr-2" />
                        <label>TieneOffice</label>
                    </div>
                    <div>
                        <label>IdHardware</label>
                        <input type="number" value={IdHardware} onChange={(e) => setIdHardware(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdHardware" />
                    </div>
                    <div>
                        <label>IdEmpleado</label>
                        <input type="number" value={IdEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdEmpleado" />
                    </div>
                    <div>
                        <label>Observaciones</label>
                        <textarea value={Observaciones} onChange={(e) => setObservaciones(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Observaciones"></textarea>
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={Image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                    </div>
                    <div>
                        { !isLoading && (<button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Save</button>)} 
                    </div>
                </div>
            </form>
        </div>  
    )
}

export default CreatePage;