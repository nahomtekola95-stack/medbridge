/* Ethiopian calendar (Amete Mihret) conversion and date formatting.
   Algorithm: Beyene & Kudlek, via the Julian Day Number. Pure functions. */
(function () {
  const EPOCH = 1723856;
  const MONTHS_EN = ["Meskerem", "Tikimt", "Hidar", "Tahsas", "Tir", "Yekatit", "Megabit", "Miyazya", "Ginbot", "Sene", "Hamle", "Nehase", "Pagume"];
  const MONTHS_AM = ["መስከረም", "ጥቅምት", "ኅዳር", "ታኅሣሥ", "ጥር", "የካቲት", "መጋቢት", "ሚያዝያ", "ግንቦት", "ሰኔ", "ሐምሌ", "ነሐሴ", "ጳጉሜ"];
  const div = (a, b) => Math.floor(a / b);
  const mod = (a, b) => ((a % b) + b) % b;
  /** Julian Day Number of a Gregorian date. */
  function gregorianToJdn(y, m, d) {
    const a = div(14 - m, 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
    return d + div(153 * mm + 2, 5) + 365 * yy + div(yy, 4) - div(yy, 100) + div(yy, 400) - 32045;
  }
  function jdnToEthiopian(jdn) {
    const r = mod(jdn - EPOCH, 1461);
    const n = mod(r, 365) + 365 * div(r, 1460);
    return { year: 4 * div(jdn - EPOCH, 1461) + div(r, 365) - div(r, 1460), month: div(n, 30) + 1, day: mod(n, 30) + 1 };
  }
  function ethiopianToJdn(y, m, d) {
    return EPOCH + 365 + 365 * (y - 1) + div(y, 4) + 30 * m + d - 31;
  }
  /** Gregorian date (local JS Date at midnight) for a Julian Day Number. */
  function jdnToDate(jdn) {
    const a = jdn + 32044, b = div(4 * a + 3, 146097), c = a - div(146097 * b, 4);
    const d = div(4 * c + 3, 1461), e = c - div(1461 * d, 4), m = div(5 * e + 2, 153);
    return new Date(100 * b + d - 4800 + div(m, 10), m + 3 - 12 * div(m, 10) - 1, e - div(153 * m + 2, 5) + 1);
  }
  /** JS Date for an Ethiopian year, month (1–13) and day. */
  const toDate = (y, m, d) => jdnToDate(ethiopianToJdn(y, m, d));
  /** days in an Ethiopian month: 30, or 5/6 for Pagume (6 when year % 4 === 3) */
  const monthDays = (y, m) => m < 13 ? 30 : (mod(y, 4) === 3 ? 6 : 5);
  /** Ethiopian date for a JS Date (uses the local calendar day). */
  function fromDate(date) {
    const dt = date instanceof Date ? date : new Date(date);
    return jdnToEthiopian(gregorianToJdn(dt.getFullYear(), dt.getMonth() + 1, dt.getDate()));
  }
  function format(date, lang) {
    const e = fromDate(date);
    return lang === "am" ? `${MONTHS_AM[e.month - 1]} ${e.day}፣ ${e.year} ዓ.ም.` : `${e.day} ${MONTHS_EN[e.month - 1]} ${e.year} E.C.`;
  }
  const enabled = () => { try { return JSON.parse(localStorage.getItem("mb:ethCal")) === true || (window.I18N && I18N.lang === "am" && JSON.parse(localStorage.getItem("mb:ethCal")) !== false); } catch { return false; } };
  window.EthCal = { fromDate, format, gregorianToJdn, jdnToEthiopian, ethiopianToJdn, jdnToDate, toDate, monthDays, MONTHS_EN, MONTHS_AM, enabled };
})();
