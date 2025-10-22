import { Usuarios, Filiais } from "../database/index.js";
import { Op } from "sequelize";

class UserController {
  // 🔹 Criação de usuário
  static async createUser(req, res) {
    try {
      const { username, password, cpf, filial, cep, rua, bairro } = req.body;

      // Validação básica
      if (!username || !password || !cpf || !filial) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios" });
      }

      // Verifica se a filial existe (por ID ou nome)
      let filialRecord;
      if (!isNaN(filial)) {
        filialRecord = await Filiais.findByPk(Number(filial));
        if (!filialRecord) {
          return res.status(400).json({ error: "Filial não encontrada" });
        }
      } else {
        filialRecord = await Filiais.findOne({ where: { nome: filial } });

        if (!filialRecord) {
          filialRecord = await Filiais.create({ nome: filial });
        }
      }

      // Verifica se já existe usuário com o mesmo email ou CPF
      const existente = await Usuarios.findOne({
        where: { [Op.or]: [{ username }, { cpf }] },
      });

      if (existente) {
        return res.status(409).json({ error: "Usuário ou CPF já cadastrado" });
      }

      // Cria o usuário
      const user = await Usuarios.create({
        username,
        password,
        cpf,
        id_filial: filialRecord.id,
        cep,
        rua,
        bairro,
      });

      return res.status(201).json({
        message: "Usuário criado com sucesso!",
        username: user.username,
        cpf: user.cpf,
        filial: filialRecord.nome,
      });
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      return res.status(500).json({ error: "Erro ao criar usuário" });
    }
  }

  // 🔹 Listagem de usuários
  static async listUser(req, res) {
    try {
      const usuarios = await Usuarios.findAll({
        attributes: ["id", "username", "cpf", "id_filial", "id_ativo"],
        include: [
          {
            model: Filiais,
            as: "Filiais",
            attributes: ["id", "nome"],
          },
        ],
      });
      return res.json(usuarios);
    } catch (err) {
      console.error("Erro ao listar usuários:", err);
      return res.status(500).json({ error: "Erro ao listar usuários" });
    }
  }



  // 🔹 Desativação de usuário
  static async deleteUser(req, res) {
    try {
      const user = await Usuarios.findByPk(req.id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      user.id_ativo = 0;
      await user.save();

      return res.json({ message: "Usuário desativado com sucesso!" });
    } catch (err) {
      console.error("Erro ao desativar usuário:", err);
      return res.status(500).json({ error: "Erro ao desativar usuário" });
    }
  }
}

export default UserController;
