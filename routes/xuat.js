const express = require('express');
const router = express.Router();

// Trang Xuất thuốc
router.get('/', (req, res) => {
  res.render('gdXuatThuoc', { title: 'Xuất thuốc' });
});

// liên kết các DAO
const BenhNhanDAO = require('../daos/BenhNhanDAO');
const HoSoBenhAnDAO = require('../daos/HoSoBenhAnDAO');
const DonThuocDAO = require('../daos/DonThuocDAO');

router.get('/api/patient/:cccd', async (req, res) => {
  try {
    const item = await BenhNhanDAO.getBenhNhanByCCCD(req.params.cccd);
    if (!item) return res.status(404).json({ message: 'Bệnh nhân không tìm thấy' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

router.get('/api/hoso/:ma', async (req, res) => {
  try {
    const item = await HoSoBenhAnDAO.getHoSoByMa(req.params.ma);
    if (!item) return res.status(404).json({ message: 'Hồ sơ không tìm thấy' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

router.get('/api/donthuoc/:ma', async (req, res) => {
  try {
    const item = await DonThuocDAO.getDonThuocChiTiet(req.params.ma);
    if (!item) return res.status(404).json({ message: 'Đơn thuốc không tìm thấy' });
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
