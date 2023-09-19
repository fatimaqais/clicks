import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();

    const { expanded, setExpanded, ref } = useClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axios.post("dj-rest-auth/logout/");
            setCurrentUser(null);
        } catch (err) {
            console.log(err);
        }
    };

    const addPostIcon = (
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/posts/create" >
            <i className="fa-solid fa-plus"></i>Post</NavLink>
    );

    const addEventIcon = (
        <NavLink
            className={`${styles.NavLink} ${styles.Addpost}`}
            activeClassName={styles.Active}
            to="/events/create" >
            <i className="fa-solid fa-plus"></i>Event</NavLink>
    );

    const loggedInIcon = (<>
        <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
            <i className="fas fa-sign-out-alt"></i>Sign out
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
        >
            <Avatar src={currentUser?.profile_image} height={40} />
        </NavLink></>
    );
    const loggedOutIcon = (
        <>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signin" ><i className="fa-solid fa-right-to-bracket"></i>Sign In</NavLink>
            <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/signup" ><i className="fa-solid fa-user-plus"></i>Sign Up</NavLink>
        </>
    );

    return (
        <Navbar expanded={expanded} className={styles.NavBar} collapseOnSelect expand="md" fixed="top">
            <Container>
                <NavLink to="/" className={styles.logo}>
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="35"></img><span>Clicks</span>
                    </Navbar.Brand>
                </NavLink>
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)} aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                    <Nav className="ml-auto">
                        <NavLink exact className={styles.NavLink} activeClassName={styles.Active} to="/" ><i className="fa-solid fa-house"></i>Home</NavLink>
                        <NavLink className={styles.NavLink} activeClassName={styles.Active} to="/events" ><i className="fa-solid fa-calendar"></i>Events</NavLink>
                        {currentUser && addPostIcon}
                        {currentUser && addEventIcon}
                        {currentUser ? loggedInIcon : loggedOutIcon}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
