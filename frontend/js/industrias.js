/**
 * Industrias de aplicación — usadas en catálogo (View All) y KPI de producto.
 * El campo de producto es `cf_categoria`.
 */
(function (global) {
  function normalizeIndustryText(text) {
    return String(text || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/&/g, " y ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const INDUSTRIES = [
    {
      id: "petroleo-gas",
      es: "Petróleo & Gas",
      en: "Oil & Gas",
      icon: "fa-oil-well",
      aliases: ["petroleo & gas", "petroleo y gas", "oil & gas", "oil and gas", "oil gas"],
    },
    {
      id: "energia",
      es: "Energía",
      en: "Energy",
      icon: "fa-bolt",
      aliases: ["energia", "energy", "power generation", "generacion de energia"],
    },
    {
      id: "mineria-metales",
      es: "Minería & Metales",
      en: "Mining & Metals",
      icon: "fa-mountain",
      aliases: ["mineria & metales", "mineria y metales", "mining & metals", "mining and metals", "mining"],
    },
    {
      id: "quimica-petroquimica",
      es: "Química & Petroquímica",
      en: "Chemical & Petrochemical",
      icon: "fa-flask",
      aliases: [
        "quimica & petroquimica",
        "quimica y petroquimica",
        "chemical & petrochemical",
        "chemical and petrochemical",
        "chemical",
        "petrochemical",
      ],
    },
    {
      id: "manufactura-industrial",
      es: "Manufactura Industrial",
      en: "Industrial Manufacturing",
      icon: "fa-industry",
      aliases: ["manufactura industrial", "industrial manufacturing", "manufacturing", "manufactura"],
    },
    {
      id: "agua-saneamiento",
      es: "Agua & Saneamiento",
      en: "Water & Wastewater",
      icon: "fa-droplet",
      aliases: [
        "agua & saneamiento",
        "agua y saneamiento",
        "water & wastewater",
        "water and wastewater",
        "water",
        "wastewater",
      ],
    },
    {
      id: "alimentos-bebidas",
      es: "Alimentos & Bebidas",
      en: "Food & Beverage",
      icon: "fa-utensils",
      aliases: [
        "alimentos & bebidas",
        "alimentos y bebidas",
        "food & beverage",
        "food and beverage",
        "food beverage",
        "food",
      ],
    },
    {
      id: "farmaceutica-ciencias-vida",
      es: "Farmacéutica & Ciencias de la Vida",
      en: "Pharmaceutical & Life Sciences",
      icon: "fa-capsules",
      aliases: [
        "farmaceutica & ciencias de la vida",
        "farmaceutica y ciencias de la vida",
        "pharmaceutical & life sciences",
        "pharmaceutical and life sciences",
        "pharmaceutical",
        "life sciences",
      ],
    },
    {
      id: "pulpa-papel",
      es: "Pulpa & Papel",
      en: "Pulp & Paper",
      icon: "fa-scroll",
      aliases: ["pulpa & papel", "pulpa y papel", "pulp & paper", "pulp and paper"],
    },
    {
      id: "cemento-materiales",
      es: "Cemento & Materiales",
      en: "Cement & Materials",
      icon: "fa-cubes",
      aliases: [
        "cemento & materiales",
        "cemento y materiales",
        "cement & materials",
        "cement and materials",
        "cement",
      ],
    },
    {
      id: "maritima-naval",
      es: "Marítima & Naval",
      en: "Marine & Naval",
      icon: "fa-ship",
      aliases: ["maritima & naval", "maritima y naval", "marine & naval", "marine and naval", "marine", "naval"],
    },
    {
      id: "aeroespacial-aviacion",
      es: "Aeroespacial & Aviación",
      en: "Aerospace & Aviation",
      icon: "fa-plane",
      aliases: [
        "aeroespacial & aviacion",
        "aeroespacial y aviacion",
        "aerospace & aviation",
        "aerospace and aviation",
        "aerospace",
        "aviation",
      ],
    },
    {
      id: "automotriz",
      es: "Automotriz",
      en: "Automotive",
      icon: "fa-car",
      aliases: ["automotriz", "automotive", "auto"],
    },
    {
      id: "construccion-infraestructura",
      es: "Construcción & Infraestructura",
      en: "Construction & Infrastructure",
      icon: "fa-helmet-safety",
      aliases: [
        "construccion & infraestructura",
        "construccion y infraestructura",
        "construction & infrastructure",
        "construction and infrastructure",
        "construction",
        "infrastructure",
      ],
    },
    {
      id: "transporte-logistica",
      es: "Transporte & Logística",
      en: "Transportation & Logistics",
      icon: "fa-truck",
      aliases: [
        "transporte & logistica",
        "transporte y logistica",
        "transportation & logistics",
        "transportation and logistics",
        "logistics",
        "transporte",
      ],
    },
    {
      id: "agricultura-agroindustria",
      es: "Agricultura & Agroindustria",
      en: "Agriculture & Agribusiness",
      icon: "fa-wheat-awn",
      aliases: [
        "agricultura & agroindustria",
        "agricultura y agroindustria",
        "agriculture & agribusiness",
        "agriculture and agribusiness",
        "agriculture",
        "agribusiness",
        "agroindustria",
      ],
    },
  ];

  function resolveIndustry(rawValue) {
    const n = normalizeIndustryText(rawValue);
    if (!n) return null;

    // 1) Coincidencia exacta (más segura)
    for (const ind of INDUSTRIES) {
      const candidates = [ind.id.replace(/-/g, " "), ind.es, ind.en].concat(ind.aliases || []);
      for (const candidate of candidates) {
        const cn = normalizeIndustryText(candidate);
        if (cn && n === cn) return ind;
      }
    }

    // 2) Contención solo con etiquetas largas (>= 6 chars) para evitar falsos positivos
    //    (ej. "auto" dentro de "automatizacion")
    for (const ind of INDUSTRIES) {
      const candidates = [ind.es, ind.en].concat(ind.aliases || []);
      for (const candidate of candidates) {
        const cn = normalizeIndustryText(candidate);
        if (!cn || cn.length < 6) continue;
        if (n.includes(cn) || cn.includes(n)) return ind;
      }
    }

    return null;
  }

  function getIndustryLabel(industry, preferEnglish) {
    if (!industry) return "";
    return preferEnglish ? industry.en : industry.es;
  }

  function getIndustryIconClass(industry) {
    return industry && industry.icon ? industry.icon : "fa-industry";
  }

  global.INDUSTRIES = INDUSTRIES;
  global.resolveIndustry = resolveIndustry;
  global.getIndustryLabel = getIndustryLabel;
  global.getIndustryIconClass = getIndustryIconClass;
  global.normalizeIndustryText = normalizeIndustryText;
})(typeof window !== "undefined" ? window : globalThis);
