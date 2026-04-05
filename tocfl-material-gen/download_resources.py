"""
TOCFL Band C Resource Downloader
Downloads official sample tests, vocabulary list, and teacher examples.
"""

import os
import re
import time
import zipfile
from pathlib import Path
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE_DIR = Path(__file__).parent
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/123.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "zh-TW,zh;q=0.9,en;q=0.8",
}
SESSION = requests.Session()
SESSION.headers.update(HEADERS)


def download_file(url: str, dest: Path, label: str = "") -> bool:
    """Download a single file, skip if already exists."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    if dest.exists():
        print(f"  [skip] {dest.name} (already exists)")
        return True
    try:
        resp = SESSION.get(url, timeout=30, stream=True)
        resp.raise_for_status()
        with open(dest, "wb") as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        size_kb = dest.stat().st_size // 1024
        print(f"  [ok]   {dest.name}  ({size_kb} KB)  {label}")
        return True
    except Exception as e:
        print(f"  [fail] {url}  → {e}")
        return False


# ── 1. 華語八千詞表 ──────────────────────────────────────────────────────────

def download_vocabulary():
    print("\n=== 1. 華語八千詞表 ===")
    url = "https://tocfl.edu.tw/tocfl/assets/files/vocabulary/8000zhuyin_202409.zip"
    dest_zip = BASE_DIR / "vocabulary" / "8000zhuyin_202409.zip"
    ok = download_file(url, dest_zip)
    if ok and dest_zip.exists():
        extract_dir = BASE_DIR / "vocabulary"
        with zipfile.ZipFile(dest_zip, "r") as z:
            names = z.namelist()
            already = all((extract_dir / n).exists() for n in names if not n.endswith("/"))
            if already:
                print(f"  [skip] already extracted ({len(names)} entries)")
            else:
                z.extractall(extract_dir)
                print(f"  [ok]   extracted {len(names)} files → vocabulary/")


# ── 2. 官方模擬試題（Band C） ────────────────────────────────────────────────

SAMPLE_TEST_BASE = "https://tocfl.edu.tw"
SAMPLE_TEST_PAGES = [
    "https://tocfl.edu.tw/tocfl/index.php/exam/test/page/1",
    "https://tocfl.edu.tw/tocfl/index.php/exam/test/page/2",
    "https://tocfl.edu.tw/tocfl/index.php/exam/test/page/3",
]
# File extensions we want to download
DOWNLOAD_EXTS = {".pdf", ".mp3", ".zip", ".xlsx", ".docx"}


def is_band_c(text: str) -> bool:
    """Heuristic: does this link/section relate to Band C / 流利精通級?"""
    keywords = ["band c", "bandc", "流利", "精通", "level5", "level6", "5級", "6級", "c1", "c2"]
    t = text.lower()
    return any(k in t for k in keywords)


def scrape_sample_tests():
    print("\n=== 2. 官方模擬試題 ===")
    dest_dir = BASE_DIR / "sample_tests"
    dest_dir.mkdir(exist_ok=True)

    found_links: list[tuple[str, str]] = []  # (url, label)

    for page_url in SAMPLE_TEST_PAGES:
        try:
            resp = SESSION.get(page_url, timeout=20)
            resp.raise_for_status()
        except Exception as e:
            print(f"  [fail] {page_url} → {e}")
            continue

        soup = BeautifulSoup(resp.text, "lxml")

        # Look for all <a> tags with downloadable extensions
        for a in soup.find_all("a", href=True):
            href: str = a["href"]
            text = a.get_text(strip=True)
            ext = Path(urlparse(href).path).suffix.lower()
            if ext not in DOWNLOAD_EXTS:
                continue
            full_url = urljoin(SAMPLE_TEST_BASE, href)
            # Prefer Band C links, but collect all if none found
            found_links.append((full_url, text))

        time.sleep(0.5)

    # Filter Band C links; fall back to all links if none matched
    band_c_links = [(u, l) for u, l in found_links if is_band_c(u) or is_band_c(l)]
    targets = band_c_links if band_c_links else found_links

    if not targets:
        print("  [warn] No downloadable files found on sample test pages.")
        print("         The site may require login or use JavaScript rendering.")
        print("         Manual download: https://tocfl.edu.tw/tocfl/index.php/exam/test/page/1")
        return

    print(f"  Found {len(targets)} file(s) (Band C filter: {len(band_c_links)}/{len(found_links)})")
    for url, label in targets:
        filename = Path(urlparse(url).path).name
        # Sanitise filename
        filename = re.sub(r'[<>:"/\\|?*]', "_", filename)
        download_file(url, dest_dir / filename, label)
        time.sleep(0.3)


# ── 3. 試題編寫範例（教師用） ────────────────────────────────────────────────

EXAMPLES_URL = "https://tocfl.edu.tw/tocfl/index.php/teach/examples"


def scrape_teacher_examples():
    print("\n=== 3. 試題編寫範例（教師用） ===")
    dest_dir = BASE_DIR / "teacher_examples"
    dest_dir.mkdir(exist_ok=True)

    try:
        resp = SESSION.get(EXAMPLES_URL, timeout=20)
        resp.raise_for_status()
    except Exception as e:
        print(f"  [fail] {EXAMPLES_URL} → {e}")
        return

    soup = BeautifulSoup(resp.text, "lxml")
    found = []
    for a in soup.find_all("a", href=True):
        href: str = a["href"]
        ext = Path(urlparse(href).path).suffix.lower()
        if ext in DOWNLOAD_EXTS:
            full_url = urljoin(SAMPLE_TEST_BASE, href)
            found.append((full_url, a.get_text(strip=True)))

    if not found:
        print("  [warn] No downloadable files found on teacher examples page.")
        print("         Manual visit: https://tocfl.edu.tw/tocfl/index.php/teach/examples")
        return

    print(f"  Found {len(found)} file(s)")
    for url, label in found:
        filename = re.sub(r'[<>:"/\\|?*]', "_", Path(urlparse(url).path).name)
        download_file(url, dest_dir / filename, label)
        time.sleep(0.3)


# ── 4. 摘要報告 ──────────────────────────────────────────────────────────────

def print_summary():
    print("\n=== 下載摘要 ===")
    for folder in ["vocabulary", "sample_tests", "teacher_examples"]:
        p = BASE_DIR / folder
        if p.exists():
            files = list(p.rglob("*"))
            files = [f for f in files if f.is_file()]
            total_kb = sum(f.stat().st_size for f in files) // 1024
            print(f"  {folder}/  → {len(files)} 個檔案，共 {total_kb} KB")
        else:
            print(f"  {folder}/  → (空)")
    print()
    print("注意：線上題庫平台 (cbt.sc-top.org.tw) 及外部練習題 (practicetestgeeks.com)")
    print("      需手動截圖/複製，無法自動下載。")


# ── Main ─────────────────────────────────────────────────────────────────────

if __name__ == "__main__":
    print("TOCFL Band C 資源下載器")
    print("=" * 40)
    download_vocabulary()
    scrape_sample_tests()
    scrape_teacher_examples()
    print_summary()
