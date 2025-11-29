const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');

const BenhNhan = require('./BenhNhan')(sequelize, DataTypes);
const HoSoBenhAn = require('./HoSoBenhAn')(sequelize, DataTypes);
const DonThuoc = require('./DonThuoc')(sequelize, DataTypes);
const ChiTietDonThuoc = require('./ChiTietDonThuoc')(sequelize, DataTypes);
const Thuoc = require('./Thuoc')(sequelize, DataTypes);
const HoaDon = require('./HoaDon')(sequelize, DataTypes);
const GiaoDichKhoThuoc = require('./GiaoDichKhoThuoc')(sequelize, DataTypes);
const BaoHiemYTe = require('./BaoHiemYTe')(sequelize, DataTypes);

// Associations
BenhNhan.hasMany(HoSoBenhAn, { foreignKey: 'benhNhanId' });
HoSoBenhAn.belongsTo(BenhNhan, { foreignKey: 'benhNhanId' });

HoSoBenhAn.hasOne(DonThuoc, { foreignKey: 'hoSoId' });
DonThuoc.belongsTo(HoSoBenhAn, { foreignKey: 'hoSoId' });

DonThuoc.hasMany(ChiTietDonThuoc, { foreignKey: 'donThuocId' });
ChiTietDonThuoc.belongsTo(DonThuoc, { foreignKey: 'donThuocId' });

Thuoc.hasMany(ChiTietDonThuoc, { foreignKey: 'thuocId' });
ChiTietDonThuoc.belongsTo(Thuoc, { foreignKey: 'thuocId' });

BenhNhan.hasMany(HoaDon, { foreignKey: 'benhNhanId' });
HoaDon.belongsTo(BenhNhan, { foreignKey: 'benhNhanId' });

DonThuoc.hasOne(HoaDon, { foreignKey: 'donThuocId' });
HoaDon.belongsTo(DonThuoc, { foreignKey: 'donThuocId' });

Thuoc.hasMany(GiaoDichKhoThuoc, { foreignKey: 'thuocId' });
GiaoDichKhoThuoc.belongsTo(Thuoc, { foreignKey: 'thuocId' });

module.exports = {
  sequelize,
  BenhNhan,
  HoSoBenhAn,
  DonThuoc,
  ChiTietDonThuoc,
  Thuoc,
  HoaDon,
  GiaoDichKhoThuoc,
  BaoHiemYTe,
};
