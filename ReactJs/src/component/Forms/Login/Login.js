import axios from 'axios';
import logo from '../../../images/logo-boutique-ligne_18099-275.avif';
import useInput from '../../hooks/useInput';
import { forEach } from 'lodash';
import { result } from 'lodash';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { GridLoader } from 'react-spinners';
const Login=()=>{
  const navigate=useNavigate();
  const [formsubmited,setFormsubmited]=useState(false)

  const{
      value:email,
      valid:emailvalid,
      valueChange:emailChange,
      valueBlur:emailBlur
  }=useInput(value=>(value.trim().includes("@")&&!/[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/.test(value)&&value.trim().length>5))

  const {
    value:password,
    valid:passwordvalid,
    valueChange:passwordChange,
    valueBlur:passwordBlur

  }=useInput(value=>!/[!%^*()_\-=\[\]{};':"\\|,.<>\/?]/.test(value))

  const submitform=(e)=>{
      e.preventDefault()
      login();
  }


  const login=async()=>{
    setFormsubmited(true)

    const formdata=new FormData()
    formdata.append("email",email)
    formdata.append("password",password)
    try{
      await axios.post("http://localhost:8080/login",formdata).then(result=>{
       
        localStorage.setItem("token",result.data)
        localStorage.setItem("auth",true)
        navigate("/")
      })
    }catch(e){
      console.log(e)
      
      if(e.code==="ERR_BAD_REQUEST"){
        localStorage.setItem("token",e.response.data.token)
        toast.error(e.response.data.message, {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          navigate("/confirmecode")
          
      }else{
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
    

  }
    return formsubmited?<GridLoader/>:<section className="vh-90" style={{backgroundColor: "#eee"}}>
    <div className="container h-100">
      <div className="row d-flex justify-content-center  h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{borderRadius: "25px"}}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign in</p>
                  <form className="mx-1 mx-md-4 flex-column fd-c">
                    
                    
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example3c">Your Email</label>
                        <input type="email" id="form3Example3c" className="form-control " value={email} onChange={emailChange} onBlur={emailBlur}/>
                        
                      </div>
                    </div>
                    <div className="d-flex flex-row  mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0 text-start">
                      <label className="form-label" htmlFor="form3Example4c">Password</label>
                        <input type="password" id="form3Example4c" className="form-control" value={password} onChange={passwordChange} onBlur={passwordBlur} />
                        </div>
                        
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button className="btn btn-primary btn-lg rounded" disabled={emailvalid&&passwordvalid?false:true} onClick={submitform}>Login</button>
                    </div>
                    
                    
  
                  </form>
  
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex flex-column justify-content-around order-1 order-lg-2">
                  <div>
                    <img src={logo}
                      className="img-fluid" alt="Sample image"/>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
}
export default Login;