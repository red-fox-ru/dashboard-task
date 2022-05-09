import React from 'react';
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../actions/userAction";

const Header = () => {
    const { userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Logo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/projects">Projects</Nav.Link>
                </Nav>

                {userInfo ? (
                    <Nav className="me-auto">
                        <Nav.Link href='/profile'><i className="fas fa-user"></i> Profile</Nav.Link>

                        <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                    </Nav>

                ) : (
                    <Nav.Link href="/login"><i className="fas fa-user"></i> Login</Nav.Link>
                )}

                {userInfo && userInfo.isAdmin && (
                    <NavDropdown title='Admin' id='adminmenue'>
                        <NavDropdown.Item href="/users">Users</NavDropdown.Item>
                    </NavDropdown>
                )}
            </Container>
        </Navbar>
    );
};

export default Header;
