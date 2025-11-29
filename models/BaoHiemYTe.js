module.exports = (sequelize, DataTypes) => {
  const BaoHiemYTe = sequelize.define('BaoHiemYTe', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    maBHYT: { type: DataTypes.STRING, unique: true, allowNull: false },
    percent: { type: DataTypes.FLOAT, defaultValue: 0 }
  }, { tableName: 'baohiemyte', timestamps: true });
  return BaoHiemYTe;
};
