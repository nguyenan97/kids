# English with Ms Tuyen - Phonics & Letter Tracing for Kids

Companion website for the YouTube channel [English with Ms Tuyen](https://www.youtube.com/@EnglishWithMsTuyen).

**Live site:** https://nguyenan97.github.io/kids/

- Channel videos (letter sound songs, phonics lessons) with privacy-enhanced YouTube embeds; scheduled videos show as "Coming soon" with their date.
- Letter tracing A-Z with stroke order, alphabet chart, quiz and sticker book.
- Static site, no build tools, no ads, no tracking. Hosted on GitHub Pages (branch `main`, root).

Tracing app based on [rkarim25/kids](https://github.com/rkarim25/kids).

## Tự động cập nhật video

GitHub Action `.github/workflows/pages.yml` chạy mỗi ngày lúc 20:30 giờ Việt Nam (13:30 UTC) và mỗi lần push:
- `tools/sync_youtube.py` đọc trang công khai của kênh; video nào vừa public mà trùng title trong `data/videos.json` thì tự điền ID và giờ public thật; video public mới chưa có trong danh sách thì tự thêm vào.
- `tools/build.py` dựng lại JSON-LD, danh sách video và sitemap, rồi deploy lên GitHub Pages.
- Muốn chạy ngay: tab Actions -> "Sync YouTube and deploy site" -> Run workflow.

Muốn hiện thẻ "Coming soon" cho video sắp đăng: thêm entry vào `data/videos.json` với title **đúng y như trong Studio** và `publish_at`, để trống `youtube_id`.

## Thêm / cập nhật video bằng tay

1. Sửa `data/videos.json`: điền `youtube_id` (phần sau `v=` hoặc `/shorts/`) và `publish_at` đúng giờ Public/Schedule trong Studio.
2. Chạy `python tools/build.py` (tạo `js/videos-data.js`, JSON-LD VideoObject, danh sách video tĩnh cho Google, `sitemap.xml`).
3. Commit + push `main`. GitHub Pages tự deploy sau 1-2 phút.

Video đã Schedule nhưng có `youtube_id`: trang tự chuyển sang phát được sau giờ `publish_at`, nhưng JSON-LD chỉ có video đã public lúc build, nên chạy lại build sau khi video public.

## SEO checklist

- Google Search Console: thêm property URL prefix `https://nguyenan97.github.io/kids/`, xác minh bằng HTML tag (dán vào `<head>` chỗ comment sẵn), rồi Submit sitemap `https://nguyenan97.github.io/kids/sitemap.xml` và Request indexing.
- YouTube Studio -> Customization -> Links: thêm link website này (cân nhắc chính sách link với nội dung Made for Kids).
- Mỗi lần có video public: thêm vào `data/videos.json`, build, push.
