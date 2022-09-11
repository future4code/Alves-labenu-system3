import { Request, Response } from "express"
import { Docente } from "../classes/Docente"
import { selectDocentePorEspecialidadeId, selectDocentePorId } from "../data/docenteData"

export const buscarDocentesEspecialistasPOO = async (req: Request, res: Response): Promise<void> => {
    try {
        const tempDocentesIds = await selectDocentePorEspecialidadeId("5")
        if ( tempDocentesIds.length === 0) {
            res.statusCode = 404
            throw new Error('Nenhum docente especialista em POO foi encontrado.')
        }

        const docentes_ids = tempDocentesIds.map((item: any) => { return item.docente_id })

        const resposta: Docente[] = []
        for(let i = 0; i < docentes_ids.length; i++) {
            const tempDocente = await selectDocentePorId(docentes_ids[i])
            let novaData_nasc = tempDocente[0].data_nasc.toLocaleDateString()
            const docente = new Docente(
                tempDocente[0].id,
                tempDocente[0].nome,
                tempDocente[0].email,
                novaData_nasc,
                tempDocente[0].turma_id,
                []
            )
            const especialidades = await docente.getEspecialidades(tempDocente[0].id)
            docente.setEspecialidades(especialidades)
            resposta.push(docente)
        }

        res.status(200).send({docentes: resposta})

    } catch (err: any) {
        res.send(err.message).status(404)
    }
}