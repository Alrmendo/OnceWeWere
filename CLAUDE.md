# oncewewere — Project Brief

## 1. Tổng quan

Website nhật ký cá nhân cho Nghi (22 tuổi, ngành kiến trúc). Nội dung là các bài
viết dạng suy ngẫm/triết lý, chia làm 3 mục theo đúng cách tách chữ tên site:

- **ONCE** — những thứ đã từng tồn tại (hoài niệm, quá khứ)
- **WE** — những thứ xảy ra giữa con người với nhau (mối quan hệ)
- **WERE** — phần sâu nhất, chiêm nghiệm

Nghi tự đăng bài qua một trang admin riêng (không cần nhờ dev mỗi lần đăng).

## 2. Đặc điểm nội dung — ĐỌC KỸ, ảnh hưởng trực tiếp đến cách render

Dựa trên bài mẫu thực tế đã có:

- Bài dài, dạng luận (~2.000–2.500 từ), đa số các bài khác cũng dài tương tự.
- Câu văn ngắn, **xuống dòng liên tục có chủ đích** — dùng như nhịp điệu/thơ văn
  xuôi, không phải lỗi trình bày.
- **QUAN TRỌNG: giữ nguyên line break y hệt Nghi gõ.** Không được tự động gộp
  thành đoạn văn justify, không được chuẩn hoá lại xuống dòng. Render bằng
  `white-space: pre-wrap` hoặc tương đương.
- Không có tiêu đề chủ đề — bài được đặt tên/nhận diện theo **ngày** (vd "14/8/26").
- Không có ảnh trong bài mẫu. Nếu sau này có ảnh thì bổ sung sau, v1 không cần.

## 3. Kiến trúc thông tin (Information Architecture)

Public — **KHÔNG cần đăng nhập, ai có link cũng xem được** (đây là blog công khai):
- `/` — trang chủ, giới thiệu ngắn + dẫn vào 3 mục
- `/once`, `/we`, `/were` — danh sách bài theo mục, sort theo ngày mới nhất
- `/[category]/[slug]` — trang đọc 1 bài, có reaction + comment + nút chia sẻ

Admin (private, chỉ Nghi):
- `/admin/login` — đăng nhập
- `/admin` — danh sách tất cả bài (kể cả draft), nút tạo bài mới
- `/admin/posts/new` — viết bài mới
- `/admin/posts/[id]/edit` — sửa bài
- `/admin/comments` — xem toàn bộ comment, xoá comment spam/xấu

## 4. Data model (Supabase/Postgres)

```
posts
- id: uuid (pk)
- slug: text (unique)      -- định danh URL ổn định để share, vd "were-20260814-a1b2"
- date: date               -- hiển thị như tiêu đề, vd "14/8/26"
- category: enum('once','we','were')
- body: text                -- raw text, giữ nguyên line break
- published: boolean (default false)
- reaction_count: integer (default 0)  -- 1 loại reaction duy nhất (tim/like) ở v1
- created_at: timestamptz
- updated_at: timestamptz

comments
- id: uuid (pk)
- post_id: uuid (fk -> posts.id)
- author_name: text         -- người đọc tự nhập, không cần tài khoản
- body: text
- created_at: timestamptz
```

Chưa cần field `title` riêng trên `posts` — ngày đóng vai trò tiêu đề. Có thể
bổ sung sau nếu Nghi muốn thêm tiêu đề phụ.

`slug` cần được sinh tự động khi tạo bài (không để Nghi tự gõ) để tránh trùng
lặp/lỗi URL khi share.

## 5. Auth

- Chỉ 1 user duy nhất (Nghi) — Supabase Auth, email/password.
- Không có public sign-up.
- Route `/admin/*` phải được bảo vệ ở middleware/server, không chỉ ẩn UI.

## 6. Định hướng thiết kế

**Trang public** — dùng skill **Hallmark**, chế độ editorial/brand.
Ưu tiên số 1: trải nghiệm đọc dài thoải mái, không phải "wow" thị giác.
- Line-height rộng (~1.7–1.8)
- Content width vừa mắt để đọc (~600–650px, khoảng 65-75 ký tự/dòng)
- Font ưu tiên dễ đọc lâu (serif hoặc sans nhân bản), không chọn font trang trí
- Tối giản, nhiều khoảng trắng, tránh mọi thứ giống "SaaS landing page" hay
  "AI slop" mặc định
- 3 mục có thể có 1 điểm nhấn thị giác khác nhau nhẹ (màu/tông) để phân biệt
  cảm giác, nhưng không loè loẹt

**Trang admin** — dùng skill **Impeccable, chế độ product**.
Ưu tiên: rõ ràng, nhanh, gọn — đây là công cụ để viết, không phải nơi để "đẹp".
Input nội dung dùng `<textarea>` thuần, KHÔNG dùng rich-text/WYSIWYG editor
(không cần bold/italic/table/embed ở giai đoạn này).

## 6.5. Tương tác của người đọc (reader interaction)

**Reaction** — 1 nút tim/like duy nhất trên trang đọc bài. Ẩn danh, không cần
tài khoản. Chặn spam-click bằng cách lưu 1 flag trong `localStorage` của trình
duyệt (đã react bài X rồi thì nút chuyển trạng thái "đã react", không cho bấm
tiếp) — không hoàn hảo 100% nhưng đủ cho v1.

**Comment** — form đơn giản (tên + nội dung), không cần tài khoản. Comment
**hiện công khai ngay lập tức** sau khi gửi, không chờ duyệt. Nghi có toàn
quyền xoá bất kỳ comment nào từ `/admin/comments`. Chống spam cơ bản cho v1:
thêm 1 honeypot field ẩn trong form (bot thường tự điền vào field ẩn — submit
nào có giá trị ở field đó thì âm thầm từ chối, không cần captcha phức tạp).
Nếu sau này bị spam nhiều, có thể nâng cấp thêm rate-limit theo IP hoặc
captcha — chưa cần ngay.

**Share** — nút "Chia sẻ" trên trang đọc bài, dùng Web Share API trên mobile
(mở share sheet của điện thoại) và fallback copy-link trên desktop. Link chia
sẻ chính là URL của bài (`/[category]/[slug]`), cần có Open Graph meta tags
(tiêu đề, mô tả ngắn, ảnh nếu có) để khi paste vào Messenger/Zalo/Facebook
hiện preview đẹp thay vì link trơ.

## 7. Tech stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres + Auth) — free tier
- Deploy: Vercel — free tier

## 8. Phạm vi bản đầu tiên (MVP)

Build theo 2 giai đoạn — giai đoạn 1 chạy test được rồi mới sang giai đoạn 2,
tránh làm hết mọi thứ cùng lúc rồi khó bắt lỗi.

**Giai đoạn 1 — lõi (viết & đọc)**
1. Setup Next.js project + kết nối Supabase (schema `posts` + Auth)
2. Admin: login → list posts → tạo bài mới → sửa bài → publish/unpublish
3. Public: trang chủ + 3 trang danh sách theo mục + trang đọc 1 bài (URL theo `slug`)

**Giai đoạn 2 — tương tác**
4. Reaction: nút tim/like ẩn danh trên trang đọc bài (xem mục 6.5)
5. Comment: form ẩn danh dưới mỗi bài, hiện ngay lập tức, có honeypot chống bot
6. Admin: `/admin/comments` để xoá comment spam/xấu
7. Share: nút chia sẻ (Web Share API / copy link)
8. Open Graph meta tags cho từng bài

**Chưa làm ở v1:** ảnh trong bài, rich text editor, tag, search, thanh tiến độ
đọc (reading progress bar), duyệt comment trước khi hiện, nhiều loại reaction
khác nhau (chỉ 1 loại tim/like)

## 9. Việc chưa chốt — hỏi lại khi cần

- Domain riêng (hiện tại dùng subdomain Vercel free đến khi Nghi quyết)
- Nếu spam comment trở thành vấn đề thật sau khi ra mắt, cân nhắc nâng cấp
  chống spam (rate-limit theo IP, captcha) — chưa cần lo trước
