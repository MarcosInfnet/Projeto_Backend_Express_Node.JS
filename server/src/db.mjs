import sqlite from "better-sqlite3";

export const db = sqlite("./database.sqlite3"); // Criando uma instancia de acesso ao banco de dados 

//const notepads = db.prepare( "select * from notepads").all(); // Lendo os notepads da tabela notepads

//console.log(notepads);