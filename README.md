# Trực Quan Hóa Vector 3D (3D Vector Visualizer)

Chào mừng bạn đến với dự án Trực Quan Hóa Vector 3D! Ứng dụng web tương tác này được xây dựng bằng Next.js, TypeScript, Three.js và Tailwind CSS, cho phép người dùng khám phá và hiểu rõ hơn về các phép toán vector trong không gian ba chiều.

[![Xem Demo](https://img.shields.io/badge/Xem-Demo-brightgreen)](https://vector-3d-visualizer.vercel.app/)  _(Liên kết demo giả định - hãy cập nhật nếu có)_

## Mục Lục

- [Giới Thiệu](#giới-thiệu)
- [Tính Năng](#tính-năng)
- [Công Nghệ Sử Dụng](#công-nghệ-sử-dụng)
- [Cấu Trúc Dự Án](#cấu-trúc-dự-án)
- [Cài Đặt Và Chạy Dự Án](#cài-đặt-và-chạy-dự-án)
  - [Yêu Cầu](#yêu-cầu)
  - [Các Bước Cài Đặt](#các-bước-cài-đặt)
- [Sử Dụng Ứng Dụng](#sử-dụng-ứng-dụng)
- [Đóng Góp](#đóng-góp)
- [Giấy Phép](#giấy-phép)
- [Liên Hệ](#liên-hệ)

## Giới Thiệu

Ứng dụng Trực Quan Hóa Vector 3D cung cấp một giao diện trực quan để người dùng nhập các vector 3D và thực hiện các phép toán phổ biến như:

-   Tích có hướng (Cross Product)
-   Hình chiếu của vector này lên vector kia (Vector Projection)
-   Tích vô hướng (Dot Product)

Kết quả của các phép toán này được hiển thị trực quan trong một cảnh 3D, kèm theo các giá trị tính toán chi tiết, phần lý thuyết giải thích và các câu hỏi trắc nghiệm để củng cố kiến thức.

## Tính Năng

-   **Nhập Vector Tương Tác**: Dễ dàng điều chỉnh các thành phần (x, y, z) của hai vector **u** và **v** bằng thanh trượt hoặc nhập số trực tiếp.
-   **Chọn Chế Độ Phép Toán**: Lựa chọn phép toán vector mong muốn từ một danh sách thả xuống (Select component).
-   **Trực Quan Hóa 3D**:
    -   Hiển thị vector **u** (màu tím) và vector **v** (màu đỏ) trong không gian 3D.
    -   Hiển thị vector kết quả (ví dụ: tích có hướng, vector hình chiếu) với màu sắc riêng biệt.
    -   Vẽ các đối tượng phụ trợ như hình bình hành (cho tích có hướng) hoặc đường hình chiếu.
    -   Sử dụng Three.js để kết xuất cảnh 3D, có lưới tọa độ và trục tọa độ.
    -   Điều khiển camera tương tác (xoay, thu phóng, di chuyển) bằng OrbitControls.
-   **Hiển Thị Kết Quả Tính Toán**:
    -   Hiển thị chi tiết các giá trị tính toán như độ dài vector, tích vô hướng, góc giữa hai vector, vector kết quả, độ dài vector kết quả, diện tích hình bình hành (nếu có).
-   **Panel Lý Thuyết Động**:
    -   Cung cấp giải thích lý thuyết về phép toán đang được chọn.
    -   Nội dung được tải từ file `theory.json`.
-   **Panel Trắc Nghiệm Động**:
    -   Cung cấp các câu hỏi trắc nghiệm liên quan đến phép toán đang chọn.
    -   Hiển thị kết quả và giải thích sau khi trả lời.
    -   Nội dung được tải từ file `quizbank.json`.
-   **Giao Diện Người Dùng Hiện Đại**:
    -   Sử dụng Tailwind CSS và các component từ Shadcn/UI (Card, Button, Slider, Input, RadioGroup, Select, Tabs, Badge).
    -   Hỗ trợ chế độ Sáng/Tối (Light/Dark Mode).
-   **Responsive Design**: Giao diện thích ứng tốt trên các kích thước màn hình khác nhau.

## Công Nghệ Sử Dụng

-   **Framework**: [Next.js](https://nextjs.org/) (React Framework)
-   **Ngôn Ngữ**: [TypeScript](https://www.typescriptlang.org/)
-   **Đồ Họa 3D**: [Three.js](https://threejs.org/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Components UI**: [Shadcn/UI](https://ui.shadcn.com/)
-   **Quản Lý Gói**: `pnpm` (có thể là `npm` hoặc `yarn` tùy thuộc vào file `package-lock.json` hoặc `yarn.lock`)

## Cấu Trúc Dự Án

Dưới đây là cấu trúc thư mục chính của dự án:

\`\`\`
/vector-3d-visualizer
├── app/                      # Định tuyến và layout chính của Next.js
│   ├── page.tsx              # Trang chính hiển thị visualizer
│   ├── layout.tsx            # Layout gốc của ứng dụng
│   └── globals.css           # Styles toàn cục
├── components/               # Các React components tái sử dụng
│   ├── ui/                   # Components từ Shadcn/UI (ví dụ: card, button,...)
│   ├── calculation-display.tsx # Hiển thị kết quả tính toán
│   ├── quiz-section.tsx      # Panel câu hỏi trắc nghiệm
│   ├── theme-provider.tsx    # Cung cấp context cho theme (sáng/tối)
│   ├── theme-toggle-button.tsx # Nút chuyển đổi theme
│   ├── theory-display.tsx    # Panel lý thuyết
│   ├── three-scene.tsx       # Component quản lý cảnh 3D (Three.js)
│   └── vector-controls.tsx   # Component điều khiển input vector
├── public/                   # Các tài sản tĩnh
│   ├── data/                 # Dữ liệu JSON cho lý thuyết và câu hỏi
│   │   ├── theory.json
│   │   └── quizbank.json
│   └── ...                   # Các hình ảnh, icons khác
├── lib/                      # Các hàm tiện ích và logic nghiệp vụ
│   ├── math-utils.ts         # Các hàm tính toán vector
│   └── utils.ts              # Các hàm tiện ích chung (ví dụ: cn từ shadcn)
├── hooks/                    # Các React Hooks tùy chỉnh (nếu có)
│   ├── use-mobile.tsx        # Hook kiểm tra thiết bị mobile (ví dụ)
│   └── use-toast.ts          # Hook cho thông báo toast (ví dụ)
├── styles/                   # Có thể chứa thêm các file CSS/SCSS (nếu dự án mở rộng)
│   └── globals.css           # (Thường nằm trong app/ với Next.js 13+)
├── .gitignore
├── next.config.mjs
├── package.json
├── pnpm-lock.yaml            # (Hoặc package-lock.json / yarn.lock)
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
\`\`\`

## Cài Đặt Và Chạy Dự Án

### Yêu Cầu

-   [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên được khuyến nghị)
-   [pnpm](https://pnpm.io/) (hoặc `npm`/`yarn` tương ứng với file lock của bạn)

### Các Bước Cài Đặt

1.  **Clone repository:**
    \`\`\`bash
    git clone https://your-repository-url/vector-3d-visualizer.git
    cd vector-3d-visualizer
    \`\`\`

2.  **Cài đặt dependencies:**
    (Nếu bạn sử dụng `pnpm` như trong `pnpm-lock.yaml`)
    \`\`\`bash
    pnpm install
    \`\`\`
    (Nếu sử dụng `npm`)
    \`\`\`bash
    npm install
    \`\`\`
    (Nếu sử dụng `yarn`)
    \`\`\`bash
    yarn install
    \`\`\`

3.  **Chạy development server:**
    \`\`\`bash
    pnpm dev
    \`\`\`
    (Hoặc `npm run dev` / `yarn dev`)

    Mở trình duyệt và truy cập [http://localhost:3000](http://localhost:3000).

4.  **Build cho production:**
    \`\`\`bash
    pnpm build
    \`\`\`
    (Hoặc `npm run build` / `yarn build`)

5.  **Chạy production server:**
    \`\`\`bash
    pnpm start
    \`\`\`
    (Hoặc `npm run start` / `yarn start`)

## Sử Dụng Ứng Dụng

1.  **Điều Chỉnh Vector**:
    -   Sử dụng các thanh trượt trong "Bảng Điều Khiển & Kết Quả" để thay đổi giá trị x, y, z cho vector **u** và **v**.
    -   Hoặc, nhập trực tiếp giá trị số vào các ô input tương ứng.
    -   Các vector sẽ được cập nhật trực tiếp trên màn hình 3D.

2.  **Chọn Phép Toán**:
    -   Nhấp vào menu thả xuống phía trên khung nhìn 3D.
    -   Chọn một trong các phép toán: "Tích có hướng (u × v)", "Hình chiếu v lên u", "Hình chiếu u lên v", hoặc "Tích vô hướng (u · v)".

3.  **Quan Sát Trực Quan Hóa**:
    -   Khung nhìn 3D sẽ hiển thị các vector đầu vào và vector kết quả (nếu có) của phép toán đã chọn.
    -   Sử dụng chuột để xoay (giữ chuột trái và kéo), thu phóng (lăn chuột), và di chuyển (giữ chuột phải và kéo) cảnh 3D.

4.  **Xem Kết Quả Tính Toán**:
    -   Phần "Kết Quả Phép Toán" trong "Bảng Điều Khiển & Kết Quả" sẽ hiển thị các giá trị số liên quan đến phép toán hiện tại.

5.  **Tìm Hiểu Lý Thuyết và Làm Bài Tập**:
    -   Cuộn xuống dưới cùng của trang.
    -   Chọn tab "Lý Thuyết" để đọc thông tin chi tiết về phép toán đang được hiển thị.
    -   Chọn tab "Bài Tập" để thử sức với các câu hỏi trắc nghiệm liên quan.

6.  **Chuyển Đổi Theme**:
    -   Nhấp vào biểu tượng mặt trời/mặt trăng ở góc trên bên phải (nếu có) để chuyển đổi giữa giao diện Sáng và Tối.

## Đóng Góp

Chúng tôi rất hoan nghênh sự đóng góp từ cộng đồng! Nếu bạn muốn đóng góp, vui lòng làm theo các bước sau:

1.  Fork repository này.
2.  Tạo một nhánh mới cho tính năng hoặc bản vá lỗi của bạn (`git checkout -b feature/AmazingFeature` hoặc `git checkout -b fix/SomeBug`).
3.  Thực hiện các thay đổi của bạn.
4.  Commit các thay đổi (`git commit -m \'Add some AmazingFeature\'`).
5.  Push lên nhánh của bạn (`git push origin feature/AmazingFeature`).
6.  Mở một Pull Request.

Vui lòng đảm bảo rằng code của bạn tuân thủ các coding convention của dự án và đã được kiểm tra kỹ lưỡng.

## Giấy Phép

Dự án này được cấp phép theo Giấy phép MIT. Xem file `LICENSE` (nếu có) để biết thêm chi tiết.
*(Lưu ý: Hiện tại chưa có file LICENSE trong dự án. Bạn nên thêm một file nếu muốn.)*

## Liên Hệ

Nếu bạn có bất kỳ câu hỏi, góp ý hoặc muốn báo lỗi, vui lòng tạo một [Issue](https://github.com/your-username/vector-3d-visualizer/issues) trên GitHub. (Hãy cập nhật link này).

---

Hy vọng bạn sẽ thấy ứng dụng này hữu ích và thú vị!