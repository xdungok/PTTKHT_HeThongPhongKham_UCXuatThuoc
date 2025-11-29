const { GiaoDichKhoThuoc } = require('../models');
const ThuocDAO = require('./ThuocDAO');

class GiaoDichKhoThuocDAO {
  static async taoGiaoDichXuat({ maThuoc, soLuong }) {
    const giao = await GiaoDichKhoThuoc.create({ loai: 'XUAT', soLuong, ngayGio: new Date(), thuocId: null });
    const r = await ThuocDAO.capNhatTonKho(maThuoc, -soLuong);
    return { giaoDich: giao, updatedThuoc: r };
  }
}

module.exports = GiaoDichKhoThuocDAO;
