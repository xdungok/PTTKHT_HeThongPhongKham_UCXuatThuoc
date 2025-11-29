const { BenhNhan } = require('../models');

class BenhNhanDAO {
  static async getBenhNhanByCCCD(cccd) {
    const bn = await BenhNhan.findOne({ where: { cccd } });
    if (!bn) return null;
    // package result
    return {
      id: bn.id,
      hoTen: bn.hoTen,
      cccd: bn.cccd,
      ngheNghiep: bn.ngheNghiep,
      maHoSo: bn.maHoSo
    };
  }
}

module.exports = BenhNhanDAO;
