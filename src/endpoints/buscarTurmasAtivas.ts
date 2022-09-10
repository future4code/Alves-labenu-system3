import { Request, Response } from "express"
import { Turma } from "../classes/Turma"
import { selectTurma } from "../data/turmaData"

export const buscarTurmasAtivas = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const turmas = await selectTurma()

        if (turmas.length > 0) {
            let resposta: Turma[] = []
            for (let i = 0; i < turmas.length; i++) {
                if (turmas[i].modulo !== "0") {
                    let novaTurma = new Turma(
                        turmas[i].id,
                        turmas[i].nome,
                        [],
                        [],
                        turmas[i].modulo
                    )

                    let docentes = await novaTurma.getDocentes(turmas[i].id)
                    novaTurma.setDocentes(docentes)

                    let estudantes = await novaTurma.getEstudantes(turmas[i].id)
                    novaTurma.setEstudantes(estudantes)

                    resposta.push(novaTurma)
                } else {
                    throw new Error('Nenhuma turma ativa encontrada.')
                }
            }
            res.status(200).send({ turmas: resposta })
        } else {
            throw new Error('Nenhuma turma encontrada')
        }

    } catch (err: any) {
        res.send(err.message).status(404)
    }
}
