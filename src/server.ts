import express from 'express';
//import database from './database/ormconfig'
//import db2DataSource from './database/ormconfig'
import db3DataSource from './database/ormconfig'
import routes from './routes';
import cors from 'cors';
import cookieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(routes)
app.use(cors({
  origin: ['http://localhost:3000', 'https://meuapp.com'],
  credentials: true // Habilita o uso de cookies
}))
app.use(cookieParser())

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);

  //console.log(database.isInitialized ? 'Banco Sqllite Dados OK! :' : 'Banco Sqllite Carregando!')

  //console.log(db2DataSource.isInitialized ? 'Banco Mysql Dados OK! :' : 'Banco Mysql Carregando!')

  console.log(db3DataSource.isInitialized ? 'Banco Sqlserver Dados OK! :' : 'Banco Sqlserver Carregando!')
})

