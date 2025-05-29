import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Dispositivo = ({ dispositivo, getProducts }) => {  // <-- RECIBIMOS getProducts

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete this device?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/dispositivos/${id}`);
        toast.success("Device deleted successfully");
        getProducts();  // <-- LLAMAMOS A getProducts para actualizar la lista
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <img src={dispositivo.image} className="w-full h-28 object-cover" />
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{dispositivo.CodigoDispositivo}</h2>
        <div className="text-sm">IdDispositivo: {dispositivo.IdDispositivo}</div>
        <div className="text-sm">IdEmpleado: {dispositivo.IdEmpleado}</div>

        <div className="mt-2 flex gap-4">
          <Link
            to={`/edit/${dispositivo.IdDispositivo}`}
            className="inline-block w-full text-center shadow-mg text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteProduct(dispositivo.IdDispositivo)}
            className="inline-block w-full text-center shadow-mg text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dispositivo;
