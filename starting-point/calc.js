// Starting Point calculator (Episode 3). Everything is computed in the browser; nothing is stored or sent.
(function () {
  const form = document.querySelector("[data-calc-form]");
  const $ = (sel) => document.querySelector(sel);
  const peso = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
  const fmt = (n) => (n < 0 ? "−" : "") + peso.format(Math.abs(Math.round(n)));

  const GOAL = 100000;
  const EF_MONTHS_OK = 3;

  // Episode 3's example. "Halimbawa lang", not a real person.
  const ANA = { kita: 22000, gastos: 19500, taunan: 12000, ef: 3000, ipon: 5000, utang: 15000, mataas: true, invest: 1000 };

  const POSITIONS = {
    1: {
      title: "Position 1 · Ayusin muna ang daloy ⚠️",
      text: "Kulang ang kita mo sa gastos. Ang first move mo: ayusin muna ang daloy ng pera. Bawasan ang tagas, o dagdagan ang kita. Huwag munang mag-invest.",
    },
    2: {
      title: "Position 2 · Protektahan ang hari 🛡️",
      text: "May sobra ka, pero maliit pa ang emergency fund mo, o may mabigat kang utang. Ang first move mo: palakihin ang emergency fund, at bayaran ang utang nang tama sa oras. Kung may matitira pa, puwede ka nang magsimula ng maliit na investment, kahit ₱1,000.",
    },
    3: {
      title: "Position 3 · Handa nang umabante 🚀",
      text: "May sobra ka, may sapat kang emergency fund, at walang mabigat na utang. Handa ka nang umabante nang mas mabilis: dito na papasok nang buo ang ₱1,000 / ₱2,000 / ₱5,000 rules.",
    },
  };

  function num(name) {
    const v = parseFloat(form.elements[name].value);
    return Number.isFinite(v) && v > 0 ? v : 0;
  }

  function duration(months) {
    const y = Math.floor(months / 12);
    const m = months % 12;
    const parts = [];
    if (y) parts.push(`${y} taon`);
    if (m) parts.push(`${m} buwan`);
    return parts.join(" at ") || "0 buwan";
  }

  function render() {
    const kita = num("kita");
    const gastos = num("gastos");
    const hasInput = kita > 0 || gastos > 0;
    $("[data-empty]").hidden = hasInput;
    $("[data-body]").hidden = !hasInput;
    if (!hasInput) return;

    const taunanMonthly = num("taunan") / 12;
    const totalGastos = gastos + taunanMonthly;
    const sobra = kita - totalGastos;
    const ef = num("ef");
    const mayroon = ef + num("ipon");
    const utang = num("utang");
    const mataas = form.elements.mataas.checked;
    const netWorth = mayroon - utang;
    const efMonths = totalGastos > 0 ? ef / totalGastos : 0;

    // Surplus
    $("[data-sobra-label]").textContent = sobra >= 0 ? "Sobra kada buwan" : "Kulang kada buwan";
    const sobraEl = $("[data-sobra]");
    sobraEl.textContent = fmt(sobra);
    sobraEl.dataset.tone = sobra > 0 ? "good" : sobra < 0 ? "bad" : "";
    $("[data-sobra-sub]").textContent = taunanMonthly > 0
      ? `Kasama ang ${fmt(taunanMonthly)}/buwan para sa hindi buwan-buwan.`
      : "Kita − gastos";

    // Net worth
    const nwEl = $("[data-networth]");
    nwEl.textContent = fmt(netWorth);
    nwEl.dataset.tone = netWorth > 0 ? "good" : netWorth < 0 ? "bad" : "";
    $("[data-networth-sub]").textContent = netWorth < 0
      ? "Negative? Okay lang. Starting point lang 'to, hindi grade."
      : "Mayroon ka − utang";

    // Emergency fund in months of spending
    const efEl = $("[data-efmonths]");
    const efShown = efMonths >= 10 ? Math.round(efMonths) : Math.round(efMonths * 10) / 10;
    efEl.textContent = `${efShown} buwan`;
    efEl.dataset.tone = efMonths >= EF_MONTHS_OK ? "good" : "";

    // Position
    let pos;
    if (sobra <= 0) pos = 1;
    else if (efMonths >= EF_MONTHS_OK && !mataas) pos = 3;
    else pos = 2;
    const card = $("[data-position-card]");
    card.dataset.position = pos;
    $("[data-position-title]").textContent = POSITIONS[pos].title;
    $("[data-position-text]").textContent = POSITIONS[pos].text;
    const extra = $("[data-position-extra]");
    if (pos === 2 && mataas) {
      extra.hidden = false;
      extra.textContent = "May utang kang mataas ang interest. Kadalasan, mas sulit na unahin itong bayaran bago mag-invest, gaya ng ginawa ni Ana sa Episode 3.";
    } else {
      extra.hidden = true;
    }

    // Time to ₱100K, contributions only
    const list = $("[data-timeline]");
    list.innerHTML = "";
    const invest = num("invest");
    const rows = [];
    if (invest > 0) rows.push([`Sa ${fmt(invest)} kada buwan`, Math.ceil(GOAL / invest)]);
    if (sobra > 0 && Math.round(sobra) !== Math.round(invest)) rows.push([`Kung ang buong sobra mo (${fmt(sobra)})`, Math.ceil(GOAL / sobra)]);
    if (!rows.length) {
      const li = document.createElement("li");
      li.textContent = "Ilagay kung magkano ang kaya mong i-invest kada buwan.";
      list.appendChild(li);
    }
    rows.forEach(([label, months]) => {
      const li = document.createElement("li");
      const b = document.createElement("strong");
      b.textContent = duration(months);
      li.append(`${label}: `, b);
      list.appendChild(li);
    });
  }

  form.addEventListener("input", render);
  form.addEventListener("change", render);
  form.addEventListener("reset", () => setTimeout(render, 0));

  $("[data-load-example]").addEventListener("click", () => {
    Object.entries(ANA).forEach(([name, value]) => {
      const el = form.elements[name];
      if (el.type === "checkbox") el.checked = value;
      else el.value = value;
    });
    render();
  });

  render();
})();
