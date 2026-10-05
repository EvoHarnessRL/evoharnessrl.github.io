// Values from tables/*.tex. A trailing "*" marks the column best per backbone group.
const TASK = ["Pick", "Look", "Clean", "Heat", "Cool", "Pick2", "Avg."];
const FULL_HEAD = [["ALFWorld", TASK], ["WebShop", ["SR", "Score"]], ["WebArena", ["SP", "CMS", "Maps", "G&R", "Avg."]]];
const FULL_AVG = new Set([6, 13]);

const MAIN = [
  { group: "Frontier Models" },
  { name: "ReAct (Claude Opus 4.6)", f: 1, v: "100.0 92.3 100.0 100.0 88.0 95.8 96.4 40.2 57.3 26.7 13.3 30.0 20.0 22.0 –" },
  { name: "+ EvoHarness-Base", sub: 1, f: 1, ours: 1, v: "100.0 100.0* 100.0 100.0 96.0* 95.8 98.6* 46.4* 61.5* 33.3* 20.0* 40.0* 50.0* 34.0* +6.2" },
  { name: "ReAct (GLM-5)", f: 1, v: "77.1 69.2 48.1 50.0 20.0 45.8 52.1 46.2 62.8 26.7 13.3 20.0* 20.0 20.0 –" },
  { name: "+ EvoHarness-Base", sub: 1, f: 1, ours: 1, v: "94.3* 84.6* 74.1* 68.8* 52.0* 87.5* 77.9* 49.6* 70.0* 26.7 20.0* 10.0 30.0* 22.0* +9.6" },
  { name: "ReAct (GPT-5)", f: 1, v: "74.3 53.8 48.1 62.5 60.0 58.3 60.7 37.8 56.1 26.7 26.7 10.0* 10.0 20.0 –" },
  { name: "+ EvoHarness-Base", sub: 1, f: 1, ours: 1, v: "97.1* 76.9* 85.2* 93.8* 88.0* 62.5* 85.0* 46.2* 63.9* 40.0* 33.3* 0.0 20.0* 26.0* +11.6" },
  { group: "Open-Source Baselines (Qwen3-8B)" },
  { name: "ReAct", f: 1, v: "78.1 46.2 33.3 37.5 29.3 47.2 47.8 12.0 42.9 20.0 13.3 0.0 20.0 14.0 –" },
  { name: "ExpeL", f: 1, v: "91.4 76.9 14.8 43.8 28.0 45.8 50.7 7.0 25.7 20.0 26.7 0.0 20.0 18.0 −3.8" },
  { name: "ReasoningBank†", f: 1, v: "83.8 48.7 49.4 39.6 41.3 54.2 56.2 11.4 35.4 20.0 13.3 10.0 10.0 14.0 +0.1" },
  { name: "MemP†", f: 1, v: "80.0 43.6 24.7 33.3 38.7 48.6 47.9 12.0 35.7 20.0 20.0 0.0 10.0 14.0 −1.8" },
  { name: "Dynamic Cheatsheet", f: 1, v: "88.6 53.8 29.6 37.5 20.0 66.7 52.1 5.2 20.4 20.0 33.3* 0.0 10.0 18.0 −5.3" },
  { name: "ACE", f: 1, v: "85.7 38.5 29.6 37.5 36.0 58.3 51.4 3.2 13.2 20.0 26.7 0.0 10.0 16.0 −8.2" },
  { name: "SkillOS-base†", f: 1, v: "79.0 41.0 45.7 37.5 38.7 55.6 53.1 13.6 38.6 20.0 20.0 0.0 20.0 16.0 +1.2" },
  { name: "GRPO", v: "88.6 69.2 74.1 68.8 48.0 41.7 66.4 73.0 82.4 33.3 13.3 20.0* 0.0 18.0 +30.8" },
  { name: "SkillOS†", v: "85.7 56.4 54.3 43.8 46.7 62.5 61.2 16.5 40.6 26.7 20.0 10.0 10.0 18.0 +4.9" },
  { name: "SkillRL", v: "94.3 84.6 92.6 87.5 72.0 75.0 85.0 73.2 85.5 20.0 20.0 10.0 20.0 18.0 +36.3" },
  { group: "Ours (Qwen3-8B)" },
  { name: "EvoHarness-Base", f: 1, ours: 1, v: "71.4 53.8 63.0 50.0 48.0 41.7 56.4 18.6 43.7 20.0 26.7 10.0 10.0 18.0 +5.0" },
  { name: "EvoHarness-SFT", ours: 1, v: "80.0 53.8 88.9 75.0 40.0 62.5 68.6 43.8 48.1 33.3 6.7 0.0 20.0 16.0 +15.0" },
  { name: "EvoHarness-RL", ours: 1, v: "100.0* 92.3* 96.3* 100.0* 84.0* 95.8* 95.0* 80.6* 90.8* 40.0* 20.0 10.0 30.0* 26.0* +43.9" },
];

const UNSEEN = [
  { group: "Claude Opus 4.6" },
  { name: "ReAct", f: 1, v: "100.0 83.3 96.8 78.3 90.5 94.1 91.0" },
  { name: "+ EvoHarness-Base", f: 1, ours: 1, v: "100.0 94.4 100.0 95.7 100.0 94.1 97.8" },
  { group: "Qwen3-8B" },
  { name: "ReAct", f: 1, v: "66.7 50.0 48.4 47.8 52.4 29.4 50.0" },
  { name: "+ EvoHarness-Base", f: 1, ours: 1, v: "83.3 38.9 87.1 91.3 90.5 58.8 77.6" },
  { name: "+ EvoHarness-SFT", ours: 1, v: "70.8 66.7 80.6 69.6 47.6 76.5 69.4" },
  { name: "+ SFT + GRPO", v: "75.0 66.7 83.9 69.6 90.5 76.5 77.6" },
  { name: "+ Always-on BPE", v: "91.7 83.3 96.8 100.0 81.0 82.4 90.3" },
  { name: "+ EvoHarness-RL", ours: 1, v: "95.8 100.0 93.5 91.3 100.0 88.2 94.8" },
];

const FIRE = '<img src="static/emoji_fire.png" alt="trainable" style="height:13px;vertical-align:-2px;margin-left:4px">';
const SNOW = '<span class="frozen ico">&lowast;</span>';

function autoBest(rows, n) {
  let block = [];
  const flush = () => {
    if (block.length > 1) {
      for (let i = 0; i < n; i++) {
        const nums = block.map((r) => parseFloat(r.cells[i]));
        const max = Math.max(...nums.filter((x) => !isNaN(x)));
        block.forEach((r, k) => { if (nums[k] === max) r.cells[i] += "*"; });
      }
    }
    block = [];
  };
  rows.forEach((r) => (r.group ? flush() : block.push(r)));
  flush();
}

function renderTable(id, { first, head, avg = new Set(), delta = false, icons = true, auto = false }, data) {
  const starts = new Set();
  let n = 0;
  head.forEach(([, cols]) => { starts.add(n); n += cols.length; });
  const rows = data.map((r) => (r.group ? r : { ...r, cells: r.v.split(" ") }));
  if (auto) autoBest(rows, n);

  const total = n + 1 + (delta ? 1 : 0);
  let h = `<thead><tr class="g"><th rowspan="2" style="text-align:left">${first}</th>`;
  head.forEach(([g, cols]) => (h += `<th colspan="${cols.length}" class="gs">${g}</th>`));
  if (delta) h += '<th rowspan="2" class="gs delta">Δ</th>';
  h += "</tr><tr>";
  head.forEach(([, cols], gi) => cols.forEach((c, ci) => (h += `<th class="${ci === 0 ? "gs" : ""}">${c.replace("&", "&amp;")}</th>`)));
  h += "</tr></thead><tbody>";

  for (const r of rows) {
    if (r.group) { h += `<tr class="grp"><td colspan="${total}">${r.group}</td></tr>`; continue; }
    const icon = icons ? (r.f ? SNOW : FIRE) : "";
    h += `<tr class="${r.ours ? "ours" : ""} ${r.sub ? "sub" : ""}"><td>${r.name}${icon}</td>`;
    r.cells.forEach((x, i) => {
      const best = x.endsWith("*");
      let val = x.replace("*", ""), pm = "";
      if (val.includes("±")) { const [m, s] = val.split("±"); val = m; pm = `<span class="pm">±${s}</span>`; }
      const isDelta = i === n;
      const cls = [best ? "best" : "", avg.has(i) ? "avg" : "", starts.has(i) || isDelta ? "gs" : "", isDelta ? "delta" : ""].join(" ");
      h += `<td class="${cls}">${best ? `<span>${val}</span>` : val}${pm}</td>`;
    });
    h += "</tr>";
  }
  document.getElementById(id).innerHTML = h + "</tbody>";
}

const ABL = [
  ["BPE state"],
  ["Full (ours)", 95.0, 0, 1], ["w/o Belief", 89.3, 5.7], ["w/o Progress", 90.7, 4.3], ["w/o Experience", 84.3, 10.7],
  ["Training"],
  ["Always-on BPE", 88.6, 6.4], ["SFT + GRPO", 87.9, 7.1], ["w/o SFT", 50.0, 45.0],
  ["Reward"],
  ["w/o Diversity", 92.9, 2.1], ["w/o Efficiency", 86.4, 8.6],
];
const AX_MIN = 40, FULL = 95.0;

function renderAblation() {
  const pct = (v) => ((v - AX_MIN) / (100 - AX_MIN)) * 100;
  let h = "";
  for (const [name, v, d, ours] of ABL) {
    if (v === undefined) { h += `<div class="cg">${name}</div>`; continue; }
    h += `<div class="bar-row ${ours ? "is-ours" : ""}"><span class="name" title="${name}">${name}</span>
      <span class="track"><span class="fill" data-w="${pct(v)}"></span><span class="ref" style="left:${pct(FULL)}%"></span></span>
      <span class="val">${v.toFixed(1)}${d ? `<span class="dn">▼${d.toFixed(1)}</span>` : ""}</span></div>`;
  }
  h += `<div class="axis"><span></span><span><i>${AX_MIN}</i><i>70</i><i>100</i></span><span></span></div>`;
  const el = document.getElementById("abl-chart");
  el.innerHTML = h;
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    el.querySelectorAll(".fill").forEach((f) => (f.style.width = f.dataset.w + "%"));
    io.disconnect();
  }), { threshold: 0.2 });
  io.observe(el);
}

const EXP = [
  ["w/o Experience", 84.3, 84.3],
  ["Fixed SFT-init bank", 93.6, 86.6],
  ["Self-consolidate (Qwen3-8B)", 94.3, 88.1],
  ["Co-evolved bank (ours)", 95.0, 94.8, 1],
];

function renderExp() {
  let h = "<thead><tr><th>Experience</th><th>Seen</th><th>Unseen</th></tr></thead><tbody>";
  for (const [n, s, u, ours] of EXP) {
    const c = ours ? ' class="best"' : "";
    const w = (x) => (ours ? `<span>${x.toFixed(1)}</span>` : x.toFixed(1));
    h += `<tr class="${ours ? "ours" : ""}"><td>${n}</td><td${c}>${w(s)}</td><td${c}>${w(u)}</td></tr>`;
  }
  document.getElementById("exp-table").innerHTML = h + "</tbody>";
}

document.addEventListener("DOMContentLoaded", () => {
  renderTable("main-table", { first: "Approach", head: FULL_HEAD, avg: FULL_AVG, delta: true }, MAIN);
  renderTable("unseen-table", { first: "Approach", head: [["ALFWorld unseen", TASK]], avg: new Set([6]), auto: true }, UNSEEN);
  renderExp();
  renderAblation();

  const nav = document.getElementById("nav");
  addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 8), { passive: true });

  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.08 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  const links = [...document.querySelectorAll(".nav .links a")];
  const spy = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    const id = "#" + (e.target.dataset.nav || e.target.id);
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === id));
  }), { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("section[id]").forEach((s) => spy.observe(s));

  const btn = document.getElementById("copy-bib");
  btn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(document.getElementById("bib-text").textContent);
    btn.textContent = "Copied!";
    setTimeout(() => (btn.textContent = "Copy"), 1600);
  });
});

addEventListener("load", () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [{ left: "$$", right: "$$", display: true }, { left: "$", right: "$", display: false }],
      ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    });
  }
});
