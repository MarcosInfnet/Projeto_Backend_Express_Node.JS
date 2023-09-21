import { promises as fsp } from "fs";
import { db } from "../db.mjs";
import * as jsonService from "../json/json.service.mjs";
// checando a aula do dia 31AUG vi q nesta pasta esta faltando os imports de create e update notepad schema

const notepadsPath = "/Users/marco/Projeto_Backend_Express_Node.JS/server/data/notepads/";  
const notepadLatestIdPath = "./data/notepadLatestId.json"; 



export async function listNotepads({ limit, offset }) {
    const notepadsFiles = await fsp.readdir(notepadsPath);    // Função utilizada para carregar o caminho de cada notepads na pasta "./data/notepads"
    const notepadsToLoad = notepadsFiles                      // Inicio da ordenação               
      .sort(( a, b ) => {                                  // Utilizando a funcao "sort" para ordenar o notepads
        const idA = parseInt(a);                             // Utilizando o parseInt para criar um numero inteiro a partir de uma string. Neste caso, o ".json" de cada notepad será descartado.
        const idB = parseInt(b);
  
        if (idA < idB) {
          return 1;
        } else if (idA === idB) {
          return 0;
        } else {
          return -1;
        }
      })
      .slice(offset, limit + offset);                         // A função "slice" realizará a paginação. Sendo que, offset: Notepads a serem pulados & limit: Quantos notepads serão mostrados na pagina.
    

  const count = notepadsFiles.length;                         // Este "count" irá mostrar a qtd de notepads gravadas no BE
  let notepads = [];
  for (const notepadFile of notepadsToLoad) {
    const currentNotepad = await jsonService.readJson(      // Função utilizada para carregar o conteudo de cada notepad proveniente do notepadFiles
      `${notepadsPath}/${notepadFile}`
    );
    notepads.push(currentNotepad);
  }
  return {
    notepads:notepads,
    count,
  
}
}


export async function createNotepad(notepad) {
  const { notepadLatestId } = await jsonService.readJson(notepadLatestIdPath); // Checar o ultimo notepadId
  const notepadId = notepadLatestId + 1; // Incrementa o "notepadLatestId" e salva
  const nextNotepad = {
    id: notepadId,
    createdAt: new Date().toJSON(),
    ...notepad,
  }; // Criar um novo notepad que contem os dados do FE mais data de criação e id

  const path = `${notepadsPath}${nextNotepad.id}.json`;
  await jsonService.createJson(path, nextNotepad);
  await jsonService.updateJson(notepadLatestIdPath, {
    notepadLatestId: notepadId,
  }); // Realiza o update da planilha de notepadsIds
  return nextNotepad;
}

export async function readNotepad(id) {
  const notepad = db.prepare(/* sql*/ `select * from notepads where id=?`).get(id); // Lendo todos od notepads salvos na tabela notepds
  return notepad;
  // const notepad = await jsonService.readJson(`${notepadsPath}/${id}.json`);
  // return notepad;
}
export async function updateNotepad(id, partialNotepad) {
  const path = `${notepadsPath}/${id}.json`;
  await jsonService.updateJson(path, partialNotepad);
  const notepad = await jsonService.readJson(path);
  return notepad;
}

export async function deleteNotepad(id) {
  const path = `${notepadsPath}/${id}.json`;
  const notepad = await jsonService.readJson(path);
  await jsonService.deleteJson(path);
  return notepad;
}