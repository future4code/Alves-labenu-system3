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

async function insereEstudanteHobby(
    estudante: Estudante
): Promise<any> {
    
}

export { insereEstudante, selectEstudante }