import axios from "axios";
import { useEffect, useState } from "react"
import Product from "../Product/Products";

const SomeProducts=()=>{
    useEffect(()=>{
        loadProducts()
    },[])

    const [products,setProducts]=useState([{id:'',name:'',price:'',image:''}]);

    const loadProducts=async()=>{
        await axios.get("http://localhost:8080/someproducts").then(result=>{
            setProducts(result.data)
        })
    }


    return <div className="container-fluid pt-5">
    <div className="text-center mb-4">
        <h2 className="section-title px-5"><span className="px-2">Our Products</span></h2>
    </div>
    <div className="row px-xl-5 pb-3">
        {products.map(product=>(
            <Product key={product.id} Product={product} col={3}/>
        ))}
        </div>
    </div>
}
export default SomeProducts