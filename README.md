# 🍽️ Restaurant Ordering System

## 📌 Giới thiệu

Dự án **Restaurant Ordering System** giúp quản lý toàn bộ hoạt động đặt món trong nhà hàng buffet:

🔑 Chức năng chính
👤 Khách hàng (Customer)

📅 Đặt bàn online: chọn ngày, giờ, số lượng khách.

📱 Check-in bằng QR: xác nhận bàn khi đến nhà hàng.

🍽️ Đặt món qua điện thoại: quét QR trên bàn → xem menu → đặt món.

🧾 Thanh toán: hỗ trợ offline tại bàn.

👩‍🍳 Nhân viên (Staff)

📋 Quản lý order theo bàn: theo dõi order được gửi từ khách.

🚶 Cập nhật trạng thái order: đang chuẩn bị → đã phục vụ.

📊 Theo dõi bàn: biết bàn nào trống, bàn nào đã đặt.

🧾Thanh toán cho khách

🛠️ Quản trị viên (Admin)

🪑 Quản lý bàn: CRUD bàn, sinh QR code riêng cho mỗi bàn.

🍛 Quản lý menu: thêm/sửa/xóa món ăn, giá, hình ảnh.

👨‍🍳 Quản lý nhân viên & ca làm việc.

📈 Thống kê & báo cáo: doanh thu, số order, món bán chạy.

## 🚀 Công nghệ sử dụng

- ⚛️ [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) – frontend framework
- 🎨 [Ant Design](https://ant.design/) – UI components
- 🎯 [Redux Toolkit](https://redux-toolkit.js.org/) – state management
- 🔄 [Redux Saga](https://redux-saga.js.org/) – side effects (async, API)
- 📡 [Axios](https://axios-http.com/) – gọi API
- 🎭 [Ant design](https://ant.design/) + [Styled Component](https://styled-components.com/docs) – ui & styling
- ✅ [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup) – form & validation
- 🎨 [Framer-motion](https://motion.dev/docs/react) – animation

## 🚀 Cách chạy dự án (cho Developer mới)

1. **Clone source code**

```bash
git clone <repo-url>
cd buffet-management
```

Cài đặt dependencies và khởi chạy

```bash
pnpm install
pnpm dev
```

Tạo file .env

VITE_API=<your-api-url>

🔀 Git Workflow

1. Branch Naming

Feature mới: feature/<tên-tính-năng>

Fix bug: bugfix/<mã-bug>

Hotfix: hotfix/<mã-lỗi>

2. Commit Message Format
   [yyyy-MM-dd][type]: [mô tả]

   - Ví dụ:
     [2025-09-01][feature]: thêm chức năng đặt món tại bàn

3. Pull Request (PR)

- Tạo PR từ branch → develop

4. Note

- Review chéo trước khi merge từ các thành viên khác trong team và người hướng dẫn

- Không merge trực tiếp vào develop

- Tạo message commit, tên branch rõ ràng

- Không push log
