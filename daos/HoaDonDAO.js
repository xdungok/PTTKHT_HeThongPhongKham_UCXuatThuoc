const { HoaDon } = require('../models');

class HoaDonDAO {
  static async taoHoaDonTamThoi({ benhNhanId, donThuocId, tongTien, bhytMa }) {
    const h = await HoaDon.create({ maHoaDon: 'HD-' + Date.now(), benhNhanId, donThuocId, tongTien, bhytMa, trangThai: 'CHỜ THANH TOÁN' });
    return { id: h.id, maHoaDon: h.maHoaDon, trangThai: h.trangThai, tongTien: h.tongTien };
  }

  static async capNhatHoaDonDaThanhToan(maHoaDon) {
    const h = await HoaDon.findOne({ where: { maHoaDon } });
    if (!h) return null;
    h.trangThai = 'ĐÃ THANH TOÁN';
    await h.save();
    return { id: h.id, maHoaDon: h.maHoaDon, trangThai: h.trangThai };
  }
}

module.exports = HoaDonDAO;
