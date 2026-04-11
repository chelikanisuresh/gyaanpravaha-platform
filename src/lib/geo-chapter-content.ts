// Geography Chapter Content — Gyaanpravaha
// Connexion Class 6, Project 1
// All 7 chapters — fully written in tuition-teacher style

export interface Section {
  id: number
  title: string
  content: string
  minReadSeconds?: number
}

export interface Chapter {
  id: number
  title: string
  type: 'Solar System' | 'Earth' | 'Landforms' | 'Maps' | 'Agriculture' | 'Continents'
  estimatedReadMins: number
  sections: Section[]
}

// ─── CHAPTER 1 ────────────────────────────────────────────────────────────────

const chapter1: Chapter = {
  id: 1,
  title: 'Our Earth in the Solar System',
  type: 'Solar System',
  estimatedReadMins: 14,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Look up at the night sky. You see thousands of tiny specks of light — some twinkle, some don't. Some move slowly across the sky over months. Ancient people looked at the same sky and asked the same questions: What are those lights? How far away are they? Are we alone?

This chapter takes you on a journey from the very birth of the universe — the Big Bang — all the way to our home: planet Earth. You will learn what stars, planets, and satellites are, how the solar system works, and most importantly, why Earth is the only planet in our solar system that supports life.

By the end of this chapter, you will look at the night sky very differently.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is the opening lesson of your Geography course. Geography is the study of the Earth — its physical features, climate, people, and resources. Before we study the Earth itself, we need to understand where the Earth sits in the vast universe.

All the objects we see in the sky — stars, planets, satellites, asteroids, meteors and comets — are called celestial bodies.

The universe is unimaginably large. Our solar system — the Sun and everything that orbits it — is just one tiny part of the Milky Way galaxy. And the Milky Way is just one of billions of galaxies in the universe.

Yet in this entire vast universe, only one place is known to have life — our Earth. This chapter helps you understand why.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Understand the meaning and scope of the solar system
• Explain the Big Bang theory and how the universe, stars, and our Sun formed
• Differentiate between stars and planets — and explain the difference clearly
• Name all 8 planets in order from the Sun, and know their nicknames
• Explain the three conditions that make Earth special and capable of supporting life
• Describe the Moon — Earth's only satellite — and its phases`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 540,
      content: `Let us journey from the beginning of the universe all the way to our Earth.

─────

PART A — The Universe and the Big Bang

According to most astronomers, the universe started with a gigantic explosion — the Big Bang — about 15 billion years ago. Atoms and molecules were formed as a result of this explosion. They ultimately formed a giant cloud of gases and tiny dust particles called a nebula. The nebula had a spinning motion and its own gravity. Fragments of the nebula were attracted to one another and collided at tremendous speed, releasing an enormous amount of heat. This resulted in the birth of glowing bodies — stars. Our Sun was born about 4.6 billion years ago.

─────

PART B — Stars

Celestial bodies that produce their own heat and light are called stars. Each star is a huge mass of hot gases. They appear as tiny specks in the sky because they are very far away from us. The Sun is a star too — it is just one among millions of stars in the universe. Being nearer to the Earth than any other star, it looks big and bright, like a ball of fire.

The brightest star in the night sky is the Pole Star or the North Star. It appears to remain in the same position in the sky because it is almost directly above the North Pole. It helps us determine the north direction during the night.

─────

PART C — The Solar System

The word 'solar' is derived from the Latin word sol meaning the Sun. The solar system is the family of the Sun. It consists of the Sun at the centre, the eight planets, their satellites, the asteroids, meteors and comets — all of which move around the Sun.

The Sun is at the centre and is the largest member of our solar system. The huge mass of the Sun gives it a very powerful force of gravity. This force holds the Earth and other planets in their fixed paths called orbits.

The Sun is made up of intensely hot, burning gases — primarily hydrogen and helium — and has a surface temperature of about 6000°C. It is the vital source of heat and light energy required by all forms of life on the Earth. It is about 150 million km away from the Earth. Light from the Sun takes about eight minutes to reach us.

─────

PART D — The Eight Planets

The word 'planet' is derived from a Greek word meaning wanderer. Planets are named so because they revolve around the Sun. There are eight planets in the solar system. In order of their distances from the Sun they are: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune.

Planets do not have their own heat and light — they are made up of solid materials and gases. They shine with the light reflected from the Sun.

The Inner Planets (Terrestrial Planets): Mercury, Venus, Earth and Mars are known as the inner planets or terrestrial planets because they are rocky.

The Outer Planets (Gas Giants): Jupiter, Saturn, Uranus and Neptune are called the outer planets. They are chiefly made of gases so they are also called gas giants.

In descending order of their size the planets are: Jupiter, Saturn, Uranus, Neptune, Earth, Venus, Mars and Mercury. All planets are spherical in shape.

Planet Nicknames:
Mercury — The Innermost Planet
Venus — The Earth's Twin
Earth — The Blue, Watery Planet
Mars — The Red Planet
Jupiter — The Giant Planet
Saturn — The Jewel Planet (famous for its rings)
Uranus — A Planet on Its Side
Neptune — The Last Giant

Note: Although Pluto orbits the Sun and is a sphere, it is called a dwarf planet. There are no other bodies of comparable size other than its own satellites under its gravitational influence.

─────

PART E — Our Planet Earth

The planet Earth is considered a special planet because it has three conditions to sustain life:

1. Moderate temperature: The amount of heat received by a planet depends upon its distance from the Sun. The Earth is neither too far from the Sun nor too close to it. It is neither too hot like Mercury nor too cold like Neptune. The moderate temperature conditions on the Earth are favourable for plant and animal life.

2. Suitable atmosphere: The Earth is surrounded by a blanket of air called the atmosphere. Our atmosphere has gases such as nitrogen, oxygen, carbon dioxide and ozone — all of which are necessary for plant and animal life. The atmosphere also acts as a protective layer against the Sun's harmful rays.

3. Presence of water: Due to favourable temperature, water can exist on Earth in all three forms — solid, liquid and gas. Due to the water cycle, water in the liquid form is available continuously to all living beings. In fact, the Earth looks blue from outer space because about two-thirds of its surface is covered with water. That is why it is often referred to as the 'Blue Planet.'

─────

PART F — Earth's Satellite — The Moon

The Moon is the only satellite of the Earth. Its diameter is about one-fourth of the Earth's diameter. The Moon has no light of its own. What we see as moonlight is actually the Sun's light reflected by the Moon.

The Moon appears in the sky in different shapes. These are called phases of the Moon. When the Moon looks like a full disc, it is called full Moon or purnima. When the side of the Moon facing us does not receive sunlight, we cannot see the Moon. This is known as the new Moon or amavasya.

Differences between Stars and Planets:
Stars are made of hot, burning gases — Planets are made of solid materials and gases
Stars produce their own heat and light — Planets shine with light reflected from the Sun

Differences between Planets and Satellites:
Planets revolve around the Sun — Satellites revolve around planets
Planets occur naturally — Satellites can be both natural and man-made`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Celestial bodies — All objects found in the sky: stars, planets, satellites, asteroids, meteors and comets.

Big Bang — The gigantic explosion about 15 billion years ago that started the universe, according to most astronomers.

Nebula — A giant cloud of gases and tiny dust particles from which stars were born. Had its own spinning motion and gravity.

Star — A celestial body that produces its own heat and light. Made of hot gases. The Sun is a star.

Pole Star / North Star — The brightest star in the night sky. Appears stationary because it lies almost directly above the North Pole. Used for finding north direction at night.

Solar System — The family of the Sun. Consists of the Sun, eight planets, their satellites, asteroids, meteors and comets — all revolving around the Sun.

Orbit — The fixed path along which a planet revolves around the Sun.

Planet — A celestial body that revolves around a star (the Sun). Does not produce its own light — shines with reflected sunlight. There are 8 planets.

Terrestrial planets — The inner planets: Mercury, Venus, Earth and Mars. Called terrestrial because they are rocky.

Gas giants — The outer planets: Jupiter, Saturn, Uranus and Neptune. Made chiefly of gases.

Atmosphere — The blanket of air surrounding the Earth. Contains nitrogen, oxygen, carbon dioxide and ozone. Protects life from harmful solar rays.

Satellite — A body that revolves around a planet. The Moon is Earth's only natural satellite.

Purnima — The full Moon, when the Moon appears as a complete disc in the night sky.

Amavasya — The new Moon, when the Moon is not visible because its face towards Earth receives no sunlight.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Our Earth is precious — Earth is the only known planet in the entire universe that supports life. It has the right temperature, the right atmosphere, and water — a combination that exists nowhere else we have found. This makes our planet extraordinarily rare and valuable. Everything that lives — every human, every animal, every plant — depends on this one planet. We have a responsibility to protect it.

Curiosity is the beginning of knowledge — For thousands of years, humans have looked up at the night sky with wonder. That curiosity led to telescopes, space missions, and the discovery of the Big Bang. It led to the discovery that our Sun is just one of billions of stars. Every great scientific discovery started with someone asking: "Why?" Stay curious — it is the most powerful tool you have.

We are small — but connected — Knowing that the Earth is one tiny planet in one solar system in one galaxy among billions is humbling. But it also connects us. Every human being on this planet lives under the same sky, breathes the same air, and drinks water from the same water cycle. Geography teaches us that we are all connected — to each other and to this Earth.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The universe began with the Big Bang about 15 billion years ago. Stars formed from nebulae. Our Sun formed 4.6 billion years ago. The solar system is the family of the Sun — 8 planets, their satellites, asteroids and comets all revolving around it.

2. Stars produce their own heat and light (e.g. the Sun). Planets do not produce their own light — they shine with reflected sunlight. Satellites revolve around planets.

3. The 8 planets in order from the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Inner/terrestrial (rocky): Mercury, Venus, Earth, Mars. Outer/gas giants: Jupiter, Saturn, Uranus, Neptune.

4. Earth's three special conditions for life: (1) Moderate temperature — not too hot, not too cold. (2) Suitable atmosphere — nitrogen, oxygen, ozone, CO₂. (3) Presence of water — in all three forms. Earth is the Blue Planet — two-thirds of its surface is water.

5. The Moon is Earth's only natural satellite. It has no light of its own — moonlight is reflected sunlight. Full Moon = purnima. New Moon = amavasya. The Pole Star (North Star) is always directly above the North Pole.`,
    },
  ],
}

// ─── CHAPTER 2 ────────────────────────────────────────────────────────────────

const chapter2: Chapter = {
  id: 2,
  title: 'The Earth as a Globe — 1 (Movements of the Earth)',
  type: 'Earth',
  estimatedReadMins: 18,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Why is there day and night? Why do we have summer and winter? Why is June hot in India but cold in Australia? Why does the Sun rise in the east and set in the west?

The answer to all of these questions lies in two movements of the Earth — rotation and revolution.

This chapter explains the shape and size of our Earth, proves that it is spherical, and then explains how its two movements — spinning on its axis and revolving around the Sun — create every day/night cycle, every season, and every solstice and equinox on Earth.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is about the Earth's physical nature and its motions. Geography begins with understanding the Earth itself — its shape, size, and how it moves.

The Earth appears flat to us because it is so enormous. Even when you travel from one city to another, everything you pass looks flat or gently rolling. But the Earth is actually a sphere — proved by satellite photographs, ancient mathematics, and the observations of sailors and astronomers over thousands of years.

More precisely, the Earth is an oblate spheroid — slightly flattened at the poles and bulging at the Equator. This is because the Earth's rotation causes material to push outward at the Equator.

This chapter also explains the two motions of the Earth — rotation (spinning on its axis, causing day and night) and revolution (orbiting the Sun, causing seasons) — and their effects.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Explain the shape of the Earth and what "oblate spheroid" means
• Give five proofs that the Earth is spherical
• State the key measurements of the Earth (diameter, circumference, orbital period)
• Differentiate between rotation and revolution — their causes, duration and effects
• Explain the phenomenon of seasons using four positions of the Earth
• Describe the Summer Solstice, Winter Solstice, Spring Equinox and Autumnal Equinox
• Explain what a leap year is and why it occurs every four years`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 660,
      content: `Let us understand the Earth's shape and its two great movements.

─────

PART A — The Shape of the Earth

The Earth appears to be flat to us. Even when we travel by sea, we journey over a sea that looks flat. However, the Earth is a sphere — as proved by photographs taken from space.

The Earth's shape cannot be described by a single word. It is spherical but not a perfect sphere. It is flattened at the poles and bulging at the Equator. The geographic term that describes it best is oblate spheroid.

Five Proofs of the Earth's Spherical Shape:

1. Sighting of a ship — Standing at a port watching a departing ship, you will see the deck or lower part disappear below the horizon first, followed by the mast. When the ship arrives, it appears in reverse order — mast first. This happens because the Earth is curved.

2. The circular horizon — The distant horizon viewed from the deck of a ship or from a cliff on land is always circular. This would only be possible if the Earth is spherical.

3. Sunrise and Sunset — The rising Sun is seen first at places in the east, then at places in the west. If the Earth were flat, the rising Sun would be seen at all places at the same time.

4. Circumnavigation — Ferdinand Magellan was the first person to circumnavigate the Earth and complete his voyage without encountering a sharp edge. He sailed in one direction and returned to where he started — proving Earth is round.

5. Lunar Eclipse — The Earth casts a circular shadow on the Moon during a lunar eclipse. Only a sphere always casts a circular shadow.

The Size of the Earth:
Diameter through the Equator — 12,756 kilometres
Diameter through the poles — 12,714 kilometres
Equatorial circumference — 40,077 kilometres
Polar circumference — 40,009 kilometres
Orbital period — 365 days 6 hours
Rotation period — 23 hours, 56 minutes, 4 seconds

─────

PART B — Rotation

The movement of the Earth round its axis from west to east once in 24 hours is called rotation.

The Earth not only moves round the Sun but also spins round its axis like a top. The Earth's axis is an imaginary line that passes through its centre. Its two ends are the North Pole and the South Pole. This axis is inclined to the plane of the Earth's orbit at an angle of 66½° (and 23½° from the perpendicular to the plane).

Five Effects of Rotation:

1. Day and Night — When the Earth rotates around its axis, half of its surface faces the Sun at a time, while the other half is turned away. The part that receives sunlight experiences day, while the other part has night. The circle which separates the dark part from the lit part of the Earth is known as the circle of illumination.

2. The apparent movement of the Sun, Moon and stars — Rotation makes it feel that the Sun, Moon and other heavenly bodies move from east to west.

3. Direction — Rotation gives us the concept of direction based on sunrise (east) and sunset (west).

4. Bulging at the Equator — The rotation causes the bulging of the Earth at the Equator and flattening at the poles.

5. Tides — Rotation causes the occurrence of tides twice a day.

Did you know? The speed of rotation is different at different latitudes. At the Equator, it rotates fastest at 1,600 km per hour. Near the poles, there is hardly any movement. At 45°N and 45°S latitudes, the speed is about 1,120 km per hour.

─────

PART C — Revolution

The path of the Earth on which it moves round the Sun is called its orbit. The Earth completes one revolution around the Sun in approximately 365 days and 6 hours.

For convenience, we calculate a year in complete days — 365 days. We add one day (6 × 4 = 24 hours) in the fourth year. This year is called the leap year with 366 days. This extra day is added to February — which has 28 days in ordinary years and 29 in leap years. A year divisible by four is a leap year (1984, 1992, 1996, 2008).

Since the Earth's orbit around the Sun is elliptical (not circular), the Earth's distance from the Sun varies during the year:
Aphelion — when Earth is farthest from the Sun (152 million km)
Perihelion — when Earth is nearest to the Sun (147.3 million km)

─────

PART D — Effects of Revolution — The Seasons

The phenomenon of seasons is caused due to two reasons:
1. The revolution of the Earth around the Sun
2. The inclination of the Earth's axis at 66½° to the plane of its orbit, constantly pointing in the same direction

The Four Positions of the Earth:

Position 1: 21st June — The Summer Solstice
• The rays of the Sun fall vertically on the Tropic of Cancer
• The North Pole is tilted towards the Sun; the South Pole is tilted away
• It is summer in the Northern Hemisphere; days are longer than nights
• The longest day and shortest night occurs on 21st June in the Northern Hemisphere
• All these conditions are reversed in the Southern Hemisphere

Position 2: 22nd December — The Winter Solstice
• The rays of the Sun fall vertically on the Tropic of Capricorn
• The South Pole is inclined towards the Sun; the North Pole is turned away
• It is winter in the Northern Hemisphere; nights are longer than days
• The longest night and shortest day occurs on 22nd December in the Northern Hemisphere
• On 25th December (Christmas), it is winter in England, USA and India — but summer in Australia and South America

Position 3: 21st March — The Spring Equinox
• Both poles are neither inclined towards the Sun nor away from it
• The rays of the Sun fall vertically on the Equator
• All places have equal days and nights
• It is spring in the Northern Hemisphere (Autumn in Southern Hemisphere)

Position 4: 23rd September — The Autumnal Equinox
• Same conditions as March equinox — equal days and nights everywhere
• It is autumn in the Northern Hemisphere (Spring in Southern Hemisphere)

Important: From March 21st to September 23rd, the North Pole receives sunlight continuously for six months, while the South Pole is in darkness for those same six months. This is why at the poles, there are days and nights of six months duration each.

Differences between Rotation and Revolution:
Rotation is the spinning of the Earth on its own axis — Revolution is the motion of the Earth around the Sun
Rotation is completed in a day (24 hours) — Revolution is completed in a year (365 days 6 hours)
Rotation causes days and nights — Revolution causes seasons`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Oblate spheroid — The exact shape of the Earth: spherical but slightly flattened at the poles and bulging at the Equator.

Circumnavigation — Travelling all the way around the Earth in one continuous journey. Ferdinand Magellan was the first person to do this.

Circle of illumination — The imaginary circle that separates the dark half (night) of the Earth from the lit half (day) as the Earth rotates.

Axis — An imaginary line through the centre of the Earth from the North Pole to the South Pole. The Earth spins on this axis.

Rotation — The spinning of the Earth on its own axis from west to east, completing one full spin in 24 hours. Causes day and night.

Revolution — The movement of the Earth in its orbit around the Sun, completing one full revolution in 365 days 6 hours. Causes seasons.

Orbit — The elliptical path the Earth follows around the Sun.

Leap year — A year with 366 days (February has 29 days). Occurs every four years to account for the extra 6 hours per year.

Aphelion — The point in Earth's orbit when it is farthest from the Sun (152 million km).

Perihelion — The point in Earth's orbit when it is nearest to the Sun (147.3 million km).

Summer Solstice — 21st June. Sun's rays fall vertically on the Tropic of Cancer. Longest day and shortest night in the Northern Hemisphere.

Winter Solstice — 22nd December. Sun's rays fall vertically on the Tropic of Capricorn. Longest night and shortest day in the Northern Hemisphere.

Equinox — When the Sun's rays fall vertically on the Equator and all places have equal days and nights. Spring Equinox: 21st March. Autumnal Equinox: 23rd September.

Inclination — The tilt of the Earth's axis at 66½° to the plane of its orbit. This tilt is the reason for seasons.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Time is a product of the Earth's movement — The 24-hour day is the time it takes Earth to spin once. The 365-day year is the time it takes Earth to orbit the Sun. Every unit of time we use — every hour, every season, every calendar year — is rooted in the Earth's two movements. This means geography is not just about places — it explains the very structure of time itself.

Everything in nature is connected — Seasons are not random. They are the result of a precise, predictable combination of the Earth's revolution and the tilt of its axis. This beautiful regularity has allowed farmers to plan crops, animals to hibernate, and birds to migrate — for millions of years. When we understand the science behind nature, we can respect and work with it rather than against it.

Precision matters — The Earth's rotation takes 23 hours, 56 minutes and 4 seconds — not exactly 24 hours. The orbital period is 365 days and 6 hours — not exactly 365. These tiny differences accumulate over years. The leap year exists to correct this — otherwise our calendar would drift and eventually July would fall in winter. This is a lesson in precision: small errors, if uncorrected, become big problems.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. The Earth is an oblate spheroid — flattened at poles, bulging at Equator. Five proofs: ship sighting, circular horizon, sunrise/sunset, circumnavigation (Magellan), lunar eclipse shadow.

2. Rotation — Earth spins west to east on its axis in 24 hours. Five effects: day/night (circle of illumination), apparent movement of Sun/stars east to west, direction from sunrise/sunset, bulging at Equator, tides twice a day.

3. Revolution — Earth orbits the Sun in 365 days 6 hours (elliptical orbit). Leap year every 4 years (366 days, February has 29 days). Aphelion = farthest from Sun (152 million km); Perihelion = nearest (147.3 million km).

4. Seasons are caused by (1) revolution and (2) the 66½° tilt of Earth's axis. Summer Solstice: 21 June (rays on Tropic of Cancer, longest day in NH). Winter Solstice: 22 Dec (rays on Tropic of Capricorn, longest night in NH).

5. Equinoxes: 21 March (Spring) and 23 September (Autumn) — Sun's rays fall on Equator, equal days and nights everywhere. At the poles, there are 6-month days and 6-month nights due to Earth's axial tilt.`,
    },
  ],
}

// ─── CHAPTER 3 ────────────────────────────────────────────────────────────────

const chapter3: Chapter = {
  id: 3,
  title: 'The Earth as a Globe — 2 (The Imaginary Lines)',
  type: 'Earth',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `If someone asks you: "Where exactly is Mumbai?" — you could say "on the west coast of India." But what if you needed to tell a ship captain or a pilot the exact location, anywhere in the world, in a way that is universally understood?

That is what latitude and longitude are for. They create a grid system that gives every point on Earth a unique address — a pair of coordinates that anyone in the world can use to find exactly where something is.

This chapter explains the two sets of imaginary lines — parallels of latitude and meridians of longitude — how they work, and how longitude is used to calculate time differences between places all over the world.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter continues your study of the Earth as a globe, building on Chapter 2.

A network of horizontal and vertical lines of latitude and longitude drawn on a map or globe is known as the grid system. It is also called the geographical grid and it is used to find out the exact location of places on the Earth.

Think of it like the grid on a chessboard. Each square on a chessboard has a unique position — A3, C7, F2. Similarly, every place on Earth can be given a unique position using its latitude and longitude.

This chapter also covers one of the most practical applications of longitude — calculating local time, standard time, and time zones. Once you understand that the Earth rotates 360° in 24 hours — or 1° every 4 minutes — you can calculate the time difference between any two places on Earth.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define latitude and list its key properties
• Identify and explain the five important lines of latitude (Equator, Tropic of Cancer, Tropic of Capricorn, Arctic Circle, Antarctic Circle)
• Define longitude and explain how it differs from latitude
• Explain how longitude is used to calculate local time
• Calculate simple time differences using the formula: 1° longitude = 4 minutes
• Explain Local Time, Standard Time, and Indian Standard Time (IST)
• Describe the International Date Line (IDL) and explain why it follows a zig-zag course`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `Let us understand the grid system of the Earth together.

─────

PART A — Latitudes

A latitude is the angular distance of a place north or south of the Equator.

Key facts about latitudes:
1. There are 181 parallels of latitude including the Equator
2. Each parallel of latitude is a circle
3. The circles become smaller towards the poles. The Equator (0°) is the most important and the largest circle of latitude — it divides the Earth into the Northern Hemisphere and the Southern Hemisphere
4. All the parallels of latitude are not of equal length
5. The distance between any two parallels of latitude is always equal
6. The North Pole (90°N) and South Pole (90°S) are fixed points

Five Important Lines of Latitude:
Equator — 0° — Divides Earth into Northern and Southern Hemispheres
Tropic of Cancer — 23.5°N — Northernmost point where Sun shines directly overhead (June 21)
Tropic of Capricorn — 23.5°S — Southernmost point where Sun shines directly overhead (Dec 22)
Arctic Circle — 66.5°N — Northern boundary of the Frigid Zone
Antarctic Circle — 66.5°S — Southern boundary of the Frigid Zone

Importance of Latitudes:
• To form an idea of the temperature of a place
• To divide the Earth into heat zones: Torrid zone (between the two tropics), Temperate zone, and Frigid zone
• To find out the distance of a place from the Equator

─────

PART B — Longitudes

Longitude is the angular distance of a place east or west of the Prime Meridian.

Key facts about longitudes:
1. There are 360 meridians of longitude
2. The Prime Meridian is a meridian of longitude of 0° value
3. Each meridian of longitude is a semicircle
4. All the meridians are of equal length
5. The distance between any two meridians is not equal — they get closer (converge) from the Equator to the poles
6. A giraffe at the Equator has to walk 111 km to cross one longitude — while a penguin at the poles has to only jump across!

Importance of Longitudes:
With the help of longitude we can calculate the local time of a place. If we know the latitude and longitude of a place, we can locate it easily on the globe or a map.

─────

PART C — Longitude and Time

The Earth rotates on its axis once in 24 hours. This means it takes 24 hours to pass through 360 degrees of longitude. Therefore:

24 hours = 360° longitude
1 hour = 15° longitude
4 minutes = 1° longitude

So if we know the meridians of longitude of two places, we can find out the difference in their local times.

Example: The longitude of Delhi is 77°E. It means there shall be a difference of 77 × 4 = 308 minutes = 5 hours and 8 minutes between the local time of Greenwich and Delhi.

As the Earth rotates from west to east:
• Places to the east of Greenwich will be ahead of Greenwich Time
• Places to the west of Greenwich will be behind Greenwich Time

For each 1° longitude towards the east — add 4 minutes
For each 1° longitude towards the west — subtract 4 minutes

─────

PART D — Local Time, Standard Time and IST

Local Time: The time of a place calculated according to the mid-day Sun is called the local time. All places on the same meridian of longitude have noon at the same time. Places located on different meridians have different local times. This would cause great inconvenience for a country as a whole.

Standard Time: When the local time of a central place is taken as the time for the whole country or a larger area, it is called Standard Time.

Indian Standard Time (IST): In India, 82.5°E passing through Prayagraj (Allahabad) is considered the Standard Meridian. When it is noon on this longitude, the time is taken as noon for the whole country. This is known as Indian Standard Time.

Did you know? The Standard Time of Bangladesh is half an hour ahead of IST, whereas Pakistan is half an hour behind IST.

─────

PART E — International Date Line

The line at which a day is lost or gained is called the International Date Line (IDL). It coincides with the longitude of 180°, which passes through many islands in the Pacific Ocean.

Had the IDL been straight, it would have caused a difference of dates within the same country. So it follows a zig-zag course.

Ships or planes crossing the IDL:
• Add a day while travelling eastward (one day is gained)
• Subtract a day while travelling westward (one day is lost)

Example: Velen in Siberia and Nome in Alaska are just a few miles from each other — but one is Wednesday and the other is Tuesday, because they are on opposite sides of the IDL.

─────

PART F — Time Zones

The world is divided into 24 time zones of one hour each. Each time zone corresponds to 15° longitude. Therefore, each time zone makes a difference of 1 hour.

Key formula to remember:
24 hours = 360° longitude
1 hour = 15° longitude
4 minutes = 1° longitude`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Geographic grid — The network of horizontal and vertical lines (latitudes and longitudes) drawn on a map or globe to find the exact location of places.

Latitude — The angular distance of a place north or south of the Equator. There are 181 parallels of latitude.

Equator — The most important line of latitude at 0°. Divides Earth into Northern and Southern Hemispheres. The longest circle of latitude.

Tropic of Cancer — The line of latitude at 23.5°N. The northernmost point where the Sun shines directly overhead (on 21 June).

Tropic of Capricorn — The line of latitude at 23.5°S. The southernmost point where the Sun shines directly overhead (on 22 December).

Arctic Circle — The line of latitude at 66.5°N. Northern boundary of the Frigid Zone.

Antarctic Circle — The line of latitude at 66.5°S. Southern boundary of the Frigid Zone.

Longitude — The angular distance of a place east or west of the Prime Meridian. There are 360 meridians of longitude.

Prime Meridian — The meridian of longitude at 0°. Passes through Greenwich, England. All longitudes are measured east or west of this line.

Meridian — Each line of longitude. A semicircle running from the North Pole to the South Pole. All meridians are equal in length.

Local Time — The time of a place based on the position of the Sun at that meridian. Places on the same meridian have the same local time.

Standard Time — The local time of a central meridian adopted for a whole country to avoid confusion.

Indian Standard Time (IST) — India's standard time based on the 82.5°E meridian passing through Prayagraj (Allahabad).

International Date Line (IDL) — The imaginary line at 180° longitude where a day is gained or lost. Follows a zig-zag course to avoid splitting countries.

Time Zone — One of 24 divisions of the world, each covering 15° of longitude and differing by 1 hour from the next.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `The world is connected across time — When it is noon in India, it is midnight in parts of the United States. When it is Monday in London, it is already Tuesday in Tokyo. Time zones and the International Date Line are reminders that we all live on the same rotating planet — just at different positions on it. Geography makes us aware that what affects one part of the world affects all of it.

Precision and systems make life manageable — Imagine if every town in India kept its own local time based on its exact longitude. Trains and planes would be chaos. Standard Time — including IST — was created to make coordination possible. Systems and agreements are what allow a complex world to function smoothly. That is the value of international standards.

Small differences, big consequences — The difference between Velen in Siberia and Nome in Alaska is just a few miles — but on one side it is Tuesday and on the other it is Wednesday. The IDL is an invisible line that changes the date. This teaches us that precision matters enormously in geography, science, and everyday life.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Latitude is the angular distance north or south of the Equator. There are 181 parallels. Key lines: Equator (0°), Tropic of Cancer (23.5°N), Tropic of Capricorn (23.5°S), Arctic Circle (66.5°N), Antarctic Circle (66.5°S).

2. Longitude is the angular distance east or west of the Prime Meridian (0°, Greenwich). There are 360 meridians — all semicircles of equal length. Meridians converge at the poles (not equal distances apart like latitudes).

3. Time formula: 24 hours = 360°, so 1 hour = 15°, and 4 minutes = 1° longitude. Places east of Greenwich are ahead; places west are behind. Add 4 min per degree east; subtract 4 min per degree west.

4. Indian Standard Time (IST) is based on the 82.5°E meridian passing through Prayagraj (Allahabad). Bangladesh is ½ hour ahead; Pakistan is ½ hour behind.

5. The International Date Line is at 180° longitude. It follows a zig-zag course to avoid splitting countries. Cross eastward → gain a day. Cross westward → lose a day. The world has 24 time zones, each covering 15° longitude and differing by 1 hour.`,
    },
  ],
}

// ─── CHAPTER 4 ────────────────────────────────────────────────────────────────

const chapter4: Chapter = {
  id: 4,
  title: 'Landforms',
  type: 'Landforms',
  estimatedReadMins: 20,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Look at the world around you. Mountains rise dramatically into the sky. Plateaus spread flat and wide across vast regions. Plains stretch as far as the eye can see, covered in farms and cities. Valleys cut deep into the earth, carved by rivers over millions of years.

All of these are landforms — the natural relief features on the surface of the Earth. They were not always this way. Mountains were once flat land. Valleys were once solid rock. The surface of the Earth has been shaped — and is still being shaped — by powerful forces both inside and outside the Earth.

This chapter takes you through all the major landforms: mountains, plateaus, and plains — how they formed, what types there are, and why they matter to human life.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is about physical geography — the study of the Earth's natural features and the forces that create them.

The term landform is applied by geographers to describe all relief features or natural rocky surface features on the surface of the Earth. It includes mountains, plateaus, plains, deltas, and more.

The crust of the Earth is dynamic — it is always changing. There are many forces that are active and always changing the face of the Earth. These forces are divided into two types:

Internal or Endogenic forces — these originate deep within the Earth's interior. They may be horizontal or vertical forces. They can be sudden (earthquakes, volcanoes) or slow (building mountains and continents).

External or Exogenic forces — these are agents of gradation like running water (rivers), winds, glaciers, and sea waves. They act on the Earth's surface, wear down highlands and deposit material in the lowlands. They act slowly.

The study of the Earth's relief features is called Geomorphology.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define the term landform and explain endogenic and exogenic forces
• Differentiate between a hill and a mountain
• Identify the four types of mountains (fold, block, residual, volcanic) and explain how each forms
• Name important mountain ranges of the world and locate them on a map
• Explain the four types of plateaus with examples
• Describe the four types of plains and explain their significance
• Appreciate the importance of mountains, plateaus and plains in human life`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 780,
      content: `Let us explore all the major landforms of the Earth together.

─────

PART A — Mountains

A mountain is a high land mass with a sharply sloping surface. It is considerably higher than the surrounding areas. Mountains usually occur in chains or ranges extending over hundreds of kilometres.

Some major mountain ranges of the world:
• Himalayas in Asia
• Alps in Europe
• Rockies in North America
• Andes in South America

Hill vs Mountain:
A hill extends above surrounding terrain with a height of 300–600 metres above mean sea level. It is less steep and comparatively easier to climb. Example: Yeour Hills.
A mountain is larger, extends usually more than 600 metres above mean sea level. It is steeper, and climbing is harder and more challenging. Example: Kalsubai Mountain peak.

Four Types of Mountains:

1. Fold Mountains
Fold mountains are formed when the layers of the Earth's crust are folded by compression. Think of pushing two sides of a tablecloth together — it forms folds and ridges.

Old Fold Mountains — formed about 250 million years ago:
• Rounded peaks, gentle slopes, lower height
• Examples: Aravallis (India), Appalachians (North America), Urals (Russia)

Young Fold Mountains — formed about 30-50 million years ago:
• Pointed peaks, steep slopes, deep valleys, higher height
• Examples: Himalayas (Asia), Andes (South America), Rockies (North America), Alps (Europe), Great Dividing Range (Australia), Atlas Mountains (Africa), Pyrenees (Western Europe)

2. Block Mountains
Block mountains are formed when tectonic plates move away, causing the surface of the Earth to crack apart. These cracks cause faulting, and a mass of land is pushed up between parallel cracks (called a horst) while the land on either side sinks (called a graben).

These mountains are often steep-sided and flat-topped.
Examples:
• Rhine Valley and Vosges Mountains in Europe
• Satpura and Vindhya mountains in central-western India

3. Residual Mountains
When an area of highland stands above the general level and rivers and natural agents have lowered the surface of the surrounding area, it is known as a residual mountain.
Examples:
• Nilgiri and Rajmahal Hills in India
• Aravallis in Rajasthan and Parasnath Mountain in Bihar
• Half Dome at Yosemite in California, USA

4. Volcanic Mountains
Volcanic mountains are formed when molten lava, ash, cinder and dust from deep inside the Earth come out through cracks in the Earth's crust called vents and accumulate around them.
Examples:
• Mt. Fuji (Japan)
• Mt. Mayo (Philippines)
• Barren Island in the Andaman and Nicobar Islands (India's only active volcano)

Significance of Mountains (7 points):
1. The mountains act as an effective barrier by blocking the inflow of cold dry air masses and by deflecting the moisture-laden monsoon winds to give rainfall.
2. Glaciers in the mountains give rise to many perennial rivers — these rivers are the major source of hydel power.
3. Mountains act as a physical barrier — protecting regions from invasion.
4. Tourism industry is popular in the mountains. Most summer resorts and a number of sacred shrines are located here.
5. Forests on the lower mountain slopes provide wood for fuel, building and paper making.
6. Mining is an important occupation in mountain areas — rich deposits of copper, tin, gold, aluminium, iron ore, etc. are found here.
7. Mountain slopes are used for farming — tea, coffee, fruits and vegetables are grown on terraced slopes.

─────

PART B — Plateaus

A plateau is a broad and more or less level stretch of upland that rises sharply above the neighbouring lowland. It is also called a tableland. The surface of the plateau is not always smooth — it is generally rugged and rocky.

Plateaus cover about 33% of the Earth's surface but support only 9% of the world's population.

Four Types of Plateaus:

1. Dissected Plateau
When a large plateau is divided into smaller units by deep cut valleys formed by rivers, it is called a dissected plateau.
Example: The Peninsular Plateau in India (dissected by major rivers like Godavari, Krishna, Kaveri); Meseta Central in Spain.

2. Intermontane Plateau
Plateaus which are partly or fully enclosed by mountains are known as intermontane plateaus.
Examples:
• Plateau of Tibet (also called the 'Roof of the World', lying between the Himalayas and the Kunlun mountain)
• Plateau of Bolivia; Altiplano in South America

3. Piedmont Plateau
Piedmont plateaus are situated at the foot of a mountain and bounded on the opposite side by a plain or ocean.
Examples:
• Malwa Plateau of India
• Eastern Plateau of the USA
• Patagonian Plateau in Argentina
• Appalachian Plateau in the United States

4. Continental Plateau
A plateau formed by the force generated within the crust, resulting in a large crustal block being pushed up.
Examples:
• Continents like Africa and South America have extensive continental plateaus
• Chotta Nagpur Plateau of India

Significance of Plateaus:
1. Climate: Plateaus are more pleasant in tropical areas because of their cool climate.
2. Agriculture: Plateaus have fertile soil suited to agriculture. Also useful for sheep and cattle rearing.
3. Minerals: Plateaus are regarded as the storehouse of minerals — made up of old rocks rich in mineral resources.

─────

PART C — Plains

A plain is an extensive area of land, either flat or gently rolling. Plains are also called lowlands.

Plains are better classified on the basis of their mode of formation:

1. Coastal Plain
Coastal plains are formed due to the depositional work of sea waves which drive beach materials landwards. This results in the formation of marine swamps, mud flats and tidal lowlands.

2. Alluvial Plain
Most plains have been formed by rivers and their tributaries. Rivers flowing down from mountains and plateaus wash away materials from those areas. When the river reaches gentler slope, the materials are deposited on the plains. The deposit comprising sand, silt and clay is called alluvium. Thus plains formed by rivers are called alluvial plains.
Example: The Gangetic Plains in India are the best example.

3. Glacial Plain
Glacial plains are formed by the action of glaciers. During the Ice Age, large glaciers moved down the slopes of land and deposited debris below the slopes on top of the soil.
Examples: North European Plains; Prairies of Canada.

4. Lacustrine or Lake Plain
These plains are formed by the filling of lake beds. This plain is formed due to the past existence of a lake and its accompanying sediment accumulation. Overtime, as water drains or evaporates from the lake, the deposited sediments are left behind, resulting in a level plain where the lake once existed.
Examples: Valley of Kashmir; Plains of River Po in Italy.

Significance of Plains:
Plains are the most densely populated regions as they offer several advantages:
1. Fertile soil for agriculture
2. Roads, railways and settlements can be built easily
3. Large cities and industries can be developed. Alluvial plains have been the cradle of civilization.

Did you know? The Himalayas are still growing! The Indo-Australian Plate is colliding with the Eurasian Plate (Convergent Plate Boundary), which makes them grow higher. The snout of Dakshin Gangotri Glacier is reducing at an average rate of 0.70 metre per annum.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Landform — Any natural rocky surface feature on the Earth: mountains, plateaus, plains, valleys, deltas.

Endogenic forces — Internal forces originating deep within the Earth. Can be sudden (earthquakes, volcanoes) or slow (mountain building). Also called endogenic forces.

Exogenic forces — External forces like rivers, wind, glaciers and sea waves that act on the Earth's surface, wearing down highlands and depositing material in lowlands.

Fold mountain — Mountain formed when Earth's crust layers are folded by compression. Old fold: Aravallis; Young fold: Himalayas, Alps, Andes.

Block mountain — Mountain formed when the Earth's crust cracks (faults) and a block of land is pushed up (horst) between two sunken sections (grabens). Example: Satpura and Vindhya (India).

Horst — The raised block of land between two fault lines that forms a block mountain.

Graben — The sunken land on either side of a horst (block mountain).

Residual mountain — Mountain left behind after erosion wears down the surrounding area. Example: Nilgiri Hills, Aravallis.

Volcanic mountain — Mountain formed when lava, ash, and cinder from inside the Earth accumulate around a vent. Example: Mt. Fuji, Barren Island.

Plateau — A broad, flat-topped upland that rises sharply above the surrounding lowland. Also called tableland. Covers 33% of Earth's surface.

Intermontane plateau — A plateau enclosed by mountains. Example: Tibet (Roof of the World), Bolivia.

Alluvium — The deposit of sand, silt and clay left by rivers on plains. Plains formed by rivers are called alluvial plains.

Alluvial plain — A plain formed by the deposition of alluvium (sand, silt, clay) by rivers. The Gangetic Plains of India are the best example.

Glacial plain — A plain formed by the action of glaciers depositing debris. Example: North European Plains, Prairies of Canada.

Lacustrine plain — A plain formed where a lake once existed, after the water drained away leaving behind sediment. Example: Valley of Kashmir.

Geomorphology — The study of the Earth's relief features (landforms).`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `The Earth is alive — The surface of our planet is not fixed. Mountains are still growing. Glaciers are still carving valleys. Rivers are constantly depositing new plains. The Himalayas — the highest mountains in the world — are still rising as two tectonic plates collide. This reminds us that the Earth is a dynamic, living system, not a static background. Protecting it matters because it is always changing.

Geography shapes human history — The location of plains, mountains, and rivers has determined where civilisations grew, where cities were built, and where wars were fought. The Gangetic Plain is one of the most densely populated places on Earth because its alluvial soil is so fertile. The Himalayas protected India from northern invasions for centuries. Mountains, plains, and plateaus are not just geography — they are history.

Respect for natural resources — Mountains provide minerals, water through glaciers, timber from forests, and tourism. Plains provide food for billions. Plateaus contain mineral wealth. These landforms are not just beautiful — they are the source of everything we eat, build, and use. Understanding them is the first step to using them wisely and sustainably.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Endogenic (internal) forces — originate inside the Earth; sudden (earthquakes, volcanoes) or slow (mountain building). Exogenic (external) forces — rivers, wind, glaciers, sea waves; wear down highlands, deposit in lowlands.

2. Four types of mountains: Fold (compression — old: Aravallis; young: Himalayas, Andes); Block (faulting — Satpura, Vindhya); Residual (erosion — Nilgiri Hills); Volcanic (lava — Mt. Fuji, Barren Island).

3. Four types of plateaus: Dissected (rivers cut through — Peninsular Plateau, India); Intermontane (enclosed by mountains — Tibet, Bolivia); Piedmont (at foot of mountain — Malwa, India); Continental (crustal uplift — Africa, Chotta Nagpur).

4. Four types of plains: Coastal (sea wave deposition); Alluvial (river deposition — Gangetic Plains); Glacial (glacier action — North European Plains, Canadian Prairies); Lacustrine/Lake (former lake beds — Valley of Kashmir).

5. Significance of plains: fertile soil for agriculture, easy to build roads/railways/settlements, ideal for large cities and industries. Plains are the most densely populated regions on Earth.`,
    },
  ],
}

// ─── CHAPTER 5 ────────────────────────────────────────────────────────────────

const chapter5: Chapter = {
  id: 5,
  title: 'Representation of Geographical Features',
  type: 'Maps',
  estimatedReadMins: 15,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `How do we represent the enormous, curved Earth on a flat piece of paper? How did sailors and explorers navigate the world before GPS? How does a map show you where a mountain is, where a river flows, and where the railway line runs — all in a tiny printed image?

This chapter is about maps — one of the most powerful tools ever invented by humans. Maps allow us to see the whole world at a glance, navigate from place to place, plan cities and roads, and understand where everything is in relation to everything else.

You will learn what a map is, the different types of maps, the elements every map must have, and how to read the symbols and directions on a map. By the end of this chapter, you will understand and be able to read any map.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter teaches you cartography — the science of map making.

The art of making maps is very old. Claudius Ptolemy, the famous Roman Geographer, drew the map of the world in 150 CE. The word 'map' has been taken from a Latin word 'mappa' which in classical Latin meant table cloth or napkin — indicating that the earliest maps were drawn on cloth, napkin or tree leaves.

A map is a visual representation of the Earth or a part of the Earth, drawn to a scale, on a flat surface. The key difference from a photograph is that a map uses symbols, lines, colours and very few words to convey a great deal of information in a limited space.

This chapter also explains the difference between a map, a sketch, a plan, and a globe — four different ways of representing the Earth.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Define a map and explain the difference between a map, sketch, plan and globe
• Classify maps on the basis of scale (large scale and small scale) and content (physical, political, thematic)
• List and explain the five elements of a map: title, direction, scale, legend, grid
• Explain the three types of scale: statement, graphical, and representative fraction
• Identify and use the eight cardinal points and intermediate directions
• Read and interpret conventional signs and symbols on maps`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 540,
      content: `Let us learn everything about maps together.

─────

PART A — Key Definitions

Map — A visual representation of the Earth or a part of the Earth, drawn to a scale, on a flat surface. Claudius Ptolemy drew the map of the world in 150 CE.

Cartography — The science of map making.

Cartographer — The person who draws maps.

Map Projection — The technique by which a curved surface can be represented on a flat sheet of paper. Mathematical formulas help the cartographer depict the curved surface of Earth on a flat surface.

Map Scale — The ratio of the distance on the map to the actual distance on the ground.

Sketch — A simply or roughly executed drawing or painting, especially a preliminary one, giving the essential features without the details. It is NOT drawn to scale.

Plan — A drawing made to scale to represent the top view or a horizontal section of a structure, like a floor layout of a building.

Globe — A three-dimensional realistic representation of the Earth. Holding a globe is like holding a model of the Earth.

─────

PART B — Types of Maps

Maps are classified in two ways:

1. On the Basis of Scale:
Large scale maps — show a smaller area in greater detail
• Cadastral maps — give details of properties and buildings; useful for city survey, local administration, recording land ownership and city plans
• Topographical maps — based on a careful survey of land; show both natural features (hills, valleys) and man-made features (settlements, roads, wells); useful for military purposes; prepared by Survey of India

Small scale maps — show a large area of the ground with less detail
• Wall maps — small scale maps meant for display; show large areas at a glance; used in offices and classrooms
• Atlas maps — drawn to a smaller scale than wall maps; a collection of maps is called an Atlas; convenient to carry in book form; suitable for educational purposes

2. On the Basis of Content (Purpose):
Physical Maps — depict the detailed landscapes like landforms and water bodies using different colours. Mountains are shown in brown, deserts in yellow, plains in green and water bodies in blue.

Political Maps — tell us about different countries, their states and capitals by clearly depicting their boundaries and showing the location of cities.

Thematic Maps (Subject Specific Maps) — deal with a specific topic or theme of an area: distribution of population, crops or minerals, industries, tourist destinations, weather conditions, etc. Example: Annual Rainfall map of India.

─────

PART C — Differences Between Map and Globe

Map:
• It is flat
• It can have distortions
• It is unable to represent the actual shape of the Earth
• It can show a lot of details of a small area
• Unable to demonstrate the movements of the Earth
• It has a key or legend

Globe:
• It is 3 dimensional
• It is more realistic — shows correct shapes and sizes of continents and oceans
• It represents the actual shape of the Earth
• Unable to show many details
• It can demonstrate the movements of the Earth
• Key or legend is absent

─────

PART D — Elements of a Map

A map has five basic elements:
1. Title — Introduces the topic of the map
2. Direction — Helps to find the way using cardinal points: North, South, East and West
3. Scale — Helps to measure distances
4. Legend or Key — Explains the symbols used on the map
5. Grid System — Helps to locate places

─────

PART E — Types of Scale

1. Statement or Verbal Scale — gives a written description of the scale used. Example: 1 cm to 10 km means 1 cm on the map corresponds to 10 km on the ground. This is known as statement scale.

2. Graphical Scale (Linear Scale) — a straight line marked and divided according to the proportional distance on the ground.

3. Representative Fraction — a numerical description of the ratio of map distance to ground distance. The numerator is always 1. Example: 1:10,000 means 1 unit on the map corresponds to 10,000 units on the ground.

─────

PART F — Directions

Cardinal directions are the most important directions: North, South, East and West.

A map usually has an arrow drawn on the right margin with 'N' marked on the tip, pointing towards north. These cardinal directions correspond to specific degrees on a compass:
North = 0°, East = 90°, South = 180°, West = 270°

Between the four main directions there are further intermediate directions:
NE (Northeast) — between North and East
SE (Southeast) — between South and East
SW (Southwest) — between South and West
NW (Northwest) — between North and West

─────

PART G — Conventional Signs and Symbols

It is not possible to draw on a map the actual shape and size of different features. They are shown using various conventional signs and symbols. These give a lot of information in a limited space.

Common conventional symbols:
Railway line with station — shown as a dashed line with RS
Roads: Metalled — shown as a solid red line; Unmetalled — dotted line
Boundary: International — dash-dot-dash; State — dash-dot; District — dashed
River, Well, Tank — shown as wavy blue line, circle, oval
Temple — shown as a temple symbol (⛩)
Post Office — shown as a filled red square
Settlement — shown as a grid of small squares
Trees — shown as tree symbol`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Map — A visual representation of the Earth or part of it, drawn to a scale on a flat surface.

Cartography — The science of map making.

Cartographer — The person who makes maps.

Map projection — The mathematical technique used to represent the curved Earth on a flat surface.

Map scale — The ratio of the distance on the map to the actual distance on the ground.

Sketch — A rough drawing not drawn to scale. Gives essential features without precise detail.

Plan — A drawing made to scale showing the top view of a structure (like a building layout).

Globe — A three-dimensional model of the Earth. The most accurate representation of Earth's shape.

Large scale map — Shows a smaller area in greater detail. Examples: cadastral maps, topographical maps.

Small scale map — Shows a large area with less detail. Examples: wall maps, atlas maps.

Cadastral map — A large scale map showing details of properties and buildings. Used for city survey and land administration.

Topographical map — A large scale map showing both natural and man-made features. Used for military purposes. Prepared by Survey of India.

Physical map — A map showing landforms and water bodies using colours: mountains (brown), deserts (yellow), plains (green), water (blue).

Political map — A map showing countries, states, capitals, and boundaries.

Thematic map — A map dealing with a specific topic: population, crops, rainfall, minerals, etc.

Legend / Key — A part of the map that explains what each symbol and colour represents.

Representative Fraction (RF) — A ratio expressing map scale, e.g. 1:10,000 (1 unit on map = 10,000 units on ground).

Cardinal directions — The four main compass directions: North, South, East, West.

Conventional signs — Standard symbols used on maps to represent features that cannot be drawn to scale.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Maps empower us — A map is one of the most democratising inventions in human history. With a map, anyone can navigate anywhere. Before GPS, maps were the only way to travel across oceans, plan cities, and manage countries. Even today, understanding a map is an essential life skill — for travellers, soldiers, planners, doctors, engineers, and students.

The language of symbols — Maps communicate through symbols, colours and lines rather than words. This makes them universally readable — a map of India can be understood by someone from Japan who cannot read Hindi or English. This is a powerful reminder that communication does not always need words. Learning to read maps is learning a universal language.

Accuracy matters — A map that is wrong can send a ship onto rocks, a traveller into danger, or an army into the wrong location. This is why cartography — the science of map making — requires extraordinary precision and verification. The lesson for us: in any field, accuracy is not optional. Getting the details right matters.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. A map is a visual representation of the Earth drawn to scale on a flat surface. Key definitions: Cartography (science of map making), Sketch (not to scale), Plan (to scale, top view), Globe (3D model of Earth).

2. Maps by scale: Large scale (small area, more detail) — Cadastral (property), Topographical (natural + man-made). Small scale (large area, less detail) — Wall maps (display), Atlas maps (education).

3. Maps by content: Physical (landforms, rivers — colours: mountains=brown, plains=green, water=blue); Political (countries, states, capitals); Thematic (specific topics: rainfall, crops, population).

4. Five elements of a map: Title (topic), Direction (N/S/E/W arrow), Scale (distance ratio), Legend/Key (symbol guide), Grid System (locating places). Three types of scale: Statement (1cm = 10km), Graphical (straight line), Representative Fraction (1:10,000).

5. Cardinal directions: N, S, E, W (at 0°, 270°, 90°, 180° on compass). Intermediate directions: NE, SE, SW, NW. Conventional signs show features (railways, roads, temples, post offices) using standard symbols understood by all map readers.`,
    },
  ],
}

// ─── CHAPTER 6 ────────────────────────────────────────────────────────────────

const chapter6: Chapter = {
  id: 6,
  title: 'Agriculture in India and World',
  type: 'Agriculture',
  estimatedReadMins: 16,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `Every meal you eat started in a farm. The rice in your plate, the wheat in your bread, the sugar in your tea — all of it came from the ground, grown by a farmer somewhere on this Earth.

Agriculture is the foundation of human civilization. The moment our ancestors learned to grow their own food instead of hunting and gathering, they could settle in one place, build cities, develop language, and create everything we call human culture.

This chapter explores the world of agriculture — how it began, the different ways it is practised across the world, and how new technologies like AI and robotics are transforming it today.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is about Economic Geography — the study of how people use the Earth's resources to earn a living.

The term 'agriculture' has been derived from two Latin words: 'ager' meaning land and 'culture' meaning cultivation. People first began to farm the land about 10,000 years before the present, in South-West Asia.

Agriculture helped early man lead a settled life. Today, more than half of the world's population is directly or indirectly engaged in agriculture. About two-thirds of the total population of India depends directly or indirectly on agriculture for their livelihood.

Plants grown in large numbers are called crops. Farmers grow two types of crops: Food crops (crops that form a part of the diet — like rice and wheat) and Cash crops (grown only to sell — like sugarcane and tea).

India has three cropping seasons: Kharif (monsoon), Rabi (winter), and Zaid (summer).`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Differentiate between food crops and cash crops with examples
• Explain the three cropping seasons of India: Kharif, Rabi and Zaid
• Identify and describe all 10 types of farming practised in the world
• Explain the key features of subsistence, commercial, intensive, extensive, plantation, mixed and organic farming
• Understand the Green Revolution and its impact on India
• Appreciate the latest trends in Indian agriculture: robotics and AI`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 600,
      content: `Let us understand agriculture across India and the world.

─────

PART A — Food Crops vs Cash Crops

Food Crops — crops that form a part of the diet of farmers and other people. Farmers keep some for their own use and sell the rest. Examples: rice, wheat.

Cash Crops — crops grown by farmers only to sell. They form raw materials for some industries and may need to be processed before selling. Examples: sugarcane, tea, cotton, rubber.

─────

PART B — Three Cropping Seasons of India

Kharif — Monsoon season (June to September). Crops sown at the beginning of monsoon and harvested in autumn.

Rabi — Winter season (October to March). Crops sown after monsoon and harvested in spring.

Zaid — Summer season (March to June). Short-duration crops grown between Rabi and Kharif.

─────

PART C — Types of Farming

1. Subsistence Farming
The farmer owns a small piece of land, cultivates it with the help of friends and family, and consumes almost the entire farm produce — with little surplus to sell. Practised in: China, Vietnam, Cambodia, Mexico and Peru. In India: tribal areas of Assam, hilly states of north-eastern India, and the Himalayan region.

2. Primitive Farming
Found in some parts of the equatorial and tropical forests. People use simple tools or implements and produce food only for their own immediate needs.

3. Shifting Agriculture (Slash and Burn Method)
A primitive agricultural practice in which a patch of forest is cleared, trees are felled and stumps are set on fire. The patch is then cultivated for a few years until the soil fertility is seriously reduced. Then the farmer moves to a fresh piece of land and the same process is repeated.

This type of farming is dependent on: Monsoon, Natural fertility of the soil, Suitability of other environmental conditions.

Crops grown: dry paddy, maize, millets, vegetables.

It is known by different names in India:
Jhum — Assam | Ponam — Kerala | Podu — Andhra Pradesh | Koman — Odisha | Khil — Himalayan region | Masha, Bewar, Hera — Madhya Pradesh

Government has tried to discourage this due to its wasteful nature and adverse effects on the environment.

4. Commercial Farming
Cultivation of crops for sale in the market. Uses High Yielding Variety (HYV) seeds, chemical fertilizers, insecticides and pesticides. Requires large farms and mechanized farming. Crops: wheat, maize, tea, coffee, cashew, rubber, bananas, tobacco, sugarcane, oilseeds.
Practised in: Central United States, Canadian prairies. In India: Punjab, Haryana, Odisha, Kerala, West Bengal.

5. Intensive Farming
Characteristics: High population density, limited arable farmland, water through irrigation, use of high-yielding seeds, green manures, chemical fertilizers.
The farmer tries to get maximum output from the land and raises more than one crop per year.
Practised in: irrigated areas of northern plains and coastal plains of India.

6. Extensive Farming
Characteristics: Low population density, huge cultivable farmlands, latest advanced technology and machinery.
Farmers specialize in a couple of major commercial crops like rice, wheat, sugarcane.
Practised in: Terai region of sub-Himalayas and north-western India; USA, Canada (North America); Argentina, Peru (South America).

7. Plantation Farming
Plantations are large tracts of land or estates used for cultivation of a single agricultural crop (tea, coffee, cocoa, jute, rubber, spices). Labour intensive with huge capital investment. Introduced by Europeans in the tropical and sub-tropical regions. Aims for higher yield and superior quality — managed like industrial units.

Requirements: Scientific methods of farming, cheap and skilled labour, high managerial ability, special machines, big land holdings. Final output is processed and packaged.

Practised in India: hills of South India and North-East India (tea, coffee, rubber). Other example: cocoa cultivation in Ghana.

It caters to the export market and helps earn foreign exchange.

8. Monoculture
An agricultural practice of producing or growing a single crop, plant, or livestock species. Continuous monoculture can lead to the quicker build-up of pests and diseases. Criticised for environmental effects — might create imbalance in the food supply chain.
Examples of monoculture crops: potatoes, corn, soyabeans.

9. Mixed Farming
Cultivation of crops and raising of animals simultaneously. Multiple crops with varying maturity periods are sown at the same time. Ensures steady income — if agriculture fails due to climate, farmers can rely on livestock.
Most extensive regions of mixed farming: Eurasia and the United States.

10. Organic Farming
A method of farming which primarily aims at cultivating the land and raising crops in such a way to keep the soil alive by using:
• Organic wastes (crop, animal and farm wastes)
• Biological materials along with beneficial microbes (bio fertilizers)
• Helps in releasing nutrients to crops and increasing production
• Nitrogen self-sufficiency through the use of legumes

─────

PART D — Latest Trends in Agriculture in India

Agricultural Robotics: Used for seeding, fruit picking, harvesting, planting and many more applications.

Artificial Intelligence: Providing farmers with information on weather data, crop yielding and prices — helping them make informed decisions.

─────

PART E — The Green Revolution in India

The Green Revolution is regarded as the greatest revolution in the country which helped transform the economy from food scarcity to food self-sufficiency. It describes the manifold increase in India's food crop production, particularly crops like wheat, with the use of:
• High yielding seeds
• Mechanization
• Chemical fertilizers and pesticides
• Large scale irrigation

It created more employment opportunities in the agricultural sector and increased rural prosperity.

Did you know? One of Kashmir's key industries is the production of saffron — the world's most expensive spice, used as a dye as well as food flavouring.

Did you know? Madagascar is one of the leading producers of clove and vanilla in the world. India grows more bananas than any other country in the world.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `Agriculture — Derived from Latin words ager (land) and culture (cultivation). The science and practice of farming — growing crops and raising animals for food and other products.

Food crops — Crops grown as part of the diet of farmers and other people. Examples: rice, wheat, maize.

Cash crops — Crops grown only to sell, often as raw materials for industries. Examples: sugarcane, tea, cotton, rubber.

Kharif — India's monsoon cropping season (June to September). Crops sown at the start of the monsoon.

Rabi — India's winter cropping season (October to March). Crops sown after the monsoon ends.

Zaid — India's summer short-duration cropping season (March to June).

Subsistence farming — Farming where the farmer grows food mainly for their own family's use, with little surplus to sell.

Shifting agriculture — Also called slash and burn. A farmer clears forest land, farms it until soil fertility drops, then moves to a new plot. Called Jhum in Assam.

Commercial farming — Farming for sale in the market, using HYV seeds, chemical fertilizers, and mechanized equipment.

HYV seeds — High Yielding Variety seeds — seeds specially bred to produce more crop per plant.

Intensive farming — Farming that maximises output from a small plot of land using irrigation, fertilizers, and multiple crops per year.

Extensive farming — Farming over large areas using machinery, practised where population density is low.

Plantation farming — Large-scale, single-crop farming on estates (tea, coffee, rubber). Labour intensive. Managed like industrial units.

Monoculture — Growing only a single crop continuously on the same land. Can lead to pest build-up and soil problems.

Mixed farming — Combining crop cultivation with animal rearing on the same farm.

Organic farming — Farming using only natural inputs (organic waste, bio fertilizers) without chemical pesticides or fertilizers.

Green Revolution — The transformation of Indian agriculture in the 20th century through HYV seeds, irrigation, fertilizers and mechanization — turning India from food scarcity to self-sufficiency.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Farmers feed the world — More than half the world's population is engaged in agriculture. In India, two-thirds of the population depends on it directly or indirectly. Yet farmers are often among the least recognised and most vulnerable members of society. Understanding agriculture helps us appreciate every meal we eat and the enormous human effort behind it.

Innovation transforms lives — The Green Revolution turned India from a country of food scarcity to food self-sufficiency in just a few decades. Today, AI and robotics are beginning another transformation. This shows us that scientific innovation — when properly applied — can change millions of lives for the better. The best solutions to the world's biggest problems often come from applying intelligence to fundamental human needs like food.

Sustainability is the future — Practices like slash-and-burn farming damage the environment. Monoculture weakens soil and increases pests. In contrast, organic farming and mixed farming keep the soil healthy and the ecosystem balanced. The choices farmers make today determine whether the land can feed people tomorrow. This is a lesson in thinking long-term rather than just short-term.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. Food crops (rice, wheat — for eating) vs Cash crops (sugarcane, tea — for selling). Three Indian cropping seasons: Kharif (June–Sept, monsoon), Rabi (Oct–March, winter), Zaid (March–June, summer).

2. Subsistence farming — small farm, consumed by family. Shifting agriculture (Jhum/slash-and-burn) — clear forest, farm until soil exhausted, move on. Government discourages it due to environmental damage.

3. Commercial farming — sell in market, HYV seeds, mechanized. Intensive — high density, small land, maximise yield. Extensive — low density, huge land, machinery (USA, Canada, Argentina).

4. Plantation farming — single crop, large estates, export-oriented (tea, coffee, rubber, cocoa). Monoculture — single crop, risk of pests and disease. Mixed farming — crops + animals together. Organic — no chemicals, uses bio-fertilizers.

5. Green Revolution — transformed India from food scarcity to self-sufficiency using HYV seeds, fertilizers, irrigation, mechanization. Latest trends: agricultural robotics and AI for weather data, crop yield predictions and pricing.`,
    },
  ],
}

// ─── CHAPTER 7 ────────────────────────────────────────────────────────────────

const chapter7: Chapter = {
  id: 7,
  title: 'North America',
  type: 'Continents',
  estimatedReadMins: 20,
  sections: [
    {
      id: 1,
      title: 'What is this chapter about?',
      content: `North America is a continent of extremes and contrasts. It has the world's largest freshwater lake (Lake Superior), one of the world's deepest canyons (the Grand Canyon), some of the world's tallest mountains (the Rockies and Denali), and the world's most productive agricultural plains (the Central Lowlands).

It is home to some of the most powerful nations on Earth — Canada, the United States, and Mexico — as well as seven smaller nations of Central America. It was called the 'New World' because Europeans only discovered it in the 15th century, even though Indigenous peoples had lived there for thousands of years.

This chapter takes you through North America's location, political divisions, physical features, and one of its most important economic activities — lumbering in Canada.`,
    },
    {
      id: 2,
      title: 'About this chapter',
      content: `This chapter is Regional Geography — the study of a specific part of the world in detail.

North America is the third largest continent after Asia and Africa. The continent is called the 'New World' because it was discovered recently — in the 15th century. Christopher Columbus landed on the Bahamas (one of the Caribbean islands) in his search for a sea route to India. He called the islands the 'Indies' and the people 'Indians' — who came to be known as Red Indians because of their rugged complexion. Later, when it was realised this was not India, it came to be known as the 'New World.' The continent of America was named in 1507, after the Italian explorer Amerigo Vespucci landed on the mainland.

The chapter also covers lumbering — the harvesting of forest products on a commercial basis — which is one of Canada's most important industries.`,
    },
    {
      id: 3,
      title: 'Learning outcomes',
      content: `By the end of this chapter, you will be able to:

• Locate North America on a world map and describe its boundaries
• List the major political divisions and their capitals
• Describe the four physical divisions of North America with examples
• Identify major rivers, lakes, mountains and features of North America
• Explain the process of lumbering in Canada — its season, stages and significance
• Understand what relief rainfall is and how it occurs`,
    },
    {
      id: 4,
      title: 'Read the text',
      minReadSeconds: 780,
      content: `Let us explore North America together — from its location to its lumbering industry.

─────

PART A — Location and Boundaries

North America lies between 7°N and 84°N latitude and 20°W to 180°W longitudes. It lies entirely in the Northern and Western hemispheres. The Tropic of Cancer passes through Mexico and the Arctic Circle passes through the northern part of Canada.

Most of the continent lies in the North Temperate Zone. North America has a great longitudinal extent which results in five Time Zones.

Boundaries:
• North America and South America are joined by the Isthmus of Panama
• Pacific Ocean lies to the West
• Atlantic Ocean lies to the East
• Arctic Ocean lies to the North
• The Bering Strait separates North America from Asia in the west

Coastline: North America has a smooth coastline compared to other continents, except for the fiords in the north west. Important bays and gulfs: Gulf of Mexico, Hudson Bay, Gulf of St. Lawrence, Gulf of California.

Islands: Greenland is the largest island, followed by Baffin, Ellesmere Island, Victoria (Canada). Newfoundland lies off the east coast of Canada. The tropical islands in the Caribbean Sea are collectively known as the 'West Indies' — Cuba, Jamaica, Dominican Republic, Haiti, Puerto Rico.

─────

PART B — Political Divisions

The major part of North America comprises of three large nations:

North — Canada — Capital: Ottawa
Middle — The United States — Capital: Washington, D.C.
South — Mexico — Capital: Mexico City

To the South of Mexico, there are 7 countries forming Central America known as 'Seven Sisters': Guatemala, Belize, El Salvador, Honduras, Nicaragua, Costa Rica, Panama.

Languages spoken: English, French, Spanish and Dutch
Languages gaining popularity: Hindi and Mandarin
Main religion: Christianity
Other religions: Judaism, Islam, Buddhism, Hinduism

Fact File: The Europeans always dreamt of silver and gold when they landed in the New World. The names they gave to the places testify to this — Costa Rica (Rich Coast), Puerto Rico (Rich Port) and Rio de la Plata (River of Silver).

─────

PART C — Physical Features

North America can be divided into four physical divisions:

1. The Canadian Shield or Laurentian Shield
The northern part near the Hudson Bay is known as the Canadian Shield. It is made up of some of the oldest rocks in the world which were covered with thick sheets of ice during the Ice Age. Depressions were formed by the glaciers which scooped out great hollows on the surface. Eventually it resulted in lakes by the melting of glaciers.

The Five Great Lakes of North America: Lake Superior (the largest freshwater lake in the world), Lake Michigan, Lake Huron, Lake Erie and Lake Ontario. Many short rivers enter the Hudson Bay after flowing through the Canadian Shield. The Mackenzie, a north-flowing river, empties into the Arctic Ocean. The Yukon flows through Canada and Alaska and drains into the Bering Sea.

South of the Great Lakes lie the extensive lowlands drained by the Mississippi River and its tributaries. In the northern part, these lowlands are called the Prairies. In the west, the plains are high in elevation — known as 'High Plains.'

2. The Western Cordilleras
They are young fold mountains like the Himalayan Ranges in South Asia. They stretch from Alaska in the north to Panama in the south. Since they look like twisted cords, the name 'Cordilleras' is given to them (Spanish word meaning rope or chain). Their maximum width is 1500 km in the middle, which decreases towards the north and south.

A great deal of volcanic activity and frequent earthquakes are experienced in this region.

Mount Elbert is the highest summit of the Rocky Mountains. Denali (also known as Mount McKinley) is the highest mountain peak in North America with a summit elevation of 6,190 m above sea level.

The Cascade Range lies in the middle while the Coastal Range lies along the coast. The Sierra Nevada lies inland, parallel to the Coastal Range. Sierra Madre lies to the south, stretching through the length of South America.

The parallel ranges of Western Cordilleras contain several intermontane plateaus — Columbia Plateau, Colorado Plateau, Mexican Plateau. These plateaus are crossed by rivers which have carved out deep valleys with almost vertical sides called gorges or canyons.

The Grand Canyon of the Colorado River is above 1857 m deep and 446 km long — famous worldwide for its beauty and majesty.

3. The Eastern Highlands or Appalachian Mountains
The Eastern Highlands are not very high mountains. They are quite like the Aravallis of north-west India and the Urals of Russia. They are a chain of old fold mountains stretching from the valley of St. Lawrence to Southern USA. They are known as Laurentian Highlands in Canada and Appalachians in USA. They are below 2000 metres in most places.

The eastern slopes of these highlands are quite steep. Therefore, the rivers here make a number of waterfalls — that is why this area is called the 'Fall Line.' The river St. Lawrence flowing towards north-east provides external waterway connection to internal destinations.

Many short rivers flow down the highlands of the eastern coast forming rapids and waterfalls — ideal for generating hydro-electricity. One of the world's most productive coal fields lies in the central part of this region. Other important minerals: iron ore, zinc and mica. The coastal lowlands along the Atlantic Ocean have rich soil, so much of this land is under farming.

4. The Great Central Plains or The Central Lowlands
Central Plains lie between the Western Cordilleras and Eastern Highlands. This region has vast and fertile lowlands. They start from the delta of the Mackenzie River in the North and extend upto the Gulf of Mexico in the South.

The Mississippi-Missouri river system provides water for irrigation, hydro-electricity and transportation. The basins of these rivers are among the agriculturally most productive regions of the world.

The beautiful horse shoe-shaped Niagara Falls are located between Lake Erie and Lake Ontario. They represent the largest concentration of fresh water in the world. They provide excellent internal waterway. Tourism is a major attraction.

Did you know? In Native American language, Mississippi means 'Great River.' Mark Twain's 'Tom Sawyer' was set along the Mississippi River.

North America — Facts at a Glance:
Latitudinal extent: 7°N – 84°N
Longitudinal extent: 20°W – 180°W
Area: 24 million sq. km (approx.)
Size: Third largest continent
Coastline: 14,830 km
Highest point: Mt. McKinley, Alaska (6,194 m)
Lowest point: Death Valley, California (86 m below sea level)
Major Rivers: Mississippi, Missouri (longest), Rio Grande, Colorado, Mackenzie, Yukon, St. Lawrence, Ohio
Major Lakes: Great Lakes (Superior, Michigan, Huron, Erie, Ontario); Lake Superior = largest freshwater lake in the world
Mountain Ranges: Western Cordilleras (Rockies, Alaska, Cascade, Coast Ranges, Sierra Nevada, Sierra Madre) and Appalachian

─────

PART D — Lumbering in Canada

Lumbering is carried on in the coniferous, hard wood and mixed forests in the northern hemisphere in eastern North America, central and north Europe. In Canada, the forests extend in a broad unbroken belt from British Columbia and Yukon on the Pacific coast to Eastern Maritime Provinces.

The growth of the lumbering industry depends on 6 factors:
1. Nature of forest   2. Relief   3. Transport facilities
4. Local demand   5. Capital   6. Labour

Lumbering means the harvesting of the products of the forest and making them useful on a commercial basis.

Lumbering Season: Winter is the ideal season because the sap of the trees stops flowing and the frozen ground helps in transportation of logs. Another advantage: farmers are available since farming stops during winters. The swift flowing streams also provide cheap hydro-electric power to the saw mills.

The Four Processes of Lumbering:

1. Preparation — Find the right area: best stands of timber, plenty of trees, proper transport (roads and tracks). When far from population centres, a camp is established with living quarters, servicing and maintenance facilities.

2. Felling — Done by the high rigger who climbs to the top with spikes on shoes and a safety belt. The tree is felled with axes or hand saws, but modern methods use powered saws. Trees must be cut so that when they fall, they do not crush the other trees.

3. Skidding — Moving the logs to sites near roads, railways, or river banks. It is a mechanical process — independent of floods and droughts.

4. Transportation — Logs are piled on frozen rivers which, with the coming of spring, float down to saw mills located conveniently downstream. Sometimes log jams form and must be cleared by lumberjacks who jump from pile to pile setting them free with poles. Loose logs can be fatal and can crush them.

Life of a Lumberjack: Long hours of work, extreme weather conditions were the hardships of their lives. But now with industrialisation, their life has become better — they can take a plane, bus or snow mobile to travel.

Conclusion: Human activities have been diminishing the world's forest resources through burning and clearing. The vital forest cover should be at least 60% of the total area for the ecological stability of a region. Although lumbering is an economically useful activity, care must be taken that sufficient saplings are planted to ensure reserves for the future.

─────

PART E — Relief Rainfall

Relief Rainfall is caused when there is a mountain in the path of moist winds. The side of the mountain which faces the moist air gets the maximum rainfall — this is called the windward side. The side which receives hardly any rainfall on the opposite side is termed the leeward side. The rain shadow area is the area on the lee of the hills.

How it works: Moist, warm air rises at temperature ~20°C from the ocean. As it rises, it cools and moisture condenses — relative humidity increases — giving heavy rainfall on the windward slope. By the time the air reaches the other side (leeward/dry side), it is depleted of moisture and warms up again. Hence no rainfall on the leeward side.`,
    },
    {
      id: 5,
      title: 'Word watch',
      content: `New World — The name given to North America by Europeans because they discovered it recently (15th century). Named after Amerigo Vespucci.

Isthmus of Panama — The narrow strip of land connecting North America and South America.

Bering Strait — The narrow body of water separating North America (Alaska) from Asia (Russia).

Canadian Shield — The oldest rock formation in North America, surrounding Hudson Bay. Shaped by glaciers during the Ice Age. Contains the Great Lakes.

Great Lakes — Five large freshwater lakes on the US-Canada border: Superior, Michigan, Huron, Erie, Ontario. Lake Superior is the largest freshwater lake in the world.

Western Cordilleras — Young fold mountains stretching from Alaska to Panama. Cordillera is a Spanish word meaning rope or chain.

Denali (Mt. McKinley) — The highest mountain peak in North America at 6,190 m. Located in Alaska.

Grand Canyon — The spectacular canyon carved by the Colorado River in the Western Cordilleras. 1857 m deep and 446 km long.

Appalachian Mountains — Old fold mountains in eastern North America. Below 2000 m. Known as Laurentian Highlands in Canada.

Fall Line — The area along the Appalachian Mountains where rivers fall from highlands to coastal lowlands, creating rapids and waterfalls. Ideal for hydro-electricity.

Central Lowlands — The vast fertile plains between the Cordilleras and Appalachians. Drained by the Mississippi-Missouri river system.

Niagara Falls — Famous waterfalls between Lake Erie and Lake Ontario. Largest concentration of fresh water. Important for tourism and transport.

Lumbering — The harvesting of forest products and making them useful on a commercial basis.

Felling — Cutting down a tree during the lumbering process.

Skidding — Moving cut logs to roads, railways or river banks.

Relief rainfall — Rainfall caused when moist winds are forced upward by a mountain. Heavy rain on the windward side; dry on the leeward side.

Windward side — The mountain slope facing the moist wind — receives heavy rainfall.

Leeward side — The mountain slope away from the moist wind — receives little or no rainfall.

Rain shadow — The dry area on the leeward side of a mountain.`,
    },
    {
      id: 6,
      title: 'Values learnt',
      content: `Forests are the lungs of the Earth — The chapter ends with a powerful statement: forest cover should be at least 60% of the total area for ecological stability of a region. Lumbering provides timber, paper, and income — but if done without restraint, it destroys entire ecosystems. The lesson is clear: economic activity must be balanced with environmental responsibility. Planting saplings to replace cut trees is not generosity — it is a necessity.

Diversity makes a continent strong — North America is extraordinarily diverse: in climate (Arctic tundra to tropical Caribbean), in economy (Canadian forests to Mexican farmlands), in culture (English, French, Spanish, Indigenous languages), and in religion. This diversity is not a weakness — it is what makes the continent dynamic and productive. India too is diverse in exactly these ways. Diversity, when respected, is a superpower.

Geographical features shape human lives — The Mississippi River created the richest agricultural plains in the world. The Niagara Falls powered the industrialisation of the Great Lakes region. The Rocky Mountains shaped the settlement patterns of the entire western USA. In North America, as everywhere, human history has been shaped by geography.`,
    },
    {
      id: 7,
      title: 'Quick recap',
      content: `Before you take the quiz, here are the five most important things to remember:

1. North America — 3rd largest continent; 7°N to 84°N, 20°W to 180°W. Bounded by Pacific (W), Atlantic (E), Arctic (N), Isthmus of Panama joins it to South America. Three major nations: Canada (Ottawa), USA (Washington DC), Mexico (Mexico City). Seven Central American countries = "Seven Sisters."

2. Four physical divisions: (1) Canadian Shield — oldest rocks, Great Lakes (Superior is world's largest freshwater lake), Mackenzie and Yukon rivers. (2) Western Cordilleras — young fold mountains, Denali (6190m, highest in NA), Grand Canyon (1857m deep, 446km long). (3) Appalachians — old fold mountains, below 2000m, Fall Line, coal fields. (4) Central Lowlands — Mississippi-Missouri system, Niagara Falls, most productive farmland.

3. Lumbering in Canada: Winter is ideal season (frozen ground helps transport, sap stops). Four processes: Preparation → Felling → Skidding → Transportation (logs float downstream in spring). Importance: 60% forest cover needed for ecological stability.

4. Relief rainfall: Moist winds hit a mountain → forced upward → cool → condense → heavy rain on windward side → dry on leeward side (rain shadow). The mountain causes the rain — hence "relief" rainfall.

5. Key facts: Mississippi = "Great River" (Native American). Mark Twain's Tom Sawyer set on Mississippi. Cordillera = Spanish for rope/chain. Death Valley, California is the lowest point in North America (86m below sea level). Costa Rica = Rich Coast, Puerto Rico = Rich Port.`,
    },
  ],
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────

export const CHAPTERS: Chapter[] = [
  chapter1, chapter2, chapter3, chapter4, chapter5, chapter6, chapter7,
]

export function getChapter(id: number): Chapter | undefined {
  return CHAPTERS.find(c => c.id === id)
}

export function getSection(chapterId: number, sectionId: number): Section | undefined {
  return getChapter(chapterId)?.sections.find(s => s.id === sectionId)
}
