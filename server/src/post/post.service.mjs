import { db } from "../db.mjs";
import { createPostSchema } from "./schemas/create-post.schema.mjs";


export async function listPosts({ limit, offset }) {
const posts = db.prepare
(/* sql*/`select * from posts order by id desc limit ? offset ?
`).all(limit, offset);

const {posts_count : count} = db.prepare
(/* sql*/`select count(id) as posts_count from posts
`).get();
  return {
    posts,
    count,
  
}
}


export async function createPost(post) {
  await createPostSchema.parseAsync(post);

  const nextPost = db.prepare(/* sql*/ `
  insert into posts (content) values (?)returning*;`).get(post.content);
  return nextPost; 
  }                               
// A utilização do returning * é FE tenha a resposta do que foi salvo no DB. Neste caso de ter o retorno do db, é necessário trocar o ".run" pelo ".get"
//O "nextPost que é o que está voltando pro FE indica quantas modificações e o ID utilizado"
// Para que seja passado os valores do FE para o DB os parametro serão atrelados a "?"


export async function readPost(id) {
  const post = db.prepare(/* sql*/ `select * from posts where id=?`).get(id); 
  return post;
}
  // Lendo todos od posts salvos na tabela notepds
  // const post = await jsonService.readJson(`${postsPath}/${id}.json`);
  // return post;


export async function updatePost(id, postData) {
const post = db.prepare (/* sql*/ `update posts set content=? where id=? returning*;`).get(postData.content, id);
  return post;
}

export async function deletePost(id) {
const post = db.prepare(/* sql*/`delete from posts where id=? returning*;`).get(id);
  return post;
}