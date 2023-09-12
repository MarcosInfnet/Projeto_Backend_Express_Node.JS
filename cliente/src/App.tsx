import {AppBar} from "./components/AppBar";
import {HomeRoute} from "./Routes/HomeRoute";
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import {CreateNotepadRoute} from "./Routes/CreateNotepadRoute";
import {ViewNotepadRoute} from "./Routes/ViewNotepadRoute";
import { EditNotepadRoute } from "./Routes/EditNotepadRoute";


export default function App() {
  return (
    <BrowserRouter>  
    <div>
       <AppBar/>
        <Routes>
          <Route path="/" element={<HomeRoute/>} />
          <Route path="/criar-notepad" element={<CreateNotepadRoute/>} />
          <Route path="/ver-notepad/:id" element={<ViewNotepadRoute/>} />
          <Route path="/editar-notepad/:id" element={<EditNotepadRoute/>} />
        </Routes>
    </div>
  </BrowserRouter>
  ); 
}
