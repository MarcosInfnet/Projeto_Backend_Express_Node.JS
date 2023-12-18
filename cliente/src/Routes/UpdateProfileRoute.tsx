import {Button} from "../components/Button";
import { api } from "../api";
import { useState , useEffect} from 'react';
import { TextField } from "../components/TextField";
import { useGlobalStore } from "../useGlobalStore";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";



export function UpdateProfileRoute(){
    const user = useGlobalStore((state) => state.user);
    const setUser = useGlobalStore((state) => state.setUser);
    const navigate = useNavigate();

    const [name, setName] = useState(user.first_name);
    const [surname, setSurname] = useState(user.last_name);
    const [email, setEmail] = useState(user.email);
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");


    useEffect(() =>{
        setName(user.first_name);
        setSurname(user.last_name);
        setEmail(user.email);

    },[user])


async function onSubmit(event: React.FormEvent<HTMLFormElement>){
 event.preventDefault();
 const user = {
    first_name: name,
    last_name: surname,
    email,
    // password,
 };

 const response = await api.patch('/users/update-myself', user);
 if(response !== undefined) {
    setUser(response.data);
    toast('Perfil alterado com sucesso!');
    navigate('/usuario');
 }

}

    return (
        <form className=" bg-sky-200 flex flex-col py-1 my-6 max-w-screen-md md:mx-auto rounded-md gap-2" noValidate onSubmit={onSubmit}>
            <h1 className="text-gray-600 font-bold uppercase  text-4xl text-center mb-2">Atualizar perfil</h1>
            <TextField valor={name} quandoMudar={setName} textoPadrao="Nome" />
            <TextField valor={surname} quandoMudar={setSurname} textoPadrao="Sobrenome"/>
            <TextField valor={email} tipo="email" quandoMudar={setEmail} textoPadrao="Email"/>
            {/* <TextField valor={password} tipo="pasword" quandoMudar={setPassword} textoPadrao="Password"/> */}
            <Button type="submit" className="bg-sky-500 hover:bg-sky-600 w-28 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1">Alterar perfil</Button>
        </form> 
    )
    
}