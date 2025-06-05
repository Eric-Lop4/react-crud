import { Link } from "react-router-dom";
import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Dispositivo = ({ dispositivo, getProducts }) => {
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
        getProducts();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden">
      <div className="px-4 pt-2 pb-4">
        <h2 className="text font-semibold">{dispositivo.CodigoDispositivo}</h2>
        <div className="text-sm">Importe: {dispositivo.Importe}</div>
        <div className="text-sm">FechaCompra: {dispositivo.FechaCompra}</div>
        <div className="text-sm">IdUbicacion: {dispositivo.IdUbicacion}</div>
        <div className="text-sm">IdTipoDisp: {dispositivo.IdTipoDisp}</div>
        <div className="text-sm">IdSO: {dispositivo.IdSO}</div>
        <div className="text-sm">IdOffice: {dispositivo.IdOffice}</div>
        <div className="text-sm">IdEstado: {dispositivo.IdEstado}</div>
        <div className="text-sm">TieneOffice: {dispositivo.TieneOffice ? "Yes" : "No"}</div>
        <div className="text-sm">IdHardware: {dispositivo.IdHardware}</div>
        <div className="text-sm">Observaciones: {dispositivo.Observaciones}</div>

        <div className="mt-2 flex gap-4">
          <Link
            to={`/edit/${dispositivo.IdDispositivo}`}
            className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteProduct(dispositivo.IdDispositivo)}
            className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dispositivo;
