import React, { useState } from "react";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

interface PropsEmpleados {
  departamentos: Departamento[];
  empleados: Empleado[];
  setEmpleados: React.Dispatch<React.SetStateAction<Empleado[]>>;
}

const Empleados: React.FC<PropsEmpleados> = ({
  departamentos,
  empleados,
  setEmpleados,
}) => {
  const [nombreEmpleado, setNombreEmpleado] = useState<string>("");
  const [idDepartamentoSeleccionado, setIdDepartamentoSeleccionado] = useState<number>(0);

  const agregarEmpleado = () => {
    if (nombreEmpleado.trim() && idDepartamentoSeleccionado) {
      setEmpleados([
        ...empleados,
        {
          id: empleados.length + 1,
          nombre: nombreEmpleado,
          idDepartamento: idDepartamentoSeleccionado,
        },
      ]);
      setNombreEmpleado("");
      setIdDepartamentoSeleccionado(0);
    }
  };

  return (
    <div>
      <h1>Empleados</h1>
      <input
        type="text"
        value={nombreEmpleado}
        onChange={(e) => setNombreEmpleado(e.target.value)}
        placeholder="Nombre del empleado"
      />
      <select
        value={idDepartamentoSeleccionado}
        onChange={(e) => setIdDepartamentoSeleccionado(Number(e.target.value))}
      >
        <option value={0}>Seleccionar Departamento</option>
        {departamentos.map((dep) => (
          <option key={dep.id} value={dep.id}>
            {dep.nombre}
          </option>
        ))}
      </select>
      <button onClick={agregarEmpleado}>Agregar Empleado</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Departamento</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.nombre}</td>
              <td>{departamentos.find((dep) => dep.id === emp.idDepartamento)?.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Empleados;
