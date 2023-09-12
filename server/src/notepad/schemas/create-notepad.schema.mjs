// Metodo 1:Devido ao fato de não conseguirmos compartilhar codigo entre o FE para o BE.
// Copiamos a validação do FE. Se fosse possivel o compartilhamento, seria feito um "import"
// Qual seria este tipo de aplicação que faz este tipo de compartilhamento
// Metodo 2: Neste metodo, para evitarmos tanta criação de constantes e utilização de "ifs", 
// criamos o schema e depois utilizamos middlewares.
import { z } from "zod";

const creator = z
.string()
.nonempty( {message: "O criador precisa ter um nome"})
.regex(/^[A-Za-z]+$/i, {message: "Somente letras são permitidas"});

const title = z
  .string()
  .min(4, { message: "O titulo precisa ter mais de 3 caracteres" })
  .max(16, { message: "O titulo precisa ter menos de 17 caracteres" });

const subtitle = z
  .string()
  .min(8, { message: "O subtitulo precisa ter mais de 7 caracteres" })
  .max(24, { message: "O subtitulo precisa ter menos de 25 caracteres" });

const content = z
  .string()
  .min(16, { message: "O conteudo precisa ter mais de 15 caracteres" })
  .max(140, { message: "O conteudo precisa ter menos de 141 caracteres" });

export const createNotepadSchema = z.object({
  creator,
  title,
  subtitle,
  content,
});