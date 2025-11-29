const { Thuoc } = require('../models');

class ThuocDAO {
  static async getThuocByMa(maThuoc) {
    const t = await Thuoc.findOne({ where: { maThuoc } });
    if (!t) return null;
    return { id: t.id, maThuoc: t.maThuoc, ten: t.ten, tonKho: t.tonKho, donGia: t.donGia };
  }

  static async capNhatTonKho(maThuoc, delta) {
    const t = await Thuoc.findOne({ where: { maThuoc } });
    if (!t) return null;
    t.tonKho = t.tonKho + delta;
    await t.save();
    return { id: t.id, maThuoc: t.maThuoc, tonKho: t.tonKho };
  }
}

module.exports = ThuocDAO;
