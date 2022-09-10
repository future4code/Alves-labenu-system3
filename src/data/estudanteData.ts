import connection from "./connection";
import { Estudante } from "../classes/Estudante";

async function insereEstudante(
    estudante: Estudante
): Promise<any> {
    let id = estudante.getId()
    let nome = estudante.getNome()
    let email = estudante.getEmail()
    let data_nasc = estudante.getData_nasc()
    let turma_id = estudante.getTurma_id()

    await connection
        .insert({ id, nome, email, data_nasc, turma_id })
        .into('labenusystem_estudante')
}

async function selectEstudante(): Promise<any> {
    const result = await connection('labenusystem_estudante')
        .select()

    return result
}

async function pegaEstudantePorNome(nome: string): Promise<any> {
    const result = await connection('labenusystem_estudante')
        .select()
        .whereLike("nome", `%${nome}%`)
        .limit(10)

    return result
}

async function selectEstudantePorId(id: string): Promise<any> {
    const result = await connection('labenusystem_estudante')
        .select()
        .whereLike("id", id)

    return result
}

async function selectEstudantePorTurmaId(turma_id: string): Promise<any> {
    const result = await connection('labenusystem_estudante')
        .select()
        .where("turma_id", turma_id)

    return result
}

async function editaTurmaEstudantePorId(estudante: Estudante): Promise<any> {
    let id = estudante.getId()
    let turma_id = estudante.getTurma_id()
    
    await connection('labenusystem_estudante')
        .where("id", id)
        .update({
            'turma_id': turma_id
        })
}

export {
    insereEstudante,
    selectEstudante,
    pegaEstudantePorNome,
    selectEstudantePorTurmaId,
    selectEstudantePorId,
    editaTurmaEstudantePorId
}