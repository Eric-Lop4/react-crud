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
        CodigoDispositivo: "",
        IdDispositivo: "",
        Importe: "",
        FechaCompra: "",
        IdUbicacion: "",
        IdTipoDisp: "",
        IdSO: "",
        IdOffice: "",
        IdEstado: "",
        TieneOffice: false,
        IdHardware: "",
        IdEmpleado: "",
        Observaciones: "",
        Image: "",
    });

    const getDispositivo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/dispositivos/${id}`);
            setDispositivo({
                CodigoDispositivo: response.data.CodigoDispositivo,
                IdDispositivo: response.data.IdDispositivo,
                Importe: response.data.Importe,
                FechaCompra: response.data.FechaCompra,
                IdUbicacion: response.data.IdUbicacion,
                IdTipoDisp: response.data.IdTipoDisp,
                IdSO: response.data.IdSO,
                IdOffice: response.data.IdOffice,
                IdEstado: response.data.IdEstado,
                TieneOffice: response.data.TieneOffice,
                IdHardware: response.data.IdHardware,
                IdEmpleado: response.data.IdEmpleado,
                Observaciones: response.data.Observaciones,
                Image: response.data.Image,
            });
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    const updateDispositivo = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.put(`http://localhost:3000/dispositivos/${id}`, dispositivo);
            toast.success("Device updated successfully");
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDispositivo();
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
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter CodigoDispositivo"
                            />
                        </div>
                        <div>
                            <label>IdDispositivo</label>
                            <input
                                type="number"
                                value={dispositivo.IdDispositivo}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdDispositivo: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdDispositivo"
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
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter Importe"
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
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                            />
                        </div>
                        <div>
                            <label>IdUbicacion</label>
                            <input
                                type="number"
                                value={dispositivo.IdUbicacion}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdUbicacion: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdUbicacion"
                            />
                        </div>
                        <div>
                            <label>IdTipoDisp</label>
                            <input
                                type="number"
                                value={dispositivo.IdTipoDisp}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdTipoDisp: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdTipoDisp"
                            />
                        </div>
                        <div>
                            <label>IdSO</label>
                            <input
                                type="number"
                                value={dispositivo.IdSO}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdSO: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdSO"
                            />
                        </div>
                        <div>
                            <label>IdOffice</label>
                            <input
                                type="number"
                                value={dispositivo.IdOffice}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdOffice: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdOffice"
                            />
                        </div>
                        <div>
                            <label>IdEstado</label>
                            <input
                                type="number"
                                value={dispositivo.IdEstado}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdEstado: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdEstado"
                            />
                        </div>
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={dispositivo.TieneOffice}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, TieneOffice: e.target.checked })
                                }
                                className="mr-2"
                            />
                            <label>TieneOffice</label>
                        </div>
                        <div>
                            <label>IdHardware</label>
                            <input
                                type="number"
                                value={dispositivo.IdHardware}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdHardware: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdHardware"
                            />
                        </div>
                        <div>
                            <label>IdEmpleado</label>
                            <input
                                type="number"
                                value={dispositivo.IdEmpleado}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, IdEmpleado: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter IdEmpleado"
                            />
                        </div>
                        <div>
                            <label>Observaciones</label>
                            <textarea
                                value={dispositivo.Observaciones}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, Observaciones: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter Observaciones"
                            ></textarea>
                        </div>
                        <div>
                            <label>Image URL</label>
                            <input
                                type="text"
                                value={dispositivo.Image}
                                onChange={(e) =>
                                    setDispositivo({ ...dispositivo, Image: e.target.value })
                                }
                                className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                placeholder="Enter Image URL"
                            />
                        </div>
                        <div>
                            <button
                                className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer"
                                type="submit"
                                disabled={isLoading}
                            >
                                {isLoading ? "Updating..." : "Update"}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditPage;