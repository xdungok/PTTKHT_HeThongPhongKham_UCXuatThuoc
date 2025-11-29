const express = require('express');
const router = express.Router();

const BenhNhanDAO = require('../daos/BenhNhanDAO');
const DonThuocDAO = require('../daos/DonThuocDAO');
const HoaDonDAO = require('../daos/HoaDonDAO');
const BaoHiemYTeDAO = require('../daos/BaoHiemYTeDAO');
const GiaoDichKhoThuocDAO = require('../daos/GiaoDichKhoThuocDAO');

// Mở trang hóa đơn (gdHoaDon.jsp)
router.get('/create', (req, res) => {
  const { maDonThuoc = 'DT-001', maBenhNhan = 'BN-001' } = req.query;
  res.render('gdHoaDon', { title: 'Hóa đơn thuốc', maDonThuoc, maBenhNhan });
});

router.post('/api/create-temp', async (req, res) => {
  try {
    const { maDonThuoc, maBenhNhan } = req.body;
    // tra cứu bệnh nhân
    const bn = await BenhNhanDAO.getBenhNhanByCCCD(maBenhNhan) || null;
    // tải đơn thuốc
    const dt = await DonThuocDAO.getDonThuocChiTiet(maDonThuoc);
    if (!dt) return res.status(404).json({ message: 'Đơn thuốc không tìm thấy' });

    let tong = 0;
    dt.chiTiet.forEach(i => { tong += (i.soLuong * i.donGia); });

    const invoice = await HoaDonDAO.taoHoaDonTamThoi({ benhNhanId: bn ? bn.id : null, donThuocId: dt.id, tongTien: tong, bhytMa: null });
    return res.json({ invoice, donThuoc: dt, patient: bn });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

router.post('/pay', async (req, res) => {
  const { invoiceId } = req.body;
  // cập nhật hóa đơn sang trạng thái đã thanh toán
  try {
    const updated = await HoaDonDAO.capNhatHoaDonDaThanhToan(invoiceId);
    if (!updated) return res.status(404).json({ success: false, message: 'Hóa đơn không tìm thấy' });
    return res.json({ success: true, invoiceId: invoiceId, status: updated.trangThai });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Lỗi' });
  }
});

// xuất hàng vào kho, tạo giao dịch và cập nhật số lượng
router.post('/api/export', async (req, res) => {
  try {
    const { items } = req.body; // each item: { maThuoc, soLuong }
    const results = [];
    for (const it of items) {
      const r = await GiaoDichKhoThuocDAO.taoGiaoDichXuat({ maThuoc: it.maThuoc, soLuong: it.soLuong });
      results.push(r);
    }
    return res.json({ success: true, results });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Lỗi export' });
  }
});

router.get('/doXuatThuoc', (req, res) => {
  res.render('doXuatThuoc', { title: 'Xuất thuốc' });
});

// API for insurance check
router.get('/api/insurance/:code', async (req, res) => {
  try {
    const b = await BaoHiemYTeDAO.getBaoHiemYTeByMa(req.params.code);
    if (!b) return res.status(404).json({ message: 'Không tìm thấy BHYT' });
    return res.json(b);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
