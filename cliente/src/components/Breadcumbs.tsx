import { Link } from "react-router-dom"
import { MdKeyboardArrowRight} from "react-icons/md"

type BreadcrumbsProps = {

    links: {
    href: string,
    label: React.ReactNode,
    }[];
};


export function Breadcrumbs( { links } : BreadcrumbsProps){

    return (<div className="flex flex-row items-center">
        {links.map((link, index) => (
            
           <div key={index} className="flex flex-row items-center"> 
           <Link to={link.href} className="text-blue-400 hover:text-blue-500 hover:underline">
                    {link.label}</Link>
           {index <links.length -1 && (
                 <MdKeyboardArrowRight/> )}
            </div>
        ))}
        </div>
    );
}   