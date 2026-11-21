# English with Ms Tuyen - Phonics & Letter Tracing for Kids

Companion website for the YouTube channel [English with Ms Tuyen](https://www.youtube.com/@EnglishWithMsTuyen).

**Live site:** https://nguyenan97.github.io/kids/

- Channel videos (letter sound songs, phonics lessons) with privacy-enhanced YouTube embeds; scheduled videos show as "Coming soon" with their date.
- Letter tracing A-Z with stroke order, alphabet chart, quiz and sticker book.
- Static site, no build tools, no ads, no tracking. Hosted on GitHub Pages (branch `main`, root).

Tracing app based on [rkarim25/kids](https://github.com/rkarim25/kids).

## Thêm / cập nhật video

1. Sửa `data/videos.json`: điền `youtube_id` (phần sau `v=` hoặc `/shorts/`) và `publish_at` đúng giờ Public/Schedule trong Studio.
2. Chạy `python tools/build.py` (tạo `js/videos-data.js`, JSON-LD VideoObject, danh sách video tĩnh cho Google, `sitemap.xml`).
3. Commit + push `main`. GitHub Pages tự deploy sau 1-2 phút.

Video đã Schedule nhưng có `youtube_id`: trang tự chuyển sang phát được sau giờ `publish_at`, nhưng JSON-LD chỉ có video đã public lúc build, nên chạy lại build sau khi video public.

## SEO checklist

- Google Search Console: thêm property URL prefix `https://nguyenan97.github.io/kids/`, xác minh bằng HTML tag (dán vào `<head>` chỗ comment sẵn), rồi Submit sitemap `https://nguyenan97.github.io/kids/sitemap.xml` và Request indexing.
- YouTube Studio -> Customization -> Links: thêm link website này (cân nhắc chính sách link với nội dung Made for Kids).
- Mỗi lần có video public: thêm vào `data/videos.json`, build, push.
