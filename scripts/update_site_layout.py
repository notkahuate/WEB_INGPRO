# -*- coding: utf-8 -*-
"""Actualiza navbar y breadcrumb en todas las páginas HTML."""
import re
from pathlib import Path

ROOT = Path(r"c:\Users\kbuen\Pagina_INGPRO\frontend")

NAVBAR_ES = """<nav class="navbar site-navbar" id="navbar" aria-label="Navegación principal">
        <div class="navbar-inner" id="primaryMenu">
            <a href="/pages/index.html" class="nav-item" data-nav-section="inicio">Inicio</a>
            <a href="/pages/productos.html?section=categorias" class="nav-item" data-nav-section="categorias">Categorías</a>
            <a href="/pages/productos.html?section=marcas" class="nav-item" data-nav-section="marcas">Marcas</a>
            <a href="/pages/productos.html?section=productos" class="nav-item" data-nav-section="productos">Productos</a>
            <a href="/pages/productos.html?section=paises" class="nav-item" data-nav-section="paises">Países</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contacto</a>
        </div>
    </nav>"""

NAVBAR_US = """<nav class="navbar site-navbar" id="navbar" aria-label="Main navigation">
        <div class="navbar-inner" id="primaryMenu">
            <a href="/pages_us/Home_us.html" class="nav-item" data-nav-section="inicio">Home</a>
            <a href="/pages_us/productos_us.html?section=categorias" class="nav-item" data-nav-section="categorias">Categories</a>
            <a href="/pages_us/productos_us.html?section=marcas" class="nav-item" data-nav-section="marcas">Brands</a>
            <a href="/pages_us/productos_us.html?section=productos" class="nav-item" data-nav-section="productos">Products</a>
            <a href="/pages_us/productos_us.html?section=paises" class="nav-item" data-nav-section="paises">Countries</a>
            <a href="https://wa.me/14842634627" class="nav-item">Contact</a>
        </div>
    </nav>"""

BREADCRUMB_ES = """<div class="section-breadcrumb" id="sectionBreadcrumb" aria-label="Ubicación actual">
        <div class="section-breadcrumb-inner">
            <nav class="section-breadcrumb-track" aria-label="Ruta de navegación">
                <ol id="sectionBreadcrumbList"></ol>
            </nav>
        </div>
    </div>"""

BREADCRUMB_US = """<div class="section-breadcrumb" id="sectionBreadcrumb" aria-label="Current location">
        <div class="section-breadcrumb-inner">
            <nav class="section-breadcrumb-track" aria-label="Navigation path">
                <ol id="sectionBreadcrumbList"></ol>
            </nav>
        </div>
    </div>"""

SKIP_NAV = {"productos.html", "productos_us.html"}


def ensure_css(content: str) -> str:
    if "site-layout.css" in content:
        return content
    return re.sub(
        r'(<link rel="stylesheet" href="[^"]+\.css">)',
        r'\1\n    <link rel="stylesheet" href="/css/site-layout.css">',
        content,
        count=1,
    )


def ensure_js(content: str) -> str:
    if "site-layout.js" in content:
        return content
    return re.sub(
        r'(<script src="[^"]+\.js"[^>]*>)',
        r'<script src="/js/site-layout.js" defer></script>\n    \1',
        content,
        count=1,
    )


def replace_navbar(content: str, navbar: str) -> str:
    pattern = re.compile(r"<nav class=\"navbar\"[^>]*>.*?</nav>", re.DOTALL | re.IGNORECASE)
    if not pattern.search(content):
        pattern = re.compile(r"<nav class=\"navbar[^\"]*\"[^>]*>.*?</nav>", re.DOTALL | re.IGNORECASE)
    new_content, n = pattern.subn(navbar, content, count=1)
    return new_content, n


def replace_product_breadcrumb(content: str, breadcrumb: str) -> str:
    pattern = re.compile(
        r"<nav class=\"product-breadcrumb\"[^>]*>.*?</nav>",
        re.DOTALL | re.IGNORECASE,
    )
    new_content, n = pattern.subn(breadcrumb, content, count=1)
    return new_content, n


def insert_breadcrumb_after_nav(content: str, breadcrumb: str) -> str:
    if 'id="sectionBreadcrumb"' in content:
        return content
    # Insertar después del navbar site-navbar o del header
    nav_match = re.search(r"</nav>\s*", content)
    if nav_match and "site-navbar" in content[nav_match.start() - 500 : nav_match.start() + 50]:
        pos = nav_match.end()
        return content[:pos] + "\n\n    " + breadcrumb + "\n" + content[pos:]
    header_match = re.search(r"</header>\s*", content)
    if header_match:
        pos = header_match.end()
        return content[:pos] + "\n\n    " + breadcrumb + "\n" + content[pos:]
    return content


def fix_productos_logo(content: str) -> str:
    return content.replace('width="184" height="48"', 'width="150"')


def process_file(path: Path, is_us: bool) -> bool:
    content = path.read_text(encoding="utf-8")
    original = content
    name = path.name.lower()

    if name not in SKIP_NAV:
        navbar = NAVBAR_US if is_us else NAVBAR_ES
        breadcrumb = BREADCRUMB_US if is_us else BREADCRUMB_ES
        content = ensure_css(content)
        content, nav_n = replace_navbar(content, navbar)
        content, bc_n = replace_product_breadcrumb(content, breadcrumb)
        content = insert_breadcrumb_after_nav(content, breadcrumb)
        content = ensure_js(content)
        if nav_n == 0 and name not in SKIP_NAV:
            print(f"  WARN: navbar no reemplazado en {path.name}")
    else:
        content = fix_productos_logo(content)

    if content != original:
        path.write_text(content, encoding="utf-8")
        return True
    return False


def main():
    updated = []
    for folder, is_us in [("pages", False), ("pages_us", True)]:
        for path in sorted((ROOT / folder).glob("*.html")):
            if process_file(path, is_us):
                updated.append(str(path.relative_to(ROOT)))
                print(f"OK {path.relative_to(ROOT)}")
    print(f"\nTotal actualizados: {len(updated)}")


if __name__ == "__main__":
    main()
