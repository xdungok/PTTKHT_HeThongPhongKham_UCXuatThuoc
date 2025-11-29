module.exports = (sequelize, DataTypes) => {
  const Thuoc = sequelize.define('Thuoc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    maThuoc: { type: DataTypes.STRING, unique: true, allowNull: false },
    ten: { type: DataTypes.STRING },
    tonKho: { type: DataTypes.INTEGER, defaultValue: 0 },
    donGia: { type: DataTypes.FLOAT, defaultValue: 0 }
  }, { tableName: 'thuoc', timestamps: true });
  return Thuoc;
};
