import { Estudante } from '../classes/Estudante'
import connection from '../data/connection'
import { pegaEstudantePorNome } from '../data/estudanteData'
import { Request, Response } from 'express'
import { selectHobbyByEstudanteId, selectHobbyById } from '../data/hobbyData'

export const estudantePorNome = async (req: Request, res: Response): Promise<void> => {
        try {
                const estudantes = await pegaEstudantePorNome(req.params.nome)
                if (estudantes.length > 0) {
                        let resposta: Estudante[] = []
                        for (let i = 0; i < estudantes.length; i++) {
                                let novaData_nasc = estudantes[i].data_nasc.toLocaleDateString()
                                const hobbies = await selectHobbyByEstudanteId(estudantes[i].id)
                                let novoHobbies = []
                                if (hobbies.length > 0) {
                                        for (let j = 0; j < hobbies.length; j++) {
                                                const hobby_nome = await selectHobbyById(hobbies[j].hobby_id)
                                                novoHobbies.push(hobby_nome)
                                        }
                                }
                                const estudante = new Estudante(
                                        estudantes[i].id,
                                        estudantes[i].nome,
                                        estudantes[i].email,
                                        novaData_nasc,
                                        estudantes[i].turma_id,
                                        novoHobbies.flat(2),
                                )
                                resposta.push(estudante)
                        }

                        res.send(resposta).status(200)
                } else {
                        res.statusCode = 404
                        throw new Error('Nenhum estudante encontrado.')
                }


        } catch (error: any) {
                res.status(res.statusCode || 500).send(error.message)
        }

}

