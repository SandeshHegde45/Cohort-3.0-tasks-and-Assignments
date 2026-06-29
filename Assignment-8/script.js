document.addEventListener("DOMContentLoaded", () => {
  let userProfile = JSON.parse(localStorage.getItem("user")) || {
    username: "Guest",
    currency: "$",
  };

  let storageKey = `transactions_${userProfile.username}`;
  let transactions = JSON.parse(localStorage.getItem(storageKey)) || [];
  let myChart = null;
  let myCategoryChart = null;

  let budgetStorageKey = `budgets_${userProfile.username}`;
  let categoryBudgets = JSON.parse(localStorage.getItem(budgetStorageKey)) || {};
  const BUDGET_CATEGORIES = [
    "Food & Dining",
    "Shopping",
    "Recharge & Bills",
    "Petrol & Auto",
    "Utilities",
    "Entertainment",
    "Other",
  ];

  const tableBody = document.getElementById("transactionTableBody");
  const balanceEl = document.getElementById("displayBalance");
  const incomeEl = document.getElementById("displayIncome");
  const expenseEl = document.getElementById("displayExpense");
  const countEl = document.getElementById("displayCount");
  const typeFilter = document.getElementById("typeFilter");

  const topbarName = document.getElementById("topbarName");
  const settingsForm = document.getElementById("settingsForm");
  const settingNameInput = document.getElementById("settingName");
  const settingCurrencyInput = document.getElementById("settingCurrency");

  const budgetForm = document.getElementById("budgetForm");
  const budgetFieldsContainer = document.getElementById("budgetFieldsContainer");
  const budgetOverviewList = document.getElementById("budgetOverviewList");
  const noBudgetsMsg = document.getElementById("noBudgetsMsg");

  const insightsList = document.getElementById("insightsList");
  const noCategoryDataMsg = document.getElementById("noCategoryDataMsg");

  const modal = document.getElementById("transactionModal");
  const addBtn = document.getElementById("openAddModalBtn");
  const closeBtn = document.querySelector(".close-modal");
  const form = document.getElementById("transactionForm");
  const modalTitle = document.getElementById("modalTitle");
  const searchInput = document.getElementById("searchInput");

  const budgetModal = document.getElementById("budgetModal");
  const openBudgetModalBtn = document.getElementById("openBudgetModalBtn");
  const closeBudgetModalBtn = document.getElementById("closeBudgetModal");
  const quickBudgetForm = document.getElementById("quickBudgetForm");
  const quickBudgetCategory = document.getElementById("quickBudgetCategory");
  const quickBudgetAmount = document.getElementById("quickBudgetAmount");

  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.replace("login.html");
    });
  }

  function initProfile() {
    topbarName.innerText = userProfile.username;
    settingNameInput.value = userProfile.username;
    settingCurrencyInput.value = userProfile.currency || "$";
  }
  initProfile();

  function renderBudgetFields() {
    budgetFieldsContainer.innerHTML = "";
    BUDGET_CATEGORIES.forEach((cat) => {
      const fieldWrap = document.createElement("div");
      fieldWrap.className = "form-group";
      const safeId = `budget_${cat.replace(/[^a-zA-Z0-9]/g, "")}`;
      fieldWrap.innerHTML = `
                <label for="${safeId}">${cat}</label>
                <input type="number" min="0" step="0.01" id="${safeId}" data-category="${cat}" placeholder="No limit">
            `;
      budgetFieldsContainer.appendChild(fieldWrap);
      const input = fieldWrap.querySelector("input");
      if (categoryBudgets[cat] !== undefined) {
        input.value = categoryBudgets[cat];
      }
    });
  }
  renderBudgetFields();

  const generateID = () => Math.floor(Math.random() * 1000000000);

  function updateUI(dataToRender = transactions) {
    tableBody.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;
    const cur = userProfile.currency || "$";

    dataToRender.forEach((tx) => {
      if (tx.type === "income") {
        totalIncome += tx.amount;
      } else {
        totalExpense += tx.amount;
      }

      const sign = tx.type === "income" ? "+" : "-";
      const colorClass = tx.type === "income" ? "text-green" : "text-red";
      const tr = document.createElement("tr");

      tr.innerHTML = `
                <td>${tx.date}</td>
                <td><strong>${tx.description}</strong></td>
                <td><span class="tag">${tx.category}</span></td>
                <td class="${colorClass}">${sign}${cur}${tx.amount.toFixed(2)}</td>
                <td>
                    <button class="action-btn btn-edit" onclick="editTransaction(${tx.id})"><i class="fa-solid fa-pen"></i></button>
                    <button class="action-btn btn-delete" onclick="deleteTransaction(${tx.id})"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
      tableBody.appendChild(tr);
    });

    const balance = totalIncome - totalExpense;
    balanceEl.innerText = `${balance < 0 ? "-" : ""}${cur}${Math.abs(balance).toFixed(2)}`;
    incomeEl.innerText = `${cur}${totalIncome.toFixed(2)}`;
    expenseEl.innerText = `${cur}${totalExpense.toFixed(2)}`;
    countEl.innerText = dataToRender.length;

    localStorage.setItem(storageKey, JSON.stringify(transactions));
    updateChart(totalIncome, totalExpense);
    updateBudgetOverview();
    updateCategoryChart();
    updateInsights(totalIncome, totalExpense);
  }

  function getCurrentMonthSpendByCategory() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const spendByCategory = {};

    transactions.forEach((tx) => {
      if (tx.type !== "expense") return;
      const txDate = new Date(tx.date);
      if (
        txDate.getMonth() === currentMonth &&
        txDate.getFullYear() === currentYear
      ) {
        spendByCategory[tx.category] =
          (spendByCategory[tx.category] || 0) + tx.amount;
      }
    });

    return spendByCategory;
  }

  function updateBudgetOverview() {
    const cur = userProfile.currency || "$";
    const activeBudgets = Object.entries(categoryBudgets).filter(
      ([, limit]) => limit !== null && limit !== undefined && limit !== "",
    );

    if (activeBudgets.length === 0) {
      budgetOverviewList.innerHTML =
        '<p class="text-muted" id="noBudgetsMsg" style="font-size: 13px;">No budgets set yet. Head to Settings to set monthly limits per category.</p>';
      return;
    }

    const spendByCategory = getCurrentMonthSpendByCategory();
    budgetOverviewList.innerHTML = "";

    activeBudgets.forEach(([cat, limit]) => {
      const spent = spendByCategory[cat] || 0;
      const limitNum = parseFloat(limit);
      const percent = limitNum > 0 ? Math.min((spent / limitNum) * 100, 100) : 0;
      const isOver = spent > limitNum;
      const barColor = isOver
        ? "var(--red-text)"
        : percent > 80
          ? "#d97706"
          : "var(--green-text)";

      const group = document.createElement("div");
      group.className = "progress-group";
      group.innerHTML = `
                <div class="progress-labels">
                    <span>${cat}</span>
                    <span class="${isOver ? "text-red" : ""}">${cur}${spent.toFixed(2)} / ${cur}${limitNum.toFixed(2)}</span>
                </div>
                <div class="progress-bar">
                    <div class="fill" style="width: ${percent}%; background-color: ${barColor};"></div>
                </div>
            `;
      budgetOverviewList.appendChild(group);
    });
  }

  function getPreviousMonthTotals() {
    const now = new Date();
    let prevMonth = now.getMonth() - 1;
    let prevYear = now.getFullYear();
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }

    let income = 0;
    let expense = 0;
    const spendByCategory = {};

    transactions.forEach((tx) => {
      const txDate = new Date(tx.date);
      if (txDate.getMonth() !== prevMonth || txDate.getFullYear() !== prevYear) {
        return;
      }
      if (tx.type === "income") {
        income += tx.amount;
      } else {
        expense += tx.amount;
        spendByCategory[tx.category] = (spendByCategory[tx.category] || 0) + tx.amount;
      }
    });

    return { income, expense, spendByCategory };
  }

  const CHART_COLORS = [
    "#1e40af",
    "#166534",
    "#991b1b",
    "#d97706",
    "#7c3aed",
    "#0891b2",
    "#be185d",
  ];

  function updateCategoryChart() {
    const ctx = document.getElementById("categoryChart").getContext("2d");
    const spendByCategory = getCurrentMonthSpendByCategory();
    const labels = Object.keys(spendByCategory);
    const values = Object.values(spendByCategory);

    if (myCategoryChart) {
      myCategoryChart.destroy();
      myCategoryChart = null;
    }

    if (labels.length === 0) {
      noCategoryDataMsg.style.display = "block";
      return;
    }
    noCategoryDataMsg.style.display = "none";

    myCategoryChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: labels.map((_, i) => CHART_COLORS[i % CHART_COLORS.length]),
            borderWidth: 2,
            borderColor: "var(--bg-card)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: { boxWidth: 12, font: { size: 11 } },
          },
        },
      },
    });
  }

  function buildInsights(totalIncome, totalExpense) {
    const insights = [];
    const cur = userProfile.currency || "$";
    const spendByCategory = getCurrentMonthSpendByCategory();
    const categoryEntries = Object.entries(spendByCategory);

    if (categoryEntries.length === 0) {
      insights.push({
        icon: "fa-circle-info",
        color: "var(--text-muted)",
        text: "Add a few transactions this month to start seeing personalized insights here.",
      });
      return insights;
    }

    const [topCategory, topAmount] = categoryEntries.reduce((max, entry) =>
      entry[1] > max[1] ? entry : max,
    );
    const topPercentOfExpense =
      totalExpense > 0 ? Math.round((topAmount / totalExpense) * 100) : 0;
    insights.push({
      icon: "fa-chart-pie",
      color: "var(--primary-blue-text)",
      text: `${topCategory} is your biggest expense this month at ${cur}${topAmount.toFixed(2)} (${topPercentOfExpense}% of total spending).`,
    });

    const { expense: prevExpense, spendByCategory: prevSpendByCategory } =
      getPreviousMonthTotals();
    if (prevExpense > 0) {
      const diffPercent = Math.round(
        ((totalExpense - prevExpense) / prevExpense) * 100,
      );
      if (Math.abs(diffPercent) >= 1) {
        const direction = diffPercent > 0 ? "more" : "less";
        insights.push({
          icon: diffPercent > 0 ? "fa-arrow-trend-up" : "fa-arrow-trend-down",
          color: diffPercent > 0 ? "var(--red-text)" : "var(--green-text)",
          text: `You've spent ${Math.abs(diffPercent)}% ${direction} than last month so far.`,
        });
      }
    }

    Object.entries(prevSpendByCategory || {}).forEach(([cat, prevAmt]) => {
      const currentAmt = spendByCategory[cat] || 0;
      if (prevAmt > 0 && currentAmt > prevAmt * 1.3) {
        const pct = Math.round(((currentAmt - prevAmt) / prevAmt) * 100);
        insights.push({
          icon: "fa-triangle-exclamation",
          color: "#d97706",
          text: `${cat} spending jumped ${pct}% compared to last month.`,
        });
      }
    });

    const savingsRate =
      totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : null;
    if (savingsRate !== null) {
      insights.push({
        icon: savingsRate >= 0 ? "fa-piggy-bank" : "fa-circle-exclamation",
        color: savingsRate >= 0 ? "var(--green-text)" : "var(--red-text)",
        text:
          savingsRate >= 0
            ? `You're saving ${savingsRate}% of your income this month. Nice work.`
            : `You're spending ${Math.abs(savingsRate)}% more than you're earning this month.`,
      });
    }

    return insights.slice(0, 4);
  }

  function updateInsights(totalIncome, totalExpense) {
    const insights = buildInsights(totalIncome, totalExpense);
    insightsList.innerHTML = "";

    insights.forEach((insight) => {
      const li = document.createElement("li");
      li.style.display = "flex";
      li.style.gap = "10px";
      li.style.alignItems = "flex-start";
      li.style.fontSize = "13px";
      li.style.lineHeight = "1.5";
      li.innerHTML = `
                <i class="fa-solid ${insight.icon}" style="color: ${insight.color}; margin-top: 2px;"></i>
                <span>${insight.text}</span>
            `;
      insightsList.appendChild(li);
    });
  }

  budgetForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputs = budgetFieldsContainer.querySelectorAll("input[data-category]");
    const newBudgets = {};
    inputs.forEach((input) => {
      const cat = input.dataset.category;
      if (input.value !== "") {
        newBudgets[cat] = parseFloat(input.value);
      }
    });

    categoryBudgets = newBudgets;
    localStorage.setItem(budgetStorageKey, JSON.stringify(categoryBudgets));
    updateBudgetOverview();
    alert("Budgets saved successfully!");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = document.getElementById("txId").value;
    const type = document.getElementById("txType").value;
    const description = document.getElementById("txDescription").value;
    const amount = parseFloat(document.getElementById("txAmount").value);
    const date = document.getElementById("txDate").value;
    const category = document.getElementById("txCategory").value;

    const newTx = {
      id: id ? parseInt(id) : generateID(),
      type,
      description,
      amount,
      date,
      category,
    };

    if (id) {
      transactions = transactions.map((tx) =>
        tx.id === newTx.id ? newTx : tx,
      );
    } else {
      transactions.push(newTx);
    }

    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
    closeModal();
    updateUI();
  });

  window.deleteTransaction = (id) => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      transactions = transactions.filter((tx) => tx.id !== id);
      updateUI();
    }
  };

  window.editTransaction = (id) => {
    const tx = transactions.find((t) => t.id === id);
    if (!tx) return;

    document.getElementById("txId").value = tx.id;
    document.getElementById("txType").value = tx.type;
    document.getElementById("txDescription").value = tx.description;
    document.getElementById("txAmount").value = tx.amount;
    document.getElementById("txDate").value = tx.date;
    document.getElementById("txCategory").value = tx.category;

    modalTitle.innerText = "Edit Transaction";
    modal.classList.add("active");
  };

  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const newName = settingNameInput.value;
    const newCurrency = settingCurrencyInput.value;

    if (newName !== userProfile.username) {
      const newStorageKey = `transactions_${newName}`;
      localStorage.setItem(newStorageKey, JSON.stringify(transactions));
      localStorage.removeItem(storageKey);
      storageKey = newStorageKey;

      const newBudgetStorageKey = `budgets_${newName}`;
      localStorage.setItem(newBudgetStorageKey, JSON.stringify(categoryBudgets));
      localStorage.removeItem(budgetStorageKey);
      budgetStorageKey = newBudgetStorageKey;
    }

    userProfile = {
      username: newName,
      currency: newCurrency,
    };

    localStorage.setItem("user", JSON.stringify(userProfile));

    initProfile();
    updateUI();
    alert("Settings saved successfully!");
  });

  const openModal = () => {
    form.reset();
    document.getElementById("txId").value = "";
    document.getElementById("txDate").valueAsDate = new Date();
    modalTitle.innerText = "Add Transaction";
    modal.classList.add("active");
  };
  const closeModal = () => modal.classList.remove("active");

  addBtn.addEventListener("click", openModal);
  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const openBudgetModal = () => {
    quickBudgetForm.reset();
    budgetModal.classList.add("active");
  };
  const closeBudgetModal = () => budgetModal.classList.remove("active");

  if (openBudgetModalBtn) {
    openBudgetModalBtn.addEventListener("click", openBudgetModal);
  }
  if (closeBudgetModalBtn) {
    closeBudgetModalBtn.addEventListener("click", closeBudgetModal);
  }
  window.addEventListener("click", (e) => {
    if (e.target === budgetModal) closeBudgetModal();
  });

  if (quickBudgetForm) {
    quickBudgetForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const cat = quickBudgetCategory.value;
      const limit = parseFloat(quickBudgetAmount.value);

      categoryBudgets[cat] = limit;
      localStorage.setItem(budgetStorageKey, JSON.stringify(categoryBudgets));

      renderBudgetFields();
      updateBudgetOverview();
      closeBudgetModal();
    });
  }

  document.getElementById("resetDataBtn").addEventListener("click", () => {
    if (
      confirm(
        "WARNING: This will delete all your transaction data permanently!",
      )
    ) {
      transactions = [];
      categoryBudgets = {};
      localStorage.setItem(budgetStorageKey, JSON.stringify(categoryBudgets));
      renderBudgetFields();
      updateUI();
    }
  });

  function updateChart(income, expense) {
    const ctx = document.getElementById("cashFlowChart").getContext("2d");
    if (myChart) {
      myChart.destroy();
    }
    myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Income vs Expenses"],
        datasets: [
          {
            label: "Income",
            data: [income],
            backgroundColor: "#166534",
            borderRadius: 4,
          },
          {
            label: "Expenses",
            data: [expense],
            backgroundColor: "#991b1b",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { position: "top" } },
      },
    });
  }

  const darkModeToggle = document.getElementById("darkModeToggle");
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-theme");
    darkModeToggle.checked = true;
  }
  darkModeToggle.addEventListener("change", (e) => {
    if (e.target.checked) {
      document.body.classList.add("dark-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      localStorage.setItem("theme", "light");
    }
  });

  const navItems = document.querySelectorAll(
    ".nav-menu .nav-item[data-target]",
  );
  const views = document.querySelectorAll(".view-section");
  navItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".nav-menu .nav-item")
        .forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
      views.forEach((view) => view.classList.remove("active"));
      document
        .getElementById(item.getAttribute("data-target"))
        .classList.add("active");
    });
  });

  function applyFilters() {
    const term = searchInput.value.toLowerCase();
    const filterType = typeFilter.value;

    const filtered = transactions.filter((tx) => {
      const matchesSearch =
        tx.description.toLowerCase().includes(term) ||
        tx.category.toLowerCase().includes(term);
      const matchesType = filterType === "all" || tx.type === filterType;
      return matchesSearch && matchesType;
    });

    updateUI(filtered);
  }

  searchInput.addEventListener("input", applyFilters);
  typeFilter.addEventListener("change", applyFilters);

  updateUI();
});
