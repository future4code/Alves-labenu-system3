import { Usuario } from "./Usuario";

export class Estudante extends Usuario {
    constructor(
        protected hobbies: string[],
        id: string,
        name: string,
        email: string,
        data_nasc: string,
        turma_id: string,
    ) {
        super(id, name, email, data_nasc, turma_id)
    }
}