import Formulario from '../models/Formulario.js';
import { Usuarios, Filiais } from "../database/index.js"; // <-- ESSE IMPORT

class ArquivosController {
    static async createFormulario(req, res) {
        try {
            const { titulo, usuario_id, filial_id, respostas, id_ativo } = req.body;

            if (!titulo || !respostas) {
                return res.status(400).json({ error: "Título e respostas são obrigatórios" });
            }

            const formulario = await Formulario.create({
                titulo,
                usuario_id,
                filial_id,
                respostas,
                id_ativo,
                created_at: new Date(),
                updated_at: new Date(),
            });

            return res.status(201).json(formulario);
        } catch (err) {
            console.error("Erro ao criar formulário:", err);
            return res.status(500).json({ error: "Erro ao criar formulário" });
        }
    }

    static async listFormularios(req, res) {
        try {

            const formularios = await Formulario.findAll({
                where: { id_ativo: true },
                include: [
                    { model: Usuarios, attributes: ["id", "username"] },
                    { model: Filiais, attributes: ["id", "nome"] },
                ],
                order: [["created_at", "DESC"]],
            });

            return res.json(formularios);
        } catch (err) {
            console.error("Erro ao listar formulários:", err);
            return res.status(500).json({ error: "Erro ao listar formulários" });
        }
    }


    static async deletFormulario(req, res) {
        try {
            const { id } = req.params;
            const formulario = await Formulario.findByPk(id);

            if (!formulario) return res.status(404).json({ error: "Formulário não encontrado" });

            formulario.id_ativo = false; // boolean
            await formulario.save();

            return res.json({ message: "Formulário excluído com sucesso" });
        } catch (error) {
            console.error("Erro ao excluir formulário:", error);
            return res.status(500).json({ error: "Erro ao excluir formulário" });
        }
    }

}

export default ArquivosController;
