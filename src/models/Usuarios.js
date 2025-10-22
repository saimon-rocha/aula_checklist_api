import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

export default class Usuarios extends Model {
  static associate(models) {
    this.belongsTo(models.Filiais, { foreignKey: 'id_filial', as: 'Filiais' });
  }

  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }
}

export function initUsuarios(sequelize) {
  Usuarios.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      username: { type: DataTypes.STRING(100), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(255), allowNull: false },
      cpf: { type: DataTypes.CHAR(11), allowNull: false, unique: true },
      id_filial: { type: DataTypes.INTEGER, allowNull: false },
      id_ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      id_admin: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    {
      sequelize,
      modelName: 'Usuarios',
      tableName: 'usuarios',
      underscored: true,
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeUpdate: async (user) => {
          if (user.changed('password') && user.password) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return Usuarios;
}
