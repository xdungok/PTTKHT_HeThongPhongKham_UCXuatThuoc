const { sequelize, BenhNhan, HoSoBenhAn, DonThuoc, ChiTietDonThuoc, Thuoc, BaoHiemYTe, HoaDon, GiaoDichKhoThuoc } = require('../models');

async function run() {
  try {
    // hiển thị thông tin kết nối (không gồm mật khẩu)
    const DB_NAME = process.env.DB_NAME || 'pharmacy_demo';
    const DB_USER = process.env.DB_USER || 'root';
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_PORT = process.env.DB_PORT || '3307';
    console.log(`Connecting to DB ${DB_NAME} @ ${DB_HOST}:${DB_PORT} as ${DB_USER} (password hidden)`);
    await sequelize.authenticate();
    console.log('Connected. Syncing models...');
    await sequelize.sync({ force: true });
    console.log('DB synced. Seeding sample data...');

    // Bệnh nhân mẫu chính
    const bn = await BenhNhan.create({ hoTen: 'Nguyễn Văn An', cccd: '012345678910', ngheNghiep: 'Lập trình viên', maHoSo: 'BA-20240521-001' });
    const hs = await HoSoBenhAn.create({ maHoSo: 'BA-20240521-001', ngayKham: '2024-05-21', bacSi: 'Dr. Trần Minh Hoàng', chanDoan: 'Viêm họng cấp', benhNhanId: bn.id });

    // Thêm thuốc
    const t1 = await Thuoc.create({ maThuoc: 'T-001', ten: 'Paracetamol 500mg', tonKho: 150, donGia: 1000 });
    const t2 = await Thuoc.create({ maThuoc: 'T-002', ten: 'Amoxicillin 250mg', tonKho: 80, donGia: 2500 });
    const t3 = await Thuoc.create({ maThuoc: 'T-003', ten: 'Loratadine 10mg', tonKho: 0, donGia: 1500 });
    const t4 = await Thuoc.create({ maThuoc: 'T-004', ten: 'Ibuprofen 200mg', tonKho: 120, donGia: 1200 });
    const t5 = await Thuoc.create({ maThuoc: 'T-005', ten: 'Vitamin C 500mg', tonKho: 200, donGia: 800 });

    // Đơn thuốc chính với 3 mục
    const don = await DonThuoc.create({ maDon: 'DT-001', ghiChu: 'Đơn điều trị viêm họng', hoSoId: hs.id });
    await ChiTietDonThuoc.create({ donThuocId: don.id, thuocId: t1.id, soLuong: 20, donGia: t1.donGia });
    await ChiTietDonThuoc.create({ donThuocId: don.id, thuocId: t2.id, soLuong: 30, donGia: t2.donGia });
    await ChiTietDonThuoc.create({ donThuocId: don.id, thuocId: t3.id, soLuong: 10, donGia: t3.donGia });

    // Thêm dữ liệu thử nghiệm
    const a2 = await BenhNhan.create({ hoTen: 'Trần Thị B', cccd: '032145678900', ngheNghiep: 'Giáo viên', maHoSo: 'BA-20250202-002' });
    const hs2 = await HoSoBenhAn.create({ maHoSo: 'BA-20250202-002', ngayKham: '2025-02-02', bacSi: 'Dr. Nguyễn Hùng', chanDoan: 'Dị ứng nhẹ', benhNhanId: a2.id });
    const don2 = await DonThuoc.create({ maDon: 'DT-002', ghiChu: 'Đơn dị ứng', hoSoId: hs2.id });
    await ChiTietDonThuoc.create({ donThuocId: don2.id, thuocId: t3.id, soLuong: 15, donGia: t3.donGia });
    await ChiTietDonThuoc.create({ donThuocId: don2.id, thuocId: t5.id, soLuong: 10, donGia: t5.donGia });

    const a3 = await BenhNhan.create({ hoTen: 'Lê Văn C', cccd: '043216789012', ngheNghiep: 'Kỹ sư', maHoSo: 'BA-20250105-003' });
    const hs3 = await HoSoBenhAn.create({ maHoSo: 'BA-20250105-003', ngayKham: '2025-01-05', bacSi: 'Dr. Phan Thảo', chanDoan: 'Đau đầu', benhNhanId: a3.id });
    const don3 = await DonThuoc.create({ maDon: 'DT-003', ghiChu: 'Đơn đau đầu', hoSoId: hs3.id });
    await ChiTietDonThuoc.create({ donThuocId: don3.id, thuocId: t4.id, soLuong: 8, donGia: t4.donGia });

    // Một số mục BHYT mẫu
    await BaoHiemYTe.create({ maBHYT: 'BHYT-123', percent: 0.8 });
    await BaoHiemYTe.create({ maBHYT: 'BHYT-555', percent: 0.5 });

    // Tạo một số hóa đơn mẫu: một hóa đơn tạm chưa thanh toán và một hóa đơn đã thanh toán
    const invoice1 = await HoaDon.create({ maHoaDon: 'HD-0001', benhNhanId: bn.id, donThuocId: don.id, tongTien: 96000, bhytMa: null, trangThai: 'CHỜ THANH TOÁN' });
    const invoice2 = await HoaDon.create({ maHoaDon: 'HD-0002', benhNhanId: a2.id, donThuocId: don2.id, tongTien: 50000, bhytMa: 'BHYT-555', trangThai: 'ĐÃ THANH TOÁN' });

    // Mô phỏng xuất kho cho hóa đơn đã thanh toán số 2 (giảm số lượng trong kho)
    await GiaoDichKhoThuoc.create({ loai: 'XUAT', soLuong: 15, ngayGio: new Date(), thuocId: t3.id });
    await Thuoc.update({ tonKho: t3.tonKho - 15 }, { where: { id: t3.id } });

    await GiaoDichKhoThuoc.create({ loai: 'XUAT', soLuong: 20, ngayGio: new Date(), thuocId: t1.id });
    await Thuoc.update({ tonKho: t1.tonKho - 20 }, { where: { id: t1.id } });

    console.log('Seeded sample data.');
    process.exit(0);
  } catch (err) {
    console.error('Error during migrate+seed:', err && err.message ? err.message : err);
    // Đưa ra gợi ý nếu mất kết nối
    if (err && err.parent && err.parent.code === 'ECONNREFUSED') {
      console.error('Connection refused: check that MySQL server is running and that DB_HOST/DB_PORT in .env are correct.');
      console.error('On Windows you can check: netstat -ano | findstr <port>');
      console.error('Try connecting with the mysql client: mysql -u <user> -p -h <host> -P <port>');
    }
    console.error('If you are using a non-default MySQL port (e.g., 3307), confirm your MySQL server is listening on that port.');
    process.exit(1);
  }
}

run();
