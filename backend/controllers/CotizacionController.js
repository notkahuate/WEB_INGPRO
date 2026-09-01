const {
  crearEmpresaZoho,
  crearContactoZoho,
  crearOportunidadZoho,
  agregarLineItemsZoho,
  buscarEmpresaZoho,
  obtenerOportunidadesPorCodigos
} = require("../configures/zohoApi2.JS");

const Cotizacion = require("../models/CotizacionModel");
const { obtenerUsuario } = require("../models/CotizacionModel");

const buscarEmpresaPorCorreo = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ mensaje: "Correo inválido" });
    }

    // 🔹 Obtener dominio (ecopetrol.com)
    const dominioParte = email.split("@")[1].toLowerCase().trim();

    // 🔹 Quitar extensión (.com, .co, etc)
    const baseDominio = dominioParte.replace(/\.[^/.]+$/, "");

    // 🔹 Normalizar (clave para ECOPETROL S.A.)
    const nombreEmpresa = baseDominio
      .replace(/[^a-z0-9]/gi, "") // quitar símbolos
      .toLowerCase();

    console.log("🔍 Buscando empresa:", nombreEmpresa);

    const empresas = await buscarEmpresaZoho({ dominio: nombreEmpresa });

    res.json({ empresas });

  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ mensaje: "Error", error: error.message });
  }
};

// 🔁 mapear estados
function mapearEstadoZoho(stage) {
  switch (stage) {
    case "Qualification":
      return "pendiente";

    case "Propuesta de valor":
      return "enviada";

    default:
      return null;
  }
}

// 🚀 sincronización global
async function sincronizarEstados() {
  try {
    console.log("⏳ Iniciando sincronización de estados con Zoho CRM...");

    // 1. Obtener cotizaciones locales
    const cotizaciones = await Cotizacion.obtenerTodasCotizaciones();

    if (!cotizaciones || cotizaciones.length === 0) {
      console.log("ℹ No hay cotizaciones locales para sincronizar.");
      return;
    }

    // 2. Extraer códigos de oportunidad únicos
    const codigos = cotizaciones.map(c => c.codigo_oportunidad);

    // 3. Consultar a Zoho
    const dealsZoho = await obtenerOportunidadesPorCodigos(codigos);

    if (dealsZoho.length === 0) {
      console.log("⚠ No se encontraron coincidencias en Zoho para los códigos enviados.");
      return;
    }

    // 4. Crear un mapa para búsqueda rápida (O(1))
    const mapaZoho = {};
    dealsZoho.forEach(d => {
      mapaZoho[d.Deal_Name] = d.Stage;
    });

    let actualizados = 0;

    // 5. Comparar y actualizar
    for (const cot of cotizaciones) {
      const stageZoho = mapaZoho[cot.codigo_oportunidad];

      // Si el código no existe en Zoho, lo saltamos
      if (!stageZoho) continue;

      const nuevoEstado = mapearEstadoZoho(stageZoho);

      // Solo actualizamos si el estado mapeado es válido y diferente al actual
      if (nuevoEstado && nuevoEstado !== cot.estado) {
        await Cotizacion.actualizarEstadoPorCodigo(
          cot.codigo_oportunidad,
          nuevoEstado
        );
        console.log(`✅ [${cot.codigo_oportunidad}]: ${cot.estado} -> ${nuevoEstado}`);
        actualizados++;
      }
    }

    console.log(`\n Sincronización completa. Registros actualizados: ${actualizados}`);

  } catch (error) {
    console.error("❌ Error crítico en la sincronización:", error);
  }
}


const enviarCotizacion = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;

    if (!userId || !cartItems || cartItems.length === 0) {
      return res.status(400).json({ mensaje: "Datos incompletos" });
    }

    const usuario = await obtenerUsuario(userId);
    if (!usuario) return res.status(404).json({ mensaje: "Usuario no encontrado" });

   const empresaId = await crearEmpresaZoho({
  nombre_empresa: usuario.nombre_empresa,
  direccion: usuario.direccion,
  ciudad: usuario.ciudad,
  estado_provincia: usuario.estado_provincia,
  codigo_postal: usuario.codigo_postal,
  pais: usuario.pais,
  telefono: usuario.telefono
});


  const contactId = await crearContactoZoho({
  nombre: usuario.nombre,
  apellido: usuario.apellido,
  email: usuario.email,
  telefono: usuario.telefono,
  empresaId,

  // 📍 MISMA DIRECCIÓN DE LA EMPRESA
  direccion: usuario.direccion,
  ciudad: usuario.ciudad,
  estado_provincia: usuario.estado_provincia,
  codigo_postal: usuario.codigo_postal,
  pais: usuario.pais
});

    const total = cartItems.reduce(
      (sum, p) => sum + (p.precio * (p.quantity || 1)),
      0
    );

    // Construir descripción de la oportunidad (lista de productos)
      const descripcionOportunidad = cartItems
        .map(p => {
          const name = p.name || "Producto";
          const part = p.partNumber || "SIN-REF";
          const cant = p.quantity || 1;
          const categoria = p.categoria || "SIN-CATEGORÍA";
          return `${name} (x${cant}) - REF: ${part} - CAT: ${categoria}`;
        })
        .join("\n");


    const { id: dealId, codigo } = await crearOportunidadZoho({
        empresaId,
        contactoId: contactId,
        total,
        descripcion: descripcionOportunidad
      });


    await agregarLineItemsZoho({
      dealId,
      productos: cartItems,
    });

    res.json({
      mensaje: "Cotización enviada correctamente a Zoho CRM",
      codigo,
      zoho: { empresaId, contactId, dealId }
    });

  } catch (error) {
    res.status(500).json({
      mensaje: "Error enviando cotización",
      error: error.response?.data || error.message
    });
  }
};

module.exports = { enviarCotizacion, buscarEmpresaPorCorreo, sincronizarEstados };
