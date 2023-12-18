import { Link } from 'react-router-dom';

type KudosProps = {
    to?: any;
    className?: string;

}


export function Kudos({to="", className =""}: KudosProps){

  
    
return (
<div>
    <Link to={`/ver-publicação/${to}`} className="bg-pink-400 hover:bg-pink-500 w-28 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1 cursor-pointer" 
    >
        Visualizar
    </Link>

</div>
    )}