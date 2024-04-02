import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


export default function NavBars () {





  return (
    <div>
    <Navbar bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand href="#Dash">Dashboard</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/SaloonTable">Saloon Employee</Nav.Link>
          <Nav.Link href="/Add">Saloon add</Nav.Link>
          <Nav.Link href="/profile">profile</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    </div>

  )
}