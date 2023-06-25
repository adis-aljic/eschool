import { useContext } from "react";
import AuthContex from "../../store/Auth-ctx";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import navBarPng from "../../assets/favicon.png"
import { LinkContainer } from 'react-router-bootstrap'
import NavDropdown from 'react-bootstrap/NavDropdown';

import classes from "./HeaderInformation.module.css"
const HeaderInformation = (props) => {
  const ctx = useContext(AuthContex);
  return (
    <>
        <Navbar collapseOnSelect expand="lg" sticky="top"  bg="primary"   className="bg-body-tertiary" data-bs-theme="dark">
        <Container>

    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav" className={classes.navigationMain}>
          <Navbar.Brand className={classes.eschoolBrand}> <img src={navBarPng} /> E-school</Navbar.Brand>
          <Nav>

              {props.user ? props.user.role === "student" && (
                <LinkContainer to="/student">
                  <Button onClick={ctx.navigationStudentHandler}>Home</Button>
                </LinkContainer>
              ): null}
            

            
              
              {props.user ? props.user.role === "student" && (
                <LinkContainer to="/message">
                  <Button onClick={ctx.navigationMessageHandler}>Send Message</Button>
                </LinkContainer>
              ): null}
            

            
         
            
            
              
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/home">
                  <Button onClick={ctx.navigationHomeHandler}>Home</Button>
                </LinkContainer>
              ): null}
              
              { props.user && props.user.role ==- "teacher" ? (<NavDropdown title="Admin Panel" id="basic-nav-dropdown" >) 
              <NavDropdown.Item>
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/admin">

                  <Button as="div" onClick={ctx.addClassNavHandler}>
                    Add Class
                  </Button>
                </LinkContainer>
              ): null}
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item>
            
            {props.user ? props.user.role === "teacher" && (
              <LinkContainer to="/admin">
                <Button as="div" onClick={ctx.addStudentNavHandler}>
                  Add Student
                </Button>
              </LinkContainer>
            ): null}
            </NavDropdown.Item>
            <NavDropdown.Divider />

              <NavDropdown.Item>
            
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/admin">
                  <Button as="div" onClick={ctx.RegisterClassNavHandler}>
                    Register Class
                  </Button>
                </LinkContainer>
              ): null}
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item>
            
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/admin">
                  <Button as="div" onClick={ctx.UnregisterClassNavHandler}>
                    UnRegister Class
                  </Button>
                </LinkContainer>
              ): null}
              </NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item>
            
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/admin">
                  <Button as="div" onClick={ctx.AddNewsNavHandler}>
                    Add News
                  </Button>
                </LinkContainer>
              ): null}
              </NavDropdown.Item>
       
                 </NavDropdown>) : null }
            
            
              {props.user ? props.user.role === "teacher" && (
                <LinkContainer to="/curriculum">
                  <Button onClick={ctx.navigationCuricculumHandler}>
                    Curicculum
                  </Button>
                </LinkContainer>
              ): null}
              
              {props.user ?  (
                <LinkContainer to="/login">
                  <Button onClick={ctx.onLogout}>Logout</Button>
                </LinkContainer>
              ): null}
            

              {/* </div> */}
              </Nav>

                </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default HeaderInformation;
