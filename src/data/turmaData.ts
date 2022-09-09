import connection from "./connection";
import { Turma } from "../classes/Turma";

async function insereTurma(
    turma: Turma
): Promise<any> {
    let id = turma.getId()
    let nome = turma.getNome()
    let modulo = turma.getModulo()

    await connection
        .insert({ id, nome, modulo })
        .into('labenusystem_turmas')
}

async function selectTurma(): Promise<any> {
    const result = await connection('labenusystem_turmas')
        .select()

    return result
}

export { insereTurma, selectTurma }
