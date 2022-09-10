import { Request, Response } from "express";
import { selectDocente } from "../data/docenteData";
import { Docente } from "../classes/Docente";

export const buscarDocentes = async (req: Request, res: Response): Promise<void> => {
    try {
        let tempDocentes = await selectDocente()
        let resposta: Docente[] = []
        if (tempDocentes.length > 0) {
            for (let i = 0; i < tempDocentes.length; i++) {
                let novaData_nasc = tempDocentes[i].data_nasc.toLocaleDateString()
                const novoDocente = new Docente(
                    tempDocentes[i].id,
                    tempDocentes[i].nome,
                    tempDocentes[i].email,
                    novaData_nasc,
                    tempDocentes[i].turma_id,
                    []
                )

                const especialidades = await novoDocente.getEspecialidades(tempDocentes[i].id)
                novoDocente.setEspecialidades(especialidades)
                resposta.push(novoDocente)
            }
            res.status(200).send({docentes: resposta})
        } else {
            throw new Error('Nenhum docente encontrado')
        }
    } catch (err: any) {
        res.send(err.message).status(404)
    }
}