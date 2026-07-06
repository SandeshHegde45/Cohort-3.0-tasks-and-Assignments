const STORAGE_KEYS = {
  todos: "daybase_todos",
  planner: "daybase_planner",
  goals: "daybase_goals",
  theme: "daybase_theme",
};

const FALLBACK_LOCATION = {
  name: "Sirsi, Karnataka",
  latitude: 14.6197,
  longitude: 74.8354,
};

let activeFeature = null;
let navTransitioning = false;

function showFeature(name) {
  if (navTransitioning) return;
  const target = document.getElementById("feature-" + name);
  if (!target) return;
  navTransitioning = true;
  document.getElementById("dashboardView").style.display = "none";
  document.querySelectorAll(".feature-view").forEach(function (el) {
    el.classList.remove("active");
  });
  target.classList.add("active");
  activeFeature = name;
  window.setTimeout(function () {
    navTransitioning = false;
  }, 150);
}

function showDashboard() {
  if (navTransitioning) return;
  navTransitioning = true;
  document.querySelectorAll(".feature-view").forEach(function (el) {
    el.classList.remove("active");
  });
  document.getElementById("dashboardView").style.display = "";
  activeFeature = null;
  window.setTimeout(function () {
    navTransitioning = false;
  }, 150);
}

function initNavigation() {
  document.querySelectorAll(".tile").forEach(function (tile) {
    tile.addEventListener("click", function () {
      showFeature(tile.getAttribute("data-target"));
    });
  });
  document.querySelectorAll("[data-back]").forEach(function (btn) {
    btn.addEventListener("click", showDashboard);
  });
}

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (err) {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    return;
  }
}

let todos = loadJSON(STORAGE_KEYS.todos, []);

function renderTodos() {
  const list = document.getElementById("todoList");
  const empty = document.getElementById("todoEmpty");
  list.innerHTML = "";
  if (todos.length === 0) {
    empty.classList.add("visible");
  } else {
    empty.classList.remove("visible");
  }
  todos.forEach(function (todo) {
    const li = document.createElement("li");
    li.className =
      "todo-item" +
      (todo.completed ? " completed" : "") +
      (todo.important ? " important" : "");
    li.dataset.id = todo.id;

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const starBtn = document.createElement("button");
    starBtn.className =
      "icon-btn star-btn" + (todo.important ? " star-active" : "");
    starBtn.setAttribute("aria-label", "Mark important");
    starBtn.textContent = "★";

    const completeBtn = document.createElement("button");
    completeBtn.className =
      "icon-btn complete-btn" + (todo.completed ? " complete-active" : "");
    completeBtn.setAttribute("aria-label", "Mark complete");
    completeBtn.textContent = "✓";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete task");
    deleteBtn.textContent = "✕";

    li.appendChild(text);
    li.appendChild(starBtn);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
  updateTodoSummary();
}

function updateTodoSummary() {
  const el = document.getElementById("todoSummary");
  const pending = todos.filter(function (t) {
    return !t.completed;
  }).length;
  if (todos.length === 0) {
    el.textContent = "No tasks yet";
  } else if (pending === 0) {
    el.textContent = "All tasks done";
  } else {
    el.textContent = pending + " pending";
  }
  updateHeroGreeting();
}

function initTodo() {
  const form = document.getElementById("todoForm");
  const input = document.getElementById("todoInput");
  const list = document.getElementById("todoList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    todos.push({
      id: Date.now().toString(36),
      text: value,
      completed: false,
      important: false,
    });
    saveJSON(STORAGE_KEYS.todos, todos);
    renderTodos();
    input.value = "";
    input.focus();
  });

  list.addEventListener("click", function (e) {
    const li = e.target.closest(".todo-item");
    if (!li) return;
    const id = li.dataset.id;
    const todo = todos.find(function (t) {
      return t.id === id;
    });
    if (!todo) return;

    if (e.target.classList.contains("star-btn")) {
      todo.important = !todo.important;
    } else if (e.target.classList.contains("complete-btn")) {
      todo.completed = !todo.completed;
    } else if (e.target.classList.contains("delete-btn")) {
      todos = todos.filter(function (t) {
        return t.id !== id;
      });
    } else {
      return;
    }
    saveJSON(STORAGE_KEYS.todos, todos);
    renderTodos();
  });

  renderTodos();
}

let plannerData = loadJSON(STORAGE_KEYS.planner, {});
let plannerSaveTimers = {};

function formatHourLabel(hour) {
  const suffix = hour >= 12 ? "PM" : "AM";
  let h = hour % 12;
  if (h === 0) h = 12;
  return h + " " + suffix;
}

function renderPlanner() {
  const container = document.getElementById("plannerList");
  container.innerHTML = "";
  for (let hour = 0; hour < 24; hour++) {
    const row = document.createElement("div");
    row.className = "planner-row";
    row.dataset.hour = String(hour);

    const time = document.createElement("span");
    time.className = "planner-time";
    time.textContent = formatHourLabel(hour);

    const input = document.createElement("input");
    input.type = "text";
    input.maxLength = 140;
    input.placeholder = "Nothing planned";
    input.value = plannerData[hour] || "";
    input.addEventListener("input", function () {
      window.clearTimeout(plannerSaveTimers[hour]);
      plannerSaveTimers[hour] = window.setTimeout(function () {
        savePlannerEntry(hour, input.value);
      }, 500);
    });
    input.addEventListener("blur", function () {
      window.clearTimeout(plannerSaveTimers[hour]);
      savePlannerEntry(hour, input.value);
    });

    row.appendChild(time);
    row.appendChild(input);
    container.appendChild(row);
  }
  highlightCurrentHour();
  updatePlannerSummary();
}

function savePlannerEntry(hour, value) {
  const trimmed = value.trim();
  if (trimmed) {
    plannerData[hour] = trimmed;
  } else {
    delete plannerData[hour];
  }
  saveJSON(STORAGE_KEYS.planner, plannerData);
  updatePlannerSummary();
}

function highlightCurrentHour() {
  const currentHour = new Date().getHours();
  document.querySelectorAll(".planner-row").forEach(function (row) {
    row.classList.toggle(
      "current-hour",
      Number(row.dataset.hour) === currentHour,
    );
  });
}

function updatePlannerSummary() {
  const el = document.getElementById("plannerSummary");
  const count = Object.keys(plannerData).length;
  el.textContent = count === 0 ? "Plan your hours" : count + " slots planned";
}

function initPlanner() {
  renderPlanner();
  window.setInterval(highlightCurrentHour, 60000);
}

let goals = loadJSON(STORAGE_KEYS.goals, []);

function renderGoals() {
  const list = document.getElementById("goalList");
  const empty = document.getElementById("goalEmpty");
  list.innerHTML = "";
  if (goals.length === 0) {
    empty.classList.add("visible");
  } else {
    empty.classList.remove("visible");
  }
  goals.forEach(function (goal) {
    const li = document.createElement("li");
    li.className = "goal-item" + (goal.completed ? " completed" : "");
    li.dataset.id = goal.id;

    const text = document.createElement("span");
    text.className = "goal-text";
    text.textContent = goal.text;

    const completeBtn = document.createElement("button");
    completeBtn.className =
      "icon-btn complete-btn" + (goal.completed ? " complete-active" : "");
    completeBtn.setAttribute("aria-label", "Mark goal complete");
    completeBtn.textContent = "✓";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "icon-btn delete-btn";
    deleteBtn.setAttribute("aria-label", "Delete goal");
    deleteBtn.textContent = "✕";

    li.appendChild(text);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
  updateGoalProgress();
}

function updateGoalProgress() {
  const total = goals.length;
  const done = goals.filter(function (g) {
    return g.completed;
  }).length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  document.getElementById("goalProgressFill").style.width = pct + "%";
  const label = done + " of " + total + " completed";
  document.getElementById("goalProgressText").textContent = label;
  document.getElementById("goalsSummary").textContent = label;
  updateHeroGreeting();
}

function initGoals() {
  const form = document.getElementById("goalForm");
  const input = document.getElementById("goalInput");
  const list = document.getElementById("goalList");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const value = input.value.trim();
    if (!value) return;
    goals.push({ id: Date.now().toString(36), text: value, completed: false });
    saveJSON(STORAGE_KEYS.goals, goals);
    renderGoals();
    input.value = "";
    input.focus();
  });

  list.addEventListener("click", function (e) {
    const li = e.target.closest(".goal-item");
    if (!li) return;
    const id = li.dataset.id;
    const goal = goals.find(function (g) {
      return g.id === id;
    });
    if (!goal) return;

    if (e.target.classList.contains("complete-btn")) {
      goal.completed = !goal.completed;
    } else if (e.target.classList.contains("delete-btn")) {
      goals = goals.filter(function (g) {
        return g.id !== id;
      });
    } else {
      return;
    }
    saveJSON(STORAGE_KEYS.goals, goals);
    renderGoals();
  });

  renderGoals();
}

const SESSION_DURATIONS = { work: 25 * 60, short: 5 * 60, long: 15 * 60 };
const SESSION_LABELS = {
  work: "Work Session",
  short: "Short Break",
  long: "Long Break",
};
const SESSION_COLORS = { work: "--accent", short: "--amber", long: "--violet" };
const RING_CIRCUMFERENCE = 565.5;
let currentSession = "work";
let remainingSeconds = SESSION_DURATIONS.work;
let pomodoroInterval = null;

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return (
    String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0")
  );
}

function updateTimerDisplay() {
  const display = formatTime(remainingSeconds);
  document.getElementById("timerDisplay").textContent = display;
  document.getElementById("pomodoroSummary").textContent =
    display + (pomodoroInterval ? " running" : " ready");

  const total = SESSION_DURATIONS[currentSession];
  const elapsedRatio = total === 0 ? 0 : (total - remainingSeconds) / total;
  const ring = document.getElementById("timerRingProgress");
  ring.style.stroke = "var(" + SESSION_COLORS[currentSession] + ")";
  ring.style.strokeDashoffset = String(RING_CIRCUMFERENCE * elapsedRatio);
}

function playChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = 660;
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
  } catch (err) {
    return;
  }
}

function startTimer() {
  if (pomodoroInterval) return;
  pomodoroInterval = window.setInterval(function () {
    remainingSeconds -= 1;
    if (remainingSeconds <= 0) {
      window.clearInterval(pomodoroInterval);
      pomodoroInterval = null;
      remainingSeconds = 0;
      updateTimerDisplay();
      playChime();
      document.getElementById("sessionLabel").textContent =
        SESSION_LABELS[currentSession] + " complete";
      return;
    }
    updateTimerDisplay();
  }, 1000);
  updateTimerDisplay();
}

function pauseTimer() {
  if (!pomodoroInterval) return;
  window.clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  updateTimerDisplay();
}

function resetTimer() {
  window.clearInterval(pomodoroInterval);
  pomodoroInterval = null;
  remainingSeconds = SESSION_DURATIONS[currentSession];
  const label = document.getElementById("sessionLabel");
  label.textContent = SESSION_LABELS[currentSession];
  label.style.color = "var(" + SESSION_COLORS[currentSession] + ")";
  updateTimerDisplay();
}

function initPomodoro() {
  document.getElementById("timerStart").addEventListener("click", startTimer);
  document.getElementById("timerPause").addEventListener("click", pauseTimer);
  document.getElementById("timerReset").addEventListener("click", resetTimer);

  document.querySelectorAll(".session-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".session-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      currentSession = btn.getAttribute("data-session");
      resetTimer();
    });
  });

  updateTimerDisplay();
}

const FALLBACK_QUOTES = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
  {
    text: "Small deeds done are better than great deeds planned.",
    author: "Peter Marshall",
  },
  {
    text: "Discipline is choosing between what you want now and what you want most.",
    author: "Abraham Lincoln",
  },
];

function setQuote(text, author) {
  document.getElementById("quoteText").textContent = text;
  document.getElementById("quoteAuthor").textContent = author
    ? "— " + author
    : "";
}

function fetchQuote() {
  setQuote("Loading a quote…", "");
  fetch("https://api.quotable.io/random")
    .then(function (res) {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(function (data) {
      setQuote(data.content, data.author);
    })
    .catch(function () {
      const pick =
        FALLBACK_QUOTES[Math.floor(Math.random() * FALLBACK_QUOTES.length)];
      setQuote(pick.text, pick.author);
    });
}

function initQuote() {
  document.getElementById("newQuoteBtn").addEventListener("click", fetchQuote);
  fetchQuote();
}

const WEATHER_CODES = {
  0: { label: "Clear sky", icon: "☀" },
  1: { label: "Mostly clear", icon: "🌤" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁" },
  45: { label: "Fog", icon: "🌫" },
  48: { label: "Fog", icon: "🌫" },
  51: { label: "Light drizzle", icon: "🌦" },
  53: { label: "Drizzle", icon: "🌦" },
  55: { label: "Dense drizzle", icon: "🌦" },
  61: { label: "Light rain", icon: "🌧" },
  63: { label: "Rain", icon: "🌧" },
  65: { label: "Heavy rain", icon: "🌧" },
  71: { label: "Light snow", icon: "❄" },
  73: { label: "Snow", icon: "❄" },
  75: { label: "Heavy snow", icon: "❄" },
  80: { label: "Rain showers", icon: "🌦" },
  81: { label: "Rain showers", icon: "🌦" },
  82: { label: "Violent showers", icon: "🌧" },
  95: { label: "Thunderstorm", icon: "⛈" },
  96: { label: "Thunderstorm, hail", icon: "⛈" },
  99: { label: "Thunderstorm, hail", icon: "⛈" },
};

function describeWeatherCode(code) {
  return WEATHER_CODES[code] || { label: "Unknown", icon: "◐" };
}

function renderWeather(data, locationName) {
  const current = data.current;
  const info = describeWeatherCode(current.weather_code);
  const temp = Math.round(current.temperature_2m) + "°";

  document.getElementById("weatherIcon").textContent = info.icon;
  document.getElementById("weatherTemp").textContent = temp;
  document.getElementById("weatherLoc").textContent = locationName;

  document.getElementById("weatherCardIcon").textContent = info.icon;
  document.getElementById("weatherCardTemp").textContent = temp;
  document.getElementById("weatherCardCond").textContent = info.label;
  document.getElementById("weatherCardLoc").textContent = locationName;
  document.getElementById("weatherHumidity").textContent =
    Math.round(current.relative_humidity_2m) + "%";
  document.getElementById("weatherWind").textContent =
    Math.round(current.wind_speed_10m) + " km/h";
  document.getElementById("weatherFeels").textContent =
    Math.round(current.apparent_temperature) + "°";
  document.getElementById("weatherPrecip").textContent =
    current.precipitation.toFixed(1) + " mm";
}

function showWeatherError() {
  document.getElementById("weatherLoc").textContent = "Unavailable";
  document.getElementById("weatherCardCond").textContent =
    "Weather data unavailable right now";
}

function fetchWeather(latitude, longitude, locationName) {
  const url =
    "https://api.open-meteo.com/v1/forecast?latitude=" +
    latitude +
    "&longitude=" +
    longitude +
    "&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code,precipitation" +
    "&timezone=auto";

  document.getElementById("weatherCardCond").textContent =
    "Fetching conditions…";

  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("Request failed");
      return res.json();
    })
    .then(function (data) {
      renderWeather(data, locationName);
    })
    .catch(showWeatherError);
}

function loadWeather() {
  if (!navigator.geolocation) {
    fetchWeather(
      FALLBACK_LOCATION.latitude,
      FALLBACK_LOCATION.longitude,
      FALLBACK_LOCATION.name,
    );
    return;
  }
  navigator.geolocation.getCurrentPosition(
    function (position) {
      fetchWeather(
        position.coords.latitude,
        position.coords.longitude,
        "Your location",
      );
    },
    function () {
      fetchWeather(
        FALLBACK_LOCATION.latitude,
        FALLBACK_LOCATION.longitude,
        FALLBACK_LOCATION.name,
      );
    },
    { timeout: 8000 },
  );
}

function initWeather() {
  document
    .getElementById("refreshWeatherBtn")
    .addEventListener("click", loadWeather);
  loadWeather();
}

function updateClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clockTime").textContent =
    hours + ":" + minutes + ":" + seconds;

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateLabel =
    days[now.getDay()] +
    ", " +
    now.getDate() +
    " " +
    months[now.getMonth()] +
    " " +
    now.getFullYear();
  document.getElementById("clockDate").textContent = dateLabel;
}

function initClock() {
  updateClock();
  window.setInterval(updateClock, 1000);
}

const BACKGROUND_GRADIENTS = {
  morning:
    "radial-gradient(circle at 20% 0%, rgba(232,163,61,0.22), transparent 55%), radial-gradient(circle at 85% 20%, rgba(79,184,166,0.16), transparent 45%)",
  afternoon:
    "radial-gradient(circle at 20% 0%, rgba(79,184,166,0.2), transparent 55%), radial-gradient(circle at 85% 10%, rgba(232,163,61,0.14), transparent 45%)",
  evening:
    "radial-gradient(circle at 25% 10%, rgba(232,99,111,0.18), transparent 55%), radial-gradient(circle at 80% 25%, rgba(232,163,61,0.16), transparent 45%)",
  night:
    "radial-gradient(circle at 30% 0%, rgba(79,184,166,0.14), transparent 55%), radial-gradient(circle at 80% 20%, rgba(44,53,96,0.4), transparent 45%)",
};

function currentTimeCategory(hour) {
  if (hour >= 5 && hour < 11) return "morning";
  if (hour >= 11 && hour < 17) return "afternoon";
  if (hour >= 17 && hour < 20) return "evening";
  return "night";
}

function updateHeroGreeting() {
  const now = new Date();
  const category = currentTimeCategory(now.getHours());
  const greetings = {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    night: "Good night",
  };

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dateLabel =
    days[now.getDay()] + ", " + now.getDate() + " " + months[now.getMonth()];

  document.getElementById("heroEyebrow").textContent = dateLabel;
  document.getElementById("heroGreeting").textContent =
    greetings[category] + " — what are we tackling today?";

  const pendingTodos = todos.filter(function (t) {
    return !t.completed;
  }).length;
  const pendingGoals = goals.filter(function (g) {
    return !g.completed;
  }).length;
  let subtitle;
  if (pendingTodos === 0 && pendingGoals === 0) {
    subtitle =
      "Nothing urgent on the board right now — a good moment to plan ahead.";
  } else {
    const parts = [];
    if (pendingTodos > 0)
      parts.push(pendingTodos + (pendingTodos === 1 ? " task" : " tasks"));
    if (pendingGoals > 0)
      parts.push(pendingGoals + (pendingGoals === 1 ? " goal" : " goals"));
    subtitle = "You have " + parts.join(" and ") + " still open.";
  }
  document.getElementById("heroSub").textContent = subtitle;
}

function applyDynamicBackground() {
  const hour = new Date().getHours();
  const category = currentTimeCategory(hour);
  const layer = document.getElementById("bgLayer");
  layer.style.backgroundImage = BACKGROUND_GRADIENTS[category];
  updateHeroGreeting();
}

function initDynamicBackground() {
  applyDynamicBackground();
  window.setInterval(applyDynamicBackground, 10 * 60 * 1000);
}

function initTheme() {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem(STORAGE_KEYS.theme);
  const isLight = saved === "light";
  toggle.setAttribute("aria-pressed", String(isLight));

  toggle.addEventListener("click", function () {
    const currentlyLight =
      document.documentElement.getAttribute("data-theme") === "light";
    if (currentlyLight) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem(STORAGE_KEYS.theme, "dark");
      toggle.setAttribute("aria-pressed", "false");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem(STORAGE_KEYS.theme, "light");
      toggle.setAttribute("aria-pressed", "true");
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initNavigation();
  initTheme();
  initClock();
  initDynamicBackground();
  initTodo();
  initPlanner();
  initGoals();
  initPomodoro();
  initQuote();
  initWeather();
});
