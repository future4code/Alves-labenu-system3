import app from "./app";
import { criarEstudante } from "./endpoints/criarEstudante";
import { criarTurma } from "./endpoints/criarTurma";

app.post("/estudante", criarEstudante)
app.post("/turma", criarTurma)
