import axios from "axios";
import { useEffect, useState } from "react";
import Categorie from "../Categorie/Categorie";

const SomeCategorie=()=>{

    const [categories,setCategories]=useState([{id:'',name:'',image:''}])

    useEffect(()=>{
        loadCategories();
    },[])
    const loadCategories=async()=>{
        try{
            axios.get("http://localhost:8080/categorie/somecategorie").then(response=>{
                setCategories(response.data)
            })
        }catch(e){

        }
        
    }
    return <div className="container-fluid pt-5">
    <div className="row px-xl-5 pb-3">
       {categories.map(categorie=>(<Categorie key={categorie.id} Categorie={categorie}/>))}
       
        </div>
        </div>
}
export default SomeCategorie;