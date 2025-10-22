import { Model, DataTypes } from 'sequelize';

export default class Formulario extends Model {
  static associate(models) {
    this.belongsTo(models.Usuarios, { foreignKey: 'usuario_id' });
    this.belongsTo(models.Filiais, { foreignKey: 'filial_id' });
  }
}

export function initFormulario(sequelize) {
  Formulario.init(
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      titulo: { type: DataTypes.STRING(255), allowNull: false },
      usuario_id: { type: DataTypes.INTEGER },
      filial_id: { type: DataTypes.INTEGER },
      respostas: { type: DataTypes.JSONB, allowNull: false },
      id_ativo: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true }
    },
    {
      sequelize,
      modelName: 'Formulario',
      tableName: 'formularios',
      underscored: true,
    }
  );

  return Formulario;
}
