import { useState } from "react";
import { Link } from 'react-router-dom';

type KudosProps = {
    to?: any;
    className?: string;

}


export function Kudos({to="", className =""}: KudosProps){

    const [contador, setContador] =useState(0);
    
return (
<div>
    <input type="text" value={contador} className="w-4  bg-amber-100"/>
    <Link to={`/ver-notepad/${to}`} className="bg-sky-700 hover:bg-sky-800 w-28 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1 cursor-pointer" 
    
      onClick={()=> {
       
        setContador(contador +1);
      }}
    >
        Visualizar
    </Link>

</div>
    )}