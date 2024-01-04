import { useGlobalStore } from "../useGlobalStore";
import { api } from "../api";
import { FriendsCard } from "../components/FriendsCard";
import { ProfileCard } from "../components/ProfileCard";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";
import { useState , useEffect } from "react";


type Scrap = {
id: string,
message: string,
ownerId: number,
creatorId: number,
}

// type Hobby = {
//   id: string,
//   message: string,
//   ownerId: number, 
// }

const initialScraps : Scrap[] =[]
// const initialHobbies : Hobby[] =[]

export function UserAccountRoute(){
   const user = useGlobalStore((state) => state.user);
   const setUser = useGlobalStore((state) => state.setUser);
   const [scraps , setScraps] = useState(initialScraps);
  //  const [hobbies , setHobbies] = useState(initialHobbies);

   async function onAvatarUpload(event : React.ChangeEvent<HTMLInputElement>){
    const [avatar] = event.target.files;
    const formData = new FormData();
    formData.append("avatar" , avatar);
    const request = await api.post("/users/avatar" , formData);
    const user = request.data;
    setUser({...user , avatar: user.avatar.concat(`valorParaRefresh=${Math.random()}`),});
   }
   
   async function loadScraps() {
    const response = await api.get(`/scraps/owner/${user.id}`)
    const nextScraps = response.data;
    setScraps(nextScraps);
   }

  //  async function loadHobbies() {
  //   const response = await api.get(`/hobbies/owner/${user.id}`)
  //   const nextHobbies = response.data;
  //   setHobbies(nextHobbies);
  //  }

   useEffect(() =>{
    let intervalId : number;
    if(user.id !==0 && !intervalId) {
      intervalId = setInterval(loadScraps,5000);
    }
     return () => clearInterval(intervalId);
   },[user.id])


  //  useEffect(() =>{
  //   if(user.id !==0){
  //     loadHobbies(); 
  //   }
  //  },[user.id])
   
    return (
        <div className="flex flex-col lg:flex-row gap-2 m-2 sm:mx-auto max-w-screen-sm lg:max-w-screen-lg lg:mx-auto">
          <div className="lg:max-w-[192px]">
            <AvatarCard {...user} onAvatarUpload={onAvatarUpload}/>
          </div>
          <div className="flex flex-col">
          <div className=" flex flex-row text-2xl font-bold">
          <ProfileCard {...user} />
        </div>
        <div className="flex flex-row wrap gap-1">
        <Card>
          <ul>
            {scraps.map((scrap) =>(
            <li key = {scrap.id}>{scrap.message}</li>))}
            
          </ul>
        </Card>
        {/* <Card>
          <ul>
            {hobbies.map((hobby) =>(
            <li key = {hobby.ownerId}>{hobby.message}</li>))}
          </ul>
        </Card> */}
        </div>
        </div>
          <div className="lg:max-w-[256px]">
          <FriendsCard {...user} />
        </div>
    </div>
   );
}  

export function AvatarCard({ id, avatar, first_name, last_name , onAvatarUpload}) {
    return (
      <Card>
        <form>
        <input type="file" accept="image/jpeg" id="avatar" className="hidden" onChange= {onAvatarUpload}/>
       </form>
       <label htmlFor="avatar" className="cursor-pointer">
        <img src={avatar} alt={`Foto de ${first_name}`}  />
        </label>
        <Link
          to={`/perfil/${id}`}
          className="text-blue-600 hover:text-blue-800 hover:underline font-bold"
        >
          {first_name} {last_name} 
        </Link>
      </Card>
    );
  }

  