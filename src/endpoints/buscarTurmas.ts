import { Request, Response } from "express"
import { Docente } from "../classes/Docente"
import { Estudante } from "../classes/Estudante"
import { Turma } from "../classes/Turma"
import { selectDocentePorTurmaId } from "../data/docenteData"
import { selectDocenteEspecialidadePorDocenteId, selectEspecialidadePorId } from "../data/especialidadeData"
import { selectEstudantePorTurmaId } from "../data/estudanteData"
import { selectHobbyByEstudanteId, selectHobbyById } from "../data/hobbyData"
import { selectTurma } from "../data/turmaData"

export const buscarTurmas = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const turmas = await selectTurma()

        if (turmas.length > 0) {
            let resposta: Turma[] = []
            for (let i = 0; i < turmas.length; i++) {
                let tempDocentes = await selectDocentePorTurmaId(turmas[i].id)
                let docentes: Docente[] = []
                if (tempDocentes.length > 0) {
                    for (let j = 0; j < tempDocentes.length; j++) {
                        let tempEspecalidades = await selectDocenteEspecialidadePorDocenteId(tempDocentes[j].id)
                        let especialidades = []
                        if (tempEspecalidades.length > 0) {
                            for (let k = 0; k < tempEspecalidades.length; k++) {
                                let especialidade = await selectEspecialidadePorId(tempEspecalidades[k].especialidade_id)
                                const especialidade_nome = especialidade[0].nome
                                especialidades.push(especialidade_nome)
                            }
                        }
                        let novaData_nasc = tempDocentes[i].data_nasc.toLocaleDateString()
                        let novoDocente = new Docente(
                            tempDocentes[j].id,
                            tempDocentes[j].nome,
                            tempDocentes[j].email,
                            novaData_nasc,
                            tempDocentes[j].turma_id,
                            especialidades
                        )
                        docentes.push(novoDocente)
                    }
                }

                let tempEstudantes = await selectEstudantePorTurmaId(turmas[i].id)
                let estudantes: Estudante[] = []
                if (tempEstudantes.length > 0) {
                    for (let j = 0; j < tempEstudantes.length; j++ ) {
                        let tempHobbies = await selectHobbyByEstudanteId(tempEstudantes[j].id)
                        let hobbies = []
                        if(tempHobbies.length > 0) {
                            for (let k = 0; k < tempHobbies.length; k++) {
                                const hobby = await selectHobbyById(tempHobbies[k].hobby_id)
                                const hobby_nome = hobby[0].nome
                                hobbies.push(hobby_nome)
                            }
                        }
                        let novaData_nasc = tempEstudantes[i].data_nasc.toLocaleDateString()
                        let novoEstudante = new Estudante(
                            tempEstudantes[j].id,
                            tempEstudantes[j].nome,
                            tempEstudantes[j].email,
                            novaData_nasc,
                            tempEstudantes[j].turma_id,
                            hobbies
                        )
                        estudantes.push(novoEstudante)
                    }
                }

                const novaTurma = new Turma(
                    turmas[i].id,
                    turmas[i].nome,
                    docentes,
                    estudantes,
                    turmas[i].modulo
                )
                
                resposta.push(novaTurma)
                res.status(200).send(resposta)
            }
        } else {
            throw new Error('Nenhuma turma encontrada')
        }

    } catch (err: any) {
        res.send(err.message).status(404)
    }
}
