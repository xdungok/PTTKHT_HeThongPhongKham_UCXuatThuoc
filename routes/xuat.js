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

// Fetch prescription by medical record (maHoSo)
router.get('/api/hoso/:maHoSo/donthuoc', async (req, res) => {
  try {
    const { maHoSo } = req.params;
    const { DonThuoc } = require('../models');
    // find prescription linked to this medical record
    const don = await DonThuoc.findOne({ include: [{ association: 'HoSoBenhAn', where: { maHoSo } }] });
    if (!don) return res.status(404).json({ message: 'Không tìm thấy đơn thuốc cho hồ sơ này' });
    // fetch full details with medicine info
    const item = await DonThuocDAO.getDonThuocChiTiet(don.maDon);
    return res.json(item);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Lỗi server' });
  }
});

module.exports = router;
