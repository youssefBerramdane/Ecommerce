import { useEffect, useRef, useState } from 'react';
import style from './addproducts.module.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
const AddProducts=()=>{
    const nameRef=useRef();
    const priceRef=useRef();
    const quantityRef=useRef();
    const descriptionRef=useRef();
    const categorieRef=useRef();
    const [image,setImage]=useState();
    const [sizes,setSizes]=useState([]);
    const [colors,setColors]=useState([]);
    
    const imageChange=(e)=>{
        setImage(e.target.files[0])
    }

    const [categories,setCategories]=useState([{id:"",name:"",image:''}]);
    useEffect(()=>{
        loadCategories()
    },[]);

    const loadCategories=async()=>{
        await axios.get("http://localhost:8080/categorie/all").then(response=>{
            setCategories(response.data)
        })
    }
    const Addpost=(e)=>{
        e.preventDefault();
        sendData(nameRef.current.value,priceRef.current.value,quantityRef.current.value,descriptionRef.current.value,categorieRef.current.value,image,colors,sizes)
    }

    const sendData=(name,price,quantity,description,categorie,image,color,sizes)=>{
        const form  =new FormData();
        form.append("name",name);
        form.append("description",description)
        form.append("price",price)
        form.append("quantity",quantity)
        form.append("CatId",categorie)
        form.append("image",image)
        form.append("colors",color)
        form.append("sizes",sizes)
       
        axios.post("http://localhost:8080/newproduct",form).then(response=>{
            console.log(response)
        })
    }
    const sizechange=(e)=>{
        if(e.target.checked){
          setSizes(sizes.concat(e.target.value))
        }else{
          const newSizes=sizes.filter(size=>(
            size!==e.target.value
          ))
          setSizes(newSizes)
        }
    }
    const colorchange=(e)=>{
        if(e.target.checked){
          setColors(colors.concat(e.target.value))
        }else{
          const newcolors=colors.filter(color=>(
            color!==e.target.value
          ))
          setColors(newcolors)
        }
    }

    return <Form className={style.form} >
    <Form.Group className="mb-4" controlId="formBasicName">
      <Form.Label>Product Name</Form.Label>
      <Form.Control type="text" placeholder="Product name" ref={nameRef}/>
    </Form.Group>
    <Form.Group className="mb-4" controlId="formBasicName">
      <Form.Label>Product Price</Form.Label>
      <Form.Control type="number" placeholder="Product price" ref={priceRef}/>
    </Form.Group>
    <Form.Group className="mb-4" controlId="formBasicName">
      <Form.Label>Product Quantity</Form.Label>
      <Form.Control type="number" placeholder="Product Quantity" ref={quantityRef}/>
    </Form.Group>
    <Form.Group className="mb-4" controlId="formBasicName">
      <Form.Label>Product Description</Form.Label>
      <Form.Control type="text" placeholder="Product Description" ref={descriptionRef}/>
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicFile">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file"  onChange={imageChange} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicSelect">
      <Form.Label>Catgorie</Form.Label>
      <Form.Select aria-label="Select Categorie" ref={categorieRef}>
        {categories.map(categorie=>(
            <option key={categorie.id} value={categorie.id}>{categorie.name}</option>
        ))}
    </Form.Select>
    </Form.Group>
    <Form.Group className="mb-0 d-flex justify-content-around" controlId="formBasicChek">
      <Form.Label>Sizes</Form.Label>
      {['XS','S','M','L','XL'].map(size=>(
        <Form.Check key={size} type='checkbox' value={size} id='' label={size} onChange={sizechange}/>
      ))}
      
    </Form.Group>
    <Form.Group className=" d-flex justify-content-around" controlId="formBasicChek">
      <Form.Label>Colors</Form.Label>
      {['Black','White','Green','Blue','Red'].map(color=>(
        <Form.Check key={color} type='checkbox' value={color} id='' label={color} onChange={colorchange}/>
      ))

      }
      
    </Form.Group>
    
    <Button  type="submit" onClick={Addpost} >
      Submit
    </Button>
  </Form>
}
export default AddProducts;