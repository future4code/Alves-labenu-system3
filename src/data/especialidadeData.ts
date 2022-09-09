import { Docente } from "../classes/Docente";
import connection from "./connection";

async function selectDocenteEspecialidade(): Promise<any> {
    const result = await connection('labenusystem_docente_especialidade')
        .select()

    return result
}

async function insereEspecialidades(
    docente: Docente
): Promise<any> {
    let especialidades = docente.getEspecialidades()
    let docente_id = docente.getId()
    
    
    for (let i = 0; i < especialidades.length; i++) {
        const docente_especialidades = await selectDocenteEspecialidade()
        let id
        if (docente_especialidades.length > 0) {
            id = (Number(docente_especialidades[docente_especialidades.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }
        let especialidade_id
        if (especialidades[i] === 'JS') {
            especialidade_id = 1
        } else if (especialidades[i] === 'CSS') {
            especialidade_id = 2
        } else if (especialidades[i] === 'React') {
            especialidade_id = 3
        } else if (especialidades[i] === 'Typescript') {
            especialidade_id = 4
        } else if (especialidades[i] === 'POO') {
            especialidade_id = 5
        }

        especialidade_id = especialidade_id?.toString()
        await connection
            .insert({ id, docente_id, especialidade_id })
            .into('labenusystem_docente_especialidade')

    }
}

export { insereEspecialidades, selectDocenteEspecialidade }