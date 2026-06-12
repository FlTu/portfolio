state = {
  mode: "all",
  view: "skills",
  search: "",
  expandedSkills: {},
  expandedSections: {}
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

function toggleSection(id) {
  state.expandedSections[id] =
    !state.expandedSections[id];

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
}x
/* INIT */
render(state);
