# DESIGN & ARCHITECTURE

Demo nhỏ này sử dụng kiến trúc 3 lớp để minh họa rõ ràng luồng:

1) Lớp trình bày (Presentation Layer: Views + static)
   - Các template (thư mục views/) là các file EJS được đặt tên theo các trang JSP trong luồng của bạn: gdTrangChuDuocSi.ejs, gdXuatThuoc.ejs, gdHoaDon.ejs, doXuatThuoc.ejs.
   - CSS / JS trong public/ cung cấp giao diện và các tương tác phía client.

2) Lớp nghiệp vụ (Business Logic: Controllers / Routes)
   - Thư mục routes/ chứa các route của Express thực hiện các luồng và render trang.
   - routes/xuat.js thực hiện luồng tìm kiếm → xem hồ sơ → xem đơn thuốc.
   - routes/hoadon.js thực hiện tạo hóa đơn, kiểm tra BHYT, thanh toán và bước xuất kho.

3) Lớp truy cập dữ liệu (Data Access Layer: DAO + ORM)
   - Thư mục models/ chứa các định nghĩa model Sequelize (BenhNhan, HoSoBenhAn, DonThuoc, ChiTietDonThuoc, Thuoc, HoaDon, GiaoDichKhoThuoc, BaoHiemYTe).
   - Thư mục daos/ chứa các class DAO nhỏ (BenhNhanDAO, HoSoBenhAnDAO, DonThuocDAO, ChiTietDonThuocDAO, ThuocDAO, HoaDonDAO, GiaoDichKhoThuocDAO, BaoHiemYTeDAO) bao bọc các gọi đến model.

Sơ đồ luồng (tổng quan):
- gdTrangChuDuocSi (bảng điều khiển) → người dùng click “Xuất thuốc” → gdXuatThuoc.
- gdXuatThuoc gọi /xuat/api/patient/:cccd (BenhNhanDAO.getBenhNhanByCCCD) để tải thực thể bệnh nhân (BenhNhan).
- Khi xem hồ sơ, nó gọi /xuat/api/hoso/:maHoSo (HoSoBenhAnDAO.getHoSoByMa) trả về thực thể HoSoBenhAn.
- Khi xem một đơn thuốc, nó gọi /xuat/api/donthuoc/:ma (DonThuocDAO.getDonThuocChiTiet) để lấy DonThuoc cùng các mục ChiTietDonThuoc; ChiTiet bao gồm thông tin Thuoc.
- Tạo hóa đơn tạm thời gọi /hoadon/api/create-temp sử dụng HoaDonDAO.taoHoaDonTamThoi và trả về một thực thể HoaDon tạm.
- Thanh toán gọi /hoadon/pay để cập nhật hóa đơn thông qua HoaDonDAO.capNhatHoaDonDaThanhToan.
- Xuất kho gọi /hoadon/api/export sử dụng GiaoDichKhoThuocDAO.taoGiaoDichXuat và ThuocDAO.capNhatTonKho để ghi nhận giao dịch xuất và cập nhật tồn kho.

