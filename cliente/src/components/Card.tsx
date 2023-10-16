type CardProps = {
    children: React.ReactNode;
    className?: string;
}


export function Card({children, className =""}: CardProps){

    return <div className={`bg-sky-200 my-10 rounded-lg shadow p-3 ${className}`} >
        {children}

    </div>


}