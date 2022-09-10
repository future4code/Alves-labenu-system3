import { Estudante } from "./Estudante"
import { Docente } from "./Docente"
import { selectDocentePorTurmaId } from "../data/docenteData"
import { selectDocenteEspecialidadePorDocenteId, selectEspecialidadePorId } from "../data/especialidadeData"
import { selectEstudantePorTurmaId } from "../data/estudanteData"
import { selectHobbyByEstudanteId, selectHobbyById } from "../data/hobbyData"

export class Turma {
    constructor(
        protected id: string,
        protected nome: string,
        protected docentes: Docente[],
        protected estudantes: Estudante[],
        protected modulo: string
    ) { }

    public getId(): string {
        return this.id
    }

    public getNome(): string {
        return this.nome
    }

    public getModulo(): string {
        return this.modulo
    }

    public async getDocentes(id: string) {
        let tempDocentes = await selectDocentePorTurmaId(id)
        let docentes: Docente[] = []
        if (tempDocentes.length > 0) {
            for (let j = 0; j < tempDocentes.length; j++) {
                let tempEspecalidades = await selectDocenteEspecialidadePorDocenteId(tempDocentes[j].id)
                let especialidades = []
                if (tempEspecalidades.length > 0) {
                    for (let k = 0; k < tempEspecalidades.length; k++) {
                        let especialidade = await selectEspecialidadePorId(tempEspecalidades[k].especialidade_id)
                        const especialidade_nome = especialidade[0].nome
                        especialidades.push(especialidade_nome)
                    }
                }
                let novaData_nasc = tempDocentes[j].data_nasc.toLocaleDateString()
                let novoDocente = new Docente(
                    tempDocentes[j].id,
                    tempDocentes[j].nome,
                    tempDocentes[j].email,
                    novaData_nasc,
                    tempDocentes[j].turma_id,
                    especialidades
                )
                docentes.push(novoDocente)
            }
            return docentes
        } else {
            return []
        }
    }

    public async getEstudantes(id: string) {
        let tempEstudantes = await selectEstudantePorTurmaId(id)
        let estudantes: Estudante[] = []
        if (tempEstudantes.length > 0) {
            for (let j = 0; j < tempEstudantes.length; j++) {
                let tempHobbies = await selectHobbyByEstudanteId(tempEstudantes[j].id)
                let hobbies = []
                if (tempHobbies.length > 0) {
                    for (let k = 0; k < tempHobbies.length; k++) {
                        const hobby = await selectHobbyById(tempHobbies[k].hobby_id)
                        const hobby_nome = hobby[0].nome
                        hobbies.push(hobby_nome)
                    }
                }
                let novaData_nasc = tempEstudantes[j].data_nasc.toLocaleDateString()
                let novoEstudante = new Estudante(
                    tempEstudantes[j].id,
                    tempEstudantes[j].nome,
                    tempEstudantes[j].email,
                    novaData_nasc,
                    tempEstudantes[j].turma_id,
                    hobbies
                )
                estudantes.push(novoEstudante)
            }
            return estudantes
        } else {
            return []
        }
    }

    public setDocentes(docentes: Docente[]): void {
        if (docentes.length === 0) {
            this.docentes = []
        }
        this.docentes = docentes
    }

    public setEstudantes(estudantes: Estudante[]): void {
        if (estudantes.length === 0) {
            this.estudantes = []
        }
        this.estudantes = estudantes
    }

    public setModulo(modulo: string): void {
        this.modulo = modulo
    }
}