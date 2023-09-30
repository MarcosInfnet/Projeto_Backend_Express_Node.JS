// A diferenca para uma validação de criação para uma validação de update,
// é que esta 2ª tem que aceitar valição parcial, ou seja, sem alguns dos
// parametros que compoem o notepad.

import { createPostSchema } from "./create-post.schema.mjs";

export const updatePostSchema = createPostSchema; // Metodo 1 de validação, criamos uma "const" que receberá o create de forma parcial
