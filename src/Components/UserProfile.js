import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../config';


const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');

  useEffect(() => {
    
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem('user');
        const response = await axios.get(API_URL + '/usuario/' + userId);
        console.log(response.data);
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = () => {
    setShowUpdateForm(true);
    // Si userData está definido, establecer los valores iniciales de los campos de entrada
    if (userData) {
      setUpdatedAddress(userData.direccion);
      setUpdatedPhone(userData.telefono);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userId = sessionStorage.getItem('user');
      // Envía la solicitud de actualización al servidor
      const response = await axios.put(API_URL + '/usuario/' + userId, {
        direccion: updatedAddress,
        telefono: updatedPhone
      });
      setUserData(response.data);

      // Actualiza los datos del usuario localmente después de la actualización exitosa
      setUserData(response.data);

      // Oculta el formulario de actualización después de la actualización exitosa
      setShowUpdateForm(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!userData) {
    return <p>No se encontraron datos del usuario</p>;
  }

  return (
    <div className="container mt-5">
      <div className="card w-75 mx-auto p-4">
        <div className='card-body'>
          <h1 className="text-center mb-4">Perfil de Usuario</h1>
          <hr />
          <div className="row mb-3">
            <div className='col'>
              <p><strong>Nombre:</strong> {userData.nombre}</p>
              <p><strong>Apellido:</strong> {userData.apellido}</p>
              <p><strong>Email:</strong> {userData.email}</p>
            </div>
            <div className='col'>
              <p><strong>Dirección:</strong> {userData.direccion}</p>
              <p><strong>Teléfono:</strong> {userData.telefono}</p>
            </div>
          </div>
          {showUpdateForm ? (
            <div className="mb-3">
              <div className="row mb-3">
                <div className='col'>
                  <label className='form-label'>Dirección</label>
                  <input
                    type='text'
                    placeholder='Ingrese la nueva dirección'
                    value={updatedAddress}
                    onChange={(e) => setUpdatedAddress(e.target.value)}
                    className='form-control'
                  />
                </div>
                <div className='col'>
                  <label className='form-label'>Teléfono</label>
                  <input
                    type='text'
                    placeholder='Ingrese el nuevo teléfono'
                    value={updatedPhone}
                    onChange={(e) => setUpdatedPhone(e.target.value)}
                    className='form-control'
                  />
                </div>
              </div>
              <div >
                <button className='btn btn-secondary d-block mx-auto' onClick={handleSubmit}>
                  Guardar
                </button>
              </div>
            </div>
          ) : (
            <button className='btn btn-outline-primary d-block mx-auto' onClick={handleUpdateProfile}>
              Actualizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
