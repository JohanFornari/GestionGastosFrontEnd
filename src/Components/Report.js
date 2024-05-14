import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { API_URL } from '../config';

const Report = () => {
  const [informe, setInforme] = useState(null);
  const [informeTotal, setInformeTotal] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [userData, setUserData] = useState(null);
  const [mes, setMes] = useState(null);

  const loadExpenses = async (mes, ano) => {

    try {

      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + '/usuario/listargastos/' + userId + '/mes/' + ano + '/' + mes);
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const LoadIncomes = async (mes, ano) => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + '/usuario/ingresos/' + userId + '/mes/' + ano + '/' + mes);
      setIncomes(response.data);
    } catch (error) {
      console.error('Error fetching incomes:', error);
    }
  };

  const formatDate = (dateString) => {
    const [month, year] = dateString.split('-');
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const monthIndex = parseInt(month) - 1;
    const formattedDate = `${monthNames[monthIndex]} ${year}`;
    return formattedDate;
  };
  const fetchInforme = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + `/usuario/reporte/${userId}`);
      setInforme(response.data);
    } catch (error) {
      console.error('Error al obtener el informe financiero:', error);
    }
  };

  const fetchInformeTotal = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + `/usuario/reporte/total/${userId}`);
      setInformeTotal(response.data[0]);
    } catch (error) {
      console.error('Error al obtener el informe financiero:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const userId = sessionStorage.getItem('user');
      const response = await axios.get(API_URL + '/usuario/' + userId);
      console.log(response.data);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchInforme();
    fetchInformeTotal();
  }, []);

  const handleDetailClick = (mesAnio) => {
    setSelectedMonth(mesAnio);
    setMes(mesAnio);
    const selectedMonthData = informe.find(([mesAnioItem]) => mesAnioItem === mesAnio);
    loadExpenses(mesAnio.split('-')[0], mesAnio.split('-')[1]);
    LoadIncomes(mesAnio.split('-')[0], mesAnio.split('-')[1]);
    setSelectedMonthDetails(selectedMonthData);
  };

  const generatePDF = () => {
    const input = document.getElementById('div-to-print');
  
    html2canvas(input, { scale: 2 }) 
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/jpeg', 1.0); 
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
        pdf.save('reporte.pdf');
      });
  };

  if (!informe) {
    return <p>Cargando informe...</p>;
  }

  return (
    <div id = 'div-to-print'>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Reporte Financiero</h2>
      <hr />
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className='card-body'>
              <div className="row mb-3">
                <div className='col'>
                  <p><strong>Nombre:</strong> {userData && userData.nombre + ' ' + userData.apellido}</p>
                  <p><strong>Email:</strong> {userData && userData.email}</p>
                </div>
                <div className='col'>
                  <p><strong>Dirección:</strong> {userData && userData.direccion}</p>
                  <p><strong>Teléfono:</strong> {userData && userData.telefono}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-7">
          <div className="card">
            <div className='card-body'>
              <div className="row mb-3">
                <div className='col'>
                  <p><strong>Total Ingresos:</strong> {informeTotal && informeTotal[1].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                  <p><strong>Total Gastos:</strong> {informeTotal && informeTotal[0].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                </div>
                <div className='col'>
                  <p><strong>Total Restante:</strong> {informeTotal && informeTotal[2].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                  <p><strong>Porcentaje Gastos:</strong> {informeTotal && Math.round(informeTotal[3]) + "%"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="row justify-content-center">

        <table className="table">
          <thead >
            <tr>
              <th>Mes-Año</th>
              <th>Total de Gastos</th>
              <th>Total de Ingresos</th>
              <th>Total Restante</th>
              <th>Porcentaje Gasto</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {informe && informe.map(([mesAnio, totalGastos, totalIngresos, diferencia, porcentaje], index) => (
              <tr key={index}>
                <td>{formatDate(mesAnio)}</td>
                <td>{totalGastos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{totalIngresos.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{diferencia.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                <td>{Math.round(porcentaje) + "%"}</td>
                <td>
                  <button className="btn btn-primary" onClick={() => handleDetailClick(mesAnio)}>Ver Detalle</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMonthDetails && (
        <div className="card w-100 mx-auto p-4 mt-4">
          <div className='card-body'>
            <h3 className="text-center mb-4">Reporte {formatDate(selectedMonth)}</h3>
            <div className="row mb-3">
              <div className='col'>
                <p><strong>Total Ingresos:</strong> {selectedMonthDetails[2].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <p><strong>Total Gastos:</strong> {selectedMonthDetails[1].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
              </div>
              <div className='col'>
                <p><strong>Total Restante:</strong> {selectedMonthDetails[3].toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                <p><strong>Porcentaje Gastos:</strong> {Math.round(selectedMonthDetails[4]) + "%"}</p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4">Ingresos</h3>

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
                {incomes && incomes.map((income, index) => (
                  <tr key={index}>
                    <td>{income.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                    <td>{income.fecha.substr(0, 10)}</td>
                    <td>{income.tipoIngreso.nombTipoIngreso}</td>
                    <td>{income.descripcion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div>
            <h3 className="mb-4">Gastos</h3>

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
                  <tr key={expense.idGasto}>
                    <td>{expense.fecha.substr(0, 10)}</td>
                    <td>{expense.monto.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
                    <td>{expense.descripcion}</td>
                    <td>{expense.categoria.nombCategoria}</td>
                    <td>{expense.subcategoria.nombSubcategoria}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

        <button className='btn btn-outline-primary d-block mx-auto' onClick={() => generatePDF()}>
              Generar Reporte
            </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default Report;
