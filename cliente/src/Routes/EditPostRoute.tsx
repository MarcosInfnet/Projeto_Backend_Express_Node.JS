import { useParams, useNavigate } from "react-router-dom"
import { Card } from "../components/Card"; 
import { Button } from "../components/Button"; 
import { ErrorMsg } from "../components/ErrorMsg"; 
import { PostSchema } from "../postSchema"; 
import { useZorm } from "react-zorm";
import { api } from "../api";
import { useEffect, useState } from "react";
import toast from "react-simple-toasts";
import { Breadcrumbs } from "../components/Breadcumbs";

const text = {

title: "Editar publicação",
contentPlaceholder: "Digite sua publicação",
buttonSubmit: "Enviar",
submitSuccess: "Sua publicação foi editada com sucesso!",
submitFail:"Hove um erro ao editar sua publicação!",
};

const initialPost = {
    id: 0,
    created_at:"",
    content:"",
    };


export function EditPostRoute() {
    const params = useParams();
    const navigate = useNavigate();
    const [initialFormState, setInitialFormState] = useState(initialPost);

    const zo =useZorm("edit-post", PostSchema, {
        async onValidSubmit(event) {
            event.preventDefault();
            const response = await api.put(`/posts/ ${params.id}`, event.data);
            if(response.data.id) {
                toast(text.submitSuccess);  
                navigate(`/ver-publicação/ ${params.id}`);
            } else{
                toast(text.submitFail);  
            }

        },
    });
 
    async function loadPost() {
        const response = await api.get(`/posts/${params.id}`);
        setInitialFormState(response.data);
    }

    useEffect(() => {
        loadPost();
    },[params.id]);


    return (
    
    <Card className="p-1 bg-amber-100 my-1 md:max-w-screen-md md:mx-auto rounded-lg shadow flex flex-col"> 
            <Breadcrumbs links={[
                {href: '/', label:'Home'},
                {href:`/ver-publicação/${params.id}`, label:`Ver-publicação/#${params.id}`},
                {href:`/editar-publicação/${params.id}`, label:`Editar-publicação/#${params.id}`}
            ]}/>
            <div className="flex relative flex-col">
                <div className="font-bold uppercase mb-4 text-center text-3xl">{text.title} #{params.id}</div>
                <form ref={zo.ref}>
                    <textarea 
                        className= "m-1 rounded-md px-2 py-1 border focus:border-green-500 outline-none w-full"
                        placeholder={text.contentPlaceholder}
                        name={zo.fields.content()}
                        defaultValue={initialFormState.content}
                        />
                        {zo.errors.content(error =>(<ErrorMsg>{error.message}</ErrorMsg>))}
                    <Button type="submit">{text.buttonSubmit}</Button>
                </form>
            </div>
            </Card>
        );

}

