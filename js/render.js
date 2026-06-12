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

    // Parcourt tous les experiences correspondant aux filtres actifs
    // (mode sélectionné + texte recherché)
    DATA.experiences
	.filter(e => matchesMode(e, state) && matchesSearch(e, state))
	.forEach(exp => {
	    
            // État d'expansion de l'experience (Voir plus / Réduire)
	    const open = state.expandedExp[exp.id];
	    
            // Card principale du projet
	    const card = document.createElement("div");
	    card.className = "card" + (open ? " open" : "");
	    
            // Titre du projet
	    const title = document.createElement("div");
	    title.className = "title";
	    title.textContent = exp.title;
	    
            // Champs de durée de l'experience
	    const period = document.createElement("div");
	    period.className = "small";
	    period.textContent = exp.period;
	    
            // Résumé court affiché en permanence
	    const summary = document.createElement("div");
	    summary.textContent = exp.summary;
	    
            // Bouton d'expansion/repli
	    const btn = document.createElement("button");
	    btn.textContent = open ? "Réduire" : "Voir plus";
	    btn.onclick = () => toggleExp(exp.id);
	    
            // Description détaillée
            // Conversion des retours à la ligne en <br>
	    const details = document.createElement("div");
	    details.className = "expand";
	    details.innerHTML = (exp.details || "").replace(/\n/g, "<br>");

            // Bloc des compétences associées à l'experience
	    const skillsBlock = document.createElement("div");
	    skillsBlock.className = "skill-grid-mini";
	    
            // Création d'un badge par compétence
	    (exp.skills || []).forEach(s => {
		const tag = document.createElement("span");
		tag.className = "skill-mini";
		tag.textContent = s;
		skillsBlock.appendChild(tag);
	    });
	    
            // Bloc des compétences associées à l'experience
	    card.appendChild(title);
	    card.appendChild(period);
	    card.appendChild(summary);
            card.appendChild(details);
            card.appendChild(skillsBlock);
	    card.appendChild(btn);
	    

	    root.appendChild(card);
	});
}
/* ---------------- PROJECTS ---------------- */

function renderProjects(state) {
  const root = document.getElementById("content");
  clear(root);


    // Parcourt tous les projets correspondant aux filtres actifs
    // (mode sélectionné + texte recherché)
    DATA.projects
	.filter(p => matchesMode(p, state) && matchesSearch(p, state))
	.forEach(proj => {
	    
            // État d'expansion du projet (Voir plus / Réduire)
            const open = state.expandedProj[proj.id];

            // Card principale du projet
            const card = document.createElement("div");
            card.className = "card" + (open ? " open" : "");
	    
            // Titre du projet
            const title = document.createElement("div");
            title.className = "title";
            title.textContent = proj.title;

            // Résumé court affiché en permanence
            const summary = document.createElement("div");
            summary.textContent = proj.summary;
	    
            // Bouton d'expansion/repli
            const btn = document.createElement("button");
            btn.textContent = open ? "Réduire" : "Voir plus";
            btn.onclick = () => toggleProj(proj.id);
	    
            // Description détaillée
            // Conversion des retours à la ligne en <br>
            const details = document.createElement("div");
            details.className = "expand";
            details.innerHTML = (proj.details || "").replace(/\n/g, "<br>");
	    
            // Bloc des compétences associées au projet
            const skillsBlock = document.createElement("div");
            skillsBlock.className = "skill-grid-mini";

            // Création d'un badge par compétence
            (proj.skills || []).forEach(s => {
		const tag = document.createElement("span");
		tag.className = "skill-mini";
		tag.textContent = s;
		skillsBlock.appendChild(tag);
            });
	    
            // Construction finale de la card
            card.appendChild(title);
            card.appendChild(summary);
            card.appendChild(details);
            card.appendChild(skillsBlock);
            card.appendChild(btn);
	    
            // Insertion dans la zone principale
            root.appendChild(card);
	});
}


/* ---------------- EXPERIENCES & PROJECTS ---------------- */

function renderOverview(state) {

  const root = document.getElementById("content");

  // EXPERIENCES
  const expSection = document.createElement("div");
  expSection.innerHTML = `<h2>Expériences</h2>`;

  DATA.experiences
    .filter(e => matchesMode(e, state))
    .forEach(exp => {

      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("div");
      title.textContent = exp.title;

      const summary = document.createElement("div");
      summary.textContent = exp.summary;

      // skills associés (IMPORTANT)
      const skills = document.createElement("div");
      skills.className = "skill-grid-mini";

      (exp.skills || []).forEach(s => {
        const tag = document.createElement("span");
        tag.className = "skill-mini";
        tag.textContent = s;
        skills.appendChild(tag);
      });

      card.appendChild(title);
      card.appendChild(summary);
      card.appendChild(skills);

      expSection.appendChild(card);
    });

  // PROJECTS
  const projSection = document.createElement("div");
  projSection.innerHTML = `<h2>Projets</h2>`;

  DATA.projects
    .filter(p => matchesMode(p, state))
    .forEach(proj => {

      const card = document.createElement("div");
      card.className = "card";

      const title = document.createElement("div");
      title.textContent = proj.title;

      const summary = document.createElement("div");
      summary.textContent = proj.summary;

      const skills = document.createElement("div");
      skills.className = "skill-grid-mini";

      (proj.skills || []).forEach(s => {
        const tag = document.createElement("span");
        tag.className = "skill-mini";
        tag.textContent = s;
        skills.appendChild(tag);
      });

      card.appendChild(title);
      card.appendChild(summary);
      card.appendChild(skills);

      projSection.appendChild(card);
    });

  root.appendChild(expSection);
  root.appendChild(projSection);
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

