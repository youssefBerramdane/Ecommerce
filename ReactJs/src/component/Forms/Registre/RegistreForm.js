import React from 'react';
import logo from '../../../images/logo-boutique-ligne_18099-275.avif';
import useInput from '../../hooks/useInput';
import { useState } from 'react';
import style from './RegisterForm.module.css';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BarLoader,HashLoader } from "react-spinners";
const RegisterForm=()=>{
  
  const [passwordRepeat,setPasswordrepeat]=useState('');
  const [validpasswordrepeat,setValidpasswordrepeat]=useState();
  const [validFrom,setValidform]=useState(false);
  const [submitetform,setSubmitedform]=useState(false)
  const navigate = useNavigate();


  const {
    value:firstName,
    valid:firstNameValid,
    valueChange:firstNameChange,
    valueBlur:firstNameBlur,
    valueReset:firstNameReset
  }=useInput(value=>value.length>2 && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value));
  const {
    value:lastName,
    valid:lastNameValid,
    valueChange:lastNameChange,
    valueBlur:lastNameBlur,
    valueReset:lastNameReset
  }=useInput(value=>value.length>2 && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value));

  const {
    value:emailvalue,
    valid:emailvalid,
    valueChange:emailChange,
    valueBlur:emailBlur,
    valueReset:emailReset
  }=useInput(value=>value.includes('@') &&value.length>6 && !/[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(value))

  const {
    value:password,
    valid:passwordvalid,
    valueChange:passwordChange,
    valueBlur:passwordBlur,
    valueReset:passwordReset
  }=useInput(value=>value.trim().length>10 && /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value) && /[0-9]/.test(value));
  
  
  useEffect(()=>(
    setValidform(firstNameValid&&lastNameValid&&emailvalid&&passwordvalid&&validpasswordrepeat)
 ),[firstName,lastName,emailvalue,password,passwordRepeat]);

  const PasswordRepeatChange=(e)=>{
    setPasswordrepeat(e.target.value)
    setValidpasswordrepeat(e.target.value===password)
  }
  const PasswordRepeatBlur=()=>{
    setValidpasswordrepeat(passwordRepeat===password)
  }
  const PasswordRepeatReset=()=>{
    setPasswordrepeat("")
  }
  const sendForm=(e)=>{
      e.preventDefault();
      register()
  }

  const register=()=>{
    const formdata=new FormData();
    formdata.append("firstname",firstName)
    formdata.append("lastname",lastName)
    formdata.append("email",emailvalue)
    formdata.append("password",password)
    setSubmitedform(true)
    try{
      axios.post("http://localhost:8080/registre",formdata).then(result=>{
        console.log(result.data)
        localStorage.setItem("token",result.data.token)
        navigate("/confirmecode")
    })
    }catch(e){
      toast.error(e.response.data, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
    
  }
  





    return !submitetform ? <section className="vh-90" style={{backgroundColor: "#eee"}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center  h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{borderRadius: "25px"}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <form className="mx-1 mx-md-4 flex-column fd-c">
                    <div className="d-flex flex-row mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example1c">First Name</label>
                        <input type="text" id="form3Example1c" className={`form-control ${firstNameValid===false?style.inputerror:''} `} value={firstName} onChange={firstNameChange} onBlur={firstNameBlur} />
                        {firstNameValid===false?<p style={{color:"red"}}>*insert a valid name</p>:null}
                      </div>
                      </div>
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example2c">Last Name</label>
                        <input type="text" id="form3Example2c" className={`form-control ${lastNameValid===false?style.inputerror:''}`} value={lastName} onChange={lastNameChange} onBlur={lastNameBlur} />
                        {lastNameValid===false?<p style={{color:"red"}}>*insert a valid name</p>:null}
                      </div>
                    </div>
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        <input type="email" id="form3Example3c" className={`form-control ${emailvalid===false?style.inputerror:''}`} value={emailvalue} onChange={emailChange} onBlur={emailBlur} />
                        {emailvalid===false?<p style={{color:"red"}}>*insert a valid email</p>:null}
                      </div>
                    </div>
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                        <input type="password" id="form3Example4c" className={`form-control ${passwordvalid===false?style.inputerror:''}`} value={password} onChange={passwordChange} onBlur={passwordBlur} />
                        {passwordvalid==false?
                        <div>
                        <p style={{color:"red"}}>for your protection</p>
                        <p style={{color:"red"}}>10 character minimum,chiffres,specials charachters</p></div>:null}
                      </div>
                    </div>
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                        <input type="password" id="form3Example4cd" className={`form-control ${validpasswordrepeat===false?style.inputerror:''}`} value={passwordRepeat} onChange={PasswordRepeatChange} onBlur={PasswordRepeatBlur} />
                        {validpasswordrepeat===false?<p style={{color:"red"}}>be sure its same password</p>:null}
                      </div>
                    </div>
                    
  
                  </form>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex flex-column justify-content-around order-1 order-lg-2">
                  <div>
                    <img src={logo}
                      className="img-fluid" alt="Sample image"/>
                  </div>
                  <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button onClick={sendForm} type="button" disabled={validFrom===true?false:true} className="btn btn-primary btn-lg rounded">Register</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>:<  HashLoader className={style.loader}/>
}
export default RegisterForm