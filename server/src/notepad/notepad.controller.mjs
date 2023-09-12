// CONTROLLER: Resp. por controlar (validar/encaminhar) os dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)
// Este CONTROLLER é resp. por interfacear o envio dos dados provenientes da VIEW (dados proveniente do FE) que irão acessar a MODEL (DB)

import express from "express";
import * as notepadService from "./notepad.service.mjs";
import { createNotepadSchema } from "./schemas/create-notepad.schema.mjs";
import { updateNotepadSchema } from "./schemas/update-notepad.shema.mjs";

export const notepadController = express.Router();


notepadController.get("/", async (req, res) => {
    //req.query  Irá pegar a query string
    const limit = Number(req.query.limit) || 20; //Definição do valor de limit. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (30)
    const offset = Number(req.query.offset) || 0; //Definição do valor de offset. Sendo que, o mesmo chegará através da query.string ou receberá o valor pré definido (0)
    const notepads = await notepadService.listNotepads({ limit, offset });
    res.status(200).json(notepads);
  });

  notepadController.get("/:id", async (req, res) => {
    const notepadId = req.params.id;
    const notepad = await notepadService.readNotepad(notepadId);
    res.json(notepad);
  });

  notepadController.post("/", async (req, res) => {
    // Validação:checar se req.body possui uma estrutura valida
    const notepadData = req.body; //req.body é onde chegam as infos que o FE envia.
    const validationResults = await createNotepadSchema.safeParseAsync(
      notepadData
    ); // Usamos o "safeParseAsync" para não crachar o servidor. Se tivessemos utilizado "parseAssync", em caso de erro o servidor cracha.
    if (!validationResults.success) {
      // Da forma como está definido o "arg", por causa da "!" subentendesse "validação sem sucesso". Outra forma para falarmos de erro seria trocar "success" por "error"
      res.status(422).json(validation.console.error);
    } // Metodo 1 de validação (ini:34 end:40), não é a melhor maneira de validação. Pois, assim que o codigo começa a crescer, aumenta a qtd de "ifs".
    const notepad = await notepadService.createNotepad(notepadData);
    res.status(201).json(notepad);
  });

  notepadController.delete("/:id", async (req, res) => {
    const notepadId = req.params.id;
    const notepad = await notepadService.deleteNotepad(notepadId);
    res.status(200).json(notepad);
  });
  
  notepadController.patch("/:id", async (req, res) => {
    const notepadId = req.params.id;
    const partialNotepad = req.body;
    const validationResults = await updateNotepadSchema.safeParseAsync(
      partialNotepad
    );
    if (!validationResults.success) {
      res.status(422).json(validation.console.error);
    }
    const notepad = await notepadService.updateNotepad(notepadId, partialNotepad);
    res.status(200).json(notepad);
  });
