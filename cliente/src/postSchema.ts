import { z } from "zod";

const content = z
.string()
.min(16, {message: "O conteudo precisa ter mais de 15 caracteres"})
.max(270, {message:"O conteudo precisa ter menos de 269 caracteres"});

export const PostSchema = z.object ({
    content,
});