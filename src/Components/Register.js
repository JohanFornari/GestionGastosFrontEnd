import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [pais, setPais] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [paises, setPaises] = useState([]);

  useEffect(() => {
    // Aquí se realiza la solicitud a la API de países
    axios.get('https://restcountries.com/v3.1/independent?status=true')
      .then(response => {
        const nombresPaises = response.data.map(pais => pais.name.common);
        setPaises(nombresPaises);
      })
      .catch(error => {
        console.error('Error al obtener la lista de países:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Obtener el token de localStorage si está disponible
    const token = localStorage.getItem('token');
    console.log('token react: ' + token)
    if (!token) {
      // Si el usuario no está autenticado, redirigir a la página de inicio de sesión
      //window.location.href = '#/'; // Cambia la URL según tu configuración
      return;
    }
    const config = {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    axios.post('http://localhost:8080/usuario', {
      nombre: nombre,
      apellido: apellido,
      pais: pais,
      email: email,
      password: password,
      telefono: telefono,
      direccion: direccion,
      role: {id_role : 1}

    }, config
    )
      .then(response => {
        console.log(response.data);
        // Limpia los campos después de crear el riesgo
        setNombre('');
        setApellido('');
        setPais('');
        setEmail('');
        setPassword('');
        setRPassword('');
        setTelefono('');
        setDireccion('');


      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        < div className="mb-3">
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="apellido" className="form-label" >Apellido:</label>
          <input
            type="text"
            id="apellido"
            className="form-control"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label" >Email:</label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="form-label" >Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <div>
            <label htmlFor="rpassword" className="form-label" >Repetir Password:</label>
            <input
              type="password"
              id="rpassword"
              className="form-control"
              value={rpassword}
              onChange={(e) => setRPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="telefono" className="form-label" >Telefono:</label>
            <input
              type="number"
              id="telefono"
              className="form-control"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="direccion" className="form-label" >Dirección:</label>
            <input
              type="text"
              id="direccion"
              className="form-control"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pais" className="form-label">País:</label>
            <select className="form-select"
              id="pais"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            >
              <option value="">Selecciona un país</option>
              {paises.map((nombrePais, index) => (
                <option key={index} value={nombrePais}>
                  {nombrePais}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
}

export default Register;
