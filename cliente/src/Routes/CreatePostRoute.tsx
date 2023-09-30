import {Button} from "../components/Button";
import { api } from "../api";
import { ErrorMsg } from "../components/ErrorMsg";
import { postSchema } from "../postSchema";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";

export function CreatePostRoute(){
const navigate = useNavigate();
const zo =useZorm('create-post',postSchema, {
    async onValidSubmit(event){
        event.preventDefault();
        const response = await api.post('/posts', event.data);
        if(response.data.id) {
            toast(`Seu post foi criado com sucesso!`);
            navigate('/');
        } else{
            toast(`Hove um erro ao criar seu post!`);  
        }
    },
});





return (
    <form ref={zo.ref} className=" bg-amber-100 flex flex-col py-1 my-1 max-w-screen-md md:mx-auto rounded-md gap-2">
                <h1 className="text-gray-600 font-bold uppercase  text-4xl text-center mb-2">Criar publicação</h1>
                <div className="flex flex-col">
                <textarea 
                        placeholder="Digite a sua publicação"
                        className={`m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none ${zo.errors.content('border-red-400 focus:border-red-600')}`}
                        rows={3}
                        name={zo.fields.content()}/>
                        {zo.errors.content((error) =>(
                        <ErrorMsg className="px-2">{error.message}</ErrorMsg>
                        ))}
                </div>
                <Button className="bg-sky-700 hover:bg-sky-800 w-28 text-slate-50 uppercase py-1 px-2 rounded-md font-bold m-1">Enviar</Button>
    </form> 
) 
}



