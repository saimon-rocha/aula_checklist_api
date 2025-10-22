// src/app.js
import express from 'express';
import cors from 'cors';
import routes from './routes.js'; // rotas
import { sequelize } from './database/index.js'; // conexão com o DB
import 'dotenv/config';

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Rotas
app.use('/', routes);

// Inicializa banco (se precisar)
sequelize.authenticate()
  .then(() => console.log('Banco conectado!'))
  .catch(err => console.error('Erro ao conectar no banco:', err));

export default app;
