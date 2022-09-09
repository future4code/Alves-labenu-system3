import { Request, Response } from "express"
import { selectTurma } from "../data/turmaData"

export const buscarTurmas = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const turmas = await selectTurma()
        res.status(200).send(turmas)
    } catch (err: any) {
        res.send(err.message).status(404)
    }
}
