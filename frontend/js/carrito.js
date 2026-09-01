document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartItems");
  const emptyMessage = document.getElementById("emptyMessage");
  const itemCountEl = document.getElementById("itemCount");
  const cartCountEl = document.getElementById("cartCount");
  const quoteBtn = document.getElementById("quoteBtn");

  let cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];

  function renderCart() {
    if (cartItems.length === 0) {
      emptyMessage.style.display = "block";
      cartItemsContainer.innerHTML = "";
      itemCountEl.textContent = "0";
      cartCountEl.textContent = "Carrito (0)";
      return;
    }

    emptyMessage.style.display = "none";
    const totalItems = cartItems.reduce((acc, p) => acc + p.quantity, 0);
    itemCountEl.textContent = totalItems;
    cartCountEl.textContent = `Carrito (${totalItems})`;

    cartItemsContainer.innerHTML = cartItems.map((p, index) => `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.name}" class="cart-image" />
        <div class="cart-info">
          <h3>${p.name}</h3>
          <p><strong>Referencia:</strong> ${p.partNumber}</p>
          <p><strong>Proveedor:</strong> ${p.brand}</p>
        </div>
        <div class="quantity-controls">
          <button class="decrease" data-index="${index}">−</button>
          <span>${p.quantity}</span>
          <button class="increase" data-index="${index}">+</button>
        </div>
      </div>
    `).join("");

    // Escuchar botones dinámicos
    document.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        cartItems[idx].quantity++;
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
      });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", () => {
        const idx = btn.dataset.index;
        if (cartItems[idx].quantity > 1) {
          cartItems[idx].quantity--;
        } else {
          cartItems.splice(idx, 1);
        }
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
        renderCart();
      });
    });
  }

  renderCart();

  if (quoteBtn) {
    quoteBtn.addEventListener("click", () => {
      window.location.href = "/pages/login.html";
    });
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


window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const offsetTop = navbar.offsetTop;

  if (window.scrollY > offsetTop + 100) { 
  navbar.classList.add('fixed');
  } else {
  navbar.classList.remove('fixed');
  }
  });


  
document.addEventListener("DOMContentLoaded", async () => {
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");

  let allProducts = [];

  // 🔹 Cargar productos desde tu API
  try {
    const response = await fetch("https://ingprosuppliers.com/api/products");
    allProducts = await response.json();
  } catch (error) {
    console.error("❌ Error cargando productos:", error);
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
      // ✅ Obtener imagen principal desde JSON `imagenes_url`
      let imagenPrincipal = "/img/no-image.png";
      try {
        const imgs = typeof p.imagenes_url === "string" ? JSON.parse(p.imagenes_url) : p.imagenes_url;
        if (Array.isArray(imgs) && imgs.length > 0) {
          imagenPrincipal = imgs[0];
        }
      } catch (err) {
        console.warn("⚠️ Error parseando imagenes_url:", err);
      }

      const div = document.createElement("div");
      div.classList.add("result-item");

      div.innerHTML = `
        <img src="${imagenPrincipal}" alt="${p.name}">
        <div class="result-info">
          <strong>${p.name}</strong>
          <span>${p.cf_marca || "Unknown brand"}</span>
        </div>
      `;

      div.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(p));
        window.location.href = "/pages/compras.html";
      });

      searchResults.appendChild(div);
    });

    searchResults.style.display = "block";
    console.log(JSON.parse(sessionStorage.getItem("cartItems")));
  });

  // 🔸 Cerrar resultados al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-bar")) {
      searchResults.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  // Menú móvil unificado en site-layout.js
});


