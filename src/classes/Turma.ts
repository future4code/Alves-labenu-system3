import { Estudante } from "./Estudante"
import { Docente } from "./Docente"
export class Turma {
    constructor(
        protected id: string,
        protected nome: string,
        protected docentes: Docente[],
        protected estudantes: Estudante[],
        protected modulo: string
    ) {}

        public getId(): string {
            return this.id
        }

        public getNome(): string {
            return this.nome
        }

        public getModulo(): string {
            return this.modulo
        }
}