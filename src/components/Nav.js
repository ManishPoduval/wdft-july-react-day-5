import React from 'react'
import {Nav, Navbar} from 'react-bootstrap'
import {Link} from 'react-router-dom'

export default function myNav() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
            <Nav.Link href="/">Todo</Nav.Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/create-todo">Add Todo</Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
        </div>
    )
}
