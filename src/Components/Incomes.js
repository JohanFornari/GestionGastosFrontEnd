import React, { useState, useEffect } from 'react';
import { Button, Table,  Form } from 'react-bootstrap';
import axios from 'axios';

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [valor, setValue] = useState('');
  const [fecha, setDate] = useState('');
  const [esMensual, setIsMonthly] = useState(false);
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
      const response = await axios.get('http://localhost:8080/ingreso/'+userId);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const fetchIncomeTypes = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tipo_ingreso');
      setIncomeTypes(response.data);
    } catch (error) {
      console.error('Error fetching income types:', error);
    }
  };

  const handleAddIncome = async () => {

    const userId = sessionStorage.getItem('user');
    try {
      const newIncome = {
        usuario:{id : userId},
        valor,
        fecha,
        esMensual,
        tipoIngreso:{idTipoIngreso:incomeType},
        descripcion
      };
      await axios.post('http://localhost:8080/ingreso', newIncome);
      // Refresh the list of incomes after adding a new one
      fetchIncomes();
      // Reset the form fields after successful addition
      setValue('');
      setDate('');
      setIsMonthly(false);
      setIncomeType('');
      setDescription('');
    } catch (error) {
      console.error('Error adding income:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Ingresos</h1>
      
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
          <Form.Check 
            type="checkbox" 
            label="Es mensual"
            checked={esMensual}
            onChange={(e) => setIsMonthly(e.target.checked)} 
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
              <option key={type.idTipoIngreso} value={type.idTipoIngreso}>{type.nombreTipoIngreso}</option>
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

      <hr/>
      {  
    <table className="table">
      <thead className="table-dark">
        <tr>
          <th>Valor</th>
          <th>Fecha</th>
          <th>Mensual</th>
          <th>Tipo de Ingreso</th>
          <th>Descripción</th>
        </tr>
      </thead>
      <tbody>
        {incomes.map((income, index) => (
          <tr key={index}>
            <td>{income.valor}</td>
            <td>{income.fecha}</td>
            <td>{income.esMensual ? 'Sí' : 'No'}</td>
            <td>{income.tipoIngreso.nombreTipoIngreso}</td>
            <td>{income.descripcion}</td>
          </tr>
        ))}
      </tbody>
    </table>}
    </div>
  );
};

export default Incomes;
