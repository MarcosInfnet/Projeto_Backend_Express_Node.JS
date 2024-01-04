import 'reflect-metadata';
import {createExpressServer} from "routing-controllers" 
// import express from "express"; //Habilita o express na no Node.js
import { PostController } from "./post/post.controller"; // Resp. por importar a camada de controle quer fará a comunicação entre FE e BE.
import { UserController } from "./user/user.controller";
import { AuthController } from './auth/auth.controller';
import { FileController } from './file/file.controller';
import { ScrapController } from './scrap/scrap.controller';
import { HobbyController } from './hobby/hobby.controller';
import { authorizationChecker } from './auth/checkers/authorizationChecker';
import { currentUserChecker } from './auth/checkers/currentUserChecker';
import express from 'express';
import { setupMongoDb } from './mongodb';
setupMongoDb();

const port = 8080; // Porta a ser utilizada no FE que o BE estará checando
const host = "localhost"; // Host utilizado no FE que o BE estará checando
const app = createExpressServer({
cors: true,
controllers: [PostController , UserController , AuthController , FileController , ScrapController , HobbyController],
authorizationChecker,
currentUserChecker,
}); 

app.use("/public", express.static("pulblic"));

app.listen(port, host, () => {
    console.log(`Servidor express iniciado em http://${host}:${port}`);
}); // Função responsavel por configurar a host & port que fará comunicação BE & FE
