import { Request, Response } from "express";
import { Docente } from "../classes/Docente";
import { editaTurmaDocentePorId, selectDocentePorId } from "../data/docenteData";
import { selectTurmaPorId } from "../data/turmaData";

export const mudarDocenteDeTurma = async (req: Request, res: Response): Promise<void> => {
    try {
        let id = req.params.id
        let { turma_id } = req.body

        if (!id || !turma_id) {
            throw new Error('Id do docente ou da turma inválido.')
        }

        const docente = await selectDocentePorId(id)
        if (docente.length === 0) {
            throw new Error('Nenhum docente com esse id foi encontrado.')
        }
        if (docente[0].turma_id === turma_id) {
            res.statusCode = 404
            throw new Error('Turma informada é igual à atual.')
        }

        const turma = await selectTurmaPorId(turma_id)
        if (turma.length === 0) {
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }

        let novaData_nasc = docente[0].data_nasc.toLocaleDateString()
        const novoDocente = new Docente(
            docente[0].id,
            docente[0].nome,
            docente[0].email,
            novaData_nasc,
            docente[0].turma_id,
            []
        )

        novoDocente.setTurma_id(turma_id)

        await editaTurmaDocentePorId(novoDocente)

        res.send('Turma do docente alterada com sucesso.').status(200)

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message)
    }
}