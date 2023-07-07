import { useEffect } from 'react';

import style from './Confirmation.module.css'
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const Confirmation=()=>{
    useEffect(()=>{
        
    },[]);

    const[code,setCode]=useState("")
    const[validcode,setValidcode]=useState("")
    
    const LoadCode=()=>{
        console.log(localStorage.getItem("token"))
        
        try{
            axios.get("http://localhost:8080/auth",
            {headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }}).then(result=>(
                console.log(result)
            ))
        }catch(e){
            console.log(e)
        }
        

        
    }
    const codeChange=(e)=>{
        setCode(e.target.value)
        setValidcode(!/[!#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]+/.test(e.target.value) &&!/[a-zA-Z]/.test(e.target.value))
    }
    const sendCode=(e)=>{
        e.preventDefault()
        verifyCode();
    }
    const verifyCode=async()=>{
        const formdata= new FormData()
        formdata.append("code",code)
        try{
            await axios.post("http://localhost:8080/verification",formdata,{headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }}).then()
        }catch(e){
            console.log(e)
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
    return  <section className={style.confirmation}>
        <div className={style.background}>
            <div className={style.groupe}>
                <div className={style.title}>
                    <h2>Thank for joining us</h2>
                    <h3>Please check your inbox to verify your email</h3>
                    <p>We send a verification code in your inpox</p>
                </div>
                <form>
                <div className="form-outline">
                    <label className="form-label" htmlFor="typeText">Enter Code</label>
                    <input type="number" id="typeText" className="form-control"  value={code} onChange={codeChange} />
                   {validcode===false?<p className={style.error}>*code must be an number</p>:null}
                </div>
                <button className='btn btn-success' disabled={validcode===false?true:false}  onClick={sendCode}>Verify</button>
                </form>
            </div>
        </div>
        
    </section>
}
export default Confirmation