# Hướng Dẫn Bảo Trì Dự Án Trực Quan Hóa Vector 3D

Tài liệu này cung cấp hướng dẫn cho các nhà phát triển về cách bảo trì, cập nhật và mở rộng dự án Trực Quan Hóa Vector 3D.

## Mục Lục

- [Tổng Quan Kiến Trúc](#tổng-quan-kiến-trúc)
- [Quy Trình Phát Triển](#quy-trình-phát-triển)
  - [Coding Conventions](#coding-conventions)
  - [Quản Lý Nhánh (Branching Strategy)](#quản-lý-nhánh-branching-strategy)
  - [Commit Messages](#commit-messages)
  - [Pull Requests](#pull-requests)
- [Quản Lý Dependencies](#quản-lý-dependencies)
- [Cập Nhật Nội Dung Tĩnh](#cập-nhật-nội-dung-tĩnh)
  - [Cập Nhật Lý Thuyết](#cập-nhật-lý-thuyết)
  - [Cập Nhật Câu Hỏi Trắc Nghiệm](#cập-nhật-câu-hỏi-trắc-nghiệm)
- [Mở Rộng Tính Năng](#mở-rộng-tính-năng)
  - [Thêm Phép Toán Vector Mới](#thêm-phép-toán-vector-mới)
  - [Thay Đổi Giao Diện 3D](#thay-đổi-giao-diện-3d)
- [Triển Khai (Deployment)](#triển-khai-deployment)
- [Xử Lý Sự Cố (Troubleshooting)](#xử-lý-sự-cố-troubleshooting)

## Tổng Quan Kiến Trúc

Dự án được xây dựng dựa trên Next.js và bao gồm các thành phần chính sau:

-   **`app/page.tsx`**: Component chính của trang, quản lý state tổng thể (giá trị vector, chế độ phép toán) và bố cục các phần giao diện.
-   **`components/`**: Chứa các UI components tái sử dụng.
    -   `vector-controls.tsx`: Điều khiển nhập liệu cho vector **u** và **v**.
    -   `three-scene.tsx`: Kết xuất và quản lý cảnh 3D bằng Three.js. Đây là nơi logic đồ họa chính được xử lý.
    -   `calculation-display.tsx`: Hiển thị các kết quả tính toán số học.
    -   `theory-display.tsx`: Hiển thị nội dung lý thuyết từ file JSON.
    -   `quiz-section.tsx`: Hiển thị và xử lý logic cho phần trắc nghiệm từ file JSON.
    -   `ui/`: Các components từ thư viện Shadcn/UI.
-   **`lib/math-utils.ts`**: Chứa các hàm logic để thực hiện các phép toán vector (tích có hướng, hình chiếu, tích vô hướng, v.v.).
-   **`public/data/`**: Chứa các file JSON (`theory.json`, `quizbank.json`) cung cấp nội dung động cho phần lý thuyết và trắc nghiệm.

Trạng thái ứng dụng (mode, giá trị vector) chủ yếu được quản lý trong `app/page.tsx` và truyền xuống các components con thông qua props. Các components `TheoryDisplay` và `QuizSection` tự quản lý việc tải dữ liệu từ các file JSON tương ứng.

## Quy Trình Phát Triển

### Coding Conventions

-   Sử dụng Prettier và ESLint (nếu đã cấu hình) để đảm bảo code style nhất quán. Chạy `pnpm lint` hoặc `pnpm format` trước khi commit.
-   Viết code TypeScript rõ ràng, dễ hiểu và có type-safety.
-   Ưu tiên functional components và React Hooks.
-   Đặt tên biến, hàm, class một cách có ý nghĩa (tiếng Anh hoặc tiếng Việt có dấu rõ ràng).
-   Comment code cho các phần logic phức tạp hoặc không rõ ràng.

### Quản Lý Nhánh (Branching Strategy)

Sử dụng một quy trình Git Flow cơ bản hoặc GitHub Flow:

-   **`main`** (hoặc `master`): Nhánh chính, chứa code production ổn định.
-   **`develop`**: Nhánh phát triển chính, tích hợp các tính năng mới.
-   **Feature branches** (`feature/ten-tinh-nang`): Tạo nhánh mới từ `develop` cho mỗi tính năng.
-   **Bugfix branches** (`fix/ten-loi`): Tạo nhánh mới từ `develop` (hoặc `main` nếu là hotfix) để sửa lỗi.

### Commit Messages

Sử dụng [Conventional Commits](https://www.conventionalcommits.org/) để viết commit message rõ ràng và nhất quán. Ví dụ:

-   `feat: Add dot product calculation and visualization`
-   `fix: Correct projection formula for co-linear vectors`
-   `docs: Update README with setup instructions`
-   `style: Refactor vector controls for better responsiveness`
-   `refactor: Improve data fetching in QuizSection`
-   `test: Add unit tests for math-utils`

### Pull Requests (PRs)

-   Mỗi PR nên giải quyết một vấn đề hoặc một tính năng cụ thể.
-   Mô tả rõ ràng các thay đổi trong PR.
-   Yêu cầu review từ ít nhất một thành viên khác trong đội (nếu có).
-   Đảm bảo tất cả các checks (linting, tests) đều pass trước khi merge.
-   Sau khi merge vào `develop`, có thể merge `develop` vào `main` để release.

## Quản Lý Dependencies

-   Sử dụng `pnpm` (hoặc `npm`/`yarn` nhất quán với file lock) để quản lý các gói.
-   Để thêm một dependency mới: `pnpm add package-name`
-   Để thêm một dev dependency mới: `pnpm add -D package-name`
-   Để cập nhật dependencies: `pnpm update package-name` hoặc `pnpm update` (cẩn thận khi cập nhật tất cả).
-   Thường xuyên kiểm tra và cập nhật các dependencies để vá lỗi bảo mật và nhận các tính năng mới. Xem xét các breaking changes trước khi cập nhật major versions.

## Cập Nhật Nội Dung Tĩnh

Phần lý thuyết và câu hỏi trắc nghiệm được lưu trữ trong các file JSON trong thư mục `public/data/`.

### Cập Nhật Lý Thuyết

1.  Mở file `public/data/theory.json`.
2.  File này là một đối tượng JSON, với key là mã của phép toán (`cross-product`, `projection`, `dot-product`).
3.  Mỗi phép toán có một đối tượng chứa:
    -   `title`: (string) Tiêu đề của phần lý thuyết.
    -   `content`: (string) Nội dung HTML của phần lý thuyết. Bạn có thể sử dụng các thẻ HTML cơ bản ( `<p>`, `<strong>`, `<ul>`, `<li>`, `<h4>`, `<div class=\"...">` ) để định dạng. Hãy cẩn thận với việc escape các ký tự đặc biệt trong JSON string nếu viết thủ công.

    **Ví dụ cập nhật/thêm mới:**
    \`\`\`json
    {
      "cross-product": { ... },
      "projection": { ... },
      "dot-product": { ... },
      "new-operation": {
        "title": "Lý Thuyết Phép Toán Mới",
        "content": "<p>Đây là nội dung <strong>HTML</strong> cho phép toán mới.</p><ul><li>Điểm 1</li><li>Điểm 2</li></ul>"
      }
    }
    \`\`\`
4.  Sau khi chỉnh sửa, lưu file. Thay đổi sẽ tự động được phản ánh trong ứng dụng khi người dùng truy cập hoặc refresh.

### Cập Nhật Câu Hỏi Trắc Nghiệm

1.  Mở file `public/data/quizbank.json`.
2.  File này là một đối tượng JSON, với key là mã của phép toán (`cross-product`, `projection`, `dot-product`).
3.  Giá trị của mỗi key là một mảng các đối tượng câu hỏi (`QuizQuestion`). Mỗi đối tượng câu hỏi có cấu trúc:
    -   `id`: (string) Một ID duy nhất cho câu hỏi (ví dụ: `cp3`, `proj_adv1`).
    -   `question`: (string) Nội dung câu hỏi. Có thể chứa HTML (ví dụ: `<strong>`).
    -   `options`: (array of strings) Một mảng các lựa chọn trả lời. Có thể chứa HTML.
    -   `correctAnswer`: (number) Index (bắt đầu từ 0) của đáp án đúng trong mảng `options`.
    -   `explanation`: (string) Giải thích cho đáp án đúng. Có thể chứa HTML.

    **Ví dụ thêm câu hỏi mới cho 'dot-product':**
    \`\`\`json
    {
      "cross-product": [ ... ],
      "projection": [ ... ],
      "dot-product": [
        {
          "id": "dot1",
          ...
        },
        {
          "id": "dot2",
          ...
        },
        {
          "id": "dot3_new",
          "question": "Nếu tích vô hướng của hai vector khác không là một số âm, góc giữa chúng là?",
          "options": ["Góc nhọn", "Góc vuông", "Góc tù", "Góc bẹt (180°)"],
          "correctAnswer": 2,
          "explanation": "Khi <strong>u</strong> · <strong>v</strong> < 0, thì cos(θ) < 0, nghĩa là góc θ là góc tù (90° < θ < 180°)."
        }
      ]
    }
    \`\`\`
4.  Lưu file sau khi chỉnh sửa. Các câu hỏi mới sẽ được tải khi người dùng chọn chế độ tương ứng.

## Mở Rộng Tính Năng

### Thêm Phép Toán Vector Mới

Giả sử bạn muốn thêm phép toán "Phản chiếu vector **u** qua vector **v**".

1.  **Cập nhật `OperationMode` type** (trong `app/page.tsx` hoặc file types chung):
    Thêm một giá trị mới vào type `OperationMode`.
    \`\`\`typescript
    export type OperationMode = 
      | "cross-product"
      | "projection-u-v"
      | "projection-v-u"
      | "dot-product"
      | "reflection-u-over-v"; // <-- Thêm mới
    \`\`\`

2.  **Cập nhật UI Chọn Chế Độ** (trong `app/page.tsx`):
    Thêm `<SelectItem>` mới trong component `Select`.
    \`\`\`tsx
    <SelectItem value="reflection-u-over-v">Phản chiếu u qua v</SelectItem>
    \`\`\`

3.  **Triển Khai Logic Tính Toán** (trong `lib/math-utils.ts`):
    -   Thêm một hàm mới để tính toán phép phản chiếu.
    -   Cập nhật hàm `calculateVectorOperations` để gọi hàm này khi `mode` là `"reflection-u-over-v"` và trả về kết quả tương ứng.
        \`\`\`typescript
        // Trong calculateVectorOperations
        case "reflection-u-over-v":
          const reflectedVector = calculateReflectionUV(vectorU, vectorV); // Hàm mới bạn cần viết
          return { ...results, reflectedVector };
        \`\`\`

4.  **Cập Nhật Hiển Thị Kết Quả** (trong `components/calculation-display.tsx`):
    Thêm một section mới để hiển thị kết quả của phép phản chiếu khi `mode` là `"reflection-u-over-v"`.
    \`\`\`tsx
    {mode === "reflection-u-over-v" && calculations.reflectedVector && (
      <div className="p-3 bg-cyan-50 dark:bg-cyan-900/30 rounded-lg">
        <h4 className="font-semibold text-cyan-700 dark:text-cyan-300 mb-1">
          Vector <strong>u</strong> phản chiếu qua <strong>v</strong>
        </h4>
        <p className="font-mono text-md">{formatVector(calculations.reflectedVector)}</p>
        {/* Thêm các thông tin khác nếu cần */}
      </div>
    )}
    \`\`\`

5.  **Cập Nhật Trực Quan Hóa 3D** (trong `components/three-scene.tsx`):
    -   Trong `useEffect` theo dõi `[vectorU, vectorV, mode, calculations]`.
    -   Thêm một `case` mới trong `switch (mode)` để xử lý `"reflection-u-over-v"`.
    -   Vẽ vector phản chiếu (ví dụ: sử dụng một `ArrowHelper` mới).
    -   Ẩn/hiện các đối tượng không liên quan.

6.  **Thêm Nội Dung Lý Thuyết và Trắc Nghiệm**:
    -   Cập nhật `public/data/theory.json` với mục mới cho `"reflection-u-over-v"`.
    -   Cập nhật `public/data/quizbank.json` với các câu hỏi mới cho `"reflection-u-over-v"` (hoặc một key chung nếu phù hợp).
    -   Đảm bảo component `TheoryDisplay` và `QuizSection` có thể xử lý key mới này (hiện tại đang có fallback, nhưng nên định nghĩa rõ ràng).

### Thay Đổi Giao Diện 3D

-   Logic chính nằm trong `components/three-scene.tsx`.
-   **Thay đổi màu sắc, kích thước vector**: Chỉnh sửa các thuộc tính của `ArrowHelper` (ví dụ `setColor`, `setLength`) trong các `useEffect` tương ứng.
-   **Thêm đối tượng mới**: Tạo `THREE.Mesh`, `THREE.Line`, etc., và thêm vào `scene`.
-   **Thay đổi ánh sáng, camera**: Chỉnh sửa trong phần setup của `useEffect` chính (khối `useEffect(() => { ... }, [])`).
-   **Tối ưu hiệu năng**: Cẩn thận với việc tạo đối tượng Three.js trong vòng lặp render. Tái sử dụng đối tượng và geometry/material nếu có thể. Dispose các đối tượng Three.js khi component unmount hoặc không còn dùng đến để tránh memory leak.

## Triển Khai (Deployment)

Dự án Next.js này có thể được triển khai trên nhiều nền tảng như Vercel, Netlify, AWS Amplify, hoặc server riêng.

-   **Vercel (Khuyến nghị)**: Kết nối trực tiếp repository GitHub của bạn với Vercel. Vercel sẽ tự động build và deploy mỗi khi có push lên nhánh chính (ví dụ: `main`). Cấu hình build command là `pnpm build` (hoặc tương ứng) và output directory là `.next`.
-   **Các Nền Tảng Khác**: Thông thường, bạn sẽ cần build dự án (`pnpm build`) và sau đó phục vụ thư mục `.next` (hoặc sử dụng adapter của Next.js nếu có).

## Xử Lý Sự Cố (Troubleshooting)

-   **Lỗi build**: Kiểm tra console log để xem chi tiết lỗi. Thường liên quan đến TypeScript errors, missing dependencies, hoặc cấu hình Next.js.
-   **Lỗi runtime trên client**: Mở Developer Tools của trình duyệt (F12) và kiểm tra tab Console để xem lỗi JavaScript.
-   **Cảnh 3D không hiển thị đúng**: Debug trong `components/three-scene.tsx`.
    -   Kiểm tra xem camera có nhìn đúng hướng không.
    -   Kiểm tra vị trí, scale, visibility của các đối tượng.
    -   Sử dụng các công cụ debug của Three.js (ví dụ: `THREE.BoxHelper` để xem bounding box).
    -   Đảm bảo `requestAnimationFrame` được gọi liên tục.
-   **Dữ liệu JSON không tải được**: Kiểm tra đường dẫn trong `fetch` (phải là `/data/theory.json`, `/data/quizbank.json`). Kiểm tra tab Network trong Developer Tools để xem request có thành công không và response có đúng định dạng JSON không.

---

Việc bảo trì tốt sẽ giúp dự án phát triển bền vững và dễ dàng mở rộng trong tương lai. Chúc may mắn! 