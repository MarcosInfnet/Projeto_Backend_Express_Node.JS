import { useParams, useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { api } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcumbs";

const initialNotepad = {
id: 0,
creator:"",
title:"",
subtitle:"",
content:"",
createdAt:"",
};





export function ViewNotepadRoute() {
    const params = useParams();
    const [notepad, setNotepad] = useState(initialNotepad);
    const navigate = useNavigate();

    async function loadNotepad() {
   
        const response = await api.get(`/notepads/${params.id}`);
        const nextNotepad = response.data;
        setNotepad(nextNotepad);
    }

    async function deleteNotepad() {
        const response = await api.delete(`/notepads/${params.id}`);  
        if(response.data.id=== true) {
            toast(`O notepad #${notepad.id} foi deletado!`);
            navigate("/");
        } else {
            toast(`O notepad #${notepad.id} foi deletado!`);
        }
        
        
    }

    useEffect(() => {
        loadNotepad();
    },[]);

    return (

        <Card className="my-17 md:max-w-screen-md md:mx-auto flex relative flex-col">
            <Breadcrumbs links={[
                {href: '/', label:'Home'},
                {href:`/ver-notepads/${params.id}`, label:`/ver-notepads/#${params.id}`}

            ]}/>
            <span className="text-gray-500 mb-1">#{notepad.id}</span>
            <div className="text-gray-500 font-bold mb-1"> {new Date(notepad.createdAt).toLocaleDateString()}</div>
            <p className="text-gray-500 mb-1 ">{notepad.creator}</p>
            <h2 className="text-xl font-bold uppercase mb-1">{notepad.title}</h2>
            <p className="text-gray-500 mb-1 ">{notepad.subtitle}</p>
            <p className="pb-12">{notepad.content}</p>
            
            <Button className="bg-red-500 hover:bg-red-600 w-20 flex absolute -bottom-0 right-6" onClick= {deleteNotepad}>Deletar</Button>
            <LinkButton to ={`/editar-notepad/${params.id}`} className="bg-orange-500 hover:bg-orange-600 w-20 flex absolute -bottom-0 right-28">Editar</LinkButton>
        </Card>

    );}