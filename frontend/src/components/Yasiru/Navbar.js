import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../../css/Yasiru/nav.css'


export default function NavBars () {





  return (
    <div >
    <Navbar bg="light" data-bs-theme="light" className="nav">
      <Container>
      <Nav.Link href="/Dash">Dashbord</Nav.Link>
        <Nav className="me-auto">
          <Nav.Link href="/EmployeeDetails">Saloon Employee</Nav.Link>
          {/* <Nav.Link href="/Add">Saloon add</Nav.Link> */}
          <Nav.Link href="/profile">profile</Nav.Link>
          <Nav.Link href="/Profilloging">Profile_loging</Nav.Link>
          <Nav.Link href="/Attendacecount">Attendance</Nav.Link>
         
        

        </Nav>
      </Container>
    </Navbar>
    </div>

  )
}