import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';
import { API_URL } from '../config';

const Subcategory = () => {
  
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newSubcategory, setNewSubcategory] = useState({
    nombSubcategoria: '',
    descripcion: '',
  });

  const loadSubcategories = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      console.log(userId);
      const response = await axios.get(API_URL + '/usuario/listarsubcategorias/'+userId);
      setSubcategories(response.data);
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + '/categoria/' + userId);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewSubcategory({ ...newSubcategory, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = sessionStorage.getItem('user');
      console.log(newSubcategory);
      await axios.post(API_URL + '/subcategoria/asociarsubcategoria',  newSubcategory, 
      {
        params: {
          idUsuario: userId,
          idCategoria: newSubcategory.idCategoria
        }
      });
      loadSubcategories();
      setNewSubcategory({
        nombSubcategoria: '',
        descripcion: ''
      });
    } catch (error) {
      console.error('Error creating subcategory:', error);
    }
  };

  useEffect(() => {
    loadCategories();
    loadSubcategories();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Subcategorías</h1>

      <div className="card w-75 mx-auto p-4">
        <div className='card-body'>
          <h3 className="mb-4">Crear SubCategoría</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre de la subcategoría:</Form.Label>
              <Form.Control
                type="text"
                name="nombSubcategoria"
                value={newSubcategory.nombSubcategoria}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion"
                value={newSubcategory.descripcion}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría:</Form.Label>
              <Form.Select
                name="idCategoria"
                value={newSubcategory.idCategoria}
                onChange={handleInputChange}
              >
                <option value="">Selecciona una categoría</option>
                {categories.map(category => (
                  <option key={category.idCategoria} value={category.idCategoria}>{category.nombCategoria}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Agregar Subcategoría
            </Button>
          </Form>
        </div>
      </div>
      <Table striped bordered hover className="mt-4">
        <thead className="table-dark">
          <tr>
            <th>Nombre de la Subcategoría</th>
            <th>Descripción</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map(subcategory => (
            <tr key={subcategory.idSubcategoria}>
              <td>{subcategory.nombSubcategoria}</td>
              <td>{subcategory.descripcion}</td>
              <td>{subcategory.categoria.nombCategoria}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Subcategory;
