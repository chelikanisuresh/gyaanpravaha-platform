// Science Tooltip Words — Gyaanpravaha
// Connexion Class 6 — All 9 chapters

export interface TooltipWord { word: string; meaning: string }
export type WordMap = Record<string, TooltipWord>

export const SCI_TOOLTIP_WORDS: Record<number, TooltipWord[]> = {
  1: [
    { word: 'magnetism', meaning: 'The property of attraction that magnets have — named after Magnesia in Greece where lodestone was first found' },
    { word: 'magnetic', meaning: 'Relating to a magnet or magnetism; attracted by a magnet. Iron, nickel and cobalt are magnetic substances' },
    { word: 'lodestone', meaning: 'A naturally occurring magnetic rock (also called Magnetite). The first magnet known to humans — discovered by shepherd Magnes ~4000 years ago' },
    { word: 'poles', meaning: 'The two ends of a magnet (North pole and South pole) where magnetic power is concentrated. Power is negligible at the centre' },
    { word: 'directive', meaning: 'The directive property of a magnet: a freely suspended magnet always aligns itself in the north-south direction — the principle of the compass' },
    { word: 'induction', meaning: 'Magnetic induction: the process of inducing magnetism in a magnetic substance by bringing a magnet near it — without any actual contact' },
    { word: 'electromagnet', meaning: 'A temporary magnet made by passing electric current through a coil of insulated copper wire wound around a soft iron bar. Loses magnetism when current is switched off' },
    { word: 'demagnetise', meaning: 'To destroy the magnetic property of a magnet. Caused by: hammering, heating, dropping, passing strong current, rough handling' },
    { word: 'keeper', meaning: 'A magnetic keeper — a piece of soft iron placed at the poles of bar magnets during storage to prevent self-demagnetisation' },
    { word: 'permanent', meaning: 'Permanent magnets are made from steel or special alloys. They are strong, retain their magnetism for a long time, and do not lose it easily' },
    { word: 'temporary', meaning: 'Temporary magnets lose their magnetism when the conditions that created it are removed. Electromagnets are temporary magnets' },
    { word: 'repulsion', meaning: 'The pushing-away force between like (similar) magnetic poles. North-North and South-South poles repel each other. Repulsion is the sure test of magnetism' },
  ],
  2: [
    { word: 'fulcrum', meaning: 'The fixed point about which a lever turns (pivots). In a seesaw, the pivot in the middle is the fulcrum' },
    { word: 'lever', meaning: 'A simple machine — a rigid bar that is free to turn about a fixed point called the fulcrum. Used to multiply force or change its direction' },
    { word: 'effort', meaning: 'The force that you apply to a machine. In a lever: Effort × Effort Arm = Load × Load Arm' },
    { word: 'load', meaning: 'The force that the machine overcomes. Also called weight (W). Mechanical Advantage = Load / Effort' },
    { word: 'pulley', meaning: 'A simple machine consisting of a wheel with a groove and a rope that passes around it. Changes the direction of the applied force' },
    { word: 'inclined', meaning: 'An inclined plane is a sloped surface used to raise heavy loads. The lesser the inclination (gentler the slope), the less force is needed' },
    { word: 'wedge', meaning: 'A simple machine with two or more sloping surfaces tapering to a sharp edge. Used to split or pierce. Examples: knife, axe, needle, nail, chisel' },
    { word: 'pitch', meaning: 'The distance between two successive threads of a screw. When one rotation is given to the screw, it moves a vertical distance equal to the pitch' },
    { word: 'friction', meaning: 'The force that opposes motion between two surfaces in contact. Rolling friction (wheel) is less than sliding friction — which is the main advantage of the wheel' },
    { word: 'mechanical advantage', meaning: 'MA = Load / Effort = Effort Arm / Load Arm. A ratio with no units. MA > 1 means the machine multiplies your effort' },
  ],
  3: [
    { word: 'joule', meaning: 'The SI unit of work and energy. 1 Joule = 1 Newton × 1 Metre. Named after English physicist James Prescott Joule (1818–1889)' },
    { word: 'newton', meaning: 'The SI unit of force. Symbol: N. 1 Newton is the force needed to accelerate 1 kg by 1 m/s²' },
    { word: 'potential energy', meaning: 'Energy possessed by a body due to its position or change in shape. Examples: water at height, compressed spring, stretched rubber band' },
    { word: 'kinetic energy', meaning: 'Energy possessed by a body by virtue of its motion. Depends on mass and speed. Examples: rolling ball, moving car, fired bullet' },
    { word: 'renewable', meaning: 'Renewable sources of energy can be used again and again and will never run out. Examples: sun, wind, flowing water, biomass. Free and non-polluting' },
    { word: 'non-renewable', meaning: 'Non-renewable energy sources cannot be replaced once used. Examples: coal, petrol, diesel, natural gas. Costly and polluting' },
    { word: 'biomass', meaning: 'Decomposed biological matter (cow dung, sewage, garbage, crop residue). Has chemical energy — can be burned or converted to biogas' },
    { word: 'biogas', meaning: 'A mixture of methane and carbon dioxide produced from the decomposition of biomass in the absence of oxygen. A non-polluting fuel' },
    { word: 'conservation', meaning: 'Conservation of energy: the economic use of energy to prevent waste. Switch off lights, use pressure cooker, drive only when needed' },
    { word: 'photocell', meaning: 'A device that converts light energy into electrical energy. Used in solar panels and automatic doors. Energy conversion: Light → Electrical' },
    { word: 'atomic energy', meaning: 'Energy stored in atoms. Used peacefully in nuclear reactors to produce electricity, and destructively in nuclear weapons (atom bombs)' },
  ],
  4: [
    { word: 'chemistry', meaning: 'The branch of science that deals with the study of substances, their nature and properties, and how they react with each other' },
    { word: 'chemist', meaning: 'A person who studies and gains specialisation in chemistry' },
    { word: 'lavoisier', meaning: 'Antoine Lavoisier (1743–1794) — French scientist, called the Father of Modern Chemistry. Established the law of conservation of mass' },
    { word: 'dalton', meaning: 'John Dalton (1766–1844) — English chemist who proposed the atomic theory: all matter is made of indivisible atoms' },
    { word: 'berzelius', meaning: 'Jons Berzelius (1779–1884) — Swedish chemist who created the modern system of element symbols (H, O, Fe, Na etc.) still used today' },
    { word: 'alloy', meaning: 'A mixture of two or more metals. Examples: bronze (copper + tin), brass (copper + zinc), steel (iron + carbon)' },
    { word: 'fertiliser', meaning: 'A substance added to soil to increase nutrients and help crops grow. Chemistry has enabled production of artificial fertilisers' },
    { word: 'pesticide', meaning: 'A chemical substance used to kill pests (insects, weeds, fungi) that damage crops. A product of chemistry' },
    { word: 'bleaching', meaning: 'A chemical process that removes or lightens colour from fabric. Chemistry allows natural fibres to be bleached before dyeing' },
    { word: 'synthetic', meaning: 'Man-made through chemical processes. Synthetic fibres (nylon, rayon, terylene) are gifts of chemistry — unlike natural fibres (cotton, silk, wool)' },
  ],
  5: [
    { word: 'atom', meaning: 'The basic unit of matter. The smallest particle of an element that can take part in a chemical reaction. Named parmanu or anu by ancient Indian sage Kanada' },
    { word: 'nucleus', meaning: 'The central, dense part of an atom. Contains protons and neutrons. Discovered by Ernest Rutherford through the gold foil experiment' },
    { word: 'proton', meaning: 'A subatomic particle in the nucleus. Charge = +1. Mass = 1 atomic mass unit. The number of protons = atomic number (Z)' },
    { word: 'neutron', meaning: 'A subatomic particle in the nucleus. Charge = 0 (neutral). Mass = 1 atomic mass unit. Neutrons = A − Z (mass number minus atomic number)' },
    { word: 'electron', meaning: 'A subatomic particle that revolves around the nucleus in shells. Charge = −1. Mass ≈ 0 (negligible). Number of electrons = atomic number (Z)' },
    { word: 'atomic number', meaning: 'Symbol Z. The number of protons in the nucleus of an atom. Z = p = e. Each element has a unique atomic number' },
    { word: 'mass number', meaning: 'Symbol A. The total number of protons + neutrons in the nucleus. A = p + n. Therefore neutrons = A − Z' },
    { word: 'shells', meaning: 'Imaginary circular paths around the nucleus where electrons revolve. Named K (max 2), L (max 8), M (max 18). Formula: max = 2n²' },
    { word: 'kanada', meaning: 'Ancient Indian sage (around 600 B.C.) who first proposed that all matter is made of indivisible particles called parmanu or anu — 2000 years before Dalton' },
    { word: 'configuration', meaning: 'Electronic configuration: the arrangement of electrons in shells around the nucleus. For Mg (Z=12): K=2, L=8, M=2' },
    { word: 'rutherford', meaning: 'Ernest Rutherford — English physicist who discovered the atomic nucleus through the gold foil experiment. Predicted the neutron in 1921' },
  ],
  6: [
    { word: 'physical change', meaning: 'A change in which no new substance is formed. Usually reversible. Examples: melting, boiling, stretching, dissolving, freezing' },
    { word: 'chemical change', meaning: 'A change in which a new substance is formed. Usually irreversible. Examples: burning, rusting, cooking, digestion, curd from milk' },
    { word: 'reversible', meaning: 'A change that can be undone. Most physical changes are reversible. Example: water → ice → water' },
    { word: 'irreversible', meaning: 'A change that cannot be undone. Most chemical changes are irreversible. Example: burning wood → ash cannot become wood again' },
    { word: 'sublimation', meaning: 'A physical change where a solid converts directly to gas without becoming liquid first. Example: camphor, naphthalene (mothballs)' },
    { word: 'rusting', meaning: 'An irreversible chemical change where iron reacts with oxygen and moisture to form reddish-brown iron oxide (rust). Requires contact with both oxygen and water' },
    { word: 'exothermic', meaning: 'An exothermic change releases heat energy to the surroundings. The surroundings become warmer. Examples: burning, dissolving quicklime in water' },
    { word: 'endothermic', meaning: 'An endothermic change absorbs heat from the surroundings. The surroundings become cooler. Example: dissolving ammonium nitrate in water' },
    { word: 'pasteurisation', meaning: 'Heating milk to high temperature and quickly cooling it to kill harmful microbes. Discovered by Louis Pasteur (1822–1895)' },
    { word: 'ferrous sulphate', meaning: 'The green compound formed when an iron nail is placed in blue copper sulphate solution. Colour change from blue to green is a sign of chemical change' },
  ],
  7: [
    { word: 'cell', meaning: 'The structural and functional unit of all living organisms. First observed by Robert Hooke in 1665 in thin slices of cork under a microscope' },
    { word: 'protoplasm', meaning: 'The entire living content of a cell. Consists of two parts: cytoplasm (outside nucleus) and nucleoplasm (inside nucleus)' },
    { word: 'cytoplasm', meaning: 'The protoplasm between the cell membrane and nuclear envelope. Contains organelles (Golgi, mitochondria, ribosomes, etc.)' },
    { word: 'nucleus', meaning: 'The control centre of the cell. Contains chromosomes with genes. Controls all cell functions and transmits characteristics to offspring' },
    { word: 'mitochondria', meaning: 'The powerhouse of the cell. Double-membrane structures that carry out cellular respiration — releasing energy from food' },
    { word: 'chloroplast', meaning: 'A type of plastid found only in plant cells. Contains green pigment chlorophyll. The site of photosynthesis' },
    { word: 'ribosome', meaning: 'A tiny organelle responsible for protein synthesis. Can be free in cytoplasm or attached to endoplasmic reticulum' },
    { word: 'lysosome', meaning: 'Called suicide bags — contain digestive enzymes that digest food and foreign particles; if ruptured, can destroy the entire cell' },
    { word: 'chromosome', meaning: 'Thread-like structures in the nucleus made of DNA. Carry genes that control characteristics and are passed from parents to offspring' },
    { word: 'organelle', meaning: 'A specialised subunit within a cell with a specific function — like organs of the body but at cellular scale' },
    { word: 'vacuole', meaning: 'Fluid-filled sacs. In plant cells: large and few. In animal cells: small and many. Store food, water, waste' },
    { word: 'centrosome', meaning: 'Found only in animal cells (absent in plant cells). Located near nucleus. Initiates and regulates cell division' },
  ],
  8: [
    { word: 'foliage', meaning: 'The entire set of leaves of a plant. From Latin "folium" meaning leaf' },
    { word: 'lamina', meaning: 'The leaf blade — the wide, flat, green portion of the leaf where photosynthesis takes place. Also called the leaf blade' },
    { word: 'petiole', meaning: 'The stalk that attaches a leaf to the stem at the node. Its extension into the lamina is called the midrib' },
    { word: 'midrib', meaning: 'The central thick vein of a leaf — the continuation of the petiole into the lamina. Branches into a network of smaller veins' },
    { word: 'venation', meaning: 'The arrangement of veins in the leaf blade. Two types: reticulate (network, like peepal) and parallel (like grass)' },
    { word: 'phyllotaxy', meaning: 'The arrangement of leaves on the stem. Three types: alternate (one per node), opposite (two per node), whorled (three or more per node)' },
    { word: 'stomata', meaning: 'Tiny pores on leaves (mainly the lower surface) for gaseous exchange (CO₂ in, O₂ out) and transpiration (water vapour out)' },
    { word: 'transpiration', meaning: 'The loss of water vapour from leaves through stomata. Cools the plant and its surroundings. Leaves release moisture that keeps cities cooler' },
    { word: 'tendril', meaning: 'A thin, wire-like, coiled modification of a leaf (in pea plants). Wraps around a support to help the plant climb upward toward sunlight' },
    { word: 'insectivorous', meaning: 'Insect-eating plants that modify leaves to trap and digest insects for nitrogen. Examples: pitcher plant, Venus fly trap' },
    { word: 'urban heat island', meaning: 'The phenomenon where cities become hotter than surrounding rural areas because glass and concrete trap and reflect heat instead of absorbing it' },
    { word: 'crescograph', meaning: 'A device invented by Sir Jagadish Chandra Bose to measure extremely tiny amounts of plant growth' },
  ],
  9: [
    { word: 'respiration', meaning: 'The cellular process in which food (glucose) combines with oxygen inside cells to release energy. Occurs inside cells. Produces CO₂ and water' },
    { word: 'breathing', meaning: 'The physical process of taking in oxygen-rich air (inhalation) and expelling CO₂-rich air (exhalation). Occurs in the lungs, outside cells' },
    { word: 'pharynx', meaning: 'The funnel-shaped common passage for both food and air. Connects nasal cavity to larynx (air) and oesophagus (food)' },
    { word: 'larynx', meaning: 'The voice box. Contains vocal cords that produce sound. Located between pharynx and trachea' },
    { word: 'trachea', meaning: 'The windpipe — a long, muscular tube connecting the larynx to the bronchi. Runs in front of the food pipe (oesophagus)' },
    { word: 'bronchi', meaning: 'The two branches of the trachea — right bronchus and left bronchus. Each enters one lung. Singular: bronchus' },
    { word: 'diaphragm', meaning: 'The dome-shaped muscular partition below the lungs. The primary muscle of breathing. Contracts during inhalation, relaxes during exhalation' },
    { word: 'inhalation', meaning: 'Breathing in. Diaphragm contracts (moves down) + ribs move up and out → chest volume ↑ → pressure ↓ → air rushes into lungs' },
    { word: 'exhalation', meaning: 'Breathing out. Diaphragm relaxes (moves up) + ribs move in and down → chest volume ↓ → pressure ↑ → air forced out of lungs' },
    { word: 'mucus', meaning: 'A sticky liquid produced by the inner lining of the nose. Traps dust particles and germs, preventing them from entering the lungs' },
    { word: 'asthma', meaning: 'A respiratory disease where bronchi and bronchioles are narrowed and excess mucus is produced, causing difficulty in breathing and coughing' },
    { word: 'pranayam', meaning: 'Traditional yogic breathing exercises that improve lung efficiency and capacity. One of the most effective ways to strengthen the respiratory system' },
  ],
}

// Build a flat word → {word, meaning} map for a given chapter (for tooltip lookup)
export function getSciWordMap(chapterId: number): WordMap {
  const words = SCI_TOOLTIP_WORDS[chapterId] || []
  const map: WordMap = {}
  for (const w of words) {
    map[w.word.toLowerCase()] = w
  }
  return map
}
