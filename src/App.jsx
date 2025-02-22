import React, { useState, useEffect } from "react";

const App = () => {
  const [datos, setDatos] = useState([]); // Estado para almacenar los datos
  const [nombre, setNombre] = useState(""); // Estado para el nombre
  const [raza, setRaza] = useState(""); // Estado para la raza
  const [edad, setEdad] = useState(""); // Estado para la edad

  // Función para obtener los datos de la API
  const fetchDatos = async () => {
    try {
      const response = await fetch("http://54.82.135.206:8000/ver");
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      const data = await response.json();
      setDatos(data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Función para crear un nuevo dato
  const crearDato = async () => {
    try {
      const response = await fetch("http://54.82.135.206:8000/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, raza, edad: parseInt(edad) }), // Convierte la edad a número
      });
      if (!response.ok) {
        throw new Error("Error al crear el dato");
      }
      const data = await response.json();
      console.log("Dato creado:", data.dato);

      // Agrega el nuevo dato al estado `datos`
      setDatos([...datos, data.dato]);

      // Limpia el formulario
      setNombre("");
      setRaza("");
      setEdad("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Ejecuta fetchDatos al cargar el componente
  useEffect(() => {
    fetchDatos();
  }, []);

  return (
    <div>
      <h1>Cxdft</h1>

      {/* Formulario para crear un nuevo dato */}
      <div>
        <h2>Crear nuevo dato</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Raza"
          value={raza}
          onChange={(e) => setRaza(e.target.value)}
        />
        <input
          type="number"
          placeholder="Edad"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <button onClick={crearDato}>Crear</button>
      </div>

      {/* Lista de datos */}
      <div>
        <h2>Datos almacenados</h2>
        <ul>
          {datos.map((dato, index) => (
            <li key={index}>
              {dato.nombre} - {dato.raza} - {dato.edad} años
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;