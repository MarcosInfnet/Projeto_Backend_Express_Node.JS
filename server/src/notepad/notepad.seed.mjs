import * as notepadService from "./notepad.service.mjs";
import { faker } from "@faker-js/faker";

const defaultLimit = 10;   // Valor padrão caso na queryString o limite for nulo

async function notepadSeed() {
  const limit = Number(process.argv[2] ?? defaultLimit); // Através do cns.log(process.argv) vimos que a função tinha duas execuções anteriores. Enteo para definir um limit de criação o valor de limite tinha q ser o "3" parametro
  console.log("iniciando seeding...");
  console.log(`Vão ser criados ${limit} notepads`);
  for (let index = 0; index < limit; index++) {
    const notepadData = generateNotepad(); //
    const notepad = await notepadService.createNotepad(notepadData);
    console.log(`Criado o notepad de id #${notepad.id}`);
  } // "FOR" utilizado para criação dos post automaticos. Primeiramente, o loop acessa o "faker" para geração do notepad, e depois cria o notepad através da função "notepadService.createNotepad" em SERVIÇO
  console.log("Seeding realizado com sucesso!");
} // Para criar utilizando o limit interno da funcao,
//  preciso chamar o script com -- <valor do limite>

function generateNotepad() {
  return {
    title: faker.lorem.words(4 + Math.round(Math.random() * 4)),
    subtitle: faker.lorem.words(7 + Math.round(Math.random() * 7)),
    content: faker.lorem.paragraphs(2 + Math.round(Math.random() * 6)),
    createdAt: faker.date.past({ years: 3 }).toJSON(),
  };
}

notepadSeed();