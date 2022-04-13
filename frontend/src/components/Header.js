import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

const Header = () => {
    return (
        <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">Logo</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
