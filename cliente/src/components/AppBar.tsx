import { SlNotebook as Logo} from 'react-icons/sl';
import { TiHomeOutline as HomeIcon} from 'react-icons/Ti';
import {LinkButton} from "./LinkButton";
import { Link } from 'react-router-dom';

export function AppBar() {
 
  return (
  <header className="bg-gray-100 p-3 shadow-lg flex flex-row justify-between">
    <div className='flex flex-row items-center gap-2' >
        <Link to="/" title='Orkut'>
            <img alt='Orkut' src="/orkut.svg" style={{height:"20px",}} />
        </Link>
       
        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold hidden md:block'>
            Pagina Inicial
        </Link>
        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold'>
            <HomeIcon className='text-blue-400 text-2xl 2xl:hidden xl:hidden lg:hidden md:visible'/>
        </Link>
    </div>
    <div>
    <LinkButton to="/criar-publicação" className='bg-blue-400 hover:bg-blue-650 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Criar publicação</LinkButton>
    </div>
  </header>

  );
}


