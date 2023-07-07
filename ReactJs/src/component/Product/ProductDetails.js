import axios from "axios";
import { Component, useEffect, useState } from "react";
import React from "react";
import { Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus,faPlus } from "@fortawesome/free-solid-svg-icons";
import Product from "./Products";
import { toast } from "react-toastify";
const ProductDetails=()=>{
    useEffect(()=>{
        loadProduct()
        
        
    },[]);
    const navigate = useNavigate();

    const {id}=useParams();
    const [size,setSize]=useState()
    const [color,setColor]=useState()
    const [product,setProduct]=useState({id:'',name:'',price:'',quantity:'',image:'',sizes:'',colors:'',description:''});
    const[count,setCount]=useState(1);
    const [productsSimilar,setProductsSimilar]=useState([{id:'',name:'',price:'',image:''}]);
    const loadProduct=()=>{
        try{
             axios.get(`http://localhost:8080/productdetails/${id}`).then(response=>{
                setProduct(response.data.body)
                loadProductSimilar(response.data.body.categorie.id);
            })
            
        } catch(e){
            console.log(e)
        }
        
    }
    const loadProductSimilar=async(id)=>{
        try{
            await axios.get(`http://localhost:8080/productSimilar/${id}`).then(result=>{
                setProductsSimilar(result.data)
            })
        }catch(e){
            console.log(e)
        }
        
    }
    const sizeChange=(e)=>{
        if(e.target.checked){
            setSize(e.target.value)
        }
    }
    const colorChange=(e)=>{
        if(e.target.checked){
            setColor(e.target.value)
        }
    }
    
    const countplus=()=>{
        setCount(count+1)
    }
    const countminus=()=>{
        if(count>1){
            setCount(count-1)
        }
        
    }
    const addproducttocart=async()=>{
        const formdata=new FormData();
        formdata.append("quantity",count)
        formdata.append("size",size)
        formdata.append("color",color)
        if(localStorage.getItem("token") && localStorage.getItem("auth")){
            await axios.post(`http://localhost:8080/addProductToCart/${id}`,formdata,{headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            }}).then(result=>{
                
                toast.success(result.data,{
                    position: "bottom-left",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            })
        }else{
            navigate("/login")
        }
    }

    return <React.Fragment>
        <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
            <h1 className="font-weight-semi-bold text-uppercase mb-3">Shop Detail</h1>
            <div className="d-inline-flex">
                <p className="m-0"><a href="">Home</a></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Shop Detail</p>
            </div>
        </div>
    </div>
    <div className="row px-xl-5 ml-4">
    <div className="col-lg-5 pb-5">
            <div className=" border">
                <div>
                    <img className="w-100 h-100" src={`data:image/jpeg;base64,${product.image}`} alt="Image"/>
                </div>  
            </div>
    </div>

    <div className="col-lg-7 pb-5">
        <h3 className="font-weight-semi-bold text-start">{product.name}</h3>
        
        <h3 className="font-weight-semi-bold mb-4 text-start mt-3">Dhs {product.price}</h3>
        <p className="mb-4 text-start" >{product.description}.</p>
        <div className="d-flex mb-3 ">
            
            <Form >
                <Form.Group className="custom-control custom-radio custom-control d-flex p-0">
                    <Form.Label>Sizes:</Form.Label>
                    {product.sizes.split(", ").map(size=>(
                        <Form.Check className="ml-3 " key={size} type='radio' label={size} value={size} name='size' onChange={sizeChange}></Form.Check>
                    ))}
                </Form.Group>
                <Form.Group className="custom-control custom-radio custom-control d-flex p-0">
                    <Form.Label >Colors:</Form.Label>
                    {product.colors.split(", ").map(color=>(
                        <Form.Check className="ml-4 " key={color} type='radio' label={color} value={color} name='color' onChange={colorChange}></Form.Check>
                    ))}
                </Form.Group>
            </Form>
            
        </div>
        
        <div className="d-flex align-items-center mb-4 pt-2">
            <div className="input-group quantity mr-3" style={{width: "130px"}}>
                <div className="input-group-btn">
                    <button className="btn btn-primary btn-minus" onClick={countminus} >
                    <FontAwesomeIcon icon={faMinus}/>
                    </button>
                </div>
                <p  className="form-control bg-secondary text-center" >{count}</p>
                <div className="input-group-btn">
                    <button className="btn btn-primary btn-plus" onClick={countplus}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>
            </div>
            <button className="btn btn-primary px-3" onClick={()=>addproducttocart(product.id)}><i className="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
        </div>
        
    </div>
    
</div>
<div className="container-fluid py-5">
        <div className="text-center mb-4">
            <h2 className="section-title px-5"><span className="px-2">You May Also Like</span></h2>
        </div>
        <div className="row px-xl-5">
            
    {productsSimilar.map(produc=>(
        <Product key={produc.id} Product={produc} col={3}></Product>
    ))}
    
    </div>
    </div>

    </React.Fragment>
    
}
export default ProductDetails