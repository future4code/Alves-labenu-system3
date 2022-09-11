import app from "./app";
import { criarDocente } from "./endpoints/criarDocente";
import { criarEstudante } from "./endpoints/criarEstudante";
import { criarTurma } from "./endpoints/criarTurma";
import { estudantePorNome } from "./endpoints/estudantePorNome";
import { buscarTurmasAtivas } from "./endpoints/buscarTurmasAtivas";
import { mudarModuloTurma } from "./endpoints/mudarModuloTurma";
import { mudarEstudanteDeTurma } from "./endpoints/mudarEstudanteDeTurma";
import { buscarDocentes } from "./endpoints/buscarDocentes";
import { mudarDocenteDeTurma } from "./endpoints/mudarDocenteDeTurma";
import { buscarPessoasDaMesmaTurma } from "./endpoints/buscarPessoasDaMesmaTurma";
import { buscarEstudantesMesmoHobby } from "./endpoints/buscarEstudantesMesmoHobby";
import { buscarDocentesEspecialistasPOO } from "./endpoints/buscarDocentesEspecialistasPOO";
import { buscarPessoasPorSigno } from "./endpoints/buscarPessoasPorSigno";

app.get("/turma", buscarTurmasAtivas)
app.get("/turma/pessoas/:id", buscarPessoasDaMesmaTurma)
app.get("/estudante/:nome", estudantePorNome)
app.get("/docente", buscarDocentes )
app.get("/hobby/:nome", buscarEstudantesMesmoHobby)
app.get("/especialidade/poo", buscarDocentesEspecialistasPOO)
app.get("/signo/:nome", buscarPessoasPorSigno)
app.post("/estudante", criarEstudante)
app.post("/turma", criarTurma)
app.post("/docente", criarDocente)
app.put("/turma/:id", mudarModuloTurma)
app.put("/estudante/:id", mudarEstudanteDeTurma)
app.put("/docente/:id", mudarDocenteDeTurma)