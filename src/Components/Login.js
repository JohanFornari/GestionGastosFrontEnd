import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(API_URL + '/login', {
      email: username,
      clave: password
    })
    .then(response => {
      if (response.data.idUsuario) {
        sessionStorage.setItem('user', response.data.idUsuario);
        navigate('/dashboard');
      } else {
        sessionStorage.removeItem('user');
        setShowAlert(true);
      }
    })
    .catch(error => {
      sessionStorage.removeItem('user');
      setShowAlert(true);
    });
  };

  return (
    <div className="container">
      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Email o contraseña incorrecta. Por favor, inténtalo de nuevo.
        </div>
      )}
      <br />
      <div className="d-flex justify-content-center">
        <div className="card col-md-8">
          <h2 className="text-center">Login</h2>
          <form className="px-4 py-3" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="Ingrese email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username" 
                required
              />
              <br />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="Ingrese contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                required
              />
              <br />
            </div>
  
            <div className="btn-group">
              <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
              <a href="register" className="btn btn-secondary">Registrar Usuario</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
