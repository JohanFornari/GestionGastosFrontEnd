import React from 'react'

export const SidebarMenu = () => {
  return (
    <div className='sidebar'>
      <div className='row'>
        <div className='bg-dark col-auto col-md-2 min-vh-100 ms-3 mt-2'>
          <a className='text-decoration-none text-white d-flex aling-itemcenter'>
            <span className='ms-1 fs-4'>
              Brand
            </span>
          </a>
          <hr/>
          <ul className="nav nav-pills flex-column">
            <li className="nav-item text-white fs-4">
              <a className="nav-link text-white fs-5" aria-current="page" href="register">
                <i className="bi bi-person-lines-fill"></i>
                <span className='ms-2'>
                  Datos del Usuario
                </span>
              </a>
            </li>
            <li className="nav-item text-white fs-4">
              <a className="nav-link text-white fs-5" aria-current="page" href="#">
                <i className="bi bi-cash-coin"></i>
                <span className='ms-2'>
                  Ingresos
                </span>
              </a>
            </li>
            <li className="nav-item text-white fs-4">
              <a className="nav-link text-white fs-5" aria-current="page" href="#">
                <i className="bi bi-clipboard"></i>
                <span className='ms-2'>
                  Categorias
                </span>
              </a>
            </li>
            <li className="nav-item text-white fs-4">
              <a className="nav-link text-white fs-5" aria-current="page" href="#">
                <i className="bi bi-journals"></i>
                <span className='ms-2'>
                  SubCategorias
                </span>
              </a>
            </li>
            <li className="nav-item text-white fs-4">
              <a className="nav-link text-white fs-5" aria-current="page" href="#">
                <i className="bi bi-cash"></i>
                <span className='ms-2'>
                  Gastos
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default SidebarMenu;