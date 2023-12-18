// import { SlNotebook as Logo} from 'react-icons/sl';
import { TiHomeOutline as HomeIcon} from 'react-icons/Ti';
import {LinkButton} from "./LinkButton";
import { Link , useNavigate } from 'react-router-dom';
import { useGlobalStore } from '../useGlobalStore';
import { Button } from './Button';
import { TokenStorage } from '../tokenStorage';
import toast from 'react-simple-toasts';
import { useEffect} from "react";
import { globalNavigate } from '../GlobalNavigate';
import { FaSpinner } from 'react-icons/fa';

export function AppBar() {
  
  const user = useGlobalStore((state) => state.user);
  const setUser = useGlobalStore((state) => state.setUser);
  const isAuthorized = useGlobalStore((state) => state.isAuthorized);
  const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
  const isLoading = useGlobalStore((state) => state.isLoading);

  const navigate = useNavigate();
  useEffect(() => {
   globalNavigate.navigate = navigate;
  },[navigate]);



  function logout(){
    TokenStorage.removeToken()
    navigate('/entrar');
    toast(`Até mais, ${user.first_name}!`)
    setIsAuthorized(false);
    setUser({ 
      id:0,
      first_name:'',
      last_name:'',
      email:'',
      avatar:'',
    });
  }

  return (
  <header className="bg-gray-100 p-3 shadow-lg flex flex-row justify-between">
    <div className='flex flex-row items-center gap-2' >
        <Link to="/" title='Orkut'>
            <img alt='Orkut' src="/orkut.svg" style={{height:"20px",}} />
        </Link>
       
        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold hidden md:block'>
            Pagina Inicial
        </Link>

        {isLoading &&<FaSpinner className= "animate-spin text-2xl"/>} 
      </div>



        <Link to="/" className='text-blue-400 hover:text-blue-500 hover:underline font-bold'>
            <HomeIcon className='text-blue-400 text-2xl 2xl:hidden xl:hidden lg:hidden md:visible'/>
        </Link>
    

    {isAuthorized &&(
    <div className='flex flex-row items-center gap-3'>
    <LinkButton to="/criar-publicação" className='bg-blue-400 hover:bg-blue-650 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Criar publicação</LinkButton>
    <LinkButton to="/atualizar-perfil" className='bg-blue-400 hover:bg-blue-650 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Atualizar perfil</LinkButton>
      <Link to="/usuario" className='flex flex-row items-center gap-3'>
      {user.first_name} {user.last_name}
      <img src={user.avatar} className='w-12 h-12 rounded-full'/>
      </Link>
      <Button onClick={logout}>Sair</Button>
    </div>   
    )}

    {!isAuthorized &&(
      <div className='flex flex-row items-center gap-2'>
      <LinkButton to="/entrar" className='bg-blue-400 hover:bg-blue-650 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Entrar</LinkButton>
      <LinkButton to="/criar-conta" className='bg-blue-400 hover:bg-blue-650 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1' >Criar conta</LinkButton>
      </div>
    )}
    



  </header>

  );
}


