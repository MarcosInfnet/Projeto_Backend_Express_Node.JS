import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { TextField } from "../components/TextField";
import { useState } from "react";
import { api } from "../api";
import { TokenStorage } from "../tokenStorage";
import { useNavigate } from "react-router-dom";
import toast from "react-simple-toasts";
import { useGlobalStore } from "../useGlobalStore";



const  initialForm ={
    first_name:'',
    last_name:'',
    email:'',
    password:'',
};

export function SingUpRoute(){
    const [ form , setForm] = useState(initialForm);
    const setIsAuthorized = useGlobalStore((state) => state.setIsAuthorized);
    const setUser = useGlobalStore((state) => state.setUser);
    const navigate = useNavigate();


    async function submitForm(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault();
        const response = await api.post("/auth/sing-up",form);
        if(response === undefined) {
            return;
        }
        const {token, user } = response.data;
        TokenStorage.setToken(token);
        setIsAuthorized(true);
        setUser({
            id: user.id,
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            avatar:user.avatar,
        });
        navigate('/usuario');
        toast(`${user.first_name}, sua conta foi criada com sucesso!`);
    }
   

    return (<div className="flex align-center justify-center h-full w-full">
       <Card>
        <h2 className="text-center text-2xl mb-3">Criar conta</h2>
        <form onSubmit={submitForm} className="flex flex-col gap-2 w-full">
            <TextField valor={form.first_name} quandoMudar={first_name => setForm({...form,first_name})} textoPadrao ="Nome"/>
            <TextField valor={form.last_name} quandoMudar={last_name => setForm({...form,last_name})} textoPadrao ="Sobrenome"/>
            <TextField valor={form.email} quandoMudar={email => setForm({...form,email})} textoPadrao ="Email"/>
            <TextField valor={form.password} quandoMudar={(password) => setForm({...form,password})} textoPadrao ="Senha" tipo="password"/>
            <Button type="submit">Enviar formulário</Button>
        </form>
       </Card>

    </div>);
}