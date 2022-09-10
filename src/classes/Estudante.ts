import { Usuario } from "./Usuario";
import { selectHobbyByEstudanteId, selectHobbyById } from "../data/hobbyData";

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

    public async getHobbies(id: string) {
        let tempHobbies = await selectHobbyByEstudanteId(id)
        let hobbies = []
        if (tempHobbies.length > 0) {
            for (let k = 0; k < tempHobbies.length; k++) {
                const hobby = await selectHobbyById(tempHobbies[k].hobby_id)
                const hobby_nome = hobby[0].nome
                hobbies.push(hobby_nome)
            }
            return hobbies
        } else {
            return []
        }
    }

    public setTurma_id(turma_id: string): void {
        this.turma_id = turma_id
    }

    public setHobbies(hobbies: string[]): void {
        this.hobbies = hobbies
    }
}