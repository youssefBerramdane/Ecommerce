import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import img1 from '../../images/carousel-1.jpg' 
import img2 from '../../images/carousel-2.jpg' 
import Carousel from 'react-bootstrap/Carousel';
import style from "./NavBar.module.css"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import NVbar from './nvbar';


const NAVBAR=()=>{
  
    return  <div className="container-fluid mb-5">
    
            
            <div  >
            <Carousel fade >
      <Carousel.Item style={{height:"410px"}}>
        <img
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
        <Carousel.Caption className={style.textcaroucel}>
            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height:"410px"}}>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second slide"
        />

        <Carousel.Caption className={style.textcaroucel}>
            <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
            <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
        </Carousel.Caption>
      </Carousel.Item>
      </Carousel>
                
            </div>
        </div>
    
}
export default NAVBAR;