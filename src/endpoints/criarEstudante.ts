import { Request, Response } from 'express'
import { insereEstudante, selectEstudante } from '../data/estudanteData'
import { insereEstudanteHobby, insereHobby } from '../data/hobbyData'
import { Estudante } from '../classes/Estudante'
import { selectTurmaPorId } from '../data/turmaData'

export const criarEstudante = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, data_nasc, turma_id, hobbies } = req.body

        if (!nome || !email || !data_nasc || !turma_id || !hobbies) {
            res.statusCode = 401
            throw new Error("Complete todos os campos necessários para completar o cadastro")
        }

        const [dia, mes, ano] = data_nasc.split('/')
        const novaData_nasc = ano + "-" + mes + "-" + dia
        const estudantes = await selectEstudante()

        let id
        if (estudantes.length > 0) {
            id = (Number(estudantes[estudantes.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }

        const turma = await selectTurmaPorId(turma_id)
        if (turma.length === 0) {
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }

        const novoEstudante = new Estudante(id, nome, email, novaData_nasc, turma_id, hobbies)
        await insereEstudante(novoEstudante)
        await insereHobby(novoEstudante)
        await insereEstudanteHobby(novoEstudante)
        res.status(200).send("Estudante criado com sucesso!")

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}

