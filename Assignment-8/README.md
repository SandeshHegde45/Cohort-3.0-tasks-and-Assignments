# FinTrack Pro

A personal finance tracker that runs entirely in your browser. No backend, no database, no build tools — open the HTML file and start tracking income and expenses immediately. All data is saved in `localStorage`, so it's still there the next time you open the app.

## Features

**Accounts & Auth**
- Register and log in with a username/password (stored in `localStorage`)
- Each user's data is kept separate and private to their account
- Session persists across page reloads until you log out

**Transactions**
- Add, edit, and delete income/expense entries with description, amount, date, and category
- Search transactions by description or category
- Filter by type (income / expense / all)
- Running totals for balance, total income, total expense, and transaction count

**Charts**
- Cash Flow Analysis — income vs. expense bar chart
- Spending by Category — doughnut chart of this month's expenses by category

**Smart Insights**
- Auto-generated, plain-language observations about your spending: top category this month, comparison to last month, savings rate, and call-outs when a category jumps sharply

**Budgets**
- Set a monthly spending limit per category, either from Settings or via the quick "+" button on the dashboard
- Live progress bars show spend vs. limit, color-coded (green / amber / red) as you approach or exceed a budget

**Preferences**
- Dark mode toggle (persisted across sessions)
- Per-user currency selection (USD, EUR, GBP, INR, JPY)
- Reset all data with one click

## File structure

```
auth.js          Registration, login, logout, and route-guarding logic
index.html       Main dashboard + settings app (requires login)
login.html       Login page
register.html    Registration page
script.js        All dashboard/app behavior (transactions, charts, budgets, insights)
style.css        Stylesheet (plain CSS version only — see "CSS versions" below)
```

## How data is stored

Everything lives in the browser's `localStorage`, scoped per username:

| Key | Contents |
|---|---|
| `registeredUsers` | All registered accounts (username, password, currency) |
| `user` | The currently logged-in session |
| `transactions_<username>` | That user's transactions |
| `budgets_<username>` | That user's category budgets |
| `theme` | Dark/light mode preference (shared across users on the same browser) |

Clearing your browser's site data, or using a different browser/device, will not carry your data over — there's no server, so nothing syncs.

## Notes

- All passwords are stored in plain text in `localStorage`. This is fine for a local learning project but should never be done in anything handling real user data — there's no hashing, no server-side validation, and anyone with access to the browser's dev tools can read it.
- Currency support is cosmetic (changes the symbol shown) and doesn't do any real exchange-rate conversion.
