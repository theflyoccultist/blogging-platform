import React from "react";
import {Container, Navbar} from 'react-bootstrap';
import '../styles/Navbar.css'

const NavigationBar: React.FC = () => {
  
    return (
      <div className="navbar">
      <Navbar className="bg-body-tertiary Navbar">
      <Container>
        <Navbar.Brand style={{ marginLeft: '250px' }}>Posts</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="#new">Create Post</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      </div>
  );
}

export default NavigationBar;