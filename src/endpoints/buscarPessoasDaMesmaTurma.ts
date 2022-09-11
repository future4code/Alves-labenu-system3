import { Request, Response } from "express";
import { Docente } from "../classes/Docente";
import { Turma } from "../classes/Turma";
import { selectTurmaPorId } from '../data/turmaData'


export const buscarPessoasDaMesmaTurma = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = req.params.id

        if ( !id ) { 
            throw new Error('Id inválido, checar parâmetros.')
        }

        const tempTurma = await selectTurmaPorId(id)

        if ( tempTurma.length === 0 ) {
            throw new Error('Nenhuma turma com esse id foi encontrada.')
        }
        
        const turma = new Turma(
            tempTurma[0].id,
            tempTurma[0].nome,
            [],
            [],
            tempTurma[0].modulo,            
        )

        const docentes = await turma.getDocentes(id)
        const estudantes = await turma.getEstudantes(id)

        const reposta = {docentes, estudantes}
        res.status(200).send({pessoas: reposta})

    } catch (err: any) {
        res.send(err.message).status(404)
    }
}