import { Request, Response } from 'express'
import connection from '../data/connection'

export const criarEstudante = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, data_nasc, turma_id } = req.body

        let id = Date.now().toString()

        if(!nome || !email || !data_nasc || !turma_id){
            res.statusCode = 401
            throw new Error("Complete todos os campos necessários para completar o cadastro")
        }

        await connection("Estudante")
            .insert({ id, nome, email, data_nasc, turma_id })


        res.status(200).send("Estudante criado com sucesso!")

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}

