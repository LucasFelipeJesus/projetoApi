"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const typeorm_1 = require("typeorm");
const database = new typeorm_1.DataSource({
    type: 'sqlite',
    database: './src/database/database.sqlite',
    logging: true,
    synchronize: true,
    entities: [
        (0, path_1.join)(__dirname, '..', 'models/*.{ts,js}')
    ]
});
database.initialize()
    .then(() => {
    console.log('Banco de Dados inciciado!');
}).catch(() => {
    console.log('Falha!!! Banco de Dados não inciciado!');
});
exports.default = database;
