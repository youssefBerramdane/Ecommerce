import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import style from "./AddCategorie.module.css"
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCategorie=()=>{
    const [name,setName]=useState('');
    const [image,setImage]=useState(undefined);
    const navigate=useNavigate();
  
    const sendData=async(name,image)=>{
        const form=new FormData();
        form.append("name",name);
        form.append("image",image)
        try{
            axios.post("http://localhost:8080/categorie/new",form).then(result=>{
                
                toast.success(result.data, {
                  position: "bottom-left",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "colored",
                  });
                 navigate("/")
                
            })
        }catch(e){

        }
        
    }
    const AddCategorie=(e)=>{
        e.preventDefault();
        sendData(name,image);
    }
    const namechange=(e)=>{
        setName(e.target.value)
    }
    const imagechange=(e)=>{
        setImage(e.target.files[0])
    }

    return <div>
    <Form className={style.form}>
    <Form.Group className="mb-4" controlId="formBasicName">
      <Form.Label>Categorie Name</Form.Label>
      <Form.Control type="text" placeholder="Categorie name" onChange={namechange} value={name}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicFile">
      <Form.Label>Image</Form.Label>
      <Form.Control type="file" onChange={imagechange} />
    </Form.Group>
    <Button  type="submit" onClick={AddCategorie}>
      Submit
    </Button>
  </Form>
  
</div>
}
export default AddCategorie;