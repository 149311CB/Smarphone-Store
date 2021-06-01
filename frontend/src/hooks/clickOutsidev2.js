import {useEffect, useRef, useState} from "react";

export const useClickOutsidev2 =(initial=false) =>{
    const ref = useRef(null);
    console.log(ref)
    const [visible, setVisible] = useState(initial);
    console.log(visible)
    const handleClickOutside=(event)=>{
        if(ref.current && !ref.current.contains(event.target)) setVisible(false)
    }
    useEffect(() => {
        document.addEventListener("click",handleClickOutside,true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        };
    }, [ref]);

    return {visible,setVisible,ref}
}