import { join } from "path";
import { DataSource } from "typeorm";


/*const database = new DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ]
})*/
/*
const db2DataSource = new DataSource({
    type: "mysql",
    host: "bd-mysql-01.mysql.database.azure.com",
    port: 3306,
    username: "lucasjesus01",
    password: "Caslueisla!",
    database: "api",
    ssl: true,
    // Remove the 'certificate' property from the MysqlConnectionOptions object
    // certificate: "D:/certificado/BaltimoreCyberTrustRoot.crt.pem",
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ],

})*/

const db3DataSource = new DataSource({
    type: "mssql",
    host: "bd-testes.database.windows.net",
    port: 1433,
    username: "lucasjesus01",
    password: "Caslueisla!",
    database: "bd-sql-01",
    options: {
        encrypt: true,
        trustServerCertificate: false

    },
    "logging": true,
    synchronize: true,
    entities:
        [
            join(__dirname, '..', 'models/*.{ts,js}')
        ]


})
/*
database.initialize()
    .then(() => {
        console.log('Banco Sqlite de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlite de Dados não inciciado!')
    })
*/
/*
db2DataSource.initialize()
    .then(() => {
        console.log('Banco Mysql de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Mysql de Dados não inciciado!')
    })
*/
db3DataSource.initialize()
    .then(() => {
        console.log('Banco SqlServer de Dados inciciado!')
    }).catch(() => {
        console.log('Falha!!! Banco Sqlserver de Dados não inciciado!')
    })
export default //database; 
    // db2DataSource;
    db3DataSource