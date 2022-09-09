import { Usuario } from "./Usuario";

export class Estudante extends Usuario {
    constructor(
        id: string,
        name: string,
        email: string,
        data_nasc: string,
        turma_id: string,
        protected hobbies: string[],
    ) {
        super(id, name, email, data_nasc, turma_id)
    }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getEmail(): string {
        return this.email
    }

    public getData_nasc(): string {
        return this.data_nasc
    }

    public getTurma_id(): string {
        return this.turma_id
    }
    
    public getHobbies(): string[] {
        return this.hobbies
    }

}