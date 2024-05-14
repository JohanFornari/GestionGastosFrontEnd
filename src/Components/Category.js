import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { API_URL } from '../config';

const Category = () => {
  const [categories, setCategories] = useState([]);
  
  const [newCategory, setNewCategory] = useState({
    nombCategoria: '',
    descripcion: ''
  });
 
  const loadCategories = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      console.log(userId);
      const response = await axios.get(API_URL + '/categoria/'+userId);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = sessionStorage.getItem('user');
      newCategory.idUsuario = userId;

      await axios.post(API_URL + '/categoria/' + userId, newCategory);
      console.log(newCategory);
      loadCategories();
      setNewCategory({
        nombCategoria: '',
        descripcion: ''
      });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className="container mt-4">
    <h1 className="mb-4 text-center">Categorías</h1>
    <div className="card w-75 mx-auto p-4">
    <div className='card-body'> 
      <h3 className="mb-4">Crear Categoría</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre de la categoría:</Form.Label>
          <Form.Control
            type="text"
            name="nombCategoria"
            value={newCategory.nombCategoria}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="descripcion"
            value={newCategory.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar Categoría
        </Button>
      </Form>
      </div>
    </div>
    
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>Nombre de la Categoría</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(category => (
            <tr key={category.idCategoria}>
              <td>{category.nombCategoria}</td>
              <td>{category.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};


export default Category;
