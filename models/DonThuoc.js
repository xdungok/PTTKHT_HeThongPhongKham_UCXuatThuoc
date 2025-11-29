module.exports = (sequelize, DataTypes) => {
  const DonThuoc = sequelize.define('DonThuoc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    maDon: { type: DataTypes.STRING, unique: true, allowNull: false },
    ghiChu: { type: DataTypes.TEXT }
  }, { tableName: 'donthuoc', timestamps: true });
  return DonThuoc;
};
