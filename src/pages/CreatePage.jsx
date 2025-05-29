import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";



const CreatePage = () => {

    const [CodigoDispositivo, setCodigoDispositivo] = useState("");
    const [IdDispositivo, setIdDispositivo] = useState("");
    const [IdEmpleado, setIdEmpleado] = useState("");
    const [Image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        if(CodigoDispositivo === "" || IdDispositivo === "" || IdEmpleado === "" || Image === ""){
            alert('Please fill out all input completely');
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post("http://localhost:3000/dispositivos", {CodigoDispositivo: CodigoDispositivo, IdDispositivo: IdDispositivo,IdEmpleado: IdEmpleado,Image: Image});
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
                        <input type="text" value={CodigoDispositivo} onChange={(e) => setCodigoDispositivo(e.target.value)}  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>IdDispositivo</label>
                        <input type="number" value={IdDispositivo} onChange={(e) => setIdDispositivo(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdDispositivo" />
                    </div>
                    <div>
                        <label>IdEmpleado</label>
                        <input type="number" value={IdEmpleado} onChange={(e) => setIdEmpleado(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter IdEmpleado" />
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