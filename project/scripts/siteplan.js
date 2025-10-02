// ---- Color Legend Injection ----
(function addColorLegend() {
  const branding = document.querySelector("#branding");
  if (!branding) return;

  // Create a small legend after the Branding heading
  const h2 = branding.querySelector("h2");
  const legend = document.createElement("div");
  legend.className = "color-legend";
  legend.setAttribute("aria-label", "Color swatch legend");

  const items = [
    { hex: "#1B4965", label: "Deep Blue — headers/nav/bars" },
    { hex: "#2E7D32", label: "Forest Green — accents/links" },
    { hex: "#CAE9FF", label: "Sky Tint — highlights/cards" },
    { hex: "#F2E8CF", label: "Sand — base/background" },
  ];

  items.forEach(({ hex, label }) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const chip = document.createElement("span");
    chip.className = "swatch";
    chip.style.setProperty("--sw", hex);

    const text = document.createElement("span");
    text.className = "legend-label";
    text.innerHTML = `<code>${hex}</code> — ${label}`;

    item.appendChild(chip);
    item.appendChild(text);
    legend.appendChild(item);
  });

  // Insert after the H2 (or at end of section if H2 missing)
  if (h2 && h2.nextSibling) {
    h2.parentNode.insertBefore(legend, h2.nextSibling);
  } else {
    branding.appendChild(legend);
  }
})();
