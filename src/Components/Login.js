import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:8080/login', {
      email: username,
      password: password
    })

    .then(response => {

      console.log(response.data)

      if(Number.isInteger(response.data.id)){
        sessionStorage.setItem('user', response.data.id);
        window.location.href = '/dashboard';
      }else{
        sessionStorage.removeItem('user');
        console.error('Usuario o contraseña incorrectos:');
        setShowAlert(true);
      }
      //const token = response.data.token;
      //console.log(token)
      // Guardar el token en el localStorage
      //localStorage.setItem('token', token);
      // Redireccionar a la página de dashboard

      //
    })
    .catch(error => {
      sessionStorage.removeItem('user');
      console.error('Error al iniciar sesión:', error);
      setShowAlert(true);
    });
  };

  return (
    <div  className="container ">
    {showAlert && (
        <div className="alert alert-danger" role="alert">
          Email o contraseña incorrecta. Por favor, inténtalo de nuevo.
        </div>
    )}
    <br />
    <div  className="card col-md-8">
      <h2 className="text-center">Login</h2>
      <form className="px-4 py-3" onSubmit={handleSubmit}>
      <div className="form-group">
      <input
      className="form-control"
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        name="username" // Asegúrate de tener esto en tu campo de nombre de usuario
        required/>
    <br />
      </div>
      <div className="form-group">
      <input
        className="form-control"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password" // Asegúrate de tener esto en tu campo de contraseña
        required
      />
      <br />
      </div>
        
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
        
        <a href="register" className="btn btn-secondary">Registrar Usuario</a>
      
      </form>

     

    </div>
    </div>
  );





}

export default Login;
