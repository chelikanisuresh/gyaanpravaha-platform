// Mathematics Chapter Content — Gyaanpravaha
// Maths Connexion Class 6 — 11 chapters

export interface Section { id: number; title: string; content: string; minReadSeconds?: number }
export interface Chapter { id: number; title: string; type: string; estimatedReadMins: number; sections: Section[] }

const ch1: Chapter = {
  id: 1, title: 'Whole Numbers', type: 'Numbers', estimatedReadMins: 14,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `This chapter introduces the world of whole numbers — the foundation of all arithmetic. You already know natural numbers (1, 2, 3, ...). Now you will discover what changes when we include 0 in that collection.

You will learn how to represent whole numbers on a number ray, understand the relationships between them (successor and predecessor), and explore the key properties that govern all operations with whole numbers: closure, commutativity, associativity, and distributivity.

These properties are not just rules to memorise — they are the laws that make calculation convenient. Once you understand them, you can rearrange sums and products in whatever order is easiest to compute, and use multiplication to simplify long additions.` },
    { id: 2, title: 'About this chapter', content: `Digits: 0, 1, 2, 3, 4, 5, 6, 7, 8 and 9 — the ten digits used in different combinations to form numbers.

Natural Numbers (N) = {1, 2, 3, 4, ...} — counting numbers. There is no largest natural number.

Whole Numbers (W) = {0, 1, 2, 3, 4, 5, ...} — natural numbers plus zero. The smallest whole number is 0.

Key fact: Every natural number is a whole number, but 0 is a whole number which is NOT a natural number.

On the number ray: No whole number exists to the left of 0. Whole numbers extend indefinitely to the right. A number on the number ray is greater than every number to its left. In a whole number system, zero has only a successor (1) and does not have a predecessor.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Distinguish between natural numbers and whole numbers
• State the smallest whole number (0) and smallest natural number (1)
• Represent whole numbers on a number ray
• Explain successor and predecessor of a whole number
• Apply the Closure Property: Addition and Multiplication are closed; Subtraction and Division are NOT
• Apply the Commutative Property for addition and multiplication (NOT for subtraction/division)
• Apply the Associative Property for addition and multiplication (NOT for subtraction/division)
• Apply the Distributive Property: a × (b + c) = a×b + a×c
• State properties of zero (additive identity) and one (multiplicative identity)
• Solve numerical problems using properties to simplify calculations` },
    { id: 4, title: 'Read the text', minReadSeconds: 420, content: `NATURAL NUMBERS vs WHOLE NUMBERS

N = {1, 2, 3, ......}   W = {0, 1, 2, 3, ......}
The only difference: Whole numbers include 0. Natural numbers do not.
Smallest whole number = 0. Smallest natural number = 1.

NUMBER RAY
A number ray starts at 0 and extends indefinitely to the right with whole numbers marked at equal intervals.
Properties:
1. No whole number exists to the left of 0.
2. Whole numbers extend indefinitely to the right of 0.
3. A whole number on the number ray is greater than whole numbers to its left (e.g., 64 < 76 < 79 < 100).
4. A whole number on the number ray is less than whole numbers to its right.
5. Each number is the successor of its previous one, and the predecessor of the next.

Successor of n = n + 1. Predecessor of n = n − 1. Zero has no predecessor in whole numbers.

─────

I. CLOSURE PROPERTY

Addition: 5 + 3 = 8 (whole number); 0 + 71 = 71 (whole number). Addition IS closed.
Multiplication: 5 × 3 = 15 (whole number); 0 × 7 = 0 (whole number). Multiplication IS closed.
Subtraction: 5 − 8 is NOT a whole number. Subtraction is NOT closed.
Division: 3 ÷ 17 is NOT a whole number; 0/5 = 0 (whole number) but 5/0 undefined. Division NOT closed.

─────

II. COMMUTATIVE PROPERTY (Interchanging the numbers)

Addition: a + b = b + a ✓ (e.g., 3+7 = 7+3 = 10)
Multiplication: a × b = b × a ✓ (e.g., 5×15 = 15×5 = 75)
Subtraction: a − b ≠ b − a ✗ (e.g., 6−4 = 2 but 4−6 is not a whole number)
Division: a ÷ b ≠ b ÷ a ✗ (e.g., 15÷3 ≠ 3÷15)

─────

III. ASSOCIATIVE PROPERTY (Changing the order of grouping)

Addition: (a + b) + c = a + (b + c) ✓
Multiplication: (a × b) × c = a × (b × c) ✓
Division: (a ÷ b) ÷ c ≠ a ÷ (b ÷ c) ✗
Subtraction: (a − b) − c ≠ a − (b − c) ✗

NOTE: For addition and multiplication, you can rearrange and regroup for convenient calculation. This is NOT possible for subtraction and division.

─────

IV. DISTRIBUTIVE PROPERTY of multiplication over addition/subtraction

a × (b + c) = a × b + a × c
a × (b − c) = a × b − a × c

Examples:
• 15 × (4 + 6) = (15 × 4) + (15 × 6) = 60 + 90 = 150
• 483 × 8 + 483 × 2 = 483 × (8 + 2) = 483 × 10 = 4830
• 12 × 81000 − 11 × 81000 = 81000 × (12−11) = 81000

─────

V. PROPERTIES OF ZERO (0)

• Zero × any whole number = 0
• 0 ÷ any non-zero whole number = 0
• 0 + any whole number = the number itself (0 is the Additive Identity)
• Any whole number + 0 = the number itself

─────

VI. PROPERTIES OF ONE (1)

• 1 × any whole number = the number itself (1 is the Multiplicative Identity)
• Any whole number ÷ 1 = the number itself

─────

SOLVED EXAMPLES

1. 43 + 162 + 257 + 3138 → pair: (43+257) + (162+3138) = 300 + 3300 = 3,600
2. 250 × 60 × 50 × 8 = (250×8) × (60×50) = 2000 × 3000 = 60,00,000
3. 8 × 125 × 40 × 25 = (8×125) × (40×25) = 1000 × 1000 = 10,00,000
4. 483 × 8 + 483 × 2 = 483 × (8+2) = 4830 [Distributive]

─────

SUMMARY

• 1 is the smallest natural number. 0 is the smallest whole number.
• There is no largest whole number (every whole number has a successor).
• Closed: addition ✓, multiplication ✓; NOT closed: subtraction ✗, division ✗.
• Commutative: addition ✓, multiplication ✓; NOT: subtraction ✗, division ✗.
• Associative: addition ✓, multiplication ✓; NOT: subtraction ✗, division ✗.
• Distributive: a × (b+c) = a×b + a×c.
• Additive identity: 0. Multiplicative identity: 1.
• Dividend = Divisor × Quotient + Remainder.` },
    { id: 5, title: 'Word watch', content: `Digit — Any of the ten symbols (0–9) used to write numbers.

Natural numbers — Counting numbers starting from 1: {1, 2, 3, ...}.

Whole numbers — Natural numbers including zero: {0, 1, 2, 3, ...}.

Number ray — A half-line starting at 0 extending to the right, showing whole numbers at equal intervals.

Successor — The whole number immediately after a given number. Successor of n = n + 1.

Predecessor — The whole number immediately before a given number. Predecessor of n = n − 1. Zero has no predecessor in whole numbers.

Closure property — A set is "closed" under an operation if the result of the operation always belongs to the same set. Whole numbers are closed under addition and multiplication.

Commutative property — The result is the same regardless of the order of the two numbers. e.g., a + b = b + a. Applies to addition and multiplication of whole numbers.

Associative property — The result is the same regardless of how the numbers are grouped. e.g., (a+b)+c = a+(b+c). Applies to addition and multiplication.

Distributive property — Multiplication distributes over addition: a × (b+c) = a×b + a×c.

Additive identity — The number that leaves any number unchanged when added to it. That number is 0.

Multiplicative identity — The number that leaves any number unchanged when multiplied by it. That number is 1.` },
    { id: 6, title: 'Values learnt', content: `Order and structure in mathematics — The properties of whole numbers reveal deep patterns in arithmetic. Commutativity tells us order does not matter for addition and multiplication. Associativity tells us grouping does not matter. Distributivity tells us how multiplication and addition interact. These properties allow us to calculate smarter.

Zero: India's great contribution — The discovery and formalisation of zero is one of India's greatest gifts to world mathematics. Without zero, modern mathematics, science, and computing would be impossible. Zero as the additive identity means nothing added to you changes you.

Properties as calculation shortcuts — 483 × 8 + 483 × 2 = 4830 using distributivity is much easier than computing each product. Mathematics is about finding the most elegant and efficient path.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. N = {1,2,3,...}, W = {0,1,2,3,...}. Smallest whole number = 0. Smallest natural number = 1. Every natural number is a whole number but 0 is NOT a natural number.

2. Closure: Addition ✓, Multiplication ✓, Subtraction ✗, Division ✗.

3. Commutative: Addition a+b=b+a ✓, Multiplication a×b=b×a ✓, Subtraction ✗, Division ✗.

4. Associative: Addition (a+b)+c=a+(b+c) ✓, Multiplication ✓, Subtraction ✗, Division ✗.

5. Distributive: a×(b+c) = a×b + a×c.

6. Additive identity = 0 (a+0=a). Multiplicative identity = 1 (a×1=a).

7. 0 × any number = 0. 0 + any number = that number. 1 × any number = that number.

8. Successor of n = n+1. Predecessor of n = n−1. Zero has no predecessor in W.

9. Useful trick: pair numbers that sum to multiples of 10 or 100 before adding.` },
  ],
}

const ch2: Chapter = {
  id: 2, title: 'H.C.F. and L.C.M.', type: 'Numbers', estimatedReadMins: 16,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Have you ever wondered why bus stops are arranged so two buses always arrive together at certain intervals, or why bells ringing at different intervals eventually ring simultaneously? The mathematics behind all these patterns is the science of factors and multiples — specifically the Highest Common Factor (HCF) and the Lowest Common Multiple (LCM).

This chapter teaches you how to find the HCF — the largest number that divides all given numbers without a remainder. And the LCM — the smallest number divisible by all the given numbers. You will learn divisibility rules (2, 3, 4, 5, 6, 8, 9, 10, 11, 12) and two powerful methods for each: prime factorisation and division.

The most important relationship: HCF × LCM = Product of the two numbers.` },
    { id: 2, title: 'About this chapter', content: `Factors and Multiples: If 14 = 2 × 7, then 2 and 7 are factors (divisors) of 14. 14 is a multiple of 2 and of 7.
12 = 1×12 = 2×6 = 3×4 → factors of 12: 1, 2, 3, 4, 6, 12.

Prime number: exactly two factors (1 and itself). Examples: 2, 3, 5, 7, 11, 13.
Composite number: more than two factors. Examples: 4, 6, 8, 9, 10.

Prime factorisation: expressing a number as a product of its prime factors only. Every composite number has EXACTLY ONE prime factorisation (unique, regardless of order).
Example: 36 = 2 × 2 × 3 × 3.

Co-prime numbers: two numbers whose HCF = 1. Example: 8 and 9 are co-prime.
Twin primes: pairs of prime numbers differing by 2. Examples: (3,5), (5,7), (11,13).` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• State and apply divisibility rules for 2, 3, 4, 5, 6, 8, 9, 10, 11, 12
• Find prime factorisation of composite numbers
• Define HCF and find it using prime factorisation method
• Find HCF using continued division (long division) method
• Define LCM and find it using prime factorisation method
• Find LCM using common division method
• Apply: Product of two numbers = HCF × LCM
• Solve real-life problems involving HCF (largest container, simplify fractions) and LCM (when events next coincide)` },
    { id: 4, title: 'Read the text', minReadSeconds: 480, content: `DIVISIBILITY RULES

Divisible by 2: Last digit is 0, 2, 4, 6, or 8.
Divisible by 3: Sum of all digits is divisible by 3.
Divisible by 4: Last two digits form a number divisible by 4 (or are 00).
Divisible by 5: Last digit is 0 or 5.
Divisible by 6: Divisible by BOTH 2 and 3.
Divisible by 8: Last three digits form a number divisible by 8 (or are 000).
Divisible by 9: Sum of all digits is divisible by 9.
Divisible by 10: Last digit is 0.
Divisible by 11: |Sum of digits at even positions − Sum of digits at odd positions| = 0 or divisible by 11.
Divisible by 12: Divisible by BOTH 3 and 4.

─────

PRIME FACTORISATION

Every composite number has exactly one prime factorisation (Fundamental Theorem of Arithmetic).
Using a factor tree:
36 = 2 × 18 = 2 × 2 × 9 = 2 × 2 × 3 × 3

─────

HIGHEST COMMON FACTOR (HCF)

HCF = The greatest number which divides two or more numbers without a remainder.
Also called: GCD (Greatest Common Divisor) or GCM (Greatest Common Measure).

Method 1 — Prime Factorisation:
HCF = Product of COMMON prime factors (at their LOWEST power).
Example: HCF of 72, 120, 192.
72 = 2³ × 3²; 120 = 2³ × 3 × 5; 192 = 2⁶ × 3.
Common factors: 2³ × 3 = 8 × 3 = 24. HCF = 24.

Method 2 — Continued Division (for large numbers):
• Divide larger by smaller number.
• Replace larger with remainder; repeat.
• Continue until remainder = 0.
• The LAST DIVISOR is the HCF.
Example: HCF of 105 and 230:
230 ÷ 105 = 2 rem 20; 105 ÷ 20 = 5 rem 5; 20 ÷ 5 = 4 rem 0. HCF = 5.

For THREE numbers: find HCF of any two, then HCF of that result with the third.

─────

LOWEST COMMON MULTIPLE (LCM)

LCM = The smallest number that is a common multiple of two or more numbers.

Method 1 — Prime Factorisation:
LCM = Product of ALL prime factors at their HIGHEST power.
Example: LCM of 8, 24, 36.
8=2³; 24=2³×3; 36=2²×3².
LCM = 2³ × 3² = 8 × 9 = 72.

Method 2 — Common Division Method:
Divide all numbers by the smallest prime that divides at least two of them. Bring down numbers not divisible. Continue until all quotients are 1. LCM = product of all divisors.
Example: LCM of 30, 60, 72 = 2×3×5×2×2×1×3 = 360.

─────

PROPERTIES OF HCF AND LCM

1. HCF ≤ smallest of the numbers.
2. LCM ≥ largest of the numbers.
3. HCF of co-prime numbers = 1.
4. LCM of co-prime numbers = their product.
5. If 'a' is a factor of 'b': HCF(a,b) = a and LCM(a,b) = b.
6. HCF is always a factor of LCM.
7. Product of two numbers = HCF × LCM.
   LCM = Product ÷ HCF; HCF = Product ÷ LCM.
   Other number = (HCF × LCM) ÷ Given number.

─────

REAL-LIFE APPLICATIONS

HCF applications: Largest container/tape/measure that measures multiple quantities exactly.
LCM applications: When will two or more repeating events next occur simultaneously (bells, buses, steps).

Example: Three children's steps are 28, 32, and 36 cm. When do they step together again?
LCM(28,32,36) = 2016 cm = 20.16 m.` },
    { id: 5, title: 'Word watch', content: `Factor — A number that divides another number exactly (remainder = 0). e.g., factors of 12 are 1, 2, 3, 4, 6, 12.

Multiple — The product of a number and a whole number. e.g., multiples of 5: 5, 10, 15, 20, ...

Prime number — Has exactly two factors: 1 and itself. Examples: 2, 3, 5, 7, 11, 13.

Composite number — Has more than two factors. Examples: 4, 6, 8, 9, 10, 12.

Prime factorisation — Writing a number as a product of prime factors only. e.g., 36 = 2² × 3².

HCF (Highest Common Factor) — The greatest number that divides all given numbers exactly. Same as GCD.

LCM (Lowest Common Multiple) — The smallest number divisible by all given numbers.

Co-prime numbers — Two numbers whose HCF = 1. They share no common factor other than 1. e.g., 8 and 9.

Twin primes — Two prime numbers that differ by exactly 2. e.g., (3,5), (5,7), (11,13), (17,19).

Continued division — A method to find HCF: divide larger by smaller repeatedly until remainder = 0; last divisor is HCF.

Key formula: Product of two numbers = HCF × LCM.` },
    { id: 6, title: 'Values learnt', content: `Finding what is shared — HCF finds the greatest thing two or more numbers have in common. In life, looking for common ground between people, ideas, or cultures — finding the HCF of differences — is a valuable skill for cooperation and harmony.

Patterns eventually coincide — LCM tells us when repeating patterns next align simultaneously. Bells ringing at 4, 6, and 10 minute intervals will all ring together after 60 minutes. In life, persistence eventually brings people and opportunities to the same moment. The LCM of patience and effort is always success.

Reduce to simplest form — HCF helps reduce fractions to lowest terms. In thinking, too, stripping away complexity to find the core (simplest form) of an idea is a powerful intellectual skill.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Divisibility: 2 (even); 3 (digit sum ÷ 3); 4 (last 2 digits ÷ 4); 5 (ends 0/5); 6 (÷2 AND ÷3); 8 (last 3 digits ÷ 8); 9 (digit sum ÷ 9); 10 (ends 0); 11 (alternate digit sum difference = 0 or ÷11); 12 (÷3 AND ÷4).

2. HCF = product of COMMON prime factors. HCF by continued division: last divisor when remainder = 0.

3. LCM = product of ALL prime factors at highest power. LCM by division: multiply all the common divisors.

4. KEY FORMULA: HCF × LCM = Product of two numbers.

5. HCF ≤ smallest number. LCM ≥ largest number.

6. Co-prime: HCF = 1. Their LCM = their product.

7. HCF real life: largest measure/container. LCM real life: next simultaneous occurrence.

8. For three numbers: find HCF of first two, then HCF of result with third.` },
  ],
}

const ch3: Chapter = {
  id: 3, title: 'Area and Perimeter', type: 'Measurement', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Every closed figure has a boundary and an interior. The total length of the boundary is its perimeter, and the space enclosed inside is its area. These measurements appear in daily life — fencing a garden, tiling a floor, painting a wall, buying land.

This chapter teaches the perimeter and area formulas for rectangles and squares, and how to apply them to real-life situations. You will also learn the units of length (mm to km) and area (mm² to km², ares, and hectares), and how to convert between them.

Key distinction: perimeter is a length (1D, measured in m/cm); area is a surface (2D, measured in m²/cm²).` },
    { id: 2, title: 'About this chapter', content: `A closed figure has three parts: (1) edge/boundary, (2) interior, (3) exterior.

PERIMETER = sum of lengths of all sides. Unit: metre (m) or cm, km, mm.
Rectangle: P = l + b + l + b = 2(l + b)
Square: P = 4 × s

AREA = region enclosed by the closed figure. Unit: square metre (m²) or cm², mm², km².
Rectangle: A = l × b
Square: A = s² = s × s

Derived formulas:
Breadth = Area ÷ Length
Length = Area ÷ Breadth
Side of square = √Area

Units of area: 100 m² = 1 are; 10,000 m² = 1 hectare.
Units of length: 1 km = 1000 m; 1 hm = 100 m; 1 dam = 10 m; 1 dm = 0.1 m; 1 cm = 0.01 m; 1 mm = 0.001 m.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define perimeter and area of a closed figure
• State and apply formulas: rectangle P=2(l+b), square P=4s; rectangle A=l×b, square A=s²
• State SI unit of area (m²) and other units (cm², km², are, hectare)
• Know: 100 m² = 1 are; 10,000 m² = 1 hectare
• Convert between units of length (km, hm, dam, m, dm, cm, mm)
• Find a missing dimension given area and one side
• Solve real-life problems involving perimeter and area (fencing, flooring, tiling, land measurement)
• Find area of irregular figures by dividing into rectangles` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `PERIMETER

Perimeter = sum of lengths of all sides of a closed figure. Standard unit: metre (m).

Rectangle: P = l + b + l + b = 2l + 2b = 2(l + b)
Square: P = s + s + s + s = 4 × s
Polygon: P = sum of all sides

─────

AREA

Area = measurement of the region enclosed by a closed figure. Standard unit: m². Other units: cm², mm², km².

Rectangle: A = l × b
• Breadth = A ÷ l; Length = A ÷ b

Square: A = s × s = s²

Note: A square is a special type of rectangle.

─────

LENGTH AND AREA UNITS

Length:
• 1 km = 1000 m; 1 hm = 100 m; 1 dam = 10 m
• 1 dm = 1/10 m; 1 cm = 1/100 m; 1 mm = 1/1000 m

Area:
• 100 m² = 1 are
• 10,000 m² = 1 hectare (ha)

─────

SOLVED EXAMPLES

1. Square field, side = 28.2 m.
Area = (28.2)² = 795.24 sq.m; Perimeter = 4 × 28.2 = 112.8 m.

2. Playground 40 m × 35 m.
Area = 40 × 35 = 1400 m².

3. Field 180 m × 650 m.
Area = 1,17,000 m² = 1,17,000 ÷ 10,000 = 11.7 hectares.

4. Floor 3m × 4m. Tile = 12cm × 10cm = 120 cm².
Floor area = 300 × 400 = 1,20,000 cm². Tiles needed = 1,20,000 ÷ 120 = 1000 tiles.

5. Square perimeter = 360 cm → side = 90 cm → Area = 8100 cm².
Rectangle with same area (8100 cm²) and length 135 cm → breadth = 8100 ÷ 135 = 60 cm.
Perimeter of rectangle = 2(135+60) = 390 cm.

6. Mat 5.20 m × 3.30 m: Perimeter = 2(5.20+3.30) = 17.0 m. Area = 5.20 × 3.30 = 17.16 sq.m.

─────

IRREGULAR FIGURES

Divide into rectangles using dotted lines. Find area of each rectangle. Add all areas.

─────

SUMMARY

• Area of square = side × side; Area of rectangle = length × breadth.
• Perimeter of square = 4 × side; Perimeter of rectangle = 2(length + breadth).
• 100 m² = 1 are; 10,000 m² = 1 hectare.` },
    { id: 5, title: 'Word watch', content: `Perimeter — Total length of the boundary of a closed figure. Measured in units of length (m, cm).

Area — The amount of surface enclosed by a closed figure. Measured in square units (m², cm²).

Rectangle — Closed figure with 4 sides, opposite sides equal and parallel, all angles 90°. A = l×b; P = 2(l+b).

Square — A rectangle with all four sides equal. A = s²; P = 4s.

Boundary — The edge of a closed figure separating interior from exterior.

Are — Area unit. 1 are = 100 m².

Hectare (ha) — Land area unit. 1 hectare = 10,000 m² = 100 ares.

Irregular figure — A figure whose area cannot be found by one formula; must be divided into regular shapes.

Circumference — The perimeter of a circle.

Length units: 1 km = 1000 m; 1 m = 100 cm; 1 cm = 10 mm.` },
    { id: 6, title: 'Values learnt', content: `Two different measures of the same region — Perimeter and area both describe a closed figure but measure completely different things. A long thin rectangle and a square can have the same perimeter but very different areas. This teaches us that different measures reveal different aspects of the same situation. Analytical thinking means always asking: what exactly am I measuring?

Mathematics solves real problems — Calculating how much fencing a garden needs, how many tiles a floor requires, how much land is in a field — these are real daily needs solved by perimeter and area formulas. Mathematics is not abstract — it is a practical tool for navigating the world.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Perimeter of rectangle = 2(l+b). Perimeter of square = 4s.

2. Area of rectangle = l×b. Area of square = s².

3. Given area and one side: other side = area ÷ given side.

4. 100 m² = 1 are. 10,000 m² = 1 hectare.

5. Length units: 1 km=1000m; 1 m=100cm; 1 cm=10mm.

6. Irregular figures: divide into rectangles → find each area → add.

7. Tiles problem: Number of tiles = Area of floor ÷ Area of one tile (ensure same units!).

8. Perimeter of triangle = sum of all three sides.` },
  ],
}

const ch4: Chapter = {
  id: 4, title: 'Volume', type: 'Measurement', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Area measures a flat 2D surface. Volume measures three-dimensional space — the amount of space a solid occupies. When you fill a box with objects, measure the water in a glass, or pack items into a bag, you are dealing with volume.

This chapter introduces volume through the cube and cuboid. You will learn to find volume by counting unit cubes and by using the formulas V = l × b × h (cuboid) and V = side³ (cube). You will also understand the difference between volume (space occupied by a solid) and capacity (space inside a hollow solid).` },
    { id: 2, title: 'About this chapter', content: `Volume = the measure of amount of space occupied by a solid.
Capacity = the measure of inner space of a hollow solid (e.g., a glass, a box, a bottle).

Unit cubes: 1 mm cube, 1 cm cube, 1 m cube are standard units of volume.

Cuboid — 3D solid with 6 rectangular faces, 12 edges, 8 vertices. Length (l), Breadth (b), Height (h) may all differ.
Volume of cuboid = l × b × h (cubic units). V = l × b × h.

Cube — Special cuboid where l = b = h = side (all edges equal). 6 identical square faces.
Volume of cube = side × side × side = side³.

If base area (l × b) is given: V = base area × height.

Always convert all measurements to the SAME unit before calculating volume.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define volume and distinguish it from capacity
• Identify a cube and a cuboid; state the difference between them
• State and apply: Volume of cuboid = l × b × h
• State and apply: Volume of cube = side³
• Find volume by counting unit cubes
• Find volume when base area and height are given: V = base area × height
• Convert measurements to the same unit before calculating
• Solve real-life problems involving volume (packing, filling, building)` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `VOLUME AND CAPACITY

Volume = space occupied by a solid.
Capacity = inner space of a hollow solid.

Unit cubes (1mm³, 1cm³, 1m³) are the standard measuring units for volume.

─────

FINDING VOLUME BY COUNTING UNIT CUBES

Volume = total number of unit cubes that fill the solid.
A solid 2×2×2 cm³ = 8 unit cubes.
A solid 3×3×3 cm³ = 27 unit cubes.
A solid 4×2×3 cm³ = 24 unit cubes.

For layers: Volume = (cubes per layer) × (number of layers).
A box 6cm × 2cm × 3cm: layer has 6×2=12 cubes; 3 layers → V = 36 cu.cm.

─────

VOLUME OF CUBOID

Volume of cuboid = length × breadth × height
V = l × b × h

IMPORTANT: All measurements must be in the SAME unit.
If l, b, h in cm → V in cm³. If in m → V in m³.

Example: Cuboid l=2m, b=30cm, h=20cm.
Convert to cm: l=200cm, b=30cm, h=20cm.
V = 200 × 30 × 20 = 1,20,000 cu.cm.

If base area given: V = base area × height.
If base area = 200 cm² and h = 15 cm: V = 200 × 15 = 3000 cm³.

─────

VOLUME OF CUBE

A cube is a special cuboid where length = breadth = height.
Volume of cube = side × side × side = side³

Example: Cube with side 5 cm: V = 5³ = 125 cu.cm.

─────

SOLVED EXAMPLES

| Solid | L | B | H | Volume |
|-------|---|---|---|--------|
| Cuboid | 5 | 3 | 2 | 5×3×2 = 30 cm³ |
| Cuboid | 4 | 5 | 3 | 4×5×3 = 60 cm³ |
| Cube | 3 | 3 | 3 | 3³ = 27 cm³ |
| Cube | 8 | 8 | 8 | 8³ = 512 cm³ |` },
    { id: 5, title: 'Word watch', content: `Volume — The amount of 3D space occupied by a solid. Measured in cubic units (cm³, m³, mm³).

Capacity — The amount a hollow container can hold. Related to volume but specific to hollow objects.

Cuboid — A 3D solid with 6 rectangular faces. Also called rectangular prism. V = l × b × h.

Cube — A special cuboid where all 6 faces are identical squares (all edges equal). V = side³.

Unit cube — A cube with each edge = 1 unit length. The standard measuring unit for volume.

Base area — The area of the bottom face (l × b for a cuboid).

Cubic centimetre (cm³) — Volume of a 1cm cube. Also written cc or cu.cm.

Cubic metre (m³) — Volume of a 1m cube.

Faces — The flat surfaces of a 3D solid. A cuboid has 6 faces.

Edges — Line segments where two faces meet. A cuboid has 12 edges.

Vertices — Corner points where edges meet. A cuboid has 8 vertices.` },
    { id: 6, title: 'Values learnt', content: `From 2D to 3D thinking — Area deals with flat surfaces. Volume adds a third dimension. This conceptual leap — thinking in three dimensions — is essential in engineering, architecture, medicine, and science. Understanding volume teaches spatial reasoning, which is one of the most practical forms of intelligence.

The same formula at every scale — V = l×b×h works for a tiny medicine capsule or a massive oil tanker. The universality of mathematical formulas — working at every scale from microscopic to astronomical — is one of mathematics' most beautiful features.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Volume = space occupied by solid. Capacity = inner space of hollow solid.

2. Volume of cuboid = l × b × h. Volume of cube = side³.

3. A cube is a special cuboid where all sides are equal.

4. Units: cm³, m³, mm³.

5. ALWAYS convert all dimensions to the same unit first.

6. If base area and height given: V = base area × height.

7. Count unit cubes: find number of cubes that fill the solid.

8. Examples: Cuboid 5×3×2 = 30 cm³. Cube side=5 → V=125 cm³. Cube side=8 → V=512 cm³.` },
  ],
}

const ch5: Chapter = {
  id: 5, title: 'Fractions', type: 'Numbers', estimatedReadMins: 14,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `"Fraction" comes from the Latin frangere, "to break." A fraction represents a part of a whole. When you eat half a pizza, run two-thirds of a lap, or take three-quarters of a teaspoon of medicine, you are using fractions.

This chapter reviews and extends your knowledge of fractions — proper, improper, mixed, and equivalent fractions. You will learn to add and subtract fractions with different denominators using the LCM method, multiply fractions (product of numerators over product of denominators), and divide fractions by multiplying by the reciprocal.

These operations appear constantly in cooking, tailoring, measuring, splitting costs, and hundreds of other real-life situations.` },
    { id: 2, title: 'About this chapter', content: `A fraction a/b (where a, b are whole numbers and b ≠ 0):
• Numerator (a): how many parts we have.
• Denominator (b): how many equal parts the whole is divided into.

Types:
• Proper fraction: a < b (e.g., 3/4). Value < 1.
• Improper fraction: a > b (e.g., 7/4). Value > 1.
• Mixed fraction: whole number + proper fraction (e.g., 1¾). Equivalent to an improper fraction.
• Equivalent fractions: same value, different form (e.g., 1/2 = 2/4 = 3/6 = 4/8).

To reduce to lowest terms: divide numerator and denominator by their HCF.
To find equivalent fractions: multiply or divide both numerator and denominator by the same non-zero number.

Reciprocal: the reciprocal of a/b is b/a. Product of a fraction and its reciprocal = 1.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Identify proper, improper, and mixed fractions and convert between them
• Find equivalent fractions and reduce fractions to lowest terms (÷ HCF)
• Add and subtract fractions with unlike denominators using LCM method
• Add and subtract mixed fractions
• Multiply fractions: product of numerators / product of denominators
• Find the reciprocal of any fraction
• Divide fractions by multiplying by the reciprocal
• Solve real-life word problems involving fractions (cloth, money, distance, time)` },
    { id: 4, title: 'Read the text', minReadSeconds: 420, content: `TYPES OF FRACTIONS

Proper: a/b where a < b. e.g., 3/4. Value < 1.
Improper: a/b where a > b. e.g., 7/4. Value > 1.
Mixed: whole + proper. e.g., 1¾ = 7/4.
Converting improper to mixed: divide numerator by denominator; quotient = whole number, remainder = new numerator.
Converting mixed to improper: (whole × denom + numer) / denom.

Equivalent fractions: 1/2 = 2/4 = 3/6 (multiply/divide both parts by same non-zero number).
Lowest terms: divide both parts by their HCF.

─────

ADDITION AND SUBTRACTION OF FRACTIONS

Like fractions (same denominator): add/subtract numerators, keep denominator.
Unlike fractions (different denominator):
1. Find LCM of all denominators.
2. Convert each fraction to have LCM as denominator.
3. Add/subtract numerators.

Example 1: 2/15 + 7/10.
LCM(15,10) = 30.
2/15 = 4/30; 7/10 = 21/30.
4/30 + 21/30 = 25/30 = 5/6. ✓

Example 2: 5/12 + 9/16 + 11/24.
LCM(12,16,24) = 48.
20/48 + 27/48 + 22/48 = 69/48 = 23/16 = 1 7/16.

Example 3: 11/16 − 4/9. LCM(16,9) = 144.
99/144 − 64/144 = 35/144.

Example 4: 1/3 − 3/4 + 5/6. LCM(3,4,6) = 12.
4/12 − 9/12 + 10/12 = 5/12.

─────

MULTIPLICATION OF FRACTIONS

Product of fractions = Product of numerators / Product of denominators.
Always simplify by cancellation BEFORE multiplying.

Examples:
9/16 × 7/5 = 63/80.
2/5 × 2/3 × 7/8 = 28/120 = 7/30.
4⅔ × 3½ = 14/3 × 7/2 = 98/6 = 49/3 = 16⅓.

─────

RECIPROCAL

Reciprocal of a/b = b/a. Product = 1.
Reciprocal of 5/6 = 6/5. Reciprocal of 1/4 = 4. Reciprocal of 7 = 1/7.

─────

DIVISION OF FRACTIONS

To divide: multiply by the reciprocal of the divisor.
a/b ÷ c/d = a/b × d/c.

Examples:
5/8 ÷ 3/2 = 5/8 × 2/3 = 10/24 = 5/12.
4/5 ÷ 7/15 = 4/5 × 15/7 = 60/35 = 12/7 = 1 5/7.
8 ÷ 1 1/9 = 8 ÷ 10/9 = 8 × 9/10 = 72/10 = 7 1/5.

─────

SUMMARY

• Add/subtract unlike fractions: find LCM of denominators, convert, operate on numerators.
• Multiply: product of numerators / product of denominators. Simplify first.
• Divide: multiply by reciprocal of divisor.` },
    { id: 5, title: 'Word watch', content: `Fraction — A number of form a/b where a, b are whole numbers and b ≠ 0. Represents a part of a whole.

Numerator — Top number. How many parts we have.

Denominator — Bottom number. How many equal parts the whole is divided into.

Proper fraction — Numerator < denominator. Value < 1. e.g., 3/5.

Improper fraction — Numerator > denominator. Value > 1. e.g., 7/4.

Mixed fraction — Whole number + proper fraction. e.g., 2⅗.

Equivalent fractions — Fractions with the same value but different numerator/denominator. e.g., 1/2 = 2/4.

Lowest terms — HCF of numerator and denominator = 1. The fraction is fully simplified.

Reciprocal — The reciprocal of a/b is b/a. Their product is always 1.

Common denominator — A shared denominator for two or more fractions. Usually the LCM of the individual denominators.

Unlike fractions — Fractions with different denominators. Must be converted to like fractions for addition/subtraction.` },
    { id: 6, title: 'Values learnt', content: `Fractions teach fair sharing — Dividing a pizza, a sum of money, or a length of cloth equally requires fractions. Mathematical understanding of fractions is the foundation of fairness and precision in daily life.

The whole is made of parts — A fraction reminds us that every whole can be broken into parts. Between any two whole numbers, there are infinitely many fractions — a beautiful hint at the richness of the number system beyond the integers we can count.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Proper: numer < denom (e.g., 3/5). Improper: numer > denom (e.g., 7/4). Mixed: whole + proper (e.g., 1¾).

2. Equivalent fractions: multiply/divide both parts by same number.

3. Lowest terms: divide both parts by HCF.

4. Add/subtract unlike fractions: LCM of denominators → convert → add/subtract numerators.

5. Multiply: (a/b) × (c/d) = (ac)/(bd). Cancel BEFORE multiplying.

6. Reciprocal of a/b = b/a. (a/b) × (b/a) = 1.

7. Divide: (a/b) ÷ (c/d) = (a/b) × (d/c).

8. Mixed to improper: 2⅗ = (2×5+3)/5 = 13/5. Improper to mixed: 13÷5 = 2 rem 3 → 2⅗.` },
  ],
}

const ch6: Chapter = {
  id: 6, title: 'Percentage', type: 'Numbers', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `"Percentage" comes from the Latin per centum meaning "per hundred." When we say 10% of students passed, we mean 10 out of every 100. Percentage is one of the most practically useful mathematical concepts — used daily for marks, discounts, tax, bank interest, inflation rates, and nutrition labels.

This chapter teaches four key conversions: percent ↔ fraction ↔ decimal, and two key calculations: finding a percentage of a quantity, and expressing one quantity as a percentage of another. With these tools, you can read and interpret any percentage data you encounter in newspapers, bills, and reports.` },
    { id: 2, title: 'About this chapter', content: `Percent = per hundred. Symbol: %. 10% = 10/100 = 0.10.

Conversions:
1. % → Fraction: drop % sign, divide by 100. e.g., 50% = 50/100 = 1/2.
2. % → Decimal: drop % sign, move decimal 2 places LEFT. e.g., 35% = 0.35.
3. Fraction → %: multiply fraction by 100, add % symbol. e.g., 3/4 × 100 = 75%.
4. Decimal → %: move decimal 2 places RIGHT, add % symbol. e.g., 0.25 → 25%.

Finding % of a quantity: (percent/100) × quantity.
e.g., 10% of 500 = (10/100) × 500 = 50.

Expressing one quantity as % of another: (quantity/total) × 100.
e.g., 70 marks out of 80: (70/80) × 100 = 87.5%.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Convert percentage to fraction (÷ 100)
• Convert percentage to decimal (shift decimal 2 left)
• Convert fraction to percentage (× 100)
• Convert decimal to percentage (shift decimal 2 right)
• Find the percentage of a given quantity
• Express one quantity as a percentage of another
• Solve real-life problems (marks obtained, pass percentage, savings)` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `MEANING OF PERCENTAGE

% = per hundred. Symbol: %.
10% means 10 out of every 100. If 10 apples out of 100 are spoilt → 10% are spoilt. If a man saves ₹20 out of ₹100 → he saved 20%.

─────

I. % TO FRACTION: divide by 100.

50% = 50/100 = 1/2
134% = 134/100 = 67/50

─────

II. % TO DECIMAL: shift decimal 2 places LEFT.

90% = 0.90; 21% = 0.21; 6.25% = 0.0625

─────

III. FRACTION TO %: multiply by 100, add % symbol.

14/25 = (14/25) × 100 = 56%
17/8 = (17/8) × 100 = 212.5%

─────

IV. DECIMAL TO %: shift decimal 2 places RIGHT, add %.

1.21 = 121%; 0.25 = 25%; 0.09 = 9%

─────

V. FINDING % OF A QUANTITY

(percent/100) × quantity.

10% of 500 = (10/100) × 500 = 50
0.25% of 20 = (0.25/100) × 20 = 0.05
9% of 120 km = (9/100) × 120 = 10.8 km

─────

VI. EXPRESSING ONE QUANTITY AS % OF ANOTHER

Method: (given quantity / total) × 100.

Example: Ashna scored 70 out of 80 in Hindi.
(70/80) × 100 = 87.5%.

Or set up equation: (x/100) × 80 = 70 → x = 87.5.

─────

USEFUL CONVERSIONS TABLE

25% = 1/4 = 0.25; 50% = 1/2 = 0.50; 75% = 3/4 = 0.75
10% = 1/10 = 0.10; 20% = 1/5 = 0.20; 33⅓% = 1/3 ≈ 0.333.` },
    { id: 5, title: 'Word watch', content: `Percent (%) — Per hundred. The symbol % means "out of 100." 25% = 25 out of 100.

Per centum — Latin phrase meaning "per hundred." Origin of the word "percent."

Percentage of a quantity — A fraction of that quantity. e.g., 20% of 150 = 30.

Fraction → % conversion — Multiply by 100. e.g., 3/4 × 100 = 75%.

% → Fraction conversion — Divide by 100. e.g., 75% = 75/100 = 3/4.

% → Decimal conversion — Shift decimal point 2 places to the left. e.g., 35% = 0.35.

Decimal → % conversion — Shift decimal point 2 places to the right. e.g., 0.125 = 12.5%.

Discount — A percentage reduction in the original price.

Pass percentage — The minimum percentage required to pass an exam.` },
    { id: 6, title: 'Values learnt', content: `Percentage enables fair comparison — Students writing exams of different totals can be compared fairly through percentage. A student scoring 70/80 (87.5%) is compared fairly with one scoring 80/100 (80%). Normalising to a common base of 100 makes comparison meaningful and objective.

Reading the world through numbers — Interest rates, tax brackets, election results, COVID vaccination rates, nutrition labels — all use percentage. Understanding percentage is not just a classroom skill; it is genuine mathematical literacy that allows you to be an informed citizen and make intelligent decisions.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. % → Fraction: divide by 100. e.g., 75% = 75/100 = 3/4.

2. % → Decimal: shift decimal 2 places LEFT. e.g., 35% = 0.35.

3. Fraction → %: multiply by 100. e.g., 3/4 × 100 = 75%.

4. Decimal → %: shift decimal 2 places RIGHT. e.g., 0.125 → 12.5%.

5. % of a quantity: (percent/100) × quantity.

6. Express one as % of another: (part/whole) × 100.

7. 25%=1/4=0.25; 50%=1/2=0.5; 75%=3/4=0.75; 10%=1/10=0.1; 20%=1/5=0.2.` },
  ],
}

const ch7: Chapter = {
  id: 7, title: 'Ratio and Proportion', type: 'Numbers', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `A ratio compares two quantities of the same kind. When a recipe calls for flour and sugar in ratio 3:1, or a map uses scale 1:50,000, or a class has 3 boys for every 2 girls — all use ratio.

A proportion is when two ratios are equal: a:b :: c:d. The fundamental property: product of extremes = product of means (a×d = b×c).

This chapter teaches you to write, simplify, and compare ratios; divide quantities in a given ratio; define and verify proportions; find missing terms in proportions; and solve real-life ratio and proportion problems.` },
    { id: 2, title: 'About this chapter', content: `RATIO: Comparison of two quantities of the same kind and same units by division.
Written as a:b = a/b. Read as "a is to b." Ratio has NO units.
• Antecedent = first term (a). Consequent = second term (b).
• Always express in simplest form (HCF of both terms = 1).
• Order matters: 3:2 ≠ 2:3.
• Both quantities must be the same kind and same units.

PROPORTION: Four quantities a, b, c, d are in proportion if a:b = c:d.
Written as a:b :: c:d ("a is to b as c is to d").
• Extremes = a and d (outer terms). Means = b and c (inner terms).
• Proportion property: a × d = b × c (product of extremes = product of means).

Equivalent ratios: obtained by multiplying/dividing both terms by same non-zero number.
8:4 = 4:2 = 2:1 are equivalent.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define ratio and state its properties
• Write and simplify a ratio to its lowest form
• Compare two ratios using cross multiplication
• Find equivalent ratios
• Divide a quantity in a given ratio (2 or 3 parts)
• Define proportion and identify extreme and mean terms
• Apply the proportion property: product of extremes = product of means
• Find a missing term in a proportion
• Solve real-life problems involving ratio and proportion` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `RATIO

Ratio = comparison of two quantities of the same kind and same units by division.
Written as a:b. Has NO units.
Order matters: 3:2 ≠ 2:3.

Properties:
1. Both quantities must be of the same kind.
2. Both must have same units (convert first if needed).
3. Express in simplest form (both terms divided by HCF).

Simplifying: 12:36 → HCF=12 → 1:3.

Comparing ratios (cross multiplication):
Compare 3:10 and 4:7 → 3/10 vs 4/7.
3×7=21 and 4×10=40. Since 21 < 40 → 3:10 < 4:7.

─────

DIVIDING A QUANTITY IN A GIVEN RATIO

If total = T and ratio = a:b:
First share = [a/(a+b)] × T
Second share = [b/(a+b)] × T

Example: Divide ₹1200 in ratio 6:4.
Total parts = 10.
First = (6/10) × 1200 = ₹720.
Second = (4/10) × 1200 = ₹480.

Divide triangle perimeter 36 cm in ratio 3:4:5.
Total parts = 12.
Sides: (3/12)×36=9cm; (4/12)×36=12cm; (5/12)×36=15cm.

─────

PROPORTION

a:b :: c:d means a:b = c:d.
Extremes: a and d. Means: b and c.
Property: a × d = b × c.

Check: Are 20,25,12,15 in proportion?
20×15 = 300 = 25×12. ✓ Yes, they are in proportion.

Check: Are 2,3,6,12 in proportion?
2×12=24 ≠ 3×6=18. ✗ Not in proportion.

Find missing term: 51:x :: 81:108.
x × 81 = 51 × 108. x = 5508/81 = 68.

─────

EQUIVALENT RATIOS

8:4 = 4:2 = 2:1 (divide by 2 each time). All equivalent.

─────

SOLVED EXAMPLES

1. Ratio of 50 paise to ₹2: 50p : 200p = 1:4.
2. Ratio of 24 min to 3 hrs: 24 : 180 = 2:15.
3. 12 girls, 36 boys: girls to boys = 12:36 = 1:3; boys to girls = 3:1.` },
    { id: 5, title: 'Word watch', content: `Ratio — Comparison of two quantities of the same kind and same units by division. Written as a:b. Has no units.

Antecedent — The first (left) term of a ratio.

Consequent — The second (right) term of a ratio.

Simplest form — When HCF of both terms is 1. The ratio is fully reduced.

Proportion — An equality of two ratios: a:b :: c:d means a:b = c:d.

Extremes — The outer (first and last) terms of a proportion. In a:b::c:d, the extremes are a and d.

Means — The inner (middle) terms of a proportion. In a:b::c:d, the means are b and c.

Proportion property — a × d = b × c (product of extremes = product of means). Used to check or find missing terms.

Cross multiplication — Comparing ratios a:b and c:d by computing a×d and b×c.

Equivalent ratios — Ratios with the same value. Found by multiplying/dividing both terms by same non-zero number.` },
    { id: 6, title: 'Values learnt', content: `Ratios are the language of comparison — Ratio allows fair, precise comparison. In cooking, maps, medicine, finance, and engineering, ratios encode the relationship between quantities. Understanding ratio means being able to scale any recipe, read any map, interpret any medical dosage, or understand any exchange rate.

Proportion: consistency at scale — When you scale a recipe up or down, you use proportion — keeping all ingredient ratios the same. This principle of consistent proportion underlies photography, architecture, music, and art. The golden ratio (approximately 1:1.618) appears throughout art and nature as the most aesthetically pleasing proportion.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Ratio a:b: same kind, same units, no units in result. Order matters.

2. Simplest form: divide both terms by HCF.

3. Compare ratios: cross multiply (a:b vs c:d → compare a×d with b×c).

4. Divide quantity T in ratio a:b: shares = [a/(a+b)]×T and [b/(a+b)]×T.

5. Proportion a:b :: c:d: product of extremes (a×d) = product of means (b×c).

6. Find missing term: if 51:x :: 81:108, then x×81 = 51×108, x = 68.

7. Equivalent ratios: multiply/divide both terms by same non-zero number.

8. Real-life: ratio is always in simplest form; units must match before forming ratio.` },
  ],
}

const ch8: Chapter = {
  id: 8, title: 'Basic Geometrical Concepts', type: 'Geometry', estimatedReadMins: 10,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Geometry is the mathematics of shape and space. This chapter explores the fundamental building blocks of geometry: points, lines, line segments, rays, and planes — and the relationships between them.

You will learn the four types of line relationships (parallel, intersecting, perpendicular, concurrent), understand what a plane is, and learn to construct line segments using ruler and compass. These concepts are the foundation for all further geometry — triangles, polygons, angles, and circles.` },
    { id: 2, title: 'About this chapter', content: `Point — A position in space with no dimensions. Represented by a dot (·). No length, breadth, or thickness.

Line — Straight path extending indefinitely in both directions. No endpoints. Infinite length, zero width.

Line segment — Part of a line with two endpoints. Has a measurable length.

Ray — Part of a line with one endpoint, extending infinitely in one direction.

Plane — Flat surface extending indefinitely in all directions. No thickness.

Four line relationships:
1. Parallel — Never meet. Symbol: ||. e.g., railway tracks, opposite sides of rectangle.
2. Intersecting — Meet at exactly one point (point of intersection). e.g., crossroads.
3. Perpendicular — Intersect at 90°. Symbol: ⊥. e.g., adjacent sides of square.
4. Concurrent — Three or more lines passing through the same single point (point of concurrence).

Two planes: either parallel (never meet) or intersecting along a line.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define point, line, line segment, ray, and plane
• Distinguish between parallel, intersecting, perpendicular, and concurrent lines
• Give examples of each type of line relationship
• Explain what a plane is and give examples
• State: through one point infinite lines can pass; through two points exactly one line can pass
• State: two lines in a plane either intersect at a point or are parallel
• Construct a line segment of given length using ruler and compass
• Construct a line segment equal to the sum of two given segments` },
    { id: 4, title: 'Read the text', minReadSeconds: 300, content: `TYPES OF LINES

Parallel Lines — Two or more lines in the same plane that never meet however far extended.
Written: line r || line s.
Examples: opposite walls of a room, ruled lines on a notebook, railway tracks.

Intersecting Lines — Two lines that meet at exactly one common point (point of intersection).
Examples: diagonals of a rectangle, crossroads.

Perpendicular Lines — Two lines that intersect at a right angle (90°).
Written: line p ⊥ line q.
Examples: diagonals of a square, adjacent sides of a square/rectangle.

Concurrent Lines — Three or more lines passing through the same single point.
That point = point of concurrence.

─────

PLANE

A plane is a flat surface that extends indefinitely in all directions. No thickness.
Examples: floor of a room, top of a table, blackboard surface.

Properties:
• Through a given point: infinite lines can be drawn.
• Through two distinct points: exactly ONE line can be drawn.
• Two lines in a plane: either intersect at one point OR are parallel.
• Two planes: either parallel (never meet) or intersecting along a line.

─────

CONSTRUCTIONS

Construction = making accurate geometric drawings using ruler and compass.

To draw a line segment of length 5.2 cm:
Draw line p, mark point A, use ruler to measure 5.2 cm, mark point B. AB = 5.2 cm.

To copy a line segment XY:
Mark point L on line p. Set compass to width XY. Place compass tip at L, mark M. LM = XY.

To construct segment = sum of two segments (a + b):
Draw LM = a. From M extend MN = b in same direction. LN = a + b.` },
    { id: 5, title: 'Word watch', content: `Point — A location in space with no dimensions. Represented by a dot.

Line — Straight path with no endpoints extending infinitely in both directions.

Line segment — Part of a line between two endpoints. Has a finite, measurable length.

Ray — Part of a line with one endpoint, extending infinitely in one direction.

Plane — A flat surface extending indefinitely. No thickness.

Parallel lines — Lines in the same plane that never meet. Symbol: ||.

Intersecting lines — Lines that meet at exactly one point (point of intersection).

Perpendicular lines — Lines that intersect at exactly 90°. Symbol: ⊥.

Concurrent lines — Three or more lines passing through the same single point (point of concurrence).

Compass — A geometric instrument used to draw circles/arcs and to copy segment lengths.

Construction — Accurately drawing geometric figures using only a ruler and pair of compasses.` },
    { id: 6, title: 'Values learnt', content: `Geometry is the language of the built world — Parallel lines, perpendicular angles, and flat planes are everywhere in architecture and engineering. Railway tracks are parallel. Room corners are perpendicular. Floor surfaces are planes. Understanding geometry is understanding the structure of the physical world.

Precision requires the right tools — Geometric construction with ruler and compass enforces precision. Approximating by eye is not enough in engineering or design. The discipline of using the right tools correctly and carefully applies to every field of skilled work.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Parallel lines: never meet, same plane. Symbol ||. e.g., railway tracks, opposite sides of rectangle.

2. Intersecting lines: meet at one point = point of intersection. e.g., crossroads.

3. Perpendicular lines: intersect at 90°. Symbol ⊥. e.g., adjacent sides of square.

4. Concurrent lines: 3+ lines through same point = point of concurrence.

5. Plane: flat surface extending indefinitely. No thickness.

6. Through one point: infinite lines possible. Through two distinct points: exactly one line.

7. Two lines in a plane: intersect at one point OR parallel (no third possibility).

8. Two planes: parallel OR intersecting along a line.

9. Construction: ruler measures, compass copies lengths.` },
  ],
}

const ch9: Chapter = {
  id: 9, title: 'Angles', type: 'Geometry', estimatedReadMins: 12,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `An angle is formed when two rays start from the same initial point. We encounter angles everywhere — the hands of a clock, the opening of a door, the corner of a book, the pitch of a roof, the spokes of a wheel. The standard unit for measuring angles is the degree (°), where 1 complete rotation = 360°.

This chapter classifies angles by size (zero, acute, right, obtuse, straight, reflex, complete), introduces the angle bisector, and explores important pairs of angles: adjacent, linear pair (sum=180°), vertically opposite (equal), complementary (sum=90°), supplementary (sum=180°), and congruent angles (equal measure).` },
    { id: 2, title: 'About this chapter', content: `An angle is formed by two rays (arms) originating from the same point (vertex).
Unit: degree (°). 1 complete rotation = 360°. 1° = 1/360 of complete rotation.

Types:
• Zero angle: 0°
• Acute angle: 0° < θ < 90°
• Right angle: exactly 90°
• Obtuse angle: 90° < θ < 180°
• Straight angle: exactly 180°
• Reflex angle: 180° < θ < 360°
• Complete angle: 360°

Bisector of an angle: the ray that divides an angle into two equal parts.
Instrument: Protractor measures and draws angles.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define an angle and name it using three points or the vertex
• Classify angles: zero, acute, right, obtuse, straight, reflex, complete
• Measure angles using a protractor; draw angles of given measures
• Define bisector of an angle
• Define and identify: adjacent angles, linear pair, vertically opposite angles
• Define complementary angles (sum = 90°) and supplementary angles (sum = 180°)
• Apply: linear pair sum = 180°; vertically opposite angles are equal
• Find unknown angles in geometric figures using these properties` },
    { id: 4, title: 'Read the text', minReadSeconds: 360, content: `TYPES OF ANGLES

| Type | Measure |
|------|---------|
| Zero | 0° |
| Acute | 0° < θ < 90° |
| Right | = 90° |
| Obtuse | 90° < θ < 180° |
| Straight | = 180° |
| Reflex | 180° < θ < 360° |
| Complete | = 360° |

Bisector: a ray dividing an angle into two equal halves.
∠ABD = ∠DBC = ½ ∠ABC.

─────

PAIRS OF ANGLES

1. Adjacent Angles: same vertex, one common arm, other arms on opposite sides.
∠POQ and ∠QOR are adjacent (common vertex O, common arm OQ).

2. Linear Pair: two adjacent angles whose non-common arms form opposite rays.
∠XOY + ∠YOZ = 180°.
Linear pair angles are always supplementary and adjacent.

3. Vertically Opposite Angles: when two lines intersect, the angles on opposite sides are equal.
∠POQ = ∠SOR and ∠POS = ∠QOR.
Two intersecting lines form TWO pairs of vertically opposite angles.
Vertically opposite angles are ALWAYS equal.

4. Complementary Angles: two angles whose sum = 90°.
Complement of A = 90° − A.
e.g., 40° and 50° are complementary.

5. Supplementary Angles: two angles whose sum = 180°.
Supplement of A = 180° − A.
e.g., 120° and 60° are supplementary.

NOTE: Complementary/supplementary angles need NOT be adjacent.
Angles of a linear pair are always supplementary (but not all supplementary angles form a linear pair).

6. Congruent Angles: equal in measure. ∠MON ≅ ∠XYZ if both = 100°.

─────

SOLVED EXAMPLE

One angle = (x + 10°), adjacent angle = 75°, they form a linear pair.
(x + 10°) + 75° = 180°.
x = 180° − 85° = 95°.

─────

SUMMARY

• Complementary: sum = 90°. Supplementary: sum = 180°.
• Adjacent: same vertex, common arm.
• Linear pair: adjacent + non-common arms are opposite rays → always supplementary.
• Vertically opposite angles are always equal.
• Sum of angles on a straight line = 180°.` },
    { id: 5, title: 'Word watch', content: `Angle — Figure formed by two rays (arms) from the same point (vertex). Measured in degrees (°).

Vertex — The common endpoint of the two arms of an angle.

Arms (sides) — The two rays forming an angle.

Degree (°) — Unit of angle. 1 complete rotation = 360°.

Acute angle — Between 0° and 90°.

Right angle — Exactly 90°.

Obtuse angle — Between 90° and 180°.

Straight angle — Exactly 180°. Appears as a straight line.

Reflex angle — Between 180° and 360°.

Complete angle — Exactly 360°. A full rotation.

Bisector — Ray dividing an angle into two equal parts.

Adjacent angles — Same vertex, common arm, other arms on opposite sides.

Linear pair — Two adjacent supplementary angles (non-common arms form opposite rays).

Vertically opposite angles — Equal angles formed on opposite sides when two lines intersect.

Complementary angles — Sum = 90°. Each is the complement of the other.

Supplementary angles — Sum = 180°. Each is the supplement of the other.

Congruent angles — Equal in measure.

Protractor — Instrument to measure/draw angles (semicircular, marked 0°–180°).` },
    { id: 6, title: 'Values learnt', content: `Angles define direction and structure — Every building, road junction, bridge, and piece of furniture involves precisely calculated angles. The corner of every room is 90°; a sloped roof has a carefully chosen angle; a road turn has a specific turning radius. Angle measurement is the mathematics of structure and direction.

Opposite views can be equal — Vertically opposite angles are always equal, even though they point in opposite directions. This beautiful geometric truth — that opposing orientations can be equivalent — is also a metaphor for human perspective: sometimes the view from the opposite side is just as valid as our own.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Types: Zero(0°), Acute(0°–90°), Right(90°), Obtuse(90°–180°), Straight(180°), Reflex(180°–360°), Complete(360°).

2. Bisector: divides angle into two equal halves.

3. Adjacent: same vertex, common arm.

4. Linear pair: adjacent angles, non-common arms opposite → sum = 180°. Always supplementary.

5. Vertically opposite: formed when two lines intersect; always EQUAL.

6. Complementary: sum = 90°. Complement of A = 90° − A.

7. Supplementary: sum = 180°. Supplement of A = 180° − A.

8. Complementary/supplementary angles need NOT be adjacent (but linear pair angles always are).

9. Two intersecting lines form 2 pairs of vertically opposite angles.

10. Protractor: instrument for measuring/drawing angles.` },
  ],
}

const ch10: Chapter = {
  id: 10, title: 'Circles', type: 'Geometry', estimatedReadMins: 10,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `A circle is one of the most beautiful and perfect shapes in mathematics. It appears everywhere — the sun, wheels, coins, watch faces, the pupil of the eye, ripples in water. It is defined by a single elegant property: all points on its boundary are equidistant from a fixed centre point.

This chapter introduces all elements of a circle: centre, radius, diameter, chord, arc, sector, segment, secant, tangent, and circumference. You will learn the relationship diameter = 2 × radius, and the circumference formula C = 2πr (π ≈ 22/7 ≈ 3.14). These concepts underpin all circle geometry in higher classes.` },
    { id: 2, title: 'About this chapter', content: `Circle — A closed curve where all boundary points are equidistant from the fixed centre O.

Key elements:
• Centre (O) — fixed point; all boundary points are equidistant from it.
• Radius (r) — distance from O to any boundary point. All radii are equal.
• Diameter (d) — chord through O; d = 2r. Longest chord.
• Circumference — boundary length = 2πr = πd (π ≈ 22/7 ≈ 3.14).
• Chord — line segment with both endpoints on circle (may or may not pass through O).
• Arc — any part of the circumference. Minor arc (smaller); Major arc (larger).
• Sector — region between two radii and the arc. Minor sector (<180°); Major sector (>180°). Quadrant = sector with 90°.
• Segment — region between a chord and the arc. Major segment contains O.
• Secant — line intersecting circle at two points.
• Tangent — line touching circle at exactly one point (point of tangency).
• Semicircle — half a circle; arc = 180°.

Interior — points inside circle (OQ < r). Exterior — points outside (OP > r).` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Define a circle and state its key property
• Define and identify: centre, radius, diameter, circumference, chord, arc, sector, segment, secant, tangent
• State: diameter = 2 × radius; radius = diameter ÷ 2
• Distinguish: minor arc vs major arc; minor sector vs major sector; secant vs tangent
• Know π ≈ 22/7 ≈ 3.14
• Calculate circumference: C = 2πr = πd
• Draw circles of given radius using a compass
• Solve problems involving circumference (find C given r; find r given C)` },
    { id: 4, title: 'Read the text', minReadSeconds: 300, content: `THE CIRCLE

A circle is a closed curve where all boundary points are equidistant from the centre O.

Centre (O): fixed interior point.
Radius (r): distance from O to boundary. All radii equal.
Diameter (d): chord through O. d = 2r. Longest chord. r = d/2.

Interior: points where distance from O < r.
Exterior: points where distance from O > r.

─────

ELEMENTS OF A CIRCLE

Chord: line segment with both endpoints on circle. Diameter is a chord (the longest one).

Secant: a line intersecting the circle at two points. (A chord extended to a full line = secant.)

Tangent: a line touching the circle at exactly one point (point of tangency, M). Line PQ is a tangent at M.

─────

ARCS

Arc: any curved part of the circumference.
Minor Arc: the smaller arc (< semicircle).
Major Arc: the larger arc (> semicircle).
Semicircle: exactly half the circumference (180° arc).

─────

SECTORS AND SEGMENTS

Sector: region enclosed by two radii and the arc between them.
Minor Sector: angle between radii < 180°.
Major Sector: angle between radii > 180°.
Quadrant: sector with angle = 90° between radii.

Segment: every chord divides circle into two segments.
Major Segment: the larger region (contains centre).
Minor Segment: the smaller region.

─────

CIRCUMFERENCE

Circumference = perimeter (boundary length) of a circle.
C = 2πr = πd (where π ≈ 22/7 ≈ 3.14)

Examples:
• Diameter 10 cm: C = 3.14 × 10 = 31.4 cm.
• Radius 10 cm: C = 2 × 3.14 × 10 = 62.8 cm.
• Diameter 28 cm: C = 2 × 22/7 × 14 = 88 cm.
• Circumference 44 cm: r = 44/(2 × 22/7) = 44 × 7/44 = 7 cm.

─────

IMPORTANT FACTS

1. All radii of a circle are equal. All diameters are equal.
2. Diameter is the LONGEST chord.
3. A chord through the centre is a diameter.
4. Any number of radii, diameters, chords, secants, tangents can be drawn.

─────

SUMMARY

• C = 2πr (π = 22/7 or 3.14).
• Secant: intersects circle at 2 points. Tangent: touches at 1 point.
• Sector: enclosed by 2 radii. Segment: enclosed by chord + arc.
• Diameter = 2 × radius. Longest chord.` },
    { id: 5, title: 'Word watch', content: `Circle — Closed curve where all boundary points are equidistant from centre O.

Centre (O) — Fixed interior point equidistant from all boundary points.

Radius (r) — Distance from O to any point on circumference. All radii equal.

Diameter (d) — Line segment through O with endpoints on the circle. d = 2r. Longest chord.

Circumference — Perimeter of a circle. C = 2πr = πd.

π (pi) — Ratio of circumference to diameter. ≈ 22/7 ≈ 3.14. Irrational number.

Chord — Line segment with both endpoints on the circle.

Arc — Any part of the circumference. Minor (smaller), major (larger).

Sector — "Pie slice" region between two radii and their arc.

Segment — Region between a chord and the arc it cuts.

Secant — Line intersecting a circle at two points.

Tangent — Line touching a circle at exactly one point.

Semicircle — Half a circle. An arc of exactly 180°.

Quadrant — Sector with 90° between the two radii.

Interior — Points inside the circle (distance from O < r).

Exterior — Points outside the circle (distance from O > r).` },
    { id: 6, title: 'Values learnt', content: `Nature chooses the circle — The circle encloses maximum area for a given perimeter. This is why soap bubbles are spherical, why tree trunks are circular, why ripples spread as circles. Nature optimises, and the circle is nature's optimal 2D shape.

π is everywhere — π appears in the circumference of circles, the area of circles, in probability (the normal distribution), in physics (waves and oscillations), and in many unexpected places. Its decimal expansion is infinite and non-repeating. π connects geometry to the deepest patterns in mathematics and physics — a number of extraordinary importance.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Circle: all boundary points equidistant from centre O.

2. Radius (r): centre to boundary. Diameter (d) = 2r. All radii equal; all diameters equal.

3. Circumference C = 2πr = πd. π ≈ 22/7 ≈ 3.14.

4. Chord: both endpoints on circle. Diameter = longest chord.

5. Secant: line cutting circle at 2 points. Tangent: line touching at 1 point.

6. Arc: part of circumference. Minor (smaller), major (larger).

7. Sector: 2 radii + arc. Minor sector (<180°), major sector (>180°). Quadrant = 90° sector.

8. Segment: chord + arc. Major segment contains centre.

9. Example: r=7cm → C = 2×(22/7)×7 = 44 cm.
   Example: C=132m → r = 132/(2×22/7) = 132×7/44 = 21 m.` },
  ],
}

const ch11: Chapter = {
  id: 11, title: 'Vedic Knowledge', type: 'Vedic Maths', estimatedReadMins: 10,
  sections: [
    { id: 1, title: 'What is this chapter about?', content: `Vedic Mathematics is a unique system of mental calculation based on simple rules called Sutras (Sanskrit for "formulas"). These Sutras allow you to solve many mathematical problems entirely in your head — much faster than conventional methods.

The system was revived and systematised by Swami Shri Bharti Krishna Tirthaji (1884–1960) from the study of ancient Vedic texts. "Vedic" refers to knowledge from the Vedas — India's most ancient scriptures.

You will learn three powerful Vedic techniques: (1) multiplying any 2-digit number by 22 mentally, (2) finding squares of numbers ending in 5 (sutra: Ekadhikena Purvena = "One more than the previous"), and (3) multiplying two numbers whose units digits add to 10 and tens digits are the same (same sutra). These methods reveal beautiful patterns in numbers and significantly increase calculation speed.` },
    { id: 2, title: 'About this chapter', content: `Vedic Mathematics: an ancient Hindu system of mental calculation based on Sutras (Sanskrit rules/principles).

Founded (revived): Swami Shri Bharti Krishna Tirthaji (1884–1960) who studied ancient Vedic texts.

Key features:
• Based on patterns and elegant shortcuts (Sutras)
• Enables rapid mental calculation
• Reveals beautiful number relationships
• Increases mathematical confidence and speed

Three techniques in this chapter:

1. Multiply 2-digit number by 22:
   Left part = 2 × left digit; Right part = 2 × right digit; Middle = 2 × sum of digits.

2. Squares of numbers ending in 5 (Sutra: EKADHIKENA PURVENA):
   Right = 25 (always = 5²); Left = tens digit × (tens digit + 1).

3. Multiply two numbers with same tens digit, units digits adding to 10 (same Sutra):
   Right = product of units digits; Left = tens digit × (tens digit + 1).

4. Divide 3-digit numbers by 9 (Sutra: NIKHILAM):
   First digit = first digit of quotient; running sums = subsequent digits; sum of all digits = remainder.` },
    { id: 3, title: 'Learning outcomes', content: `By the end of this chapter, you will be able to:

• Explain what Vedic Mathematics is and who revived it (Swami Bharti Krishna Tirthaji, 1884–1960)
• Use the Vedic method to multiply any 2-digit number by 22 mentally
• State the sutra "Ekadhikena Purvena" and its meaning ("One more than the previous")
• Find squares of numbers ending in 5 using Ekadhikena Purvena: right=25, left=n×(n+1)
• Multiply two numbers with same tens digit and units summing to 10 using the same Sutra
• State the sutra "Nikhilam" and use it to divide 3-digit numbers by 9
• Appreciate India's ancient mathematical heritage` },
    { id: 4, title: 'Read the text', minReadSeconds: 300, content: `VEDIC MATHEMATICS

Vedic Mathematics is a unique system based on simple rules ("Sutras") enabling easy, efficient problem-solving. Based on the pioneering work of Swami Shri Bharti Krishna Tirthaji (1884–1960) from ancient Vedic texts.

─────

TECHNIQUE 1: MULTIPLYING ANY 2-DIGIT NUMBER BY 22

Example: 21 × 22.

Step 1: Split 21 into digits: 2 and 1.
Step 2: Left part of answer = 2 × left digit = 2 × 2 = 4.
Step 3: Right part of answer = 2 × right digit = 2 × 1 = 2.
Step 4: Middle part = 2 × (sum of digits) = 2 × (2+1) = 2 × 3 = 6.
Answer = 4 | 6 | 2 = 462. ✓ Check: 21 × 22 = 462 ✓.

Another example: 34 × 22.
Left = 2×3=6; Right = 2×4=8; Middle = 2×(3+4)=14.
6 | 14 | 8 → carry: 6+1=7, 4, 8 = 748. ✓

─────

TECHNIQUE 2: SQUARES OF NUMBERS ENDING IN 5
(Sutra: EKADHIKENA PURVENA = "One more than the previous")

For any number ending in 5, e.g., 75²:
Step 1: Right part = 5 × 5 = 25 (always 25).
Step 2: Left part = tens digit × (tens digit + 1) = 7 × 8 = 56.
Answer: 75² = 5625. ✓

All squares of numbers ending in 5:
• 15² = 1×2 | 25 = 2|25 = 225
• 25² = 2×3 | 25 = 6|25 = 625
• 35² = 3×4 | 25 = 12|25 = 1225
• 45² = 4×5 | 25 = 20|25 = 2025
• 55² = 5×6 | 25 = 30|25 = 3025
• 65² = 6×7 | 25 = 42|25 = 4225
• 75² = 7×8 | 25 = 56|25 = 5625
• 85² = 8×9 | 25 = 72|25 = 7225
• 95² = 9×10 | 25 = 90|25 = 9025

─────

TECHNIQUE 3: MULTIPLY NUMBERS WITH SAME TENS DIGIT, UNITS ADDING TO 10
(Same Sutra: EKADHIKENA PURVENA)

Conditions: same tens digit AND units digits add to 10.
Examples: 23 and 27 (tens=2, units 3+7=10); 43 and 47; 36 and 34.

Example: 23 × 27.
Step 1: Right part = units digits multiplied = 3 × 7 = 21.
Step 2: Left part = tens digit × (tens digit + 1) = 2 × 3 = 6.
Answer = 6|21 = 621. ✓ Check: 23×27 = 621 ✓.

Example: 43 × 47.
Right = 3×7=21. Left = 4×5=20. Answer = 20|21 = 2021. ✓

─────

TECHNIQUE 4: DIVIDE BY 9 MENTALLY (Sutra: NIKHILAM)

Example: 143 ÷ 9.
Step 1: First digit of dividend (1) = first digit of quotient. Q starts with 1.
Step 2: Sum of first two digits 1+4=5 = second digit of quotient. Q = 15.
Step 3: Sum of ALL digits 1+4+3=8 = Remainder. R = 8.
Answer: Quotient = 15, Remainder = 8. ✓ Check: 15×9 + 8 = 135+8 = 143 ✓.

─────

SUMMARY

• Vedic Maths = ancient Hindu system based on Sutras (Sanskrit formulas).
• Founder: Swami Shri Bharti Krishna Tirthaji (1884–1960).
• Multiply by 22: left=2×left digit; right=2×right digit; middle=2×(sum of digits).
• Squares ending in 5 (Ekadhikena Purvena): right=25, left=n×(n+1).
• Multiply same tens digit, units add to 10: right=product of units, left=tens×(tens+1).
• Divide by 9 (Nikhilam): running sums give quotient; sum of all digits = remainder.` },
    { id: 5, title: 'Word watch', content: `Vedic Mathematics — An ancient Indian system of mathematical calculation based on Sutras, revived by Swami Shri Bharti Krishna Tirthaji (1884–1960) from Vedic texts.

Sutra — Sanskrit word meaning "thread" or "formula." A brief mathematical rule or principle.

Ekadhikena Purvena — Sanskrit: "One more than the previous." Vedic sutra for squaring numbers ending in 5 and for multiplying numbers with same tens digit and units adding to 10.

Nikhilam — A Vedic sutra for division by 9. Works by using running digit sums.

Mental arithmetic — Performing calculations entirely in the mind, without written working.

Vedas — India's most ancient scriptures (Rigveda, Samaveda, Yajurveda, Atharvaveda). The Vedic mathematical knowledge was encoded in these texts.

Swami Bharti Krishna Tirthaji (1884–1937) — The scholar-monk who rediscovered and systematised Vedic Mathematics.

Multiplicand — The number being multiplied. In 21 × 22, the multiplicand is 21.

Square — A number multiplied by itself. e.g., 75² = 75 × 75 = 5625.

Tens digit — The digit in the tens place. In 75, the tens digit is 7.` },
    { id: 6, title: 'Values learnt', content: `India's extraordinary mathematical heritage — Vedic Mathematics adds to India's already remarkable mathematical legacy: zero, the decimal system, the binary number system, trigonometry, algebra, the concept of infinity. Knowing that these methods were developed in ancient India is a source of pride and inspiration. India was a mathematical powerhouse long before modern science developed in Europe.

Beauty lies in patterns — The squares of numbers ending in 5 follow a perfect pattern: 15²=225, 25²=625, 35²=1225... The right part is always 25, the left part always n×(n+1). Discovering and appreciating these patterns is what makes mathematics genuinely beautiful. The more you look, the more patterns you find.

True speed comes from understanding — Vedic techniques are fast not because of rote memory but because they are based on deep understanding of how numbers work. This is the real lesson: true mastery of any subject comes from understanding principles, not memorising facts.` },
    { id: 7, title: 'Quick recap', content: `Before the quiz:

1. Vedic Mathematics: ancient Hindu system based on Sutras. Revived by Swami Bharti Krishna Tirthaji (1884–1960).

2. Multiply by 22: left = 2 × (left digit); right = 2 × (right digit); middle = 2 × (sum of digits).
   e.g., 21×22: L=4, M=6, R=2 → 462.

3. Square numbers ending in 5 (Ekadhikena Purvena):
   Right = 25 (always). Left = tens digit × (tens digit + 1).
   e.g., 75²: L=7×8=56, R=25 → 5625.

4. Multiply (same tens digit, units add to 10):
   Right = product of units. Left = tens × (tens + 1).
   e.g., 23×27: R=3×7=21, L=2×3=6 → 621.

5. Divide by 9 (Nikhilam): Q formed by running digit sums; R = sum of all digits.
   e.g., 143÷9: Q=15, R=8.

6. Pattern: 15²=225, 25²=625, 35²=1225, 45²=2025, 55²=3025, 65²=4225, 75²=5625, 85²=7225, 95²=9025.` },
  ],
}

export const CHAPTERS: Chapter[] = [ch1, ch2, ch3, ch4, ch5, ch6, ch7, ch8, ch9, ch10, ch11]
export function getChapter(id: number): Chapter | undefined { return CHAPTERS.find(c => c.id === id) }
export function getSection(chapterId: number, sectionId: number) { return getChapter(chapterId)?.sections.find(s => s.id === sectionId) }
