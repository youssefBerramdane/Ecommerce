import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "../../Component/Styles/style.css"
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './Header.module.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';



const Header=()=>{
    
    return <div className="container-fluid">
    <div className="row bg-secondary py-2 px-xl-5">
        <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
                <a className="text-dark" href="">FAQs</a>
                <span className="text-muted px-2">|</span>
                <a className="text-dark" href="">Help</a>
                <span className="text-muted px-2">|</span>
                <a className="text-dark" href="">Support</a>
            </div>
        </div>
        <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
                <a className="text-dark px-2" href="">
                <FontAwesomeIcon icon={faFacebook} />
                </a>
                <a className="text-dark px-2" href="">
                <FontAwesomeIcon icon={faTwitter} />
                </a>
                <a className="text-dark px-2" href="">
                <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a className="text-dark px-2" href="">
                <FontAwesomeIcon icon={faInstagram} />
                </a>
                <a className="text-dark pl-2" href="">
                <FontAwesomeIcon icon={faYoutube} />
                </a>
            </div>
        </div>
    </div>
    <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
                <Link to="/" className="text-decoration-none">
                    <h1 className="m-0 display-5 font-weight-semi-bold"><span className="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                </Link>
            </div>
            <div className="col-lg-6 col-6 text-left">
                <form action="">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Search for products"/>
                        <div className="input-group-append">
                            <span className="input-group-text bg-transparent text-primary">
                            <FontAwesomeIcon icon={faSearch} />
                            </span>
                        </div>
                    </div>
                </form>
                
            </div>
            
            <div className="col-lg-3 col-6 text-right  ">
                
            
                <Link to="/favourite" className={`btn border ${style.icon}`}>
                <FontAwesomeIcon icon={faHeart}  />
                    <span className="ms-1">0</span>
                </Link>
                <Link to="/cart" className={`btn border ${style.icon}`}>
                <FontAwesomeIcon icon={faCartShopping} />
                    <span className="ms-1">0</span>
                </Link>
            </div>
        </div>
    </div>
}
export default Header