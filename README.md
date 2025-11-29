# Demo Nhà Thuốc (Node.js + Express + Sequelize + MySQL)

Repository này là một demo nhỏ triển khai luồng làm việc tại nhà thuốc theo yêu cầu của bạn. Kiến trúc gồm có: Lớp trình bày (EJS templates, CSS/JS), Lớp nghiệp vụ (Node.js/Express routes) và Lớp truy cập dữ liệu (Sequelize models + DAOs). Làm theo hướng dẫn dưới đây để chạy cục bộ với MySQL.

## Setup

1. Tạo một cơ sở dữ liệu trong MySQL của bạn (tên: pharmacy_demo) hoặc đặt biến môi trường DB_NAME.
Ví dụ SQL trong MySQL Workbench:

   CREATE DATABASE pharmacy_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;

2. Cấu hình kết nối DB qua biến môi trường (hoặc dùng mặc định trong config/database.js):

   - DB_NAME (mặc định: pharmacy_demo)
   - DB_USER (mặc định: root)
   - DB_PASS (mặc định: rỗng)
   - DB_HOST (mặc định: localhost)
   - DB_PORT (mặc định: 3306)

3. Cài đặt các dependency:

```powershell
cd e:\PTTKHT\demo
npm install
```

4. Chạy migration + seed (lệnh này sẽ xóa và tạo lại các bảng):

```powershell
npm run migrate
```

5. Khởi động ứng dụng:

```powershell
npm run dev
# or: npm start
```

Mở trình duyệt truy cập http://localhost:3000 để xem giao diện demo.
Sử dụng CCCD 012345678910 để tìm bệnh nhân mẫu "Nguyễn Văn An".
Sử dụng mã BHYT BHYT-123 để thử tính chiết khấu bảo hiểm.

## Tùy chọn: chạy kiểm tra API cơ bản

Khi server đang chạy cục bộ (port 3000), chạy:

```powershell
npm run sanity
```

Script đơn giản này thực hiện các kiểm tra cơ bản trên các endpoint.

## Sử dụng file .env và khắc phục sự cố kết nối DB

Bạn có thể đặt các giá trị kết nối cục bộ vào file .env (dự án tự động load).
Sao chép .env.example và chỉnh sửa các giá trị nếu cần:

```
DB_USER=root
DB_PASS=
DB_NAME=pharmacy_demo
DB_HOST=localhost
DB_PORT=3307
```

- Nếu MySQL của bạn dùng port khác mặc định (ví dụ 3307), đảm bảo DB_PORT khớp với server
- Nếu npm run migrate thất bại với ConnectionRefusedError, nghĩa là ứng dụng không thể kết nối tới MySQL tại host/port cấu hình

## Notes

- Code được cấu trúc có chủ ý để hiển thị các class DAO (trong /daos) và các model (trong /models) nhằm minh họa luồng.
- Demo này thiết kế nhẹ nhàng, tập trung vào minh họa luồng và các class, không chú trọng bảo mật hay kiểm tra dữ liệu đầu vào cho môi trường production.
