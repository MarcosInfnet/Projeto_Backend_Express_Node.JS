import {PostRepository} from "./post.repository";
import { faker } from "@faker-js/faker";
import {UserRepository} from "../user/user.repository";


const defaultLimit = 20;   // Valor padrão caso na queryString o limite for nulo
const minCommentCount = 1;
const commentRange = 5;


async function postSeed() {
const userRepository = new UserRepository();
const postRepository = new PostRepository();

  const users = await userRepository.listUsers()
  const usersIds = users.map((user)=> user.id);
 
  const limit = Number(process.argv[2] || defaultLimit); // Através do cns.log(process.argv) vimos que a função tinha duas execuções anteriores. Enteo para definir um limit de criação o valor de limite tinha q ser o "3" parametro
  console.log("iniciando seeding...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const userId = getRandomUserId(usersIds);
    const postData = generatePost(userId); //
    const post = await postRepository.createPost(postData);
    console.log(`Criado post de id #${post.id}`);
    await commentSeed(post , usersIds);
  } // "FOR" utilizado para criação dos post automaticos. Primeiramente, o loop acessa o "faker" para geração do post, e depois cria o post através da função "postService.createPost" em SERVIÇO
  console.log("Seeding realizado com sucesso!");
} // Para criar utilizando o limit interno da funcao,
//  preciso chamar o script com -- <valor do limite>



async function commentSeed(post: any , usersIds:number[]){
  const postRepository = new PostRepository();

  const commentCount = minCommentCount + Math.round(Math.random() * commentRange);
  for (let index = 0; index < commentCount; index++) {
    const userId = getRandomUserId(usersIds);
    const comment = generateComment(userId);  
    const addedComment = await postRepository.createPostComment(post.id,comment);
    console.log(`Criado o post de id #${addedComment.id}`);
  }
}


function generatePost(user_id: number) {
  return {
    user_id,
    content: faker.lorem.words(5 + Math.round(Math.random() * 5)),
    
  };
}

function generateComment(user_id: number) {
  return {
    user_id,
    message: faker.lorem.words(2 + Math.round(Math.random() * 3)),
  };
}

function getRandomUserId(usersId:number[]) {
  return usersId[Math.floor(Math.random() * usersId.length)];
}

postSeed();