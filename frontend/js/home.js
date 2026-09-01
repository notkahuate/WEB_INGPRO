const slides = document.querySelectorAll(".hero-slide");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
let index = 0;

function showSlide(n) {
  slides.forEach(slide => slide.classList.remove("active"));
  index = (n + slides.length) % slides.length;
  slides[index].classList.add("active");
}

function slugify(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function getProductThumb(p) {
  if (!p) return "/img/no-image.png";
  if (p.imagen_url && String(p.imagen_url).trim()) return String(p.imagen_url).trim();
  try {
    const imgs = typeof p.imagenes_url === "string" ? JSON.parse(p.imagenes_url) : p.imagenes_url;
    if (Array.isArray(imgs) && imgs.length) {
      const first = imgs[0];
      if (typeof first === "string" && first.trim()) return first.trim();
      if (first && typeof first.url === "string") return first.url;
    }
    if (typeof imgs === "string" && imgs.trim()) return imgs.trim();
  } catch (_) {}
  if (p.image_name && String(p.image_name).trim()) return String(p.image_name).trim();
  return "/img/no-image.png";
}

async function loadCatalogProducts() {
  const urls = ["/api/products", "https://ingprosuppliers.com/api/products"];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = await response.json();
      const list = Array.isArray(data) ? data : (data.products || data.data || []);
      if (Array.isArray(list) && list.length) return list;
    } catch (error) {
      console.warn(`No se pudo cargar productos desde ${url}:`, error.message || error);
    }
  }
  return [];
}

// URL SEO: /producto/{marca}/{modelo}/{categoria}
function buildProductUrl(p) {
  const seg = (v) => slugify(String(v || "")) || "";
  const brand = seg(p.brand || p.cf_marca || p.marca) || "marca";

  let modelRaw = String(p.modelo || p.model || p.cf_modelo || "").trim();
  if (!modelRaw) {
    const cleaned = String(p.name || "").replace(/[™®©]/g, " ").replace(/\s+/g, " ").trim();
    const m =
      cleaned.match(/\b([A-Za-z]{1,8}-?\d{2,6}[A-Za-z0-9-]{0,16})\b/) ||
      cleaned.match(/\b(\d{3,6}[A-Za-z]{1,6}\d{0,4}[A-Za-z0-9-]{0,12})\b/);
    modelRaw = (m && m[1]) || "";
  }
  if (!modelRaw) {
    const code = String(p.sku || p.cf_codigo || p.codigo || p.code || "").trim();
    const isOpaque = /^[a-f0-9]{10,}$/i.test(code) || /^\d{8,}$/.test(code);
    modelRaw = code && !isOpaque ? code : String(p.item_id || p.id || "modelo");
  }
  const model = seg(modelRaw) || "modelo";
  let categoryRaw = String(
    p.categoria || p.cf_categoria || p.cf_category || p.category || "general"
  )
    .replace(/[\s\-_/]*[(\[]?\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*[)\]]?\s*$/g, "")
    .replace(/\s*[|–—-]\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*$/g, "")
    .trim();
  let category = seg(categoryRaw) || "general";
  category = category.replace(/-[a-z]{1,3}\d{2,5}[a-z]{0,2}$/i, "") || "general";

  return `/producto/${brand}/${model}/${category}`;
}

next.addEventListener("click", () => showSlide(index + 1));
prev.addEventListener("click", () => showSlide(index - 1));

// Auto play cada 6 segundos
setInterval(() => showSlide(index + 1), 6000);


window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const offsetTop = navbar.offsetTop;

  if (window.scrollY > offsetTop + 100) { 
  navbar.classList.add('fixed');
  } else {
  navbar.classList.remove('fixed');
  }
  });

  
document.addEventListener("DOMContentLoaded", () => {
  // Handle category item clicks for expand/collapse
  const categoryItems = document.querySelectorAll(".category-item > span")

  categoryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation()
      const parentItem = this.parentElement

      document.querySelectorAll(".category-item").forEach((otherItem) => {
        if (otherItem !== parentItem) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle active class
      parentItem.classList.toggle("active")
    })
  })

  // Handle subcategory clicks
  const subcategoryItems = document.querySelectorAll(".subcategory-list li")

  subcategoryItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.stopPropagation()
      console.log("[v0] Subcategory clicked:", this.textContent)
      // Here you can add navigation logic
    })
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      document.querySelectorAll(".category-item").forEach((item) => {
        item.classList.remove("active")
      })
    }
  })
});

document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let allProducts = [];

  // 🔹 Cargar productos desde tu API (local primero)
  allProducts = await loadCatalogProducts();
  if (!allProducts.length) {
    console.error("❌ Error cargando productos");
  }
  
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const texto = searchInput.value.trim();

    if (texto.length > 0) {
      window.location.href = `/pages/productos.html?q=${encodeURIComponent(texto)}`;
    }
  }
});
  
  
  // 🔍 Escuchar mientras el usuario escribe
  searchInput.addEventListener("input", () => {
    const texto = searchInput.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (texto.length === 0) {
      searchResults.style.display = "none";
      return;
    }

     function normalizar(texto) {
      return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // quita tildes
        .replace(/[”"]/g, '"') // unifica comillas
        .replace(/®/g, "") // quita símbolos
        .replace(/-/g, " ") // 🔥 clave para Anti-Explosion
        .replace(/\s+/g, " ")
        .trim();
    }

    // 🔎 Filtrar productos por nombre, marca o SKU
    const textoNormalizado = normalizar(texto);
    const palabras = textoNormalizado.split(" ");
    
    const filtrados = allProducts.filter(p => {
      const name = normalizar(p.name || "");
      const marca = normalizar(p.cf_marca || "");
      const sku = normalizar(p.sku || "");
    
      return palabras.every(palabra =>
        name.includes(palabra) ||
        marca.includes(palabra) ||
        sku.includes(palabra)
      );
    });
    if (filtrados.length === 0) {
      searchResults.innerHTML = `<div class="result-item"><div class="result-info">No results found</div></div>`;
      searchResults.style.display = "block";
      return;
    }

    // 🧱 Mostrar productos encontrados
    filtrados.slice(0, 8).forEach(p => {
      const imagenPrincipal = getProductThumb(p);

      const div = document.createElement("div");
      div.classList.add("result-item");

      div.innerHTML = `
        <img src="${imagenPrincipal}" alt="${p.name || ""}">
        <div class="result-info">
          <strong>${p.name || "Producto"}</strong>
          <span>${p.cf_marca || p.brand || "Sin marca"}</span>
        </div>
      `;

      div.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(p));
        window.location.href = buildProductUrl(p);
      });
      searchResults.appendChild(div);
    });

    searchResults.style.display = "block";
  });

  // 🔸 Cerrar resultados al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
      searchResults.style.display = "none";
    }
  });
});


// === Cargar productos aleatorios en "Recommended For You" ===
document.addEventListener("DOMContentLoaded", async () => {
  const recommendedGrid = document.getElementById("recommendedGrid");
  if (!recommendedGrid) return;

  const allProducts = await loadCatalogProducts();
  if (!allProducts.length) {
    console.error("❌ Error al cargar productos recomendados");
    return;
  }

  // Seleccionar 5 productos aleatorios
  const shuffled = allProducts.sort(() => 0.5 - Math.random());
  const randomProducts = shuffled.slice(0, 5);

  recommendedGrid.innerHTML = "";

  randomProducts.forEach(p => {
    const imagenPrincipal = getProductThumb(p);

    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="card-image">
        <img src="${imagenPrincipal}" alt="${p.name || ""}">
      </div>
      <div class="card-info">
        <h3>${p.name || "Producto"}</h3>
        <p>${p.cf_marca || p.brand || "Sin marca"}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      localStorage.setItem("selectedProduct", JSON.stringify(p));
      window.location.href = buildProductUrl(p);
    });

    recommendedGrid.appendChild(card);
  });
});
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
});

function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce((acc, p) => acc + p.quantity, 0);
  cartCountEl.textContent = `Carrito (${totalItems})`;
}


const langModal = document.getElementById("languageModal");
const openLangModal = document.getElementById("openLangModal");
const closeLangModal = document.getElementById("closeLangModal");

// Abrir modal
openLangModal.addEventListener("click", () => {
  langModal.style.display = "flex";
});

// Cerrar modal
closeLangModal.addEventListener("click", () => {
  langModal.style.display = "none";
});

function selectLanguage(lang) {
  localStorage.setItem("lang", lang);

  if (lang === "es") {
    window.location.href = "/pages/index.html"; // 👈 español REAL
  } else {
    window.location.href = "https://ingprosuppliers.com"; // 👈 inglés
  }
}



document.addEventListener("DOMContentLoaded", function () {
  // El menú móvil lo maneja site-layout.js (menuToggle / header-right).
  // Aquí solo se mantienen dropdowns del navbar en móvil.

  // Dropdown principal
  document.querySelectorAll(".dropdown > .nav-item").forEach(button => {
    button.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const dropdown = this.nextElementSibling;
        if (dropdown) dropdown.classList.toggle("mobile-open");
      }
    });
  });

  // Subcategorías
  document.querySelectorAll(".category-item > span").forEach(category => {
    category.addEventListener("click", function () {
      if (window.innerWidth <= 768) {
        const sub = this.nextElementSibling;
        category.classList.toggle("active");
        if (sub) sub.classList.toggle("mobile-open");
      }
    });
  });

});





