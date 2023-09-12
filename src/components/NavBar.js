import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";

const NavBar = () => {
    return <Navbar className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
        <Container>
            <NavLink to="/" className={styles.logo}>
                <Navbar.Brand>
                    <img src={logo} alt="logo" height="35"></img><span>Clicks</span>
                </Navbar.Brand>
            </NavLink>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav className="ml-auto">
                    <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/" ><i className="fa-solid fa-house"></i>Home</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/events" ><i className="fa-solid fa-calendar"></i>Events</NavLink>
                    {/* <Nav.Link><i class="fa-solid fa-user"></i>Profile</Nav.Link> */}
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin" ><i className="fa-solid fa-right-to-bracket"></i>Sign In</NavLink>
                    <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup" ><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
};

export default NavBar;
