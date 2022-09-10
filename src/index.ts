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

app.get("/turma", buscarTurmasAtivas)
app.get("/estudante/:nome", estudantePorNome)
app.get("/docente", buscarDocentes )
app.post("/estudante", criarEstudante)
app.post("/turma", criarTurma)
app.post("/docente", criarDocente)
app.put("/turma/:id/:modulo", mudarModuloTurma)
app.put("/estudante/:id/:turma_id", mudarEstudanteDeTurma)
app.put("/docente/:id/:turma_id", mudarDocenteDeTurma)