import { Request, Response } from 'express'
import { insereDocente, selectDocente } from '../data/docenteData'
import { Docente } from '../classes/Docente'
import { insereEspecialidades } from '../data/especialidadeData'
import { selectTurmaPorId } from '../data/turmaData'

export const criarDocente = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nome, email, data_nasc, turma_id, especialidades } = req.body

        if (!nome || !email || !data_nasc || !turma_id || !especialidades) {
            res.statusCode = 401
            throw new Error("Complete todos os campos necessários para completar o cadastro")
        }

        const [dia, mes, ano] = data_nasc.split('/')
        const novaData_nasc = ano + "-" + mes + "-" + dia
        const docentes = await selectDocente()

        let id
        if (docentes.length > 0) {
            id = (Number(docentes[docentes.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }

        const turma = await selectTurmaPorId(turma_id)
        if (turma.length === 0) {
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }
        const novoDocente = new Docente(id, nome, email, novaData_nasc, turma_id, [])
        await insereDocente(novoDocente)
        await insereEspecialidades(novoDocente, especialidades)
        res.status(200).send('Docente cadastrado com sucesso')

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}
