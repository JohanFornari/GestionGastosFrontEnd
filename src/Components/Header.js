import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export const Header = () => {
  return (
    <div>
        <header>
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                <Navbar.Brand href="/">Gestion Gastos Personales</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">inicio</Nav.Link>
                    <Nav.Link href="register">Registrarse</Nav.Link>
                    <Nav.Link href="">Acerca de</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

        </header>

    </div>

  )
}

export default Header;