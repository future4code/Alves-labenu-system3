export class Turma {
    constructor(
        protected id: string,
        protected nome: string,
        protected docentes: string[],
        protected estudantes: string[],
        protected modulo: string
    ) {

    }
}