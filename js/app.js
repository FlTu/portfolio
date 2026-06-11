const state = {
  mode: "all",
  view: "skills",
  search: "",
  expandedSkills: {},
  expandedExp: {},
  expandedProj: {}
};

function setMode(mode) {
  state.mode = mode;
  render(state);
}

function setView(view) {
  state.view = view;
  render(state);
}

function setSearch(v) {
  state.search = v.toLowerCase();
  render(state);
}

function toggleSkill(cat) {
  state.expandedSkills[cat] = !state.expandedSkills[cat];
  render(state);
}

function toggleExp(id) {
  state.expandedExp[id] = !state.expandedExp[id];
  render(state);
}

function toggleProj(id) {
  state.expandedProj[id] = !state.expandedProj[id];
  render(state);
}


function updateSidebarState() {

  document.querySelectorAll("[data-mode]").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.mode === state.mode
    );
  });

  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.classList.toggle(
      "active",
      btn.dataset.view === state.view
    );
  });
}
/* INIT */
render(state);
