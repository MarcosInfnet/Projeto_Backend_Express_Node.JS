import * as postService from "./post.service.mjs";
import { faker } from "@faker-js/faker";

const defaultLimit = 10;   // Valor padrão caso na queryString o limite for nulo

async function postSeed() {
  const limit = Number(process.argv[2] ?? defaultLimit); // Através do cns.log(process.argv) vimos que a função tinha duas execuções anteriores. Enteo para definir um limit de criação o valor de limite tinha q ser o "3" parametro
  console.log("iniciando seeding...");
  console.log(`Vão ser criados ${limit} posts`);
  for (let index = 0; index < limit; index++) {
    const postData = generatePost(); //
    const post = await postService.createPost(postData);
    console.log(`Criado o post de id #${post.id}`);
  } // "FOR" utilizado para criação dos post automaticos. Primeiramente, o loop acessa o "faker" para geração do post, e depois cria o post através da função "postService.createPost" em SERVIÇO
  console.log("Seeding realizado com sucesso!");
} // Para criar utilizando o limit interno da funcao,
//  preciso chamar o script com -- <valor do limite>

function generatePost() {
  return {
    content: faker.lorem.words(5 + Math.round(Math.random() * 5)),
    
  };
}

postSeed();