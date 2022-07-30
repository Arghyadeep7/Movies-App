import {useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
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
    <Navbar collapseOnSelect expand="md" variant="dark" sticky="top" style={{backgroundColor: "black", marginTop:"10px"}}>
      <Navbar.Brand><Link to="/movies/now_playing" className={styles.navBrand}><i className="fas fa-video"></i>&nbsp;MOVIES APP</Link></Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" style={{color:"white"}}>
        <Nav className="me-auto">
          <b>
            <NavDropdown title="Filter by" id="collasible-nav-dropdown" >
              <NavDropdown.Item className={styles.navLink} href="/movies/now_playing">
                NOW PLAYING
              </NavDropdown.Item>
              <NavDropdown.Item style={{color:"purple"}} className={styles.navLink} href="/movies/upcoming">
                UPCOMING
              </NavDropdown.Item>
              <NavDropdown.Item style={{color:"green"}} className={styles.navLink} href="/movies/trending">
                TRENDING
              </NavDropdown.Item>
              <NavDropdown.Item style={{color:"orangered"}} className={styles.navLink} href="/movies/popular">
                POPULAR
              </NavDropdown.Item>
              <NavDropdown.Item style={{color:"blue"}} className={styles.navLink} href="/movies/top_rated">
                TOP RATED
              </NavDropdown.Item>
            </NavDropdown>
          </b>
        </Nav>
        <Nav>
          <Navbar.Brand href="https://tv-series-app-arghyadeep7.vercel.app/tv/trending" style={{color:'yellow'}} className={styles.connector} target="_blank"><i className="fas fa-tv"></i>&nbsp;TV SERIES APP</Navbar.Brand>
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
    </Navbar>
  )
}

export default Header;