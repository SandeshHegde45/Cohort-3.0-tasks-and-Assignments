"use strict";

let tasks = [];
let editingId = null;
let propMode = "bubble";

const taskList = document.getElementById("task-list");
const emptyState = document.getElementById("empty-state");
const taskTitleInput = document.getElementById("task-title");
const taskCatSel = document.getElementById("task-category");
const addTaskBtn = document.getElementById("add-task-btn");
const searchInput = document.getElementById("search-input");
const filterCat = document.getElementById("filter-category");
const filterStatus = document.getElementById("filter-status");
const clearAllBtn = document.getElementById("clear-all-btn");
const pendingCount = document.getElementById("pending-count");
const doneCount = document.getElementById("done-count");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");
const attrGet = document.getElementById("attr-get");
const attrProp = document.getElementById("attr-prop");
const modeBubble = document.getElementById("mode-bubble");
const modeCapture = document.getElementById("mode-capture");
const boxGp = document.getElementById("box-gp");
const boxP = document.getElementById("box-p");
const boxC = document.getElementById("box-c");
const propLog = document.getElementById("prop-log");
const modalOverlay = document.getElementById("modal-overlay");
const modalCancel = document.getElementById("modal-cancel");
const modalSave = document.getElementById("modal-save");
const editTitle = document.getElementById("edit-title");
const editCat = document.getElementById("edit-category");

function genId() {
  return "task-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(String(str)));
  return div.innerHTML;
}

function saveTasks() {
  localStorage.setItem("dom-tasks", JSON.stringify(tasks));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem("dom-tasks");
    if (raw) tasks = JSON.parse(raw);
  } catch (_) {
    tasks = [];
  }
}

function createTaskElement(task) {
  const card = document.createElement("div");
  card.className = "task-card";

  card.setAttribute("data-id", task.id);
  card.setAttribute("data-status", task.status);
  card.setAttribute("data-category", task.category);

  const header = document.createElement("div");
  header.className = "task-header";

  const titleEl = document.createElement("span");
  titleEl.className = "task-title";
  const titleTxt = document.createTextNode(task.title);
  titleEl.appendChild(titleTxt);

  const actions = document.createElement("div");
  actions.className = "task-actions";

  function makeBtn(action, iconClass, title) {
    const btn = document.createElement("button");
    btn.className = "task-btn " + action + "-btn";
    btn.setAttribute("data-action", action);
    btn.setAttribute("data-id", task.id);
    btn.setAttribute("title", title);
    btn.innerHTML = `<i class="${iconClass}"></i>`;
    return btn;
  }

  const completeBtn = makeBtn(
    "complete",
    task.status === "completed" ? "ri-refresh-line" : "ri-check-line",
    task.status === "completed" ? "Mark Pending" : "Mark Complete",
  );
  const editBtn = makeBtn("edit", "ri-edit-line", "Edit Task");
  const deleteBtn = makeBtn("delete", "ri-delete-bin-line", "Delete Task");

  actions.appendChild(completeBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  header.appendChild(titleEl);
  header.appendChild(actions);

  const meta = document.createElement("div");
  meta.className = "task-meta";

  const idBadge = makeBadge("data-id", card.dataset.id);
  const stBadge = makeBadge("data-status", card.dataset.status);
  const catBadge = makeBadge("data-category", card.dataset.category);

  meta.append(idBadge, stBadge, catBadge);

  card.appendChild(header);
  card.appendChild(meta);

  return card;
}

function makeBadge(attr, val) {
  const badge = document.createElement("span");
  badge.className = "data-badge";
  badge.innerHTML = `${attr}="<span>${escapeHtml(val)}</span>"`;
  return badge;
}

function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();
  const catF = filterCat.value;
  const stF = filterStatus.value;

  const filtered = tasks.filter((t) => {
    const mQ = !query || t.title.toLowerCase().includes(query);
    const mC = catF === "all" || t.category === catF;
    const mS = stF === "all" || t.status === stF;
    return mQ && mC && mS;
  });

  taskList.querySelectorAll(".task-card").forEach((el) => el.remove()); // remove

  if (filtered.length === 0) {
    emptyState.style.display = "";
    updateCounters();
    return;
  }

  emptyState.style.display = "none";

  const frag = document.createDocumentFragment();
  filtered.forEach((t) => frag.appendChild(createTaskElement(t)));
  taskList.appendChild(frag);

  updateCounters();
}

function updateCounters() {
  pendingCount.textContent = tasks.filter((t) => t.status === "pending").length;
  doneCount.textContent = tasks.filter((t) => t.status === "completed").length;
}

function addTask() {
  const title = taskTitleInput.value.trim();
  if (!title) {
    taskTitleInput.style.borderColor = "var(--red)";
    taskTitleInput.focus();
    setTimeout(() => {
      taskTitleInput.style.borderColor = "";
    }, 1200);
    return;
  }

  const task = {
    id: genId(),
    title: title,
    category: taskCatSel.value,
    status: "pending",
    createdAt: Date.now(),
  };

  tasks.unshift(task);

  const newCard = createTaskElement(task);
  const firstCard = taskList.querySelector(".task-card");

  if (firstCard) {
    firstCard.before(newCard);
  } else {
    emptyState.style.display = "none";
    taskList.prepend(newCard);
  }

  updateCounters();
  saveTasks();

  taskTitleInput.value = "";
  taskTitleInput.focus();
  updateAttrDemo();
}

function deleteTask(id) {
  const card = taskList.querySelector(`[data-id="${id}"]`);
  if (!card) return;

  card.style.transition = "opacity 0.2s, transform 0.2s";
  card.style.opacity = "0";
  card.style.transform = "translateX(20px)";

  setTimeout(() => {
    card.remove();
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    updateCounters();
    if (!taskList.querySelector(".task-card")) {
      emptyState.style.display = "";
    }
  }, 200);
}

function completeTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  task.status = task.status === "completed" ? "pending" : "completed";

  const oldCard = taskList.querySelector(`[data-id="${id}"]`);
  if (oldCard) {
    oldCard.setAttribute("data-status", task.status);

    const newCard = createTaskElement(task);
    oldCard.replaceWith(newCard);
  }

  saveTasks();
  updateCounters();
}

function openEditModal(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;

  editingId = id;
  editTitle.value = task.title;
  editCat.value = task.category;

  modalOverlay.removeAttribute("hidden");
  modalOverlay.classList.remove("hidden");
  editTitle.focus();
}

function saveEdit() {
  if (!editingId) return;
  const task = tasks.find((t) => t.id === editingId);
  if (!task) return;

  const newTitle = editTitle.value.trim();
  if (newTitle) task.title = newTitle;
  task.category = editCat.value;

  const oldCard = taskList.querySelector(`[data-id="${editingId}"]`);
  if (oldCard) {
    const newCard = createTaskElement(task);
    oldCard.after(newCard);
    oldCard.remove();
  }

  saveTasks();
  updateCounters();
  closeModal();
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  modalOverlay.setAttribute("hidden", "");
  editingId = null;
}

taskList.addEventListener("click", function (e) {
  const btn = e.target.closest("[data-action]");
  if (!btn) return;

  const action = btn.getAttribute("data-action");
  const id = btn.getAttribute("data-id");

  if (!btn.hasAttribute("data-id")) return;

  if (action === "complete") completeTask(id);
  if (action === "edit") openEditModal(id);
  if (action === "delete") deleteTask(id);
});

function updateAttrDemo() {
  const attrVal = taskTitleInput.getAttribute("value");
  const propVal = taskTitleInput.value;

  attrGet.textContent = `"${attrVal}"`;
  attrProp.textContent = `"${propVal}"`;
}

taskTitleInput.addEventListener("input", updateAttrDemo);

themeToggle.addEventListener("click", function () {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";

  html.setAttribute("data-theme", next);

  themeToggle.dataset.theme = next;

  if (next === "light") {
    themeIcon.classList.remove("ri-moon-fill");
    themeIcon.classList.add("ri-sun-fill");
  } else {
    themeIcon.classList.remove("ri-sun-fill");
    themeIcon.classList.add("ri-moon-fill");
  }

  localStorage.setItem("dom-theme", next);
});

let gpHandler = null,
  pHandler = null,
  cHandler = null;

function removePropHandlers() {
  if (gpHandler) {
    boxGp.removeEventListener("click", gpHandler, true);
    boxGp.removeEventListener("click", gpHandler, false);
  }
  if (pHandler) {
    boxP.removeEventListener("click", pHandler, true);
    boxP.removeEventListener("click", pHandler, false);
  }
  if (cHandler) {
    boxC.removeEventListener("click", cHandler, true);
    boxC.removeEventListener("click", cHandler, false);
  }
}

function attachPropHandlers() {
  const capture = propMode === "capture";

  cHandler = function () {
    propLog.innerHTML = "";
    addLogEntry("Child", "log-c");
    flash(boxC, "flash-c");
  };

  pHandler = function () {
    addLogEntry("Parent", "log-p");
    flash(boxP, "flash-p");
  };

  gpHandler = function (e) {
    e.stopPropagation();
    addLogEntry("Grandparent", "log-gp");
    flash(boxGp, "flash-gp");
  };

  boxGp.addEventListener("click", gpHandler, capture);
  boxP.addEventListener("click", pHandler, capture);
  boxC.addEventListener("click", cHandler, capture);
}

function addLogEntry(text, cls) {
  const div = document.createElement("div");
  div.className = "log-entry " + cls;
  div.textContent = "→ " + text;
  propLog.appendChild(div);
}

function flash(el, cls) {
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 380);
}

modeBubble.addEventListener("click", function () {
  propMode = "bubble";
  modeBubble.classList.add("active");
  modeCapture.classList.remove("active");
  removePropHandlers();
  attachPropHandlers();
  propLog.innerHTML =
    '<span class="log-hint">Bubbling: Child → Parent → Grandparent</span>';
});

modeCapture.addEventListener("click", function () {
  propMode = "capture";
  modeCapture.classList.add("active");
  modeBubble.classList.remove("active");
  removePropHandlers();
  attachPropHandlers();
  propLog.innerHTML =
    '<span class="log-hint">Capturing: Grandparent → Parent → Child</span>';
});

addTaskBtn.addEventListener("click", addTask);

taskTitleInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

searchInput.addEventListener("input", renderTasks);
filterCat.addEventListener("change", renderTasks);
filterStatus.addEventListener("change", renderTasks);

clearAllBtn.addEventListener("click", function () {
  if (!tasks.length) return;
  if (!confirm("Delete all tasks? This cannot be undone.")) return;
  tasks = [];
  saveTasks();
  renderTasks();
});

modalCancel.addEventListener("click", closeModal);
modalSave.addEventListener("click", saveEdit);

modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

function init() {
  const savedTheme = localStorage.getItem("dom-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  themeToggle.dataset.theme = savedTheme;
  if (savedTheme === "light") {
    themeIcon.classList.remove("ri-moon-fill");
    themeIcon.classList.add("ri-sun-fill");
  }

  loadTasks();

  if (tasks.length === 0) {
    [
      {
        title: "Read about the DOM Render Tree",
        category: "study",
        status: "pending",
      },
      {
        title: "Practice event delegation",
        category: "study",
        status: "pending",
      },
      {
        title: "Submit assignment by 11:59 PM",
        category: "urgent",
        status: "pending",
      },
      {
        title: "Revise CSS Flexbox notes",
        category: "study",
        status: "completed",
      },
    ].forEach((s) => tasks.push({ id: genId(), ...s, createdAt: Date.now() }));
    saveTasks();
  }

  renderTasks();
  updateAttrDemo();
  attachPropHandlers();
}

init();
