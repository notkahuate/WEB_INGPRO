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
<div id="languageModal" class="lang-modal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle">
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
<div id="languageModal" class="lang-modal" role="dialog" aria-modal="true" aria-labelledby="langModalTitle">
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

CART_RE = re.compile(r'(<a[^>]*href="[^"]*carrito[^"]*"[^>]*>)', re.IGNORECASE)
SITE_LAYOUT_RE = re.compile(r'<script[^>]*site-layout\.js[^>]*>\s*</script>', re.IGNORECASE)


def add_tools(text: str, tools: str) -> str:
    if "account-link" in text and "openLangModal" in text:
        return text
    if not CART_RE.search(text):
        return text
    return CART_RE.sub(tools + r"\n                \1", text, count=1)


def add_modal(text: str, modal: str) -> str:
    if 'id="languageModal"' in text:
        return text
    return text.replace("</body>", modal + "\n</body>", 1)


def ensure_site_layout(text: str, folder: str) -> str:
    if SITE_LAYOUT_RE.search(text):
        return text
    src = "../js/site-layout.js" if folder == "pages" else "/js/site-layout.js"
    tag = f'    <script src="{src}" defer></script>\n'
    return text.replace("</body>", tag + "</body>", 1)


def process_file(path: Path) -> bool:
    folder = path.parent.name
    is_us = folder == "pages_us"
    tools = US_TOOLS if is_us else ES_TOOLS
    modal = US_MODAL if is_us else ES_MODAL

    original = path.read_text(encoding="utf-8")
    updated = add_tools(original, tools)
    updated = add_modal(updated, modal)
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
