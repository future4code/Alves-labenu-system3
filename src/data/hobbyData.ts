import connection from "./connection";
import { Estudante } from "../classes/Estudante";

async function selectEstudanteHobby(): Promise<any> {
    const result = await connection('labenusystem_estudante_hobby')
        .select()

    return result
}

async function selectHobby(): Promise<any> {
    const result = await connection('labenusystem_hobby')
        .select()

    return result
}

async function selectHobbyByName(nome: string): Promise<any> {
    const result = await connection('labenusystem_hobby')
        .select()
        .where("nome", nome)
    
    return result
}

async function insereHobby(
    estudante: Estudante
): Promise<any> {
    let estudante_hobbies = estudante.getHobbies()

    for (let i = 0; i < estudante_hobbies.length; i++) {
        let hobbies = await selectHobby()
        const newHobbies = hobbies.map((item: any) =>{ return item.nome})
        console.log(newHobbies)
        if (newHobbies.includes(estudante_hobbies[i])) {
            continue
        }
        let id
        if (hobbies.length > 0) {
            id = (Number(hobbies[hobbies.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }

        let nome = estudante_hobbies[i]
        await connection
            .insert({ id, nome })
            .into('labenusystem_hobby')
    }

}

async function insereEstudanteHobby(
    estudante: Estudante
): Promise<any> {
    let estudante_id = estudante.getId()
    let estudante_hobbies = estudante.getHobbies()
   
    for (let i = 0; i < estudante_hobbies.length; i++) {
        const hobbies = await selectEstudanteHobby()
        const hobbyByName = await selectHobbyByName(estudante_hobbies[i])
        
        let hobby_id = hobbyByName[0].id

        let id
        if (hobbies.length > 0) {
            id = (Number(hobbies[hobbies.length - 1].id) + 1).toString()
        } else {
            id = "1"
        }

        await connection
            .insert({ id, estudante_id, hobby_id})
            .into('labenusystem_estudante_hobby')

    }
}

export { selectEstudanteHobby, insereHobby, insereEstudanteHobby, selectHobby, selectHobbyByName }