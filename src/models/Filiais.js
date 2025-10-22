import { Model, DataTypes } from 'sequelize';

export default class Filiais extends Model {
  static associate(models) {
    this.hasMany(models.Usuarios, { foreignKey: 'id_filial' });
  }
}

export function initFiliais(sequelize) {
  Filiais.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      nome: { type: DataTypes.STRING(100), allowNull: false },
      rua: {type: DataTypes.STRING(100), allowNull: false},
      bairro: {type: DataTypes.STRING(100), allowNull: false},
      cep: {type: DataTypes.INTEGER, allowNull: false},
      id_ativo: { type: DataTypes.BOOLEAN, allowNull: false }
    },
    {
      sequelize,
      modelName: 'Filiais',
      tableName: 'filiais',
      underscored: true,
    }
  );

  return Filiais;
}
