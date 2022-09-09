import app from "./app";
import { criarDocente } from "./endpoints/criarDocente";
import { criarEstudante } from "./endpoints/criarEstudante";
import { criarTurma } from "./endpoints/criarTurma";
import { estudantePorNome } from "./endpoints/estudantePorNome";
import { selecionarEstudante } from "./endpoints/selecionarEstudante";
import { buscarTurmas } from "./endpoints/buscarTurmas";

app.post("/estudante", criarEstudante)
app.post("/turma", criarTurma)
app.post("/docente", criarDocente)
app.get("/estudante/:nome", estudantePorNome)
app.get("/estudante/:nomeEstudante", selecionarEstudante)
app.get("/turma", buscarTurmas)