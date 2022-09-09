import { Request, Response } from 'express'
import connection from '../data/connection'
import { Turma } from '../classes/Turma'
import { insereTurma, selectTurma }  from '../data/turmaData'

export const criarTurma = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, modulo } = req.body

        if (!nome || !modulo) {
            res.statusCode = 401
            throw new Error("Insira todos os campos antes de continuar")
        }

        const turmas = await selectTurma()
        let id 
        if ( turmas.length > 0 ) {
            id = (Number(turmas[turmas.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }

        const novaTurma = new Turma(id, nome, [], [], modulo)
        await insereTurma(novaTurma)

        res.status(201).send('Turma criada com sucesso.')

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message)
    }
}