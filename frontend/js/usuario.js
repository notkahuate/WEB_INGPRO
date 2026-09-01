history.pushState(null, null, location.href);
window.onpopstate = function () {
  history.pushState(null, null, location.href);
};

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

if (!token) {
    window.location.replace("/pages/login.html");
}

document.addEventListener("DOMContentLoaded", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
        window.location.href = "/pages/login.html";
        return;
    }

    try {
        // SOLO USAMOS EL ENDPOINT QUE SI EXISTE
        const resp = await fetch("https://ingprosuppliers.com/api/auth/me", {
              headers: { Authorization: "Bearer " + token }
          });

          if (!resp.ok) {
              localStorage.removeItem("token");
              window.location.replace("/pages/login.html");
          }

        const user = await resp.json();
        console.log("DATOS DEL USUARIO:", user);

        // Llenar campos del form
       document.getElementById("nombreCompleto").value =`${user.nombre || ""} ${user.apellido || ""}`.trim();
        document.getElementById("correo").value = user.email || "";
        document.getElementById("telefono").value = user.telefono || "";
        document.getElementById("telefonoAlt").value = user.telefono_alternativo || "";
        document.getElementById("empresa").value = user.nombre_empresa || "";
        document.getElementById("direccion").value = user.direccion || "";
        document.getElementById("ciudad").value = user.ciudad || "";
        document.getElementById("estado").value = user.estado || "";
        document.getElementById("postal").value = user.codigo_postal || "";
        document.getElementById("pais").value = user.pais || "";
        document.getElementById("estado").value = user.estado || "";
        document.getElementById("pais").value = user.pais || "";
        document.getElementById("ciudad").value = user.ciudad || "";
        const userEmailEl = document.getElementById("userEmail");
        if (userEmailEl) userEmailEl.innerText = user.email || "";
        

         cargarCotizaciones(user.id, token);

    } catch (error) {
        console.error("ERROR CARGANDO DATOS:", error);
    }

});
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    // BORRAR TOKEN
    localStorage.removeItem("token");

    // BORRAR TODO EL HISTORIAL DE ESTA SESIÓN
    sessionStorage.clear();

    // Limpiar historial para que NO se pueda volver
    window.location.replace("/pages/login.html");
  });
}

// Navigation between sections
        const menuLinks = document.querySelectorAll('.menu-link');
        const contentSections = document.querySelectorAll('.content-section');

        menuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const sectionId = this.getAttribute('data-section');
                
                if (sectionId) {
                    e.preventDefault();
                    
                    // Remove active class from all links
                    menuLinks.forEach(l => l.classList.remove('active'));
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    // Hide all sections
                    contentSections.forEach(section => section.classList.remove('active'));
                    
                    // Show selected section
                    document.getElementById(sectionId).classList.add('active');
                }
            });
        });

        // Profile form submission
       const profileForm = document.getElementById('profileForm');
       if (profileForm) profileForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");

    // 🔥 Obtener user desde /me otra vez (o guárdalo global)
    const resp = await fetch("https://ingprosuppliers.com/api/auth/me", {
        headers: { Authorization: "Bearer " + token }
    });

    const user = await resp.json();

    // 🔥 Separar nombre y apellido
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const partes = nombreCompleto.split(" ");

    const nombre = partes[0] || "";
    const apellido = partes.slice(1).join(" ") || "";

    // 🔥 Armar objeto
    const data = {
    nombre,
    apellido,
    telefono: document.getElementById("telefono").value,
    pais: document.getElementById("pais").value,
    estado_provincia: document.getElementById("estado").value, // ✅ FIX
    direccion: document.getElementById("direccion").value,
    nombreEmpresa: document.getElementById("empresa").value,   // ✅ FIX
    codigo_postal: document.getElementById("postal").value,
    ciudad: document.getElementById("ciudad").value
};

    try {
        const updateRes = await fetch(`https://ingprosuppliers.com/api/users/update`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(data)
        });

        const result = await updateRes.json();

        if (!updateRes.ok) {
            return alert("❌ Error actualizando: " + result.mensaje);
        }

        alert("✅ Datos actualizados correctamente");

    } catch (error) {
        console.error(error);
        alert("❌ Error del servidor");
    }
});

       

        // Remove from wishlist
        function removeFromWishlist(button) {
            if (confirm('¿Deseas eliminar este producto de tu lista de interés?')) {
                button.closest('.product-card').remove();
            }
        }

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


const logoutBtnSecondary = document.getElementById("logoutBtn");
if (logoutBtnSecondary) {
  logoutBtnSecondary.addEventListener("click", () => {
    // BORRAR TOKEN
    localStorage.removeItem("token");
    sessionStorage.clear();

    // BORRAR HISTORIAL
    history.pushState(null, "", "/pages/login.html");
    history.replaceState(null, "", "/pages/login.html");

    // REDIRECCIÓN SIN OPCIÓN DE REGRESAR
    window.location.replace("/pages/login.html");
  });
}


async function cargarCotizaciones(userId, token) {
    const tabla = document.getElementById("quotesTableBody");

    const showTableMessage = (msg) => {
        if (!tabla) return;
        tabla.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding:20px;">
                    ${msg}
                </td>
            </tr>`;
    };

    if (!userId) {
        console.error("❌ cargarCotizaciones: userId vacío", userId);
        showTableMessage("No se pudo identificar el usuario.");
        return;
    }

    const urls = [
        `/api/cotizaciones/usuario/${encodeURIComponent(userId)}`,
        `https://ingprosuppliers.com/api/cotizaciones/usuario/${encodeURIComponent(userId)}`,
    ];

    try {
        let cotizaciones = null;
        let lastErr = null;

        for (const url of urls) {
            try {
                const resp = await fetch(url, {
                    headers: {
                        Authorization: "Bearer " + token,
                        Accept: "application/json",
                    },
                });

                if (!resp.ok) {
                    let detail = "";
                    try {
                        const errBody = await resp.json();
                        detail = errBody.detail || errBody.error || "";
                    } catch (_) {
                        detail = await resp.text().catch(() => "");
                    }
                    lastErr = new Error(`HTTP ${resp.status}${detail ? ": " + detail : ""}`);
                    console.warn(`❌ Cotizaciones falló en ${url}:`, lastErr.message);
                    continue;
                }

                const data = await resp.json();
                cotizaciones = Array.isArray(data) ? data : (data.cotizaciones || data.data || []);
                break;
            } catch (err) {
                lastErr = err;
                console.warn(`❌ Cotizaciones error de red en ${url}:`, err.message || err);
            }
        }

        if (!cotizaciones) {
            console.error("❌ Error obteniendo cotizaciones", lastErr);
            showTableMessage("No se pudieron cargar las cotizaciones. Intenta más tarde.");
            actualizarPendientes([]);
            actualizarEnviadas([]);
            return;
        }

        console.log("📦 COTIZACIONES:", cotizaciones);

        if (!tabla) {
            actualizarPendientes(cotizaciones);
            actualizarEnviadas(cotizaciones);
            cargarActividadReciente(cotizaciones);
            return;
        }

        tabla.innerHTML = "";

        if (cotizaciones.length === 0) {
            showTableMessage("No tienes cotizaciones aún.");
            actualizarPendientes([]);
            actualizarEnviadas([]);
            cargarActividadReciente([]);
            return;
        }

        cotizaciones.forEach((c) => {
            let productos = [];

            try {
                productos =
                    typeof c.productos === "string"
                        ? JSON.parse(c.productos)
                        : c.productos;
            } catch (e) {
                productos = [];
            }

            if (!Array.isArray(productos)) productos = [];

            const productosTexto = productos
                .map(
                    (p) =>
                        `${p.nombre || p.name || "Producto"} (x${p.cantidad || p.quantity || 1})`
                )
                .join(", ");

            tabla.innerHTML += `
        <tr>
            <td><strong>${c.id}</strong></td>
            <td>${c.fecha ? new Date(c.fecha).toLocaleDateString() : "—"}</td>
            <td>${productosTexto || "—"}</td>
            <td>${c.total_productos ?? productos.length ?? "—"}</td>
            <td><span class="status-badge">${c.estado || "—"}</span></td>
            <td>${c.codigo_oportunidad || "—"}</td>
            <td>
                <a href="#" class="action-btn download">Revisa tu correo</a>
            </td>
        </tr>`;
        });

        actualizarPendientes(cotizaciones);
        actualizarEnviadas(cotizaciones);
        cargarActividadReciente(cotizaciones);
    } catch (err) {
        console.error("❌ ERROR AL CARGAR COTIZACIONES:", err);
        showTableMessage("Error al cargar cotizaciones.");
    }
}

function actualizarPendientes(cotizaciones) {
    const pendientes = cotizaciones.filter(c => 
        c.estado?.toLowerCase() === "pendiente" ||
        c.estado?.toLowerCase() === "en revisión" ||
        c.estado?.toLowerCase() === "esperando"
    ).length;

    // 👉 Actualizar el número en el dashboard
    const el = document.getElementById("dash-pendientes");
    if (el) el.innerText = pendientes;
}


function actualizarEnviadas(cotizaciones) {
    const enviadas = cotizaciones.filter(c => 
        c.estado?.toLowerCase() === "enviada" ||
        c.estado?.toLowerCase() === "enviado" ||
        c.estado?.toLowerCase() === "enviadas" ||
        c.estado?.toLowerCase() === "send"
    ).length;

    const el = document.getElementById("dash-enviadas");
    if (el) el.innerText = enviadas;
}


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

const brandsListEl = document.getElementById("brands-list");
if (brandsListEl) {
  brandsListEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("brand-link")) {
      const brand = e.target.dataset.brand;
      window.location.href = `/pages/brands.html?brand=${encodeURIComponent(brand)}`;
    }
  });
}
function cargarActividadReciente(cotizaciones) {
    const tabla = document.getElementById("activityTableBody");
    if (!tabla) return;
    tabla.innerHTML = "";

    if (!cotizaciones || cotizaciones.length === 0) {
        tabla.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center; padding:20px;">
                    No hay actividad reciente.
                </td>
            </tr>`;
        return;
    }

    // Ordenar por fecha DESC (más reciente primero)
    const ordenadas = cotizaciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

    // Tomar solo las últimas 5
    const recientes = ordenadas.slice(0, 5);

    recientes.forEach(c => {
        let estadoClase = "processing";

        const estado = c.estado?.toLowerCase() || "";

        if (estado.includes("enviado") || estado.includes("enviada")) {
            estadoClase = "shipped"; // VERDE
        } 
        else if (
            estado.includes("pendiente") ||
            estado.includes("esperando") ||
            estado.includes("revision")
        ) {
            estadoClase = "pending"; // AMARILLO
        } 
        else if (estado.includes("aprob")) {
            estadoClase = "approved"; // opcional (verde también)
        }

        tabla.innerHTML += `
            <tr>
                <td>${new Date(c.fecha).toLocaleDateString()}</td>
                <td>Cotización</td>
                <td>#${c.id} - ${c.total_productos} productos</td>
                <td><span class="status-badge ${estadoClase}">${c.estado}</span></td>
            </tr>
        `;
    });
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
  if (!container) return;

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

