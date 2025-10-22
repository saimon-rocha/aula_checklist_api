import { Usuarios as User, Filiais } from '../database/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class FilialController {

    static async create(req, res) {
        try {
            const { nomeFilial, rua, bairro, cep, id_ativo } = req.body;
            const filial = await Filiais.create({
                nome: nomeFilial,
                rua,
                bairro,
                cep,
                id_ativo,
                created_at: new Date(),
                updated_at: new Date(),
            });
            return res.status(201).json(filial);
        } catch (err) {
            console.error("Erro ao criar filial:", err);
            return res.status(500).json({ error: "Erro ao criar filial" });
        }
    }

    static async listFiliais(req, res) {
        try {

            const filiais = await Filiais.findAll({
                where: { id_ativo: true },
                attributes: ['id', 'nome', 'cep', 'rua', 'bairro']
            });

            return res.json(filiais);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar filiais' });
        }
    }

    static async deletFilial(req, res) {
        try {

            const filial = await Filiais.findByPk(req.params.id);
            if (!filial) return res.status(404).json({ error: 'Filial Não Encontrada' })

            filial.id_ativo = false; // boolean
            await filial.save();


            return res.json({ message: "Filial excluída com sucesso" });
        } catch (error) {
            console.error(`Ocorreu um erro ao deletar ${error}`);
            return res.status(500).json({ error: 'Erro ao Deletar Filial' })
        }
    }
}

export default FilialController;