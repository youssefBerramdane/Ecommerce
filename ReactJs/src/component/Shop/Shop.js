import axios from "axios";

import React, { useEffect, useState } from "react"
import { Link, NavLink, useLocation, useParams, useSearchParams } from "react-router-dom"
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown, Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import Product from "../Product/Products";
import { debounce } from "lodash";
import { BarLoader,BounceLoader } from "react-spinners";
const Shop=(match)=>{
    const [ Search,SetSearch]= useSearchParams();
    
    const {pagenb}=useParams();
    
    
    
    useEffect(()=>{
        changeSeach()
    },[Search,pagenb]);

    
    
 
   
    const [products,setProducts]=useState([{id:'',name:'',price:'',image:'',total:''}])
    const [page,setPage]=useState({number:'',first:'',last:''})
    const[colors,setColors]=useState([])
    const[price,setPrice]=useState([])
    const[sizes,setSizes]=useState([])
    
    
    const loadProducts=async()=>{
        
        await axios.get(`http://localhost:8080/allproducts/page/${pagenb?pagenb-1:0}?${Search.toString()}`).then(result=>{
            const page={number:result.data.number+1,first:result.data.first,last:result.data.last,total:result.data.totalPages}
            setPage(page)
            setProducts(result.data.content)
            
        })
    }
    const changeSeach=debounce(loadProducts,500)
    
    const priceChange=(e)=>{
        if(e.target.checked){
            setPrice(price.concat(e.target.value))
           
        }else{
            setPrice(price.filter(price=>price!==e.target.value))
        }
    }

    const colorChange=(e)=>{
        if(e.target.checked){
            setColors(colors.concat(e.target.value))
           
        }else{
            setColors(colors.filter(color=>color!==e.target.value))
        }
    }
    const sizeChange=(e)=>{
        if(e.target.checked){
            setSizes(sizes.concat(e.target.value))
           
        }else{
            setSizes(sizes.filter(size=>size!==e.target.value))
        }
    }
    const ApplyFilterPrice=()=>{
        
        if(price.length>0){
            Search.set("price",price.join(","))
            SetSearch(Search,{replace:true})
        }else{
            Search.delete("price")
            SetSearch(Search,{replace:true})
        }
    }
    const ApplyFilterColor=()=>{
        if(colors.length>0){
            Search.set("colors",colors.join(","))
            SetSearch(Search,{replace:true})
        }else{
            Search.delete("colors")
            SetSearch(Search,{replace:true})
        }
    }
    const ApplyFilterSize=()=>{
        if(sizes.length>0){
            Search.set("sizes",sizes.join(","))
            SetSearch(Search,{replace:true})
        }else{
            Search.delete("sizes")
            SetSearch(Search,{replace:true})
        }
    }
    const searchChange=(e)=>{ 
        if(e.target.value.length===0){
            Search.delete("search")
            SetSearch(Search,{replace:true})
        }else{
            Search.set("search",e.target.value)
            SetSearch(Search,{replace:true})
        }
    }
    const sortChange=(e)=>{
        
        if(e.target.value.split(" ")[0]==="Sort"){
            Search.delete("sort")
            Search.delete("order")
            SetSearch(Search,{replace:true})
            console.log(Search.toString())
        }else{
            Search.set("sort",e.target.value.split(" ")[0])
        
            Search.set("order",e.target.value.split(" ")[1])
            SetSearch(Search,{replace:true})
        }
        
        
    }
    
    return <React.Fragment>
        <div className="container-fluid bg-secondary mb-5">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{minHeight: "300px"}}>
            <h1 className="font-weight-semi-bold text-uppercase mb-3">Our Shop</h1>
            <div className="d-inline-flex">
                <p className="m-0"><Link to="/">Home</Link></p>
                <p className="m-0 px-2">-</p>
                <p className="m-0">Shop</p>
            </div>
        </div>
    </div>
    <div className="container-fluid pt-5">
        <div className="row px-xl-5">
            
            <div className="col-lg-3 col-md-12">
                
                <div className="border-bottom mb-4 pb-4">
                    <h5 className="font-weight-semi-bold mb-4">Filter by price(Dhs)</h5>
                    <Form>
                        <Form.Group className=" d-flex flex-column align-items-start">
                            <Form.Check type="checkbox" label="All Price" checked={price.length>0?false:true} onChange={priceChange}></Form.Check>
                            {["0 - 100 ","100 - 200 ","200 - 300 ","300 - 400 ","400 - 500 ","500 +"].map(price=>(
                                <Form.Check key={price} type="checkbox" label={price} value={`${price.split(" ")[0]}-${price.split(" ")[2]?price.split(" ")[2]:''}`} onChange={priceChange}></Form.Check>
                            ))}
                            
                            
                            <Button className="align-self-end" onClick={ApplyFilterPrice}>OK</Button>
                        </Form.Group>
                    </Form>
                    
                </div>

                <div className="border-bottom mb-4 pb-4">
                    <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                    <Form>
                        <Form.Group className=" d-flex flex-column align-items-start">
                            <Form.Check type="checkbox" label="All Colors" checked={colors.length>0?false:true} onChange={colorChange}></Form.Check>
                            {["White","Black","Red","Blue","Green"].map(color=>(
                                <Form.Check key={color} type="checkbox" value={color} label={color} onChange={colorChange}></Form.Check>
                            ))}
                                <Button className="align-self-end" onClick={ApplyFilterColor}>OK</Button>
                            </Form.Group>
                    </Form>

                    
                </div>
                
                <div className="mb-5">
                    <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                    <Form>
                        <Form.Group className=" d-flex flex-column align-items-start">
                            <Form.Check type="checkbox" label="All Size" checked={sizes.length>0?false:true} onChange={sizeChange}></Form.Check>
                            {["XS","S","M","L","XL"].map(size=>(
                                <Form.Check key={size} value={size} type="checkbox" label={size} onChange={sizeChange}></Form.Check>
                            ))}
                                
                                <Button className="align-self-end" onClick={ApplyFilterSize}>OK</Button>
                            </Form.Group>
                    </Form>
                    
                </div>
                
            </div>
            
            <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                    <div className="col-12 pb-1">
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div className="input-group">
                                    <input type="text" className="form-control" placeholder="Search by name" value={Search.get("search")?Search.get("search"):''} onChange={searchChange}/>
                                    <div className="input-group-append">
                                        <span className="input-group-text bg-transparent text-primary pl-2">
                                            <a className="btn p-0" href={``}><FontAwesomeIcon icon={faSearch}/></a>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <Form>
                                    <Form.Group>
                                        <Form.Select className="bg-primary text-white" onChange={sortChange}>
                                            <option>Sort By</option>
                                            <option value={"price desc"}>Heigh Price</option>
                                            <option value={"price asc"}>Low Price</option>
                                            
                                        </Form.Select>
                                    </Form.Group>
                                </Form>
                                
                                
                            </div>
                        </div>
                    </div>
                        {products.length>0 && products[0].id===""?<div className="d-flex justify-content-center"><BounceLoader height={10} color="blue"/></div>:
                        products.map(product=>(
                            <Product key={product.id} Product={product} col={4}/>
                        ))}
                    
                    
                    <div className="col-12 pb-1">
                        <nav aria-label="Page navigation">
                          <ul className="pagination justify-content-center mb-3">
                            <li className="page-item disabled">
                              <a className="page-link" href="#" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span className="sr-only">Previous</span>
                              </a>
                            </li>
                            <li className="page-item"><Link className="page-link" to={`/shop/page/1?${Search.toString()}`}>1</Link></li>
                            {page.number>2?<li className="page-item"><Link className="page-link" to={`/shop/page/${page.number-1}?${Search.toString()}`}>{page.number-1}</Link></li>:null}
                            {page.number!==1?<li className="page-item"><Link className="page-link"to={`/shop/page/${page.number}?${Search.toString()}`}>{page.number}</Link></li>:null}
                            {page.number<page.total?<li className="page-item"><Link className="page-link"to={`/shop/page/${page.number+1}?${Search.toString()}`}>{page.number+1}</Link></li>:null}
                            {page.number<page.total-1?<li className="page-item"><Link className="page-link"to={`/shop/page/${page.total}?${Search.toString()}`}>{page.total}</Link></li>:null}
                            
                            
                            <li className="page-item">
                              <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span className="sr-only">Next</span>
                              </a>
                            </li>
                          </ul>
                        </nav>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    </React.Fragment>

}
export default Shop