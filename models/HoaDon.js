module.exports = (sequelize, DataTypes) => {
  const HoaDon = sequelize.define('HoaDon', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    maHoaDon: { type: DataTypes.STRING, unique: true, allowNull: false },
    trangThai: { type: DataTypes.STRING, defaultValue: 'CHỜ THANH TOÁN' },
    tongTien: { type: DataTypes.FLOAT, defaultValue: 0 },
    bhytMa: { type: DataTypes.STRING }
  }, { tableName: 'hoadon', timestamps: true });
  return HoaDon;
};
