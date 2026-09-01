const axios = require("axios");

let accessToken = null;

/* ============================================================
   🔑 GESTIÓN DE TOKENS (AUTOCURATIVA)
   ============================================================ */

async function refrescarToken() {
  try {
    const res = await axios.post(
      "https://accounts.zoho.com/oauth/v2/token",
      null,
      {
        params: {
          refresh_token: process.env.REFRESH_TOKEN2,
          client_id: process.env.CLIENT_ID2,
          client_secret: process.env.CLIENT_SECRET2,
          grant_type: "refresh_token",
        },
      }
    );
    console.log("🔄 [ZOHO] Token refrescado con éxito");
    accessToken = res.data.access_token;
    return accessToken;
  } catch (error) {
    console.error(
      "❌ [ZOHO] Error crítico refrescando token:",
      error.response?.data || error.message
    );
    throw error;
  }
}

/**
 * Función maestra para peticiones.
 * Si el token falla (401), lo refresca y reintenta una vez más.
 */
async function zohoApi(method, endpoint, data = null, params = {}) {
  if (!accessToken) await refrescarToken();

  const ejecutar = async (token) => {
    return await axios({
      method,
      url: `${process.env.ZOHO_API_DOMAIN2}${endpoint}`,
      data,
      params,
      headers: { Authorization: `Zoho-oauthtoken ${token}` },
    });
  };

  try {
    return await ejecutar(accessToken);
  } catch (err) {
    if (err.response && err.response.status === 401) {
      console.warn("⚠️ [ZOHO] Token inválido detectado. Refrescando y reintentando...");
      const nuevoToken = await refrescarToken();
      return await ejecutar(nuevoToken);
    }
    throw err;
  }
}

/* ============================================================
   🏢 CREAR EMPRESA (ACCOUNTS)
   ============================================================ */
async function crearEmpresaZoho({
  nombre_empresa, direccion, ciudad, estado_provincia, codigo_postal, pais, telefono,
}) {
  const payload = {
    data: [{
      Account_Name: nombre_empresa,
      Billing_Street: direccion,
      Billing_City: ciudad,
      Billing_State: estado_provincia,
      C_digo_Postal_Facturaci_n: codigo_postal,
      Billing_Country: pais,
      Phone: telefono,
    }],
  };

  const res = await zohoApi("post", "/crm/v2/Accounts", payload);
  return res.data.data[0].details.id;
}

/* ============================================================
   👤 CREAR CONTACTO (CONTACTS)
   ============================================================ */
async function crearContactoZoho({
  nombre,apellido, email, telefono, empresaId, direccion, ciudad, estado_provincia, codigo_postal, pais,
}) {
  const payload = {
    data: [{
      First_Name: nombre || "Cliente",     // 🔥 nombre
    Last_Name: apellido || "General", 
      Email: email,
      Mobile: telefono,
      Account_Name: { id: empresaId },
      Mailing_Street: direccion || "",
      Mailing_City: ciudad || "",
      Mailing_State: estado_provincia || "",
      Mailing_Zip: codigo_postal || "",
      Mailing_Country: pais || "",
    }],
  };

  const res = await zohoApi("post", "/crm/v2/Contacts", payload);
  return res.data.data[0].details.id;
}

/* ============================================================
   💼 CREAR OPORTUNIDAD (DEALS)
   ============================================================ */
async function crearOportunidadZoho({ empresaId, contactoId, total, descripcion }) {
  const code = "C-" + String(Date.now()).slice(-4).padStart(4, "0");

  const payload = {
    data: [{
      Deal_Name: code,
      Stage: "Qualification",
      Description: descripcion,
      Account_Name: { id: empresaId },
      Contact_Name: { id: contactoId },
    }],
  };

  const res = await zohoApi("post", "/crm/v2/Deals", payload);
  return { id: res.data.data[0].details.id, codigo: code };
}

/* ============================================================
   🔍 BUSCAR EMPRESA
   ============================================================ */
async function buscarEmpresaZoho({ dominio }) {
  const normalizar = (texto) => {
    if (!texto) return "";
    return texto
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/\$/g, "").replace(/\./g, "").replace(/,/g, "")
      .replace(/-/g, "").replace(/_/g, "").replace(/\s+/g, "")
      .replace(/\bsas\b/g, "").replace(/\bs\.a\b/g, "").replace(/\bsa\b/g, "")
      .replace(/\be\.s\.p\b/g, "").replace(/\besp\b/g, "")
      .replace(/\bs\.r\.l\b/g, "").replace(/\bc\.v\b/g, "").replace(/\bcop\b/g, "")
      .replace(/\.s\./g, "").replace(/\.s/g, "")
      .trim();
  };

  const dominioNorm = normalizar(dominio);
  console.log("🔍 Buscando empresa:", dominioNorm);

  const mapRecord = (r) => ({
    id: r.id || null,
    name: r.Account_Name || null,
    website: r.Website || null,
    phone: r.Phone || null,
    address: [r.Billing_Street, r.Billing_City, r.Billing_Country, r.C_digo_Postal_Facturaci_n]
      .filter(Boolean).join(", "),
    raw: r,
  });

  // 🔥 1. BÚSQUEDA RÁPIDA
  try {
    const res = await zohoApi("get", "/crm/v2/Accounts/search", null, {
      criteria: `(Account_Name:starts_with:${dominio})`,
    });

    if (res.data && res.data.data && res.data.data.length > 0) {
      const filtrado = res.data.data.filter((r) => {
        const name = normalizar(r.Account_Name);
        return name.includes(dominioNorm);
      });

      if (filtrado.length > 0) {
        console.log("✅ Encontrado por search directo");
        return filtrado.map(mapRecord);
      }
    }
  } catch (err) {
    console.warn("⚠️ Search directo falló, usando fallback paginado...");
  }

  // 🔥 2. FALLBACK CON PAGINACIÓN
  try {
    let allData = [];
    let page = 1;
    let more = true;

    while (more && page <= 5) {
      const res = await zohoApi("get", "/crm/v2/Accounts", null, { per_page: 200, page });
      const data = res.data.data || [];
      allData = allData.concat(data);
      more = data.length === 200;
      page++;
    }

    const filtrado = allData.filter((r) => {
      const name = normalizar(r.Account_Name);
      const web = normalizar(r.Website);
      return (
        name.includes(dominioNorm) ||
        dominioNorm.includes(name) ||
        name.startsWith(dominioNorm) ||
        dominioNorm.startsWith(name) ||
        web.includes(dominioNorm)
      );
    });

    console.log("✅ Empresas encontradas (fallback):", filtrado.length);
    return filtrado.map(mapRecord);
  } catch (err) {
    console.error("❌ Error en fallback:", err.response?.data || err.message);
    return [];
  }
}

/* ============================================================
   📦 OBTENER OPORTUNIDADES POR CÓDIGOS
   ============================================================ */
async function obtenerOportunidadesPorCodigos(codigos) {
  const codigosLimpios = [...new Set(codigos.filter((c) => c && c.trim() !== ""))];
  if (codigosLimpios.length === 0) return [];

  const MAX = 10;
  const chunks = [];
  for (let i = 0; i < codigosLimpios.length; i += MAX) {
    chunks.push(codigosLimpios.slice(i, i + MAX));
  }

  let resultados = [];

  for (const grupo of chunks) {
    const criteria = grupo.map((c) => `(Deal_Name:equals:${c.trim()})`).join("OR");
    const finalCriteria = grupo.length > 1 ? `(${criteria})` : criteria;

    console.log("🔍 Buscando deals por criterio:", finalCriteria);

    try {
      const res = await zohoApi("get", "/crm/v2/Deals/search", null, {
        criteria: finalCriteria,
      });

      if (res.data && res.data.data) {
        resultados = resultados.concat(res.data.data);
      }
    } catch (err) {
      console.error("❌ Error buscando deals:", err.response?.data || err.message);
    }
  }

  return resultados;
}

/* ============================================================
   📦 AGREGAR PRODUCTOS A LA OPORTUNIDAD
   ============================================================ */
async function agregarLineItemsZoho({ dealId, productos }) {
  const lineItems = productos.map((p) => ({
    product: null,
    quantity: p.quantity || p.cantidad || 1,
    list_price: 0,
    Description: p.name,
  }));

  const payload = {
    data: [{ id: dealId, Product_Details: lineItems }],
  };

  await zohoApi("put", "/crm/v2/Deals", payload);
}

module.exports = {
  crearEmpresaZoho,
  crearContactoZoho,
  crearOportunidadZoho,
  agregarLineItemsZoho,
  buscarEmpresaZoho,
  obtenerOportunidadesPorCodigos,
};