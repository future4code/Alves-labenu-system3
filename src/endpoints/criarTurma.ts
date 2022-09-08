import { Request, Response } from 'express'
import connection from '../data/connection'

export const criarTurma = async (req: Request, res: Response): Promise <void> => {
    try {
        let id = Date.now().toString()
        const {nome, modulo} = req.body

        if(!nome || !modulo){
            res.statusCode = 401
            throw new Error ("Insira todos os campos antes de continuar")
        }

        await connection("Turma")
            .insert({id, nome, modulo})

        res.status(200).send("Turma criada com sucesso!")    
    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message)
    }
}