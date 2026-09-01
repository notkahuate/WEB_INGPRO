# -*- coding: utf-8 -*-
import re
from pathlib import Path

ROOT = Path(r"c:\Users\kbuen\Pagina_INGPRO\frontend")

pattern = re.compile(
    r'(<div class="section-breadcrumb" id="sectionBreadcrumb".*?</div>\s*</div>)\s*'
    r'(?:<!--.*?-->\s*)?'
    r'(<nav class="navbar site-navbar".*?</nav>)',
    re.DOTALL,
)

for folder in ("pages", "pages_us"):
    for path in (ROOT / folder).glob("*.html"):
        if path.name.lower() in ("productos.html", "productos_us.html"):
            continue
        content = path.read_text(encoding="utf-8")
        new_content, n = pattern.subn(r"\2\n\n    \1", content)
        if n:
            path.write_text(new_content, encoding="utf-8")
            print(f"Fixed order: {path.name}")
