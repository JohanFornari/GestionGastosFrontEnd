import React, { useState } from 'react';
import UserProfile from './UserProfile';
import Incomes from './Incomes';
import Category from './Category';
import SubCategory from './SubCategory';
import Spent from './Spent';
import Report from './Report';

function Sidebar() {
  const [activePanel, setActivePanel] = useState('usuario');

  const handlePanelChange = (panelId) => {
    setActivePanel(panelId);
  };

  return (
    <div className="d-flex">
      <div className="sidebar bg-light p-4 d-flex justify-content-between flex-column">
        <div>
          <h5 className="sidebar-heading mb-4">Dashboard</h5>
          <hr />
          <ul className="nav flex-column mb-2">
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'usuario' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('usuario')}>
                <i className="bi bi-person-lines-fill"></i> Datos del Usuario
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'ingresos' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('ingresos')}>
                <i className="bi-cash-coin"></i> Ingresos
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'categorias' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('categorias')}>
                <i className="bi bi-clipboard"></i> Categorías
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'subcategorias' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('subcategorias')}>
                <i className="bi bi-journals"></i> Subcategorías
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'gastos' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('gastos')}>
                <i className="bi bi-cash"></i> Gastos
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link text-black ${activePanel === 'estadisticas' ? 'active' : ''}`} href="#" onClick={() => handlePanelChange('estadisticas')}>
                <i className="bi bi-graph-up"></i> Reportes
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown open">
          <a className="text-decoration-none text-black dropdown-toggle p-3" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className='bi bi-person-circle'>
              <span className='ms-2'>Usuario</span>
            </i>
          </a>
          <div className="dropdown-menu" aria-labelledby="triggerId">
            <a className="dropdown-item" href="">Info</a>
            <a className="dropdown-item" href="/">Cerrar Sesión</a>
          </div>
        </div>

      </div>

      <div className="content col-md-9">
        {/* Contenido de la página */}
        {activePanel === 'usuario' && <UserProfile />}
        {activePanel === 'ingresos' && <Incomes />}
        {activePanel === 'categorias' && <Category />}
        {activePanel === 'subcategorias' && <SubCategory />}
        {activePanel === 'gastos' && <Spent />}
        {activePanel === 'estadisticas' && <Report />}
      </div>
    </div>
  );
}

export default Sidebar;
