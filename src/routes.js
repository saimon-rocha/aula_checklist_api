import express from 'express'
const router = express.Router();
import LoginController from './controllers/LoginController.js';
import UserController from './controllers/UserController.js';
import FilialController from './controllers/FilialController.js';
import ArquivosController from './controllers/ArquivosController.js';


// Usuário
router.get("/usuarios", UserController.listUser);
router.post("/usuarios", UserController.createUser);
router.put("/usuarios/:id", UserController.deleteUser);

// Login
router.post("/login", LoginController.login);

// Lista filiais
router.get("/filiais", FilialController.listFiliais);
router.post("/filiais", FilialController.create);
router.put("/filiais/:id/ativo", FilialController.deletFilial);


// Criar Arquivo
router.get("/formularios", ArquivosController.listFormularios);
router.post("/formularios", ArquivosController.createFormulario);
router.put("/formularios/:id/ativo", ArquivosController.deletFormulario);

export default router
