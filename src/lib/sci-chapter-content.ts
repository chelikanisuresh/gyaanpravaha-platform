// Science Chapter Content — Gyaanpravaha
// Connexion Class 6 — 9 chapters across Physics, Chemistry, Biology

export interface Section { id: number; title: string; content: string; minReadSeconds?: number }
export interface Chapter {
  id: number; title: string; branch: 'Physics' | 'Chemistry' | 'Biology'
  type: string; estimatedReadMins: number; sections: Section[]
}

// ── CH 1: MAGNETISM ───────────────────────────────────────────────────────────
const ch1: Chapter = {
  id: 1, title: 'Magnetism', branch: 'Physics', type: 'Physics', estimatedReadMins: 16,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Magnetism is one of the most fascinating forces in nature. We interact with magnets every day — in our phones, speakers, refrigerator doors, ATM cards, electric bells, and hundreds of other devices. But what exactly is magnetism? Where does it come from? And how does a magnet work?

This chapter explores the complete science of magnetism — from the ancient Greek shepherd Magnes who first discovered a magnetic rock 4,000 years ago, to the modern electromagnets used in cranes and MRI machines. You will learn about the properties of magnets, how magnets are made, what an electromagnet is, and the many ways magnets are used in everyday life.

By the end of this chapter, you will understand why magnets attract iron but not plastic, why a freely suspended magnet always points north-south, and how an ordinary iron rod can be turned into a powerful magnet simply by passing electricity through a coil wrapped around it.` },
    { id: 2, title: 'About this chapter', content: `The word magnet comes from a place called Magnesia in Northern Greece. According to legend, about 4,000 years ago, a shepherd named Magnes was herding his sheep when he noticed that the nails in his shoes and the iron tip of his staff were being pulled towards a rock. He explored further and discovered the world's first recorded magnetic rock — now called Magnetite or Lodestone. The property of attraction displayed by this rock is what we call Magnetism today.

Michael Faraday (1791–1867), an English scientist, was one of the greatest contributors to our understanding of magnetism. His discoveries in electromagnetism — the relationship between electricity and magnetism — form the foundation of modern technology, from electric motors to generators.

The study of magnetism is part of Physics — specifically the branch dealing with forces and fields. It connects deeply to electricity, as moving electric charges create magnetic fields and changing magnetic fields create electric currents.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define magnetism and explain its history
• Distinguish between magnetic and non-magnetic substances with examples
• List and explain all 6 properties of magnets
• Explain magnetic induction and how it works
• Describe what a magnetic field is
• Distinguish between natural and artificial magnets, and between permanent and temporary magnets
• Explain the two methods of making a magnet (single touch and double touch)
• Describe how an electromagnet is made and how its strength can be increased
• List at least 8 uses of magnets in daily life
• Explain how to demagnetise a magnet and how to store magnets properly` },
    { id: 4, title: 'Read the text', minReadSeconds: 480, content: `MAGNETIC AND NON-MAGNETIC SUBSTANCES

Substances which are attracted by a magnet are called magnetic substances. Materials of iron, nickel, cobalt and their alloys are magnetic substances. Substances which are not attracted by a magnet are called non-magnetic substances. Wood, plastic, paper, glass, brass, copper, aluminium and rubber are non-magnetic substances.

─────

PROPERTIES OF MAGNETS

1. A magnet has two poles — Each magnet has two poles, named South pole and North pole. These poles are located at the two ends. All the power of the magnet is concentrated at its poles. As you move towards the centre, the magnetic power decreases and becomes negligible at the centre.

2. Magnetic poles occur in pairs only — A magnet has both North and South poles and these cannot be separated. If you split a bar magnet into two pieces, each piece will behave as a complete magnet. If you divide further, each part again behaves as a complete magnet with both N and S poles. So poles always occur in pairs.

3. A magnet always rests in a north-south direction — When suspended freely, a magnet always rests in the north-south direction. This is called the directive property of the magnet. The North pole points towards the geographical north and South pole towards the south.

4. A magnet attracts magnetic substances — A magnet attracts magnetic substances when brought in contact or close to it. This property is called the attractive property of magnet.

5. Attraction and repulsion in a magnet — Like (similar) poles of a magnet repel each other while unlike (dissimilar) poles attract each other. Repulsion is a sure test of magnetism.

6. Magnetic induction — Magnetism can be induced in a magnetic substance by bringing a magnet near it. In magnetic induction, there is no actual contact between the magnet and the magnetic substance, but the substance behaves as a magnet.

─────

MAGNETIC FIELD

A magnet has a definite space around it where its attraction can be felt. This is known as the magnetic field. When iron filings are sprinkled around a bar magnet and the table is tapped gently, the iron filings arrange into a pattern showing magnetic field lines.

─────

NATURAL AND ARTIFICIAL MAGNETS

Natural magnets occur in nature, like lodestone. Their magnetic power is generally less and they have no fixed geometrical shape.

Artificial magnets are man-made. They come in different shapes: bar magnet, horse-shoe magnet, cylindrical magnet, ring-shaped magnet, dumbbell-shaped magnet, needle-shaped magnet.

On the basis of nature and strength, artificial magnets are of two types:
Permanent magnets — strong, do not lose magnetisation easily; made from steel or special alloys of iron, nickel and cobalt.
Temporary magnets — made under certain conditions; lose magnetisation when those conditions are reversed; generally made from soft iron.

─────

MAKING OF MAGNETS

The process of magnetising a material is called magnetisation.

Single Touch Method:
• Take an iron bar AB and place it on a table.
• Place one pole of a bar magnet near edge A.
• Without lifting the magnet, move it along the length to edge B.
• Lift the bar magnet and bring it back to A. Repeat in the same direction 30–40 times.
• Edge A becomes the North pole and edge B the South pole.
• The pole of the magnet and the direction of movement must not change.

Double Touch Method:
• Take an iron bar and four bar magnets.
• Place iron bar AB on two magnets as shown.
• Place S and N poles of two other magnets at the middle of the iron bar.
• Move both magnets in opposite directions over the bar.
• Repeat 30–40 times. The ends acquire opposite polarity.

─────

ELECTROMAGNET

A magnet made by using an electric current is called an electromagnet. It is a temporary magnet.

If a bar of soft iron is placed inside a coil of insulated copper wire and electric current is passed through the coil, the iron bar becomes a magnet. One end becomes the North pole and the other the South pole. When the current is turned off, the soft iron bar loses its magnetisation immediately.

The strength of an electromagnet can be increased by:
• Increasing the number of turns in the coil.
• Increasing the current in the coil.

─────

USES OF MAGNETS

• Magnets are used in fancy stickers and decorations on steel.
• Ring-shaped permanent magnets are used in speakers and microphones.
• Electromagnets are used in electric motors, electric bells, dynamos, telephones, telegraph instruments, and transformers.
• Magnets are used in pencil boxes, drawers and refrigerators for proper closing.
• Needle-shaped permanent magnets are used in compasses for direction-finding by navigators, sailors and pilots.
• Strong electromagnets fitted with cranes lift heavy iron articles like iron grinders and machines.
• Magnets are used in toys to give a magical effect.
• Magnets separate magnetic substances from non-magnetic ones in industries.
• Video/audio cassettes contain magnetic tape on which information is encoded.
• ATM cards and credit/debit cards have a magnetic strip containing account information.
• Surgeons use magnets to remove iron splinters from delicate human organs.

─────

DEMAGNETISING A MAGNET

The magnetic property of a magnet can be destroyed by:
• Repeated hammering
• Heating to very high temperature
• Dropping on the floor many times
• Passing a strong current through it
• Bringing in contact with other magnets repeatedly
• Handling very roughly

─────

STORING MAGNETS

Magnets lose magnetic strength slowly when not used (self-demagnetisation). To prevent this:
• Bar magnets should be placed in pairs with opposite poles facing each other, with a wooden piece between them. Magnetic keepers (pieces of soft iron) are placed at the opposite poles.
• A single iron piece works as a keeper for U-shaped or horse-shoe magnets.
• Earth behaves as a huge bar magnet. Its North magnetic pole is near the geographical south pole and the South magnetic pole is near the geographical north pole.` },
    { id: 5, title: 'Word watch', content: `Magnetism — The property of attraction that magnets have. Named after the place Magnesia in Greece, and the shepherd Magnes who first observed it.

Magnetic substance — A substance attracted by a magnet. Examples: iron, nickel, cobalt and their alloys.

Non-magnetic substance — A substance not attracted by a magnet. Examples: wood, plastic, paper, glass, brass, copper, aluminium, rubber.

Poles — The two ends of a magnet where magnetic power is concentrated. Named North pole (N) and South pole (S).

Directive property — The property of a freely suspended magnet to always rest in the north-south direction. This is how a compass works.

Magnetic induction — The process of inducing magnetism in a magnetic substance by bringing a magnet near it, without direct contact.

Magnetic field — The space around a magnet where its attraction can be felt. Visualised using iron filings.

Lodestone (Magnetite) — The naturally occurring magnetic rock that was first discovered. It is natural magnet.

Electromagnet — A temporary magnet created by passing electric current through a coil of wire wound around a soft iron bar. The magnetism disappears when the current is switched off.

Magnetisation — The process by which a material is made into a magnet.

Magnetic keeper — A piece of soft iron used to store bar magnets, placed at opposite poles to prevent self-demagnetisation.

Demagnetisation — The loss of magnetic property. Can be caused by hammering, heating, dropping, passing current, or rough handling.` },
    { id: 6, title: 'Values learnt', content: `Curiosity is the beginning of science — The discovery of magnetism began with a curious shepherd who noticed his nails being pulled towards a rock. He could have ignored it, but he explored. This is exactly how science works — observation plus curiosity leads to discovery. The next great scientific discovery could come from something you notice that most people overlook.

The same force, different uses — The same magnetic force that attracts iron nails also powers electric motors, produces sound in your speakers, stores data on your ATM card, and helps surgeons perform delicate operations. One fundamental force, countless applications. This is the power of understanding the laws of nature — once you understand a principle, it unlocks a world of possibilities.

Handle with care — Just as magnets lose their power if handled roughly or heated or dropped, many valuable things in life require careful handling. Precision instruments, relationships, natural resources, and living organisms all require care to preserve their quality and function.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts to remember:

1. Magnetic substances: iron, nickel, cobalt. Non-magnetic: wood, plastic, paper, glass, brass, copper, aluminium, rubber.

2. Six properties: (a) two poles (N and S); (b) poles occur in pairs only; (c) freely suspended magnet rests N-S (directive property); (d) attracts magnetic substances (attractive property); (e) like poles repel, unlike attract; (f) magnetic induction.

3. Magnetic field = space around magnet where attraction is felt.

4. Natural magnets = lodestone (no fixed shape, weak). Artificial = man-made in fixed shapes (bar, horseshoe, cylindrical, ring, needle, dumbbell).

5. Permanent magnets = steel/special alloys, strong, long-lasting. Temporary magnets = soft iron, lose magnetism when condition reverses.

6. Making magnets: Single touch method (move one pole of magnet in one direction along iron bar, 30–40 times). Double touch method (two magnets moved in opposite directions from middle).

7. Electromagnet = coil of copper wire + soft iron bar + electric current. Strengthen by: more turns in coil OR more current.

8. Demagnetise by: hammering, heating, dropping, strong current, rough handling.

9. Store bar magnets in pairs with opposite poles adjacent, wooden piece between, soft iron keepers at poles.

10. Scientist: Michael Faraday — electromagnetism and electrochemistry.` },
  ],
}

// ── CH 2: SIMPLE MACHINES ─────────────────────────────────────────────────────
const ch2: Chapter = {
  id: 2, title: 'Simple Machines', branch: 'Physics', type: 'Physics', estimatedReadMins: 16,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Every day you use machines — scissors to cut paper, a bottle opener to open a bottle, a bicycle to travel, a crane to lift heavy loads. But what exactly is a machine? And what makes it "simple"?

This chapter introduces the science of simple machines — the basic mechanical devices that make work easier. You will learn how machines help us by multiplying force, changing the direction of force, saving time, and allowing us to perform dangerous tasks safely. You will explore six types of simple machines: the lever, pulley, inclined plane, screw, wedge, and wheel and axle — and see how each one is present in the tools and devices you use every day.

One of the most important concepts in this chapter is the lever — and within it, the three orders of lever. The human arm itself is a third-order lever. The seesaw is a first-order lever. A wheelbarrow is a second-order lever. Once you learn to recognise levers, you will see them everywhere.` },
    { id: 2, title: 'About this chapter', content: `A machine is a device which helps us in the following ways: to multiply force, to change the direction of force, to gain time (increase speed), and to do unsafe and dangerous tasks safely.

A simple machine is a device consisting of very few parts by means of which a force is overcome by another force applied at some other point in some other direction.

Two key terms:
Effort (E) — The force that is applied.
Load (L or W) — The force that is overcome.

Mechanical Advantage (MA) is the ratio of load to effort applied:
MA = Load/Effort = W/E = Effort arm/Load arm

The larger the effort arm, the more the Mechanical Advantage. If the effort arm of a simple machine is longer, we can lift heavier loads with less effort.

From the principle of the lever: Effort × Effort Arm = Load × Load Arm

In 1817, Karl von Drais, a German businessman, invented the first bicycle — a two-wheeled, pedal-less device called the "draisine" constructed almost completely of wood, weighing 22 kg. Today there are about a billion bicycles in the world, twice as many as motorcars.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define a machine and list its four uses
• Define a simple machine, effort, and load
• Define and calculate Mechanical Advantage (MA = Load/Effort)
• Describe all three orders of lever with the position of fulcrum, load, and effort
• Give real-life examples of first, second, and third order levers
• Apply the principle of lever: E × EA = L × LA
• Explain how a pulley works and give examples
• Describe an inclined plane and explain why roads up mountains are made winding
• Describe a screw, wedge, and wheel and axle with examples
• List the rules for maintenance and care of machines` },
    { id: 4, title: 'Read the text', minReadSeconds: 480, content: `FOUR USES OF MACHINES

1. To multiply force — A small force overcomes a large force. Example: a screw jack lifts a car.
2. To change the direction of force — Apply force in a convenient direction. Example: a rope over a pulley pulls a bucket of water upward when you pull downward.
3. To gain time — Machines increase speed. Example: a bicycle saves travelling time.
4. To do unsafe and dangerous tasks — Example: tongs to lift burning coal.

─────

1. THE LEVER

The lever is a rigid bar which is free to turn about a fixed point called the fulcrum.
Load arm = distance between fulcrum and the load.
Effort arm = distance between fulcrum and the effort.

TYPES OF LEVER:

First order lever — Fulcrum is between load and effort.
• Large load can be overcome by small effort when load arm < effort arm.
• Examples: seesaw, scissors, pliers, tin opener.
• Key rule: More load can be overcome with lesser effort if effort arm is longer and load arm is smaller.

Second order lever — Load is between fulcrum and effort.
• Effort arm is always bigger than load arm.
• A smaller effort always overcomes a larger load.
• Examples: wheel barrow, bottle opener, nut cracker.

Third order lever — Effort is between load and fulcrum.
• Effort arm is always smaller than load arm.
• A larger effort is needed to overcome a smaller load.
• Used for delicate jobs such as using forceps to pick up small diamonds.
• Examples: knife, sugar tongs, human forearm (fore-arm).

Principle of lever: Effort × Effort Arm = Load × Load Arm
MA = Effort Arm / Load Arm = Load / Effort

─────

2. PULLEY

A pulley is a simple machine that makes it easier to lift things upwards by changing the direction of applied force. It consists of a wheel with a groove and a rope that passes around the groove. The pulley rotates about an axle fixed to a support called the block.

Example: Drawing water from a well — you pull downward (direction of gravity) instead of pulling upward against gravity. This makes lifting easier.

A pulley is also an example of a first order lever since fulcrum is between load and effort.

─────

3. INCLINED PLANE

The inclined plane is the simplest machine used to raise heavy loads. Example: a wooden plank inclined to the ground.

The lesser the inclination of the plane, the less force is needed to lift the load. Roads going up a mountain are made winding so that the slope is gradual and distance is multiplied, allowing automobiles to climb with less effort.

─────

4. SCREW

A screw is an example of a modified inclined plane (winding inclined plane). It consists of a nail with a winding edge called a thread. The distance between two successive threads is called the pitch.

When one rotation is given to the screw, it moves a vertical distance equal to the pitch. A screwdriver drives a screw more easily than hammering. Screws and bolts join two pieces of wood or metal tightly.

─────

5. WEDGES

A wedge is a device with two or more sloping surfaces that taper to a sharp edge or a point. Examples: knives, chisels, axes, pins, needles, nails. Wedges are used to split or pierce materials.

─────

6. WHEEL AND AXLE

The wheel is the most important invention of mankind. The wheel rotates along a central rod called the axle. Together they form a simple machine. The main advantage: it reduces friction since rolling friction is less than sliding friction. Used in almost all vehicles, wheelchairs, and trolleys.

─────

MECHANICAL ADVANTAGE

MA = Load (W) / Effort (E) = Effort arm / Load arm

Mechanical Advantage has no units — it is a ratio.

Example: Load = 150 N, Effort = 50 N → MA = 150/50 = 3.

─────

MAINTENANCE AND CARE OF MACHINES

Machines have moving parts affected by rusting of iron parts, friction between moving parts, and accumulation of dirt. To make machines work well:
• Clean machines regularly.
• Oil moving parts regularly to reduce friction (reduces noise, wear and tear, and heat).
• Prevent iron parts from rusting by painting or other means.
• Adjust moving parts from time to time.` },
    { id: 5, title: 'Word watch', content: `Machine — A device that makes work easier by multiplying force, changing direction, saving time, or performing dangerous tasks.

Simple machine — A device with very few parts that uses one force to overcome another force applied at a different point in a different direction.

Effort (E) — The force you apply to a machine.

Load (L or W) — The force that the machine overcomes. Also called weight when referring to a heavy object being lifted.

Fulcrum — The fixed point about which a lever turns. In a seesaw, the pivot in the middle is the fulcrum.

Load arm — The distance between the fulcrum and the load.

Effort arm — The distance between the fulcrum and the effort.

First order lever — Fulcrum between load and effort. Examples: seesaw, scissors, pliers.

Second order lever — Load between fulcrum and effort. Examples: wheelbarrow, bottle opener, nutcracker.

Third order lever — Effort between load and fulcrum. Examples: forearm, sugar tongs, forceps.

Mechanical Advantage (MA) — The ratio of load to effort. MA = Load/Effort. A dimensionless ratio. Greater MA means the machine provides more force multiplication.

Pulley — A simple machine using a wheel with a groove and a rope, changing the direction of the applied force.

Inclined plane — A sloped surface used to raise heavy loads with less force. The gentler the slope, the easier the lift.

Screw — A modified inclined plane; a winding inclined plane with a thread. The pitch is the distance between successive threads.

Wedge — A device with two or more sloping surfaces tapering to a sharp edge; used to split or pierce. Examples: knife, axe, needle.

Wheel and axle — A wheel rotating around a central rod (axle) that reduces friction by converting sliding friction into rolling friction.` },
    { id: 6, title: 'Values learnt', content: `Work smarter, not just harder — The entire point of a machine is to achieve the same result with less effort. This is not about being lazy — it is about being intelligent. When you apply more effort arm (like using a longer spoon to open a lid), you get more mechanical advantage. In life, finding smarter ways to solve problems is a sign of intelligence, not laziness.

Small forces can move great things — The principle of the lever shows that a small person can lift a much heavier load if they position the fulcrum correctly. Archimedes said: "Give me a fulcrum and a lever long enough, and I shall move the world." This is a metaphor for life too — find the right leverage point in any situation, and even a small action can have a massive effect.

Maintenance matters — Machines left unattended rust, collect dirt, and wear out. The same is true for skills, relationships, and habits. Regular maintenance — cleaning, oiling, adjusting — keeps both machines and our personal capabilities functioning at their best.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Four uses of machines: multiply force, change direction of force, gain time (speed), do unsafe tasks.

2. Simple machine terms: Effort (E) = force you apply; Load (W) = force to overcome; Fulcrum = fixed pivot.

3. First order lever: Fulcrum between load and effort. Examples: seesaw, scissors, pliers. MA can be >1 or <1.

4. Second order lever: Load between fulcrum and effort. Effort arm always > load arm, so MA > 1. Examples: wheelbarrow, bottle opener, nutcracker.

5. Third order lever: Effort between load and fulcrum. Effort arm always < load arm, so MA < 1. Examples: forearm, forceps, sugar tongs.

6. Principle of lever: Effort × Effort Arm = Load × Load Arm.

7. MA = Load/Effort = Effort arm/Load arm. Larger effort arm → more MA.

8. Pulley: changes direction of force; also a first-order lever.

9. Inclined plane: gentler slope = less force needed. Mountain roads are winding to make slope gradual.

10. Screw = modified inclined plane; pitch = distance between threads.

11. Wedge = two+ sloping surfaces tapering to an edge. Examples: knife, axe, needle, pin.

12. Wheel and axle: rolling friction < sliding friction, reduces effort. Used in all vehicles.

13. MA = 3 means machine multiplies your effort 3 times (MA has no units).

14. Machine maintenance: clean regularly, oil moving parts, prevent rusting, adjust parts.

15. Karl von Drais invented the first bicycle (draisine) in 1817.` },
  ],
}

// ── CH 3: WORK AND ENERGY ────────────────────────────────────────────────────
const ch3: Chapter = {
  id: 3, title: 'Work and Energy', branch: 'Physics', type: 'Physics', estimatedReadMins: 16,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `In everyday language, "work" means almost any activity — studying, talking, eating. But in science, "work" has a very precise and different meaning. You only do work (in the scientific sense) if you apply a force AND the object moves because of it. A person pushing against a wall all day is doing no work at all, scientifically speaking!

Similarly, "energy" in everyday language means vigour or enthusiasm. But in science, energy is defined precisely as the capacity to do work. You cannot do work without energy, and energy is always used when work is done.

This chapter teaches you the scientific definitions of work and energy, the SI unit (joule), the eight forms of energy found in nature, the two types of mechanical energy (potential and kinetic), the important Law of Conservation of Energy, the sources of energy (renewable and non-renewable), and how to conserve energy in daily life.` },
    { id: 2, title: 'About this chapter', content: `James Prescott Joule (1818–1889) was an English physicist who studied the nature of heat and discovered its relationship to mechanical work. This led to the theory of conservation of energy, and the development of the first law of thermodynamics. The SI unit of energy, the joule (J), is named after him. He worked with Lord Kelvin to develop the absolute scale of temperature.

In 1765, James Watt invented the steam engine — in which heat energy is converted to mechanical work. This invention powered the Industrial Revolution.

Energy is one of the most fundamental concepts in all of science. Everything that happens in the universe — from the movement of planets to the firing of neurons in your brain — involves some form of energy conversion. Understanding energy is understanding how the universe works.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define work in the scientific sense and explain the two conditions for work to be done
• State the formula W = F × d and apply it to solve numerical problems
• Define energy and state its SI unit (joule)
• List and give examples of all 8 forms of energy
• Distinguish between potential energy and kinetic energy with examples
• Explain conversion of potential energy into kinetic energy with examples
• State the Law of Conservation of Energy
• List the 5 main sources of energy: sun, water, wind, fuels, biomass
• Distinguish between renewable and non-renewable sources of energy
• List 5 ways to conserve energy
• Solve numerical problems on work (W = F × d)` },
    { id: 4, title: 'Read the text', minReadSeconds: 480, content: `WORK

In Physics, work is said to be done ONLY when:
1. A force acts on the body, AND
2. The force produces motion in the body.

If there is no motion, no work is done even if a large force is applied.

Examples of WORK being done:
• A cyclist pedalling a cycle (force applied + motion = work)
• A horse pulling a cart
• An engine pulling a train
• A coolie lifting a box
• A boy going upstairs

Examples of NO WORK being done:
• A boy pushing a heavy stone that does not move
• A person pushing against a wall
• A coolie standing with a heavy box on his head (no motion, so no work)

─────

MEASUREMENT OF WORK

Work done = Force × Distance moved in the direction of force
W = F × d

The SI unit of force is Newton (N) and the SI unit of distance is metre (m).
SI unit of work = Joule (J) = 1 Newton × 1 Metre = 1 N.m

Numerical Example 1: A force of 200 N moves a body through 2 m. W = 200 N × 2 m = 400 J.
Numerical Example 2: A boy lifts 10 kg to a height of 5 m. Force of gravity on 10 kg = 10 × 10 = 100 N. W = 100 N × 5 m = 500 J.

─────

ENERGY

The energy of a body is its capacity to do work.
Standard unit of energy = joule (J) — same as work.

EIGHT FORMS OF ENERGY:

1. Mechanical Energy — Energy possessed by a body due to its shape, position, or state. Found in two forms: potential energy and kinetic energy. Examples: car in motion, arrow on stretched bow, moving hands of a clock, rock on a high hill.

2. Heat Energy — Energy released when coal, oil, wood or gas is burned. Steam possesses heat energy and can do work (e.g., moving a kettle lid). James Watt used heat energy in the steam engine (1765).

3. Light Energy — A form of energy. A strong beam of light can move dust particles. Proof: the tail of a comet is always directed away from the sun because light particles push the comet's dust away and form a tail.

4. Chemical Energy — Energy possessed by fuels (coal, oil, gas), food, and battery cells. Chemical energy in petrol/diesel moves vehicles. Food gives us chemical energy to work.

5. Sound Energy — A vibrating body possesses sound energy. When sound from a vibrating body reaches our ear membrane, it makes the membrane vibrate and we hear the sound.

6. Magnetic Energy — Energy possessed by a magnet. A magnet can attract an iron nail from a distance and make it move. Electric motors use magnets.

7. Electrical Energy — When two dry bodies are rubbed together they possess electric energy. A comb rubbed on dry hair attracts small bits of paper. Electric current powers fans, lights, and all electrical devices.

8. Atomic Energy — The energy stored in atoms. Used in nuclear reactors to produce electricity (peaceful use) and in atomic bombs (destructive use).

─────

POTENTIAL ENERGY

The energy possessed by a body due to its position or change in shape is known as potential energy.

Examples:
• A wound-up watch spring — potential energy due to wound state.
• A compressed spring — potential energy due to compressed state.
• Stretched rubber band — potential energy due to stretched state.
• Stretched rubber catapult — potential energy due to stretched state.
• Water stored at a height — potential energy due to position.

─────

KINETIC ENERGY

Kinetic energy is the energy possessed by a body by virtue of its motion.

Examples:
• A fast-moving stone can break a window pane — it has kinetic energy.
• A moving hammer drives a nail further into wood.
• A bullet fired from a gun.
• A rolling ball.
• An apple falling from a tree.

Kinetic energy depends on: (1) Mass — greater mass = higher KE. (2) Speed — more speed = higher KE.

─────

CONVERSION OF POTENTIAL ENERGY INTO KINETIC ENERGY

Potential energy can do work only when it gets converted to kinetic energy.

Examples:
• Stretched bow: when released, PE → KE → arrow moves.
• Wound watch spring: as spring unwinds, PE → KE → moves clock hands.
• Compressed spring: when released, PE → KE → ball flies away.
• Stretched rubber band: when released, PE → KE → band snaps back.
• Water at height: when falls, PE → KE → turns a turbine.

─────

CONVERSION OF ONE FORM OF ENERGY INTO ANOTHER

| Appliance | Energy Conversion |
| Electric heater, Geyser, Toaster | Electrical → Heat |
| Electric cell | Chemical → Electrical |
| Glowing bulb | Electrical → Heat + Light |
| Electric Bell | Electrical → Sound |
| Microphone | Sound → Electrical |
| Loudspeaker | Electrical → Sound |
| Photocell | Light → Electrical |

─────

LAW OF CONSERVATION OF ENERGY

Energy can neither be created nor be destroyed. It can only be changed from one form to another. The total amount of energy in the universe always remains constant.

─────

SOURCES OF ENERGY

1. Sun — The main source. Gives heat and light. Used in solar cookers, solar water heaters. Green plants use light for photosynthesis.
2. Water — Flowing rivers have kinetic energy used to generate electricity and carry timber.
3. Wind — Strong winds have enormous kinetic energy used in windmills and sailboats.
4. Fuels — Coal, wood, petrol, diesel, etc. have chemical energy.
5. Biomass — Decomposed biological matter (cow dung, sewage, garbage, crop residue). Burned or converted to biogas (mixture of methane and carbon dioxide).

─────

RENEWABLE AND NON-RENEWABLE SOURCES

Renewable sources: Can be used again and again, never run out. Sun, wind, flowing water, biomass. Freely available and do not pollute the environment.

Non-renewable sources: Once used, cannot be replaced. Coal, petrol, diesel, kerosene, natural gas. Costly and pollute the environment.

─────

CONSERVATION OF ENERGY

The economic use of energy is called Conservation of Energy. Ways to conserve:
1. Do not waste drinking water (electrical energy is used to purify and pump water).
2. Use a pressure cooker to save cooking gas.
3. Drive a vehicle only when necessary.
4. Switch off fans, lights, and appliances when leaving a room.
5. Do not waste materials like cloth, paper, glass, plastic — manufacturing requires energy.` },
    { id: 5, title: 'Word watch', content: `Work (W) — In science: Work = Force × Distance moved in the direction of force. Only done when force produces motion.

Joule (J) — The SI unit of both work and energy. 1 Joule = 1 Newton × 1 Metre. Named after James Prescott Joule.

Newton (N) — The SI unit of force.

Energy — The capacity to do work. Measured in joules.

Mechanical energy — Energy possessed by a body due to its shape, position, or motion. Has two forms: potential and kinetic.

Potential energy (PE) — Energy possessed by a body due to its position or change in shape. Stored energy. Examples: water at height, compressed spring, stretched rubber band.

Kinetic energy (KE) — Energy possessed by a body by virtue of its motion. Examples: moving car, flying arrow, rolling ball.

Chemical energy — Energy stored in fuels, food, and batteries. Released through chemical reactions.

Atomic energy — Energy stored in atoms. Used in nuclear reactors and nuclear weapons.

Renewable energy — Sources that can be used again and again and will not run out. Examples: sun, wind, water, biomass.

Non-renewable energy — Sources that once used, cannot be replaced. Examples: coal, petrol, diesel, natural gas.

Biomass — Decomposed biological matter (cow dung, garbage, crop waste). Has chemical energy.

Biogas — A mixture of methane and carbon dioxide produced from biomass decomposition. A non-polluting fuel.

Law of Conservation of Energy — Energy can neither be created nor destroyed; it can only change from one form to another.

Conservation of energy — The economic use of energy to prevent waste.` },
    { id: 6, title: 'Values learnt', content: `Effort must produce results — In science, pushing against a wall all day counts as zero work. In life, busyness without results is not productivity. True work means applying effort in a way that creates movement — towards a goal, a solution, or a change. The scientific definition of work is also a powerful metaphor: are you applying force in the right direction, with enough strength to produce actual motion?

Energy is never lost — only transformed — The Law of Conservation of Energy says energy is never created or destroyed, only changed. This is one of the deepest truths in all of science. It means that every bit of energy in the universe has always existed and always will — just in different forms. This is also a comforting idea: nothing is truly lost, only transformed.

Conserve what is finite — Non-renewable energy sources like coal and petrol took millions of years to form. We are burning them in decades. Conservation of energy is not just a scientific topic — it is a moral responsibility. Switching off lights when you leave a room, using a pressure cooker, walking instead of driving — these small actions have real impact when practiced by millions of people.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Scientific definition of work: W = F × d. Two conditions: force must act ON body AND body must move.

2. SI unit of work = joule (J). 1 J = 1 N × 1 m. Named after James Prescott Joule.

3. Energy = capacity to do work. SI unit = joule.

4. 8 forms of energy: Mechanical, Heat, Light, Chemical, Sound, Magnetic, Electrical, Atomic.

5. Mechanical energy: Potential (due to position/shape) + Kinetic (due to motion).

6. Potential energy examples: water at height, compressed spring, wound spring, stretched rubber band.

7. Kinetic energy examples: moving stone, rolling ball, falling apple, fired bullet.

8. PE → KE: stretched bow releases arrow; water at height falls and turns turbine; watch spring unwinds.

9. Law of Conservation of Energy: energy cannot be created or destroyed, only changed from one form to another.

10. Sources of energy: Sun, Water, Wind, Fuels, Biomass.

11. Renewable: sun, wind, water, biomass (never run out, free, non-polluting).

12. Non-renewable: coal, petrol, diesel, natural gas (run out, costly, polluting).

13. Biogas = methane + carbon dioxide from biomass decomposition.

14. Conservation of energy: switch off lights, use pressure cooker, drive only when needed, don't waste water.

15. Numerical formula: W = F × d. If F = 200 N, d = 2 m → W = 400 J.` },
  ],
}

// ── CH 4: INTRODUCTION TO CHEMISTRY ─────────────────────────────────────────
const ch4: Chapter = {
  id: 4, title: 'Introduction to Chemistry', branch: 'Chemistry', type: 'Chemistry', estimatedReadMins: 10,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Look around you. Everything you see — the air you breathe, the food you eat, the clothes you wear, the medicines that make you well, the soap you use — is made of chemical substances. Chemistry is the branch of science that explains all of this.

This chapter introduces you to the world of chemistry — what it is, how it developed from ancient times to the modern day, and how chemistry impacts virtually every aspect of daily life. You will learn about the great scientists who shaped chemistry: Antoine Lavoisier, the father of modern chemistry; John Dalton, who gave us atomic theory; and Jons Berzelius, who created the symbols of elements we still use today.

You will discover how chemistry helps agriculture grow more food, helps doctors create life-saving medicines, gives us the synthetic fibres in our clothes, and creates everything from cosmetics to construction materials.` },
    { id: 2, title: 'About this chapter', content: `Chemistry is a branch of science that deals with the study of different kinds of substances, their nature and properties, and how they react with each other. A person who studies and specialises in chemistry is called a chemist.

Modern chemistry has developed many specialised branches: Inorganic chemistry, Organic chemistry, Physical chemistry, Analytical chemistry, Biochemistry, Nuclear chemistry.

Chemistry has given rise to many technologies: rubber, plastic, glass, cement, fuel, paper, and thousands more.

The ancient Indian civilisation of Harappa (about 2500 B.C.) used metals like copper, lead, and tin, and alloys like bronze. They made fire-baked bricks and clay pots. About 3000 years ago, iron was extracted in India — showing that chemical processes have been part of Indian civilisation for millennia.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define chemistry and what a chemist does
• Describe how chemistry developed from ancient civilisations to modern times
• Name the father of modern chemistry (Antoine Lavoisier)
• Name John Dalton's contribution (atomic theory) and Jons Berzelius's contribution (symbols of elements)
• List the branches of modern chemistry
• Explain how chemistry helps in: food and agriculture, clothing, medicines, cosmetics
• Appreciate the importance of chemistry in everyday life` },
    { id: 4, title: 'Read the text', minReadSeconds: 300, content: `WHAT IS CHEMISTRY?

Chemistry is a branch of science that deals with the study of different kinds of substances, their nature and properties, and how they react with each other. A person who studies and gains specialisation in chemistry is called a chemist.

─────

DEVELOPMENT OF CHEMISTRY

Chemistry in Ancient Days:
• Many chemical processes were known to ancient civilisations worldwide.
• People extracted metals like copper, iron, tin, lead, gold, silver and made alloys such as bronze.
• They made glass, ceramics, paper, pigments, and gunpowder.
• People in Harappa (about 2500 B.C.) used copper, lead, tin, and bronze. They made fire-baked bricks and clay pots. Iron was extracted in India about 3000 years ago.
• Until the 17th century, most scientists believed everything was made of four elements: air, water, fire, and earth. Some added space as a fifth element.

Modern Developments in Chemistry:
• Modern chemistry began with the work of French scientist Antoine Lavoisier (1743–1794) — considered the father of modern chemistry.
• John Dalton (1766–1844), an English chemist, gave the famous atomic theory.
• Jons Berzelius (1779–1884), a Swedish chemist, gave the modern symbols of elements.
• Modern chemistry has developed many branches: Inorganic, Organic, Physical, Analytical, Biochemistry, Nuclear chemistry.
• It has given rise to rubber, plastic, glass, cement, fuel, paper, and many more technologies.

─────

CHEMISTRY IN DAILY LIFE

Food and Chemistry:
• Chemistry helps agriculture in production of artificial fertilisers, better seeds, insecticides, pesticides, fungicides, and herbicides.
• Food items like curd, butter, cheese, ghee, refined oil, baby food, and beverages are obtained by various chemical processes.

Clothing and Chemistry:
• Chemistry has enabled us to make better clothing materials.
• Natural fibres like cotton, wool, and silk are given better looks by chemical processes like dyeing and bleaching.
• Synthetic fibres like nylon, rayon, and terylene, and flame-proof textiles are gifts of chemistry.

Chemistry and Medicines:
• Various medicines prescribed by doctors are manufactured as a result of many chemical reactions.
• These life-saving drugs have enabled us to live healthier and longer lives.

Chemistry and Cosmetic Industry:
• All kinds of powders, creams, nail polishes, lipsticks, cleansing lotions, soaps, and detergents are the result of research by chemists.` },
    { id: 5, title: 'Word watch', content: `Chemistry — The branch of science that studies substances, their nature and properties, and how they react with each other.

Chemist — A person who studies and specialises in chemistry.

Alloy — A mixture of two or more metals. Examples: bronze (copper + tin), brass (copper + zinc), steel (iron + carbon).

Inorganic chemistry — The study of substances that do not contain carbon (or contain carbon in simple forms like CO₂).

Organic chemistry — The study of carbon-containing compounds (most substances found in living organisms).

Atomic theory — John Dalton's theory stating that all matter is made of atoms, which are the smallest particles of an element.

Fertiliser — A substance added to soil to increase its nutrient content and help crops grow. Chemistry has enabled production of artificial fertilisers.

Synthetic fibre — Man-made fibre produced by chemical processes. Examples: nylon, rayon, terylene. Unlike natural fibres (cotton, wool, silk), synthetic fibres are gifts of chemistry.

Antoine Lavoisier (1743–1794) — French scientist, called the father of modern chemistry. He established the law of conservation of mass and the role of oxygen in combustion.

John Dalton (1766–1844) — English chemist who proposed the atomic theory — that all matter is made of indivisible atoms.

Jons Berzelius (1779–1884) — Swedish chemist who created the system of element symbols still used today (H for hydrogen, O for oxygen, Fe for iron, etc.).` },
    { id: 6, title: 'Values learnt', content: `Chemistry is the science of everyday life — Every substance you interact with daily — the water you drink, the food you eat, the medicines you take, the fabric you wear — involves chemistry. Chemistry is not just a subject in a textbook; it is the language of the physical world. Learning chemistry means learning to understand and appreciate the world around you at a deeper level.

Science is built on the shoulders of giants — Modern chemistry stands on the work of Lavoisier, Dalton, Berzelius, and thousands of others who came before. Science is a collaborative, multigenerational project. Every discovery builds on previous discoveries. When you learn these concepts, you are joining that long chain of human understanding.

Chemistry can both harm and heal — The same chemistry that creates life-saving medicines can also create harmful pesticides. The same chemistry that makes flame-proof textiles also creates synthetic plastics that pollute oceans. Chemistry is a tool — its impact depends entirely on the values and wisdom of the people who use it. Science without ethics is dangerous.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Chemistry = study of substances, their nature, properties, and how they react.

2. Father of modern chemistry = Antoine Lavoisier (1743–1794), French scientist.

3. John Dalton (1766–1844) = English chemist, atomic theory.

4. Jons Berzelius (1779–1884) = Swedish chemist, symbols of elements.

5. Ancient chemistry: extracting metals, making alloys (bronze), glass, ceramics, paper, gunpowder. Harappa used copper, lead, tin, bronze from 2500 B.C.

6. Old belief: everything made of 4 elements — air, water, fire, earth (until 17th century).

7. Branches of modern chemistry: Inorganic, Organic, Physical, Analytical, Biochemistry, Nuclear.

8. Chemistry and food: fertilisers, better seeds, insecticides, pesticides; food processing (curd, butter, cheese, ghee).

9. Chemistry and clothing: dyeing, bleaching of natural fibres; synthetic fibres (nylon, rayon, terylene).

10. Chemistry and medicines: most drugs manufactured through chemical reactions.

11. Chemistry and cosmetics: all powders, creams, soaps, detergents are products of chemical research.` },
  ],
}

// ── CH 5: STRUCTURE OF ATOM ──────────────────────────────────────────────────
const ch5: Chapter = {
  id: 5, title: 'Structure of Atom', branch: 'Chemistry', type: 'Chemistry', estimatedReadMins: 14,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `What is the smallest possible piece of matter? If you keep dividing a substance — cut it in half, then half again, and again — where do you stop? The ancient Indian sage Kanada was perhaps the first to suggest that all matter, irrespective of its physical state, is composed of very small particles he called parmanu or anu. Today we call these atoms.

This chapter takes you deep inside matter — all the way to the atom. You will learn what an atom is made of: a nucleus containing protons and neutrons, surrounded by electrons moving in shells. You will learn the important terms: atomic number (Z = number of protons), mass number (A = protons + neutrons), and electronic configuration (how electrons are arranged in shells).

You will also study the elements from Hydrogen (atomic number 1) to Argon (atomic number 18), and learn how to find the number of neutrons and draw electronic configurations from the atomic number and mass number alone.` },
    { id: 2, title: 'About this chapter', content: `The great Indian sage Kanada (around 600 B.C.) first proposed that all matter is made of indivisible particles called parmanu or anu — a concept strikingly similar to the modern atom.

Neil Bohr (1940) visualised the atom in its Modern concept. He concluded that an atom consists of a central nucleus (containing protons and neutrons) and electrons revolving around the nucleus in different shells or orbits — imaginary paths surrounding the nucleus.

Ernest Rutherford (1871–1937), an English physicist, studied the atomic model through his famous gold foil experiment. He discovered the atomic nucleus — the small, dense, positively charged centre of the atom. In 1921 he predicted the existence of the neutron. His model of the nuclear atom became the basis of modern concepts of atomic structure.

John Dalton (1766–1844) gave the atomic theory — that all matter is made of atoms, the smallest particles of an element that can take part in a chemical reaction.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define an atom and explain its significance as the basic unit of matter
• Name the three subatomic particles (proton, neutron, electron) with their charge and mass
• Define atomic number (Z) and mass number (A) and write formulas: Z = p = e; A = n + p
• Find the number of neutrons when given atomic number and mass number
• Name the electron shells (K, L, M, N) and state their maximum capacity (2n²)
• Write the electronic configuration of elements up to atomic number 18
• Recognise the symbols, mass numbers, and atomic numbers of H, He, Li, Be, B, C, N, O, F, Ne, Na, Mg, Al, Si, P, S, Cl, Ar
• Solve numerical problems on atomic structure` },
    { id: 4, title: 'Read the text', minReadSeconds: 420, content: `WHAT IS AN ATOM?

• An atom is the basic unit of matter.
• It is the smallest particle of an element which can take part in a chemical reaction and may or may not exist separately.
• The great Indian sage Kanada was perhaps the first to suggest that all matter is composed of very small particles called parmanu or anu.

Neil Bohr visualised the atom in its Modern concept: atom consists of a central nucleus (containing protons and neutrons), and electrons revolving around the nucleus in different shells or orbits.

─────

STRUCTURE OF AN ATOM — KEY TERMS

| Term | Description |
|------|-------------|
| Orbit (Shell) | Imaginary paths along which electrons revolve |
| Electron [e] | Subatomic particle with negative charge [-1] and negligible mass [0] |
| Nucleus | Centre of the atom, containing protons and neutrons |
| Proton [p] | Subatomic particle with positive charge [+1] and unit mass [1] |
| Neutron [n] | Subatomic particle with no charge [0] and unit mass [1] |

─────

IMPORTANT TERMS

1. Atomic Number (Z) = Number of protons [p] in an atom = Number of electrons [e]
   (Because an atom is neutral: number of protons = number of electrons)
   Z = p = e

2. Mass Number (A) = Total number of neutrons [n] + protons [p] in the atom
   A = n + p
   Therefore: n = A − Z

3. Orbits/Shells — Electrons revolve in imaginary paths called orbits or shells:
   K shell (first, n=1), L shell (second, n=2), M shell (third, n=3), N shell (fourth, n=4)

4. Electronic Configuration — The arrangement of electrons in different shells.
   Maximum electrons in each shell = 2n² (where n = shell number)
   K shell (n=1): 2×1² = 2 electrons
   L shell (n=2): 2×2² = 8 electrons
   M shell (n=3): 2×3² = 18 electrons

Atomic symbol representation: ᴬZ X (where X is element symbol, A is mass number, Z is atomic number)

─────

ELEMENTS TABLE (Hydrogen to Argon)

| Element | Symbol | Mass No. (A) | Atomic No. (Z) |
|---------|--------|--------------|----------------|
| Hydrogen | H | 1 | 1 |
| Helium | He | 4 | 2 |
| Lithium | Li | 7 | 3 |
| Beryllium | Be | 9 | 4 |
| Boron | B | 11 | 5 |
| Carbon | C | 12 | 6 |
| Nitrogen | N | 14 | 7 |
| Oxygen | O | 16 | 8 |
| Fluorine | F | 19 | 9 |
| Neon | Ne | 20 | 10 |
| Sodium | Na | 23 | 11 |
| Magnesium | Mg | 24 | 12 |
| Aluminium | Al | 27 | 13 |
| Silicon | Si | 28 | 14 |
| Phosphorus | P | 31 | 15 |
| Sulphur | S | 32 | 16 |
| Chlorine | Cl | 35 | 17 |
| Argon | Ar | 40 | 18 |

─────

SOLVED EXAMPLES

Example 1: Atomic number of Magnesium is 12, mass number is 24.
Z = 12 → protons = 12, electrons = 12
Neutrons = A − Z = 24 − 12 = 12
Electronic configuration: K=2, L=8, M=2

Example 2: Atom X has 18 electrons and 22 neutrons.
Atomic number = no. of electrons = 18
Mass number = p + n = 18 + 22 = 40
Symbol: ⁴⁰₁₈X
Electronic configuration: K=2, L=8, M=8

Example 3: ³⁵₁₇Cl → protons=17, electrons=17, neutrons=35−17=18
Electronic configuration: K=2, L=8, M=7` },
    { id: 5, title: 'Word watch', content: `Atom — The basic unit of matter. The smallest particle of an element that can take part in a chemical reaction.

Parmanu / Anu — The ancient Indian name for the smallest particle of matter, proposed by sage Kanada around 600 B.C.

Nucleus — The central, dense, positively charged part of an atom. Contains protons and neutrons.

Proton (p) — Subatomic particle in the nucleus. Charge = +1. Mass = 1 atomic mass unit. Number of protons = atomic number.

Neutron (n) — Subatomic particle in the nucleus. Charge = 0 (neutral). Mass = 1 atomic mass unit. Number of neutrons = A − Z.

Electron (e) — Subatomic particle revolving around the nucleus in shells. Charge = −1. Mass ≈ 0 (negligible).

Atomic number (Z) — Number of protons (= number of electrons) in an atom. Z = p = e.

Mass number (A) — Total number of protons and neutrons in the nucleus. A = p + n.

Shells/Orbits — Imaginary circular paths around the nucleus where electrons revolve. Named K, L, M, N (from inside out). K holds max 2, L holds max 8, M holds max 18 electrons.

Electronic configuration — The arrangement of electrons in shells. Formula: maximum electrons in nth shell = 2n².

Subatomic particles — Particles smaller than an atom that make up an atom: protons, neutrons, electrons.

Kanada — Ancient Indian sage (around 600 B.C.) who first proposed that matter is made of indivisible particles (parmanu/anu).

Neil Bohr — Physicist who proposed the modern model of the atom (1940) with electrons in defined shells.

Ernest Rutherford — English physicist who discovered the atomic nucleus through the gold foil experiment. Predicted the neutron.` },
    { id: 6, title: 'Values learnt', content: `India's ancient scientific heritage — The concept of the atom was first proposed not by a European scientist but by the ancient Indian sage Kanada, centuries before John Dalton. India's contribution to science and mathematics is immense — from zero (shunya) to the atom (parmanu), from the decimal system to the concept of infinity. Learning science is also about reclaiming and celebrating this heritage.

The universe is mostly empty space — An atom is almost entirely empty space. The nucleus is incredibly tiny compared to the overall size of the atom — if an atom were the size of a football stadium, the nucleus would be the size of a marble in the centre. This means that the solid, dense world we experience is actually mostly empty space held together by invisible forces. Physics shows us that reality is far stranger and more beautiful than it appears.

Precision unlocks understanding — In this chapter, exact numbers matter enormously. The difference of one proton distinguishes carbon (Z=6) from nitrogen (Z=7) — entirely different elements with entirely different properties. Precision — in measurement, in thinking, in communication — is what makes science reliable and powerful.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Atom = basic unit of matter. Smallest particle of element that can take part in chemical reaction.

2. Three subatomic particles: Proton (+1 charge, mass 1, in nucleus), Neutron (0 charge, mass 1, in nucleus), Electron (−1 charge, mass 0, in shells).

3. Atomic number Z = number of protons = number of electrons. Z = p = e.

4. Mass number A = protons + neutrons. A = p + n. So neutrons n = A − Z.

5. Shells: K (max 2), L (max 8), M (max 18). Formula: 2n².

6. Electronic configuration of Mg (Z=12, A=24): K=2, L=8, M=2. Neutrons = 24−12 = 12.

7. Sage Kanada first proposed the concept of parmanu (atom) in ancient India.

8. Neil Bohr — modern atomic model (electrons in shells). Ernest Rutherford — discovered nucleus.

9. Key elements: H(1), He(2), Li(3), C(6), N(7), O(8), Na(11), Mg(12), Al(13), Cl(17), Ar(18).

10. ³⁵₁₇Cl: Z=17 (protons=17, electrons=17), neutrons=35−17=18, config: K=2, L=8, M=7.` },
  ],
}

// ── CH 6: PHYSICAL AND CHEMICAL CHANGES ──────────────────────────────────────
const ch6: Chapter = {
  id: 6, title: 'Physical and Chemical Changes', branch: 'Chemistry', type: 'Chemistry', estimatedReadMins: 14,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Things around us are constantly changing. Ice melts into water. Water evaporates into vapour. Iron rusts. Wood burns to ash. Curd is made from milk. Some of these changes are easily reversible — you can freeze water back to ice. Others are permanent — you cannot unburn ash back to wood.

This chapter teaches you to classify all the changes happening around you into two fundamental categories: physical changes and chemical changes. You will learn the precise definition of each, see examples from daily life, and understand the key differences between them. You will also learn about exothermic changes (which release heat) and endothermic changes (which absorb heat), and the conditions required for a chemical change to occur.

Understanding the difference between physical and chemical changes is one of the most foundational skills in chemistry — it explains everything from cooking food, to rusting of iron, to making curd from milk.` },
    { id: 2, title: 'About this chapter', content: `Louis Pasteur (1822–1895) made one of the most important discoveries related to chemical change in biology. He found that milk turning sour is caused by microbes — and that heating milk to a high temperature and quickly cooling it kills these microbes. This technique is called Pasteurisation, and is why we can store milk safely in the refrigerator today. Every carton of pasteurised milk is a product of our understanding of chemical change.

Chemical changes are at the heart of cooking, digestion, metabolism, manufacturing, and all biological processes. Every time your body converts food to energy, that is a chemical change. Every time you cook a meal, you are causing chemical changes. Understanding what makes a change chemical (new substance formed, usually irreversible) vs physical (no new substance, usually reversible) is one of the most practically useful concepts in science.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define physical change and list examples
• Define chemical change and list examples
• State 4 differences between physical and chemical changes
• Identify changes as physical or chemical given an example
• List 5 changes that accompany a chemical reaction
• List 5 conditions required for a chemical change
• Explain what exothermic and endothermic changes are with examples
• Explain rusting as a chemical change and state its conditions
• Describe the key experiments (vinegar + baking powder, magnesium + acid, copper sulphate + iron)` },
    { id: 4, title: 'Read the text', minReadSeconds: 420, content: `PHYSICAL CHANGE

A change in which no new material is formed is called a physical change. A physical change is usually reversible.

Examples of physical changes:
• Freezing water into ice (solid → liquid → solid again)
• Stretching a rubber band (it returns to original shape)
• Inflating a balloon (air can be let out)
• Melting: solid to liquid on heating
• Vaporisation: liquid to vapour
• Condensation: gas to liquid
• Freezing: liquid to solid
• Sublimation: solid to gas
• Dissolution of solute in solvent
• Magnetisation of an iron nail
• Ringing of an electric bell
• Heating and glowing of tungsten wire in an electric bulb

─────

CHEMICAL CHANGE

A change in which a new material is formed is called a chemical change. Chemical changes are usually irreversible.

Examples of chemical changes:
• Burning of incense stick → ash formed (irreversible)
• Baking powder + vinegar → CO₂ gas produced (new substance)
• Digestion of food
• Respiration
• Making of curd from milk
• Ripening of fruits
• Burning of a candle
• Burning a magnesium ribbon (Mg + O₂ → Magnesium oxide/white ash)
• Bursting of a cracker
• Burning of gas
• Cooking of food
• Rusting of iron
• Charcoal + Oxygen → Carbon dioxide
• Copper sulphate + Iron → Ferrous sulphate (green) + Copper (reddish brown)
• Magnesium + Hydrochloric acid → Magnesium chloride + Hydrogen gas

A chemical change is generally called a chemical reaction.

─────

DIFFERENCES BETWEEN PHYSICAL AND CHEMICAL CHANGES

| | Physical Change | Chemical Change |
|---|-----------------|-----------------|
| 1 | No new substance formed | A new substance is formed |
| 2 | Usually reversible | Usually irreversible |
| 3 | Accompanied by change in shape, size, or state | Accompanied by change in colour, heat/light, gas, sound, or smell |
| 4 | Usually temporary | Usually permanent |

─────

CHANGES THAT ACCOMPANY A CHEMICAL REACTION

1. Release or absorption of energy in the form of heat or light — Burning crackers releases heat and light.
2. Evolution of a gas — Magnesium + HCl → hydrogen gas is evolved.
3. Production of sound — Explosion when crackers burst.
4. Change in smell — Spoilage of food produces a foul smell.
5. Change in colour — Iron nail in copper sulphate solution: blue solution → green (ferrous sulphate) + reddish-brown copper deposited on nail.

─────

CONDITIONS FOR CHEMICAL CHANGES

1. Substances must be in contact — Iron must contact moist air for rusting.
2. Formation of a solution — Iron + copper sulphate must be in solution form for reaction.
3. Presence of heat — Food gets cooked on heating; paper burns on heating.
4. Presence of light — Photosynthesis occurs only in presence of light.
5. Passing current — Water breaks down into hydrogen and oxygen only when electricity is passed through it.

─────

EXOTHERMIC AND ENDOTHERMIC CHANGES

Exothermic changes — Chemical changes that release heat energy to the surroundings.
Examples:
• Vegetable matter rotting to form compost (gives out heat)
• Burning a matchstick (lots of heat produced)
• Adding acid to water (water becomes warm)
• Dissolving caustic soda (sodium hydroxide) in water (beaker becomes hot)
• Dissolving quick lime in water (heat given out)

Endothermic changes — Chemical changes that absorb heat energy from the surroundings.

─────

RUSTING

When shiny iron nails are kept in a plate outdoors and the weather is humid, a new brownish substance forms on the nails. This is rust — iron oxide. You cannot get the shiny iron nails back from the rusted ones. Rusting is an irreversible chemical change.

Charcoal + Oxygen → Carbon dioxide
Magnesium + Oxygen → Magnesium oxide (white ash)

These are all chemical changes — new substances are formed and the original substances cannot be recovered.` },
    { id: 5, title: 'Word watch', content: `Physical change — A change in which no new substance is formed. Usually reversible. Examples: melting, boiling, stretching, dissolving.

Chemical change — A change in which a new substance is formed. Usually irreversible. Examples: burning, rusting, digestion, cooking.

Reversible change — A change that can be undone. Example: ice → water → ice. Most physical changes are reversible.

Irreversible change — A change that cannot be undone. Example: burning → ash. Most chemical changes are irreversible.

Chemical reaction — Another name for a chemical change. Involves the formation of one or more new substances.

Exothermic change — A chemical change that releases heat to the surroundings. The surroundings become warmer. Examples: burning, dissolving quicklime in water.

Endothermic change — A chemical change that absorbs heat from the surroundings. The surroundings become cooler. Example: dissolving ammonium nitrate in water.

Rusting — The formation of reddish-brown iron oxide on iron when it reacts with oxygen and moisture in the air. Rusting is an irreversible chemical change.

Evolution of gas — The production and release of a gas as a result of a chemical reaction. Example: vinegar + baking powder → CO₂ gas.

Sublimation — A physical change in which a solid converts directly to gas without becoming liquid first. Example: camphor sublimes directly to vapour.

Pasteurisation — The process of heating milk to a high temperature and quickly cooling it to kill harmful microbes. Named after Louis Pasteur.

Photosynthesis — The process by which green plants use light energy to convert carbon dioxide and water into food (glucose) and oxygen. Requires presence of light — a condition for this chemical change.` },
    { id: 6, title: 'Values learnt', content: `Not all changes are equal — Some changes are reversible, others permanent. In life too, some mistakes can be corrected (like a physical change), while others create lasting consequences (like a chemical change). Understanding which type of change you are making — and whether it can be undone — is a skill that applies to decisions in science, in relationships, and in life.

Conditions matter — A chemical change does not happen in isolation. It requires specific conditions: contact between substances, a solution, heat, light, or electricity. Similarly, growth in life requires conditions — the right environment, the right people around you, the right habits. Creating the right conditions is often more important than the final result.

Everything that changes is either physical or chemical — This simple binary classification turns out to be a powerful tool for understanding all the changes in the world around us. The scientific habit of classifying and categorising observations — sorting the world into "does this form a new substance or not?" — is the first step in understanding any phenomenon.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Physical change: no new substance formed, usually reversible, changes in shape/size/state. Examples: melting, boiling, freezing, stretching, magnetisation, glowing bulb.

2. Chemical change: new substance formed, usually irreversible, chemical reaction. Examples: burning, rusting, digestion, curd from milk, cooking, bursting crackers.

3. 4 differences: (a) new substance? (b) reversible? (c) physical change = shape/size/state; chemical change = colour/heat/gas/sound/smell. (d) temporary vs permanent.

4. 5 signs of a chemical reaction: heat/light release or absorption, evolution of gas, production of sound, change in smell, change in colour.

5. 5 conditions for chemical change: contact between substances, solution formation, presence of heat, presence of light, passing of electric current.

6. Exothermic = releases heat (burning matchstick, dissolving quicklime, adding acid to water).

7. Rusting = iron + oxygen + moisture → iron oxide (brown). Irreversible chemical change.

8. Key reactions: Mg + O₂ → MgO (white ash); Charcoal + O₂ → CO₂; Copper sulphate + Iron → Ferrous sulphate (green) + Copper (reddish-brown).

9. Pasteurisation: heating milk to kill microbes — based on understanding chemical change. Named after Louis Pasteur.

10. Vinegar + baking powder → CO₂ gas (turns lime water milky). New substance = chemical change.` },
  ],
}

// ── CH 7: CELL – THE BASIC UNIT OF LIFE ──────────────────────────────────────
const ch7: Chapter = {
  id: 7, title: 'Cell – The Basic Unit of Life', branch: 'Biology', type: 'Biology', estimatedReadMins: 14,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Every living thing — from the tiniest bacterium to the largest blue whale, from a blade of grass to a towering banyan tree — is made of cells. The cell is the structural and functional unit of all living organisms. Everything that living things do — grow, reproduce, respond to the environment, convert food to energy — happens at the cellular level.

This chapter introduces you to the world of cells. You will learn how Robert Hooke first observed cells under a microscope in 1665, what the main parts of a cell are, and what each part (organelle) does. You will compare plant cells and animal cells, understand why the nucleus is called the "control centre" of the cell, why mitochondria are called the "powerhouse" of the cell, and why lysosomes are called "suicide bags."

By the end of this chapter, you will be able to label a plant and animal cell diagram and explain the function of every major organelle.` },
    { id: 2, title: 'About this chapter', content: `Robert Hooke (1635–1703) was an English natural philosopher and architect. In 1665, he examined very thin slices of cork under a coarse, compound microscope and saw a multitude of tiny pores that looked like the walled compartments a monk would live in. He called them "cells" — the name they still bear. However, Hooke did not know about their structure or function. His observations gave no indication of the nucleus and organelles found in most living cells.

The word "cell" comes from the Latin "cella" meaning small room — a perfect description of what Hooke saw.

Modern cell biology has revealed an extraordinary complexity inside every cell. A single human cell contains about 3 billion base pairs of DNA, produces thousands of different proteins, and performs millions of chemical reactions per second. Every cell in your body — and there are about 37 trillion of them — is more complex than any machine ever built by humans.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define a cell and name who first observed it (Robert Hooke, 1665)
• Name the three main components of a cell as seen under a light microscope
• Define protoplasm, cytoplasm, and nucleoplasm
• Name and describe the function of 14 cell organelles
• Distinguish between plant cell and animal cell (4 differences)
• Explain the role of chromosomes and genes in heredity
• List the living parts and non-living parts of a cell
• Explain why mitochondria are called the powerhouse of the cell
• Explain why lysosomes are called suicide bags` },
    { id: 4, title: 'Read the text', minReadSeconds: 420, content: `WHAT IS A CELL?

Cell is the structural and functional unit of all living organisms. Robert Hooke observed a thin layer of cork under the microscope. He observed something that looked like tiny rooms. He called them "cells" (1665).

─────

STRUCTURE OF CELL

As seen under a light microscope, a cell has the following main components:

1. Protoplasm — The living content of the cell. Consists of two major divisions: cytoplasm and nucleoplasm.

2. Cytoplasm — The part of protoplasm between the plasma membrane and the nuclear envelope. Consists of:
   • Matrix: Transparent, homogeneous semi-fluid substance.
   • Organelles: Embedded in matrix.

3. Nucleoplasm — Portion of protoplasm that occurs in the nucleus and is limited by nuclear membrane.

─────

PARTS OF A CELL AND THEIR FUNCTIONS

4. Cell Membrane (Plasma Membrane) — The outermost covering of an animal cell.
   Functions: Provides and maintains shape of the cell; regulates transportation of material into and outside the cell.

5. Cell Wall — Present ONLY in plant cells. Present outside the cell membrane in a plant cell.
   Functions: Provides rigidity and shape to the plant cell; helps the cell bear unfavourable conditions.

6. Golgi Apparatus — Flattened sacs, stacked like a pile of coins.
   Function: Helps in formation of cell wall, synthesis and secretion of proteins.

7. Mitochondria — Double membrane bag-like structures.
   Functions: Helps in cellular respiration and release of energy. Popularly known as the "powerhouse" of the cell.

8. Plastids — Occur in most plant cells; absent in animal cells. Cell organelles with pigments.
   Types:
   (a) Chloroplast — Contains green pigment chlorophyll which traps solar energy for photosynthesis.
   (b) Chromoplast — Contains pigments of various colours. Present in petals, flowers, and fruits.
   Carotenoids → red and orange colour (as in carrots).
   Anthocyanins → purple, violet, blue colour (as in beetroot).
   Xanthophyll → yellow colour.
   (c) Leucoplast — Colourless plastids. Store food in the form of starch (as in potato tuber).

9. Centrosome — Present ONLY in animal cells. Present near the nucleus.
   Function: Initiates and regulates cell division.

10. Lysosomes — Living, sac-like structures.
    Functions: Contain enzymes which bring about intra-cellular digestion; digest stored food content of cytoplasm; digest and destroy foreign particles entering the cell. Also called "suicide bags" as they can digest and destroy the whole cell.

11. Ribosomes — Spherical granular particles. May occur freely or remain attached to endoplasmic reticulum.
    Function: Involved in protein synthesis.

12. Endoplasmic Reticulum — Living network of tubular membrane. May be smooth or rough depending on attachment of ribosomes.
    Function: Helps in transportation of proteins.

13. Vacuoles — Clear fluid-filled or gas-filled sacs. Fewer but large in plant cells; many but small in animal cells.
    Functions: Help in storage of food, water, and other substances. Contractile vacuoles help in elimination of waste and excess water from the cell.

14. Nucleus — Usually one and round.
    Functions: Controls all functions of the cell; helps in transmission of characteristics from parent to offspring. Contains chromosomes on which genes are present. Chromosomes transfer genetic information from parents to offspring.

─────

THE DESIGN FOR LIFE

The cells of any living body contain a nucleus, and each nucleus contains chromosomes on which genes are present. Genes carry and control the characteristics of the living organism — colour of the flower, height of the plant, hair colour, and other characteristics. Chromosomes are passed from parents to offspring — this is why children resemble their parents.

─────

LIVING AND NON-LIVING PARTS OF A CELL

Living parts: (1) Cell membrane, (2) Cytoplasm (ER, Mitochondria, Golgi complex, Ribosomes, Lysosomes, Centrosome in animals, Plastids in plants), (3) Nucleus.

Non-living parts: (1) Cell wall, (2) Granules, (3) Vacuoles, (4) Fat droplets.

─────

DIFFERENCES BETWEEN ANIMAL CELL AND PLANT CELL

| | Animal Cell | Plant Cell |
|---|-------------|------------|
| 1 | Cellulose cell wall is absent | Cellulose cell wall is present |
| 2 | Plastids are absent | Plastids are present |
| 3 | Vacuoles are usually absent; if present, they are small, many, and temporary | Vacuoles are large, prominent, and few in number |
| 4 | Centrosome is present | Centrosome is absent |` },
    { id: 5, title: 'Word watch', content: `Cell — The structural and functional unit of all living organisms. First named by Robert Hooke in 1665.

Organelle — A specialised subunit within a cell that has a specific function. Like organs in the body, organelles carry out specific tasks in the cell.

Protoplasm — The entire living content of a cell (cytoplasm + nucleoplasm).

Cytoplasm — The protoplasm between the cell membrane and the nuclear envelope. Contains organelles.

Nucleus — The control centre of the cell. Contains chromosomes with genetic information. Controls all cellular functions.

Mitochondria — The "powerhouse" of the cell. Double-membrane structures that produce energy through cellular respiration.

Chloroplast — A plastid (found only in plant cells) containing the green pigment chlorophyll. Site of photosynthesis.

Plastids — Organelles containing pigments, found only in plant cells. Types: chloroplasts (green), chromoplasts (coloured), leucoplasts (colourless, store starch).

Ribosome — Tiny organelles responsible for protein synthesis. Can be free in cytoplasm or attached to endoplasmic reticulum.

Endoplasmic Reticulum (ER) — Network of tubular membranes in cytoplasm. Helps transport proteins. Rough ER (with ribosomes) vs Smooth ER (without).

Golgi Apparatus — Stacked, flattened sacs that process and package proteins for secretion.

Lysosome — "Suicide bags" — sac-like organelles containing digestive enzymes. Digest food, foreign particles, and can destroy the whole cell.

Centrosome — Found only in animal cells. Initiates and regulates cell division.

Vacuole — Fluid-filled or gas-filled sacs. Large and few in plant cells; small and many in animal cells. Store food and water; eliminate waste.

Chromosomes — Thread-like structures in the nucleus containing genes. Transfer genetic information from parents to offspring.

Genes — Units on chromosomes that carry and control the characteristics of an organism (e.g., hair colour, height, eye colour).` },
    { id: 6, title: 'Values learnt', content: `Every living thing is connected — All living organisms — from bacteria to blue whales — are made of cells that share the same fundamental structure: cell membrane, cytoplasm, nucleus. Life on Earth, in all its diversity, is built on the same blueprint. This deep unity underlying apparent diversity is one of the most beautiful insights of biology.

Teamwork inside every cell — A cell is not just a bag of chemicals. It is a supremely organised community of organelles, each performing a specific function, all working together to keep the cell alive. The mitochondria produce energy. The ribosomes make proteins. The endoplasmic reticulum transports. The golgi apparatus packages and ships. The nucleus controls everything. It is a perfect model of division of labour and teamwork — every organelle plays its role, and the system fails if even one stops working.

You carry your ancestors inside you — Your chromosomes contain genes inherited from your parents, who inherited them from their parents, going back thousands of generations. Every characteristic you have — your height, your eye colour, even parts of your personality — was shaped by this inherited information. Understanding genetics and cell biology helps us understand ourselves in a profound way.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Cell = structural and functional unit of all living organisms. Robert Hooke first observed cells in cork in 1665.

2. Three main components: protoplasm (= cytoplasm + nucleoplasm).

3. Cell membrane: outermost covering of animal cell; maintains shape; controls transport.

4. Cell wall: ONLY in plant cells; provides rigidity and shape.

5. Nucleus: control centre; controls all cell functions; contains chromosomes → genes → hereditary characteristics.

6. Mitochondria: double membrane; cellular respiration; "powerhouse" of cell.

7. Plastids (ONLY plant cells): chloroplast (green, photosynthesis), chromoplast (coloured, in petals/fruit), leucoplast (colourless, stores starch in potato).

8. Centrosome: ONLY animal cells; near nucleus; regulates cell division.

9. Lysosomes: "suicide bags"; contain digestive enzymes; digest food, foreign particles, and can destroy whole cell.

10. Ribosomes: protein synthesis.

11. Endoplasmic Reticulum: transport of proteins; rough ER (has ribosomes) vs smooth ER (no ribosomes).

12. Vacuoles: large and few in plants; small and many in animals. Store food and water.

13. 4 differences Animal vs Plant cell: cell wall (absent/present), plastids (absent/present), vacuoles (small+many/large+few), centrosome (present/absent).

14. Chromosomes → genes → carry characteristics from parent to offspring.

15. Robert Hooke: discovered cells (1665). Scientist for this chapter.` },
  ],
}

// ── CH 8: THE LEAF ───────────────────────────────────────────────────────────
const ch8: Chapter = {
  id: 8, title: 'The Leaf', branch: 'Biology', type: 'Biology', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `A leaf is one of the most important structures in the living world. Every mouthful of food you eat — whether it is bread, rice, vegetables, or even meat — ultimately comes from the energy that leaves captured from the sun through photosynthesis.

This chapter explores the leaf in detail: its external structure (lamina, petiole, midrib, veins, apex, leaf base), the two types of venation (reticulate and parallel), the three types of phyllotaxy (alternate, opposite, whorled), the functions of a leaf (photosynthesis, gaseous exchange, transpiration), and the fascinating modifications of leaves in special plants (tendrils in pea plants, spines in cactus, scale leaves in onion, insect-trapping structures in pitcher plant and Venus fly trap).

You will also study a case study on how leaves cool the Earth and support life — a critical topic given today's climate challenges.` },
    { id: 2, title: 'About this chapter', content: `Sir Jagdish Chandra Bose (1858–1937) was an Indian scientist who made extraordinary discoveries in plant physiology. He switched his entire research interest to the analysis of plant responses, choosing the mimosa plant because it is directly sensitive to the Sun. Bose discovered the existence of a nervous system in plants — that plants respond to stimuli just as animals do, though more slowly. He also invented the Crescograph — a device for measuring growth in plants, capable of detecting incredibly minute changes. He showed that plants have feelings and can respond to human emotions.

The leaf is the most visible and prolific expression of plant life. A mature oak tree has about 200,000 leaves, and each one is a tiny solar energy factory converting sunlight, water, and carbon dioxide into food. Leaves are responsible for virtually all the food and oxygen on Earth. Protecting leaves means protecting life.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define a leaf and explain the term foliage
• Name and describe all parts of a leaf (lamina/leaf blade, petiole, midrib, veins, apex, leaf base, margin, axillary bud)
• Distinguish between simple leaf and compound leaf with examples
• Distinguish between reticulate venation and parallel venation with examples
• Explain phyllotaxy and name the three types (alternate, opposite, whorled) with examples
• List the three functions of a leaf (photosynthesis, gaseous exchange, transpiration)
• Describe 5 modifications of leaves with examples
• Explain how leaves cool the Earth (transpiration, shade, Urban Heat Island Effect)` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `WHAT IS A LEAF?

A leaf is a green, expanded part of a plant — the flattened green outgrowth borne on the nodes of the stem. The entire set of leaves of a plant is called the foliage. Younger and smaller leaves are found at the top of the stem; older ones further away.

─────

EXTERNAL STRUCTURE OF A LEAF

• Lamina (Leaf blade) — The wide, flat, green portion of the leaf. The most important part — food is manufactured here. Contains chlorophyll which captures solar energy for photosynthesis (using CO₂ and water).
• Petiole — The stalk that attaches the leaf to the node of the stem.
• Apex — The tip of the lamina.
• Leaf base — The basal part of the leaf which is joint to the stem.
• Midrib — The continuation of the petiole into the lamina. Branches into a network of veins.
• Veins — Keep the leaf stiff and flat, prevent drooping, and transport water and minerals to the leaf and take away food made by the leaves.
• Margin — The edge of the leaf.
• Axillary bud — Located at the junction of leaf and stem.

─────

KINDS OF LEAF

1. Simple leaf — When lamina is not divided; one continuous blade. Examples: peepal, mango.

2. Compound leaf — When lamina is divided into a number of small leaves called leaflets. Examples: rose, mimosa.

─────

LEAF VENATION

The arrangement of veins and veinlets within the leaf blade is called venation.

1. Reticulate venation — Veins arranged in the form of a network. Example: peepal.

2. Parallel venation — Veins arranged parallel to each other. Examples: grass, maize, paddy.

─────

ARRANGEMENT OF LEAVES (PHYLLOTAXY)

The arrangement of leaves on the stem or branches is called phyllotaxy. This prevents overlapping so that each leaf gets sufficient sunlight.

1. Alternate — Only one leaf arises at a node; the next leaf is opposite (alternate) to the previous. Examples: mustard, sunflower, rose.

2. Opposite — Two leaves arranged on one node opposite to each other. Example: jasmine.

3. Whorled — Three or more leaves arise from a node and form a whorl. Example: oleander.

─────

FUNCTIONS OF A LEAF

1. Photosynthesis — The main function. The leaf makes food using carbon dioxide, water, and chlorophyll in the presence of sunlight.

2. Gaseous Exchange — Leaves are the main organs of respiration. They have special pores called stomata for the exchange of gases.

3. Transpiration — Leaves control the water content of the plant. Plants lose water through stomata in the form of water vapour — this process is called transpiration.

─────

MODIFICATIONS OF LEAF

1. Leaf tendril — In pea plant, the leaf is modified into a thin, wire-like, coiled structure called tendril. It supports the plant as it climbs up.

2. Leaf spines — In prickly pear (opuntia), leaves are modified into spines. The spines reduce water loss and provide protection.

3. Scale leaves — May be thin and dry, or thick and fleshy to store food (as in onion). They also protect buds.

4. Reproduction — In some plants like Bryophyllum and Begonia, leaves have buds that produce new plants.

5. Insectivorous plants — Some plants like pitcher plant, Venus fly trap, and bladderworts modify leaves to trap and digest insects for nitrogen:
   • Pitcher — In nepenthes, lamina becomes modified into a pitcher to capture insects. The leaf tip forms the lid and the petiole becomes a long, thin, coiled structure.
   • Venus fly trap — The leaf blade is divided into two parts hinged along the mid-rib. The two parts get interlocked, preventing the insect from escaping.

─────

CASE STUDY: LEAVES THAT COOL THE EARTH

How trees cool surroundings:
• Providing shade
• Releasing water vapour through transpiration (lowers surrounding temperature naturally)
• Areas with more trees feel cooler and fresher than concrete-covered areas

Urban Heat Island Effect — Cities with glass and concrete buildings trap heat. Trees absorb sunlight and reduce heat reflection; leaves release moisture, cooling the air.

Why saving leaves and trees is important:
• If trees are cut: oxygen levels reduce, temperature increases, life becomes difficult.
• Plants maintain the oxygen-carbon dioxide balance.
• Protecting leaves means protecting life. If plants survive, we survive.` },
    { id: 5, title: 'Word watch', content: `Leaf — The green, flattened outgrowth on the nodes of a plant stem. The main site of photosynthesis.

Foliage — The entire set of leaves of a plant.

Lamina (Leaf blade) — The wide, flat, green portion of the leaf where food is manufactured.

Petiole — The stalk of a leaf that attaches it to the stem.

Midrib — The central thick vein of a leaf, continuing from the petiole into the lamina.

Veins — Extensions of the midrib that branch throughout the leaf, transporting water, minerals, and food.

Apex — The tip of the lamina.

Leaf base — The basal part of the leaf joint to the stem.

Venation — The arrangement of veins in the leaf blade. Reticulate (network pattern) vs Parallel.

Reticulate venation — Veins arranged in a network pattern. Found in dicot plants like peepal, mango, rose.

Parallel venation — Veins arranged parallel to each other. Found in monocot plants like grass, maize, paddy.

Phyllotaxy — The arrangement of leaves on the stem. Types: Alternate (one leaf per node), Opposite (two leaves per node), Whorled (three or more leaves per node).

Stomata — Tiny pores on leaves through which gaseous exchange and transpiration occur.

Transpiration — The loss of water vapour from leaves through stomata. Cools both the plant and its surroundings.

Photosynthesis — The process by which leaves use sunlight, CO₂, and water to make food (glucose). Requires chlorophyll.

Tendril — A thin, wire-like, coiled modification of a leaf (e.g., in pea plant) that helps the plant climb.

Insectivorous plant — A plant that traps and digests insects for nutrition (usually to get nitrogen). Examples: pitcher plant, Venus fly trap.

Urban Heat Island Effect — The phenomenon where cities are hotter than surrounding rural areas because buildings made of glass and concrete trap and reflect heat.

Crescograph — A device invented by J.C. Bose to measure plant growth at very small scales.` },
    { id: 6, title: 'Values learnt', content: `Plants are the foundation of all life — Every living thing either is a plant, eats a plant, or eats something that eats a plant. Leaves, through photosynthesis, are the entry point of all energy into the food chain. Without leaves, there would be no food, no oxygen, and no life on Earth as we know it. Respecting and protecting plants is not a sentimental choice — it is a survival necessity.

Nature's cooling system — Leaves cool the Earth through transpiration and shade. Cities without trees are measurably hotter (the Urban Heat Island Effect). This is not metaphorical — it is scientifically measurable. Planting trees in cities is one of the most cost-effective and powerful ways to reduce urban heat and improve air quality. The science of leaves has direct real-world applications for climate and health.

Diversity of form, unity of function — Leaves come in an astonishing variety of shapes: flat and wide in peepal, needle-like in cactus (spines), pitcher-shaped in nepenthes, trap-like in Venus fly trap. Yet all of them, in their own way, serve the same core functions: capturing energy, exchanging gases, controlling water. Nature achieves its goals through endless variation. This is a model for creative problem-solving.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Leaf = flattened green outgrowth on stem nodes. Foliage = all leaves of a plant.

2. Parts: lamina (leaf blade), petiole (stalk), midrib (central vein), veins, apex (tip), leaf base, margin, axillary bud.

3. Simple leaf: undivided lamina (peepal, mango). Compound leaf: divided into leaflets (rose, mimosa).

4. Reticulate venation: veins form a network (peepal, mango). Parallel venation: veins parallel (grass, maize, paddy).

5. Phyllotaxy: Alternate (one leaf per node — mustard, sunflower), Opposite (two leaves per node — jasmine), Whorled (3+ leaves per node — oleander).

6. Three functions: Photosynthesis (makes food), Gaseous exchange (through stomata), Transpiration (loses water vapour).

7. Leaf modifications: Tendril (pea plant — for climbing), Spines (prickly pear — reduces water loss + protection), Scale leaves (onion — stores food), Reproduction (Bryophyllum, Begonia — buds on leaves), Insectivorous (pitcher plant/Venus fly trap — traps insects for nitrogen).

8. Transpiration = loss of water vapour through stomata. Cools surroundings.

9. Urban Heat Island Effect = cities hotter than rural areas because glass and concrete trap heat. Trees reduce this.

10. J.C. Bose: discovered nervous system in plants; invented Crescograph.` },
  ],
}

// ── CH 9: HUMAN BODY: RESPIRATORY SYSTEM ─────────────────────────────────────
const ch9: Chapter = {
  id: 9, title: 'Human Body: Respiratory System', branch: 'Biology', type: 'Biology', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `You take about 20,000 breaths every day — but you rarely think about it. Every time you breathe in, oxygen enters your lungs, passes into your blood, and is carried to every cell in your body where it is used to release energy from food. Every time you breathe out, the carbon dioxide produced by this process leaves your body. This entire system — nose, pharynx, larynx, trachea, bronchi, lungs, and diaphragm — is called the respiratory system.

But breathing and respiration are not the same thing! This chapter begins by clearly distinguishing between the two. Respiration is the process inside cells — where food combines with oxygen to release energy. Breathing is the physical process of taking in oxygen-rich air and giving out carbon dioxide-rich air. Understanding this distinction is crucial.

You will also learn about common respiratory diseases — asthma, bronchitis, pneumonia, and tuberculosis — and understand that your lungs are among the most precious and fragile organs in your body. Pranayam (yogic breathing exercises) can significantly improve lung efficiency.` },
    { id: 2, title: 'About this chapter', content: `The respiratory system is one of the most elegantly designed systems in the human body. The lungs contain about 700 million tiny air sacs called alveoli, giving a total surface area roughly the size of a tennis court — all packed inside your chest cavity. This enormous surface area allows rapid and efficient exchange of oxygen and carbon dioxide between air and blood.

The highest recorded sneeze speed is 165 km/hr. When the brain senses that the lungs need more oxygen, it triggers a yawn. The stomach of an adult holds up to 1.5 litres of food. Although the large intestine is up to 4 inches in diameter, the small intestine is only 1 inch in diameter.

The diaphragm — the dome-shaped muscle below the lungs — is the engine of breathing. Every breath you take is powered by its contraction and relaxation. When you hiccup, it is an involuntary spasm of the diaphragm.

Smoking destroys the alveoli and lining of the lungs, causes bronchitis, emphysema, and lung cancer. The lungs of a non-smoker are pink and healthy; those of a heavy smoker are blackened and partially destroyed. This is why protecting your lungs — by breathing clean air, exercising, and not smoking — is so important.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Distinguish between respiration and breathing (2 differences in table form)
• Name all 6 organs of the respiratory system: nose, pharynx, larynx, trachea, bronchi, lungs
• Describe the function and structure of each organ
• Explain the role of the diaphragm in breathing
• Describe inhalation (breathing in): diaphragm contracts and moves down, ribs move up and out, lung volume increases, pressure drops, air rushes in
• Describe exhalation (breathing out): diaphragm relaxes and moves up, ribs move in and down, lung volume decreases, pressure increases, air is forced out
• Name and describe 4 common respiratory diseases: asthma, bronchitis, pneumonia, tuberculosis
• Suggest ways to keep the respiratory system healthy (Pranayam, clean air, exercise)` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `RESPIRATION VS BREATHING

| | Respiration | Breathing |
|---|-------------|-----------|
| 1 | Process in which food combines with oxygen to release energy | Process of taking in oxygen-rich air and giving out CO₂-rich air |
| 2 | Occurs inside the cells | Occurs outside the cells (in lungs) |

─────

ORGANS OF THE RESPIRATORY SYSTEM

The human respiratory system consists of: nose, pharynx, larynx, trachea, bronchi, lungs.
In addition: chest muscles and diaphragm help in the breathing process.

1. Nose
• Encloses the nasal cavity which opens outside through two nostrils.
• Air enters the respiratory system through the nose.
• The nose has thin hair which filters the air.
• The inner lining produces a sticky liquid called mucus.
• Mucus and nasal hair prevent dust particles and germs from entering.
• Air entering the lungs is moistened, warmed, and filtered in the nose.
• It is better to breathe through the nose than through the mouth.

2. Pharynx
• The nasal cavity leads to a funnel-shaped pharynx — the common passage for food and air.
• From the pharynx, air enters a rectangular box-shaped chamber — the larynx.

3. Larynx
• Has vocal cords that help produce sounds.
• Also called the voice box.

4. Windpipe or Trachea
• A long, wide, delicate, muscular tube running in front of the food pipe.
• The trachea divides into two smaller tubes called bronchi.

5. Bronchi
• The trachea divides into two bronchi (singular: bronchus) — right bronchus and left bronchus.
• Each enters the lung on its own side.

6. Lungs
• Two elastic, conical bags — very soft and spongy.
• They stretch every time you breathe in and spring back when you breathe out.
• As air enters the lungs, blood takes up oxygen and gives out CO₂ and water vapour, which are breathed out through the nose.
• Blood carries oxygen to all parts of the body from the lungs.

─────

MECHANISM OF BREATHING

The human lungs lie in the chest cavity, bounded on the lower side by a muscular partition called the diaphragm.

INHALATION (Breathing In):
• Diaphragm contracts and moves down.
• Muscles attached to the rib cage contract, lifting the ribs upward and outward.
• These actions increase the volume of thoracic (chest) cavity.
• The pressure inside the lungs drops.
• Air rushes into the lungs through the nose.

EXHALATION (Breathing Out):
• Diaphragm relaxes and moves upward back into its dome shape.
• Muscles of the rib cage relax, allowing the ribs to move inward and downward.
• The volume of the thoracic cavity decreases.
• The pressure inside the lungs increases.
• Air is forced out of the lungs.

─────

COMMON RESPIRATORY DISEASES

Asthma — Air passage of bronchi and bronchioles is narrowed. The mucus membrane gets irritated and secretes excessive mucus, clogging the bronchi and bronchioles. Person has difficulty breathing, along with coughing.

Bronchitis — Swelling in the bronchi leads to coughing. May develop due to allergy, cigarette smoking, air pollution, or lack of immunity; may be hereditary.

Pneumonia — An infection of the lungs caused by bacteria.

Tuberculosis (TB) — A bacterial infection. Bacteria destroy the lung tissues.

─────

DID YOU KNOW?
• The stomach of an adult holds up to 1.5 litres of food.
• The large intestine is up to 4 inches in diameter; the small intestine is only 1 inch.
• When the brain senses the lungs need more oxygen, it triggers a yawn.
• The highest recorded sneeze speed is 165 km/hr.

Activity: Learn various breathing exercises and basic Pranayam which help in improving the efficiency of your lungs and practise them in your daily life.` },
    { id: 5, title: 'Word watch', content: `Respiration — The cellular process in which food (glucose) combines with oxygen to release energy. Occurs inside cells. Produces CO₂ and water as byproducts.

Breathing — The physical process of taking in oxygen-rich air (inhalation) and expelling CO₂-rich air (exhalation). Occurs in the lungs.

Nose — The entry point of the respiratory system. Filters, warms, and moistens air. Has nasal hair and mucus to trap dust and germs.

Pharynx — The funnel-shaped common passage for food and air. Connects nasal cavity to larynx.

Larynx — The voice box. Contains vocal cords that produce sound. Located between pharynx and trachea.

Trachea (Windpipe) — The long muscular tube connecting larynx to bronchi. Runs in front of the food pipe.

Bronchi — The two branches of the trachea (right bronchus and left bronchus) that enter the lungs.

Lungs — The two elastic, spongy, conical organs in the chest cavity where gas exchange (O₂ and CO₂) between air and blood takes place.

Diaphragm — The dome-shaped muscular partition below the lungs. The main muscle of breathing — contracts during inhalation, relaxes during exhalation.

Inhalation (Inspiration) — Breathing in. Diaphragm contracts and moves down; ribs move up and out; chest volume increases; pressure drops; air rushes in.

Exhalation (Expiration) — Breathing out. Diaphragm relaxes and moves up; ribs move in and down; chest volume decreases; pressure increases; air is forced out.

Mucus — A sticky liquid produced by the inner lining of the nose. Traps dust and germs to prevent them from entering the lungs.

Asthma — Narrowing of bronchi and bronchioles due to inflammation, causing difficulty in breathing.

Bronchitis — Swelling of the bronchi leading to coughing. Can be due to allergy, smoking, or infection.

Pneumonia — Bacterial infection of the lungs.

Tuberculosis (TB) — Bacterial infection that destroys lung tissue.

Pranayam — Yogic breathing exercises that improve lung efficiency and capacity.` },
    { id: 6, title: 'Values learnt', content: `Breathe consciously — You breathe 20,000 times a day without thinking about it. But conscious, mindful breathing — as in Pranayam — is one of the most powerful tools for reducing stress, improving focus, and strengthening the lungs. Something as simple as taking a few deep breaths before an exam or a difficult situation can genuinely calm your nervous system. The science backs it up.

Protect what you cannot see — Your lungs are hidden inside your chest. You cannot see them, but they are working every second of every day to keep you alive. Smoking, air pollution, and infections cause damage that can be permanent. Taking care of your lungs — by breathing clean air, exercising regularly, not smoking, and practising deep breathing — is one of the most important investments you can make in your long-term health.

The body is a marvel — The respiratory system is a masterpiece of biological engineering. The lungs have the surface area of a tennis court packed into the space of two fists. The nose filters, warms, and humidifies air before it reaches the delicate lung tissue. The diaphragm works every second of your life without rest. Understanding how your body works fills you with awe and motivates you to take better care of it.` },
    { id: 7, title: 'Quick recap', content: `Before you take the quiz, here are the key facts:

1. Respiration: food + oxygen → energy (inside cells). Breathing: taking in O₂-rich air + expelling CO₂-rich air (outside cells, in lungs).

2. 6 organs of respiratory system: nose → pharynx → larynx → trachea → bronchi → lungs.

3. Nose: filters, warms, moistens air. Has nasal hair and mucus to trap dust and germs.

4. Pharynx: funnel-shaped common passage for food and air.

5. Larynx: voice box; has vocal cords that produce sound.

6. Trachea: windpipe; long muscular tube; divides into two bronchi.

7. Bronchi: right and left bronchi; each enters one lung.

8. Lungs: elastic, spongy; site of gas exchange; blood takes O₂, gives CO₂ and water vapour.

9. Diaphragm: dome-shaped muscle; powers breathing.

10. Inhalation: diaphragm contracts (moves down) → ribs up and out → chest volume increases → pressure drops → air rushes IN.

11. Exhalation: diaphragm relaxes (moves up) → ribs in and down → chest volume decreases → pressure increases → air forced OUT.

12. 4 respiratory diseases: Asthma (narrowed bronchi, excess mucus, difficulty breathing), Bronchitis (swollen bronchi, coughing), Pneumonia (bacterial lung infection), Tuberculosis/TB (bacteria destroy lung tissue).

13. Breathe through nose (not mouth) — better filtering.

14. Pranayam = yogic breathing exercises to improve lung efficiency.

15. Sneeze speed: 165 km/hr. Yawn triggered when brain senses lungs need more O₂.` },
  ],
}

export const CHAPTERS: Chapter[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9]
export function getChapter(id: number): Chapter | undefined { return CHAPTERS.find(c => c.id === id) }
export function getSection(chapterId: number, sectionId: number) { return getChapter(chapterId)?.sections.find(s => s.id === sectionId) }
