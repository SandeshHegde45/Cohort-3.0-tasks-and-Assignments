# DOM Task Manager

A fully interactive Task Manager built with **Vanilla HTML, CSS, and JavaScript** — no frameworks, no libraries.

---

## Concepts Explained

### Parsing

When the browser receives an HTML file, it reads the raw bytes and begins **parsing** — converting those bytes into a meaningful structure. Parsing is the process of analysing a sequence of symbols according to the rules of a grammar. The HTML parser works incrementally: it reads characters one by one, builds tokens, and constructs the DOM tree as it goes. If it encounters a `<script>` tag without `defer` or `async`, parsing pauses until the script executes.

---

### Tokenization

Before the parser can build a tree, it must first break the raw character stream into **tokens** — discrete units of meaning. Examples:
- `StartTag` token: `<div class="card">`
- `EndTag` token: `</div>`
- `Character` token: `Hello World`
- `DOCTYPE` token: `<!DOCTYPE html>`

Tokenization is the first stage of parsing. The tokenizer is a state machine that transitions between states (e.g., "Data state", "Tag open state", "Attribute name state") depending on what character it reads next.

---

### DOM Tree

The **Document Object Model (DOM)** is a tree-shaped in-memory representation of the HTML document. Each HTML element becomes a **Node** in the tree. Key node types:

| Node Type     | Example                    |
|---------------|----------------------------|
| Document      | The root                   |
| Element       | `<div>`, `<p>`, `<button>` |
| Text          | `"Hello World"`            |
| Comment       | `<!-- a comment -->`       |
| Attribute     | `class="card"`             |

JavaScript accesses and manipulates the DOM via the `document` object. Methods like `createElement()`, `appendChild()`, and `remove()` let us modify the tree dynamically, which triggers re-rendering.

---

### CSSOM Tree

Just as HTML is parsed into the DOM, CSS is parsed into the **CSS Object Model (CSSOM)** — a separate tree representing all style rules and their computed values. The browser must parse all CSS before it can render anything, because styles cascade (a rule defined later may override an earlier one). The CSSOM maps each selector to its resolved style properties.

---

### Render Tree

The **Render Tree** is constructed by combining the DOM tree and the CSSOM tree. It contains only the **visible nodes** — elements with `display: none` or `<head>` are excluded. Each node in the Render Tree holds both its DOM node and its computed CSS styles. This tree is what the browser uses to calculate layout and paint pixels.

**Pipeline:**
```
HTML → Tokenization → Parsing → DOM Tree ─┐
                                            ├──→ Render Tree → Layout → Paint → Composite
CSS  → Tokenization → Parsing → CSSOM Tree ┘
```

---

### Event Bubbling

When an event fires on a deeply nested element, it **bubbles up** — the event first triggers on the target element, then on its parent, then its grandparent, all the way up to the `document`. This is the default behaviour.

**Example order (bubbling):**
```
Child clicked → Child handler fires
             → Parent handler fires
             → Grandparent handler fires
```

In code, this is the default when you omit the third argument:
```js
element.addEventListener('click', handler); // bubbling (useCapture = false)
```

---

### Event Capturing

**Capturing** (also called the "trickling" phase) is the opposite of bubbling. The event starts at the `document` root and travels *down* the DOM tree to the target. Handlers registered with `useCapture = true` fire during this phase.

**Example order (capturing):**
```
Grandparent handler fires
→ Parent handler fires
→ Child handler fires
```

In code:
```js
element.addEventListener('click', handler, true); // capturing phase
```

---

### Event Delegation

**Event Delegation** means attaching a **single event listener to a parent element** instead of one listener per child. When any child fires an event, it bubbles up to the parent listener, which then checks `event.target` to decide what to do.

**Why it's better:**
- ✅ Works for dynamically added elements (no need to re-attach listeners)
- ✅ Uses far less memory (1 listener vs. potentially hundreds)
- ✅ Centralises logic

**In this project:**
```js
// ONE listener on the parent task list handles ALL task buttons:
taskList.addEventListener('click', function(event) {
  const btn = event.target.closest('[data-action]');
  if (!btn) return;
  const action = btn.getAttribute('data-action');
  if (action === 'complete') completeTask(id);
  if (action === 'edit')     startEdit(id);
  if (action === 'delete')   deleteTask(id);
});
```

---

## Features Implemented

| Feature                        | Status |
|-------------------------------|--------|
| Task Creation (DOM APIs)       | ✅     |
| Attributes vs Properties Demo  | ✅     |
| DOM Manipulation (all methods) | ✅     |
| Theme Toggle (dark/light)      | ✅     |
| Event Delegation               | ✅     |
| Event Propagation Demo         | ✅     |
| Browser Rendering Pipeline     | ✅     |
| Task Search                    | ✅     |
| Task Filter by Category/Status | ✅     |
| Pending/Completed Counters     | ✅     |
| Clear All Tasks                | ✅     |
| DocumentFragment               | ✅     |
| LocalStorage                   | ✅     |

## DOM Methods Used

`createElement` · `createTextNode` · `appendChild` · `append` · `prepend` · `before` · `after` · `replaceWith` · `remove` · `getAttribute` · `setAttribute` · `removeAttribute` · `hasAttribute` · `dataset` · `classList` · `querySelector` · `querySelectorAll` · `closest` · `createDocumentFragment`

## Files

```
task-manager/
├── index.html   — Structure & semantic markup
├── style.css    — Styling (CSS custom properties, dark/light themes)
├── app.js       — All JavaScript logic (heavily commented)
└── README.md    — This file
```
