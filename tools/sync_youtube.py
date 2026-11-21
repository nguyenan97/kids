"""Fill youtube_id / publish_at in data/videos.json from the public channel page (stdlib only).

Run from the repo root:  python tools/sync_youtube.py
- Reads the channel's public Shorts and Videos tabs (no API key, no login).
- A public video whose title matches an entry without youtube_id gets its ID
  and real publish time.
- A public video not listed in videos.json yet is appended automatically.
Private/scheduled videos are invisible on the public page, so they stay
"Coming soon" until they go public. Prints a summary; exit code 0 even when
YouTube cannot be read, so the site deploy is never blocked.
"""
import json
import pathlib
import re
import sys
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA = ROOT / "data/videos.json"
HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36",
    "Accept-Language": "en-US,en;q=0.9",
    "Cookie": "SOCS=CAI; CONSENT=YES+1",
}


def get(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def initial_data(html):
    m = re.search(r"var ytInitialData = (\{.*?\});</script>", html, re.S)
    return json.loads(m.group(1)) if m else {}


def collect(node, out):
    """Walk ytInitialData and collect (video_id, title, type)."""
    if isinstance(node, dict):
        if "shortsLockupViewModel" in node:
            v = node["shortsLockupViewModel"]
            vid = (v.get("onTap", {}).get("innertubeCommand", {}).get("reelWatchEndpoint", {}).get("videoId")
                   or v.get("entityId", "").replace("shorts-shelf-item-", ""))
            title = v.get("overlayMetadata", {}).get("primaryText", {}).get("content")
            if not title:
                title = re.sub(r", [^,]*views? - play Short$", "", v.get("accessibilityText", ""))
            out.setdefault(vid, (title, "short"))
            return
        if "videoRenderer" in node:
            v = node["videoRenderer"]
            title = "".join(r.get("text", "") for r in v.get("title", {}).get("runs", []))
            out.setdefault(v.get("videoId"), (title, "long"))
            return
        if "lockupViewModel" in node:
            v = node["lockupViewModel"]
            if v.get("contentType") == "LOCKUP_CONTENT_TYPE_VIDEO":
                title = v.get("metadata", {}).get("lockupMetadataViewModel", {}).get("title", {}).get("content", "")
                out.setdefault(v.get("contentId"), (title, "long"))
            return
        for x in node.values():
            collect(x, out)
    elif isinstance(node, list):
        for x in node:
            collect(x, out)


def publish_date(vid):
    m = re.search(r'"publishDate":"([^"]+)"', get(f"https://www.youtube.com/watch?v={vid}"))
    return m.group(1) if m else None


def norm(t):
    return re.sub(r"\s+", " ", t).strip().casefold()


def letter_of(title):
    m = re.match(r"(?:Letter|Short|Long) ([A-Z]) Sound", title)
    return m.group(1) if m else ""


def main():
    data = json.loads(DATA.read_text(encoding="utf-8"))
    base = data["channel"]["url"]
    found = {}
    try:
        for tab in ("shorts", "videos"):
            collect(initial_data(get(f"{base}/{tab}")), found)
    except Exception as e:  # network/markup change: keep the site as is
        print(f"WARN: cannot read channel: {e}")
        return 0
    found.pop(None, None)
    if not found:
        print("WARN: no public videos parsed (YouTube markup may have changed)")
        return 0

    known_ids = {v["youtube_id"] for v in data["videos"] if v.get("youtube_id")}
    by_title = {norm(v["title"]): v for v in data["videos"] if not v.get("youtube_id")}
    changed = []
    for vid, (title, vtype) in found.items():
        if vid in known_ids:
            continue
        entry = by_title.get(norm(title))
        if entry is None:
            entry = {"key": vid, "youtube_id": "", "type": vtype, "letter": letter_of(title), "title": title, "publish_at": ""}
            data["videos"].append(entry)
        entry["youtube_id"] = vid
        try:
            entry["publish_at"] = publish_date(vid) or entry["publish_at"]
        except Exception as e:
            print(f"WARN: no publish date for {vid}: {e}")
        if not entry["publish_at"]:
            entry["publish_at"] = "2000-01-01T00:00:00+00:00"
        changed.append(f"{entry['key']}: {vid} {title}")

    print(f"public on channel: {len(found)}; newly linked: {len(changed)}")
    for c in changed:
        print("  +", c)
    if changed:
        DATA.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 0


if __name__ == "__main__":
    sys.exit(main())
