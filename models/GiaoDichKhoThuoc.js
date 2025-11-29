module.exports = (sequelize, DataTypes) => {
  const GiaoDichKhoThuoc = sequelize.define('GiaoDichKhoThuoc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    loai: { type: DataTypes.STRING },
    soLuong: { type: DataTypes.INTEGER },
    ngayGio: { type: DataTypes.DATE }
  }, { tableName: 'giaodichkhothuoc', timestamps: true });
  return GiaoDichKhoThuoc;
};
