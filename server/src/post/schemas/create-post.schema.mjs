// Metodo 1:Devido ao fato de não conseguirmos compartilhar codigo entre o FE para o BE.
// Copiamos a validação do FE. Se fosse possivel o compartilhamento, seria feito um "import"
// Qual seria este tipo de aplicação que faz este tipo de compartilhamento
// Metodo 2: Neste metodo, para evitarmos tanta criação de constantes e utilização de "ifs", 
// criamos o schema e depois utilizamos middlewares.
import { z } from "zod";

const content = z
  .string()
  .min(16, { message: "O conteudo precisa ter mais de 15 caracteres" })
  .max(270, { message: "O conteudo precisa ter menos de 959 caracteres" });

export const createPostSchema = z.object({
  content,
});