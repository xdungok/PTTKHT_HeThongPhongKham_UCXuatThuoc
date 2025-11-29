const { DonThuoc, ChiTietDonThuoc } = require('../models');
const ChiTietDonThuocDAO = require('./ChiTietDonThuocDAO');

class DonThuocDAO {
  static async getDonThuocChiTiet(maDon) {
    const don = await DonThuoc.findOne({ where: { maDon } });
    if (!don) return null;
    const chiTiet = await ChiTietDonThuocDAO.getChiTietByMaDonThuoc(don.id);
    return { id: don.id, maDon: don.maDon, chiTiet };
  }
}

module.exports = DonThuocDAO;
