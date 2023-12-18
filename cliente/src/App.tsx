import {AppBar} from "./components/AppBar";
import {HomeRoute} from "./Routes/HomeRoute";
import {BrowserRouter,Routes, Route } from 'react-router-dom';
import {CreatePostRoute} from "./Routes/CreatePostRoute";
import {ViewPostRoute} from "./Routes/ViewPostRoute";
import { EditPostRoute } from "./Routes/EditPostRoute";
import { ProfileRoute } from "./Routes/ProfileRoute";
import { SingInRoute } from "./Routes/SingInRoute";
import { LoadUser } from "./components/LoadUser";
import { UserAccountRoute } from "./Routes/UserAccountRoute";
import { SingUpRoute } from "./Routes/SingUpRoute";
import { UpdateProfileRoute } from "./Routes/UpdateProfileRoute";

export default function App() {



  return (
    <BrowserRouter>  
    <div>
       <LoadUser/>
       <AppBar/>
        <Routes>
          <Route path="/" element={<HomeRoute/>} />
          <Route path="/usuario" element={<UserAccountRoute/>} />
          <Route path="/criar-publicação" element={<CreatePostRoute/>} />
          <Route path="/ver-publicação/:id" element={<ViewPostRoute/>} />
          <Route path="/editar-publicação/:id" element={<EditPostRoute/>} />
          <Route path="/perfil/:id" element={<ProfileRoute/>} />
          <Route path="/entrar" element={<SingInRoute/>} />
          <Route path="/criar-conta" element={<SingUpRoute/>} />
          <Route path="/atualizar-perfil" element={<UpdateProfileRoute/>} />
        </Routes>
    </div>
  </BrowserRouter>
  ); 
}
