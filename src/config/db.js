import 'dotenv/config'; // carrega o .env automaticamente
const useSSL =
  (process.env.DATABASE_HOST || process.env.DB_HOST || "").includes("render");

// export default {
//   username: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
//   dialect: process.env.DB_DIALECT ? process.env.DB_DIALECT.replace(/'/g, '') : 'postgres',
//   dialectOptions: process.env.DB_SSL === 'true' ? { ssl: { require: true, rejectUnauthorized: false } } : {},
// };

// Produção
export default {
  host: process.env.DATABASE_HOST || process.env.DB_HOST || "localhost",
  database: process.env.DATABASE_NAME || process.env.DB_NAME || "",
  username: String(process.env.DATABASE_USER || process.env.DB_USER || ""),
  password: String(process.env.DATABASE_PASSWORD || process.env.DB_PASS || ""),
  dialect: process.env.DATABASE_DIALECT || process.env.DB_DIALECT || "postgres",
  port: Number(process.env.DATABASE_PORT || process.env.DB_PORT || 5432),
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



