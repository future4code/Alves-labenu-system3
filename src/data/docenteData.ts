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

async function selectDocentePorTurmaId(turma_id: string): Promise<any> {
    const result = await connection('labenusystem_docente')
        .select()
        .where("turma_id", turma_id)

    return result
}

export { insereDocente, selectDocente,selectDocentePorTurmaId }