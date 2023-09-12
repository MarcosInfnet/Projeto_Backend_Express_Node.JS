export type ErrorMsgProps = {
    children: React.ReactNode;
    className?: string;
};


export function ErrorMsg({children,className =''}: ErrorMsgProps) {

    return <span className={`text-sm leading-none text-red-500 uppercase font-bold ${className}`}>{children}</span>

}