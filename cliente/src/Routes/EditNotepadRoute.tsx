import { useParams, useNavigate } from "react-router-dom"
import { Card } from "../components/Card"; 
import { Button } from "../components/Button"; 
import { ErrorMsg } from "../components/ErrorMsg"; 
import { notepadSchema } from "../notepadSchema"; 
import { useZorm } from "react-zorm";
import { api } from "../api";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Breadcrumbs } from "../components/Breadcumbs";

const text = {

title: "Editar notepad",
titlePlaceholder: "Editar o titulo",
subtitlePlaceholder: "Editar o subtitulo",
contentPlaceholder: "Editar o conteudo",
buttonSubmit: "Enviar",
submitSuccess: "O notepad foi editado com sucesso!",
submitFail:"Hove um erro ao editar o notepad!"
}

const initialNotepad = {
    id: 0,
    createdAt:"",
    creator:"",
    title:"",
    subtitle:"",
    content:"",
    };


export function EditNotepadRoute() {
    const params = useParams();
    const navigate = useNavigate();
    const [InitialFormState, setInitialFormState] = useState(initialNotepad);

    const zo =useZorm('edit-notepad', notepadSchema, {
        async onValidSubmit(event) {
            event.preventDefault();
            const response = await api.patch(`/notepads/ ${params.id}`, event.data);
            if(response.data.id=== true) {
                toast(text.submitSuccess);
                navigate(`/ver-notepad/ ${params.id}`);
            } else{
                toast(text.submitFail);  
            }

        },
    });
   
    async function loadNotepad() {
   
        const response = await api.get(`/notepads/${params.id}`);
        setInitialFormState(response.data);
    }

    useEffect(() => {
        loadNotepad();

    },[]);


    return <Card className="p-1 bg-amber-100 my-1 md:max-w-screen-md md:mx-auto rounded-lg shadow flex flex-col"> 
            <Breadcrumbs links={[
                {href: '/', label:'Home'},
                {href:`/ver-notepad/${params.id}`, label:`/ver-notepad/#${params.id}`},
                {href:`/editar-notepad/${params.id}`, label:`/editar-notepad/#${params.id}`}
            ]}/>
            <div className="flex relative flex-col">
                <div className="font-bold uppercase mb-4 text-center text-3xl">{text.title} #{params.id}</div>
                <form ref={zo.ref}>
                    <input 
                        type="text" 
                        className="m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none w-full"
                        placeholder={text.titlePlaceholder}
                        name={zo.fields.title()}
                        defaultValue={InitialFormState.title}
                        />
                        {zo.errors.title(error =>(<ErrorMsg>{error.message}</ErrorMsg>))}
                    <input 
                        type="text" 
                        className= "m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none resize-none w-full"
                        placeholder={text.subtitlePlaceholder}
                        name={zo.fields.subtitle()}
                        defaultValue={InitialFormState.subtitle}
                        />
                        {zo.errors.subtitle(error =>(<ErrorMsg>{error.message}</ErrorMsg>))}
                    <textarea 
                        className= "m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none w-full"
                        placeholder={text.contentPlaceholder}
                        name={zo.fields.content()}
                        defaultValue={InitialFormState.content}
                        />
                        {zo.errors.content(error =>(<ErrorMsg>{error.message}</ErrorMsg>))}
                    <Button type="submit">{text.buttonSubmit}</Button>
                </form>
            </div>
            </Card>;
}