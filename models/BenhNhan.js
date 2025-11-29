module.exports = (sequelize, DataTypes) => {
  const BenhNhan = sequelize.define('BenhNhan', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hoTen: { type: DataTypes.STRING, allowNull: false },
    cccd: { type: DataTypes.STRING, unique: true, allowNull: false },
    ngheNghiep: { type: DataTypes.STRING },
    maHoSo: { type: DataTypes.STRING, unique: true }
  }, { tableName: 'benhnhan', timestamps: true });
  return BenhNhan;
};
