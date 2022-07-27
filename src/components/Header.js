import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import styles from "./Header.module.css";

const Header = () => {

  const navigate=useNavigate();

  const inputRef=useRef();

  const submitHandler = (event)=>{
    event.preventDefault();
    navigate("/search/"+inputRef.current.value);
  }

  return (
    <>
      <Navbar collapseOnSelect expand="md" variant="dark" sticky="top" style={{backgroundColor: "black", marginTop:"10px"}}>
        <Container>
          <Navbar.Brand><Link to="/movies/now_playing" className={styles.navBrand}>MOVIES APP</Link></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" style={{color:"white"}}>
            <Nav className="me-auto">
              <b>
                <NavDropdown title="Filter by" id="collasible-nav-dropdown">
                  <NavDropdown.Item style={{textAlign:"center"}}>
                    <Link to="/movies/now_playing" className={styles.navLink}>NOW PLAYING</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{textAlign:"center"}}>
                    <Link to="/movies/upcoming" style={{color:"purple"}} className={styles.navLink}>UPCOMING</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{textAlign:"center"}}>
                    <Link to="/movies/trending" style={{color:"green"}} className={styles.navLink}>TRENDING</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{textAlign:"center"}}>
                    <Link to="/movies/popular" style={{color:"orangered"}} className={styles.navLink}>POPULAR</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item style={{textAlign:"center"}}>
                    <Link to="/movies/top_rated" style={{color:"blue"}} className={styles.navLink}>TOP-RATED</Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </b>
            </Nav>
            <Nav>
              <Form className="d-flex" onSubmit={submitHandler}>
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  ref={inputRef}
                  style={{fontWeight:"bold", fontSize:"17px"}}
                />
                <Button variant="light" type="submit"><i className="fa-solid fa-magnifying-glass"/></Button>
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;