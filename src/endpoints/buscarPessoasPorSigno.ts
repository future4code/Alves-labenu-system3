import { Request, Response } from "express"
import { Docente } from "../classes/Docente"
import { Estudante } from "../classes/Estudante"
import { selectDocentePorSigno } from "../data/docenteData"
import { selectEstudantePorSigno } from "../data/estudanteData"

async function buscaSigno(data1: string, data2: string): Promise<any> {
    let docentes: Docente[] = []
    let estudantes: Estudante[] = []
    let resposta = {
        docentes,
        estudantes
    }

    const tempDocentes = await selectDocentePorSigno(data1, data2)
    const tempEstudantes = await selectEstudantePorSigno(data1, data2)

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
            docentes.push(novoDocente)
        }
        resposta.docentes = docentes
    }

    if (tempEstudantes.length > 0) {
        for (let i = 0; i < tempEstudantes.length; i++) {
            let novaData_nasc = tempEstudantes[i].data_nasc.toLocaleDateString()
            const novoEstudante = new Estudante(
                tempEstudantes[i].id,
                tempEstudantes[i].nome,
                tempEstudantes[i].email,
                novaData_nasc,
                tempEstudantes[i].turma_id,
                []
            )

            const hobbies = await novoEstudante.getHobbies(tempEstudantes[i].id)
            novoEstudante.setHobbies(hobbies)
            estudantes.push(novoEstudante)
        }
        resposta.estudantes = estudantes
    }
    return resposta
}


export const buscarPessoasPorSigno = async (req: Request, res: Response): Promise<void> => {
    try {
        const signo_nome = req.params.nome
        const signos = ['aries', 'touro', 'gemeos', 'cancer', 'leao', 'virgem', 'libra', 'escorpiao', 'sagitario', 'capricornio', 'aquario', 'peixes']
        if (!signo_nome || !signos.includes(signo_nome)) {
            res.statusCode = 404
            throw new Error('Signo inválido')
        }

        if (signo_nome === 'aries') {
            let data1 = "3-21"
            let data2 = "4-20"
            const resposta = await buscaSigno(data1, data2)
            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'touro') {
            let data1 = "4-21"
            let data2 = "5-20"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'gemeos') {
            let data1 = "5-21"
            let data2 = "6-20"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'cancer') {
            let data1 = "6-21"
            let data2 = "7-22"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'leao') {
            let data1 = "7-23"
            let data2 = "8-22"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'virgem') {
            let data1 = "8-23"
            let data2 = "9-22"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'libra') {
            let data1 = "9-23"
            let data2 = "10-22"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'escorpiao') {
            let data1 = "10-23"
            let data2 = "11-21"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'sagitario') {
            let data1 = "11-22"
            let data2 = "12-21"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'capricornio') {
            let data1 = "12-22"
            let data2 = "1-20"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'aquario') {
            let data1 = "1-21"
            let data2 = "2-18"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        } else if (signo_nome === 'peixes') {
            let data1 = "2-19"
            let data2 = "3-20"
            const resposta = await buscaSigno(data1, data2)

            res.send({ pessoas: resposta }).status(200)
        }

    } catch (error: any) {
        res.status(res.statusCode || 500).send(error.message || error.sqlMessage)
    }
}