import React, { useState } from "react"
import axios from "axios";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus,faMinus,faTimes } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { forEach } from "lodash";
import { PayPalScriptProvider,PayPalButtons } from "@paypal/react-paypal-js";

const Cart=()=>{
    const[cartitems,setCartitems]=useState([]);
    const [total,setTotal]=useState(0)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            navigate("/login")
        }
        LoadProducts()
    },[]);

    useEffect(()=>{
        var s=0
        cartitems.forEach(item=>{
            s+=item.quantite*item.price
            setTotal(s)
    })},[cartitems])
    
    const LoadProducts=async()=>{
        try{
            await axios.get("http://localhost:8080/getItemcart",{headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }}).then(result=>{
                
                setCartitems(result.data)
                
                
        })
        }catch(e){
            console.log(e)
            navigate("/login")
            
        }
        
    };
    const changequntity=(id,operation)=>{
        var items=[...cartitems];
        const index =cartitems.findIndex(item=>(
            item.productId===id
        ))
        if(operation==="+"){
            items[index].quantite++
            setTotal(total+items[index].price)
        }else{
            setTotal(total-items[index].price)
            if(items[index].quantite===1){
                items=items.filter(item=>(
                    item.productId!==id
                ))
            }else{
                items[index].quantite--
            }
            
        }
        
        setCartitems(items)
    }
    
    const changeitemcart=async(id,operation)=>{
        const formdata=new FormData()
        formdata.append("id",id)
        formdata.append("operation",operation)
        try{
            await axios.put("http://localhost:8080/plusitemcart",formdata,
            {headers:{Authorization:"Bearer "+localStorage.getItem("token")}}).then(result=>(
                changequntity(id,operation)
            ))
        }catch(e){

        }
        
    }
    
    
    
    return <React.Fragment>
        <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
            <h1 className="font-weight-semi-bold text-uppercase mb-3">Shopping Cart</h1>
            <div className="d-inline-flex">
                <p className="m-0"><a href="">Home</a></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Shopping Cart</p>
            </div>
        </div>
    </div>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            <div className="col-lg-8 table-responsive mb-5">
                <table className="table table-bordered text-center mb-0">
                    <thead className="bg-secondary text-dark">
                        <tr>
                            <th>Products</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody className="align-middle">
                        {cartitems.length>0?cartitems.map(item=>(
                            <tr key={item.productId}>
                                
                            <td className="align-middle"><img src={`data:image/jpeg;base64,${item.productPicture}`} alt="" style={{width: "50px"}}/> {item.productName}</td>
                            <td className="align-middle">{item.price}</td>
                            <td className="align-middle">
                                <div className="input-group quantity mx-auto" style={{width: "100px"}}>
                                    <div className="input-group-btn">
                                        <button className="btn btn-sm btn-primary btn-minus" onClick={()=>changeitemcart(item.productId,"-")}>
                                        <FontAwesomeIcon icon={faMinus}/>
                                        </button>
                                    </div>
                                    <p  className="form-control form-control-sm bg-secondary text-center" >{item.quantite}</p>
                                    <div className="input-group-btn">
                                        <button className="btn btn-sm btn-primary btn-plus" onClick={()=>changeitemcart(item.productId,"+")}>
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            
                            <td className="align-middle">{item.price*item.quantite}</td>
                            <td className="align-middle"><button className="btn btn-sm btn-primary"><FontAwesomeIcon icon={faTimes}/></button></td>
                        </tr>
                        ) ) :null}
                    </tbody>
                </table>
            </div>
            <div className="col-lg-4">
                
                <div className="card border-secondary mb-5">
                    <div className="card-header bg-secondary border-0">
                        <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between mb-3 pt-1">
                            <h6 className="font-weight-medium">Subtotal</h6>
                            <h6 className="font-weight-medium">${total}</h6>
                        </div>
                        <div className="d-flex justify-content-between">
                            <h6 className="font-weight-medium">Shipping</h6>
                            <h6 className="font-weight-medium">$10</h6>
                        </div>
                    </div>
                    <div className="card-footer border-secondary bg-transparent">
                        <div className="d-flex justify-content-between mt-2">
                            <h5 className="font-weight-bold">Total</h5>
                            <h5 className="font-weight-bold">${total+10}</h5>
                        </div>
                        <PayPalScriptProvider>
                            <PayPalButtons></PayPalButtons>
                        </PayPalScriptProvider>
                        
                    </div>
                </div>
            </div>
            </div>
            </div>
    </React.Fragment>
}
export default Cart