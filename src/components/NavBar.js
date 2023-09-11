import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return <Navbar className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <Navbar.Brand><img src={logo} alt="logo" height="35"></img><span className={styles.logo}>Clicks</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="ml-auto">
                    <Nav.Link><i className="fa-solid fa-house"></i>Home</Nav.Link>
                    <Nav.Link><i className="fa-solid fa-calendar"></i>Events</Nav.Link>
                    {/* <Nav.Link><i class="fa-solid fa-user"></i>Profile</Nav.Link> */}
                    <Nav.Link><i className="fa-solid fa-right-to-bracket"></i>Sign In</Nav.Link>
                    <Nav.Link><i className="fa-solid fa-user-plus"></i>Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar;
