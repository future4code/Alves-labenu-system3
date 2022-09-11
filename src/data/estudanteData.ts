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

async function selectEstudantePorHobbyId(hobby_id: string): Promise<any> {
    const result = await connection('labenusystem_estudante_hobby')
        .where("hobby_id", hobby_id)
    
    return result
}

async function selectEstudantePorSigno(data1: string, data2: string): Promise<any> {
    const [mes1, dia1] = data1.split('-')
    const [mes2, dia2 ] = data2.split('-')

    const result = await connection.raw(`SELECT  *
        FROM labenusystem_estudante
        WHERE data_nasc BETWEEN CONCAT_WS('-', year(data_nasc), ${mes1}, ${dia1})
        AND CONCAT_WS('-', year(data_nasc), ${mes2}, ${dia2})`)

    return result[0]
}

export {
    insereEstudante,
    selectEstudante,
    pegaEstudantePorNome,
    selectEstudantePorTurmaId,
    selectEstudantePorId,
    editaTurmaEstudantePorId,
    selectEstudantePorHobbyId,
    selectEstudantePorSigno
}