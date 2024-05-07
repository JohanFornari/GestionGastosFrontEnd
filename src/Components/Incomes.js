import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [valor, setValue] = useState('');
  const [fecha, setDate] = useState('');
  const [incomeType, setIncomeType] = useState('');
  const [descripcion, setDescription] = useState('');
  const [incomeTypes, setIncomeTypes] = useState([]);

  useEffect(() => {
    fetchIncomes();
    fetchIncomeTypes();
  }, []);

  const fetchIncomes = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get('http://localhost:8080/usuario/ingresos/' + userId);
      console.log(response.data)
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchIncomeTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tipoingreso/listarTipoIngreso');
      setIncomeTypes(response.data);
    } catch (error) {
      console.error('Error fetching income types:', error);
    }
  };

  const handleAddIncome = async () => {

    const userId = sessionStorage.getItem('user');
    try {
      const newIncome = {
        idUsuario: userId ,
        valor,
        fecha,
        idTipoIngreso: incomeType,
        descripcion
      };
      console.log(newIncome)
      await axios.post('http://localhost:8080/ingreso', newIncome);
      console.log(newIncome)
      // Refresh the list of incomes after adding a new one
      fetchIncomes();
      // Reset the form fields after successful addition
      setValue('');
      setDate('');
      setIncomeType('');
      setDescription('');
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ingresos</h1>

      <div className="card w-75 mx-auto p-4">
        <div className='card-body'>
          <h3 className="mb-4">Crear Ingreso</h3>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Valor</Form.Label>
              <Form.Control
                type="number"
                value={valor}
                onChange={(e) => setValue(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Fecha</Form.Label>
              <Form.Control
                type="date"
                value={fecha}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tipo de Ingreso</Form.Label>
              <Form.Control
                as="select"
                value={incomeType}
                onChange={(e) => setIncomeType(e.target.value)}
              >
                <option value="">Seleccionar</option>
                {incomeTypes.map((type) => (
                  <option key={type.idTipoIngreso} value={type.idTipoIngreso}>{type.nombTipoIngreso}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descripcion}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" onClick={handleAddIncome}>
              Agregar Ingreso
            </Button>
          </Form>
        </div>
      </div>
      <hr />
      {
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>Valor</th>
              <th>Fecha</th>
              <th>Tipo de Ingreso</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((income, index) => (
              <tr key={index}>
                <td>{income.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{income.fecha.substr(0,10)}</td>
                <td>{income.tipoIngreso.nombTipoIngreso}</td>
                <td>{income.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>}
    </div>
  );
};

export default Incomes;
