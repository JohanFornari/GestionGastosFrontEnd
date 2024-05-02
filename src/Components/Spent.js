import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Form, Button } from 'react-bootstrap';

const Spent = () => {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [newExpense, setNewExpense] = useState({
        fecha: '',
        monto: '',
        descripcion: '',
        idSubcategoria: '',
        idCategoria: '',
        idUsuario:''
    });

    const loadExpenses = async () => {

        try {
            const userId = sessionStorage.getItem('user');
            const response = await axios.get('http://localhost:8080/usuario/listargastos/'+userId);
            console.log(response.data);
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const loadCategories = async () => {
        try {
            const userId = sessionStorage.getItem('user');
            console.log(userId);
            const response = await axios.get('http://localhost:8080/categoria/'+userId);
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const loadSubcategoriesByCategory = async (categoryId) => {
        try {
            const userId = sessionStorage.getItem('user');
           // const response = await axios.get(`/subcategoria?categoriaId=${categoryId}`);
            const response = await axios.get('http://localhost:8080/usuario/listarsubcategorias/'+ userId);
            setSubcategories(response.data);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewExpense({ ...newExpense, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userId = sessionStorage.getItem('user');
            newExpense.idUsuario = userId;
            console.log(newExpense);
            await axios.post('http://localhost:8080/gasto', newExpense);
            loadExpenses();
            setNewExpense({
                fecha: '',
                monto: '',
                descripcion: '',
                idSubcategoria: ''
            });
        } catch (error) {
            console.error('Error creating expense:', error);
        }
    };

    useEffect(() => {
        loadExpenses();
        loadCategories();
    }, []);

    return (
        <div className="container mt-4">

            <h1 className="mb-4 text-center">Gastos</h1>
            <div className="card w-75 mx-auto p-4">
                <div className='card-body'>
                    <h3 className="mb-4">Crear Gasto</h3>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Fecha:</Form.Label>
                            <Form.Control
                                type="date"
                                name="fecha"
                                value={newExpense.fecha}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Valor:</Form.Label>
                            <Form.Control
                                type="number"
                                name="monto"
                                value={newExpense.monto}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Descripción:</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="descripcion"
                                value={newExpense.descripcion}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Categoría:</Form.Label>
                            <Form.Select
                                name="idCategoria"
                                value={newExpense.idCategoria}
                                onChange={(e) => {
                                    const categoryId = e.target.value;
                                    setNewExpense({ ...newExpense, idCategoria: categoryId });
                                    loadSubcategoriesByCategory(categoryId);
                                }}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map(category => (
                                    <option key={category.idCategoria} value={category.idCategoria}>{category.nombCategoria}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Subcategoría:</Form.Label>
                            <Form.Select
                                name="idSubcategoria"
                                value={newExpense.idSubcategoria}
                                onChange={handleInputChange}
                            >
                                <option value="">Selecciona una subcategoría</option>
                                {subcategories.map(subcategory => (
                                    <option key={subcategory.idSubcategoria} value={subcategory.idSubcategoria}>{subcategory.nombSubcategoria}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Agregar Gasto
                        </Button>
                    </Form>
                </div>
            </div>
            <Table striped bordered hover className="mt-4">
                <thead className='table-dark'>
                    <tr>
                        <th>Fecha</th>
                        <th>Valor</th>
                        <th>Descripción</th>
                        <th>Categoría</th>
                        <th>Subcategoría</th>
                    </tr>
                </thead>
                <tbody>
                    {expenses.map(expense => (
                        <tr key={expense.idSubcategoria}>
                            <td>{expense.fecha.substr(0,10)}</td>
                            <td>{expense.monto}</td>
                            <td>{expense.descripcion}</td>
                            <td>{expense.categoria.nombCategoria}</td>
                            <td>{expense.subcategoria.nombSubcategoria}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default Spent;
