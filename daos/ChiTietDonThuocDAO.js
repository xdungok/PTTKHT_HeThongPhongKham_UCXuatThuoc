const { ChiTietDonThuoc, Thuoc } = require('../models');

class ChiTietDonThuocDAO {
  static async getChiTietByMaDonThuoc(donThuocId) {
    const items = await ChiTietDonThuoc.findAll({ where: { donThuocId }, include: [{ model: Thuoc }] });
    return items.map(i => ({ id: i.id, soLuong: i.soLuong, donGia: i.donGia, thuoc: i.Thuoc ? { maThuoc: i.Thuoc.maThuoc, ten: i.Thuoc.ten, tonKho: i.Thuoc.tonKho } : null }));
  }
}

module.exports = ChiTietDonThuocDAO;
