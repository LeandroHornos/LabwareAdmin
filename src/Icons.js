/* En este archivo se registran todos los íconos de la GUI, con el objetivo de 
unificar en un solo lugar nombres y rutas. Los componentes importan el objeto Icons
y de el obtienen la info del ícono a mostrar. */

// Routes
const labware = "/img/icons/labware/";

const Icons = {
  alcoholBurner: {
    name: "alcoholBurner",
    displayname: { es: "Mechero de alcohol", en: "Alcohol burner" },
    src: labware + "alcohol-burner.svg",
  },
  balance: {
    name: "balance",
    displayname: { es: "Balanza Granataria", en: "Balance" },
    src: labware + "balance.svg",
  },
  barometer: {
    name: "barometer",
    displayname: { es: "Barómetro", en: "Barometer" },
    src: labware + "barometer.svg",
  },
  battery: {
    name: "battery",
    displayname: { es: "Batería", en: "Battery" },
    src: labware + "battery.svg",
  },
  beakerFull: {
    name: "beakerFull",
    displayname: { es: "Vaso con líquido", en: "Beaker with liquid" },
    src: labware + "beaker-with-liquid.svg",
  },
  beaker: {
    name: "beaker",
    displayname: { es: "Vaso de precipitados", en: "Beaker" },
    src: labware + "beaker.svg",
  },
  bottle: {
    name: "bottle",
    displayname: { es: "Botella", en: "Bottle" },
    src: labware + "bottle.svg",
  },
  bunsen: {
    name: "bunsen",
    displayname: { es: "Mechero Bunsen", en: "Bunsen Burner" },
    src: labware + "bunsen-burner.svg",
  },
  burette: {
    name: "burette",
    displayname: { es: "Bureta", en: "Burette" },
    src: labware + "burette.svg",
  },
  calculator: {
    name: "calculator",
    displayname: { es: "Calculadora", en: "Calculator" },
    src: labware + "calculator.svg",
  },
  centrifuge: {
    name: "centrifuge",
    displayname: { es: "Centrifuga", en: "Centrifuge" },
    src: labware + "centrifuge.svg",
  },
  centrifugeTube: {
    name: "centrifugueTube",
    displayname: { es: "Tubo de Centrífuga", en: "Centrigue Tube" },
    src: labware + "centrifuge-tube.svg",
  },
  chemicals: {
    name: "chemicals",
    displayname: { es: "Sustancias Químicas", en: "Chemicals" },
    src: labware + "chemicals.svg",
  },
  clipboard: {
    name: "clipboard",
    displayname: { es: "Portapapeles", en: "Clipboard" },
    src: labware + "clipboard.svg",
  },
  condenser: {
    name: "condenser",
    displayname: { es: "Refrigerante", en: "Condenser" },
    src: labware + "condenser.svg",
  },
  computer: {
    name: "computer",
    displayname: { es: "Computadora", en: "Computer" },
    src: labware + "computer.svg",
  },
  crucible: {
    name: "crucible",
    displayname: { es: "Crisol", en: "Crucible" },
    src: labware + "crucible.svg",
  },
  desiccator: {
    name: "desiccator",
    displayname: { es: "Desecador", en: "Desiccator" },
    src: labware + "desiccator.svg",
  },
  dropper: {
    name: "dropper",
    displayname: { es: "Gotero", en: "Dropper" },
    src: labware + "dropper.svg",
  },
  erlenmeyer: {
    name: "erlenmeyer",
    displayname: { es: "Erlenmeyer", en: "Erlenmeyer flask" },
    src: labware + "erlenmeyer.svg",
  },
  erlenmeyerFull: {
    name: "erlenmeyer",
    displayname: { es: "Erlenmeyer Lleno", en: "Erlenmeyer flask full" },
    src: labware + "erlenmeyer-full.svg",
  },
  evaporationDish: {
    name: "evaporationDish",
    displayname: { es: "Cápsula", en: "Evaporation Dish" },
    src: labware + "evaporation-dish.svg",
  },
  florenceFlask: {
    name: "florenceFlask",
    displayname: { es: "Matraz", en: "Florence Flask" },
    src: labware + "florence-flask.svg",
  },
  forceps: {
    name: "forceps",
    displayname: { es: "Pinzas", en: "Forceps" },
    src: labware + "forceps.svg",
  },
  funnel: {
    name: "funnel",
    displayname: { es: "Embudo", en: "Funnel" },
    src: labware + "funnel.svg",
  },
  gloves: {
    name: "gloves",
    displayname: { es: "Guantes", en: "Gloves" },
    src: labware + "gloves.svg",
  },
  graduatedCylinder: {
    name: "graduatedCylinder",
    displayname: { es: "Probeta", en: "Graduated Cylinder" },
    src: labware + "graduated-cylinder.svg",
  },
  graduatedFunnel: {
    name: "graduatedFunnel",
    displayname: { es: "Embudo graduado", en: "Graduated Funnel" },
    src: labware + "graduated-funnel.svg",
  },
  hotPlate: {
    name: "hotPlate",
    displayname: { es: "Plancha Calefactora", en: "Hot Plate" },
    src: labware + "hot-plate.svg",
  },
  ironStand: {
    name: "ironStand",
    displayname: { es: "Pie Universal", en: "Iron Stand" },
    src: labware + "iron-stand.svg",
  },
  jar: {
    name: "jar",
    displayname: { es: "Jarra", en: "Jar" },
    src: labware + "jar.svg",
  },
  labCoat: {
    name: "labCoat",
    displayname: { es: "Guardapolvos", en: "Lab Coat" },
    src: labware + "lab-coat.svg",
  },
  labWells: {
    name: "labWells",
    displayname: { es: "Placa de Gotas", en: "Lab Wells" },
    src: labware + "lab-wells.svg",
  },
  magnifyingGlass: {
    name: "magnifyingGlass",
    displayname: { es: "Lupa", en: "Magnifying Glass" },
    src: labware + "magnifying-glass.svg",
  },
  microscope: {
    name: "microscope",
    displayname: { es: "Microscopio", en: "Microscope" },
    src: labware + "microscope.svg",
  },
  microscopeSlides: {
    name: "microscopeSlides",
    displayname: { es: "Placas para microscopio", en: "Microscope slides" },
    src: labware + "microscope-slides.svg",
  },
  molecule: {
    name: "molecule",
    displayname: { es: "Molecula", en: "Molecule" },
    src: labware + "molecule.svg",
  },
  molecules: {
    name: "molecules",
    displayname: { es: "Moleculas", en: "Molecules" },
    src: labware + "molecules.svg",
  },
  mortar: {
    name: "mortar",
    displayname: { es: "Mortero", en: "Mortar" },
    src: labware + "mortar.svg",
  },
  periodicTable: {
    name: "periodicTable",
    displayname: { es: "Tabla Periódica", en: "Periodic Table" },
    src: labware + "periodic-table.svg",
  },
  petriDish: {
    name: "petriDish",
    displayname: { es: "Caja de Petri", en: "Petri Dish" },
    src: labware + "petri-dish.svg",
  },
  pipette: {
    name: "pipette",
    displayname: { es: "Pipeta", en: "Pipette" },
    src: labware + "pipette.svg",
  },
  plunger: {
    name: "plunger",
    displayname: { es: "Pipeta Automática", en: "Plunger" },
    src: labware + "plunger.svg",
  },
  protectionGlasses: {
    name: "protectionGlasses",
    displayname: { es: "Gafas de Seguridad", en: "Protection Glasses" },
    src: labware + "protection-glasses.svg",
  },
  roundBottomFlask: {
    name: "roundBottomFlask",
    displayname: { es: "Balón", en: "Round Bottom Flask" },
    src: labware + "round-bottom-flask.svg",
  },
  rubberTube: {
    name: "rubberTube",
    displayname: { es: "Manguera", en: "Rubber Tube" },
    src: labware + "rubber-tube.svg",
  },
  safetyShower: {
    name: "safetyShower",
    displayname: { es: "Ducha de Seguridad", en: "Safety Shower" },
    src: labware + "",
  },
  scale: {
    name: "scale",
    displayname: { es: "Balanza", en: "Scale" },
    src: labware + "scale.svg",
  },
  scalpel: {
    name: "scalpel",
    displayname: { es: "Bisturí", en: "Scalpel" },
    src: labware + "scalpel.svg",
  },
  separatingFunnel: {
    name: "separatingFunnel",
    displayname: { es: "Ampolla de Decantación", en: "Separating Funnel" },
    src: labware + "separating-funnel.svg",
  },
  spatula: {
    name: "spatula",
    displayname: { es: "Espatula", en: "Spatula" },
    src: labware + "spatula.svg",
  },
  syringe: {
    name: "syringe",
    displayname: { es: "Jeringa", en: "Syringe" },
    src: labware + "syringe.svg",
  },
  testTube: {
    name: "testTube",
    displayname: { es: "Tubo de Ensayo", en: "Test Tube" },
    src: labware + "test-tube.svg",
  },
  testTubeBrush: {
    name: "testTubeBrush",
    displayname: { es: "Escobilla", en: "Test Tube Brush" },
    src: labware + "test-tube-brush.svg",
  },
  testTubeRack: {
    name: "testTubeRack",
    displayname: { es: "Gradilla", en: "Test Tube Rack" },
    src: labware + "test-tube-rack",
  },
  thermometer: {
    name: "thermometer",
    displayname: { es: "Termómetro", en: "Thermometer" },
    src: labware + "thermometer.svg",
  },
  thinCrucible: {
    name: "thinCrucible",
    displayname: { es: "Crisol", en: "Crucible" },
    src: labware + "thin-crucible.svg",
  },
  tongs: {
    name: "tongs",
    displayname: { es: "Pinza de Hierro", en: "Tongs" },
    src: labware + "tongs.svg",
  },
  tripleNeckFlask: {
    name: "tripleNeckFlask",
    displayname: { es: "Balón de 3 Bocas", en: "Triple Neck Flask" },
    src: labware + "triple-neck-flask.svg",
  },
  twinNeckFlask: {
    name: "twinNeckFlask",
    displayname: { es: "Balón de 2 Bocas", en: "Twin Neck Flask" },
    src: labware + "twin-neck-flask.svg",
  },
  washBottle: {
    name: "washBottle",
    displayname: { es: "Piseta", en: "Wash Bottle" },
    src: labware + "wash-bottle.svg",
  },
  watchGlass: {
    name: "watchGlass",
    displayname: { es: "Vidrio de Reloj", en: "Watch Glass" },
    src: labware + "watch-glass.svg",
  },
  wireGauze: {
    name: "wireGauze",
    displayname: { es: "Tela de Amianto", en: "Wire Gauze" },
    src: labware + "wire-gauze.svg",
  },
};

export default Icons;
