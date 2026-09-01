import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "frontend"

ES_NAV_ABS = """        <div class="navbar-inner" id="primaryMenu">
            <a href="/pages/index.html" class="nav-item" data-nav-section="inicio">Inicio</a>
            <a href="/pages/productos.html?section=inicio" class="nav-item" data-nav-section="productos">Productos</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contacto</a>
        </div>"""

ES_NAV_REL = """        <div class="navbar-inner" id="primaryMenu">
            <a href="../pages/index.html" class="nav-item" data-nav-section="inicio">Inicio</a>
            <a href="../pages/productos.html?section=inicio" class="nav-item" data-nav-section="productos">Productos</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contacto</a>
        </div>"""

US_NAV_ABS = """        <div class="navbar-inner" id="primaryMenu">
            <a href="/pages_us/Home_us.html" class="nav-item" data-nav-section="inicio">Home</a>
            <a href="/pages_us/productos_us.html?section=inicio" class="nav-item" data-nav-section="productos">Products</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contact</a>
        </div>"""

US_NAV_REL = """        <div class="navbar-inner" id="primaryMenu">
            <a href="../pages_us/Home_us.html" class="nav-item" data-nav-section="inicio">Home</a>
            <a href="../pages_us/productos_us.html?section=inicio" class="nav-item" data-nav-section="productos">Products</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contact</a>
        </div>"""

PRODUCTOS_ES = """      <div class="navbar-inner" id="primaryMenu">
        <a href="/" class="nav-item" data-nav-section="inicio">Inicio</a>
        <a href="/pages/productos.html?section=inicio" class="nav-item active" data-nav-section="productos">Productos</a>
        <a href="https://wa.me/14842634627" class="nav-item">Contacto</a>
      </div>"""

PRODUCTOS_US = """      <div class="navbar-inner" id="primaryMenu">
        <a href="/" class="nav-item" data-nav-section="inicio">Home</a>
        <a href="/pages_us/productos_us.html?section=inicio" class="nav-item active" data-nav-section="productos">Products</a>
        <a href="https://wa.me/14842634627" class="nav-item">Contact</a>
      </div>"""

nav_block_re = re.compile(
    r'<div class="navbar-inner" id="primaryMenu">.*?</div>',
    re.DOTALL,
)

REL_ES_FILES = {"index.html", "brands.html"}
REL_US_FILES = {"Home_us.html", "brands_us.html"}
PRODUCT_PAGES = {
    "compras.html",
    "compras_us.html",
    "opciones.html",
    "Opciones_us.html",
    "filtrado.html",
    "filtrado_us.html",
    "busquedas.html",
    "busqueda_us.html",
}

updated = []
for folder in ("pages", "pages_us"):
    for html in (ROOT / folder).glob("*.html"):
        text = html.read_text(encoding="utf-8")
        if "navbar-inner" not in text:
            continue

        name = html.name
        if name == "productos.html":
            replacement = PRODUCTOS_ES
        elif name == "productos_us.html":
            replacement = PRODUCTOS_US
        elif folder == "pages_us":
            replacement = US_NAV_REL if name in REL_US_FILES else US_NAV_ABS
        else:
            replacement = ES_NAV_REL if name in REL_ES_FILES else ES_NAV_ABS

        new_text, count = nav_block_re.subn(replacement, text, count=1)
        if count == 0:
            continue

        if name in PRODUCT_PAGES:
            new_text = new_text.replace(
                'class="nav-item" data-nav-section="productos"',
                'class="nav-item active" data-nav-section="productos"',
                1,
            )
        if name == "index.html" or name == "Home_us.html":
            new_text = new_text.replace(
                'class="nav-item" data-nav-section="inicio"',
                'class="nav-item active" data-nav-section="inicio"',
                1,
            )

        if new_text != text:
            html.write_text(new_text, encoding="utf-8")
            updated.append(str(html.relative_to(ROOT)))

print(f"Updated {len(updated)} files:")
for path in updated:
    print(f"  {path}")
