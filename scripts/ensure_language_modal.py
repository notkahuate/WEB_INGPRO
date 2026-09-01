import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "frontend"

ES_TOOLS = """
                <a href="/pages/login.html" class="account-link">
                    <span aria-hidden="true">👤</span>
                    <div>
                        <strong>Mi Cuenta</strong><br>
                        <small>Hola, Iniciar Sesión</small>
                    </div>
                </a>

                <div class="language-switch">
                    <button type="button" id="openLangModal">🌐 Idioma</button>
                </div>
"""

US_TOOLS = """
            <a href="/pages_us/login_us.html" class="account-link">
                <span aria-hidden="true">👤</span>
                <div>
                    <strong>My Account</strong><br>
                    <small>Hello, Sign In</small>
                </div>
            </a>

            <div class="language-switch">
                <button type="button" id="openLangModal">🌐 Language</button>
            </div>
"""

ES_MODAL = """
<!-- Modal idioma -->
<div id="languageModal" class="lang-modal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle" hidden>
  <div class="lang-modal-content">
    <button type="button" class="lang-close" id="closeLangModal" aria-label="Cerrar">&times;</button>
    <h2 id="langModalTitle">🌍 Selecciona tu idioma</h2>
    <p>¿En qué idioma deseas ver la página?</p>
    <div class="lang-buttons">
      <button type="button" class="lang-btn" data-lang="es">🇪🇸 Español</button>
      <button type="button" class="lang-btn" data-lang="en">🇺🇸 English</button>
    </div>
  </div>
</div>
"""

US_MODAL = """
<!-- Language modal -->
<div id="languageModal" class="lang-modal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle" hidden>
  <div class="lang-modal-content">
    <button type="button" class="lang-close" id="closeLangModal" aria-label="Close">&times;</button>
    <h2 id="langModalTitle">🌍 Select your language</h2>
    <p>Which language would you like to view the site in?</p>
    <div class="lang-buttons">
      <button type="button" class="lang-btn" data-lang="es">🇪🇸 Spanish</button>
      <button type="button" class="lang-btn" data-lang="en">🇺🇸 English</button>
    </div>
  </div>
</div>
"""

MODAL_RE = re.compile(
    r'\n?<!--(?:\s*Modal idioma|\s*Language modal)?\s*-->\s*\n'
    r'<div id="languageModal"[\s\S]*?</div>\s*\n</div>\s*\n'
    r'|<div id="languageModal"[\s\S]*?</div>\s*\n</div>\s*\n',
    re.MULTILINE,
)

SITE_LAYOUT_RE = re.compile(r'\s*<script[^>]*site-layout\.js[^>]*>\s*</script>\s*', re.IGNORECASE)

CART_MARKERS = [
    re.compile(r'(<a[^>]*href="[^"]*carrito[^"]*"[^>]*>)', re.IGNORECASE),
    re.compile(r'(<span class="cart-count"[^>]*>)', re.IGNORECASE),
]


def add_tools(text: str, tools: str) -> str:
    if "openLangModal" in text:
        return text
    for pattern in CART_MARKERS:
        if pattern.search(text):
            return pattern.sub(tools + r"\n                \1", text, count=1)
    # Fallback: after contact-info block inside header-right
    fallback = re.compile(
        r'(</div>\s*\n\s*)(?=<(?:a|span)[^>]*(?:cart-count|carrito))',
        re.IGNORECASE,
    )
    if fallback.search(text):
        return fallback.sub(r"\1" + tools + "\n                ", text, count=1)
    return text


def set_modal(text: str, modal: str) -> str:
    if MODAL_RE.search(text):
        text = MODAL_RE.sub("\n" + modal + "\n", text, count=1)
    elif 'id="languageModal"' not in text:
        text = text.replace("</body>", modal + "\n</body>", 1)
    return text


def ensure_site_layout(text: str, folder: str) -> str:
    text = SITE_LAYOUT_RE.sub("\n", text)
    src = "../js/site-layout.js" if folder == "pages" else "/js/site-layout.js"
    tag = f'    <script src="{src}" defer></script>\n'
    if "</body>" in text:
        text = text.replace("</body>", tag + "</body>", 1)
    return text


def process_file(path: Path) -> bool:
    folder = path.parent.name
    is_us = folder == "pages_us"
    tools = US_TOOLS if is_us else ES_TOOLS
    modal = US_MODAL if is_us else ES_MODAL

    original = path.read_text(encoding="utf-8")
    updated = add_tools(original, tools)
    updated = set_modal(updated, modal)
    updated = ensure_site_layout(updated, folder)

    if updated != original:
        path.write_text(updated, encoding="utf-8")
        return True
    return False


updated = []
for folder in ("pages", "pages_us"):
    for html in sorted((ROOT / folder).glob("*.html")):
        if process_file(html):
            updated.append(str(html.relative_to(ROOT)))

print(f"Updated {len(updated)} files:")
for item in updated:
    print(f"  {item}")
