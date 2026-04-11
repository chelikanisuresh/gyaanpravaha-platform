// Geography Tooltip word maps — Gyaanpravaha
// Connexion Class 6, Project 1

export interface TooltipWord { display: string; meaning: string }
export type WordMap = Record<string, TooltipWord>

const chapter1Words: WordMap = {
  'celestial bodies': { display: 'Celestial bodies', meaning: 'All objects found in space and the sky: stars, planets, satellites, asteroids, meteors and comets.' },
  'big bang':         { display: 'Big Bang',         meaning: 'The gigantic explosion about 15 billion years ago that started the universe, according to most astronomers.' },
  'nebula':           { display: 'Nebula',           meaning: 'A giant cloud of gases and tiny dust particles from which stars formed after the Big Bang.' },
  'orbit':            { display: 'Orbit',            meaning: 'The fixed path along which a planet revolves around the Sun, held by the Sun\'s gravity.' },
  'terrestrial':      { display: 'Terrestrial',      meaning: 'Relating to land or the Earth. Terrestrial planets (Mercury, Venus, Earth, Mars) are rocky inner planets.' },
  'gas giants':       { display: 'Gas giants',       meaning: 'The outer planets — Jupiter, Saturn, Uranus, Neptune — made chiefly of gases.' },
  'atmosphere':       { display: 'Atmosphere',       meaning: 'The blanket of air surrounding the Earth, containing nitrogen, oxygen, CO₂ and ozone — essential for life.' },
  'purnima':          { display: 'Purnima',          meaning: 'The full Moon, when the Moon appears as a complete disc in the night sky.' },
  'amavasya':         { display: 'Amavasya',         meaning: 'The new Moon, when the side of the Moon facing Earth receives no sunlight and is not visible.' },
  'pole star':        { display: 'Pole Star',        meaning: 'The brightest star in the night sky, almost directly above the North Pole. Helps determine north direction at night.' },
}

const chapter2Words: WordMap = {
  'oblate spheroid':      { display: 'Oblate spheroid',      meaning: 'The exact shape of the Earth — spherical but slightly flattened at the poles and bulging at the Equator.' },
  'circumnavigation':     { display: 'Circumnavigation',     meaning: 'Travelling all the way around the Earth. Ferdinand Magellan was the first person to circumnavigate it.' },
  'circle of illumination': { display: 'Circle of illumination', meaning: 'The imaginary circle separating the lit half (day) from the dark half (night) of the Earth.' },
  'rotation':             { display: 'Rotation',             meaning: 'The spinning of the Earth on its own axis from west to east, completing one full spin in 24 hours. Causes day and night.' },
  'revolution':           { display: 'Revolution',           meaning: 'The Earth\'s movement in its orbit around the Sun, completed in 365 days 6 hours. Causes seasons.' },
  'leap year':            { display: 'Leap year',            meaning: 'A year with 366 days (February has 29 days), occurring every 4 years to account for the extra 6 hours per revolution.' },
  'aphelion':             { display: 'Aphelion',             meaning: 'The point in Earth\'s orbit when it is farthest from the Sun — 152 million km away.' },
  'perihelion':           { display: 'Perihelion',           meaning: 'The point in Earth\'s orbit when it is nearest to the Sun — 147.3 million km away.' },
  'summer solstice':      { display: 'Summer Solstice',      meaning: '21st June — Sun\'s rays fall on Tropic of Cancer. Longest day and shortest night in the Northern Hemisphere.' },
  'winter solstice':      { display: 'Winter Solstice',      meaning: '22nd December — Sun\'s rays fall on Tropic of Capricorn. Longest night and shortest day in the Northern Hemisphere.' },
  'equinox':              { display: 'Equinox',              meaning: 'When the Sun\'s rays fall on the Equator and all places have equal days and nights. Occurs on 21 March and 23 September.' },
}

const chapter3Words: WordMap = {
  'geographic grid':       { display: 'Geographic grid',       meaning: 'The network of horizontal and vertical lines (latitudes and longitudes) used to locate any place on Earth precisely.' },
  'latitude':              { display: 'Latitude',              meaning: 'The angular distance of a place north or south of the Equator. There are 181 parallels of latitude.' },
  'longitude':             { display: 'Longitude',             meaning: 'The angular distance of a place east or west of the Prime Meridian. There are 360 meridians of longitude.' },
  'prime meridian':        { display: 'Prime Meridian',        meaning: 'The meridian of longitude at 0°, passing through Greenwich, England. All longitudes are measured from here.' },
  'local time':            { display: 'Local time',            meaning: 'The time of a place calculated based on the Sun\'s position at that meridian. Different meridians have different local times.' },
  'standard time':         { display: 'Standard time',         meaning: 'The local time of a central meridian adopted for a whole country or region to avoid confusion.' },
  'indian standard time':  { display: 'Indian Standard Time',  meaning: 'India\'s standard time based on the 82.5°E meridian passing through Prayagraj (Allahabad).' },
  'international date line': { display: 'International Date Line', meaning: 'The line at 180° longitude where a day is gained or lost. Follows a zig-zag course. Cross east = gain day; cross west = lose day.' },
  'time zone':             { display: 'Time zone',             meaning: 'One of 24 divisions of the world, each covering 15° of longitude and differing by 1 hour from the next.' },
  'tropic of cancer':      { display: 'Tropic of Cancer',      meaning: 'The line of latitude at 23.5°N. Northernmost point where the Sun shines directly overhead (21 June).' },
  'tropic of capricorn':   { display: 'Tropic of Capricorn',   meaning: 'The line of latitude at 23.5°S. Southernmost point where the Sun shines directly overhead (22 December).' },
}

const chapter4Words: WordMap = {
  'landform':          { display: 'Landform',          meaning: 'Any natural surface feature on the Earth: mountains, plateaus, plains, valleys, deltas.' },
  'endogenic forces':  { display: 'Endogenic forces',  meaning: 'Internal forces from deep inside the Earth — can be sudden (earthquakes, volcanoes) or slow (building mountains).' },
  'exogenic forces':   { display: 'Exogenic forces',   meaning: 'External forces like rivers, wind, glaciers and sea waves that slowly wear down highlands and deposit material in lowlands.' },
  'fold mountain':     { display: 'Fold mountain',     meaning: 'Mountain formed when the Earth\'s crust is compressed and folded. Old: Aravallis; Young: Himalayas, Alps, Andes.' },
  'block mountain':    { display: 'Block mountain',    meaning: 'Mountain formed when the Earth\'s crust cracks (faults) and a block is pushed up (horst) between two sunken sections (grabens).' },
  'horst':             { display: 'Horst',             meaning: 'The raised block of land between two fault lines that forms a block mountain.' },
  'graben':            { display: 'Graben',            meaning: 'The sunken land on either side of a horst in a block mountain formation.' },
  'residual mountain': { display: 'Residual mountain', meaning: 'Mountain left behind after erosion wears down the surrounding area. Example: Nilgiri Hills, Aravallis.' },
  'plateau':           { display: 'Plateau',           meaning: 'A broad, flat-topped upland that rises sharply above the surrounding lowland. Also called tableland.' },
  'alluvium':          { display: 'Alluvium',          meaning: 'The deposit of sand, silt and clay left by rivers on plains. Plains formed this way are called alluvial plains.' },
  'geomorphology':     { display: 'Geomorphology',     meaning: 'The study of the Earth\'s relief features — how landforms are created, changed, and classified.' },
}

const chapter5Words: WordMap = {
  'cartography':           { display: 'Cartography',           meaning: 'The science of map making. The person who makes maps is called a cartographer.' },
  'map projection':        { display: 'Map projection',        meaning: 'The mathematical technique used to represent the curved Earth on a flat surface.' },
  'map scale':             { display: 'Map scale',             meaning: 'The ratio of the distance on the map to the actual distance on the ground.' },
  'sketch':                { display: 'Sketch',                meaning: 'A rough drawing giving essential features but not drawn to scale.' },
  'cadastral map':         { display: 'Cadastral map',         meaning: 'A large scale map showing details of properties and buildings — used for city survey and land ownership records.' },
  'topographical map':     { display: 'Topographical map',     meaning: 'A large scale map showing both natural features (hills, rivers) and man-made features (roads, settlements). Used for military purposes.' },
  'physical map':          { display: 'Physical map',          meaning: 'A map showing landforms and water bodies using colours: mountains (brown), deserts (yellow), plains (green), water (blue).' },
  'political map':         { display: 'Political map',         meaning: 'A map showing countries, states, capitals and boundaries.' },
  'thematic map':          { display: 'Thematic map',          meaning: 'A map showing a specific topic: population distribution, crops, rainfall, minerals, etc.' },
  'representative fraction': { display: 'Representative Fraction', meaning: 'A scale expressed as a ratio (e.g. 1:10,000) meaning 1 unit on the map = 10,000 units on the ground.' },
  'legend':                { display: 'Legend / Key',          meaning: 'A part of the map explaining what each symbol and colour represents.' },
  'conventional signs':    { display: 'Conventional signs',    meaning: 'Standard symbols used on maps to represent features (roads, rivers, temples) that cannot be drawn to actual scale.' },
}

const chapter6Words: WordMap = {
  'agriculture':         { display: 'Agriculture',         meaning: 'From Latin ager (land) + culture (cultivation). The science and practice of growing crops and raising animals.' },
  'food crops':          { display: 'Food crops',          meaning: 'Crops that form part of the diet — like rice and wheat. Farmers keep some for themselves and sell the rest.' },
  'cash crops':          { display: 'Cash crops',          meaning: 'Crops grown only to sell — like sugarcane, tea and cotton. Often raw materials for industries.' },
  'kharif':              { display: 'Kharif',              meaning: 'India\'s monsoon cropping season, June to September. Crops sown at the start of the monsoon.' },
  'rabi':                { display: 'Rabi',                meaning: 'India\'s winter cropping season, October to March. Crops sown after the monsoon ends.' },
  'subsistence farming': { display: 'Subsistence farming', meaning: 'Farming where the family grows food mainly for themselves with little surplus to sell.' },
  'shifting agriculture':{ display: 'Shifting agriculture', meaning: 'Also called slash and burn — clear forest, farm until soil exhausted, then move to new land. Called Jhum in Assam.' },
  'plantation farming':  { display: 'Plantation farming',  meaning: 'Large-scale single-crop farming on estates (tea, coffee, rubber). Labour intensive and export-oriented.' },
  'monoculture':         { display: 'Monoculture',         meaning: 'Growing only one crop continuously. Can lead to pest build-up and soil imbalance.' },
  'organic farming':     { display: 'Organic farming',     meaning: 'Farming using only natural inputs (organic waste, bio-fertilizers) without synthetic chemicals.' },
  'green revolution':    { display: 'Green Revolution',    meaning: 'The transformation of Indian agriculture using HYV seeds, fertilizers, irrigation and mechanization — turning India from food scarcity to self-sufficiency.' },
  'hyv seeds':           { display: 'HYV seeds',           meaning: 'High Yielding Variety seeds — specially bred to produce much larger quantities of crop per plant.' },
}

const chapter7Words: WordMap = {
  'isthmus of panama':  { display: 'Isthmus of Panama',  meaning: 'The narrow strip of land connecting North America and South America.' },
  'bering strait':      { display: 'Bering Strait',      meaning: 'The narrow body of water separating North America (Alaska) from Asia (Russia) in the northwest.' },
  'canadian shield':    { display: 'Canadian Shield',    meaning: 'The oldest rock formation in North America surrounding Hudson Bay, shaped by glaciers. Contains the Great Lakes.' },
  'great lakes':        { display: 'Great Lakes',        meaning: 'Five large freshwater lakes on the US-Canada border: Superior, Michigan, Huron, Erie, Ontario. Lake Superior is the world\'s largest freshwater lake.' },
  'cordilleras':        { display: 'Cordilleras',        meaning: 'A Spanish word meaning rope or chain. The Western Cordilleras are young fold mountains stretching from Alaska to Panama.' },
  'grand canyon':       { display: 'Grand Canyon',       meaning: 'The spectacular canyon carved by the Colorado River in the Western Cordilleras — 1,857 m deep and 446 km long.' },
  'appalachians':       { display: 'Appalachians',       meaning: 'Old fold mountains in eastern North America, below 2000 m. The Fall Line along their slopes is ideal for hydro-electricity.' },
  'fall line':          { display: 'Fall Line',          meaning: 'The area along the Appalachians where rivers fall from highlands to the coast, creating rapids and waterfalls — ideal for hydro-electricity.' },
  'niagara falls':      { display: 'Niagara Falls',      meaning: 'Famous horseshoe-shaped falls between Lake Erie and Lake Ontario. Largest concentration of fresh water, important for tourism.' },
  'lumbering':          { display: 'Lumbering',          meaning: 'The harvesting of forest products and making them useful on a commercial basis.' },
  'windward side':      { display: 'Windward side',      meaning: 'The mountain slope facing the moist wind — receives heavy rainfall as air rises and cools.' },
  'leeward side':       { display: 'Leeward side',       meaning: 'The mountain slope away from the moist wind — receives little or no rainfall. Also called rain shadow.' },
  'relief rainfall':    { display: 'Relief rainfall',    meaning: 'Rainfall caused when moist winds are forced upward by a mountain. Heavy rain on windward side; dry on leeward side.' },
}

export const GEO_CHAPTER_WORDS: Record<number, WordMap> = {
  1: chapter1Words, 2: chapter2Words, 3: chapter3Words, 4: chapter4Words,
  5: chapter5Words, 6: chapter6Words, 7: chapter7Words,
}

export function getGeoWordMap(chapterId: number): WordMap {
  return GEO_CHAPTER_WORDS[chapterId] || {}
}
