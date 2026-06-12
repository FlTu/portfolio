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

function createSectionCard(item, options = {}) {

  const {
    showPeriod = false,
    expandable = false
  } = options;

  const open =
    state.expandedSections[item.id];

  const card = document.createElement("div");
  card.className =
    "card" + (open ? " open" : "");

  // titre
  const title = document.createElement("div");
  title.className = "title";
  title.textContent = item.title;

  card.appendChild(title);

  // période (expériences uniquement)
  if (showPeriod && item.period) {

    const period = document.createElement("div");
    period.className = "small";
    period.textContent = item.period;

    card.appendChild(period);
  }

  // résumé
  const summary = document.createElement("div");
  summary.textContent = item.summary;

  card.appendChild(summary);

  // détails
  if (expandable) {

    const details =
      document.createElement("div");

    details.className = "expand";

    details.innerHTML =
      (item.details || "")
        .replace(/\n/g, "<br>");

    card.appendChild(details);
  }

  // compétences
  card.appendChild(
    createSkillsBlock(item.skills)
  );

  // bouton
  if (expandable) {

    const btn =
      document.createElement("button");

    btn.textContent =
      open ? "Réduire" : "Voir plus";

    btn.onclick =
      () => toggleSection(item.id);

    card.appendChild(btn);
  }

  return card;
}

/* ---------------- SKILLS ---------------- */

function createSkillsBlock(skills = []) {

  const block = document.createElement("div");
  block.className = "skill-grid-mini";

  skills.forEach(skill => {

    const tag = document.createElement("span");
    tag.className = "skill-mini";
    tag.textContent = skill;

    block.appendChild(tag);
  });

  return block;
}

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

/* ---------------- SECTIONS ---------------- */

function renderSection(root, state, config) {

  const {
    title,
    items,
    showPeriod = false,
    expandable = false
  } = config;

  const section =
    document.createElement("div");

  if (title) {

    const heading =
      document.createElement("h2");

    heading.textContent = title;

    section.appendChild(heading);
  }

  items
    .filter(item =>
      matchesMode(item, state)
      && matchesSearch(item, state)
    )
    .forEach(item => {

      section.appendChild(
        createSectionCard(item, {
          showPeriod,
          expandable
        })
      );
    });

  root.appendChild(section);
}

function renderOverview(state) {

  const root =
    document.getElementById("content");

  clear(root);

  renderSection(root, state, {
    title: "Expériences",
    items: DATA.experiences,
      showPeriod: true,
    expandable: true
  });

  renderSection(root, state, {
    title: "Projets",
      items: DATA.projects,
      expandable: true
  });
}

/* ---------------- EXPERIENCES ---------------- */

function renderExperiences(state) {

  const root =
    document.getElementById("content");

  clear(root);

  renderSection(root, state, {
    items: DATA.experiences,
    showPeriod: true,
    expandable: true
  });
}

/* ---------------- PROJECTS ---------------- */

function renderProjects(state) {

  const root =
    document.getElementById("content");

  clear(root);

  renderSection(root, state, {
    items: DATA.projects,
    expandable: true
  });
}

/* ---------------- ROUTER ---------------- */

function render(state) {

  const root = document.getElementById("content");
  root.innerHTML = "";

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

    case "overview":
      renderOverview(state);
      break;
  }
}

