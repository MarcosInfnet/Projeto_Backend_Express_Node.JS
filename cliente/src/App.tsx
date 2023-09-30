import {AppBar} from "./components/AppBar";
import {HomeRoute} from "./Routes/HomeRoute";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {CreatePostRoute} from "./Routes/CreatePostRoute";
import {ViewPostRoute} from "./Routes/ViewPostRoute";
import { EditPostRoute } from "./Routes/EditPostRoute";


export default function App() {
  return (
    <BrowserRouter>  
    <div>
       <AppBar/>
        <Routes>
          <Route path="/" element={<HomeRoute/>} />
          <Route path="/criar-publicação" element={<CreatePostRoute/>} />
          <Route path="/ver-publicação/:id" element={<ViewPostRoute/>} />
          <Route path="/editar-publicação/:id" element={<EditPostRoute/>} />
        </Routes>
    </div>
  </BrowserRouter>
  ); 
}
