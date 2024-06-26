import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [municipios, setMunicipios] = useState([]);

  useEffect(() => {
    axios.get('https://api-colombia.com//api/v1/Department')
      .then(response => {
        const nombresMunicipios = response.data.map(municipio => municipio.name);
        setMunicipios(nombresMunicipios);
      })
      .catch(error => {
        console.error('Error al obtener la lista de municipios:', error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== rpassword) {
      setAlertMessage('Las contraseñas no coinciden');
      setShowAlert(true);
      return;
    }

    axios.post(API_URL + '/usuario', {
      nombre: nombre,
      apellido: apellido,
      municipio: municipio,
      email: email,
      clave: password,
      telefono: telefono,
      direccion: direccion,
      perfil: { idPerfil: 1 }
    })
      .then(response => {
        console.log(response.data);
        setNombre('');
        setApellido('');
        setMunicipio('');
        setEmail('');
        setPassword('');
        setRPassword('');
        setTelefono('');
        setDireccion('');
        setShowAlert(false);
        setShowSuccessModal(true);
      })
      .catch(error => {
        console.error('Error al crear el usuario:', error);
        setAlertMessage('Error al registrar usuario, el correo electronico ya esta registrado');
        setShowAlert(true);
      });
  };

  const handleSuccessOk = () => {
    setShowSuccessModal(false);
    window.location.href = '/';
  };

  return (
    <div className="container-fluid mt-4">
      <div className="card mx-auto" style={{ maxWidth: '1000px' }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Crear Usuario</h2>
          {showAlert && (
            <div className="alert alert-danger" role="alert">
              {alertMessage}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="nombre" className="form-label">Nombre:</label>
                <input
                  type="text"
                  id="nombre"
                  className="form-control"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ingresar nombre"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="apellido" className="form-label">Apellido:</label>
                <input
                  type="text"
                  id="apellido"
                  className="form-control"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  placeholder="Ingresar apellido"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresar email"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresar password"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="rpassword" className="form-label">Repetir Password:</label>
                <input
                  type="password"
                  id="rpassword"
                  className="form-control"
                  value={rpassword}
                  onChange={(e) => setRPassword(e.target.value)}
                  placeholder="Repetir password"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="telefono" className="form-label">Telefono:</label>
                <input
                  type="number"
                  id="telefono"
                  className="form-control"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ingresar teléfono"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="direccion" className="form-label">Dirección:</label>
                <input
                  type="text"
                  id="direccion"
                  className="form-control"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  placeholder="Ingresar dirección"
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="municipio" className="form-label">Municipio:</label>
                <select
                  className="form-select"
                  id="municipio"
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                >
                  <option value="">Selecciona un Municipio</option>
                  {municipios.map((nombreMunicipio, index) => (
                    <option key={index} value={nombreMunicipio}>
                      {nombreMunicipio}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button className="btn btn-primary d-block mx-auto" type="submit">Registrar Usuario</button>
            </div>
          </form>
        </div>
      </div>

      <Modal show={showSuccessModal} onHide={handleSuccessOk} centered>
        <Modal.Header>
          <Modal.Title>Registro Exitoso</Modal.Title>
        </Modal.Header>
        <Modal.Body>Usuario registrado correctamente</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSuccessOk}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Register;
