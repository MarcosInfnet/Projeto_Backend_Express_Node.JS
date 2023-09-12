// A diferenca para uma validação de criação para uma validação de update,
// é que esta 2ª tem que aceitar valição parcial, ou seja, sem alguns dos
// parametros que compoem o notepad.

import { createNotepadSchema } from "./create-notepad.schema.mjs";

export const updateNotepadSchema = createNotepadSchema.partial(); // Metodo 1 de validação, criamos uma "const" que receberá o create de forma parcial
