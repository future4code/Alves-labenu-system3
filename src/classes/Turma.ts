export class Turma {
    constructor(
        protected id: string,
        protected nome: string,
        protected docentes: string[],
        protected estudantes: string[],
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