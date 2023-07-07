import { useState } from "react"

const useInput=(valid)=>{
    const [inputvalue,setinputvalue]=useState('');
    const [validvalue,setValidvalue]=useState();

    const inputvalueChange=(e)=>{
        setinputvalue(e.target.value);
        setValidvalue(valid(e.target.value));
    }

    const inputvalueBlur=()=>{
        setValidvalue(valid(inputvalue))
    }

    const resetinput=()=>{
        setinputvalue("");
        setValidvalue();
    }
    return {
        value:inputvalue,
        valid:validvalue,
        valueChange:inputvalueChange,
        valueBlur:inputvalueBlur,
        valueReset:resetinput
    }
}
export default useInput