/* Run: node tests/optics.test.js — refraction, prism, acuity and low-vision maths.
   The reference values are the worked examples and tables printed in the AAO
   Basic and Clinical Science Course, Section 3: Clinical Optics (2019–2020),
   plus the WHO ICD-11 vision impairment cut-offs. */
global.window = {};
require("../js/optics.js");
const O = window.Optics.calc;
let pass = 0, fail = 0;
const eq = (name, got, want, tol = 1e-9) => {
  const ok = typeof want === "number" ? Math.abs(got - want) <= tol : JSON.stringify(got) === JSON.stringify(want);
  ok ? pass++ : fail++;
  if (!ok) console.log(`FAIL ${name}: got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
};
const rx = (s, c, a) => ({ sph: s, cyl: c, axis: a });

/* --- transposition: the book's exercises 1-23 to 1-26 (pdf p. 95) --- */
const T = [
  [rx(1.00, 2.00, 80), rx(3.00, -2.00, 170)],
  [rx(1.00, -2.00, 80), rx(-1.00, 2.00, 170)],
  [rx(-2.00, -3.00, 10), rx(-5.00, 3.00, 100)],
  [rx(-2.00, 1.00, 10), rx(-1.00, -1.00, 100)],
  [rx(-1.00, -0.75, 180), rx(-1.75, 0.75, 90)]
];
for (const [a, b] of T) {
  const t = O.transpose(a);
  eq(`transpose ${O.fmtRx(a)}`, [t.sph, t.cyl, t.axis], [b.sph, b.cyl, b.axis]);
  eq(`transpose is its own inverse ${O.fmtRx(a)}`, O.fmtRx(O.transpose(t)), O.fmtRx(a));
  eq(`both forms have the same spherical equivalent ${O.fmtRx(a)}`, O.se(t), O.se(a), 1e-12);
}
eq("axis 180 stays 180, not 0", O.norm(180), 180);
eq("axis 90 + 90 wraps to 180", O.transpose(rx(0, 1, 90)).axis, 180);
eq("axis 170 + 90 wraps to 80", O.transpose(rx(0, 1, 170)).axis, 80);
eq("minus cylinder form of a plus cylinder Rx", O.fmtRx(O.toMinusCyl(rx(1, 2, 80))), "+3.00 −2.00 × 170");
eq("a minus cylinder Rx is left alone", O.fmtRx(O.toMinusCyl(rx(3, -2, 170))), "+3.00 −2.00 × 170");
eq("plus cylinder form of a minus cylinder Rx", O.fmtRx(O.toPlusCyl(rx(3, -2, 170))), "+1.00 +2.00 × 080");
eq("a sphere prints as DS", O.fmtRx(rx(-2.5, 0, 180)), "−2.50 DS");

/* --- meridians: book example, −3.00 +2.00 × 015 is −1.00 at 105° and −3.00 at 15° (pdf p. 94) --- */
const m = O.meridians(rx(-3.00, 2.00, 15));
eq("power along the axis meridian", m[0].power, -3.00);
eq("axis meridian is 15°", m[0].deg, 15);
eq("power 90° from the axis", m[1].power, -1.00);
eq("second meridian is 105°", m[1].deg, 105);
eq("powerAt the axis matches the sphere", O.powerAt(rx(-3, 2, 15), 15), -3.00, 1e-12);
eq("powerAt 90° from the axis matches sphere + cylinder", O.powerAt(rx(-3, 2, 15), 105), -1.00, 1e-12);
eq("powerAt 45° between meridians", O.powerAt(rx(0, 2, 0), 45), 1.00, 1e-12);

/* --- spherical equivalent: book example +2.00 +3.00 × 010 has SE +3.50 (pdf p. 93) --- */
eq("book spherical equivalent", O.se(rx(2.00, 3.00, 10)), 3.50);
eq("spherical equivalent of a sphere is the sphere", O.se(rx(-4.25, 0, 180)), -4.25);
eq("quarter-dioptre rounding", O.quarter(-4.31), -4.25);
eq("quarter-dioptre rounding up", O.quarter(1.63), 1.75);

/* --- lens effectivity: book example, +4.00 D at 13.75 mm needs +4.232 D at the cornea (pdf p. 77) --- */
eq("book vertex example", O.effective(4.00, 0.01375), 4.232, 0.001);
eq("effectivity of a minus lens at the cornea is weaker", O.effective(-10, 0.012) > -10, true);
eq("high myope: −10.00 D at 12 mm", O.effective(-10, 0.012), -8.929, 0.001);
eq("high hyperope: +10.00 D at 12 mm", O.effective(10, 0.012), 11.364, 0.001);
eq("no vertex distance, no change", O.effective(-7.25, 0), -7.25);
eq("under 3 D the change is under a quarter dioptre", Math.abs(O.effective(3, 0.012) - 3) < 0.25, true);
const cl = O.atCornea(rx(-8.00, -2.00, 180), 12);
eq("corneal plane sphere", O.quarter(cl.sph), -7.25);
eq("corneal plane cylinder is weaker than the spectacle cylinder", Math.abs(cl.cyl) < 2.00, true);
eq("corneal plane keeps the axis", cl.axis, 180);
const back = O.atSpectacle({ sph: cl.sph, cyl: cl.cyl, axis: cl.axis }, 12);
eq("spectacle plane round-trips", back.sph, -8.00, 1e-9);
eq("spectacle plane cylinder round-trips", back.cyl, -2.00, 1e-9);

/* --- the reading add: the book's worked example (pdf p. 197) ---
   2.00 D of amplitude, half in reserve, reading at 40 cm → a 1.50 D add. */
const add = O.nearAdd({ workingCm: 40, amplitude: 2.00 });
eq("book: accommodation needed at 40 cm", add.required, 2.50);
eq("book: half the amplitude is usable", add.usable, 1.00);
eq("book: the add is 1.50 D", add.addRounded, 1.50);
eq("the add is measured, not estimated", add.estimated, false);
eq("enough accommodation means no add", O.nearAdd({ workingCm: 40, amplitude: 8 }).addRounded, 0);
eq("no range without an add", O.nearAdd({ workingCm: 40, amplitude: 8 }).range, null);
eq("far point through a +1.50 add with 2 D of amplitude", add.range.farCm, 100 / 1.5, 1e-9);
eq("near point through a +1.50 add with 2 D of amplitude", add.range.nearCm, 100 / 3.5, 1e-9);
eq("a closer working distance needs a stronger add", O.nearAdd({ workingCm: 25, amplitude: 2 }).add > add.add, true);
/* the book's near-point examples (pdf p. 196): 3 D of amplitude puts an
   emmetrope's near point at 33 cm */
eq("near point 33 cm is 3 D of amplitude", O.amplitudeFromNearPoint(33.3), 3.00, 0.01);
eq("near point 20 cm is 5 D of amplitude", O.amplitudeFromNearPoint(20), 5.00);
eq("age is used when the amplitude was not measured", O.nearAdd({ workingCm: 40, age: 60 }).estimated, true);
eq("Hofstetter minimum at 40 years", O.hofstetter(40).min, 5.00, 1e-9);
eq("Hofstetter average at 40 years", O.hofstetter(40).average, 6.50, 1e-9);
eq("Hofstetter never goes below zero", O.hofstetter(90).min, 0);

/* --- Prentice rule: Δ = hD (pdf p. 201) --- */
eq("1 cm of decentration in a 1 D lens is 1 Δ", O.prentice(1, 1), 1);
eq("book rule: 0.5 cm in a 4 D lens", O.prentice(0.5, 4), 2);
eq("a minus lens gives prism the other way", O.prentice(1, -3), -3);
const vi = O.verticalImbalance(-1.00, -4.00, 10);
eq("anisometropia: 3 D difference at 10 mm gives 3 Δ", vi.diff, 3.00, 1e-9);
eq("3 Δ of vertical imbalance is significant", vi.significant, true);
eq("equal lenses give no imbalance", O.verticalImbalance(-3, -3, 10).diff, 0);
eq("half a dioptre of anisometropia is not significant", O.verticalImbalance(-3, -3.5, 10).significant, false);
eq("decentration for 2 Δ in a 4 D lens is 5 mm", O.decentration(2, 4), 5);
eq("decentration in a plano lens is undefined", O.decentration(2, 0), null);
eq("100 Δ is 45°", O.prismToDeg(100), 45, 1e-9);
eq("prism and degrees round-trip", O.degToPrism(O.prismToDeg(12)), 12, 1e-9);

/* --- visual acuity: the book's conversion table 3-2 (pdf p. 149) --- */
const VA = [
  ["20/10", "6/3", 2.00, -0.30], ["20/15", "6/4.5", 1.33, -0.12], ["20/20", "6/6", 1.00, 0.00],
  ["20/25", "6/7.5", 0.80, 0.10], ["20/30", "6/9", 0.67, 0.18], ["20/40", "6/12", 0.50, 0.30],
  ["20/50", "6/15", 0.40, 0.40], ["20/60", "6/18", 0.33, 0.48], ["20/80", "6/24", 0.25, 0.60],
  ["20/100", "6/30", 0.20, 0.70], ["20/120", "6/36", 0.17, 0.78], ["20/150", "6/45", 0.13, 0.88],
  ["20/200", "6/60", 0.10, 1.00]
];
for (const [feet, metres, dec, lm] of VA) {
  const a = O.parseVA(feet), b = O.parseVA(metres);
  eq(`table ${feet} logMAR`, a.logMAR, lm, 0.005);
  eq(`table ${feet} decimal`, a.decimal, dec, 0.005);
  eq(`table ${feet} in metres`, a.snellen6, metres);
  eq(`table ${metres} matches ${feet}`, b.logMAR, a.logMAR, 1e-9);
  eq(`table ${metres} back to feet`, b.snellen20, feet);
  eq(`decimal ${dec} parses back`, O.parseVA(String(dec)).logMAR, lm, 0.02);
}
eq("the book's question 14: doubling the MAR is 0.3 logMAR", O.parseVA("6/24").logMAR - O.parseVA("6/12").logMAR, 0.30, 0.005);
eq("logMAR written out", O.parseVA("logMAR 0.5").mar, Math.pow(10, 0.5), 1e-9);
eq("logMAR 0 is 6/6", O.parseVA("logMAR 0").snellen6, "6/6");
eq("4 m chart notation", O.parseVA("6/6").snellen4, "4/4");
eq("3/60 walked forward", O.parseVA("3/60").logMAR, Math.log10(20), 1e-9);
eq("counting fingers", O.parseVA("CF").low, "Counting fingers");
eq("hand movements spelled out", O.parseVA("hand movements").low, "Hand movements");
eq("light perception", O.parseVA("LP").low, "Light perception");
eq("no light perception", O.parseVA("NLP").low, "No light perception");
eq("no light perception is not read as light perception", O.parseVA("no light perception").key, "nlp");
/* an acuity measured by walking the patient forward keeps its own notation */
eq("3/60 is remembered as 3/60", O.parseVA("3/60").entered, "3/60");
eq("3/60 still converts to 6/120", O.parseVA("3/60").snellen6, "6/120");
eq("1/60 is remembered as 1/60", O.parseVA("1/60").entered, "1/60");
eq("6/18 records as itself", O.parseVA("6/18").entered, "6/18");
eq("a decimal has no recorded fraction", O.parseVA("0.1").entered, undefined);
eq("nonsense is rejected", O.parseVA("banana"), null);
eq("empty is rejected", O.parseVA(""), null);
eq("a zero denominator is rejected", O.parseVA("6/0"), null);

/* --- WHO ICD-11 categories, on presenting acuity.
   Each boundary acuity belongs to the BETTER category: 6/12 is not impaired,
   6/18 is mild, 6/60 is moderate, 3/60 is severe. --- */
const CAT = [
  ["6/6", "ok"], ["6/9", "ok"], ["6/12", "ok"],
  ["6/15", "mild"], ["6/18", "mild"],
  ["6/24", "moderate"], ["6/36", "moderate"], ["6/60", "moderate"],
  ["6/90", "severe"], ["3/60", "severe"],
  ["2/60", "blind"], ["1/60", "blind"], ["CF", "blind"], ["HM", "blind"], ["NLP", "blind"]
];
for (const [va, level] of CAT) eq(`WHO category of ${va}`, O.whoCategory(O.parseVA(va)).level, level);
eq("category from a bare logMAR", O.whoCategory(1.0).level, "moderate");
eq("no category without a number", O.whoCategory(null), null);

/* --- low vision: Kestenbaum (pdf p. 337) --- */
eq("book: 20/200 suggests a 10 D add", O.kestenbaum(O.parseVA("20/200")).add, 10, 1e-9);
eq("book: 6/60 is the same acuity, the same add", O.kestenbaum(O.parseVA("6/60")).add, 10, 1e-9);
eq("20/100 suggests a 5 D add", O.kestenbaum(O.parseVA("20/100")).add, 5, 1e-9);
eq("a 10 D add means reading at 10 cm", O.kestenbaum(O.parseVA("6/60")).workingCm, 10, 1e-9);
eq("magnification from 6/60 to 6/12", O.magnification(O.parseVA("6/60"), O.parseVA("6/12")).times, 5, 1e-9);
eq("no magnification needed when the acuity already meets the task", O.magnification(O.parseVA("6/12"), O.parseVA("6/12")).times, 1, 1e-9);
eq("magnification needs both acuities", O.magnification(O.parseVA("6/60"), null), null);

console.log(`${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
