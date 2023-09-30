// CONTROLLER: Resp. por controlar (validar/encaminhar) os dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)
// Este CONTROLLER é resp. por interfacear o envio dos dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)

import express from "express";
import * as postService from "./post.service.mjs";
import { createPostSchema } from "./schemas/create-post.schema.mjs";
import { updatePostSchema } from "./schemas/update-post.shema.mjs";

export const postController = express.Router();


postController.get("/", async (req, res) => {
    //req.query  Irá pegar a query string
    const limit = Number(req.query.limit) || 20; //Definição do valor de limit. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (30)
    const offset = Number(req.query.offset) || 0; //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0)
    const posts = await postService.listPosts({ limit, offset });
    res.status(200).json(posts);
  });

  postController.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await postService.readPost(postId);
    res.json(post);
  });

  postController.post("/", async (req, res) => {
    // Validação:checar se req.body possui uma estrutura valida
    const postData = req.body; //req.body é onde chegam as infos que o FE envia.
    const validationResults = await createPostSchema.safeParseAsync(
      postData
    ); // Usamos o "safeParseAsync" para não crachar o servidor. Se tivessemos utilizado "parseAssync", em caso de erro o servidor cracha.
    if (!validationResults.success) {
      // Da forma como está definido o "arg", por causa da "!" subentendesse "validação sem sucesso". Outra forma para falarmos de erro seria trocar "success" por "error"
      res.status(422).json(validation.console.error);
    } // Metodo 1 de validação (ini:34 end:40), não é a melhor maneira de validação. Pois, assim que o codigo começa a crescer, aumenta a qtd de "ifs".
    const post = await postService.createPost(postData);
    res.status(201).json(post);
   }); 

  postController.delete("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await postService.deletePost(postId);
    res.status(200).json(post);
  });
  
  postController.put("/:id", async (req, res) => { //Como trabalhando com DB, a atulaização parcial ficaria inviavel pois teriamos que usar uma estrutura grade de if. Portanto iremos trocar o patch pelo put, para que seja uma atualização total
    const postId = req.params.id;
    const postData = req.body;
    const validationResults = await updatePostSchema.safeParseAsync(
      postData
    );
    if (!validationResults.success) {
      res.status(422).json(validation.console.error);
    }
    const post = await postService.updatePost(postId, postData);
    res.status(200).json(post);
  });
