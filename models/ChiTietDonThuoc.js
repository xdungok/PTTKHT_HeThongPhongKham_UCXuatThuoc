module.exports = (sequelize, DataTypes) => {
  const ChiTietDonThuoc = sequelize.define('ChiTietDonThuoc', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    soLuong: { type: DataTypes.INTEGER, allowNull: false },
    donGia: { type: DataTypes.FLOAT, defaultValue: 0 }
  }, { tableName: 'chitietdonthuoc', timestamps: true });
  return ChiTietDonThuoc;
};
