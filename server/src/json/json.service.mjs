//Fiz uma copia do notepad.service

import { promises as fsp } from "fs";

export async function readJson(path) {
    const notepadStr = (await fsp.readFile(path)).toString();
    const notepad = JSON.parse(notepadStr);
    return notepad;
  }

  export async function createJson(path, notepad) {
    // Validação: Verificar se existe um arquivo apontado para o path selecionado
    // Validação: Verificar se data é um arquivo valido
    // Validação: Verificar se o patch possui a extensão .json
      const notepadStr = JSON.stringify(notepad, null, 2);
      await fsp.writeFile(path, notepadStr);
    }

    export async function updateJson(path, partialJson) {
        const oldJson = await readJson(path);
        const nextJson = { ...oldJson, ...partialJson };
        await createJson(path, nextJson);
      }

      export async function deleteJson(path) {
        await fsp.unlink(path);
      }
      