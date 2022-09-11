import { Docente } from "../classes/Docente";
import connection from "./connection";

async function insereDocente(
    docente: Docente
): Promise<any> {
    let id = docente.getId();
    let nome = docente.getNome();
    let email = docente.getEmail();
    let data_nasc = docente.getData_nasc();
    let turma_id = docente.getTurma_id();

    await connection
        .insert({ id, nome, email, data_nasc, turma_id })
        .into('labenusystem_docente')
}

async function selectDocente(): Promise<any> {
    const result = await connection('labenusystem_docente')
        .select()

    return result
}

async function selectDocentePorId(id: string): Promise<any> {
    const result = await connection('labenusystem_docente')
        .select()
        .where("id", id)

    return result
}

async function selectDocentePorEspecialidadeId(especialidade_id: string): Promise<any> {
    const result = await connection('labenusystem_docente_especialidade')
        .select()
        .where("especialidade_id", especialidade_id)

    return result
}

async function selectDocentePorTurmaId(turma_id: string): Promise<any> {
    const result = await connection('labenusystem_docente')
        .select()
        .where("turma_id", turma_id)

    return result
}

async function editaTurmaDocentePorId(docente: Docente): Promise<any> {
    let id = docente.getId()
    let turma_id = docente.getTurma_id()

    await connection('labenusystem_docente')
        .where("id", id)
        .update({
            'turma_id': turma_id
        })
}

async function selectDocentePorSigno(data1: string, data2: string): Promise<any> {
    const [mes1, dia1] = data1.split('-')
    const [mes2, dia2] = data2.split('-')

    const result = await connection.raw(`SELECT  *
        FROM labenusystem_docente
        WHERE data_nasc BETWEEN CONCAT_WS('-', year(data_nasc), ${mes1}, ${dia1})
        AND CONCAT_WS('-', year(data_nasc), ${mes2}, ${dia2})`)

    return result[0]
}

export {
    insereDocente,
    selectDocente,
    selectDocentePorTurmaId,
    selectDocentePorId,
    editaTurmaDocentePorId,
    selectDocentePorEspecialidadeId,
    selectDocentePorSigno
}