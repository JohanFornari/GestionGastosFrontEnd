import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Report = () => {
  const [informe, setInforme] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthDetails, setSelectedMonthDetails] = useState(null);

  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const userId = sessionStorage.getItem('user');
        const response = await axios.get(`http://localhost:8080/usuario/reporte/${userId}`);
        setInforme(response.data);
      } catch (error) {
        console.error('Error al obtener el informe financiero:', error);
      }
    };

    fetchInforme();
  }, []);

  const handleDetailClick = (mesAnio) => {
    setSelectedMonth(mesAnio);
    const selectedMonthData = informe.find(([mesAnioItem]) => mesAnioItem === mesAnio);
    setSelectedMonthDetails(selectedMonthData);
  };

  if (!informe) {
    return <p>Cargando informe...</p>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Informe Financiero</h1>

      <table className="table">
        <thead>
          <tr>
            <th>Mes y Año</th>
            <th>Total de Gastos</th>
            <th>Total de Ingresos</th>
            <th>Total Restante</th>
            <th>Porcentaje Gasto</th>
            <th>Detalle</th>
          </tr>
        </thead>
        <tbody>
          {informe.map(([mesAnio, totalGastos, totalIngresos, diferencia, porcentaje], index) => (
            <tr key={index}>
              <td>{mesAnio}</td>
              <td>{totalGastos}</td>
              <td>{totalIngresos}</td>
              <td>{diferencia}</td>
              <td>{porcentaje}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleDetailClick(mesAnio)}>Ver Detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedMonthDetails && (
        <div className="card w-75 mx-auto p-4 mt-4">
          <div className='card-body'>
            <h3 className="mb-4">Detalle del Mes: {selectedMonth}</h3>
            <p>Total de Gastos: {selectedMonthDetails[1]}</p>
            <p>Total de Ingresos: {selectedMonthDetails[2]}</p>
            <p>Diferencia: {selectedMonthDetails[3]}</p>
            <p>Porcentaje: {selectedMonthDetails[4]}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
