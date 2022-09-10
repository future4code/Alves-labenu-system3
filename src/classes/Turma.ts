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
                let novaData_nasc = tempDocentes[j].data_nasc.toLocaleDateString()
                let novoDocente = new Docente(
                    tempDocentes[j].id,
                    tempDocentes[j].nome,
                    tempDocentes[j].email,
                    novaData_nasc,
                    tempDocentes[j].turma_id,
                    []
                )
                
                let especialidades = await novoDocente.getEspecialidades(tempDocentes[j].id)
                novoDocente.setEspecialidades(especialidades)
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
                let novaData_nasc = tempEstudantes[j].data_nasc.toLocaleDateString()
                let novoEstudante = new Estudante(
                    tempEstudantes[j].id,
                    tempEstudantes[j].nome,
                    tempEstudantes[j].email,
                    novaData_nasc,
                    tempEstudantes[j].turma_id,
                    []
                )
            
                let hobbies = await novoEstudante.getHobbies(tempEstudantes[j].id)
                novoEstudante.setHobbies(hobbies)
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