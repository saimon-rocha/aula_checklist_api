import { Usuarios as User } from '../database/index.js';
import jwt from 'jsonwebtoken';

class LoginController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      // Validação básica
      if (!username || !password) {
        return res.status(400).json({ error: "Username e password são obrigatórios" });
      }

      // Busca usuário pelo username
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      // Verifica se a senha está correta
      const senhaValida = await user.checkPassword(password);
      if (!senhaValida) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      // Gera token JWT
      const token = jwt.sign(
        { id: user.id, username: user.username, id_filial: user.id_filial, id_admin: user.id_admin},
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      // console.log(`Login bem-sucedido: ${username}`);

      return res.json({ token });
    } catch (err) {
      console.error("Erro no login:", err);
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}

export default LoginController;