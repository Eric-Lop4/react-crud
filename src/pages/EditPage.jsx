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
        IdEmpleado: "",
        Image: "",
    });

    const getDispositivo = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/dispositivos/${id}`);
            setDispositivo({
                CodigoDispositivo: response.data.CodigoDispositivo,
                IdDispositivo: response.data.IdDispositivo,
                IdEmpleado: response.data.IdEmpleado,
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
