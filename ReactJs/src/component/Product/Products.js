import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye } from "@fortawesome/free-solid-svg-icons"
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"
import { result } from "lodash"
import { toast } from "react-toastify"
const Product=(props)=>{
    
    const navigate = useNavigate()

    const AddProductToCart=async(id)=>{
        if(localStorage.getItem("token") && localStorage.getItem("auth")){
            try{
                await axios.post(`http://localhost:8080/addProductToCart/${id}`,null,{headers:{
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

                
            }catch(e){
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
            }
            
        }else{
            navigate("/login")
            /*<button onClick={()=>AddProductToCart(props.Product.id)} className="btn btn-sm text-dark p-0"><FontAwesomeIcon className="text-primary mr-1" icon={faShoppingCart}></FontAwesomeIcon>Add To Cart</button>*/ 
        }
        

    }
    
    
    return <div className={`col-lg-${props.col} col-md-6 col-sm-12 pb-1`}>
    <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
            <img className="img-fluid w-100" src={`data:image/jpeg;base64,${props.Product.image}`} alt="" style={{height:"240px"}}/>
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
            <h6 className="text-truncate mb-3">{props.Product.name}</h6>
            <div className="d-flex justify-content-center">
                <h6>Dhs {props.Product.price}</h6> <h6 className="text-muted ml-2"><del></del></h6>
            </div>
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
            <a href={`/product/${props.Product.id}/details`} className="btn btn-sm text-dark p-0"><FontAwesomeIcon className="text-primary mr-1" icon={faEye}/>View Detail</a>
            
        </div>
    </div>
</div>
}
export default Product