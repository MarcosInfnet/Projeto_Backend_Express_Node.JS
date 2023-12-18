import { useState, useEffect } from "react";
import {api} from "../api";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";


const initialPostsList = {
    count: 0,
    posts:[],
};
const initialSearch = " ";
const initialOrder = "desc";

export function HomeRoute(){
const [ postsList , setPostsList ] = useState(initialPostsList);
const [ search , setSearch] = useState(initialSearch);
const [order , setOrder] = useState(initialOrder);

async function loadPosts(){
    const response = await api.get(`/posts` , {params: {search, order: order },});
    const nextPosts = response.data;
    setPostsList(nextPosts);
}

    useEffect(() => {
        loadPosts();
    },[]);

    useEffect(() => {
        loadPosts();
    },[search , order ]);


    return( <header className="flex flex-col justify-between max-w-screen-md md:mx-auto" >
    
    <Card className ={'p-1 bg-amber-100 my-1 md:max-w-screen-md md:mx-auto rounded-lg shadow '}>
        <div className="flex">
            <input  type="search" placeholder="Pesquisa do orkut..." className="flex-1 border-blue-500 focus:border-pink-600 rounded-lg mr-2 border-2 outline-none" 
            value={search} onChange={(event) =>setSearch(event.target.value)}/>
            <select className="flex-2 bg-white border-blue-500 rounded-lg border-2" onChange={(event) =>setOrder(event.target.value)}>
                <option value="desc">Mais recentes</option>
                <option value="asc">Mais antigas</option>
            </select>

        </div>
        {postsList.posts.length === 0 && 'Nenhum resultado encontrado'}
        {postsList.posts.map((post) => {
        
        return (
        <div key={post.id} className={'flex relative flex-col my-4 border-b'}> 
            <div   className="flex items-center gap-1 ">
            <Link to={`/perfil/${post.user_id}`}>
                <img src={post.users.avatar}alt={`Foto de ${post.users.first_name} ${post.users.last_name}`} className="w-[48px] h-[48px] rounded-full" />
              </Link>
              <div className="flex flex-col"> 
                <Link to={`/perfil/${post.user_id}`} className="text-blue-600 hover:text-blue-800 hover:underline font-bold">
                  {post.users.first_name} {post.users.last_name}
                </Link>
                <span className="text-sm text-gray-500"> {new Date(post.created_at).toLocaleDateString()} </span>
              </div>
            </div>
            <Link to={`/ver-publicação/${post.id}`} className="cursor-pointer block" >
              <p>{post.content}</p>
            </Link>

        </div>
       );})}

    </Card>
    </header>
    );
    }




