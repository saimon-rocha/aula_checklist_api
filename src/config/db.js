import 'dotenv/config'; // carrega o .env automaticamente

// Detecta se precisa de SSL
const useSSL =
  (process.env.DATABASE_HOST || "").includes("render") || process.env.DATABASE_SSL === 'true';

// Produção
export default {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  username: String(process.env.DATABASE_USER),
  password: String(process.env.DATABASE_PASSWORD),
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  port: Number(process.env.DATABASE_PORT || 5432),
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      }
    : undefined,
  logging: false,
};
