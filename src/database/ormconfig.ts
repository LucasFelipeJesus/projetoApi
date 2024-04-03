import { join } from "path";
import { DataSource } from "typeorm";

const database = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ]
})

database.initialize()
    .then(() => {
        console.log('Banco de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco de Dados não inciciado!')
    })
export default database