import React, { useState } from "react";
import "./Departamentos.css";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

interface PropsDepartamento {
  departamentos: Departamento[];
  empleados: Empleado[];
  setDepartamentos: React.Dispatch<React.SetStateAction<Departamento[]>>;
}

const Departamentos: React.FC<PropsDepartamento> = ({
  departamentos,
  empleados,
  setDepartamentos,
}) => {
  const [nombre, setNombre] = useState<string>("");
  const [departamentoEditando, setDepartamentoEditando] = useState<number | null>(null);

  const manejarAgregarOEditar = () => {
    if (nombre.trim()) {
      if (departamentoEditando !== null) {
        setDepartamentos(
          departamentos.map((dep) =>
            dep.id === departamentoEditando ? { ...dep, nombre } : dep
          )
        );
        setDepartamentoEditando(null);
      } else {
        setDepartamentos([...departamentos, { id: departamentos.length + 1, nombre }]);
      }
      setNombre("");
    } else {
      alert("El nombre es obligatorio");
    }
  };

  const eliminarDepartamento = (id: number) => {
    const tieneEmpleados = empleados.some((emp) => emp.idDepartamento === id);
    if (tieneEmpleados) {
      alert("No se puede eliminar un departamento con empleados asociados.");
    } else {
      setDepartamentos(departamentos.filter((dep) => dep.id !== id));
    }
  };

  const actualizarDepartamento = (id: number) => {
    const departamento = departamentos.find((dep) => dep.id === id);
    if (departamento) {
      setNombre(departamento.nombre);
      setDepartamentoEditando(departamento.id);
    }
  };

  return (
    <div>
      <h1>Gestión de Departamentos</h1>
      <form>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre del departamento"
        />
        <button type="button" onClick={manejarAgregarOEditar}>
          {departamentoEditando ? "Actualizar" : "Agregar"}
        </button>
      </form>
      <h2>Lista de Departamentos</h2>
      <ul>
        {departamentos.map((dep) => (
          <li key={dep.id}>
            [ID: {dep.id}] {dep.nombre}
            <button onClick={() => actualizarDepartamento(dep.id)}>Actualizar</button>
            <button onClick={() => eliminarDepartamento(dep.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Departamentos;