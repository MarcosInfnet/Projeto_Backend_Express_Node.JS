import { SlNotebook as Logo} from 'react-icons/sl';
import { TiHomeOutline as HomeIcon} from 'react-icons/Ti';
import {LinkButton} from "./LinkButton";

import { Link } from 'react-router-dom';

export function AppBar() {
 
  return (
  <header className="bg-gray-100 p-3 shadow-lg flex flex-row justify-between">
    <div className='flex flex-row items-center gap-2'>
        <Link to="/">
            <Logo className="text-black text-2xl"/>
        </Link>
        <h1 className="text-gray-700 text-xl font-bold uppercase">Treads</h1>
        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold hidden md:block'>
            Pagina Inicial
        </Link>
        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold'>
            <HomeIcon className='text-blue-400 text-2xl 2xl:hidden xl:hidden lg:hidden md:visible'/>
        </Link>
    </div>
    <div>
    <LinkButton to="/criar-notepad" className='bg-green-800 hover:bg-green-950 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Criar notepad</LinkButton>
    </div>
  </header>

  );
}


