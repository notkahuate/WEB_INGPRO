

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
})


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
      // 🔥 enviar búsqueda a busqueda.html
      window.location.href = `/pages_us/busqueda_us.html?q=${encodeURIComponent(texto)}`;
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
        window.location.href = "/pages_us/compras_us.html";
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

document.addEventListener("DOMContentLoaded", () => {
  const productSummary = document.querySelector(".product-summary");
  const productImage = productSummary?.querySelector(".product-image img");
  const productTitle = productSummary?.querySelector(".product-title");
  const partNumber = productSummary?.querySelector(".part-number");

  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!selectedProduct) {
    console.warn("⚠️ No hay producto en localStorage");
    return;
  }

  // 🔥 NORMALIZAR IMAGENES (CLAVE)
  let images = [];

  try {
    if (typeof selectedProduct.imagenes_url === "string") {
      images = JSON.parse(selectedProduct.imagenes_url);
    } else if (Array.isArray(selectedProduct.imagenes_url)) {
      images = selectedProduct.imagenes_url;
    }
  } catch (e) {
    console.warn("Error parseando imagenes_url:", e);
    images = [];
  }

  if (!Array.isArray(images)) images = [];

  // 🔥 IMAGEN PRINCIPAL
  if (productImage) {
    productImage.src = images[0] || "/img/no-image.png";
  }

  // 🔥 TITULO (inglés en UI; name español se conserva en selectedProduct.name)
  if (productTitle) {
    const en = String(selectedProduct.cf_item || selectedProduct.nameEn || '').trim();
    productTitle.textContent = en || selectedProduct.name || "Product";
  }

  // 🔥 PART NUMBER
  if (partNumber) {
    partNumber.textContent =
      selectedProduct.item_id || selectedProduct.sku || "N/A";
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const optionSectionsContainer = document.querySelector(".option-sections");
  const nextBtn = document.getElementById("nextBtn");
  const prevBtn = document.getElementById("prevBtn");
  const partNumberEl = document.querySelector(".part-number");
  const productTitleEl = document.querySelector(".product-title");
  const messageContainer = document.querySelector(".message-container");

  let optionSections = [];
  let optionalSections = []; // 🔧 aquí guardaremos los SELECT opcionales
  let currentStep = 0;
  let partProgress = "";
  let selections = {};
  let optionalContainer = null;

  // === 1️⃣ Obtener producto desde localStorage ===
  const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));
  if (!selectedProduct || !selectedProduct.item_id) {
    console.error("❌ No se encontró item_id del producto en localStorage");
    messageContainer.innerHTML = `<p class="alert alert-danger">No se encontró el producto seleccionado.</p>`;
    return;
  }

  const itemId = selectedProduct.item_id;

  // === 2️⃣ Consultar producto desde el backend ===
  try {
    const response = await fetch(`https://ingprosuppliers.com/api/products/${itemId}`);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();

    const match = data.name.match(/\b\d{3,4}[A-Z]?\b/);
    const basePart = match ? match[0] : "0000X";
    partProgress = basePart;
    partNumberEl.textContent = partProgress;
    // Mostrar inglés (cf_item); conservar data.name en español para el carrito
    const enName = String(data.cf_item || '').trim();
    productTitleEl.textContent = enName || data.name || "Product";
    productTitleEl.dataset.nameEs = data.name || "";

    // 🔥 NORMALIZAR config_options (CLAVE)
let config = data.config_options;

try {
  if (typeof config === "string") {
    config = JSON.parse(config);
  }
} catch (e) {
  console.warn("Error parseando config_options:", e);
  config = { required: [], optional: [] };
}

// fallback seguro
config = config || { required: [], optional: [] };

const requiredSteps = Array.isArray(config.required) ? config.required : [];
const optionalSteps = Array.isArray(config.optional) ? config.optional : [];

    if (requiredSteps.length === 0 && optionalSteps.length === 0) {
      optionSectionsContainer.innerHTML = `
        <p class="no-config-message" style="
          text-align: center;
          font-size: 1.1em;
          color: #666;
          margin-top: 20px;
        ">
          This product has no configurations.
        </p>
      `;
      nextBtn.style.display = "none";
      prevBtn.style.display = "none";
      return;
    }

    const escapeHtml = (value) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

    const resolveImageUrl = (item) => {
      if (!item || typeof item !== "object") return "";
      let raw = item.image || item.imagen || item.img || item.image_url || item.imagen_url || "";
      if (typeof raw !== "string") return "";
      raw = raw.trim().replace(/\\/g, "/");
      if (!raw) return "";
      if (/^https?:\/\//i.test(raw)) return raw;
      if (raw.startsWith("/img/")) return `..${raw}`;
      if (raw.startsWith("img/")) return `../${raw}`;
      return raw;
    };

    const renderOptionRow = (opt, nameAttr, inputType = "radio") => {
      const imgUrl = resolveImageUrl(opt);
      const label = escapeHtml(opt.label || opt.value || "");
      const value = escapeHtml(opt.value || "");
      const code = opt.code || opt.codigo || "";
      const visual = imgUrl
        ? `<span class="cfg-option-visual"><img src="${escapeHtml(imgUrl)}" alt="${label}" loading="lazy"></span>`
        : `<span class="cfg-option-visual cfg-option-visual--empty" aria-hidden="true"></span>`;

      return `
        <label class="cfg-option-row${imgUrl ? " cfg-option-row--has-image" : ""}">
          ${visual}
          <span class="cfg-option-main">
            <input type="${inputType}" name="${escapeHtml(nameAttr)}" value="${value}">
            <span class="cfg-option-copy">
              <span class="cfg-option-label">${label}</span>
              ${code ? `<code class="cfg-option-code">${escapeHtml(code)}</code>` : ""}
            </span>
          </span>
        </label>
      `;
    };

    const renderStepChrome = (step, index) => {
      const num = String(index + 1).padStart(2, "0");
      const title = escapeHtml(step.title || `Step ${index + 1}`);
      const desc = step.description || step.info || step.descripcion || "";
      const stepImage = resolveImageUrl(step);
      return `
        <div class="option-section__head">
          <span class="option-section__num" aria-hidden="true">${num}</span>
          <div class="option-section__titles">
            <h3>${title}</h3>
            ${desc ? `<p class="option-section__desc">${escapeHtml(desc)}</p>` : ""}
          </div>
        </div>
        ${
          stepImage
            ? `<div class="option-module-image-wrap"><img class="option-module-image" src="${escapeHtml(stepImage)}" alt="${title}" loading="lazy"></div>`
            : ""
        }
      `;
    };

    // === 3️⃣ Crear secciones requeridas ===
    optionSectionsContainer.innerHTML = "";
    requiredSteps.forEach((step, index) => {
      const section = document.createElement("div");
      section.classList.add("option-section");
      section.style.display = index === 0 ? "block" : "none";

      const options = Array.isArray(step.options) ? step.options : [];
      const hasImages = options.some((opt) => !!resolveImageUrl(opt));
      const radios = options
        .map((opt) => renderOptionRow(opt, `option${index}`, "radio"))
        .join("");

      section.innerHTML = `
        ${renderStepChrome(step, index)}
        <div class="option-group${hasImages ? " option-group--media" : ""}">${radios}</div>
      `;
      optionSectionsContainer.appendChild(section);
    });

    optionSections = document.querySelectorAll(".option-section");
    window.basePart = basePart;

    // === 🔹 OPCIONALES ===
    optionalContainer = document.createElement("div");
    optionalContainer.style.display = "none";
    optionalContainer.classList.add("optional-container");

    const divider = document.createElement("hr");
    divider.classList.add("divider");
    divider.style.margin = "25px 0";
    optionalContainer.appendChild(divider);

    const optionalTitle = document.createElement("h3");
    optionalTitle.textContent = "Optional options (not required)";
    optionalTitle.classList.add("optional-title");
    optionalContainer.appendChild(optionalTitle);

    optionalSteps.forEach((group, groupIndex) => {
      const groupEl = document.createElement("div");
      groupEl.classList.add("optional-group");

      const options = Array.isArray(group.options) ? group.options : [];
      const hasImages = options.some((opt) => !!resolveImageUrl(opt));
      const groupImage = resolveImageUrl(group);

      const title = document.createElement("h4");
      title.textContent = group.title || `Optional ${groupIndex + 1}`;
      groupEl.appendChild(title);

      if (group.description || group.info || group.descripcion) {
        const p = document.createElement("p");
        p.className = "option-section__desc";
        p.textContent = group.description || group.info || group.descripcion;
        groupEl.appendChild(p);
      }

      if (groupImage) {
        const wrap = document.createElement("div");
        wrap.className = "option-module-image-wrap";
        wrap.innerHTML = `<img class="option-module-image" src="${escapeHtml(groupImage)}" alt="${escapeHtml(group.title || "")}" loading="lazy">`;
        groupEl.appendChild(wrap);
      }

      if (hasImages) {
        const select = document.createElement("select");
        select.name = group.name || `optional_${groupIndex}`;
        select.classList.add("optional-select");
        select.hidden = true;

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select an option...";
        select.appendChild(defaultOption);

        options.forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          select.appendChild(option);
        });

        const visual = document.createElement("div");
        visual.className = "option-group option-group--media";
        visual.innerHTML = options
          .map((opt) => renderOptionRow(opt, `optional_visual_${groupIndex}`, "radio"))
          .join("");

        visual.addEventListener("change", (e) => {
          if (e.target && e.target.type === "radio") {
            select.value = e.target.value;
            select.dispatchEvent(new Event("change", { bubbles: true }));
          }
        });

        groupEl.appendChild(visual);
        groupEl.appendChild(select);
      } else {
        const select = document.createElement("select");
        select.name = group.name || `optional_${groupIndex}`;
        select.classList.add("optional-select");

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.textContent = "Select an option...";
        select.appendChild(defaultOption);

        options.forEach((opt) => {
          const option = document.createElement("option");
          option.value = opt.value;
          option.textContent = opt.label;
          select.appendChild(option);
        });

        groupEl.appendChild(select);
      }

      optionalContainer.appendChild(groupEl);
    });

    optionSectionsContainer.appendChild(optionalContainer);

    // 🔧 CORRECCIÓN: ahora sí guardamos los SELECT opcionales
    optionalSections = optionalContainer.querySelectorAll("select.optional-select");

  } catch (error) {
    console.error("Error al obtener opciones configurables:", error);
    messageContainer.innerHTML = `<p class="alert alert-danger">Error al obtener opciones del producto.</p>`;
    return;
  }

  // === 4️⃣ Actualizar número de parte ===
  function updatePartNumber() {
    const parts = [];
    if (window.basePart) parts.push(window.basePart);

    for (let i = 0; i < optionSections.length; i++) {
      if (selections[i]) parts.push(selections[i]);
    }

    optionalSections.forEach(select => {
      if (select.value) parts.push(select.value.toUpperCase());
    });

    partProgress = parts.join(" | ");
    partNumberEl.textContent = partProgress;
  }

  // === 5️⃣ Manejar selección requerida ===
  function handleSelection(stepIndex) {
    const currentSection = optionSections[stepIndex];
    if (!currentSection) return;

    let selected = currentSection.querySelector('input[type="radio"]:checked');

    if (!selected) {
      selected = currentSection.querySelector('input[type="radio"]');
      if (selected) selected.checked = true;
    }

    if (!selected) return;
    selections[stepIndex] = selected.value.toUpperCase();
    updatePartNumber();
  }

  // === 6️⃣ Mostrar sección actual ===
  function showSection(index) {
    if (!optionSections.length) return;

    optionSections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });

    if (prevBtn) prevBtn.disabled = index === 0;
    if (nextBtn) {
      nextBtn.textContent =
        index === optionSections.length - 1 ? "Finish required" : "Next ➡";
    }
  }

  // === 7️⃣ Navegación ===
  nextBtn.addEventListener("click", () => {
    handleSelection(currentStep);

    if (currentStep < optionSections.length - 1) {
      currentStep++;
      showSection(currentStep);
    } else {
      optionSectionsContainer.innerHTML = "";
      optionSectionsContainer.appendChild(optionalContainer);

      optionalContainer.style.display = "block";
      nextBtn.style.display = "none";
      prevBtn.style.display = "none";

      updatePartNumber();
      optionalContainer.scrollIntoView({ behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 0) {
      currentStep--;
      showSection(currentStep);
    }
  });

  const summaryImage = document.querySelector(".product-summary .product-image img");

  // === 8️⃣ Actualizar en tiempo real ===
  document.addEventListener("change", (e) => {

    // Requeridos
    if (e.target.type === "radio") {
      const sectionIndex = [...optionSections].findIndex(sec =>
        sec.contains(e.target)
      );
      if (sectionIndex >= 0) {
        selections[sectionIndex] = e.target.value.toUpperCase();
      }

      const row = e.target.closest(".cfg-option-row");
      const thumb = row?.querySelector(".cfg-option-visual img");
      if (summaryImage && thumb?.src) {
        summaryImage.src = thumb.src;
      }

      updatePartNumber();
    }

    // Opcionales
    if (e.target.classList.contains("optional-select")) {
      updatePartNumber();
    }
  });

  showSection(currentStep);
});





// === 🛒 Manejo del botón "Add to Cart" ===
document.addEventListener("DOMContentLoaded", () => {
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");

  addToCartBtns.forEach(btn => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();

      const productTitleEl = document.querySelector(".product-title");
      const partNumberEl = document.querySelector(".part-number");
      const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

        let images = [];
        
        try {
          if (typeof selectedProduct.imagenes_url === "string") {
            images = JSON.parse(selectedProduct.imagenes_url);
          } else {
            images = selectedProduct.imagenes_url || [];
          }
        } catch (e) {
          images = [];
        }
        
        const newProduct = {
          id: selectedProduct.item_id || Date.now(),
          // Nombre en español para cotización / envío
          name: selectedProduct.name || productTitleEl.dataset.nameEs || productTitleEl.textContent.trim(),
          partNumber: partNumberEl.textContent.trim(),
          brand: selectedProduct.brand || "Proveedor desconocido",
          image: images[0] || "/img/no-image.png",
          quantity: 1,
          categoria: selectedProduct.categoria || "SIN-CATEGORÍA"
        };

      let currentCart = JSON.parse(sessionStorage.getItem("cartItems")) || [];

      const existing = currentCart.find(p => p.partNumber === newProduct.partNumber);
      if (existing) {
        existing.quantity += 1;
      } else {
        currentCart.push(newProduct);
      }

      sessionStorage.setItem("cartItems", JSON.stringify(currentCart));

      // Confirmación visual sin alerta fea
      const confirm = document.createElement("div");
      confirm.className = "cart-toast";
      confirm.textContent = `✅ "${newProduct.name}" añadido al carrito`;
      document.body.appendChild(confirm);
      setTimeout(() => confirm.remove(), 2000);

      // Redirigir al carrito después de 1 segundo
      setTimeout(() => {
        window.location.href = "/pages_us/carrito_us.html";
      }, 1000);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {

    // Elementos del modal
    const modal = document.getElementById("searchModal");
    const closeBtn = modal.querySelector(".close");
    const actionBtn = document.querySelector(".action-btn");
    const productName = document.querySelector(".product-title").innerText;
    const modalProductName = document.getElementById("modalProductName");

    // 👉 Abrir modal al hacer clic en "Tengo Configuración"
    actionBtn.addEventListener("click", () => {
        modal.style.display = "block";
        modalProductName.textContent = productName;
    });

    // 👉 Cerrar modal con la X
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 👉 Cerrar modal haciendo clic fuera
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

});


document.addEventListener("DOMContentLoaded", () => {

  const modal = document.getElementById("searchModal");
  const input = document.getElementById("productSearchInput");
  const acceptBtn = document.getElementById("acceptConfigBtn");
  const partNumberEl = document.querySelector(".part-number");

  let manualConfig = ""; // 👈 texto escrito por el usuario
  let basePartNumber = partNumberEl.textContent.trim();

  // 🔹 Al abrir el modal guardamos el part number actual
  document.querySelector(".action-btn").addEventListener("click", () => {
    basePartNumber = partNumberEl.textContent.trim();
    input.value = manualConfig;
  });

  // 🔹 Al aceptar configuración
  acceptBtn.addEventListener("click", () => {
    manualConfig = input.value.trim();

    if (manualConfig !== "") {
      partNumberEl.textContent = `${basePartNumber} | ${manualConfig}`;
    } else {
      partNumberEl.textContent = basePartNumber;
    }

    modal.style.display = "none";
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
  cartCountEl.textContent = `Cart (${totalItems})`;
}



document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu handled by site-layout.js
});

(function ensureProductosNavActive() {
  function apply() {
    window.siteLayout?.setActiveNav?.('productos');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
  window.addEventListener('load', apply);
})();
