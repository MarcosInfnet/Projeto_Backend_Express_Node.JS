import express from "express"; //Habilita o express na no Node.js
import cors from "cors"; //
import { notepadController } from "./notepad/notepad.controller.mjs"; // Resp. por importar a camada de controle quer fará a comunicação entre FE e BE.


const port = 8080; // Porta a ser utilizada no FE que o BE estará checando
const host = "localhost"; // Host utilizado no FE que o BE estará checando
const app = express(); // Alocar uma instancia do express

function creatorNotepad(req, res) {
    if(req.body.creator !== 'Marcos' || "Eduardo" || "Felipe" ||"Wesley"||"Charles" || "Patrick" ) {
        return res.end("Criador não autorizado");
    }
      else {next();}
    };

app.use(cors({origin: "http://localhost:5173"}));   // Middleware usado para ativar omecanismo de segurança (same-origin)
app.use(express.json());                           // Middleware usado para automaticamente converter o dados JSON para um objeto JavaScript
app.use("/notepads/criar-notepad", creatorNotepad);
app.use("/notepads", notepadController);          // Middleware usado para funcionar como um "router", quando no FE chamamos "/notepads". No BE, este middleware, recebe a chamada do FE e roteia pra função correta no "notepad.controller"


app.listen(port, host, () => {
    console.log(`Servidor express iniciado em http://${host}:${port}`);
}); // Função responsavel por configurar a host & port que fará comunicação BE & FE
