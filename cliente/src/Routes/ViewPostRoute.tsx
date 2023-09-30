import { useParams, useNavigate } from "react-router-dom";
import { useEffect , useState } from "react";
import { api } from "../api";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import toast from "react-simple-toasts";
import { LinkButton } from "../components/LinkButton";
import { Breadcrumbs } from "../components/Breadcumbs";

const initialPost = {
id: 0,
content:"",
created_at:"",
};





export function ViewPostRoute() {
    const params = useParams();
    const [post, setPost] = useState(initialPost);
    const navigate = useNavigate();

    async function loadPost() {
   
        const response = await api.get(`/posts/${params.id}`);
        const nextPost = response.data;
        setPost(nextPost);
    }

    async function deletePost() {
        const response = await api.delete(`/posts/${params.id}`);  
        if(response.data.id) {
            toast(`A publicação #${post.id} foi deletada com sucesso!`);
            navigate("/");
        } else {
            toast(`Houve um erro ao deletar a publicação!`);
        }
        
        
    }

    useEffect(() => {
        loadPost();
    },[]);

    return (

        <Card className="my-17 md:max-w-screen-md md:mx-auto flex relative flex-col">
            <Breadcrumbs links={[
                {href: '/', label:'Home'},
                {href:`/ver-publicação/${params.id}`, label:`/ver-publicação/#${params.id}`}

            ]}/>
            <span className="text-gray-500 mb-1">#{post.id}</span>
            <div className="text-gray-500 font-bold mb-1"> {new Date(post.created_at).toLocaleDateString()}</div>
            <p className="pb-12">{post.content}</p>
            
            <Button className="bg-red-500 hover:bg-red-600 w-20 flex absolute -bottom-0 right-6" onClick= {deletePost}>Deletar</Button>
            <LinkButton to ={`/editar-publicação/${params.id}`} className="bg-orange-500 hover:bg-orange-600 w-20 flex absolute -bottom-0 right-28">Editar</LinkButton>
            <div className = " text-gray-500 mb-2" >#{post.id}</div>
            <div className = "text-gray-500">{new Date(post.created_at).toLocaleDateString()}</div>
            <p>{post.content}</p>
        </Card>

    );}