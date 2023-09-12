
type ButtonProps ={
    type?: 'submit' | 'button' | 'reset';
    children: string;
    onClick?: () => void;
    className?: string;

}
export function Button({type, children, onClick, className =''}: ButtonProps){

    return(
        <button
        type= {type}
        onClick= {onClick}
        className={`bg-green-800 hover:bg-green-950 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1 ${className}`}
        >
        {children}
        </button>)
}