import {Button} from "../components/Button";
import { api } from "../api";
import { ErrorMsg } from "../components/ErrorMsg";
import { notepadSchema } from "../notepadSchema";
import { useZorm } from "react-zorm";
import toast from "react-simple-toasts";
import { useNavigate } from "react-router-dom";

export function CreateNotepadRoute(){
const navigate = useNavigate();
const zo =useZorm('create-notepad',notepadSchema, {
    async onValidSubmit(event){
        event.preventDefault();
        const response = await api.post('/notepads', event.data);
        if(response.data.id=== true) {
            toast(`Seu notepad foi enviado com sucesso!`);
            navigate('/');
        } else{
            toast(`Hove um erro ao enviar seu notepad!`);  
        }
    },
});





return (
    <form ref={zo.ref} className=" bg-amber-100 flex flex-col py-1 my-1 max-w-screen-md md:mx-auto rounded-md gap-2">
                <h1 className="text-gray-600 font-bold uppercase  text-4xl text-center mb-2">Criar notepad</h1>
                <div className="flex flex-col">
                    <input type="text" 
                        placeholder="Digite o titulo"
                        className={`m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none ${zo.errors.title('border-red-400 focus:border-red-600')}`}
                        name={zo.fields.title()}/>
                        {zo.errors.title((error) =>(
                            <ErrorMsg className="px-2">{error.message}</ErrorMsg>
                        ))}
                </div>
                <div className="flex flex-col">
                    <input type="text" 
                        placeholder="Digite o nome criador da anotação"
                        className={`m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none ${zo.errors.creator('border-red-400 focus:border-red-600')}`}
                        name={zo.fields.creator()}/>
                </div>
                <div className="flex flex-col">
                <input type="text" 
                       placeholder="Digite o subtitulo"
                       className={`m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none ${zo.errors.subtitle('border-red-400 focus:border-red-600')}`}
                       name={zo.fields.subtitle()}/>
                       {zo.errors.subtitle((error) =>(
                       <ErrorMsg className="px-2">{error.message}</ErrorMsg>
                       ))}
                </div>
                <div className="flex flex-col">
                <textarea 
                        placeholder="Digite o conteudo"
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



