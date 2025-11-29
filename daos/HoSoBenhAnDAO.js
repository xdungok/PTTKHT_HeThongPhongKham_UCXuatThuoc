const { HoSoBenhAn } = require('../models');

class HoSoBenhAnDAO {
  static async getHoSoByMa(maHoSo) {
    const h = await HoSoBenhAn.findOne({ where: { maHoSo } });
    if (!h) return null;
    return {
      id: h.id,
      maHoSo: h.maHoSo,
      ngayKham: h.ngayKham,
      bacSi: h.bacSi,
      chanDoan: h.chanDoan,
    };
  }
}

module.exports = HoSoBenhAnDAO;
