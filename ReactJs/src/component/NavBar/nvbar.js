import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import img1 from '../../images/carousel-1.jpg' 
import img2 from '../../images/carousel-2.jpg' 
import Carousel from 'react-bootstrap/Carousel';
import style from "./NavBar.module.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink ,Link, useNavigate} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Button } from 'react-bootstrap';

;
const NVbar=()=>{
  const [fullName,setFullName]=useState("")
  const navigate = useNavigate();


    useEffect(()=>{
        loadCategories();
        const currentime=Math.floor(Date.now()/1000)
        if(localStorage.getItem("token")){
          if(currentime<jwtDecode(localStorage.getItem("token")).exp){
            try{
              setFullName("Hello "+jwtDecode(localStorage.getItem("token")).firstname)
              
            }catch(e){
    
            }
          }else{
            localStorage.removeItem("token");
            localStorage.removeItem("auth");
  
          }
        }
        
        
        
        
        isLogin()
      },[localStorage.getItem("token"),localStorage.getItem("auth")])
      const loadCategories=async()=>{
        await axios.get("http://localhost:8080/categorie/all").then(response=>{
            setCategories(response.data)
        })
        
    }
    const isLogin=()=>{
      try{
        /*const currentime=Math.floor(Date.now()/1000)
        const tokentime =jwtDecode(localStorage.getItem("token")).exp
        if(currentime>tokentime){
          localStorage.removeItem("token")
          localStorage.removeItem("auth")
        }*/
      }catch(e){

      }
      
    }
    
    const [categories,setCategories]=useState([{id:'',name:'',image:''}]);

    const logout=()=>{
      localStorage.removeItem("token")
      localStorage.removeItem("auth")
      navigate("/")
    }
    return <div className="row border-top px-xl-5">
    <div className="col-lg-3 d-none d-lg-block">
        <Navbar  expand="lg" className='p-0 w-100' >
            <NavbarToggle aria-controls="basic-navbar-nav" className='w-100'></NavbarToggle>
            <Navbar.Collapse id="basic-navbar-nav"  className='w-100'>
                <Nav className='w-100'>
                    <NavDropdown title="Categories" id="basic-nav-dropdown" className="bg-primary w-100 ">
                        {categories.map(categorie=>(
                          <NavDropdown.Item key={categorie.id} className='w-100'>{categorie.name}</NavDropdown.Item>
                        ))}
                        
                        

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>

        
    </div>
    <div className="col-lg-9">
    <Navbar bg="light" expand="lg" className='pl-0'>
  <Container className='pl-0'>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto ">
        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        <Nav.Link as={NavLink} to="/shop">Shop</Nav.Link>
        <Nav.Link as={NavLink} to="/shopdetails">Shop Details</Nav.Link>
        <NavDropdown title="Pages" id="basic-nav-dropdown" >
          <NavDropdown.Item as={NavLink} to="/cart" >Shoping Cart</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Chekout</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#home">Contact</Nav.Link>
        </Nav>
        <Nav>
        
        {localStorage.getItem("auth")?<div className={style.auth}>
            
            <NavDropdown className='mr-5'  title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown" >
              
            <NavDropdown.Item className={style.authitem}  as={Link} to="/profile" >Profile</NavDropdown.Item>
            <NavDropdown.Item className={style.authitem} as={Button} onClick={logout}>Logout</NavDropdown.Item>
            
        </NavDropdown>
            
        </div>:
        <React.Fragment>
        <Nav.Link as={NavLink} to="/login" >Login</Nav.Link>
        <Nav.Link as={NavLink} to="/registre">Resgistre</Nav.Link></React.Fragment>}
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</div>
</div>
}
export default NVbar