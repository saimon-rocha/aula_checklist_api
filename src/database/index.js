import { Sequelize } from 'sequelize';
import dbConfig from '../config/db.js';
import { initUsuarios } from '../models/Usuarios.js';
import { initFiliais } from '../models/Filiais.js';
import { initFormulario } from '../models/Formulario.js';

// Define o ambiente (development ou production)
const config = dbConfig;

// Cria instância do Sequelize com dialect definido
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectOptions: config.dialectOptions,
    logging: config.logging
  }
);

// Inicializa modelos
const Usuarios = initUsuarios(sequelize);
const Filiais = initFiliais(sequelize);
const Formulario = initFormulario(sequelize);

// Associações
if (Usuarios.associate) Usuarios.associate({ Filiais, Formulario });
if (Filiais.associate) Filiais.associate({ Usuarios, Formulario });
if (Formulario.associate) Formulario.associate({ Usuarios, Filiais });

export { sequelize, Usuarios, Filiais, Formulario };
