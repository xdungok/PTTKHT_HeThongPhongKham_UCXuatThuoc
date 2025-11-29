const { BaoHiemYTe } = require('../models');

class BaoHiemYTeDAO {
  static async getBaoHiemYTeByMa(maBHYT) {
    const b = await BaoHiemYTe.findOne({ where: { maBHYT } });
    if (!b) return null;
    return { id: b.id, maBHYT: b.maBHYT, percent: b.percent };
  }
}

module.exports = BaoHiemYTeDAO;
