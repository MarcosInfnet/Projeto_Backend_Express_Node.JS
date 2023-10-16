// CONTROLLER: Resp. por controlar (validar/encaminhar) os dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)
// Este CONTROLLER é resp. por interfacear o envio dos dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)

import express from "express";
import * as postService from "./post.service.mjs";
import { createPostSchema } from "./schemas/create-post.schema.mjs";
import { updatePostSchema } from "./schemas/update-post.shema.mjs";
import { createPostCommentSchema } from "./schemas/create-post-comment.schema.mjs";

export const postController = express.Router();


postController.get("/", async (req, res) => {
    //req.query  Irá pegar a query string
    const limit = Number(req.query.limit) || 20; //Definição do valor de limit. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (30)
    const offset = Number(req.query.offset) || 0; //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0)
    const order = req.query.order || "desc";
    const search = req.query.search || null;
    const posts = await postService.listPosts({ limit, offset , order , search });
    res.status(200).json(posts);
  });

  postController.get("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await postService.readPost(postId);
    res.json(post);
  });

  postController.post("/", async (req, res) => {
    const postData = req.body;
    await createPostSchema.parseAsync(postData);
    const post = await postService.createPost(postData);
    res.status(201).json(post);
   }); 

  postController.delete("/:id", async (req, res) => {
    const postId = req.params.id;
    const post = await postService.deletePost(postId);
    res.status(200).json(post);
  });
  
  postController.put("/:id", async (req, res) => { //Como trabalhando com DB, a atulaização parcial ficaria inviavel pois teriamos que usar uma estrutura grade de if. Portanto iremos trocar o patch pelo put, para que seja uma atualização total
    const postData = req.body;
    await updatePostSchema.parseAsync(postData);
    const postId = req.params.id;
    const post = await postService.updatePost(postId, postData);
    res.status(200).json(post);
  });


  postController.get("/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const comments = await postService.listPostComments(postId);
    res.status(200).json(comments);
  });

  postController.post("/:id/comments", async (req, res) => {
    const postId = req.params.id;
    const commentData = req.body; 
    await createPostCommentSchema.parseAsync(commentData);
    const comment =await postService.createPostComment(postId, commentData);
    res.status(201).json(comment);
  });

