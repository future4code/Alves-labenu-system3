import { Request, Response } from 'express'
import { selectTurmaPorId } from '../data/turmaData'
import { Turma } from '../classes/Turma'
import { editaModuloTurmaPorId } from '../data/turmaData'

export const mudarModuloTurma = async (req: Request, res: Response): Promise<void> => {
    try {
        let modulo = req.params.modulo
        let id = req.params.id

        if (!modulo || (Number(modulo) > 6 || Number(modulo) < 0)) {
            res.statusCode = 404
            throw new Error('Módulo inválido, valores módulo devem estar entre 0 e 6')
        }

        if (!id) {
            res.statusCode = 404
            throw new Error('Id inválido.')

        }

        const turma = await selectTurmaPorId(id)

        if (turma.length === 0) {
            res.statusCode = 404
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }

        const novaTurma = new Turma(
            turma[0].id,
            turma[0].nome,
            [],
            [],
            turma[0].modulo
        )

        novaTurma.setModulo(modulo)

        await editaModuloTurmaPorId(novaTurma)

        res.send('Modulo alterado com sucesso').status(200)

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}