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
/*
const db2DataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "api",
    entities: [__dirname + "/entity/*{.js,.ts}"],
    synchronize: true,
})

const db3DataSource = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "Caslueisla!@#",
    database: "Api",
    options: {
        encrypt: false,

    },
    entities: [__dirname + "/entity/*{.js,.ts}"],
    synchronize: true,

})

database.initialize()
    .then(() => {
        console.log('Banco Sqlite de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlite de Dados não inciciado!')
    })

db2DataSource.initialize()
    .then(() => {
        console.log('Banco Mysql de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Mysql de Dados não inciciado!')
    })

db3DataSource.initialize()
    .then(() => {
        console.log('Banco SqlServer de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlserver de Dados não inciciado!')
    })*/
export default database;// db2DataSource; db3DataSource