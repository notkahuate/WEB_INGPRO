// ========================================
// INGPROSUPPLIERS - JavaScript Principal
// ========================================

// Category data with subcategories (structure from subcategorias.js)
// categorias + marcasPaises: ver Categorias*.js y marcasPaises.js


// Datos de paises con banderas
const countries = [
  { id: 'us', name: 'United States', flag: '🇺🇸', code: 'US' },
  { id: 'de', name: 'Germany', flag: '🇩🇪', code: 'DE' },
  { id: 'ch', name: 'Switzerland', flag: '🇨🇭', code: 'CH' },
  { id: 'jp', name: 'Japan', flag: '🇯🇵', code: 'JP' },
  { id: 'se', name: 'Sweden', flag: '🇸🇪', code: 'SE' },
  { id: 'fr', name: 'France', flag: '🇫🇷', code: 'FR' },
  { id: 'it', name: 'Italy', flag: '🇮🇹', code: 'IT' },
  { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', code: 'UK' },
  { id: 'cn', name: 'China', flag: '🇨🇳', code: 'CN' },
  { id: 'kr', name: 'South Korea', flag: '🇰🇷', code: 'KR' },
  { id: 'dk', name: 'Denmark', flag: '🇩🇰', code: 'DK' },
  { id: 'nl', name: 'Netherlands', flag: '🇳🇱', code: 'NL' }
];

// Datos de marcas
const brands = [
  { id: 'Wika', name: 'Wika', country: 'us', logo: "https://ingprosuppliers.com/imagenes/logos/Wika.png", color: '#FFD700' },
 { id: 'siemens', name: 'Siemens', country: 'de', logo: null, color: '#009999' },
 { id: 'abb', name: 'ABB', country: 'ch', logo: "https://ingprosuppliers.com/imagenes/logos/ABB.png", color: '#FF000F' },
 { id: 'Hastings', name: 'Hastings', country: 'us', logo: "https://ingprosuppliers.com/imagenes/logos/Hastings.png", color: '#00629B' },
 { id: 'honeywell', name: 'Honeywell', country: 'us', logo: null, color: '#E31937' },
 { id: 'aervoe', name: 'Aervoe', country: 'us', logo: null, color: '#0070C0' },
 { id: 'yokogawa', name: 'Yokogawa', country: 'jp', logo: null, color: '#00A0E9' },
 { id: 'endress', name: 'Endress+Hauser', country: 'ch', logo: null, color: '#003366' },
 { id: 'schneider', name: 'Schneider Electric', country: 'fr', logo: null, color: '#3DCD58' },
 { id: 'rockwell', name: 'Rockwell Automation', country: 'us', logo: null, color: '#C8102E' },
 { id: 'omron', name: 'Omron', country: 'jp', logo: null, color: '#0047BA' },
 { id: 'phoenix', name: 'Phoenix Contact', country: 'de', logo: null, color: '#00843D' },
 { id: 'danfoss', name: 'Danfoss', country: 'dk', logo: null, color: '#E2001A' },
 { id: 'festo', name: 'Festo', country: 'de', logo: null, color: '#0091D3' },
 { id: 'smc', name: 'SMC', country: 'jp', logo: null, color: '#003C71' },
 { id: 'wago', name: 'WAGO', country: 'de', logo: null, color: '#F18700' },
 { id: 'keyence', name: 'Keyence', country: 'jp', logo: null, color: '#DA291C' },
 { id: 'sick', name: 'SICK', country: 'de', logo: null, color: '#003087' },
 { id: 'ifm', name: 'ifm electronic', country: 'de', logo: null, color: '#E35205' },
 { id: 'turck', name: 'Turck', country: 'de', logo: null, color: '#FFD100' },
 { id: 'pepperl', name: 'Pepperl+Fuchs', country: 'de', logo: null, color: '#009CDE' },
 { id: 'cre', name: 'Cre', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/cre.png", color: '#009CDE' },
 { id: 'coremo', name: 'Coremo', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/coremo.png", color: '#009CDE' },
 { id: 'aervoe', name: 'Aervoe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/aervoe.png", color: '#009CDE' },
 { id: 'allen bradley', name: 'Allen bradley', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/allen_bradley.png", color: '#009CDE' },
 { id: 'amprobe', name: 'Amprobe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/amprobe.png", color: '#009CDE' },
  { id: 'appleton', name: 'Appleton', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/appleton.png", color: '#009CDE' },
  { id: 'baker hughes', name: 'Baker hughes', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/baker_hughes.png", color: '#009CDE' },
  { id: 'bartec', name: 'Bartec', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/bartec.png", color: '#009CDE' },
  { id: 'burndy', name: 'Burndy', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/burndy.png", color: '#009CDE' },
  { id: 'cat', name: 'Cat', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/cat.png", color: '#009CDE' },
  { id: 'comet', name: 'Comet', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/comet.png", color: '#009CDE' },
  { id: 'coppus', name: 'Coppus', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/coppus.png", color: '#009CDE' },
  { id: 'deep sea', name: 'Deep sea', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/deepsea.png", color: '#009CDE' },
  { id: 'defelsko', name: 'Defelsko', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/defelsko.png", color: '#009CDE' },
  { id: 'detcon', name: 'Detcon', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/detcon.png", color: '#009CDE' },
  { id: 'dwt', name: 'Dwt', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/dwt.png", color: '#009CDE' },
  { id: 'elcometer', name: 'Elcometer', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/elcometer.png", color: '#009CDE' },
  { id: 'emerson', name: 'Emerson', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/emerson.png", color: '#009CDE' },
  { id: 'enerpac', name: 'Enerpac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/enerpac.png", color: '#009CDE' },
  { id: 'esab', name: 'Esab', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/esab.png", color: '#009CDE' },
  { id: 'extech', name: 'Extech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/extech.png", color: '#009CDE' },
  { id: 'fameca', name: 'Fameca', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fameca.png", color: '#009CDE' },
  { id: 'fisher', name: 'Fisher', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fisher.png", color: '#009CDE' },
  { id: 'flir', name: 'Flir', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/flir.png", color: '#009CDE' },
  { id: 'fluke', name: 'Fluke', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fluke.png", color: '#009CDE' },
  { id: 'fw murphy', name: 'Fw murphy', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/fwmurphy.png", color: '#009CDE' },
  { id: 'gates', name: 'Gates', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/gates.png", color: '#009CDE' },
  { id: 'generac', name: 'Generac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/generpac.png", color: '#009CDE' },
  { id: 'genius', name: 'Genius', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/genius.png", color: '#009CDE' },
  { id: 'getac', name: 'Getac', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/getac.png", color: '#009CDE' },
  { id: 'greenlee', name: 'Greenlee', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/greenlee.png", color: '#009CDE' },
  { id: 'griffco', name: 'Griffco', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/griffco.png", color: '#009CDE' },
  { id: 'gore', name: 'Gore', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/gore.png", color: '#009CDE' },
  { id: 'hioki', name: 'Hioki', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hioki.png", color: '#009CDE' },
  { id: 'hilti', name: 'Hilti', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hilti.png", color: '#009CDE' },
  { id: 'hytera', name: 'Hytera', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hytera.png", color: '#009CDE' },
  { id: 'hydrajaws', name: 'Hydrajaws', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/hydrajaws.png", color: '#009CDE' },
  { id: 'ingpro', name: 'Ingpro', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logo_blanco2.png", color: '#009CDE' },
  { id: 'kaishan', name: 'Kaishan', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kaishan.png", color: '#009CDE' },
  { id: 'jurop', name: 'jurop', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/jurop.png", color: '#009CDE' },
  { id: 'kamat', name: 'Kamat', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kamat.png", color: '#009CDE' },
  { id: 'kewtech', name: 'Kewtech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kewtech.png", color: '#009CDE' },
  { id: 'kluber', name: 'Kluber', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kluber.png", color: '#009CDE' },
  { id: 'kyoritsu', name: 'Kyoritsu', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/kyoritsu.png", color: '#009CDE' },
  { id: 'Lapmaster', name: 'Lapmaster', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Lapmaster.png", color: '#009CDE' },
  { id: 'Lapmaster', name: 'Lapmaster', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Lapmaster.png", color: '#009CDE' },
  { id: 'leister', name: 'Leister', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/leister.png", color: '#009CDE' },
  { id: 'lemasa', name: 'Lemasa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/lemasa.png", color: '#009CDE' },
  { id: 'loctite', name: 'Loctite', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/loctite.png", color: '#009CDE' },
  { id: 'lincoln', name: 'Lincoln', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/lincoln.png", color: '#009CDE' },
  { id: '3m', name: '3M', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/3m.png", color: '#009CDE' },
  { id: 'Ziehl-abegg', name: 'Ziehl-abegg', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ziehl-abegg.png", color: '#009CDE' },
  { id: 'yokogawa', name: 'Yokogawa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/yokogawa.png", color: '#009CDE' },
  { id: 'yto', name: 'Yto', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/yto.png", color: '#009CDE' },
  { id: 'woodward', name: 'Woodward', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/woodward.png", color: '#009CDE' },
  { id: 'unit t', name: 'Unit T', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/unit-t.png", color: '#009CDE' },
  { id: 'ultraprobe', name: 'Ultraprobe', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ultraprobe.png", color: '#009CDE' },
  { id: 'unior', name: 'Unior', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/unior.png", color: '#009CDE' },
  { id: 'perkins', name: 'Perkins', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/perkins.png", color: '#009CDE' },
  { id: 'parker', name: 'Parker', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/parker.png", color: '#009CDE' },
  { id: 'nov', name: 'NOV', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/nov.png", color: '#009CDE' },
  { id: 'ofmer', name: 'Ofmer', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/ofmer.png", color: '#009CDE' },
  { id: 'tentech', name: 'Tentech', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tentech.png", color: '#009CDE' },
  { id: 'tuff bucket', name: 'Tuff Bucket', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tuff-bucket.png", color: '#009CDE' },
  { id: 'tweco', name: 'Tweco', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/tweco.png", color: '#009CDE' },
  { id: 'Dresser Texsteam', name: 'Dresser Texsteam', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Dresser.png", color: '#009CDE' },
  { id: 'Airtools', name: 'Airtools', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Airtools.png", color: '#009CDE' },
  { id: 'Bentley', name: 'Bentley', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Bentley.png", color: '#009CDE' },
  { id: 'Apollo', name: 'Apollo', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Apollo.png", color: '#009CDE' },
  { id: 'Aurand', name: 'Aurand', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Aurand.png", color: '#009CDE' },
  { id: 'Avtron', name: 'Avtron', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Avtron.png", color: '#009CDE' },
   { id: 'Bently', name: 'Bently', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Bently.png", color: '#009CDE' },
  { id: 'Birkosit', name: 'Birkosit', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Birkosit.png", color: '#009CDE' },
  { id: 'Bombadur', name: 'Bombadur', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Bombadur.png", color: '#009CDE' },
  { id: 'Controlair', name: 'Controlair', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Controlair.png", color: '#009CDE' },
  { id: 'Crosby', name: 'Crosby', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Crosby.png", color: '#009CDE' },
  { id: 'Cummins', name: 'Cummins', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Cummins.png", color: '#009CDE' },
  { id: 'Deutz', name: 'Deutz', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Deutz.png", color: '#009CDE' },
  { id: 'Dhv', name: 'Dhv', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Dhv.png", color: '#009CDE' },
  { id: 'Dji', name: 'Dji', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Dji.png", color: '#009CDE' },
  { id: 'Doosan', name: 'Doosan', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Doosan.png", color: '#009CDE' },
  { id: 'Easy Laser', name: 'Easy Laser', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Easy_Laser.png", color: '#009CDE' },
  { id: 'Ebmpapst', name: 'Ebmpapst', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Ebmpapst.png", color: '#009CDE' },
  { id: 'Edilgrappa', name: 'Edilgrappa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Edilgrappa.png", color: '#009CDE' },
  { id: 'Elite', name: 'Elite', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Elite.png", color: '#009CDE' },
  { id: 'Fixturlaser', name: 'Fixturlaser', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Fixturlaser.png", color: '#009CDE' },
  { id: 'Ge Panametrics', name: 'Ge Panametrics', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Ge-Panametrics.png", color: '#009CDE' },
  {id: 'Graco', name: 'Graco', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Graco.png", color: '#009CDE' },
   { id: 'Gfuve', name: 'Gfuve', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Gfuve.png", color: '#009CDE' },
   { id: 'Hth', name: 'Hth', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Hth.png", color: '#009CDE' },
   { id: 'John Deere', name: 'John Deere', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/John-Deere.png", color: '#009CDE' },
    { id: 'Kane', name: 'Kane', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Kane.png", color: '#009CDE' },
   { id: 'Key Fire Hose', name: 'Key Fire Hose', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Key-hose.png", color: '#009CDE' },
   { id: 'Kilovolt', name: 'Kilovolt', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Kilovolt.png", color: '#009CDE' },
   { id: 'Krug', name: 'Krug', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Krug.png", color: '#009CDE' },
  { id: 'Kubota', name: 'Kubota', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Kubota.png", color: '#009CDE' },
  { id: 'Kudos', name: 'Kudos', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Kudos.png", color: '#009CDE' },
  { id: 'Kyoritsu', name: 'Kyoritsu', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Kyoritsu.png", color: '#009CDE' },
   { id: 'Lakeland', name: 'Lakeland', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Lakeland.png", color: '#009CDE' },
  { id: 'Leica', name: 'Leica', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Leica.png", color: '#009CDE' },
   { id: 'Victor', name: 'Victor', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Victor.png", color: '#009CDE' },
  { id: 'Vega', name: 'Vega', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Vega.png", color: '#009CDE' },
  { id: 'Uniflex', name: 'Uniflex', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Uniflex.png", color: '#009CDE' },
  { id: 'Ulirvision', name: 'Ulirvision', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Ulirvision.png", color: '#009CDE' },
  { id: 'Raychem', name: 'Raychem', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Raychem.png", color: '#009CDE' },
  { id: 'National', name: 'National', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/National.png", color: '#009CDE' },
  { id: 'Omicron', name: 'Omicron', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Omicron.png", color: '#009CDE' },
  { id: 'Tehma', name: 'Tehma', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Tehma.png", color: '#009CDE' },
  { id: 'Teledyne', name: 'Teledyne', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Teledyne.png", color: '#009CDE' },
  { id: 'Time Electronics', name: 'Time Electronics', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Time_Electronics.png", color: '#009CDE' },
  { id: 'Magswitch', name: 'Magswitch', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Magswitch.png", color: '#009CDE' },
  { id: 'Maucotools', name: 'Maucotools', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Maucotools.png", color: '#009CDE' },
  { id: 'Metabo', name: 'Metabo', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Metabo.png", color: '#009CDE' },
  { id: 'Metrel', name: 'Metrel', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Metrel.png", color: '#009CDE' },
  { id: 'Miller', name: 'Miller', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Miller.png", color: '#009CDE' },
  { id: 'Milwaukee', name: 'Milwaukee', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Milwaukee.png", color: '#009CDE' },
  { id: 'Momentive', name: 'Momentive', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Momentive.png", color: '#009CDE' },
  { id: 'Msa', name: 'Msa', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Msa.png", color: '#009CDE' },
  { id: 'Panduit', name: 'Panduit', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Panduit.png", color: '#009CDE' },
  { id: 'Pdma', name: 'Pdma', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Pdma.png", color: '#009CDE' },
  { id: 'Phillips', name: 'Phillips', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Phillips.png", color: '#009CDE' },
  { id: 'Pietro Fiorentini', name: 'Pietro Fiorentini', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Pietro-Fiorentini.png", color: '#009CDE' },
  { id: 'Precision Brand', name: 'Precision Brand', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Precision-Brand.png", color: '#009CDE' },
  { id: 'Presys', name: 'Presys', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Presys.png", color: '#009CDE' },
  { id: 'Prominent', name: 'Prominent', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Prominent.png", color: '#009CDE' },
  { id: 'Protem', name: 'Protem', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Protem.png", color: '#009CDE' },
  { id: 'Pumpworks', name: 'Pumpworks', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Pumpworks.png", color: '#009CDE' },
   { id: 'Schulz', name: 'Schulz', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Schulz.png", color: '#009CDE' },
  { id: 'Scott', name: 'Scott', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Scott.png", color: '#009CDE' },
  { id: 'Sdt', name: 'Sdt', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Sdt.png", color: '#009CDE' },
  { id: 'Sew', name: 'Sew', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Sew.png", color: '#009CDE' },
  { id: 'Shibuya', name: 'Shibuya', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Shibuya.png", color: '#009CDE' },
  { id: 'Siemens', name: 'Siemens', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Siemens.png", color: '#009CDE' },
  { id: 'Sixnet', name: 'Sixnet', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Sixnet.png", color: '#009CDE' },
  { id: 'Skf', name: 'Skf', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Skf.png", color: '#009CDE' },
  { id: 'Sofamel', name: 'Sofamel', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Sofamel.png", color: '#009CDE' },
  { id: 'Solucao', name: 'Solucao', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Solucao.png", color: '#009CDE' },
  { id: 'Splitstar', name: 'Splitstar', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Splitstar.png", color: '#009CDE' },
  { id: 'Staht', name: 'Staht', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Staht.png", color: '#009CDE' },
  { id: 'Stamford', name: 'Stamford', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Stamford.png", color: '#009CDE' },
  { id: 'Starrett', name: 'Starrett', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Starrett.png", color: '#009CDE' },
  { id: 'Streamlight', name: 'Streamlight', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Streamlight.png", color: '#009CDE' },
  { id: 'Swagelok', name: 'Swagelok', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Swagelok.png", color: '#009CDE' },
  { id: 'Sylvania', name: 'Sylvania', country: 'de', logo: "https://ingprosuppliers.com/imagenes/logos/Sylvania.png", color: '#009CDE' }
];
// ============================================================
// INGPROSUPPLIERS - MOTOR OPTIMIZADO (no bloquea hilo principal)
// - normalizeText memoizado
// - índice O(1) producto <-> (categoría, subcategoría)
// - conteos en una sola pasada
// - delegación de eventos (sin listeners por tarjeta)
// - render por chunks con requestIdleCallback
// - lazy: navbar/categorías solo cuando se necesitan
// ============================================================

/* ---------- Utilidades base ---------- */
function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .trim();
}

function buildProductSlug(product) {
  if (!product) return 'item';

  const brand = slugify(product.brand || product.cf_marca || product.marca || 'brand') || 'brand';
  const explicit = product.modelo || product.model || product.cf_modelo;
  let modelRaw = explicit && String(explicit).trim() ? String(explicit).trim() : '';
  if (!modelRaw) {
    const cleaned = String(product.name || '').replace(/[™®©]/g, ' ').replace(/\s+/g, ' ').trim();
    const m =
      cleaned.match(/\b([A-Za-z]{1,8}-?\d{2,6}[A-Za-z0-9-]{0,16})\b/) ||
      cleaned.match(/\b(\d{3,6}[A-Za-z]{1,6}\d{0,4}[A-Za-z0-9-]{0,12})\b/);
    modelRaw = (m && m[1]) || '';
  }
  if (!modelRaw) {
    const code = String(product.sku || product.cf_codigo || product.codigo || product.code || '').trim();
    const isOpaque = /^[a-f0-9]{10,}$/i.test(code) || /^\d{8,}$/.test(code);
    modelRaw = code && !isOpaque ? code : (product.item_id || product.id || 'model');
  }
  const model = slugify(modelRaw) || 'model';
  const rawCategory =
    product.categoria ||
    product.cf_categoria ||
    product.cf_category ||
    product.category ||
    'general';
  let category = slugify(
    String(rawCategory)
      .replace(/[\s\-_/]*[(\[]?\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*[)\]]?\s*$/g, '')
      .replace(/\s*[|–—-]\s*[A-Za-z]{1,3}\d{2,5}[A-Za-z]{0,2}\s*$/g, '')
      .trim()
  );
  category = (category || 'general').replace(/-[a-z]{1,3}\d{2,5}[a-z]{0,2}$/i, '') || 'general';

  return `${brand}/${model}/${category}`;
}

function buildProductUrl(product) {
  return `/product/${buildProductSlug(product)}`;
}

// normalizeText con caché (LRU acotado)
const _normCache = new Map();
function normalizeText(value) {
  if (value === null || value === undefined) return '';
  const key = typeof value === 'string' ? value : String(value);
  const hit = _normCache.get(key);
  if (hit !== undefined) return hit;
  const out = key.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/\s+/g, ' ');
  if (_normCache.size > 5000) _normCache.clear();
  _normCache.set(key, out);
  return out;
}
const normalizeTextValue = normalizeText;

/* ---------- Loader global ---------- */
function showGlobalLoader(message = 'Loading...') {
  const loader = document.getElementById('globalLoader');
  if (!loader) return;
  const txt = loader.querySelector('.loader-text');
  if (txt) txt.textContent = message;
  loader.setAttribute('aria-hidden', 'false');
  loader.classList.remove('hidden');
}
function hideGlobalLoader() {
  const loader = document.getElementById('globalLoader');
  if (!loader) return;
  loader.setAttribute('aria-hidden', 'true');
  loader.classList.add('hidden');
}

/* ---------- Precomputed indexes ---------- */
// Brand → country (source of truth: marcasPaises.js), case-insensitive
const _marcasPaisesIndex = (() => {
  const m = new Map();
  if (typeof marcasPaises === 'object' && marcasPaises) {
    for (const k of Object.keys(marcasPaises)) m.set(normalizeText(k), marcasPaises[k]);
  }
  return m;
})();

// EN/ES aliases → country id
const _COUNTRY_ALIASES = {
  'united states': 'us', usa: 'us', eeuu: 'us', 'estados unidos': 'us',
  germany: 'de', alemania: 'de',
  switzerland: 'ch', suiza: 'ch',
  japan: 'jp', japon: 'jp',
  sweden: 'se', suecia: 'se',
  france: 'fr', francia: 'fr',
  italy: 'it', italia: 'it',
  'united kingdom': 'uk', 'reino unido': 'uk', uk: 'uk', 'great britain': 'uk', gb: 'uk',
  china: 'cn',
  'south korea': 'kr', 'corea del sur': 'kr', korea: 'kr',
  denmark: 'dk', dinamarca: 'dk',
  netherlands: 'nl', 'paises bajos': 'nl', holland: 'nl',
  canada: 'ca',
  spain: 'es', espana: 'es',
  brazil: 'br', brasil: 'br',
  mexico: 'mx',
  austria: 'at',
  belgium: 'be', belgica: 'be',
  slovenia: 'si', eslovenia: 'si',
  taiwan: 'tw',
  liechtenstein: 'li',
};

const _countryIndex = (() => {
  const byKey = new Map();
  for (const c of countries) {
    [c.id, c.code, c.name].forEach(v => { const n = normalizeText(v); if (n) byKey.set(n, c); });
  }
  for (const [alias, id] of Object.entries(_COUNTRY_ALIASES)) {
    const c = countries.find((x) => x.id === id);
    if (c) byKey.set(normalizeText(alias), c);
  }
  return byKey;
})();

const _brandIndex = (() => {
  const byName = new Map();
  for (const b of brands) byName.set(normalizeText(b.name), b);
  return byName;
})();

const _countryMissCache = new Map();
const _brandMissCache = new Map();
const _brandCountryMissCache = new Map();

function findCountryMatch(value) {
  const n = normalizeText(value);
  if (!n) return null;
  if (_countryIndex.has(n)) return _countryIndex.get(n);
  if (_countryMissCache.has(n)) return _countryMissCache.get(n);
  let found = null;
  for (const c of countries) {
    const cn = normalizeText(c.name);
    if (cn && (cn.includes(n) || n.includes(cn))) { found = c; break; }
  }
  _countryMissCache.set(n, found);
  return found;
}
function findBrandMatch(name) {
  const n = normalizeText(name);
  if (!n) return null;
  if (_brandIndex.has(n)) return _brandIndex.get(n);
  if (_brandMissCache.has(n)) return _brandMissCache.get(n);
  let found = null;
  for (const [bn, b] of _brandIndex) {
    if (bn && (n.includes(bn) || bn.includes(n))) { found = b; break; }
  }
  _brandMissCache.set(n, found);
  return found;
}
/** Brand country from marcasPaises.js (priority over brands[].country). */
function findBrandCountryId(name) {
  if (!name) return null;
  const n = normalizeText(name);
  if (!n) return null;
  if (_brandCountryMissCache.has(n)) return _brandCountryMissCache.get(n);

  let override = _marcasPaisesIndex.get(n);
  if (!override) {
    let bestLen = 0;
    for (const [k, v] of _marcasPaisesIndex) {
      if (!k) continue;
      if ((n === k || n.includes(k) || k.includes(n)) && k.length > bestLen) {
        bestLen = k.length;
        override = v;
      }
    }
  }
  if (!override) {
    _brandCountryMissCache.set(n, null);
    return null;
  }
  const c = findCountryMatch(override);
  const id = c ? c.id : null;
  _brandCountryMissCache.set(n, id);
  return id;
}

// Align brands[].country with marcasPaises
for (const b of brands) {
  const fromMap = findBrandCountryId(b.name) || findBrandCountryId(b.id);
  if (fromMap) b.country = fromMap;
}

// Índice de items de categoría: cada item lo descomponemos a {catTitle, subTitle, nameNorm, codeNorm, fullNorm}
// Esto permite que para cada producto encontremos sus "buckets" (cat||sub) sin loops anidados por render.
const _categoryItemIndex = (() => {
  const list = [];
  for (const c of categorias) {
    for (const s of c.subcategorias) {
      for (const it of (s.items || [])) {
        const text = String(it);
        const parts = text.split(' - ');
        const codeRaw = (parts.length > 1 ? parts[parts.length - 1] : '').trim();
        const codeMatch = codeRaw.toUpperCase().match(/^([A-Z]\d{3,4}[A-Z]{0,3})$/) || text.toUpperCase().match(/\b([A-Z]\d{3,4}[A-Z]{0,3})\b/);
        const code = codeMatch ? normalizeText(codeMatch[1]) : '';
        list.push({
          cat: c.titulo,
          sub: s.subtitulo,
          name: normalizeText(parts[0] || ''),
          code,
          full: normalizeText(it),
          raw: text,
        });
      }
    }
  }
  return list;
})();
const _categoryByTitleNorm = (() => {
  const m = new Map();
  for (const c of categorias) m.set(normalizeText(c.titulo), c);
  return m;
})();

const _bucketByKey = (() => {
  const map = new Map();
  for (const it of _categoryItemIndex) {
    const bucket = it.cat + '||' + it.sub;
    // Code + exact full label only (not bare name: causes ES/EN cross-matches)
    for (const key of [it.code, it.full]) {
      if (!key) continue;
      if (!map.has(key)) map.set(key, []);
      map.get(key).push({ cat: it.cat, sub: it.sub, bucket });
    }
  }
  return map;
})();

/** Primary index: item code (a011) → buckets. Language-independent. */
const _bucketByCode = (() => {
  const map = new Map();
  for (const it of _categoryItemIndex) {
    if (!it.code) continue;
    const bucket = it.cat + '||' + it.sub;
    if (!map.has(it.code)) map.set(it.code, []);
    map.get(it.code).push({ cat: it.cat, sub: it.sub, bucket });
  }
  return map;
})();

function _addBucketHits(buckets, catKeys, key) {
  if (!key) return;
  const hits = _bucketByKey.get(key);
  if (!hits) return;
  for (let i = 0; i < hits.length; i++) {
    buckets.add(hits[i].bucket);
    catKeys.add(hits[i].cat);
  }
}

function _addBucketHitsByCode(buckets, catKeys, code) {
  if (!code) return;
  const hits = _bucketByCode.get(normalizeText(code));
  if (!hits) return;
  for (let i = 0; i < hits.length; i++) {
    buckets.add(hits[i].bucket);
    catKeys.add(hits[i].cat);
  }
}

// Precomputed taxonomy (avoids normalizeText × categories per product)
const _taxonomyIndex = (() => {
  return categorias.map((c) => ({
    titulo: c.titulo,
    cn: normalizeText(c.titulo),
    subs: (c.subcategorias || []).map((s) => ({
      subtitulo: s.subtitulo,
      sn: normalizeText(s.subtitulo),
    })),
  }));
})();

/** Strict equality match only. No includes() to avoid category bleed. */
function _matchTaxonomyExact(buckets, catKeys, catNorm, subNorm) {
  if (!catNorm && !subNorm) return;
  for (let i = 0; i < _taxonomyIndex.length; i++) {
    const c = _taxonomyIndex[i];
    const cn = c.cn;
    if (!cn) continue;
    if (catNorm && cn !== catNorm) continue;
    catKeys.add(c.titulo);
    if (!subNorm) continue;
    const subs = c.subs;
    for (let j = 0; j < subs.length; j++) {
      if (subs[j].sn === subNorm) {
        buckets.add(c.titulo + '||' + subs[j].subtitulo);
      }
    }
  }
}

function extractItemCode(value) {
  if (!value) return '';
  const text = String(value);
  // New format: A002d / Z204hh (also supports legacy A011)
  const match = text.toUpperCase().match(/\b([A-Z]\d{3,4}[A-Z]{0,3})\b/);
  if (match) return normalizeText(match[1]);
  const parts = text.split(' - ');
  const last = normalizeText(parts[parts.length - 1] || '');
  return /^[a-z]\d{3,4}[a-z]{0,3}$/.test(last) ? last : '';
}

/** Extract all codes like A002d / Z204hh / A011 from a value. */
function extractItemCodesFromValue(value) {
  const out = [];
  const text = String(value || '');
  if (!text.trim()) return out;
  const re = /\b([A-Z]\d{3,4}[A-Z]{0,3})\b/gi;
  let m;
  const seen = new Set();
  while ((m = re.exec(text)) !== null) {
    const code = normalizeText(m[1]);
    if (!code || seen.has(code)) continue;
    seen.add(code);
    out.push(code);
  }
  if (!out.length) {
    const parts = text.split(' - ');
    const last = normalizeText(parts[parts.length - 1] || '');
    if (/^[a-z]\d{3,4}[a-z]{0,3}$/.test(last)) out.push(last);
  }
  return out;
}

function collectProductItemCodes(p, categoryName, subcategoryName) {
  const codes = new Set();
  // DB canonical field is `categoria` (e.g. "Presostatos - A011")
  // Do NOT use cf_item here: that field is the English product name.
  const primary = p.categoria || categoryName || '';
  const primaryCodes = extractItemCodesFromValue(primary);
  for (let j = 0; j < primaryCodes.length; j++) codes.add(primaryCodes[j]);

  if (!codes.size) {
    const fields = [
      p.cf_codigo,
      p.cf_codigo_categoria,
      subcategoryName,
      p.cf_subcategoria,
      p.subcategoria,
    ];
    for (let i = 0; i < fields.length; i++) {
      const list = extractItemCodesFromValue(fields[i]);
      for (let j = 0; j < list.length; j++) codes.add(list[j]);
    }
  }
  return codes;
}

/** UI-only English name. Keep product.name (Spanish) for cart/quotes. */
function getProductDisplayName(p) {
  if (!p) return '';
  const en = String(p.cf_item || p.nameEn || '').trim();
  if (en) return en;
  return String(p.name || '').trim() || 'Product';
}

/* ---------- Estado ---------- */
const API_URL_CANDIDATES = [
  '/api/products',
  'https://ingprosuppliers.com/api/products',
];
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let productsPerPage = 12;

// Lookup: code (e.g. "A001") -> English item name (from categorias above)
const ENGLISH_ITEM_NAMES_BY_CODE = (() => {
  const m = {};
  for (const c of categorias) for (const s of c.subcategorias) for (const it of (s.items||[])) {
    const parts = it.split(' - ');
    const code = (parts[1]||'').trim();
    if (code) m[code.toUpperCase()] = (parts[0]||'').trim();
  }
  return m;
})();
function _englishNamesForBlob(blobText) {
  const out = [];
  const seen = new Set();
  const re = /[A-Z]\d{3,4}[A-Z]{0,3}/gi;
  let mm;
  while ((mm = re.exec(blobText)) !== null) {
    const code = mm[0].toUpperCase();
    if (seen.has(code)) continue;
    seen.add(code);
    const name = ENGLISH_ITEM_NAMES_BY_CODE[code];
    if (name) out.push(name);
  }
  return out.join(' ');
}

let activeFilters = { country: null, category: null, subcategory: null, brand: null, industry: null, search: '', itemCode: null };

// Cachés
let categoryCache = {};       // titulo -> count
let subcategoryCache = {};    // "titulo||subtitulo" -> count
let countryCountCache = {};   // countryId -> count
let brandCountCache = {};     // brandId -> count
let brandCountByNameNorm = {};// brandName(normalized) -> count
let industryCountCache = {};  // industryId -> count

let searchDebounceTimer = null;

/* ---------- Imágenes y precios ---------- */
function normalizeImageUrl(src) {
  if (!src) return '';
  const t = String(src).trim();
  if (!t) return '';
  if (/^(https?:)?\/\//i.test(t)) return t.startsWith('//') ? `https:${t}` : t;
  return `https://ingprosuppliers.com/${t.replace(/^\/*/, '')}`;
}
function getProductImageUrl(p) {
  if (!p) return '';
  if (typeof p.image_url === 'string' && p.image_url.trim()) return normalizeImageUrl(p.image_url);
  if (typeof p.imagen_url === 'string' && p.imagen_url.trim()) return normalizeImageUrl(p.imagen_url);
  if (Array.isArray(p.images) && p.images.length) {
    const f = p.images[0];
    if (typeof f.image_url === 'string' && f.image_url.trim()) return normalizeImageUrl(f.image_url);
    if (typeof f.url === 'string' && f.url.trim()) return normalizeImageUrl(f.url);
  }
  if (p.imagenes_url) {
    try {
      if (typeof p.imagenes_url === 'string') {
        const parsed = JSON.parse(p.imagenes_url);
        if (Array.isArray(parsed) && parsed[0]) return normalizeImageUrl(parsed[0]);
        if (typeof parsed === 'string' && parsed.trim()) return normalizeImageUrl(parsed);
      } else if (Array.isArray(p.imagenes_url) && p.imagenes_url.length) {
        return normalizeImageUrl(p.imagenes_url[0]);
      }
    } catch {
      if (typeof p.imagenes_url === 'string' && p.imagenes_url.trim()) return normalizeImageUrl(p.imagenes_url);
    }
  }
  if (typeof p.image_name === 'string' && p.image_name.trim()) return normalizeImageUrl(`imagenes/productos/${p.image_name.trim()}`);
  return '';
}
const _priceFmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
function formatPrice(rate) {
  const n = Number(rate);
  if (!rate || Number.isNaN(n) || n <= 0) return '';
  return _priceFmt.format(n);
}

/* ---------- Adaptador de productos (precomputa todo lo caro) ---------- */
function adaptApiProduct(p, idx) {
  const marcaApi = (p.cf_marca || '').trim();
  const brandMatch = findBrandMatch(marcaApi);
  const normalizedBrandId = slugify(normalizeText(marcaApi)) || 'unknown';
  const rawCountryValue = p.cf_pais || p.pais || p.country || p.origin || p.country_code || p.countryCode || p.countryName || p.country_name || '';
  const countryMatch = findCountryMatch(rawCountryValue);
  // Source of truth: marcasPaises.js → then API → then brands[]
  const brandCountryFromMap =
    findBrandCountryId(marcaApi) ||
    findBrandCountryId(brandMatch && brandMatch.name) ||
    findBrandCountryId(normalizedBrandId);
  const productCountry =
    brandCountryFromMap ||
    (countryMatch ? countryMatch.id : null) ||
    (brandMatch ? brandMatch.country : null) ||
    null;

  const name = p.name || 'Sin nombre';
  const nameEn = String(p.cf_item || '').trim();
  const sku = p.sku || '';
  const brandName = marcaApi || 'Sin marca';
  // EN: industria en cf_category
  const industryRaw = p.cf_category || '';
  const industryMatch =
    typeof resolveIndustry === 'function' ? resolveIndustry(industryRaw) : null;
  const industryId = industryMatch ? industryMatch.id : null;
  const industryName = industryMatch
    ? (typeof getIndustryLabel === 'function'
        ? getIndustryLabel(industryMatch, true)
        : industryMatch.en)
    : (industryRaw || '');

  // DB field `categoria` = "Presostatos - A011" (item + code). Source of truth.
  // cf_item = English display name (NOT taxonomy)
  const categoriaRaw = String(p.categoria || '').trim();
  const categoryName = categoriaRaw;
  const subcategoryName = p.cf_subcategoria || '';

  // Classify by CODE from `categoria` (A011) — language-independent
  const itemCodes = collectProductItemCodes(p, categoryName, subcategoryName);
  const buckets = new Set();
  const catKeys = new Set();

  for (const code of itemCodes) {
    _addBucketHitsByCode(buckets, catKeys, code);
  }

  // Strict fallback only if categoria has no recognizable code
  if (buckets.size === 0 && categoriaRaw) {
    const catNorm = normalizeText(categoriaRaw);
    _addBucketHits(buckets, catKeys, catNorm);
    if (buckets.size === 0) {
      const labelOnly = normalizeText(categoriaRaw.split(' - ')[0] || '');
      if (labelOnly) _addBucketHits(buckets, catKeys, labelOnly);
    }
  }

  const subNorm = normalizeText(subcategoryName || categoriaRaw || '');
  const codesArr = [...itemCodes];

  return {
    id: p.product_id || p.item_id || `p-${idx}`,
    name, // Spanish (keep for cart / quotes / submit)
    nameEn, // English display from cf_item
    cf_item: nameEn,
    sku,
    brand: brandMatch ? brandMatch.id : normalizedBrandId,
    brandName,
    brandColor: brandMatch ? brandMatch.color : '#0066cc',
    country: productCountry,
    category: categoryName, categoryName,
    subcategory: subcategoryName || categoryName, subcategoryName: subcategoryName || categoryName,
    cf_categoria: p.cf_categoria || '',
    cf_category: p.cf_category || '',
    industryId,
    industryName,
    rate: Number(p.rate || 0),
    image: getProductImageUrl(p),
    delivery: Number(p.stock_on_hand || 0) > 0 ? 'In stock' : '',
    _searchBlob: ([name, nameEn, sku, brandName, industryName, industryRaw, categoriaRaw, p.cf_category || '', p.cf_subcategoria || '', codesArr.join(' ')].join(' ') + ' ' + _englishNamesForBlob([sku, categoriaRaw, p.cf_category||'', p.cf_subcategoria||'', nameEn, name, industryName, industryRaw, codesArr.join(' ')].join(' '))).toLowerCase(),
    _brandNorm: normalizeText(brandName),
    _buckets: buckets,
    _catKeys: catKeys,
    _itemCodes: itemCodes,
    _categoriaRaw: categoriaRaw,
    _subNorm: subNorm,
    _industryId: industryId,
  };
}

/* ---------- Pertenencia O(1) (usado por código antiguo si queda) ---------- */
function productBelongsToCategory(product, categoryTitle, subcategoryTitle) {
  if (!categoryTitle && !subcategoryTitle) return true;
  if (categoryTitle && subcategoryTitle) return product._buckets.has(categoryTitle + '||' + subcategoryTitle);
  if (categoryTitle) return product._catKeys.has(categoryTitle);
  // sólo subcategoría
  const sn = normalizeText(subcategoryTitle);
  if (product._subNorm === sn) return true;
  for (const k of product._buckets) if (k.endsWith('||' + subcategoryTitle)) return true;
  return false;
}

/* ---------- Sincronizar marcas con productos (una pasada) ---------- */
function syncBrandsFromProducts() {
  const counts = new Map();
  const countryByBrand = new Map();
  for (const p of allProducts) {
    const n = p._brandNorm;
    if (!n) continue;
    counts.set(n, (counts.get(n) || 0) + 1);
    if (p.country && !countryByBrand.has(n)) countryByBrand.set(n, p.country);
  }
  const existing = new Map();
  for (const b of brands) existing.set(normalizeText(b.name), b);

  const newList = [];
  for (const key of counts.keys()) {
    const m = existing.get(key);
    if (m) {
      const fromMap = findBrandCountryId(m.name) || findBrandCountryId(key);
      if (fromMap) m.country = fromMap;
      else if (!m.country && countryByBrand.has(key)) m.country = countryByBrand.get(key);
      newList.push(m);
      continue;
    }
    const display = key.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const fromMap = findBrandCountryId(key) || findBrandCountryId(display);
    const fromProduct = fromMap || countryByBrand.get(key) || null;
    newList.push({ id: slugify(key), name: display, country: fromProduct, logo: null, color: '#0066cc' });
  }
  brands.length = 0;
  for (const b of newList) brands.push(b);
}

/* ---------- Construir todos los conteos en una sola pasada ---------- */
function buildAllCaches() {
  categoryCache = {};
  subcategoryCache = {};
  countryCountCache = {};
  brandCountCache = {};
  brandCountByNameNorm = {};
  industryCountCache = {};

  // Inicializar a 0 para que las categorías declaradas siempre aparezcan
  for (const c of categorias) {
    categoryCache[c.titulo] = 0;
    for (const s of c.subcategorias) subcategoryCache[c.titulo + '||' + s.subtitulo] = 0;
  }
  if (typeof INDUSTRIES !== 'undefined') {
    for (const ind of INDUSTRIES) industryCountCache[ind.id] = 0;
  }

  for (const p of allProducts) {
    if (p.country) countryCountCache[p.country] = (countryCountCache[p.country] || 0) + 1;
    if (p.brand) brandCountCache[p.brand] = (brandCountCache[p.brand] || 0) + 1;
    if (p._brandNorm) brandCountByNameNorm[p._brandNorm] = (brandCountByNameNorm[p._brandNorm] || 0) + 1;
    if (p._industryId) {
      industryCountCache[p._industryId] = (industryCountCache[p._industryId] || 0) + 1;
    }

    // Para no contar dos veces una categoría si el producto cae en varias subcategorías de ella
    for (const cat of p._catKeys) categoryCache[cat] = (categoryCache[cat] || 0) + 1;
    for (const bk of p._buckets) subcategoryCache[bk] = (subcategoryCache[bk] || 0) + 1;
  }
}
const buildCategoryCache = buildAllCaches; // alias retro-compat
const getCategoryCount = (t) => categoryCache[t] || 0;
const getSubcategoryCount = (c, s) => subcategoryCache[c + '||' + s] || 0;

function getSubcategoryBrands(categoriaTitulo, subcategoriaSubtitulo) {
  const bucket = categoriaTitulo + '||' + subcategoriaSubtitulo;
  const seen = new Set();
  const names = [];
  for (const p of allProducts) {
    if (!p._buckets.has(bucket)) continue;
    const key = p._brandNorm || normalizeText(p.brandName);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    names.push(p.brandName || key);
  }
  return names.sort((a, b) => a.localeCompare(b, 'en'));
}

function getCategoryBrandCount(categoriaTitulo) {
  const seen = new Set();
  for (const p of allProducts) {
    if (!p._catKeys.has(categoriaTitulo)) continue;
    if (p._brandNorm) seen.add(p._brandNorm);
  }
  return seen.size;
}

function getCategoryTopBrands(categoriaTitulo, limit = 4) {
  const counts = new Map();
  for (const p of allProducts) {
    if (!p._catKeys.has(categoriaTitulo)) continue;
    const key = p._brandNorm || normalizeText(p.brandName);
    if (!key) continue;
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'en'))
    .slice(0, limit)
    .map(([key]) => {
      const b = brands.find((x) => normalizeText(x.name) === key || x.id === key);
      return b ? b.name : key;
    });
}

function extractSubcategoryItemCode(sub) {
  const first = sub?.items?.[0] || '';
  const match = String(first).match(/\b([A-Z]\d{3,4}[A-Za-z]{0,3})\b/i);
  return match ? match[1] : '•';
}

function extractCategoryLetter(categoria, catIndex) {
  const fromTitle = String(categoria?.titulo || '').match(/\(\s*([A-Z])\s*\)/i);
  if (fromTitle) return fromTitle[1].toUpperCase();
  for (const sub of categoria.subcategorias || []) {
    for (const item of sub.items || []) {
      const match = String(item).match(/\b([A-Z])\d{3,4}[A-Za-z]{0,3}\b/i);
      if (match) return match[1];
    }
  }
  if (catIndex >= 0 && catIndex < 26) return String.fromCharCode(65 + catIndex);
  return '•';
}

function subcategoryBlurb(subcategoriaSubtitulo, itemCount) {
  const label = subcategoriaSubtitulo.toLowerCase();
  if (itemCount > 0) {
    return `Explore ${itemCount} technical types and specialized solutions in ${label}.`;
  }
  return `Industrial solutions and specialized equipment in ${label}.`;
}

/* ---------- Fetch (local cache + chunked adapt) ---------- */
const PRODUCTS_CACHE_KEY = 'ingpro_catalog_v9_us';
const PRODUCTS_CACHE_TTL_MS = 5 * 60 * 1000;

function readProductsCache() {
  try {
    const raw = sessionStorage.getItem(PRODUCTS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.list) || !parsed.ts) return null;
    if (Date.now() - parsed.ts > PRODUCTS_CACHE_TTL_MS) return null;
    return parsed.list;
  } catch {
    return null;
  }
}

function writeProductsCache(list) {
  try {
    sessionStorage.setItem(
      PRODUCTS_CACHE_KEY,
      JSON.stringify({ ts: Date.now(), list })
    );
  } catch {
    // ignore quota / private mode
  }
}

async function adaptProductsList(list) {
  const adapted = new Array(list.length);
  const CHUNK = 200;
  for (let i = 0; i < list.length; i++) {
    adapted[i] = adaptApiProduct(list[i], i);
    if (i > 0 && i % CHUNK === 0) {
      await new Promise((resolve) => setTimeout(resolve, 0));
    }
  }
  return adapted;
}

async function fetchProducts() {
  const cached = readProductsCache();
  if (cached && cached.length) {
    return adaptProductsList(cached);
  }

  let lastErr = null;
  for (const url of API_URL_CANDIDATES) {
    try {
      const res = await fetch(url, { credentials: 'same-origin' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.products || data.data || []);
      writeProductsCache(list);
      if (url !== API_URL_CANDIDATES[0]) {
        console.info(`Products loaded from ${url}`);
      }
      return adaptProductsList(list);
    } catch (err) {
      lastErr = err;
      console.warn(`Could not load products from ${url}:`, err.message);
    }
  }
  console.error('❌ Error loading products:', lastErr);
  return [];
}

let productsReady = false;
let _productsReadyResolve;
const productsReadyPromise = new Promise((resolve) => {
  _productsReadyResolve = resolve;
});

function setProductsLoadingUI(isLoading) {
  document.body.classList.toggle('products-loading', !!isLoading);
  const grid = document.getElementById('productsGrid');
  if (!grid) return;
  if (isLoading && !grid.dataset.hasProducts) {
    grid.innerHTML = '<div class="products-loading-hint" role="status">Loading products…</div>';
  }
}

async function finishProductsBootstrap(list) {
  allProducts = list;
  filteredProducts = allProducts.slice();
  syncBrandsFromProducts();
  buildAllCaches();
  initStats();
  renderSidebarFilters();
  const grid = document.getElementById('productsGrid');
  if (grid) grid.dataset.hasProducts = allProducts.length ? '1' : '';
  renderProducts();
  productsReady = true;
  if (_productsReadyResolve) _productsReadyResolve(true);
  setProductsLoadingUI(false);
}

/* ---------- Helpers DOM ---------- */
function escapeHtml(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}
function whenIdle(fn, timeout = 200) {
  if (window.requestIdleCallback) requestIdleCallback(fn, { timeout });
  else setTimeout(fn, 16);
}

const _lazySections = { paises: false, categorias: false, marcas: false, navbarCats: false };

function ensureSectionContent(sectionId) {
  if (sectionId === 'paises' && !_lazySections.paises) {
    renderCountries();
    _lazySections.paises = true;
  }
  if ((sectionId === 'categorias' || sectionId === 'subcategorias') && !_lazySections.categorias) {
    renderCategories();
    _lazySections.categorias = true;
  }
  if (sectionId === 'marcas' && !_lazySections.marcas) {
    renderBrands();
    _lazySections.marcas = true;
  }
  if (sectionId === 'industrias') {
    renderIndustries();
    _lazySections.industrias = true;
  }
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', async () => {
  initNavigation();
  initBrowseCards();
  initSearch();
  initSort();
  initNavbarDropdown();
  initNavbarScroll();
  initBreadcrumbNav();
  initSectionSwitcher();
  updateCartCount();

  // Paint hub/categories immediately; do not block on full catalog
  const params = new URLSearchParams(window.location.search);
  const needsProductsFirst = !!(params.get('item') || params.get('q') || params.get('subcategoria'));

  if (needsProductsFirst) {
    showGlobalLoader('Loading products...');
  } else {
    setProductsLoadingUI(true);
    checkUrlParams();
    if (!_initialSectionHandled) showSection('categorias');
  }

  whenIdle(() => {
    if (!_lazySections.navbarCats) {
      renderNavbarCategories();
      _lazySections.navbarCats = true;
    }
  }, 400);

  try {
    const list = await fetchProducts();
    await finishProductsBootstrap(list);
  } catch (err) {
    console.error('❌ Products bootstrap:', err);
    setProductsLoadingUI(false);
    if (_productsReadyResolve) _productsReadyResolve(false);
  }

  if (needsProductsFirst) {
    hideGlobalLoader();
    checkUrlParams();
    if (!_initialSectionHandled) showSection('categorias');
  } else if (_initialSectionHandled && (activeFilters.search || activeFilters.itemCode || activeFilters.category || activeFilters.subcategory || activeFilters.brand || activeFilters.industry || activeFilters.country)) {
    applyFilters();
    updateProductsTitle();
  }
});

/* ---------- URL params ---------- */
function checkUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const itemParam = params.get('item');
  const subcategoriaSeleccionada = params.get('subcategoria');
  const categoriaParam = params.get('categoria');
  const industryParam = params.get('industry');
  const searchParam = params.get('q');
  const sectionParam = params.get('section');

  if (industryParam) {
    activeFilters.industry = decodeURIComponent(industryParam);
    activeFilters.search = '';
    activeFilters.itemCode = null;
    applyFilters();
    updateProductsTitle();
    showSection('productos');
    _initialSectionHandled = true;
    return;
  }

  // Si ?categoria= apunta a una industria (cf_category), filtrar por industria
  if (categoriaParam && typeof resolveIndustry === 'function') {
    const asIndustry = resolveIndustry(decodeURIComponent(categoriaParam));
    if (asIndustry) {
      activeFilters.industry = asIndustry.id;
      activeFilters.search = '';
      activeFilters.itemCode = null;
      applyFilters();
      updateProductsTitle();
      showSection('productos');
      _initialSectionHandled = true;
      return;
    }
  }

  if (itemParam) {
    const rawItem = itemParam;
    const itemCode = (rawItem.split(' - ')[1] || extractItemCode(rawItem) || '').trim();
    const categoriaPadre = categoriaParam || '';
    const subcategoriaName = subcategoriaSeleccionada || '';
    if (subcategoriaName || categoriaPadre || itemCode) {
      showProductsForSubcategory(subcategoriaName, categoriaPadre, '', itemCode);
    } else {
      activeFilters.search = decodeURIComponent(rawItem);
      activeFilters.itemCode = null;
      applyFilters();
      updateProductsTitle();
      showSection('productos');
    }
    _initialSectionHandled = true;
    return;
  }
  if (subcategoriaSeleccionada) {
    showSubcategoria(decodeURIComponent(subcategoriaSeleccionada));
    _initialSectionHandled = true;
    return;
  }
  if (searchParam) {
    activeFilters.search = decodeURIComponent(searchParam);
    activeFilters.itemCode = null;
    applyFilters(); updateProductsTitle(); showSection('productos');
    _initialSectionHandled = true;
    return;
  }
  if (sectionParam && _SECTION_IDS.includes(sectionParam)) {
    if (sectionParam === 'categorias') resetCategoriesView();
    showSection(sectionParam);
    _initialSectionHandled = true;
  }
}

/* ---------- Subcategoría (página) ---------- */
function showSubcategoria(subcategoriaName) {
  const titulo = document.getElementById('titulo-subcategoria');
  const contenedor = document.getElementById('lista-subcategorias');
  if (titulo) titulo.textContent = subcategoriaName;
  let encontrada = false, categoriaPadre = '';
  const target = subcategoriaName.toUpperCase();
  for (const c of categorias) {
    for (const s of c.subcategorias) {
      if (s.subtitulo.toUpperCase() === target) {
        encontrada = true; categoriaPadre = c.titulo;
        renderSubcategoriaItems(s, categoriaPadre, subcategoriaName, contenedor);
        break;
      }
    }
    if (encontrada) break;
  }
  if (!encontrada && contenedor) contenedor.innerHTML = '<p>No results found.</p>';
  showSection('subcategorias');
}

function renderSubcategoriaItems(subcategoria, categoriaPadre, subcategoriaName, contenedor) {
  if (!contenedor) return;

  const items = subcategoria.items || [];
  const imageCandidates = _subcategoryImageCandidates(categoriaPadre, subcategoriaName);
  const subCount = getSubcategoryCount(categoriaPadre, subcategoriaName);
  const subBrands = getSubcategoryBrands(categoriaPadre, subcategoriaName);
  const heroMedia = imageCandidates.length
    ? _imgWithFallback(imageCandidates, subcategoriaName)
    : `<div class="category-card-media-icon">${_iconForSubcategory(subcategoriaName)}</div>`;

  const heroHtml = `
    <div class="taxonomy-category-view taxonomy-items-view">
      <div class="taxonomy-toolbar">
        ${renderTaxonomyBackButton(`Back to ${categoriaPadre}`, `data-back-to-category="${encodeURIComponent(categoriaPadre)}"`)}
      </div>
      <article class="taxonomy-category-hero">
        <div class="taxonomy-category-hero-media">${heroMedia}</div>
        <div class="taxonomy-category-hero-copy">
          <span class="taxonomy-eyebrow">${escapeHtml(categoriaPadre)}</span>
          <h3>${escapeHtml(subcategoriaName)}</h3>
          <p>${items.length} technical types available. Select one to browse products, brands and related documentation.</p>
          <div class="taxonomy-hero-meta">
            <span>${subCount} products</span>
            <span>${subBrands.length} brands</span>
            <span>${items.length} types</span>
          </div>
          <button type="button" class="category-view-all-btn subcat-hero-view-all" data-category="${escapeHtml(categoriaPadre)}" data-subcategory="${escapeHtml(subcategoriaName)}">View entire subcategory</button>
        </div>
      </article>
      ${renderCatalogNavHtml('categorias')}
      <div class="taxonomy-subcategories-head">
        <h4 class="taxonomy-subcategories-title">Types of ${escapeHtml(subcategoriaName)}</h4>
        <button type="button" class="taxonomy-view-all-subs subcat-hero-view-all" data-category="${escapeHtml(categoriaPadre)}" data-subcategory="${escapeHtml(subcategoriaName)}">View all products →</button>
      </div>`;

  const rows = items.map((item) => {
    const nombreVisible = item.split(' - ')[0] || item;
    const codigo = (item.split(' - ')[1] || '').trim();
    const itemMedia = _taxonomyCatalogMedia(
      imageCandidates,
      nombreVisible,
      `<div class="category-card-media-icon">${_iconForSubcategory(subcategoriaName)}</div>`
    );
    return `<article class="taxonomy-subcategory-card taxonomy-subcategory-card--catalog">
      <button class="taxonomy-subcategory-main subcat-item-row" type="button"
        data-item="${encodeURIComponent(item)}"
        data-category="${encodeURIComponent(categoriaPadre)}"
        data-subcategory="${encodeURIComponent(subcategoriaName)}"
        aria-label="Open ${escapeHtml(nombreVisible)}">
        <div class="taxonomy-subcategory-copy">
          ${codigo ? `<span class="taxonomy-subcategory-code taxonomy-subcategory-code--inline">${escapeHtml(codigo)}</span>` : ''}
          <h3>${escapeHtml(nombreVisible)}</h3>
          <p>${escapeHtml(subcategoriaName)} · ${escapeHtml(categoriaPadre)}</p>
          <span class="taxonomy-expand-label">View products →</span>
        </div>
        <div class="taxonomy-subcategory-media">${itemMedia}</div>
      </button>
    </article>`;
  }).join('');

  contenedor.innerHTML = heroHtml + `<div class="taxonomy-subcategory-grid taxonomy-subcategory-grid--catalog">${rows}</div></div>`;

  if (!contenedor.dataset.subcategoryHandlerAttached) {
    contenedor.addEventListener('click', (e) => {
      const backCat = e.target.closest('[data-back-to-category]');
      if (backCat) {
        e.preventDefault();
        openCategoryView(decodeURIComponent(backCat.dataset.backToCategory || ''));
        return;
      }
      const viewAllBtn = e.target.closest('.subcat-hero-view-all');
      if (viewAllBtn) {
        e.preventDefault();
        showProductsForSubcategory(decodeURIComponent(viewAllBtn.dataset.subcategory || ''), decodeURIComponent(viewAllBtn.dataset.category || ''), '');
        return;
      }
      const btn = e.target.closest('.subcat-item-row, .subcat-item-card, .motor-item-btn');
      if (!btn) return;
      const rawItem = decodeURIComponent(btn.dataset.item || '');
      const codigoItem = (rawItem.split(' - ')[1] || extractItemCode(rawItem) || '').trim();
      showProductsForSubcategory(
        decodeURIComponent(btn.dataset.subcategory || ''),
        decodeURIComponent(btn.dataset.category || ''),
        '',
        codigoItem
      );
    });
    contenedor.dataset.subcategoryHandlerAttached = '1';
  }
}

function showProductsForSubcategory(subcategoriaName, categoriaPadre, searchTerm, itemCode = '') {
  activeFilters.category = categoriaPadre || null;
  activeFilters.subcategory = subcategoriaName || null;
  // Item navigation: CODE wins (A011). Localized title does not filter.
  const rawCode = (itemCode || extractItemCode(searchTerm) || '').trim();
  if (rawCode) {
    activeFilters.itemCode = rawCode.toUpperCase();
    activeFilters.search = '';
  } else {
    activeFilters.itemCode = null;
    activeFilters.search = searchTerm || '';
  }
  applyFilters(); updateProductsTitle(); showSection('productos');
}

/* ---------- Navbar / scroll (rAF + passive) ---------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar.site-navbar, .navbar');
  if (!navbar || navbar.dataset.fixedScrollInit) return;
  navbar.dataset.fixedScrollInit = '1';

  let anchorTop = null;
  let placeholder = navbar.nextElementSibling;
  if (!placeholder?.classList?.contains('navbar-scroll-placeholder')) {
    placeholder = document.createElement('div');
    placeholder.className = 'navbar-scroll-placeholder';
    placeholder.setAttribute('aria-hidden', 'true');
    navbar.insertAdjacentElement('afterend', placeholder);
  }

  const measureAnchor = () => {
    const wasFixed = navbar.classList.contains('fixed');
    if (wasFixed) {
      navbar.classList.remove('fixed');
      placeholder.style.height = '0px';
    }
    anchorTop = navbar.getBoundingClientRect().top + window.scrollY;
  };

  const updateNavbarFixed = () => {
    if (anchorTop === null) measureAnchor();
    const shouldFix = window.scrollY >= anchorTop;

    if (shouldFix) {
      if (!navbar.classList.contains('fixed')) {
        placeholder.style.height = `${navbar.offsetHeight}px`;
        navbar.classList.add('fixed');
      }
    } else if (navbar.classList.contains('fixed')) {
      navbar.classList.remove('fixed');
      placeholder.style.height = '0px';
    }
  };

  let ticking = false;
  const scheduleUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateNavbarFixed();
      ticking = false;
    });
  };

  const resetAndUpdate = () => {
    anchorTop = null;
    scheduleUpdate();
  };

  window.addEventListener('scroll', scheduleUpdate, { passive: true });
  window.addEventListener('resize', resetAndUpdate, { passive: true });
  window.addEventListener('load', resetAndUpdate);
  scheduleUpdate();
}

function initNavbarDropdown() {
  // Delegación: un único listener en document
  if (document._navbarDelegationAttached) return;
  document._navbarDelegationAttached = true;
  document.addEventListener('click', (e) => {
    const span = e.target.closest('.category-item > span');
    if (span) {
      e.stopPropagation();
      const parentItem = span.parentElement;
      document.querySelectorAll('.category-item').forEach(o => { if (o !== parentItem) o.classList.remove('active'); });
      parentItem.classList.toggle('active');
      return;
    }
    if (!e.target.closest('.dropdown')) {
      document.querySelectorAll('.category-item.active').forEach(i => i.classList.remove('active'));
    }
  });
}

function initNavigation() {
  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.target === 'categorias') resetCategoriesView();
      showSection(btn.dataset.target);
    });
  });
  document.querySelectorAll('[data-section-link], [data-hero-target]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.sectionLink || btn.dataset.heroTarget;
      if (target === 'categorias') resetCategoriesView();
      showSection(target);
    });
  });
}

function resetCategoriesView() {
  const grid = document.getElementById('categoriesGrid');
  if (grid) {
    grid._catView = null;
    if (typeof renderCategories === 'function') renderCategories();
  }
}

function findCategoryIndex(catTitle) {
  const target = normalizeText(catTitle);
  if (!target) return -1;
  return categorias.findIndex((c) => {
    const titulo = normalizeText(c.titulo);
    return titulo === target || c.titulo === catTitle;
  });
}

function openCategoryView(catTitle) {
  const idx = findCategoryIndex(catTitle);
  const grid = document.getElementById('categoriesGrid');
  if (idx >= 0 && grid) grid._catView = idx;
  showSection('categorias', { keepCategoryView: idx >= 0 });
  if (idx >= 0 && typeof renderCategories === 'function') renderCategories();
  updateSectionBreadcrumb('categorias');
}

const _SECTION_IDS = ['inicio','paises','categorias','marcas','industrias','productos','subcategorias'];
let _sectionElCache = null, _navLinkCache = null;
let _initialSectionHandled = false;
function showSection(sectionId, opts = {}) {
  if (!_sectionElCache) {
    _sectionElCache = {};
    for (const id of _SECTION_IDS) _sectionElCache[id] = document.getElementById(id + 'Section');
    _sectionElCache.intel = document.getElementById('corporateIntelligence');
  }
  ensureSectionContent(sectionId);
  if (sectionId === 'categorias' && !opts.keepCategoryView) {
    resetCategoriesView();
  }
  for (const id of _SECTION_IDS) {
    const el = _sectionElCache[id];
    if (el) el.classList.toggle('hidden', id !== sectionId);
  }
  if (_sectionElCache.intel) _sectionElCache.intel.classList.toggle('hidden', sectionId !== 'inicio');
  if (!_navLinkCache) _navLinkCache = document.querySelectorAll('[data-section-link]');
  for (let i = 0; i < _navLinkCache.length; i++) {
    const btn = _navLinkCache[i];
    btn.classList.toggle('active', btn.dataset.sectionLink === sectionId);
  }
  updateSectionBreadcrumb(sectionId);
  updateCatalogNavBar(sectionId);
  window.scrollTo(0, 0);
}

/* ---------- Breadcrumb sección ---------- */
const SECTION_LABELS = {
  inicio: 'Home',
  paises: 'Countries',
  categorias: 'Categories',
  marcas: 'Brands',
  industrias: 'Industries',
  productos: 'Products',
  subcategorias: 'Subcategory',
};
const SECTION_SWITCHES = [
  { id: 'categorias', title: 'By Category', subtitle: 'Complete technical structure' },
  { id: 'marcas', title: 'By Brand', subtitle: 'International manufacturers' },
  { id: 'paises', title: 'Product Origin', subtitle: 'Manufacturing countries' },
  { id: 'industrias', title: 'View All', subtitle: 'Browse by industry' },
];
const SECTION_SWITCH_ICONS = {
  categorias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  marcas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  paises: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  industrias: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
  productos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>',
};

const TAXONOMY_BACK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>';

function renderCatalogNavHtml(activeSection = 'categorias') {
  return `<nav class="catalog-nav section-switcher" data-catalog-nav aria-label="Browse catalog">
    ${SECTION_SWITCHES.map((i) => `
      <button type="button" class="section-switcher-tab${i.id === activeSection ? ' active' : ''}" data-section="${i.id}">
        <span class="section-switcher-tab-icon" aria-hidden="true">${SECTION_SWITCH_ICONS[i.id] || ''}</span>
        <span class="section-switcher-tab-text">
          <strong>${escapeHtml(i.title)}</strong>
          <small>${escapeHtml(i.subtitle)}</small>
        </span>
      </button>`).join('')}
  </nav>`;
}

function renderTaxonomyBackButton(label, attrs = 'data-back-to-all') {
  return `<button type="button" class="taxonomy-back-link" ${attrs}>
    <span class="taxonomy-back-link-icon" aria-hidden="true">${TAXONOMY_BACK_ICON}</span>
    <span class="taxonomy-back-link-text">
      <small>Navigation</small>
      <strong>${escapeHtml(label)}</strong>
    </span>
  </button>`;
}

function shouldShowCatalogNavBar(sectionId) {
  if (!['inicio', 'paises', 'categorias', 'marcas', 'industrias', 'productos', 'subcategorias'].includes(sectionId)) return false;
  if (sectionId === 'subcategorias') return false;
  if (sectionId === 'categorias') {
    const grid = document.getElementById('categoriesGrid');
    if (grid && typeof grid._catView === 'number') return false;
  }
  return true;
}

function syncCatalogNavActive(sectionId) {
  let activeTab = sectionId === 'subcategorias' ? 'categorias' : sectionId;
  if (activeTab === 'inicio') activeTab = null;
  document.querySelectorAll('[data-catalog-nav] .section-switcher-tab, #browseCards .section-switcher-tab').forEach((btn) => {
    btn.classList.toggle('active', !!activeTab && btn.dataset.section === activeTab);
  });
}

function shouldShowCategoriasHero(sectionId) {
  if (sectionId !== 'categorias') return false;
  const grid = document.getElementById('categoriesGrid');
  if (grid && typeof grid._catView === 'number') return false;
  return true;
}

function updateCatalogSectionHeroes(sectionId) {
  const showCategorias = shouldShowCategoriasHero(sectionId);
  const showMarcas = shouldShowMarcasHero(sectionId);
  const showPaises = sectionId === 'paises';
  const showIndustrias = sectionId === 'industrias';

  document.getElementById('categoriasCatalogHero')?.classList.toggle('hidden', !showCategorias);
  document.getElementById('marcasCatalogHero')?.classList.toggle('hidden', !showMarcas);
  document.getElementById('paisesCatalogHero')?.classList.toggle('hidden', !showPaises);
  document.getElementById('industriasCatalogHero')?.classList.toggle('hidden', !showIndustrias);

  document.getElementById('categoriasSection')?.classList.toggle('catalog-section--hero-mode', showCategorias);
  document.getElementById('marcasSection')?.classList.toggle('catalog-section--hero-mode', showMarcas);
  document.getElementById('paisesSection')?.classList.toggle('catalog-section--hero-mode', showPaises);
  document.getElementById('industriasSection')?.classList.toggle('catalog-section--hero-mode', showIndustrias);
}

function updateBrowseHubPanel(sectionId) {
  const panel = document.getElementById('browseHubPanel');
  if (panel) panel.classList.toggle('hidden', sectionId !== 'inicio');
}

function updateCatalogNavBar(sectionId) {
  const bar = document.getElementById('catalogNavBar');
  if (bar) bar.classList.toggle('hidden', !shouldShowCatalogNavBar(sectionId));
  syncCatalogNavActive(sectionId);
  updateBrowseHubPanel(sectionId);
  updateCatalogSectionHeroes(sectionId);
}

function initCatalogNavDelegation() {
  if (document.documentElement.dataset.catalogNavInit) return;
  document.addEventListener('click', (ev) => {
    const btn = ev.target.closest('[data-catalog-nav] [data-section], #browseCards [data-section], #browseHubGrid [data-section]');
    if (!btn) return;
    ev.preventDefault();
    showSection(btn.dataset.section);
  });
  document.documentElement.dataset.catalogNavInit = '1';
}

function initSectionSwitcher() {
  initCatalogNavDelegation();
}
function updateSectionBreadcrumb(sectionId) {
  const list = document.getElementById('sectionBreadcrumbList');
  if (!list) return;

  const crumbs = [{ key: 'inicio', label: SECTION_LABELS.inicio, action: 'section:inicio' }];

  if (sectionId === 'inicio') {
    crumbs.push({
      key: 'productos-hub',
      label: SECTION_LABELS.productos,
      action: null,
    });
  } else if (sectionId) {
    // Para subcategorias, agregar "Categorías" en lugar de "Subcategoria"
    if (sectionId === 'subcategorias') {
      crumbs.push({
        key: 'categorias',
        label: SECTION_LABELS.categorias,
        action: 'section:categorias',
      });
    } else {
      crumbs.push({
        key: sectionId,
        label: SECTION_LABELS[sectionId] || sectionId,
        action: 'section:' + sectionId,
      });
    }
  }

  // Subnivel dentro de "categorias": categoría abierta dentro del grid
  if (sectionId === 'categorias') {
    const grid = document.getElementById('categoriesGrid');
    const ci = grid && typeof grid._catView === 'number' ? grid._catView : null;
    if (ci !== null && categorias[ci]) {
      crumbs.push({
        key: 'cat-open-' + ci,
        label: categorias[ci].titulo,
        action: null, // último nivel
      });
    }
  }

  // Subnivel dentro de "subcategorias": categoría padre + subcategoría actual
  if (sectionId === 'subcategorias') {
    const titulo = document.getElementById('titulo-subcategoria');
    const subName = titulo ? titulo.textContent.trim() : '';
    let catPadre = '';
    if (subName) {
      const T = subName.toUpperCase();
      for (const c of categorias) {
        if (c.subcategorias.some(s => s.subtitulo.toUpperCase() === T)) {
          catPadre = c.titulo;
          break;
        }
      }
    }
    if (catPadre) {
      crumbs.push({ key: 'cat-' + catPadre, label: catPadre, action: 'open-cat:' + catPadre });
    }
    if (subName) {
      crumbs.push({ key: 'sub-' + subName, label: subName, action: null });
    }
  }

  // Sección "productos": país / categoría / subcategoría / item / marca
  if (sectionId === 'productos') {
    if (activeFilters.country) {
      const c = countries.find(x => x.id === activeFilters.country);
      if (c) crumbs.push({ key: 'c-' + c.id, label: c.name, action: null });
    }
    if (activeFilters.category) {
      crumbs.push({
        key: 'cat-' + activeFilters.category,
        label: activeFilters.category,
        action: 'open-cat:' + activeFilters.category,
      });
    }
    if (activeFilters.subcategory) {
      crumbs.push({
        key: 'sub-' + activeFilters.subcategory,
        label: activeFilters.subcategory,
        action: 'open-sub:' + activeFilters.subcategory,
      });
    }
    if (activeFilters.search) {
      crumbs.push({
        key: 'item-' + activeFilters.search,
        label: activeFilters.search,
        action: null,
      });
    }
    if (activeFilters.brand) {
      const b = brands.find(x => x.id === activeFilters.brand);
      if (b) crumbs.push({ key: 'b-' + b.id, label: b.name, action: null });
    }
  }

  list.innerHTML = crumbs.map((c, i) => {
    const isLast = i === crumbs.length - 1;
    if (!c.action || isLast) {
      return `<li${isLast ? ' aria-current="page"' : ''}><span class="${isLast ? 'bc-current' : ''}">${escapeHtml(c.label)}</span></li>`;
    }
    return `<li><a href="#" data-bc-action="${escapeHtml(c.action)}">${escapeHtml(c.label)}</a></li>`;
  }).join('');

  syncCatalogNavActive(sectionId);
}
function initBreadcrumbNav() {
  const list = document.getElementById('sectionBreadcrumbList');
  if (!list) return;
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-bc-action], a[data-section]');
    if (!a) return;
    e.preventDefault();

    if (a.dataset.section) {
      showSection(a.dataset.section);
      return;
    }

    const action = a.dataset.bcAction || '';
    const [kind, ...rest] = action.split(':');
    const value = rest.join(':');

    if (kind === 'section') {
      if (value === 'categorias') {
        showSection('categorias');
        return;
      }
      showSection(value);
      return;
    }

    if (kind === 'open-cat') {
      openCategoryView(value);
      return;
    }

    if (kind === 'open-sub') {
      showSubcategoria(value);
      return;
    }
  });
}

/* ---------- Stats ---------- */
function animateCountValue(element, target, suffix = '') {
  if (!element) return;
  const from = Math.max(parseInt(String(element.textContent).replace(/\D/g, ''), 10) || 0, 0);
  const duration = 900, start = performance.now();
  const ease = t => 1 - Math.pow(1 - t, 3);
  function step(now) {
    const p = Math.min((now - start) / duration, 1);
    element.textContent = `${Math.round(from + (target - from) * ease(p))}${suffix}`;
    if (p < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}
function initStats() {
  let countryC = 0, categoryC = 0, brandC = 0;
  for (const c of countries) if (countryCountCache[c.id]) countryC++;
  for (const c of categorias) if (categoryCache[c.titulo]) categoryC++;
  for (const b of brands) if (brandCountCache[b.id]) brandC++;
  animateCountValue(document.getElementById('totalProducts'), allProducts.length);
  animateCountValue(document.getElementById('totalBrands'), brandC);
  animateCountValue(document.getElementById('totalCategories'), categoryC);
  animateCountValue(document.getElementById('totalCountries'), countries.length);
  animateCountValue(document.getElementById('countryCount'), countries.length, ' countries');
  animateCountValue(document.getElementById('categoryCount'), categoryC, ' categories');
  animateCountValue(document.getElementById('brandCount'), brandC, ' brands');
  animateCountValue(document.getElementById('productCount'), allProducts.length, ' products');
  const industryTotal = typeof INDUSTRIES !== 'undefined' ? INDUSTRIES.length : 16;
  animateCountValue(document.getElementById('industryCount'), industryTotal, ' industries');
  animateCountValue(document.getElementById('hubCategoryCount'), categoryC);
  animateCountValue(document.getElementById('hubBrandCount'), brandC);
  animateCountValue(document.getElementById('hubCountryCount'), countryC);
  animateCountValue(document.getElementById('hubProductCount'), allProducts.length);
  animateCountValue(document.getElementById('hubIndustryCount'), industryTotal);
  animateCountValue(document.getElementById('heroCategoryStat'), categoryC);
  animateCountValue(document.getElementById('heroBrandStat'), brandC);
  animateCountValue(document.getElementById('heroProductStat'), allProducts.length);
  animateCountValue(document.getElementById('heroIndustryStat'), industryTotal);
  animateCountValue(document.getElementById('heroIndustryProductStat'), allProducts.length);
  animateCountValue(document.getElementById('marcasHeroBrandStat'), brandC);
  animateCountValue(document.getElementById('marcasHeroCategoryStat'), categoryC);
  animateCountValue(document.getElementById('marcasHeroProductStat'), allProducts.length);
  animateCountValue(document.getElementById('paisesHeroCountryStat'), countryC);
  animateCountValue(document.getElementById('paisesHeroBrandStat'), brandC);
  animateCountValue(document.getElementById('paisesHeroProductStat'), allProducts.length);
}

function initBrowseCards() {
  initCatalogNavDelegation();
}

/* ---------- Render Industries ---------- */
function renderIndustries() {
  const grid = document.getElementById('industriesGrid');
  if (!grid || typeof INDUSTRIES === 'undefined') return;

  const parts = INDUSTRIES.map((ind, index) => {
    const count = industryCountCache[ind.id] || 0;
    const icon = typeof getIndustryIconClass === 'function'
      ? getIndustryIconClass(ind)
      : 'fa-industry';
    const label = typeof getIndustryLabel === 'function'
      ? getIndustryLabel(ind, true)
      : ind.en;
    return (
      `<button type="button" class="industry-card${count ? '' : ' industry-card--empty'}" data-industry="${ind.id}">` +
      `<span class="industry-card-num">${String(index + 1).padStart(2, '0')}</span>` +
      `<span class="industry-card-icon" aria-hidden="true"><i class="fa-solid ${icon}"></i></span>` +
      `<span class="industry-card-body">` +
      `<strong class="industry-card-name">${escapeHtml(label)}</strong>` +
      `<small class="industry-card-count">${count} products</small>` +
      `</span>` +
      `<span class="industry-card-cta">View products →</span>` +
      `</button>`
    );
  });

  grid.innerHTML = parts.join('');

  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.industry-card');
      if (!card) return;
      const industryId = card.dataset.industry;
      const industry = INDUSTRIES.find((item) => item.id === industryId);
      if (!industry) return;

      activeFilters.industry = industryId;
      activeFilters.search = '';
      activeFilters.itemCode = null;
      currentPage = 1;
      applyFilters();
      updateProductsTitle();
      showSection('productos');
    });
    grid.dataset.delegated = '1';
  }

  const viewAllBtn = document.getElementById('viewAllProductsFromIndustries');
  if (viewAllBtn && !viewAllBtn.dataset.bound) {
    viewAllBtn.addEventListener('click', () => {
      activeFilters.industry = null;
      activeFilters.search = '';
      activeFilters.itemCode = null;
      currentPage = 1;
      applyFilters();
      updateProductsTitle();
      showSection('productos');
    });
    viewAllBtn.dataset.bound = '1';
  }
}

/* ---------- Render Países ---------- */
function renderCountries() {
  const grid = document.getElementById('countriesGrid');
  if (!grid) return;
  const brandsByCountry = {};
  for (const b of brands) { if (!b.country) continue; (brandsByCountry[b.country] ||= []).push(b.name); }
  const parts = [];
  for (const country of countries) {
    const pc = countryCountCache[country.id] || 0;
    const bs = brandsByCountry[country.id] || [];
    const txt = bs.length ? bs.slice(0, 5).join(', ') : 'No registered brands';
    const emptyClass = pc === 0 && !bs.length ? ' country-card--empty' : '';
    parts.push(
      `<div class="country-card${emptyClass}" data-country="${country.id}"><span class="country-flag">${country.flag}</span>` +
      `<div class="country-info"><div class="country-name">${escapeHtml(country.name)}</div>` +
      `<div class="country-brands">${bs.length} brands · ${pc} products</div>` +
      `<div class="country-brand-list">${escapeHtml(txt)}${bs.length > 5 ? '...' : ''}</div></div></div>`
    );
  }
  grid.innerHTML = parts.join('');
  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.country-card');
      if (!card) return;
      const id = card.dataset.country;
      const country = countries.find(c => c.id === id);
      activeFilters.country = id;
      applyFilters(); showSection('productos');
      const t = document.getElementById('productsTitle');
      if (t && country) t.textContent = `Products from ${country.name}`;
    });
    grid.dataset.delegated = '1';
  }
}

/* ---------- Render Categories (PREMIUM DESIGN 2026) ---------- */
/* Category icons by title - keys must match the English `categorias` titles */
const _CATEGORY_ICONS = {
  'Detection - Measurement (A)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 3v3"/><path d="M12 18v3"/><path d="M3 12h3"/><path d="M18 12h3"/><circle cx="12" cy="12" r="3"/></svg>`,
  'METROLOGY - LABORATORY ( B )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 3h6v5l4 10a2 2 0 0 1-2 3H7a2 2 0 0 1-2-3l4-10V3z"/><path d="M9 8h6"/></svg>`,
  'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="12" cy="4" r="2"/><path d="M12 6v3"/><circle cx="9" cy="14" r="1.2"/><circle cx="15" cy="14" r="1.2"/><path d="M9 18h6"/></svg>`,
  'Electricity - Electronics (D)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z"/></svg>`,
  'Power Transmission - Mechanical components (E)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v3"/><path d="M12 19v3"/><path d="M4.2 4.2l2.1 2.1"/><path d="M17.7 17.7l2.1 2.1"/><path d="M2 12h3"/><path d="M19 12h3"/><path d="M4.2 19.8l2.1-2.1"/><path d="M17.7 6.3l2.1-2.1"/></svg>`,
  'Hydraulics - Pneumatics ( F)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h18"/><path d="M3 17h18"/><rect x="6" y="3" width="12" height="18" rx="2"/><path d="M12 7v10"/></svg>`,
  'MATERIALS - TOOLS - COMPONENTS ( G)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  'MACHINE-TOOLS (H)': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="18" height="10" rx="1"/><path d="M7 8V5h10v3"/><path d="M7 18v3"/><path d="M17 18v3"/></svg>`,
  'PRODUCTION MACHINES ( I )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21V10l6 4V10l6 4V8l6 4v9z"/></svg>`,
  'INDUSTRIAL MACHINES AND EQUIPMENT ( J )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="10" rx="1"/><path d="M7 11V7h10v4"/><circle cx="8" cy="16" r="1.5"/><circle cx="16" cy="16" r="1.5"/></svg>`,
  'FOOD INDUSTRY ( K )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 11h16l-1.5 9a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 11z"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
  'Logistics - Transport - Handling ( L )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="7" width="14" height="10" rx="1"/><path d="M15 10h4l3 3v4h-7z"/><circle cx="6" cy="19" r="1.8"/><circle cx="18" cy="19" r="1.8"/></svg>`,
  'Health - Safety - Environment ( M )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z"/><path d="M9 12l2 2 4-4"/></svg>`,
  'Building - Construction ( N )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"/><path d="M5 21V9l7-6 7 6v12"/><rect x="9" y="13" width="6" height="8"/></svg>`,
  'SMALL FARM EQUIPMENT ( O )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="7" cy="17" r="3"/><circle cx="17" cy="17" r="3"/><path d="M4 10h10l3 4"/><path d="M7 10V6h7l2 4"/></svg>`,
  'SERVICES ( Z )': `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 0 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>`
};
const _DEFAULT_CAT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`;

/* Category images.
   Place your files in the /images/ folder (at the site root).
   Para mayor robustez, definimos varias rutas candidatas; se intentaran en orden
   (relative, absolute and ../images/) in case the page is served from a subfolder. */
function _imgCandidates(filename) {
  return [
    '/images/' + filename
  ];
}
const _CATEGORY_IMAGES = {
  'Detection - Measurement (A)': _imgCandidates('DETECCION-MEDICION.png'),
  'METROLOGY - LABORATORY ( B )': _imgCandidates('Metrologia-laboratorio.png'),
  'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )': _imgCandidates('robotica-automatizacion.jpeg'),
  'Electricity - Electronics (D)': _imgCandidates('electricidad-electronica.jpeg'),
  'Power Transmission - Mechanical components (E)': _imgCandidates('transmision-potencia.jpeg'),
  'Hydraulics - Pneumatics ( F)': _imgCandidates('hidraulica-neumatica.png'),
  'MATERIALS - TOOLS - COMPONENTS ( G)': _imgCandidates('materiales-herramientas.png'),
  'MACHINE-TOOLS (H)': _imgCandidates('maquinas-herramienta.png'),
  'PRODUCTION MACHINES ( I )': _imgCandidates('maquinas-produccion.png'),
  'INDUSTRIAL MACHINES AND EQUIPMENT ( J )': _imgCandidates('maquinas-industriales.png'),
  'FOOD INDUSTRY ( K )': _imgCandidates('industria-alimentaria.png'),
  'Logistics - Transport - Handling ( L )': _imgCandidates('logistica-transporte.png'),
  'Health - Safety - Environment ( M )': _imgCandidates('salud-seguridad.png'),
  'Building - Construction ( N )': _imgCandidates('edificacion-construccion.png'),
  'SMALL FARM EQUIPMENT ( O )': _imgCandidates('equipo-agricultores.png'),
  'SERVICES ( Z )': _imgCandidates('servicios.png')
};

/* Descripciones por categoria */
const _CATEGORY_DESCRIPTIONS = {
  'Detection - Measurement (A)': 'Sensors, transmitters, flow, pressure, level, temperature, humidity, position, velocity and electrical measurement equipment for industrial automation.',
  'METROLOGY - LABORATORY ( B )': 'Laboratory equipment, physical-chemical analysis, metrology, testing, monitoring, inspection and high-precision optical components.',
  'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )': 'Automation, industrial and service robotics, industrial computing and software for Industry 4.0.',
  'Electricity - Electronics (D)': 'Power generation and distribution, electrical supplies, switches, relays, cables, connectors and electronic components.',
  'Power Transmission - Mechanical components (E)': 'Bearings, linear guides, mechanical transmission, actuators and industrial positioning systems.',
  'Hydraulics - Pneumatics ( F)': 'Pumps, compressors, hydraulic and pneumatic actuators, valves, solenoid valves, pipes, fittings and filters.',
  'MATERIALS - TOOLS - COMPONENTS ( G)': 'Semi-finished products, cutting tools, fastening and assembly equipment, standard components and industrial accessories.',
  'MACHINE-TOOLS (H)': 'Lathes, milling machines, grinders and high-precision machining centers for the metalworking industry.',
  'PRODUCTION MACHINES ( I )': 'Production lines, assembly, packaging and manufacturing machinery.',
  'INDUSTRIAL MACHINES AND EQUIPMENT ( J )': 'Heavy industrial equipment and general-purpose machinery for production processes.',
  'FOOD INDUSTRY ( K )': 'Processing, packaging and quality control equipment for the food and beverage industry.',
  'Logistics - Transport - Handling ( L )': 'Internal transport systems, forklifts, conveyors, warehousing and material handling solutions.',
  'Health - Safety - Environment ( M )': 'PPE, industrial safety equipment, environmental monitoring and occupational health solutions.',
  'Building - Construction ( N )': 'Materials, equipment and tools for construction, building and civil engineering.',
  'SMALL FARM EQUIPMENT ( O )': 'Agricultural machinery, tractors, implements and solutions for large-scale farming.',
  'SERVICES ( Z )': 'Calibration, maintenance, technical consulting and industrial engineering services.'
};

/* Subcategory-specific images. Key: "category||subcategory".
   If no entry here, the parent category image is used automatically. */
const _SUBCATEGORY_IMAGES = {
    'Detection - Measurement (A)||Flow, Pressure and Level Measurement': _imgCandidates('Medicion_de_cudal,presion-y-nivel.jpeg'),
    'Detection - Measurement (A)||Temperature and Humidity Measurement': _imgCandidates('Medicion_de_temperatura-y-humedad.jpeg'),
    'Detection - Measurement (A)||Position, Speed and Acceleration Measurement': _imgCandidates('Medicion_de_posicion,velocidad-y-aceleracion.jpeg'),
    'Detection - Measurement (A)||Flow, Pressure and Level Measurement': _imgCandidates('Sensores_de_deteccion-y-proximidad.jpeg'),
    'Detection - Measurement (A)||Optical and Acoustic Measurement': _imgCandidates('Sensores_de_vision_y_opticos.jpeg'),
    'Detection - Measurement (A)||Electrical Measurement': _imgCandidates('Medicion_electrica.jpeg'),
    'METROLOGY - LABORATORY ( B )||Laboratory Equipment': _imgCandidates('Laboratory_Equipment.png'),
    'METROLOGY - LABORATORY ( B )||Analytical Instrumentation': _imgCandidates('Analytical_Instrumentation.png'),
    'METROLOGY - LABORATORY ( B )||Metrology and Test Equipment': _imgCandidates('Metrology_and_Test_Equipment.png'),
    'METROLOGY - LABORATORY ( B )||Optical Components': _imgCandidates('Optical_Components.png'),
    'METROLOGY - LABORATORY ( B )||Inspection and Monitoring': _imgCandidates('_Inspection_and _Monitoring.png'),
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )||Automation': _imgCandidates('automatizacion.png'),
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )||Industrial Robotics': _imgCandidates('Roboticos_industriales.png'),
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )||Service Robotics': _imgCandidates('Robots_servicios.png'),
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )||Industrial Computing': _imgCandidates('industrial_computing.png'),
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )||Industrial Software': _imgCandidates('intrudstrial_software.png'),
    'Electricity - Electronics (D)||Energy: Production and Distribution': _imgCandidates('Producción_y_Distribución_de_Energía.png'),
    'Electricity - Electronics (D)||Power Supplies': _imgCandidates('Alimentación_Eléctrica.png'),
    'Electricity - Electronics (D)||Switches and Relays': _imgCandidates('Interruptores_y_Relés.png'),
    'Electricity - Electronics (D)||Cables, Connectors, Enclosures': _imgCandidates('Cables_Conectores_y_Cajas.png'),
    'Electricity - Electronics (D)||Electronic Components': _imgCandidates('Componentes_Electrónicos.jpeg'),
    'Power Transmission - Mechanical components (E)||Bearings and Linear Guides': _imgCandidates('Rodamientos_Guías_Lineales.jpeg'),
    'Power Transmission - Mechanical components (E)||Mechanical Transmission': _imgCandidates('Transmisión_Mecánica.jpeg'),
    'Power Transmission - Mechanical components (E)||Actuators and Positioning Systems': _imgCandidates('Actuadores_y_posicionamiento.jpeg'),
    'SERVICES ( Z )||CERTIFICATIONS': _imgCandidates('CERTIFICACIONES.jpeg'),
    'SERVICES ( Z )||LABOR / TECHNICAL WORK': _imgCandidates('TRABAJO TÉCNICO/MANO_DE_OBRA.jpeg'),
    'SERVICES ( Z )||LOGISTICS': _imgCandidates('LOGISTICA.jpeg'),
    'SMALL FARM EQUIPMENT ( O )||SMALL FARM TOOLS': _imgCandidates('Herramientas_agrícolas_pequeñas.jpeg'),
    'SMALL FARM EQUIPMENT ( O )||GROUNDS CARE EQUIPMENT': _imgCandidates('Conservación_verde.jpeg'),
    'Building - Construction ( N )||Industrial Building Equipment': _imgCandidates('Acondicionamiento_de_Edificios_Industriales.jpeg'),
    'Building - Construction ( N )||Construction and Mining Equipment': _imgCandidates('Maquinarias_Obras.jpeg'),
    'Building - Construction ( N )||Construction tools': _imgCandidates('Herramientas_obra.jpeg'),
    'Building - Construction ( N )||Production of building materials': _imgCandidates('Producción_construcción.jpeg'),
    'Health - Safety - Environment ( M )||Air Treatment and Noise Management': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_0.jpeg'),
    'Health - Safety - Environment ( M )||Water Treatment': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_4.jpeg'),
    'Health - Safety - Environment ( M )||Waste Treatment': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_3.jpeg'),
    'Health - Safety - Environment ( M )||Personal Protective Equipment': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_2.jpeg'),
    'Health - Safety - Environment ( M )||Building Security and Machine Safety': _imgCandidates('SALUDSEGURIDADMEDIOAMBIENTE_1.jpeg'),
    'Health - Safety - Environment ( M )||Cleaning and Hygiene': _imgCandidates('Higiene_Limpieza.jpeg'),
    'Logistics - Transport - Handling ( L )||Handling and Lifting': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_0.jpeg'),
    'Logistics - Transport - Handling ( L )||Packing and Packaging': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_1.jpeg'),
    'Logistics - Transport - Handling ( L )||Rail Transport': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_3.jpeg'),
    'Logistics - Transport - Handling ( L )||Storage': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_4.jpeg'),
    'Logistics - Transport - Handling ( L )||Conveying': _imgCandidates('LOGISTICATRANSPORTEMANIPULACION_2.jpeg'),
    'FOOD INDUSTRY ( K )||Meat Processing': _imgCandidates('INDUSTRIAALIMENTARIA_5.jpeg'),
    'FOOD INDUSTRY ( K )||Fish Processing': _imgCandidates('INDUSTRIAALIMENTARIA_4.jpeg'),
    'FOOD INDUSTRY ( K )||Fruit and Vegetable Processing': _imgCandidates('INDUSTRIAALIMENTARIA_1.jpeg'),
    'FOOD INDUSTRY ( K )||Dairy processing': _imgCandidates('INDUSTRIAALIMENTARIA_3.jpeg'),
    'FOOD INDUSTRY ( K )||Bakery-pastry': _imgCandidates('INDUSTRIAALIMENTARIA_0.jpeg'),
    'FOOD INDUSTRY ( K )||Grain processing and pasta making': _imgCandidates('INDUSTRIAALIMENTARIA_2.jpeg'),
    'FOOD INDUSTRY ( K )||Other Food Machinery': _imgCandidates('INDUSTRIAALIMENTARIA_5.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Surface Treatment Equipment': _imgCandidates('MAQUINASINDUSTRIALES_0.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Surface Treatment': _imgCandidates('MAQUINASINDUSTRIALES_1.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Furnaces and Heat Treatment': _imgCandidates('MAQUINASINDUSTRIALES_4.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Printing, Marking and Engraving': _imgCandidates('MAQUINASINDUSTRIALES_3.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Welding and Assembly': _imgCandidates('MAQUINASINDUSTRIALES_5.jpeg'),
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )||Mixing and Dosing': _imgCandidates('MAQUINASINDUSTRIALES_6.jpeg'),
    'Hydraulics - Pneumatics ( F)||Pumps': _imgCandidates('HIDRAULICANEUMATICA_0.jpeg'),
    'Hydraulics - Pneumatics ( F)||Compressors': _imgCandidates('HIDRAULICANEUMATICA_1.jpeg'),
    'Hydraulics - Pneumatics ( F)||Hydraulic and Pneumatic Actuators': _imgCandidates('HIDRAULICANEUMATICA_0.jpeg'),
    'Hydraulics - Pneumatics ( F)||Válvulas y Electroválvulas': _imgCandidates('HIDRAULICANEUMATICA_4.jpeg'),
    'Hydraulics - Pneumatics ( F)||Pipes, Tubes and Fittings': _imgCandidates('HIDRAULICANEUMATICA_2.jpeg'),
    'Hydraulics - Pneumatics ( F)||Filters and Separators': _imgCandidates('HIDRAULICANEUMATICA_3.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Industrial Chemicals': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_6.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Semi-finished products': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_1.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Lubrication': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_3.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Auto body shop equipment': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_0.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Standard Mechanical Components': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_5.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Automotive maintenance equipment': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_4.jpeg'),
    'MATERIALS - TOOLS - COMPONENTS ( G)||Hand Tools, Power Tools': _imgCandidates('MATERIALESHERRAMIENTASCOMPONENTES_2.jpeg'),
    'MACHINE-TOOLS (H)||Machining Centers': _imgCandidates('MÁQUINASHERRAMIENTA_0.jpeg'),
    'MACHINE-TOOLS (H)||Finishing Machines': _imgCandidates('MÁQUINASHERRAMIENTA_3.jpeg'),
    'MACHINE-TOOLS (H)||Cutting Tools': _imgCandidates('MÁQUINASHERRAMIENTA_1.jpeg'),
    'MACHINE-TOOLS (H)||Machine Tool Accessories': _imgCandidates('MÁQUINASHERRAMIENTA_2.jpeg'),
    
    
    
  
  
  
  
  
  
    
    // Add more specific mappings here, for example:
    // 'CATEGORY||Subcategory': _imgCandidates('file.png'),
  };

/** Lookup by exact title or category letter: "(A)", "( B )", etc. */
function _lookupByCatTitle(map, titulo) {
  if (!map || !titulo) return undefined;
  if (map[titulo] !== undefined) return map[titulo];
  const m = String(titulo).match(/\(\s*([A-Z])\s*\)/i);
  if (!m) return undefined;
  const letter = m[1].toUpperCase();
  for (const key of Object.keys(map)) {
    const km = String(key).match(/\(\s*([A-Z])\s*\)/i);
    if (km && km[1].toUpperCase() === letter) return map[key];
  }
  return undefined;
}

/* Returns the list of candidate paths (array) for a subcategory,
   with fallback to the parent category image. */
function _subcategoryImageCandidates(catTitulo, subTitulo) {
  const key = catTitulo + '||' + subTitulo;
  const direct = _SUBCATEGORY_IMAGES[key];
  if (direct) return Array.isArray(direct) ? direct : [direct];
  const letter = (String(catTitulo || '').match(/\(\s*([A-Z])\s*\)/i) || [])[1];
  if (letter) {
    const subN = normalizeText(subTitulo);
    for (const k of Object.keys(_SUBCATEGORY_IMAGES)) {
      const parts = k.split('||');
      if (parts.length < 2) continue;
      const kl = (parts[0].match(/\(\s*([A-Z])\s*\)/i) || [])[1];
      if (kl && kl.toUpperCase() === letter.toUpperCase() && normalizeText(parts[1]) === subN) {
        const hit = _SUBCATEGORY_IMAGES[k];
        return Array.isArray(hit) ? hit : [hit];
      }
    }
  }
  const parent = _lookupByCatTitle(_CATEGORY_IMAGES, catTitulo);
  if (parent) return Array.isArray(parent) ? parent : [parent];
  return [];
}

/* Subcategory icons by keyword */
const _SUBCATEGORY_ICON_KEYWORDS = [
  { kw: ['caudal','presion','presión','nivel','flow','pressure','level'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>` },
  { kw: ['temperatura','humedad','termo','calor','temperature','humidity','thermal','heat'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 14.76V4a2 2 0 0 0-4 0v10.76a4 4 0 1 0 4 0z"/></svg>` },
  { kw: ['posicion','posición','velocidad','aceleracion','aceleración','position','speed','acceleration'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 12l4-4"/><circle cx="12" cy="12" r="1.5"/></svg>` },
  { kw: ['sensor','deteccion','detección','detection'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49"/><path d="M7.76 16.24a6 6 0 0 1 0-8.49"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M4.93 19.07a10 10 0 0 1 0-14.14"/></svg>` },
  { kw: ['vision','visión','optica','óptica','imagen','camara','cámara','optical','image','camera'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 7l-7 5 7 5z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>` },
  { kw: ['electric','electron','energia','energía','energy','power'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 4 14h7l-1 8 10-12h-7l1-8z"/></svg>` },
  { kw: ['robot','automat'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="9" width="16" height="11" rx="2"/><circle cx="12" cy="4" r="2"/><path d="M12 6v3"/></svg>` },
  { kw: ['herramienta','tool'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.7 6.3 18 3l3 3-3.3 3.3M14.7 6.3 3 18l3 3 11.7-11.7"/></svg>` },
  { kw: ['valvula','válvula','bomba','compresor','neumat','hidraul','valve','pump','compressor','pneumatic','hydraulic'], svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 2v5"/><path d="M12 17v5"/><path d="M2 12h5"/><path d="M17 12h5"/></svg>` }
];
const _SUBCATEGORY_DEFAULT_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>`;

function _iconForSubcategory(subtitulo) {
  const t = (subtitulo || '').toLowerCase();
  for (const entry of _SUBCATEGORY_ICON_KEYWORDS) {
    if (entry.kw.some(k => t.includes(k))) return entry.svg;
  }
  return _SUBCATEGORY_DEFAULT_ICON;
}

/* SVG inline para fallback cuando una imagen falla a cargar */
const _IMAGE_FALLBACK_DATAURI = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240">
    <defs>
      <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#0a2540"/>
        <stop offset="1" stop-color="#1d4ed8"/>
      </linearGradient>
    </defs>
    <rect width="400" height="240" fill="url(#g)"/>
    <g fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1.5">
      <circle cx="200" cy="120" r="55"/>
      <circle cx="200" cy="120" r="80"/>
    </g>
    <g fill="none" stroke="rgba(255,255,255,0.78)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M120 150h160"/>
      <path d="M150 150l28-54h44l28 54"/>
      <path d="M178 96l22-28 22 28"/>
      <path d="M162 126h76"/>
    </g>
  </svg>`
);

/* Construye un <img> con cadena de fallbacks (rutas candidatas + SVG final).
   La cadena se evalua en runtime mediante onerror leyendo data-fallbacks. */
function _imgWithFallback(candidates, altText, extraClass = '') {
  const list = (Array.isArray(candidates) ? candidates : [candidates]).filter(Boolean);
  if (!list.length) return '';
  const first = list[0];
  const rest = JSON.stringify(list.slice(1));
  return `<img${extraClass ? ` class="${extraClass}"` : ''} src="${escapeHtml(first)}" alt="${escapeHtml(altText)}" loading="lazy" decoding="async" data-fallbacks='${rest.replace(/'/g, "&#39;")}' onerror="(function(img){try{var f=JSON.parse(img.getAttribute('data-fallbacks')||'[]');if(f.length){img.src=f.shift();img.setAttribute('data-fallbacks',JSON.stringify(f));}else{img.onerror=null;img.src='${_IMAGE_FALLBACK_DATAURI}';}}catch(e){img.onerror=null;img.src='${_IMAGE_FALLBACK_DATAURI}';}})(this)">`;
}

/* Devuelve la primera ruta candidata (string) para usar en CSS / atributos sencillos. */
function _firstCandidate(candidates) {
  if (!candidates) return '';
  if (Array.isArray(candidates)) return candidates[0] || '';
  return candidates;
}

/* Media de tarjeta de subcategoría: imagen grande sin recorte + relleno difuminado (sin bandas vacías). */
function _taxonomyCatalogMedia(candidates, altText, iconHtml) {
  const list = (Array.isArray(candidates) ? candidates : [candidates]).filter(Boolean);
  if (!list.length) {
    return iconHtml || `<div class="category-card-media-icon">${_SUBCATEGORY_DEFAULT_ICON}</div>`;
  }
  const first = escapeHtml(list[0]);
  const img = _imgWithFallback(list, altText, 'taxonomy-subcategory-media-img');
  return `<span class="taxonomy-subcategory-media-bg" style="background-image:url('${first}')" aria-hidden="true"></span>${img}`;
}

function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  // Estado: null => mostrar grilla de categorias; numero => mostrar subcategorias de esa categoria
  if (typeof grid._catView === 'undefined') grid._catView = null;

  function renderCategoryGrid() {
    grid.classList.remove('subcategory-view');
    grid.classList.add('category-grid-view', 'taxonomy-view');

    const cards = categorias.map((categoria, catIndex) => {
      const productCount = getCategoryCount(categoria.titulo);
      const brandCount = getCategoryBrandCount(categoria.titulo);
      const catImageCandidates = _lookupByCatTitle(_CATEGORY_IMAGES, categoria.titulo) || [];
      const catIcon = (typeof _CATEGORY_ICONS !== 'undefined' && _lookupByCatTitle(_CATEGORY_ICONS, categoria.titulo)) || (typeof _DEFAULT_CAT_ICON !== 'undefined' ? _DEFAULT_CAT_ICON : '');
      const catDesc = (typeof _CATEGORY_DESCRIPTIONS !== 'undefined' && _lookupByCatTitle(_CATEGORY_DESCRIPTIONS, categoria.titulo))
        || `Explore ${categoria.subcategorias.length} subcategories and find the products you need.`;
      const code = extractCategoryLetter(categoria, catIndex);
      const media = _taxonomyCatalogMedia(
        catImageCandidates,
        categoria.titulo,
        `<div class="category-card-media-icon">${catIcon}</div>`
      );
      const brandTags = getCategoryTopBrands(categoria.titulo, 4);
      const brandTagsHtml = brandTags.length
        ? `<div class="taxonomy-brand-tags">${brandTags.map((b) => `<span class="taxonomy-brand-tag">${escapeHtml(b)}</span>`).join('')}${brandCount > 4 ? `<span class="taxonomy-brand-tag taxonomy-brand-tag--more">+${brandCount - 4}</span>` : ''}</div>`
        : '';

      return `<article class="taxonomy-subcategory-card taxonomy-subcategory-card--catalog" data-cat-index="${catIndex}">
        <button class="taxonomy-subcategory-main" type="button" data-category-open="${catIndex}" aria-label="Open subcategories of ${escapeHtml(categoria.titulo)}">
          <div class="taxonomy-subcategory-copy">
            <span class="taxonomy-subcategory-code taxonomy-subcategory-code--inline">${escapeHtml(code)}</span>
            <h3>${escapeHtml(categoria.titulo)}</h3>
            <p>${escapeHtml(catDesc)}</p>
            <div class="taxonomy-subcategory-stats">
              <span><strong>${productCount}</strong> products</span>
              <span><strong>${brandCount}</strong> brands</span>
              <span><strong>${categoria.subcategorias.length}</strong> subcategories</span>
            </div>
            ${brandTagsHtml}
            <span class="taxonomy-expand-label">Explore category →</span>
          </div>
          <div class="taxonomy-subcategory-media">${media}</div>
        </button>
      </article>`;
    }).join('');

    grid.innerHTML = `<div class="taxonomy-category-view taxonomy-category-view--root">
      <div class="taxonomy-subcategories-head">
        <h4 class="taxonomy-subcategories-title">Explore all categories</h4>
      </div>
      <div class="taxonomy-subcategory-grid taxonomy-subcategory-grid--catalog">${cards}</div>
    </div>`;
    grid._catView = null;
    updateSectionBreadcrumb('categorias');
    updateCatalogNavBar('categorias');
  }

  function renderSubcategoriesFor(catIndex) {
    const categoria = categorias[catIndex];
    if (!categoria) return;
    grid.classList.remove('category-grid-view');
    grid.classList.add('subcategory-view', 'taxonomy-view');
    const productCount = getCategoryCount(categoria.titulo);
    const brandCount = getCategoryBrandCount(categoria.titulo);
    const catImageCandidates = _lookupByCatTitle(_CATEGORY_IMAGES, categoria.titulo) || [];
    const catIcon = (typeof _CATEGORY_ICONS !== 'undefined' && _lookupByCatTitle(_CATEGORY_ICONS, categoria.titulo)) || (typeof _DEFAULT_CAT_ICON !== 'undefined' ? _DEFAULT_CAT_ICON : '');
    const catDesc = (typeof _CATEGORY_DESCRIPTIONS !== 'undefined' && _lookupByCatTitle(_CATEGORY_DESCRIPTIONS, categoria.titulo))
      || `Explore ${categoria.subcategorias.length} subcategories and find the products you need.`;
    const heroMedia = catImageCandidates.length
      ? _imgWithFallback(catImageCandidates, categoria.titulo)
      : `<div class="category-card-media-icon">${catIcon}</div>`;

    const cards = categoria.subcategorias.map((sub, subIndex) => {
      const subCount = getSubcategoryCount(categoria.titulo, sub.subtitulo);
      const subBrands = getSubcategoryBrands(categoria.titulo, sub.subtitulo);
      const itemCount = sub.items?.length || 0;
      const code = extractSubcategoryItemCode(sub);
      const subImgCandidates = _subcategoryImageCandidates(categoria.titulo, sub.subtitulo);
      const subIcon = _iconForSubcategory(sub.subtitulo);
      const media = _taxonomyCatalogMedia(
        subImgCandidates,
        sub.subtitulo,
        `<div class="category-card-media-icon">${subIcon}</div>`
      );
      const brandTags = subBrands.slice(0, 4).map((brand) =>
        `<span class="taxonomy-brand-tag">${escapeHtml(brand)}</span>`
      ).join('');
      const extraBrands = subBrands.length > 4
        ? `<span class="taxonomy-brand-tag taxonomy-brand-tag--more">+${subBrands.length - 4}</span>`
        : '';

      return `<article class="taxonomy-subcategory-card taxonomy-subcategory-card--catalog" data-cat-index="${catIndex}" data-sub-index="${subIndex}">
        <button class="taxonomy-subcategory-main" type="button" data-subcategory-open="${subIndex}" aria-label="Open ${escapeHtml(sub.subtitulo)}">
          <div class="taxonomy-subcategory-copy">
            <span class="taxonomy-subcategory-code taxonomy-subcategory-code--inline">${escapeHtml(code)}</span>
            <h3>${escapeHtml(sub.subtitulo)}</h3>
            <p>${escapeHtml(subcategoryBlurb(sub.subtitulo, itemCount))}</p>
            <div class="taxonomy-subcategory-stats">
              <span><strong>${subCount}</strong> products</span>
              <span><strong>${subBrands.length}</strong> brands</span>
              <span><strong>${itemCount}</strong> types</span>
            </div>
            ${subBrands.length ? `<div class="taxonomy-brand-tags">${brandTags}${extraBrands}</div>` : ''}
            <span class="taxonomy-expand-label">Open subcategory →</span>
          </div>
          <div class="taxonomy-subcategory-media">${media}</div>
        </button>
      </article>`;
    }).join('');

    grid.innerHTML = `
      <div class="taxonomy-category-view">
        <div class="taxonomy-toolbar">
          ${renderTaxonomyBackButton('Back to categories')}
        </div>
        <article class="taxonomy-category-hero">
          <div class="taxonomy-category-hero-media">${heroMedia}</div>
          <div class="taxonomy-category-hero-copy">
            <span class="taxonomy-eyebrow">Active category</span>
            <h3>${escapeHtml(categoria.titulo)}</h3>
            <p>${escapeHtml(catDesc)}</p>
            <div class="taxonomy-hero-meta">
              <span>${productCount} products</span>
              <span>${brandCount} brands</span>
              <span>${categoria.subcategorias.length} subcategories</span>
            </div>
            <button type="button" class="category-view-all-btn" data-cat-index="${catIndex}" data-view-all>Explore products</button>
          </div>
        </article>
        ${renderCatalogNavHtml('categorias')}
        <div class="taxonomy-subcategories-head">
          <h4 class="taxonomy-subcategories-title">Subcategories of ${escapeHtml(categoria.titulo)}</h4>
          <button type="button" class="taxonomy-view-all-subs" data-cat-index="${catIndex}" data-view-all>View all subcategories →</button>
        </div>
        <div class="taxonomy-subcategory-grid taxonomy-subcategory-grid--catalog">${cards}</div>
      </div>`;
    grid._catView = catIndex;
    updateSectionBreadcrumb('categorias');
    updateCatalogNavBar('categorias');
  }
  if (grid._catView === null) renderCategoryGrid();
  else renderSubcategoriesFor(grid._catView);

  if (!grid.dataset.delegated) {
    grid.addEventListener('click', (e) => {
      const backToAll = e.target.closest('[data-back-to-all]');
      if (backToAll) {
        e.preventDefault();
        renderCategoryGrid();
        return;
      }
      const opener = e.target.closest('[data-category-open]');
      if (opener) {
        e.preventDefault();
        renderSubcategoriesFor(Number(opener.dataset.categoryOpen));
        return;
      }
      const back = e.target.closest('[data-category-back]');
      if (back) {
        e.preventDefault();
        renderCategoryGrid();
        return;
      }
      const subOpen = e.target.closest('[data-subcategory-open]');
      if (subOpen) {
        e.preventDefault();
        const card = subOpen.closest('[data-cat-index]');
        const ci = +card.dataset.catIndex;
        const si = +subOpen.dataset.subcategoryOpen;
        const cat = categorias[ci];
        const sub = cat && cat.subcategorias[si];
        if (cat && sub) {
          showSubcategoria(sub.subtitulo);
        }
        return;
      }
      const viewAll = e.target.closest('[data-view-all]');
      if (viewAll) {
        e.preventDefault();
        const ci = +viewAll.dataset.catIndex;
        const cat = categorias[ci];
        if (!cat) return;
        activeFilters.category = cat.titulo;
        activeFilters.subcategory = null;
        activeFilters.search = '';
        activeFilters.itemCode = null;
        currentPage = 1;
        applyFilters();
        updateProductsTitle();
        showSection('productos');
        return;
      }
    });
    grid.dataset.delegated = '1';
  }
}


/* ---------- Modal subcategoria (PREMIUM) ---------- */
function openSubcategoryModal(categoria, subcategoria) {
  closeSubcategoryModal();
  const subCount = getSubcategoryCount(categoria.titulo, subcategoria.subtitulo);
  const maxItems = 50;
  const items = (subcategoria.items || []).slice(0, maxItems);
  const totalItems = subcategoria.items ? subcategoria.items.length : 0;

  const itemsHtml = items.map(item => {
    const parts = String(item || '').split(' - ');
    const itemName = parts[0] || item;
    const itemCode = parts[1] || '';
    return `<div class="modal-item" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(subcategoria.subtitulo)}" data-item="${encodeURIComponent(item)}">` +
      `<div class="modal-item-content"><span class="modal-item-name">${escapeHtml(itemName)}</span>${itemCode ? `<span class="modal-item-code">${escapeHtml(itemCode)}</span>` : ''}</div>` +
      `<button class="modal-item-btn" type="button">Ver<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="m9 18 6-6-6-6"/></svg></button></div>`;
  }).join('');

  const more = totalItems > maxItems
    ? `<p style="text-align:center;color:#64748b;font-size:.85rem;margin-top:1rem;">${totalItems - maxItems} items mas disponibles - usa la busqueda para filtrar</p>`
    : '';

  const modalHtml = `<div class="subcategory-modal-overlay" id="subcategoryModalOverlay" role="dialog" aria-modal="true">
    <div class="subcategory-modal">
      <div class="subcategory-modal-header">
        <div class="subcategory-modal-title-area">
          <span class="subcategory-modal-category">${escapeHtml(categoria.titulo)}</span>
          <h2 class="subcategory-modal-title">${escapeHtml(subcategoria.subtitulo)}</h2>
          <span class="subcategory-modal-count">${subCount} productos disponibles</span>
        </div>
        <button class="subcategory-modal-close" type="button" aria-label="Cerrar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      </div>
      <div class="subcategory-modal-body">
        <p class="subcategory-modal-subtitle">Selecciona un item para ver sus productos:</p>
        <div class="subcategory-modal-items">${itemsHtml}</div>
        ${more}
        <button class="subcategory-modal-view-all" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(subcategoria.subtitulo)}">
          Ver todos los productos de ${escapeHtml(subcategoria.subtitulo)}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>
    </div>
  </div>`;

  document.body.insertAdjacentHTML('beforeend', modalHtml);
  document.body.style.overflow = 'hidden';
  const modal = document.getElementById('subcategoryModalOverlay');
  requestAnimationFrame(() => modal.classList.add('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) return closeSubcategoryModal();
    if (e.target.closest('.subcategory-modal-close')) return closeSubcategoryModal();
    const viewAll = e.target.closest('.subcategory-modal-view-all');
    if (viewAll) {
      closeSubcategoryModal();
      activeFilters.category = viewAll.dataset.category;
      activeFilters.subcategory = viewAll.dataset.subcategory;
      activeFilters.search = ''; activeFilters.itemCode = null; currentPage = 1;
      applyFilters(); updateProductsTitle(); showSection('productos');
      return;
    }
    const item = e.target.closest('.modal-item');
    if (item) {
      const itemRaw = decodeURIComponent(item.dataset.item || '');
      const parts = itemRaw.split(' - ');
      const codigoItem = (parts[1] || extractItemCode(itemRaw) || '').trim();
      closeSubcategoryModal();
      showProductsForSubcategory(item.dataset.subcategory, item.dataset.category, '', codigoItem);
    }
  });
  document.addEventListener('keydown', handleModalEscape);
}
function handleModalEscape(e) { if (e.key === 'Escape') closeSubcategoryModal(); }
function closeSubcategoryModal() {
  const modal = document.getElementById('subcategoryModalOverlay');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = '';
  document.removeEventListener('keydown', handleModalEscape);
  setTimeout(() => modal.remove(), 220);
}




/* ---------- Navbar categorías (delegación + diferido) ---------- */
function renderNavbarCategories() {
  const categoryList = document.getElementById('categoryList');
  if (!categoryList) return;
  const parts = [];
  for (const categoria of categorias) {
    const subs = [];
    for (const sub of categoria.subcategorias) {
      const items = [];
      for (const item of (sub.items || [])) {
        const nombreVisible = item.split(' - ')[0].trim();
        items.push(`<li class="item-entry"><button class="nav-item-btn" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(sub.subtitulo)}" data-item="${encodeURIComponent(item)}">${escapeHtml(nombreVisible)}</button></li>`);
      }
      subs.push(`<li class="subcategory-wrapper"><button class="nav-subcategory-btn" type="button" data-category="${escapeHtml(categoria.titulo)}" data-subcategory="${escapeHtml(sub.subtitulo)}">${escapeHtml(sub.subtitulo)}</button>${items.length ? `<ul class="items-list">${items.join('')}</ul>` : ''}</li>`);
    }
    parts.push(`<li class="category-item"><span>${escapeHtml(categoria.titulo)}</span><ul class="subcategory-list">${subs.join('')}</ul></li>`);
  }
  categoryList.innerHTML = parts.join('');

  if (!categoryList.dataset.delegated) {
    categoryList.addEventListener('click', (e) => {
      const itemBtn = e.target.closest('.nav-item-btn');
      if (itemBtn) {
        e.stopPropagation();
        const itemRaw = decodeURIComponent(itemBtn.dataset.item);
        const itemCode = (itemRaw.split(' - ')[1] || extractItemCode(itemRaw) || '').trim();
        showProductsForSubcategory(itemBtn.dataset.subcategory, itemBtn.dataset.category, '', itemCode);
        return;
      }
      const subBtn = e.target.closest('.nav-subcategory-btn');
      if (subBtn) {
        e.stopPropagation();
        showSubcategoria(subBtn.dataset.subcategory);
        activeFilters.category = subBtn.dataset.category;
        activeFilters.subcategory = subBtn.dataset.subcategory;
        applyFilters(); updateProductsTitle();
      }
    });
    categoryList.dataset.delegated = '1';
  }
}

/* ---------- Brands — Brand Intelligence ---------- */
let brandMetaCache = null;
let brandDashboardReady = false;
let brandFilterState = {
  search: '',
  statuses: new Set(),
  countries: new Set(),
  categories: new Set(),
  minProducts: 0,
  maxProducts: Infinity,
};
let brandMaxProductCount = 0;
let brandActiveLetter = null;
const BRAND_VIEW_GRID = 'grid';
const BRAND_VIEW_LIST = 'list';
let brandViewMode = BRAND_VIEW_GRID;
try {
  const savedBrandView = localStorage.getItem('ingproBrandView');
  if (savedBrandView === BRAND_VIEW_GRID || savedBrandView === BRAND_VIEW_LIST) brandViewMode = savedBrandView;
} catch (_) {}

function syncBrandViewToggleButtons() {
  document.querySelectorAll('[data-brand-view]').forEach((btn) => {
    const isActive = btn.dataset.brandView === brandViewMode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
}

function applyBrandViewMode() {
  const section = document.getElementById('marcasSection');
  if (section) {
    section.classList.toggle('bi-view-grid', brandViewMode === BRAND_VIEW_GRID);
    section.classList.toggle('bi-view-list', brandViewMode === BRAND_VIEW_LIST);
  }
  syncBrandViewToggleButtons();
}

function setBrandViewMode(mode) {
  if (mode !== BRAND_VIEW_GRID && mode !== BRAND_VIEW_LIST) return;
  if (brandViewMode === mode) return;
  brandViewMode = mode;
  try { localStorage.setItem('ingproBrandView', mode); } catch (_) {}
  applyBrandViewMode();
  refreshBrandResultsView();
}

function shouldShowMarcasHero(sectionId) {
  return sectionId === 'marcas';
}

function getBrandLetter(name) {
  const letter = (name || '').charAt(0).toUpperCase();
  return /[A-Z]/.test(letter) ? letter : '#';
}

function groupEntriesByLetter(entries) {
  const groups = {};
  for (const entry of entries) {
    const letter = getBrandLetter(entry.brand.name);
    (groups[letter] ||= []).push(entry);
  }
  for (const letter of Object.keys(groups)) {
    groups[letter].sort((a, b) => a.brand.name.localeCompare(b.brand.name, 'en'));
  }
  return groups;
}

function getAvailableBrandLetters(groups) {
  return Object.keys(groups).sort((a, b) => (a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b)));
}

function resolveBrandActiveLetter(filtered, reset = false) {
  const groups = groupEntriesByLetter(filtered);
  const available = getAvailableBrandLetters(groups);
  if (!available.length) {
    brandActiveLetter = null;
    return { letter: null, groups, available };
  }
  if (reset) {
    brandActiveLetter = null;
  } else if (brandActiveLetter && !groups[brandActiveLetter]) {
    brandActiveLetter = null;
  }
  return { letter: brandActiveLetter, groups, available };
}

function navigateBrandLetter(direction, filtered) {
  const { available } = resolveBrandActiveLetter(filtered);
  if (!available.length) return;
  const idx = brandActiveLetter ? available.indexOf(brandActiveLetter) : -1;
  if (direction === 'prev' && idx > 0) brandActiveLetter = available[idx - 1];
  if (direction === 'next' && idx < available.length - 1) brandActiveLetter = available[idx + 1];
}

function guessBrandLogoUrl(name) {
  const slug = normalizeText(name).replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '');
  return slug ? `https://ingprosuppliers.com/imagenes/logos/${slug}.png` : null;
}

function resolveBrandLogo(brand) {
  if (brand.logo) return brand.logo;
  return guessBrandLogoUrl(brand.name);
}

function renderBrandLogoHtml(brand, className) {
  const logo = resolveBrandLogo(brand);
  const color = brand.color || '#004be4';
  const initials = escapeHtml(brand.name.substring(0, 2).toUpperCase());
  if (logo) {
    return `<div class="${className}"><img src="${logo}" alt="${escapeHtml(brand.name)}" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'bi-card-avatar\\' style=\\'background:${color}\\'>${initials}</div>'"></div>`;
  }
  return `<div class="${className}"><div class="bi-card-avatar" style="background:${color}">${initials}</div></div>`;
}

function buildBrandMetaCache() {
  const byId = {};
  const byNorm = {};
  for (const brand of brands) {
    const base = { categories: new Set(), families: new Set(), productCount: 0 };
    byId[brand.id] = base;
    byNorm[normalizeText(brand.name)] = base;
  }
  for (const p of allProducts) {
    let meta = byId[p.brand];
    if (!meta && p._brandNorm) meta = byNorm[p._brandNorm];
    if (!meta) continue;
    meta.productCount++;
    for (const cat of p._catKeys) meta.categories.add(cat);
    for (const bk of p._buckets) meta.families.add(bk);
  }
  brandMetaCache = { byId, byNorm };
}

function getBrandMeta(brand) {
  if (!brandMetaCache) buildBrandMetaCache();
  return brandMetaCache.byId[brand.id]
    || brandMetaCache.byNorm[normalizeText(brand.name)]
    || { categories: new Set(), families: new Set(), productCount: 0 };
}

function getBrandProductCount(brand) {
  const meta = getBrandMeta(brand);
  return meta.productCount
    || brandCountByNameNorm[normalizeText(brand.name)]
    || brandCountCache[brand.id]
    || 0;
}

function getBrandStatus(brand, count, featuredThreshold) {
  if (count >= featuredThreshold) return 'destacada';
  if (resolveBrandLogo(brand)) return 'certificada';
  return 'oem';
}

const BRAND_STATUS_LABELS = {
  destacada: 'Featured',
  certificada: 'Certified',
  oem: 'OEM',
};

function getBrandEntries() {
  const entries = [];
  for (const brand of brands) {
    const count = getBrandProductCount(brand);
    if (count <= 0) continue;
    const meta = getBrandMeta(brand);
    entries.push({
      brand,
      count,
      categories: [...meta.categories],
      families: meta.families.size,
      country: countries.find(c => c.id === brand.country) || null,
    });
  }
  entries.sort((a, b) => a.brand.name.localeCompare(b.brand.name, 'en'));
  return entries;
}

function computeFeaturedThreshold(entries) {
  if (!entries.length) return 999999;
  const sorted = [...entries].sort((a, b) => b.count - a.count);
  const idx = Math.min(4, sorted.length - 1);
  return Math.max(sorted[idx].count, 15);
}

function filterBrandEntries(entries, featuredThreshold) {
  const f = brandFilterState;
  const search = f.search.trim().toLowerCase();
  return entries.filter(entry => {
    const { brand, count, categories } = entry;
    if (search && !brand.name.toLowerCase().includes(search)) return false;
    if (count < f.minProducts || count > f.maxProducts) return false;
    if (f.countries.size && (!brand.country || !f.countries.has(brand.country))) return false;
    if (f.categories.size && !categories.some(c => f.categories.has(c))) return false;
    if (f.statuses.size) {
      const status = getBrandStatus(brand, count, featuredThreshold);
      if (!f.statuses.has(status)) return false;
    }
    return true;
  });
}

function shortCategoryLabel(cat) {
  const map = {
    'Detection - Measurement (A)': 'Detection & Measurement',
    'METROLOGY - LABORATORY ( B )': 'Metrology',
    'ROBOTICS - AUTOMATION - INDUSTRIAL IT ( C )': 'Robotics',
    'Electricity - Electronics (D)': 'Electrical',
    'Power Transmission - Mechanical components (E)': 'Power Transmission',
    'Hydraulics - Pneumatics ( F)': 'Hydraulics',
    'MATERIALS - TOOLS - COMPONENTS ( G)': 'Materials',
    'MACHINE-TOOLS (H)': 'Machine Tools',
    'PRODUCTION MACHINES ( I )': 'Production',
    'INDUSTRIAL MACHINES AND EQUIPMENT ( J )': 'Machinery',
    'FOOD INDUSTRY ( K )': 'Food Industry',
    'Logistics - Transport - Handling ( L )': 'Logistics',
    'Health - Safety - Environment ( M )': 'Safety',
    'Building - Construction ( N )': 'Construction',
    'SMALL FARM EQUIPMENT ( O )': 'Farm Equipment',
    'SERVICES ( Z )': 'Services',
  };
  return map[cat] || String(cat || '').replace(/\(\s*[A-Z]\s*\)/g, '').trim();
}

function brandDescription(entry) {
  const cats = entry.categories.slice(0, 2).map(shortCategoryLabel).join(', ');
  const countryName = entry.country ? entry.country.name : 'international origin';
  if (cats) return `${countryName} manufacturer with presence in ${cats.toLowerCase()}.`;
  return `${countryName} manufacturer in the industrial catalog.`;
}

function renderBrandStats(filtered, allEntries) {
  const totalProducts = filtered.reduce((s, e) => s + e.count, 0);
  const countrySet = new Set(filtered.map(e => e.brand.country).filter(Boolean));
  const familySet = new Set();
  for (const e of filtered) {
    const meta = getBrandMeta(e.brand);
    for (const f of meta.families) familySet.add(f);
  }
  const coverage = allEntries.length
    ? Math.round((filtered.length / allEntries.length) * 100)
    : 0;
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('biStatBrands', filtered.length);
  set('biStatProducts', totalProducts);
  set('biStatCountries', countrySet.size);
  set('biStatFamilies', familySet.size);
  set('biStatCoverage', `${coverage}%`);
}

function renderBrandFeaturedCards(filtered, featuredThreshold) {
  const grid = document.getElementById('brandFeaturedGrid');
  if (!grid) return;
  const top = [...filtered].sort((a, b) => b.count - a.count).slice(0, 5);
  if (!top.length) {
    grid.innerHTML = '<p class="bi-section-desc">No manufacturers match the selected filters.</p>';
    return;
  }
  grid.innerHTML = top.map(entry => renderBrandCardHtml(entry, featuredThreshold)).join('');
}

function renderBrandCardHtml(entry, featuredThreshold) {
  const { brand, count, categories, families, country } = entry;
  const tags = categories.slice(0, 3).map(c => `<span class="bi-tag">${escapeHtml(shortCategoryLabel(c))}</span>`).join('');
  return `<article class="bi-featured-card" data-brand="${brand.id}" tabindex="0">` +
    renderBrandLogoHtml(brand, 'bi-card-logo') +
    `<h4 class="bi-card-name">${escapeHtml(brand.name)}</h4>` +
    `<div class="bi-card-country">${country ? `<span>${country.flag}</span><span>${escapeHtml(country.name)}</span>` : '<span>—</span>'}</div>` +
    `<p class="bi-card-desc">${escapeHtml(brandDescription(entry))}</p>` +
    `<div class="bi-card-metrics">` +
    `<div class="bi-card-metric"><strong>${count}</strong><span>Products</span></div>` +
    `<div class="bi-card-metric"><strong>${families}</strong><span>Families</span></div>` +
    `<div class="bi-card-metric"><strong>${categories.length || 1}</strong><span>Categories</span></div>` +
    `</div>` +
    `<div class="bi-card-tags">${tags}</div>` +
    `<button class="bi-card-action" type="button" data-brand="${brand.id}">Explore brand →</button>` +
    `</article>`;
}

function getBrandPageEntries(filtered, activeLetter, groups) {
  if (!filtered.length) return [];
  if (activeLetter && groups[activeLetter]) return groups[activeLetter];
  return filtered;
}

function renderBrandResultsGrid(filtered, featuredThreshold, activeLetter, groups) {
  const grid = document.getElementById('brandResultsGrid');
  const countEl = document.getElementById('brandResultsCount');
  const pageEntries = getBrandPageEntries(filtered, activeLetter, groups);
  if (countEl) {
    countEl.textContent = activeLetter
      ? `${pageEntries.length} brands for "${activeLetter}" · ${filtered.length} total`
      : `${filtered.length} brands found`;
  }
  if (!grid) return;
  if (!filtered.length) {
    grid.innerHTML = '<p class="bi-section-desc">No results for the selected filters.</p>';
    return;
  }
  if (!pageEntries.length) {
    grid.innerHTML = '<p class="bi-section-desc">No brands for this letter with the current filters.</p>';
    return;
  }
  grid.innerHTML = pageEntries.map(entry => renderBrandCardHtml(entry, featuredThreshold)).join('');
}

function renderBrandResultsTable(filtered, featuredThreshold, activeLetter, groups) {
  const body = document.getElementById('brandResultsBody');
  const countEl = document.getElementById('brandResultsCount');
  const pageEntries = getBrandPageEntries(filtered, activeLetter, groups);
  if (countEl) {
    countEl.textContent = activeLetter
      ? `${pageEntries.length} brands for "${activeLetter}" · ${filtered.length} total`
      : `${filtered.length} brands found`;
  }
  if (!body) return;
  if (!filtered.length) {
    body.innerHTML = '<tr><td colspan="5" style="padding:24px;text-align:center;color:#6b8cb8;">No results for the selected filters.</td></tr>';
    return;
  }
  if (!pageEntries.length) {
    body.innerHTML = '<tr><td colspan="5" style="padding:24px;text-align:center;color:#6b8cb8;">No brands for this letter with the current filters.</td></tr>';
    return;
  }
  body.innerHTML = pageEntries.map(entry => {
    const { brand, count, categories, country } = entry;
    const status = getBrandStatus(brand, count, featuredThreshold);
    const anchor = getBrandLetter(brand.name);
    const tags = categories.slice(0, 4).map(c => `<span class="bi-tag">${escapeHtml(shortCategoryLabel(c))}</span>`).join('');
    return `<tr class="bi-row-anchor" id="brand-row-${brand.id}" data-brand="${brand.id}" data-letter="${anchor}">` +
      `<td><div class="bi-table-brand">${renderBrandLogoHtml(brand, 'bi-table-logo')}<span class="bi-table-name">${escapeHtml(brand.name)}</span></div></td>` +
      `<td><div class="bi-table-country">${country ? `<span>${country.flag}</span><span>${escapeHtml(country.name)}</span>` : '—'}</div></td>` +
      `<td class="bi-table-products">${count}</td>` +
      `<td><div class="bi-table-tags">${tags || '<span class="bi-tag">General</span>'}</div></td>` +
      `<td><span class="bi-status bi-status--${status}">${BRAND_STATUS_LABELS[status]}</span></td>` +
      `</tr>`;
  }).join('');
}

function renderBrandLetterPagination(filtered, activeLetter, groups, available) {
  const nav = document.getElementById('brandLetterPagination');
  const meta = document.getElementById('brandLetterMeta');
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
  const pageCount = activeLetter && groups[activeLetter] ? groups[activeLetter].length : filtered.length;
  const activeIdx = activeLetter ? available.indexOf(activeLetter) : -1;

  if (nav) {
    if (!filtered.length) {
      nav.innerHTML = '';
    } else {
      nav.innerHTML =
        `<button class="bi-letter-nav" type="button" data-letter-nav="prev" aria-label="Previous letter" ${activeIdx > 0 ? '' : 'disabled'}>‹</button>` +
        `<div class="bi-letter-track" role="tablist" aria-label="Letters">` +
        allLetters.map(letter => {
          const count = groups[letter]?.length || 0;
          const isActive = letter === activeLetter;
          return `<button class="bi-letter-page-btn${isActive ? ' active' : ''}${count ? '' : ' is-empty'}" type="button" role="tab" data-letter="${letter}" aria-selected="${isActive}" ${count ? '' : 'disabled'}>` +
            `<span class="bi-letter-char">${letter === '#' ? '#' : letter}</span>` +
            (count ? `<span class="bi-letter-count">${count}</span>` : '') +
            `</button>`;
        }).join('') +
        `</div>` +
        `<button class="bi-letter-nav" type="button" data-letter-nav="next" aria-label="Next letter" ${activeIdx >= 0 && activeIdx < available.length - 1 ? '' : 'disabled'}>›</button>`;
    }
  }

  if (meta) {
    if (!filtered.length) {
      meta.textContent = '';
    } else if (!activeLetter) {
      meta.textContent = `Showing ${filtered.length} brand${filtered.length === 1 ? '' : 's'} · Select a letter to filter`;
    } else {
      meta.textContent = `Showing ${pageCount} brand${pageCount === 1 ? '' : 's'} for letter "${activeLetter}" · ${filtered.length} total`;
    }
  }
}

function renderBrandAlphaIndex(filtered, activeLetter, groups) {
  const nav = document.getElementById('brandAlphaIndex');
  if (!nav) return;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
  nav.innerHTML = letters.map(letter => {
    const count = groups[letter]?.length || 0;
    const isActive = letter === activeLetter;
    return `<button class="bi-alpha-btn${isActive ? ' active' : ''}" type="button" data-letter="${letter}" title="${count ? count + ' brands' : 'No brands'}" ${count ? '' : 'disabled'}>${letter === '#' ? '#' : letter}</button>`;
  }).join('');
}

function renderBrandFilterOptions(allEntries, featuredThreshold) {
  const statusCounts = { destacada: 0, certificada: 0, oem: 0 };
  const countryCounts = {};
  const categoryCounts = {};
  for (const entry of allEntries) {
    const st = getBrandStatus(entry.brand, entry.count, featuredThreshold);
    statusCounts[st]++;
    if (entry.brand.country) countryCounts[entry.brand.country] = (countryCounts[entry.brand.country] || 0) + 1;
    for (const c of entry.categories) categoryCounts[c] = (categoryCounts[c] || 0) + 1;
  }
  const statusEl = document.getElementById('brandStatusFilters');
  if (statusEl) {
    statusEl.innerHTML = Object.entries(BRAND_STATUS_LABELS).map(([key, label]) =>
      `<label class="bi-filter-check"><input type="checkbox" data-brand-filter="status" value="${key}"><span>${label}</span><span class="bi-filter-count">${statusCounts[key] || 0}</span></label>`
    ).join('');
  }
  const countryEl = document.getElementById('brandCountryFilters');
  if (countryEl) {
    const sorted = countries.filter(c => countryCounts[c.id]).sort((a, b) => (countryCounts[b.id] || 0) - (countryCounts[a.id] || 0));
    countryEl.innerHTML = sorted.map(c =>
      `<label class="bi-filter-check"><input type="checkbox" data-brand-filter="country" value="${c.id}"><span><span class="bi-filter-flag">${c.flag}</span> ${escapeHtml(c.name)}</span><span class="bi-filter-count">${countryCounts[c.id] || 0}</span></label>`
    ).join('');
  }
  const catEl = document.getElementById('brandCategoryFilters');
  if (catEl) {
    const sortedCats = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
    catEl.innerHTML = sortedCats.map(([cat, n]) =>
      `<label class="bi-filter-check"><input type="checkbox" data-brand-filter="category" value="${escapeHtml(cat)}"><span>${escapeHtml(shortCategoryLabel(cat))}</span><span class="bi-filter-count">${n}</span></label>`
    ).join('');
  }
  brandMaxProductCount = allEntries.reduce((m, e) => Math.max(m, e.count), 0);
  const minR = document.getElementById('brandProductRangeMin');
  const maxR = document.getElementById('brandProductRangeMax');
  if (minR && maxR) {
    minR.max = brandMaxProductCount;
    maxR.max = brandMaxProductCount;
    minR.value = brandFilterState.minProducts;
    maxR.value = brandFilterState.maxProducts === Infinity ? brandMaxProductCount : brandFilterState.maxProducts;
    updateBrandRangeLabels();
  }
}

function updateBrandRangeLabels() {
  const minR = document.getElementById('brandProductRangeMin');
  const maxR = document.getElementById('brandProductRangeMax');
  const minL = document.getElementById('brandRangeMinLabel');
  const maxL = document.getElementById('brandRangeMaxLabel');
  if (!minR || !maxR) return;
  let minVal = parseInt(minR.value, 10) || 0;
  let maxVal = parseInt(maxR.value, 10) || brandMaxProductCount;
  if (minVal > maxVal) { const t = minVal; minVal = maxVal; maxVal = t; minR.value = minVal; maxR.value = maxVal; }
  if (minL) minL.textContent = String(minVal);
  if (maxL) maxL.textContent = maxVal >= brandMaxProductCount ? `${maxVal}+` : String(maxVal);
}

function readBrandFiltersFromUI() {
  brandFilterState.search = (document.getElementById('brandSearchInput')?.value || '').trim();
  brandFilterState.statuses = new Set([...document.querySelectorAll('[data-brand-filter="status"]:checked')].map(el => el.value));
  brandFilterState.countries = new Set([...document.querySelectorAll('[data-brand-filter="country"]:checked')].map(el => el.value));
  brandFilterState.categories = new Set([...document.querySelectorAll('[data-brand-filter="category"]:checked')].map(el => el.value));
  const minR = document.getElementById('brandProductRangeMin');
  const maxR = document.getElementById('brandProductRangeMax');
  brandFilterState.minProducts = minR ? parseInt(minR.value, 10) || 0 : 0;
  brandFilterState.maxProducts = maxR ? parseInt(maxR.value, 10) || brandMaxProductCount : Infinity;
}

function hasBrandRefinementFilters(activeLetter) {
  if (activeLetter) return true;
  const f = brandFilterState;
  if (f.search) return true;
  if (f.statuses.size || f.countries.size || f.categories.size) return true;
  if (f.minProducts > 0) return true;
  if (brandMaxProductCount && f.maxProducts < brandMaxProductCount) return true;
  return false;
}

function updateBrandFeaturedVisibility(activeLetter) {
  document.querySelector('#marcasSection .bi-featured')
    ?.classList.toggle('hidden', hasBrandRefinementFilters(activeLetter));
}

function clearBrandFiltersUI() {
  brandFilterState = { search: '', statuses: new Set(), countries: new Set(), categories: new Set(), minProducts: 0, maxProducts: Infinity };
  brandActiveLetter = null;
  const search = document.getElementById('brandSearchInput');
  if (search) search.value = '';
  document.querySelectorAll('[data-brand-filter]').forEach(el => { el.checked = false; });
  const minR = document.getElementById('brandProductRangeMin');
  const maxR = document.getElementById('brandProductRangeMax');
  if (minR) minR.value = 0;
  if (maxR) maxR.value = brandMaxProductCount;
  updateBrandRangeLabels();
}

function navigateToBrandProducts(brandId) {
  activeFilters.brand = brandId;
  applyFilters();
  showSection('productos');
  const b = brands.find(x => x.id === brandId);
  const t = document.getElementById('productsTitle');
  if (t && b) t.textContent = `Products ${b.name}`;
}

function refreshBrandDashboard(resetLetter = false) {
  buildBrandMetaCache();
  const allEntries = getBrandEntries();
  const featuredThreshold = computeFeaturedThreshold(allEntries);
  if (!brandDashboardReady) {
    renderBrandFilterOptions(allEntries, featuredThreshold);
    brandDashboardReady = true;
  }
  readBrandFiltersFromUI();
  const filtered = filterBrandEntries(allEntries, featuredThreshold);
  const { letter, groups, available } = resolveBrandActiveLetter(filtered, resetLetter);
  renderBrandStats(filtered, allEntries);
  renderBrandFeaturedCards(filtered, featuredThreshold);
  renderBrandLetterPagination(filtered, letter, groups, available);
  renderBrandResultsTable(filtered, featuredThreshold, letter, groups);
  renderBrandResultsGrid(filtered, featuredThreshold, letter, groups);
  renderBrandAlphaIndex(filtered, letter, groups);
  updateBrandFeaturedVisibility(letter);
  document.getElementById('brandResultsTable')?.closest('.bi-table-wrap')?.scrollTo?.({ top: 0, behavior: 'smooth' });
}

function refreshBrandResultsView() {
  buildBrandMetaCache();
  const allEntries = getBrandEntries();
  const featuredThreshold = computeFeaturedThreshold(allEntries);
  readBrandFiltersFromUI();
  const filtered = filterBrandEntries(allEntries, featuredThreshold);
  const { letter, groups, available } = resolveBrandActiveLetter(filtered);
  renderBrandLetterPagination(filtered, letter, groups, available);
  renderBrandResultsTable(filtered, featuredThreshold, letter, groups);
  renderBrandResultsGrid(filtered, featuredThreshold, letter, groups);
  renderBrandAlphaIndex(filtered, letter, groups);
  updateBrandFeaturedVisibility(letter);
  document.getElementById('brandResultsTable')?.closest('.bi-table-wrap')?.scrollTo?.({ top: 0, behavior: 'smooth' });
}

function initBrandDashboardEvents() {
  const section = document.getElementById('marcasSection');
  if (!section || section.dataset.biInit) return;
  section.dataset.biInit = '1';

  document.getElementById('brandApplyFilters')?.addEventListener('click', () => refreshBrandDashboard(true));
  document.getElementById('brandClearFilters')?.addEventListener('click', () => {
    clearBrandFiltersUI();
    refreshBrandDashboard(true);
  });
  document.getElementById('brandSearchInput')?.addEventListener('input', () => {
    brandFilterState.search = document.getElementById('brandSearchInput').value.trim();
    brandActiveLetter = null;
    refreshBrandDashboard(true);
  });
  document.getElementById('brandProductRangeMin')?.addEventListener('input', updateBrandRangeLabels);
  document.getElementById('brandProductRangeMax')?.addEventListener('input', updateBrandRangeLabels);

  section.addEventListener('click', (e) => {
    const viewBtn = e.target.closest('[data-brand-view]');
    if (viewBtn?.dataset.brandView) {
      setBrandViewMode(viewBtn.dataset.brandView);
      return;
    }
    const brandTarget = e.target.closest('[data-brand]');
    if (brandTarget?.dataset.brand) {
      navigateToBrandProducts(brandTarget.dataset.brand);
      return;
    }
    const letterBtn = e.target.closest('.bi-letter-page-btn, .bi-alpha-btn');
    if (letterBtn && !letterBtn.disabled && letterBtn.dataset.letter) {
      brandActiveLetter = letterBtn.dataset.letter;
      refreshBrandResultsView();
      return;
    }
    const letterNav = e.target.closest('[data-letter-nav]');
    if (letterNav && !letterNav.disabled) {
      buildBrandMetaCache();
      const allEntries = getBrandEntries();
      const featuredThreshold = computeFeaturedThreshold(allEntries);
      const filtered = filterBrandEntries(allEntries, featuredThreshold);
      navigateBrandLetter(letterNav.dataset.letterNav, filtered);
      refreshBrandResultsView();
    }
  });

  section.addEventListener('keydown', (e) => {
    const card = e.target.closest('.bi-featured-card');
    if (card && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      navigateToBrandProducts(card.dataset.brand);
    }
  });

  const dropdown = document.getElementById('brandsDropdown');
  if (dropdown && !dropdown.dataset.delegated) {
    dropdown.addEventListener('click', (e) => {
      const link = e.target.closest('.brand-link');
      if (!link) return;
      e.preventDefault();
      navigateToBrandProducts(link.dataset.brand);
    });
    dropdown.dataset.delegated = '1';
  }
}

function renderBrands() {
  initBrandDashboardEvents();
  applyBrandViewMode();
  brandMetaCache = null;
  brandActiveLetter = null;
  refreshBrandDashboard(true);

  const grid = document.getElementById('brandsGrid');
  const dropdown = document.getElementById('brandsDropdown');
  if (!grid && !dropdown) return;

  const entries = getBrandEntries();
  const grouped = {};
  for (const e of entries) {
    const letter = getBrandLetter(e.brand.name);
    (grouped[letter] ||= []).push(e);
  }
  const letters = Object.keys(grouped).sort((a, b) => a === '#' ? 1 : b === '#' ? -1 : a.localeCompare(b));

  if (grid) {
    grid.innerHTML = letters.map(letter => {
      const brandsHtml = grouped[letter].map(({ brand, count }) =>
        `<button class="brand-list-item" data-brand="${brand.id}" type="button" style="--brand-color:${brand.color || '#1d4ed8'};">` +
        `<div class="brand-list-media">${resolveBrandLogo(brand) ? `<img class="brand-list-image" src="${resolveBrandLogo(brand)}" alt="${escapeHtml(brand.name)}" loading="lazy">` : `<div class="brand-list-avatar" style="background:${brand.color || '#1d4ed8'}">${escapeHtml(brand.name.substring(0, 2).toUpperCase())}</div>`}</div>` +
        `<div class="brand-list-text"><span class="brand-list-name">${escapeHtml(brand.name)}</span><span class="brand-list-count">${count} products</span></div></button>`
      ).join('');
      return `<details class="brand-letter-group" open><summary class="brand-letter-title">${letter}</summary><div class="brand-letter-list">${brandsHtml}</div></details>`;
    }).join('');
  }

  if (dropdown) {
    dropdown.innerHTML = letters.map(letter => {
      const links = grouped[letter].map(({ brand, count }) => `<button class="brand-link" data-brand="${brand.id}" type="button">${escapeHtml(brand.name)} (${count})</button>`).join('');
      return `<details class="brand-dropdown-group" open><summary>${letter}</summary><div class="brand-dropdown-links">${links}</div></details>`;
    }).join('');
  }
}

/* ---------- Sidebar filtros ---------- */
function renderSidebarFilters() {
  if (typeof updateSidebarActiveState !== 'undefined') updateSidebarActiveState._dirty = true;

  const ind = document.getElementById('sidebarIndustries');
  if (ind && typeof INDUSTRIES !== 'undefined') {
    ind.innerHTML = INDUSTRIES.map((industry) => {
      const count = industryCountCache[industry.id] || 0;
      const label = typeof getIndustryLabel === 'function'
        ? getIndustryLabel(industry, true)
        : industry.en;
      const icon = typeof getIndustryIconClass === 'function'
        ? getIndustryIconClass(industry)
        : 'fa-industry';
      return (
        `<div class="filter-option${count ? '' : ' filter-option--empty'}" data-filter="industry" data-value="${industry.id}">` +
        `<span class="filter-option-flag"><i class="fa-solid ${icon}"></i></span>` +
        `<span>${escapeHtml(label)}</span>` +
        `<span class="filter-option-count">${count}</span></div>`
      );
    }).join('');
  }

  const cc = document.getElementById('sidebarCountries');
  if (cc) {
    const parts = [];
    for (const country of countries) {
      const count = countryCountCache[country.id] || 0;
      parts.push(`<div class="filter-option${count ? '' : ' filter-option--empty'}" data-filter="country" data-value="${country.id}"><span class="filter-option-flag">${country.flag}</span><span>${escapeHtml(country.name)}</span><span class="filter-option-count">${count}</span></div>`);
    }
    cc.innerHTML = parts.join('');
  }
  const cat = document.getElementById('sidebarCategories');
  if (cat) {
    cat.innerHTML = categorias.map(c =>
      `<div class="filter-option" data-filter="category" data-value="${escapeHtml(c.titulo)}"><span></span><span>${escapeHtml(c.titulo)}</span><span class="filter-option-count">${getCategoryCount(c.titulo)}</span></div>`
    ).join('');
  }
  const bc = document.getElementById('sidebarBrands');
  if (bc) {
    bc.innerHTML = brands.map(b => {
      const count = brandCountCache[b.id] || brandCountByNameNorm[normalizeText(b.name)] || 0;
      return `<div class="filter-option" data-filter="brand" data-value="${b.id}"><span style="width:20px;height:20px;background:${b.color};border-radius:4px;display:inline-block;"></span><span>${escapeHtml(b.name)}</span><span class="filter-option-count">${count}</span></div>`;
    }).join('');
  }
  // Delegación UNA sola vez en document para .filter-option
  if (!document._filterOptionDelegated) {
    document._filterOptionDelegated = true;
    document.addEventListener('click', (e) => {
      const opt = e.target.closest('.filter-option');
      if (!opt) return;
      const filterType = opt.dataset.filter;
      const value = opt.dataset.value;
      if (!filterType) return;
      if (activeFilters[filterType] === value) {
        activeFilters[filterType] = null;
      } else {
        activeFilters[filterType] = value;
      }
      if (filterType === 'category') activeFilters.subcategory = null;
      applyFilters(); updateProductsTitle();
    });
  }
}

/* ---------- Filtros ---------- */
function applyFilters() {
  if (!productsReady) {
    setProductsLoadingUI(true);
    productsReadyPromise.then(() => {
      if (productsReady) applyFilters();
    });
    return;
  }
  const fCountry = activeFilters.country;
  const fBrand = activeFilters.brand;
  const fCat = activeFilters.category;
  const fSub = activeFilters.subcategory;
  const fIndustry = activeFilters.industry;
  const searchLower = activeFilters.search ? activeFilters.search.toLowerCase().trim() : '';
  const itemCodeNorm = activeFilters.itemCode ? normalizeText(activeFilters.itemCode) : '';
  const bucketKey = (fCat && fSub) ? (fCat + '||' + fSub) : null;
  const subLower = fSub ? fSub.toLowerCase().trim() : '';

  const out = [];
  for (let i = 0; i < allProducts.length; i++) {
    const p = allProducts[i];
    if (fCountry && p.country !== fCountry) continue;
    if (fBrand && p.brand !== fBrand) continue;
    if (fIndustry && p._industryId !== fIndustry) continue;

    // 1) Item by CODE (A011) from DB.categoria — enough and reliable ES/EN
    if (itemCodeNorm) {
      if (!p._itemCodes || !p._itemCodes.has(itemCodeNorm)) continue;
    } else {
      // 2) Category / subcategory via buckets derived from code in `categoria`
      if (bucketKey) {
        if (!p._buckets.has(bucketKey)) continue;
      } else if (fCat) {
        if (!p._catKeys.has(fCat)) continue;
      } else if (fSub) {
        let inSub = false;
        if (p._buckets && p._buckets.size) {
          for (const bk of p._buckets) {
            if (bk.endsWith('||' + fSub)) { inSub = true; break; }
          }
        }
        if (!inSub) {
          const sv = (p.subcategory || p.subcategoryName || p._categoriaRaw || '').toLowerCase().trim();
          if (sv !== subLower) continue;
        }
      }

      // 3) Free-text search (q=...), not catalog navigation
      if (searchLower && !(p._searchBlob || '').includes(searchLower)) continue;
    }
    out.push(p);
  }
  filteredProducts = out;
  currentPage = 1;
  renderProducts();
  renderActiveFilters();
  updateSidebarActiveState();
}

function updateSidebarActiveState() {
  // Cache nodes once; refresh cache only after a sidebar re-render
  if (!updateSidebarActiveState._cache || updateSidebarActiveState._dirty) {
    updateSidebarActiveState._cache = document.querySelectorAll('.filter-option');
    updateSidebarActiveState._dirty = false;
  }
  const nodes = updateSidebarActiveState._cache;
  for (let i = 0; i < nodes.length; i++) {
    const opt = nodes[i];
    const t = opt.dataset.filter, v = opt.dataset.value;
    const should = activeFilters[t] === v;
    if (should !== opt.classList.contains('active')) opt.classList.toggle('active', should);
  }
}

function renderActiveFilters() {
  const container = document.getElementById('activeFilters');
  if (!container) return;
  const filters = [];
  if (activeFilters.industry && typeof INDUSTRIES !== 'undefined') {
    const industry = INDUSTRIES.find((x) => x.id === activeFilters.industry);
    if (industry) {
      const label = typeof getIndustryLabel === 'function'
        ? getIndustryLabel(industry, true)
        : industry.en;
      filters.push({ type: 'industry', label: `Industry: ${label}` });
    }
  }
  if (activeFilters.country) { const c = countries.find(x => x.id === activeFilters.country); if (c) filters.push({ type:'country', label:`${c.flag} ${c.name}` }); }
  if (activeFilters.category) { const c = categorias.find(x => x.titulo === activeFilters.category); filters.push({ type:'category', label: c ? c.titulo : activeFilters.category }); }
  if (activeFilters.brand) { const b = brands.find(x => x.id === activeFilters.brand); if (b) filters.push({ type:'brand', label: b.name }); }
  if (activeFilters.search) filters.push({ type:'search', label:`Search: "${activeFilters.search}"` });
  let html = filters.map(f => `<div class="active-filter"><span>${escapeHtml(f.label)}</span><button onclick="removeFilter('${f.type}')"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>`).join('');
  if (filters.length > 1) html += `<button class="clear-all-btn" onclick="clearAllFilters()">Clear all</button>`;
  container.innerHTML = html;
}

function removeFilter(filterType) {
  activeFilters[filterType] = null;
  if (filterType === 'category') activeFilters.subcategory = null;
  applyFilters(); updateProductsTitle();
}
function clearAllFilters() {
  activeFilters = { country:null, category:null, subcategory:null, brand:null, industry:null, search:'', itemCode:null };
  currentPage = 1;
  const si = document.getElementById('searchInput'); if (si) si.value = '';
  applyFilters();
  const t = document.getElementById('productsTitle'); if (t) t.textContent = 'All Products';
}

function updateProductsTitle() {
  let title = 'All Products';
  if (activeFilters.brand) { const b = brands.find(x => x.id === activeFilters.brand); title = `Products ${b ? b.name : ''}`; }
  else if (activeFilters.industry && typeof INDUSTRIES !== 'undefined') {
    const industry = INDUSTRIES.find((x) => x.id === activeFilters.industry);
    title = industry
      ? (typeof getIndustryLabel === 'function' ? getIndustryLabel(industry, true) : industry.en)
      : 'Industry';
  }
  else if (activeFilters.itemCode) {
    const code = String(activeFilters.itemCode).toUpperCase();
    let label = code;
    outer: for (const c of categorias) {
      for (const s of c.subcategorias || []) {
        for (const it of s.items || []) {
          if (extractItemCode(it).toUpperCase() === code) {
            label = it;
            break outer;
          }
        }
      }
    }
    title = label;
  }
  else if (activeFilters.subcategory) title = activeFilters.subcategory;
  else if (activeFilters.category) { const c = categorias.find(x => x.titulo === activeFilters.category); title = c ? c.titulo : activeFilters.category; }
  else if (activeFilters.country) { const c = countries.find(x => x.id === activeFilters.country); title = `Products from ${c ? c.name : activeFilters.country} ${c ? c.flag : ''}`; }
  const el = document.getElementById('productsTitle'); if (el) el.textContent = title;
}

/* ---------- Render productos (chunked + delegación + sin layout thrash) ---------- */
let _productsRenderToken = 0;
function _productCardHTML(product) {
  const country = product.country ? countries.find(c => c.id === product.country) : null;
  const brandColor = product.brandColor || '#0066cc';
  const brandName = product.brandName || 'Sin marca';
  const initials = brandName.substring(0, 2).toUpperCase();
  const priceLabel = formatPrice(product.rate);
  const productUrl = buildProductUrl(product);
  const displayName = getProductDisplayName(product);
  const imageHtml = product.image
    ? `<img src="${product.image}" alt="${escapeHtml(displayName)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.style.display='none';this.parentElement.classList.add('no-img');">`
    : `<div class="product-image-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div>`;
  return `<a class="product-card" href="${escapeHtml(productUrl)}" data-pid="${escapeHtml(product.id)}">` +
    `<div class="product-image">${imageHtml}</div>` +
    `<div class="product-content"><div class="product-brand"><div class="product-brand-logo" style="background:${brandColor}">${escapeHtml(initials)}</div>` +
    `<span class="product-brand-name">${escapeHtml(brandName)}</span></div>` +
    `<h3 class="product-name">${escapeHtml(displayName)}</h3><p class="product-sku">SKU: ${escapeHtml(product.sku || '-')}</p>` +
    (priceLabel ? `<p class="product-price" style="color:var(--color-price);font-weight:700;margin:4px 0;">${priceLabel}</p>` : '') +
    (country ? `<div class="product-meta"><span class="product-country">${country.flag}</span></div>` : '') +
    `<span class="product-btn">View product</span></div></a>`;
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const noProducts = document.getElementById('noProducts');
  const countEl = document.getElementById('productsCount');
  if (!grid) return;

  const total = filteredProducts.length;
  const totalPages = Math.ceil(total / productsPerPage);
  const startIdx = (currentPage - 1) * productsPerPage;
  const endIdx = Math.min(startIdx + productsPerPage, total);
  const slice = filteredProducts.slice(startIdx, endIdx);

  if (countEl) countEl.textContent = total > 0 ? `Showing ${startIdx+1}-${endIdx} of ${total} products` : '0 products found';

  if (total === 0) {
    grid.innerHTML = '';
    if (noProducts) noProducts.classList.remove('hidden');
    renderPagination(0, 0);
    return;
  }
  if (noProducts) noProducts.classList.add('hidden');

  // Guardar producto en localStorage antes de navegar (el href ya lleva a /product/slug)
  if (!grid.dataset.delegated) {
    const persistProductFromCard = (card) => {
      if (!card) return;
      const pid = card.dataset.pid;
      const product =
        filteredProducts.find((p) => String(p.id) === pid) ||
        allProducts.find((p) => String(p.id) === pid);
      if (!product) return;
      try {
        localStorage.setItem(
          'selectedProduct',
          JSON.stringify({
            ...product,
            _buckets: undefined,
            _catKeys: undefined,
            _searchBlob: undefined,
            _brandNorm: undefined,
            _subNorm: undefined,
            _industryId: undefined,
            _itemCodes: undefined,
          })
        );
      } catch (_) {}
    };

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card || !grid.contains(card)) return;
      e.stopPropagation();
      persistProductFromCard(card);
      // Dejar que el <a href="/product/..."> navegue normalmente
    });

    grid.dataset.delegated = '1';
  }


  // Render completo en una sola pasada: más fluido para listas paginadas (<=96 items)
  ++_productsRenderToken;
  // Construye HTML completo offline antes de tocar el DOM una sola vez
  const parts = new Array(slice.length);
  for (let i = 0; i < slice.length; i++) parts[i] = _productCardHTML(slice[i]);
  grid.innerHTML = parts.join('');
  renderPagination(totalPages, total);
}

/* ---------- Paginación ---------- */
function renderPagination(totalPages, totalProducts) {
  let pag = document.getElementById('productsPagination');
  if (!pag) {
    const sec = document.getElementById('productosSection');
    const mc = sec && sec.querySelector('.products-main');
    if (!mc) return;
    mc.insertAdjacentHTML('beforeend', `<div class="pagination-container" id="productsPagination"></div>`);
    pag = document.getElementById('productsPagination');
  }
  if (!pag) return;
  if (totalProducts === 0) { pag.innerHTML = ''; return; }

  let pagesHtml = '';
  const maxVis = 5;
  let start = Math.max(1, currentPage - Math.floor(maxVis/2));
  let end = Math.min(totalPages, start + maxVis - 1);
  if (end - start + 1 < maxVis) start = Math.max(1, end - maxVis + 1);
  if (start > 1) { pagesHtml += `<button class="pagination-btn" data-page="1">1</button>` + (start>2?`<span class="pagination-dots">...</span>`:''); }
  for (let i = start; i <= end; i++) pagesHtml += `<button class="pagination-btn ${i===currentPage?'active':''}" data-page="${i}">${i}</button>`;
  if (end < totalPages) { pagesHtml += (end<totalPages-1?`<span class="pagination-dots">...</span>`:'') + `<button class="pagination-btn" data-page="${totalPages}">${totalPages}</button>`; }

  pag.innerHTML = `<div class="pagination-controls"><div class="pagination-per-page"><label for="perPageSelect">Show:</label><select id="perPageSelect" class="per-page-select"><option value="12" ${productsPerPage===12?'selected':''}>12</option><option value="24" ${productsPerPage===24?'selected':''}>24</option><option value="48" ${productsPerPage===48?'selected':''}>48</option><option value="96" ${productsPerPage===96?'selected':''}>96</option></select><span>per page</span></div><div class="pagination-nav"><button class="pagination-btn pagination-prev" ${currentPage===1?'disabled':''} data-page="${currentPage-1}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m15 18-6-6 6-6"/></svg>Previous</button><div class="pagination-pages">${pagesHtml}</div><button class="pagination-btn pagination-next" ${currentPage===totalPages?'disabled':''} data-page="${currentPage+1}">Next<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="m9 18 6-6-6-6"/></svg></button></div><div class="pagination-info">Page ${currentPage} of ${totalPages}</div></div>`;

  if (!pag.dataset.delegated) {
    pag.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination-btn[data-page]');
      if (!btn || btn.disabled) return;
      const page = parseInt(btn.dataset.page, 10);
      if (page >= 1 && page <= Math.ceil(filteredProducts.length / productsPerPage) && page !== currentPage) {
        currentPage = page;
        renderProducts();
        document.getElementById('productsGrid')?.scrollIntoView({ behavior:'auto', block:'start' });
      }
    });
    pag.addEventListener('change', (e) => {
      if (e.target && e.target.id === 'perPageSelect') {
        productsPerPage = parseInt(e.target.value, 10);
        currentPage = 1;
        renderProducts();
      }
    });
    pag.dataset.delegated = '1';
  }
}

/* ---------- Búsqueda (debounce + búsqueda en blob precomputado) ---------- */
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    clearTimeout(searchDebounceTimer);
    if (query.length < 2) { if (searchResults) searchResults.classList.remove('active'); return; }
    searchDebounceTimer = setTimeout(() => {
      const q = query.toLowerCase();
      const results = [];
      let totalMatches = 0;
      for (let i = 0; i < allProducts.length; i++) {
        const p = allProducts[i];
        if (p._searchBlob.includes(q)) {
          totalMatches++;
          if (results.length < 8) results.push(p);
        }
      }
      if (!searchResults) return;
      const highlight = (text) => {
        const safe = escapeHtml(text || '');
        if (!q) return safe;
        const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
        return safe.replace(re, '<mark>$1</mark>');
      };
      if (results.length) {
        const list = results.map(product => {
          const displayName = getProductDisplayName(product);
          const img = product.image || `https://via.placeholder.com/55x55?text=${encodeURIComponent((product.brandName || '?').substring(0,3))}`;
          const meta = [product.brandName, product.sku].filter(Boolean).map(escapeHtml).join(' · ');
          return `<div class="result-item" data-product="${escapeHtml(product.id)}" role="option" tabindex="0"><img src="${img}" alt="${escapeHtml(displayName)}" loading="lazy" onerror="this.src='https://via.placeholder.com/55x55?text=?'"><div class="result-info"><strong>${highlight(displayName)}</strong><span>${meta}</span></div></div>`;
        }).join('');
        searchResults.innerHTML = list;
        searchResults.classList.add('active');
        if (!searchResults.dataset.delegated) {
          searchResults.addEventListener('click', (ev) => {
            const it = ev.target.closest('.result-item');
            if (!it) return;
            activeFilters.search = searchInput.value.trim();
            applyFilters(); showSection('productos');
            searchResults.classList.remove('active');
          });
          searchResults.dataset.delegated = '1';
        }
      } else {
        searchResults.innerHTML = `<div class="search-results-empty"><strong>No results</strong>No products found for "${escapeHtml(query)}"</div>`;
        searchResults.classList.add('active');
      }
    }, 250);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-bar') && searchResults) searchResults.classList.remove('active');
  });
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      activeFilters.search = searchInput.value.trim();
      applyFilters(); showSection('productos');
      if (searchResults) searchResults.classList.remove('active');
    }
  });
}

/* ---------- Sort ---------- */
function initSort() {
  const sortSelect = document.getElementById('sortSelect');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', () => {
    const sortBy = sortSelect.value;
    filteredProducts.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'brand') return (a.brandName||'').localeCompare(b.brandName||'');
      if (sortBy === 'category') return (a.categoryName||'').localeCompare(b.categoryName||'');
      return 0;
    });
    renderProducts();
  });
}




function updateCartCount() {
  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;

  const cartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
  const totalItems = cartItems.reduce((acc, p) => acc + p.quantity, 0);
  cartCountEl.textContent = `Cart (${totalItems})`;
}



// Exponer al ámbito global lo que el HTML usa en onclick=""
window.removeFilter = removeFilter;
window.clearAllFilters = clearAllFilters;
window.showSection = showSection;
