type CardProps = {
    children: React.ReactNode;
    className?: string;
}


export function Card({children, className =""}: CardProps){

    return <div className={`bg-amber-200 my-10 rounded-lg shadow p-3 ${className}`} >
        {children}

    </div>


}