import 'dotenv/config'

export default {
  production: {
    client: 'pg',
      connection: {
    connectionString: process.env.POSTGRES_URL_NON_POOLING,
    ssl: true
  },
    migrations: {
      directory: './migrations',
      extension: 'js'
    }
  }
}