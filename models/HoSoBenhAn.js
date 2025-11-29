module.exports = (sequelize, DataTypes) => {
  const HoSoBenhAn = sequelize.define('HoSoBenhAn', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    maHoSo: { type: DataTypes.STRING, unique: true, allowNull: false },
    ngayKham: { type: DataTypes.DATEONLY },
    bacSi: { type: DataTypes.STRING },
    chanDoan: { type: DataTypes.STRING }
  }, { tableName: 'hosobenhan', timestamps: true });
  return HoSoBenhAn;
};
