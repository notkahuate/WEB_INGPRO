import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "frontend"

HERO_RE = re.compile(
    r'\n\s*<section class="hero" id="heroSection"[\s\S]*?</section>\s*',
    re.MULTILINE,
)
INICIO_RE = re.compile(
    r'\n\s*<section class="browse-section hidden" id="inicioSection"[^>]*></section>\s*',
    re.MULTILINE,
)
BROWSE_RE = re.compile(
    r'\n\s*<section class="browse-hub-panel hidden" id="browseHubPanel"[\s\S]*?</section>\s*',
    re.MULTILINE,
)
MAIN_RE = re.compile(r'(<main class="main-content" id="mainContent">\s*)', re.MULTILINE)


def transform(html: str) -> str:
    browse_match = BROWSE_RE.search(html)
    if not browse_match:
        raise ValueError("browse-hub-panel not found")
    browse_block = browse_match.group(0)
    html = BROWSE_RE.sub("\n", html, count=1)
    html = HERO_RE.sub("\n", html, count=1)
    html = INICIO_RE.sub("\n", html, count=1)

    if not MAIN_RE.search(html):
        raise ValueError("mainContent not found")

    html = MAIN_RE.sub(r"\1" + browse_block, html, count=1)
    return html


for name in ("productos.html", "productos_us.html"):
    folder = "pages_us" if name.endswith("_us.html") else "pages"
    path = ROOT / folder / name
    original = path.read_text(encoding="utf-8")
    updated = transform(original)
    path.write_text(updated, encoding="utf-8")
    print(f"Updated {path.relative_to(ROOT)}")
