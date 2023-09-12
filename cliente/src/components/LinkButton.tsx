import { Link } from "react-router-dom";


type LinkButtonProps ={
    children: string;
    className?: string;
    to: string; 
}
export function LinkButton({ children, className ='', to}: LinkButtonProps){

    return(
        <Link 
        to = {to}
        className={`bg-green-800 hover:bg-green-950 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1 ${className}`}>
        {children}
        </Link>)
}