function clear(el) {
  el.innerHTML = "";
}

/* ---------------- MODE LOGIC ---------------- */

function matchesMode(item, state) {
  if (state.mode === "all") return true;
  return item.modes.includes(state.mode);
}

function matchesSearch(item, state) {
  if (!state.search) return true;
  return JSON.stringify(item).toLowerCase().includes(state.search);
}

/* ---------------- SKILLS ---------------- */

function renderSkills(state) {
  const root = document.getElementById("content");
  clear(root);

  Object.entries(DATA.skills).forEach(([cat, items]) => {

    const filtered = items.filter(i =>
      matchesMode(i, state) && matchesSearch(i, state)
    );

    if (filtered.length === 0) return;

    const visible = state.expandedSkills[cat]
      ? filtered
      : filtered.slice(0, 3);

    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <div class="title">${cat}</div>

      <div class="skill-grid">
        ${visible.map(s => `
          <span class="skill-item">${s.name}
            <span class="small">(${s.level})</span>
          </span>
        `).join("")}
      </div>

      ${filtered.length > 3 ? `
        <button onclick="toggleSkill('${cat}')">
          ${state.expandedSkills[cat] ? "Voir moins" : "Voir plus"}
        </button>
      ` : ""}
    `;

    root.appendChild(card);
  });
}

/* ---------------- EXPERIENCES ---------------- */

function renderExperiences(state) {
  const root = document.getElementById("content");
  clear(root);

  DATA.experiences
    .filter(e => matchesMode(e, state) && matchesSearch(e, state))
    .forEach(exp => {

      const open = state.expandedExp[exp.id];

      const card = document.createElement("div");
      card.className = "card" + (open ? " open" : "");

      card.innerHTML = `
        <div class="title">${exp.title}</div>
        <div class="small">${exp.period}</div>
        <div>${exp.summary}</div>

        <button onclick="toggleExp('${exp.id}')">
          ${open ? "Réduire" : "Détails"}
        </button>

        <div class="expand">
          ${exp.details}
        </div>
      `;

      root.appendChild(card);
    });
}

/* ---------------- PROJECTS ---------------- */

function renderProjects(state) {
  const root = document.getElementById("content");
  clear(root);

  DATA.projects
    .filter(p => matchesMode(p, state) && matchesSearch(p, state))
    .forEach(proj => {

      const open = state.expandedProj[proj.id];

      const card = document.createElement("div");
      card.className = "card" + (open ? " open" : "");

      card.innerHTML = `
        <div class="title">${proj.title}</div>
        <div>${proj.summary}</div>

        <button onclick="toggleProj('${proj.id}')">
          ${open ? "Réduire" : "Détails"}
        </button>

        <div class="expand">
          ${proj.details}
        </div>
      `;

      root.appendChild(card);
    });
}
/* ---------------- ROUTER ---------------- */

function render(state) {

  switch (state.view) {
    case "skills":
      renderSkills(state);
      break;

    case "experiences":
      renderExperiences(state);
      break;

    case "projects":
      renderProjects(state);
      break;
  }

  updateSidebarState();
}
