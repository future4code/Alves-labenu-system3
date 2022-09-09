import connection from '../data/connection'


export const estudantePorNome  = async (busca: string) => {

        const estudante = await connection("labecommerce_purchases")
        .select ("*")     
        .where ({nome: busca})     
            

        return estudante[0]
}

