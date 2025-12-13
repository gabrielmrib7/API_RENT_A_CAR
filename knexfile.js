import dotenv from 'dotenv';

dotenv.config();

export const knexConfig = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'js',
    directory: './migrations',
  },
};

export default knexConfig;