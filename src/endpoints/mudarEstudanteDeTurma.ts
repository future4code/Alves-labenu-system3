import { Request, Response } from "express"
import { Estudante } from "../classes/Estudante"
import { editaTurmaEstudantePorId, selectEstudantePorId } from "../data/estudanteData"
import { selectTurmaPorId } from "../data/turmaData"

export const mudarEstudanteDeTurma = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id
        const turma_id = req.params.turma_id
        if (!id || !turma_id) {
            throw new Error('Id do estudante ou da turma inválido.')
        }


        const estudante = await selectEstudantePorId(id)
        if ( estudante.length === 0) {
            throw new Error('Nenhum estudante com esse id foi encontrado.')
        }

        const turma = await selectTurmaPorId(turma_id)
        if ( turma.length === 0) {
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }

        let novaData_nasc = estudante[0].data_nasc.toLocaleDateString()
        const novoEstudante = new Estudante(
            estudante[0].id,
            estudante[0].nome,
            estudante[0].email,
            novaData_nasc,
            estudante[0].turma_id,
            []
        )

        novoEstudante.setTurma_id(turma_id)
        
        await editaTurmaEstudantePorId(novoEstudante)
        
        res.send('Turma do estudante alterada com sucesso.').status(200)
    } catch (err: any) {
        res.send(err.message).status(404)
    }
}