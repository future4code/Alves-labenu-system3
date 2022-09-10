import { Usuario } from "./Usuario";
import { selectDocenteEspecialidadePorDocenteId, selectEspecialidadePorId } from "../data/especialidadeData";


export class Docente extends Usuario {
    constructor(
        id: string,
        name: string,
        email: string,
        data_nasc: string,
        turma_id: string,
        protected especialidades: string[],
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

    public async getEspecialidades(id: string) {
        let tempEspecalidades = await selectDocenteEspecialidadePorDocenteId(id)
        let especialidades = []
        if (tempEspecalidades.length > 0) {
            for (let k = 0; k < tempEspecalidades.length; k++) {
                let especialidade = await selectEspecialidadePorId(tempEspecalidades[k].especialidade_id)
                const especialidade_nome = especialidade[0].nome
                especialidades.push(especialidade_nome)
            }

            return especialidades
        } else {
            return []
        }
    }

    public setTurma_id(turma_id: string): void {
        this.turma_id = turma_id
    }

    public setEspecialidades(especialidades: string[]): void {
        this.especialidades = especialidades
    }
}