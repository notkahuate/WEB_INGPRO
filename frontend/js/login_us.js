 function switchTab(tab) {
            // Update tab buttons
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(t => t.classList.remove('active'));
            event.target.classList.add('active');

            // Update form sections
            const forms = document.querySelectorAll('.form-section');
            forms.forEach(f => f.classList.remove('active'));

            if (tab === 'signin') {
                document.getElementById('signin-form').classList.add('active');
            } else {
                document.getElementById('register-form').classList.add('active');
            }
        }

        function handleSignIn(event) {
            event.preventDefault();
            const email = document.getElementById('signin-email').value;
            const password = document.getElementById('signin-password').value;

            console.log('[v0] Sign in attempt:', { email });
            
           
        }

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.querySelector("#register-form form");
    const fields = [
        "register-name",
        "register-apellido",
        "register-email",
        "register-password",
        "register-confirm",
        "company-name",
        "pais_company",
        "company-address",
        "Estado_Provincia",
        "ciudad",
        "postal-code",
        "phone"
    ];

    const submitBtn = registerForm.querySelector(".submit-btn");
    submitBtn.style.display = "none"; // ocultar botón al inicio

    // Ocultar todos excepto el primero
    fields.forEach((id, index) => {
        const field = document.getElementById(id).closest(".form-group, .form-row");
        if (index !== 0) field.style.display = "none";
    });

    // Mostrar siguiente campo
    function showNext(currentId) {
        const currentIndex = fields.indexOf(currentId);
        const nextFieldId = fields[currentIndex + 1];

        if (!nextFieldId) {
            // Si ya no hay más campos, mostramos el botón
            submitBtn.style.display = "block";
            submitBtn.style.animation = "fadeIn 0.5s ease";
            return;
        }

        const nextField = document.getElementById(nextFieldId).closest(".form-group, .form-row");
        nextField.style.display = "block";
        nextField.style.animation = "fadeIn 0.5s ease";
    }

    // Validaciones de cada campo
    function validateAndProceed(id, value) {
        switch (id) {
            case "register-email":
                if (!value.includes("@")) return alert("Ingrese un correo válido.");
                break;
            case "register-password":
                if (value.length < 8) return alert("La contraseña debe tener al menos 8 caracteres.");
                break;
            case "register-confirm":
                const pass = document.getElementById("register-password").value;
                if (value !== pass) return alert("Las contraseñas no coinciden.");
                break;
            case "postal-code":
                if (!/^[0-9]{4,10}$/.test(value)) return alert("Ingrese un código postal válido.");
                break;
        }
        showNext(id);
    }

    // Escuchar tecla Enter en cada campo
    fields.forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener("keydown", e => {
            if (e.key === "Enter") {
                e.preventDefault(); // evita envío del formulario
                validateAndProceed(id, input.value.trim());
            }
        });

        // También permitir avanzar al salir del campo (por si no presiona Enter)
        input.addEventListener("change", () => {
            validateAndProceed(id, input.value.trim());
        });
    });

    // Manejo final del formulario
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();
        alert("✅ Registro completado correctamente.");
    });

    const paisSelect = document.getElementById("pais_company");
const phoneInput = document.getElementById("phone");

// Prefijo fijo en teléfono (no editable)
phoneInput.addEventListener("keydown", function (e) {
    const prefijo = paisSelect.selectedOptions[0]?.dataset.prefijo || "";

    if (!prefijo) return;

    // Evita borrar el prefijo con backspace o delete
    if ((e.key === "Backspace" || e.key === "Delete") && phoneInput.selectionStart <= prefijo.length) {
        e.preventDefault();
        return;
    }

    // Evita mover el cursor dentro del prefijo
    if (phoneInput.selectionStart < prefijo.length) {
        phoneInput.setSelectionRange(prefijo.length, prefijo.length);
    }
});

// Evita que se borre editando con el mouse
phoneInput.addEventListener("input", () => {
    const prefijo = paisSelect.selectedOptions[0]?.dataset.prefijo || "";

    if (!prefijo) return;

    // Si el usuario intentó borrar el prefijo, lo restauramos
    if (!phoneInput.value.startsWith(prefijo)) {
        phoneInput.value = prefijo;
    }
});


paisSelect.addEventListener("change", () => {
    const prefijo = paisSelect.selectedOptions[0].dataset.prefijo;

    if (!prefijo) return;

    // Colocar el prefijo
    phoneInput.value = prefijo;

    // Mover el cursor al final del prefijo
    phoneInput.setSelectionRange(prefijo.length, prefijo.length);

    showNext("pais_company");
});


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

async function handleSignIn(event) {
    event.preventDefault();

    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    const cart = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // ============================================
    // 1️⃣ LOGIN
    // ============================================
    const loginRes = await fetch("https://ingprosuppliers.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const loginData = await loginRes.json();

    if (!loginRes.ok) {
        return alert("❌ Error al iniciar sesión:\n" + loginData.message);
    }

    const user = loginData.usuario;
    const token = loginData.token;

    localStorage.setItem("token", token);

    // ============================================
    // 2️⃣ SI HAY PRODUCTOS → ENVIAR COTIZACIÓN CRM + BD
    // ============================================
    if (cart.length > 0) {

        // 2.1 Crear oportunidad + cotización en Zoho / Salesforce
        const quoteRes = await fetch("https://ingprosuppliers.com/api/cotizacion/cotizacion", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                userId: user.id,
                cartItems: cart
            })
        });

        const quoteData = await quoteRes.json();

        if (!quoteRes.ok) {
            return alert("❌ Error registrando cotización en CRM");
        }

        // ----------------------------
        // 🔥 AQUÍ ESTÁ LA CLAVE:
        // Guardar el código C-XXXX
        // ----------------------------
        const codigo_oportunidad = quoteData.codigo;


        // ============================================
        // 3️⃣ CREAR COTIZACIÓN EN TU BASE DE DATOS
        // ============================================
        const productosBD = cart.map(item => ({
            nombre: item.name,
            cantidad: item.quantity
        }));

        const cotizacionBD = {
            user_id: user.id,
            total_productos: cart.length,
            productos: productosBD,
            estado: "pendiente",
            codigo_oportunidad     // 🔥 AÑADIMOS ESTO
        };

        const bdRes = await fetch("https://ingprosuppliers.com/api/cotizaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(cotizacionBD)
        });

        const bdData = await bdRes.json();

        if (!bdRes.ok) {
            console.error("❌ Error guardando cotización en la BD:", bdData);
        } else {
            console.log("✔ Cotización guardada en BD:", bdData);
        }

        // limpiar carrito
        sessionStorage.removeItem("cartItems");
    }

    localStorage.setItem("user", JSON.stringify(user));

    // ============================================
    // 4️⃣ REDIRIGIR AL PANEL
    // ============================================
    window.location.href = "/pages_us/usuario_us.html";
}


async function handleRegister(event) {
    event.preventDefault();

    const nombre = document.getElementById("register-name").value;
    const apellido = document.getElementById("register-apellido").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const company = document.getElementById("company-name").value;
    const address = document.getElementById("company-address").value;
    const postal = document.getElementById("postal-code").value;
    const estado_provincia = document.getElementById("Estado_Provincia").value;
    const ciudad = document.getElementById("ciudad").value;
    const pais = document.getElementById("pais_company").value;
    const telefono = document.getElementById("phone").value;

    const cart = JSON.parse(sessionStorage.getItem("cartItems")) || [];

    // ===============================
    // 1️⃣ REGISTRO
    // ===============================
    const regRes = await fetch("https://ingprosuppliers.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nombre,
            apellido,
            email,
            password,
            telefono,
            pais,
            estado_provincia,
            direccion: address,
            nombreEmpresa: company,
            codigo_postal: postal,
            ciudad
        })
    });

    const regData = await regRes.json();

    if (!regRes.ok) {
        return alert("❌ Error al registrar usuario:\n" + regData.message);
    }

    const user = regData.usuario;
    const token = regData.token;

    localStorage.setItem("token", token);

    // ===============================
    // 2️⃣ SI HAY CARRITO → CRM + BD
    // ===============================
    if (cart.length > 0) {

        // 2.1 CRM
        const quoteRes = await fetch("https://ingprosuppliers.com/api/cotizacion/cotizacion", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                userId: user.id,
                cartItems: cart
            })
        });

        const quoteData = await quoteRes.json();

        if (!quoteRes.ok) {
            return alert("❌ Error registrando cotización en CRM");
        }

        const codigo_oportunidad = quoteData.codigo;

        // 2.2 BD
        const productosBD = cart.map(item => ({
            nombre: item.name,
            cantidad: item.quantity
        }));

        const cotizacionBD = {
            user_id: user.id,
            total_productos: cart.length,
            productos: productosBD,
            estado: "pendiente",
            codigo_oportunidad
        };

        const bdRes = await fetch("https://ingprosuppliers.com/api/cotizaciones", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(cotizacionBD)
        });

        if (!bdRes.ok) {
            const err = await bdRes.json();
            console.error("❌ Error guardando en BD:", err);
        }

        sessionStorage.removeItem("cartItems");
    }

    // ===============================
    // 3️⃣ REDIRECCIÓN
    // ===============================
    window.location.href = "/pages_us/usuario_us.html";
}

function setValueSafe(id, value) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn(`Campo no encontrado: ${id}`);
        return;
    }
    el.value = value || "";
}

function mostrarModalSeleccionEmpresa(empresas) {
    const empresa = empresas[0];
    const data = empresa.raw;

    const modal = document.getElementById("empresa-modal");
    const nombreEmpresa = document.getElementById("empresa-nombre");
    const btnSi = document.getElementById("empresa-si");
    const btnNo = document.getElementById("empresa-no");

    nombreEmpresa.textContent = data.Account_Name || empresa.name || "";

    modal.style.display = "flex";

    btnNo.onclick = () => {
        modal.style.display = "none";
    };

    btnSi.onclick = () => {
        modal.style.display = "none";

        // AUTOCOMPLETAR CAMPOS
        document.getElementById("company-name").value =
            data.Account_Name || "";

        document.getElementById("company-address").value =
            data.Billing_Street || "";

        document.getElementById("ciudad").value =
            data.Billing_City || "";

        document.getElementById("Estado_Provincia").value =
            data.Billing_State || "";

        document.getElementById("postal-code").value =
            data.C_digo_Postal_Facturaci_n || "";
            

        if (data.Billing_Country) {
            const paisSelect = document.getElementById("pais_company");
            [...paisSelect.options].forEach(option => {
                if (
                    option.value.toLowerCase() ===
                    data.Billing_Country.toLowerCase()
                ) {
                    option.selected = true;
                }
            });
        }
    };
}


document.getElementById("register-email")?.addEventListener("blur", async () => {

    // ⛔ si el formulario no está activo, no hacemos nada
    if (!document.getElementById("register-form")?.classList.contains("active")) {
        return;
    }

    const email = document.getElementById("register-email").value.trim();
    if (!email.includes("@")) return;

    try {
        const res = await fetch("https://ingprosuppliers.com/api/buscar_empresa_por_correo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (!res.ok || !data.empresas?.length) return;

        mostrarModalSeleccionEmpresa(data.empresas);

    } catch (error) {
        console.error("Error buscando empresa:", error);
    }
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
      window.location.href = `/pages_us/productos_us.html?q=${encodeURIComponent(texto)}`;
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

function initGoogleAutocomplete() {
  const addressInput = document.getElementById("company-address");

  if (!addressInput) return;

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ["address"],
    fields: ["address_components", "formatted_address"]
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    let ciudad = "";
    let estado = "";
    let pais = "";
    let postal = "";

    place.address_components.forEach(component => {
      const types = component.types;

      if (types.includes("locality")) {
        ciudad = component.long_name;
      }

      if (types.includes("administrative_area_level_1")) {
        estado = component.long_name;
      }

      if (types.includes("country")) {
        pais = component.long_name;
      }

      if (types.includes("postal_code")) {
        postal = component.long_name;
      }
    });

    // Rellenar inputs
    document.getElementById("ciudad").value = ciudad;
    document.getElementById("Estado_Provincia").value = estado;
    document.getElementById("postal-code").value = postal;

    // Seleccionar país automáticamente
    const paisSelect = document.getElementById("pais_company");
    for (let option of paisSelect.options) {
      if (option.value === pais) {
        option.selected = true;
        break;
      }
    }
  });
}

window.addEventListener("load", initGoogleAutocomplete);

document.getElementById("brands-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("brand-link")) {
    const brand = e.target.dataset.brand;

    window.location.href = `/pages_us/brands_us.html?brand=${encodeURIComponent(brand)}`;
  }
});

function mostrarReset() {
    document.querySelectorAll('.form-section').forEach(f => f.classList.remove('active'));
    document.getElementById('reset-form').classList.add('active');
}

function volverLogin() {
    document.querySelectorAll('.form-section').forEach(f => f.classList.remove('active'));
    document.getElementById('signin-form').classList.add('active');
}



async function handleResetPassword(e) {
    e.preventDefault();

    const email = document.getElementById('reset-email').value;
    const password = document.getElementById('reset-password').value;
    const confirm = document.getElementById('reset-confirm').value;

    if (password !== confirm) {
        alert('❌ Las contraseñas no coinciden');
        return;
    }

    try {
        const res = await fetch('/api/users/reset-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                nuevaPassword: password
            })
        });

        const data = await res.json();

        if (!res.ok) {
            alert(data.mensaje || 'Error');
            return;
        }

        alert('✅ Contraseña actualizada');
        volverLogin();

    } catch (err) {
        console.error(err);
        alert('❌ Error de conexión');
    }
}

const brands = [
  "3M","AURAND","BAKER HUGHES","BENTLY","CAT","COMET","COPPUS",
  "CUMMINS","DEEP SEA","DETCON","DJI","EDILGRAPPA","ELCOMETER","EMERSON",
  "ENERPAC","ESAB","FAMECA","FLUKE","FW MURPHY","GENERAC","GENERICA",
  "GORE","HILTI","INGPRO","KLUBER","KUBOTA","KYORITSU","LAPMASTER",
  "LEISTER","LOCTITE","MARTEL","METREL","OFMER","PARKER","PERKINS",
  "QLIGHT","SHIBUYA","SIEMENS","SKF","STREAMLIGHT","TEHMA","TENTECH",
  "TRIMBLE","TUFF BUCKET","TWECO","UNIT T","VEGA","YOKOGAWA"
];

function agrupar(brands) {
  const grupos = {};

  brands.forEach(b => {
    let letra = b[0].toUpperCase();
    if (!/[A-Z]/.test(letra)) letra = "#";

    if (!grupos[letra]) grupos[letra] = [];
    grupos[letra].push(b);
  });

  return Object.keys(grupos)
    .sort((a,b)=>{
      if(a==="#") return 1;
      if(b==="#") return -1;
      return a.localeCompare(b);
    })
    .reduce((acc,k)=>{
      acc[k] = grupos[k].sort();
      return acc;
    },{});
}

function renderBrands() {
  const container = document.getElementById("brands-list");
  const data = agrupar(brands);

  container.innerHTML = "";

  Object.entries(data).forEach(([letra, lista]) => {
    const col = document.createElement("div");
    col.className = "dropdown-column";

    col.innerHTML = `
      <h3 class="letter-title">${letra}</h3>
      <ul>
        ${lista.map(b => `
          <li>
            <span class="brand-link" data-brand="${b}">
              ${b}
            </span>
          </li>
        `).join("")}
      </ul>
    `;

    container.appendChild(col);
  });
}

renderBrands(); 
