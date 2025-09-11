# 📘 React Basics & Best Practices

## 1) 📂 What is the src folder?

In almost every React project (and other frontend frameworks), the **src** folder means “source code”.

It contains all the code you write → components, styles, logic, assets.

When the project is built, bundlers like Webpack/Vite take the code from `src`, optimize it, and output it into a `build` (or `dist`) folder.

👉 **Industry convention:**
src/components/ → reusable components
src/pages/ → full page components
src/assets/ → images, icons, fonts
src/utils/ → helper functions
src/App.js → root component

pgsql
Copy code

---

## 2) ⚡ Restructuring App.js into components

When your app grows, you split UI into smaller components for readability.  
To share data/functions between files, you use **import/export**.

### Example

**Button.js**
```jsx
export default function Button({ text }) {
  return <button>{text}</button>;
}
App.js

jsx
Copy code
import Button from "./Button"; // importing default export

export default function App() {
  return <Button text="Click me!" />;
}
✅ Ways of sharing:

Props → pass data from parent to child.

State lifting → manage data in parent and pass down.

Context API → share data globally.

Custom Hooks → reusable logic.

3) 🚫 Hard-coded data in components
Best practice → don’t hardcode values inside components.
Instead, keep them in a separate file or fetch dynamically.

👉 Bad:

jsx
Copy code
function User() {
  return <p>Name: Akshat</p>;
}
👉 Good:

jsx
Copy code
const userData = { name: "Akshat" };

function User({ data }) {
  return <p>Name: {data.name}</p>;
}
4) 📦 Types of Export and Import
🔹 Default Export
Only one default export per file.

Imported without curly braces.

Use when file is about one main thing.

jsx
Copy code
// Button.js
export default function Button() {}

// App.js
import Button from "./Button";
🔹 Named Export
You can have multiple named exports.

Must be imported with curly braces.

jsx
Copy code
// utils.js
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// App.js
import { add, multiply } from "./utils";
👉 When to use:

Default → when one main export.

Named → when you have multiple utilities/functions/constants.



5) ❓ Can I use default + named export in same file?
Yes ✅ but not with the same variable name.

👉 Example:

jsx
Copy code
export default function Button() {}
export const SIZE = "large";

// Import
import Button, { SIZE } from "./Button";


6) 🪝 What are Hooks?
Hooks = special functions in React.

They let function components do things that only class components could do earlier (like state, lifecycle).

👉 Uses:

Manage state → useState

Run side effects → useEffect

Access context → useContext

Create reusable logic → custom hooks

👉 Where used?

Inside functional components.

Never inside loops or conditions (must always run in same order).



7) 🔥 useState() and useEffect()
🟢 useState
Lets you add state to a functional component.

jsx
Copy code
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
✅ Benefits: makes components interactive.

🟢 useEffect
Runs code when a component renders or updates.
Perfect for: fetching data, timers, subscriptions.

jsx
Copy code
import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []); // empty array = run only once

  return <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
✅ Benefits: run side effects without blocking UI.

👉 Import like this:

jsx
Copy code
import { useState, useEffect } from "react";


8) ⚡ Reconciliation, Virtual DOM, React Fiber & Diffing
🌐 Virtual DOM
A lightweight copy of the real DOM in memory.

React updates this first, then updates only the changed parts in the real DOM.

🔄 Reconciliation
The process React uses to compare old tree vs new tree and update only what changed.

🧮 Diffing Algorithm
Different element types → replace whole subtree.

Same type → update attributes + recurse children.

Use keys to track items in lists.

This makes updates very fast.

⚡ React Fiber
Fiber = new engine for reconciliation (introduced in React 16).

👉 Benefits:

Can pause work and resume later.

Can prioritize important updates (like animations).

Enables features like concurrent rendering.

✅ In short

Virtual DOM → blueprint of UI.

Reconciliation → process of updating efficiently.

Diffing algorithm → rules to compare old vs new.

React Fiber → advanced engine that makes reconciliation faster & smarter.