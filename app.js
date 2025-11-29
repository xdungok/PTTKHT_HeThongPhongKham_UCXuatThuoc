const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// Công cụ hiển thị
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/static', express.static(path.join(__dirname, 'public')));

// Các route cơ bản
const indexRouter = require('./routes/index');
const xuatRouter = require('./routes/xuat');
const hoaDonRouter = require('./routes/hoadon');

app.use('/', indexRouter);
app.use('/xuat', xuatRouter);
app.use('/hoadon', hoaDonRouter);

// Bộ xử lý lỗi
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server started on http://localhost:${port}`));

module.exports = app;
