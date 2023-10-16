import { faker } from "@faker-js/faker";
import * as userService from "./user.service.mjs";


const defaultLimit = 50;

async function seedUser() {
    const limit = Number(process.argv[2] || defaultLimit); 
    console.log("iniciando seeding...");
    console.log(`Vão ser criados ${limit} usuarios`);
    for (let index = 0; index < limit; index++) {
        const userData = generateUser(); 
        const user = await userService.createUser(userData);
        console.log(`Criado o usuario de id ${user.id}`);
        
      } // "FOR" utilizado para criação dos post automaticos. Primeiramente, o loop acessa o "faker" para geração do post, e depois cria o post através da função "postService.createPost" em SERVIÇO
      console.log("Seeding realizado com sucesso!");
}


function generateUser(){
return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    avatar: faker.internet.avatar(),
    passwd: faker.internet.password(),
 };
}


seedUser();