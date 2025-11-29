const express = require('express');
const router = express.Router();

// Dashboard / gdTrangChuDuocSi.jsp
router.get('/', (req, res) => {
  res.render('gdTrangChuDuocSi', { title: 'Bảng điều khiển - Dược sĩ' });
});

module.exports = router;
