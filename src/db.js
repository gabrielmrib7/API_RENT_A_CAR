//Criar uma conexão mysql com migrations
import knex from 'knex';
import dotenv from 'dotenv';

//Aqui configuramos a conexão com o banco de dados usando as variáveis de ambiente

dotenv.config();

export const db = knex({
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
});
