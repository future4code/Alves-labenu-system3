import { Request, Response } from "express";
import { Estudante } from "../classes/Estudante";
import { selectEstudantePorHobbyId, selectEstudantePorId } from "../data/estudanteData";
import { selectHobbyByName } from "../data/hobbyData";

export const buscarEstudantesMesmoHobby = async (req: Request, res: Response): Promise<void> => {
    try {
        const hobby_nome = req.params.nome
        if (!hobby_nome) {
            res.statusCode = 404
            throw new Error('Hobby inválido')
        }

        const hobby = await selectHobbyByName(hobby_nome)
        if ( hobby.length === 0) {
            res.statusCode = 404
            throw new Error('Nenhum hobby com esse nome foi encontrado')
        }
        const hobby_id = hobby[0].id

        const tempEstudantesIds = await selectEstudantePorHobbyId(hobby_id)
        if ( tempEstudantesIds.length === 0) {
            res.statusCode = 404
            throw new Error('Nenhum estudante com esse hobby foi encontrado')
        }
        const estudantes_ids = tempEstudantesIds.map((item: any) => { return item.estudante_id })

        const resposta: Estudante[] = []
        for(let i = 0; i < estudantes_ids.length; i++) {
            const tempEstudante = await selectEstudantePorId(estudantes_ids[i])
            let novaData_nasc = tempEstudante[0].data_nasc.toLocaleDateString()
            const estudante = new Estudante(
                tempEstudante[0].id,
                tempEstudante[0].nome,
                tempEstudante[0].email,
                novaData_nasc,
                tempEstudante[0].turma_id,
                []
            )
            const hobbies = await estudante.getHobbies(tempEstudante[0].id)
            estudante.setHobbies(hobbies)
            resposta.push(estudante)
        }

        res.status(200).send({estudantes: resposta})
    } catch (err: any) {
        res.send(err.message).status(404)
    }
}