import React, { useEffect, useState } from "react";
import axios from "axios";

const SelectEmpleado = ({ value, onChange, disabled = false }) => {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const res = await axios.get("http://localhost:3000/Empleados");
        setEmpleados(res.data);
      } catch (error) {
        console.error("Error cargando empleados:", error);
      }
    };
    fetchEmpleados();
  }, []);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full p-2 border rounded"
    >
      <option value="">Seleccione un empleado</option>
      {empleados.map((emp) => (
        <option key={emp.IdEmpleado} value={emp.IdEmpleado}>
          {emp.Nom} - {emp.Departamento}
        </option>
      ))}
    </select>
  );
};

export default SelectEmpleado;
