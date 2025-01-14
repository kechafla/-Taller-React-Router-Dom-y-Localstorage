import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./componentes/NavBar";
import Home from "./componentes/Home";
import Contact from "./componentes/Contact";
import GestionUsuarios from "./componentes/GestionUsuarios";
import Departamentos from "./componentes/Departamentos";
import Empleados from "./componentes/Empleados";
import "./App.css";

interface Departamento {
  id: number;
  nombre: string;
}

interface Empleado {
  id: number;
  nombre: string;
  idDepartamento: number;
}

const App: React.FC = () => {
  const [departamentos, setDepartamentos] = useState<Departamento[]>([]);
  const [empleados, setEmpleados] = useState<Empleado[]>([]);

  // Leer los datos del localStorage al cargar la aplicación
  useEffect(() => {
    const storedDepartamentos = localStorage.getItem("departamentos");
    const storedEmpleados = localStorage.getItem("empleados");

    if (storedDepartamentos) {
      setDepartamentos(JSON.parse(storedDepartamentos));
    }

    if (storedEmpleados) {
      setEmpleados(JSON.parse(storedEmpleados));
    }
  }, []);

  // Guardar los departamentos en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("departamentos", JSON.stringify(departamentos));
  }, [departamentos]);

  // Guardar los empleados en el localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem("empleados", JSON.stringify(empleados));
  }, [empleados]);

  return (
    <Router>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/usuarios" element={<GestionUsuarios />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/departamentos"
            element={
              <Departamentos
                departamentos={departamentos}
                empleados={empleados}
                setDepartamentos={setDepartamentos}
              />
            }
          />
          <Route
            path="/empleados"
            element={
              <Empleados
                departamentos={departamentos}
                empleados={empleados}
                setEmpleados={setEmpleados}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
