import React from 'react';

function Menu({ onMenuClick }) {

  return (

    <div>
      <div className="form-label">
        <div className="btn-group">
          <button className="btn btn-outline-primary" onClick={() => onMenuClick('ingreso')}>Ingresos</button>
          <button className="btn btn-outline-success" onClick={() => onMenuClick('ListarIngresos')}>Ver Ingreso</button>
          <button className="btn btn-outline-primary" onClick={() => onMenuClick('crearUsuario')}>Crear Usuario</button>
          <button className="btn btn-outline-dark" onClick={() => onMenuClick('cerrar')}>Cerrar Sesion</button>
        </div>
      </div>

    </div> 
  );
}

export default Menu;