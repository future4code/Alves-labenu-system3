import { Request, Response } from 'express'
import connection from '../data/connection'
import { estudantePorNome } from './estudantePorNome'

export const selecionarEstudante = async (req: Request, res: Response) => {
    try {
        let nome= req.params 

        if(!nome){
            throw new Error ("Estudante não encontrado!")
        }

        const estudanteEscolhido = await connection("Estudante")
            .where(nome === nome)
            .select ("*")

        res.status(200).send(estudanteEscolhido)

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}