# ⚛️ React Hooks & Router Deep Dive

This guide explains two of the most important React Hooks — **`useState`** and **`useEffect`** — in a beginner-friendly way, with examples and key rules.

---

## 🔹 `useState`

### 1. What it is

`useState` is a React hook that lets you **add state to functional components**.
State = data that changes over time and causes React to re-render.

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // initial value = 0

  return (
    <div>
      <p>Clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}
```

---

### 2. How it works

* `useState(initialValue)` returns an **array with two values**:

  1. Current state value
  2. Function to update it (`setState`)

* Updating state triggers **re-render** of the component.

---

### 3. Key points

* Initial state is used **only on first render**.
* State updates are **asynchronous** (React batches them).
* React compares old vs new state → if different, it re-renders.
* State updates don’t merge automatically (unlike class components).

```jsx
const [user, setUser] = useState({ name: "Akshat", age: 21 });

// ❌ overwrites whole object
setUser({ age: 22 });

// ✅ keeps other keys
setUser(prev => ({ ...prev, age: 22 }));
```

---

### 4. Functional updates

When new state depends on old state, use a **function updater**:

```jsx
setCount(prev => prev + 1);
```

This avoids **stale state issues** when multiple updates are batched.

---

### 5. Rules of Hooks (applies to `useState`, `useEffect`, etc.)

1. **Only call hooks at the top level** of your component.

   * ❌ Don’t put hooks inside loops, conditions, or nested functions.
   * ✅ Always call them in the same order.

2. **Only call hooks inside React functions**:

   * Functional components
   * Custom hooks

3. **Hooks must run in the same order every render.**

✅ Correct:

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  if (count > 5) {
    console.log("Count is big");
  }

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

❌ Wrong:

```jsx
function Counter() {
  if (Math.random() > 0.5) {
    const [count, setCount] = useState(0); // ❌ sometimes called
  }
}
```

---

## 🔹 `useEffect`

### 1. What it is

`useEffect` lets you run **side effects** in functional components.
Side effect = anything outside React’s render cycle (API calls, timers, event listeners, DOM changes).

---

### 2. Basic usage

```jsx
import { useEffect, useState } from "react";

function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect runs after every render");
  });

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

### 3. Dependency array (the magic ✨)

```jsx
useEffect(() => {
  // effect logic
}, [dependencies]);
```

* **No array** → runs after **every render**
* **Empty array `[]`** → runs **only once** (on mount)
* **\[count]** → runs when `count` changes
* **Multiple dependencies** → runs when any dependency changes

---

### 4. Cleanup

Effects can return a **cleanup function**:

```jsx
useEffect(() => {
  const id = setInterval(() => console.log("Tick"), 1000);

  return () => clearInterval(id); // cleanup
}, []);
```

Cleanup runs:

* Before the effect runs again
* On component unmount

---

### 5. Execution order

* `useEffect` runs **after render** is committed to the DOM.
* It is **non-blocking** → great for async tasks.
* `useLayoutEffect` runs **before paint** (for sync DOM updates).

---

### 6. Common pitfalls

* ❌ Missing dependencies → stale values.
* ❌ Updating state inside effect incorrectly → infinite loops.

Bad:

```jsx
useEffect(() => {
  setCount(count + 1); // infinite loop
}, [count]);
```

---

### 7. Analogy

Think of `useEffect` as:
👉 *“Run this code after render, but only when these things change.”*

---

### Example

```jsx
function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // runs once (on mount)

  return <p>Window width: {width}</p>;
}
```

---

## 🔑 Summary

### `useState`

* Manages state
* Provides `[value, setter]`
* Causes re-render when updated

### `useEffect`

* Runs side effects
* Dependency array controls execution
* Cleanup prevents memory leaks

---

This makes **`useState` + `useEffect`** the foundation of most React apps. 🚀


# 🌐 React Router DOM – Beginner Friendly Guide

---

## 2) What is `react-router-dom`?

### ✅ Definition

`react-router-dom` is a library in React that helps us handle **navigation and routing** in our web applications.

In simple words:
👉 It allows you to create multiple **pages** (like `/home`, `/about`, `/contact`) inside a **Single Page Application (SPA)** without reloading the browser.

---

### 🤔 Why do we need it?

Normally, when you click a link (`<a>` tag) in a website, the browser **reloads** the page and fetches it from the server.
But in a React app:

* We want **faster navigation**
* We don’t want to **reload the whole app**
* We want React to just **swap components** instead of reloading

This is exactly what `react-router-dom` gives us 🚀.

---

### ⚙️ How to install it

```bash
npm install react-router-dom
```

---

### 🔹 How we can use it in a project

We use `BrowserRouter` to wrap our app, and then define different **routes** using `Routes` and `Route`.

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## Why Routing Table?

### 🗂️ What is a Routing Table?

It’s just a list of **paths (URLs)** and their corresponding **components**.

Example:

* `/` → `Home` component
* `/about` → `About` component

### ✅ Why it is used?

* To organize navigation
* To tell React **which component to show for which URL**
* To avoid writing multiple `if/else` or conditions for paths

---

## 3) Special Hook: `useRouteError`

React Router provides a special hook called **`useRouteError`**.

### 👉 What it does:

It helps us catch **errors in routes** (like wrong path or failed data loading).

### Example:

```jsx
import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops! Something went wrong.</h1>
      <p>{error.statusText || error.message}</p>
    </div>
  );
}
```

This way, if a route fails, React shows a **friendly error message** instead of breaking the app.

---

## 4) What is `<Outlet />`?

### ✅ Definition

`<Outlet />` is a placeholder where **child routes** will be displayed.

Think of it like:
👉 “I’ll put something here later depending on the route.”

---

### Example

```jsx
<Route path="/dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

In `Dashboard.js`:

```jsx
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Outlet /> {/* Profile or Settings will render here */}
    </div>
  );
}
```

---

## 5) Why Never Use `<a>` Tag in React?

### ❌ Problem with `<a>` tag

* It **reloads the page** completely
* React app **loses its state**
* Slow and bad user experience

---

### ✅ Correct Way – Use `Link` from `react-router-dom`

```jsx
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
```

👉 This changes the route **without reloading** the app.
👉 The state is preserved.

---

## 6) Types of Routing in Web Apps

There are **two main types** of routing:

### 1️⃣ **Client-Side Routing (CSR)**

* Used in React (with `react-router-dom`)
* Only **one HTML file** (`index.html`)
* Navigation handled by **JavaScript**
* Faster, no reload

👉 Example: React SPA

---

### 2️⃣ **Server-Side Routing (SSR)**

* Every time you click a link, the **server sends a new page**
* Page reload happens
* Slower compared to CSR

👉 Example: Traditional PHP / Django / ASP.NET apps

---

## 🎯 Final Summary

* `react-router-dom` helps in **navigation** in React apps without reloading the page.
* We declare a **routing table** using `Routes` and `Route`.
* `useRouteError` hook handles **errors in routes**.
* `<Outlet />` lets us place **nested routes**.
* Don’t use `<a>`, use `<Link>` instead for navigation.
* Two routing types: **Client-side (SPA)** & **Server-side (traditional websites)**.

---
# 🔥 React – Page Refresh vs VS Code Save (Fast Refresh)

When working in React, you’ll notice a difference between **refreshing the page in the browser** and **saving your code in VS Code**. Let’s break it down step by step so even a beginner can clearly understand.

---

## 1️⃣ Case: Page Refresh (Browser Reload)

When you click **refresh** in the browser:

1. React app loads **fresh**.
2. **Initial render** → variables like `resInfo` are reset (e.g., `null`).

   * Console shows `[]` (empty).
3. `useEffect` runs, fetches data, calls `setResInfo`.
4. **Re-render** → `resInfo = json.data` is set.

   * Console now shows `(19) […]`.

---

### 👉 Result of Refresh

* **In production (without StrictMode):**
  You’ll see **2 renders**.

  1. Initial render (`resInfo = null`)
  2. Re-render after data fetch

* **In development (with StrictMode enabled):**
  React **intentionally double-runs effects** to catch bugs.
  You’ll see **3 renders** because `fetchMenu()` runs twice.

---

## 2️⃣ Case: Save in VS Code (Hot Reload / Fast Refresh)

When you **save your file in VS Code**:

* Your React dev server (Vite, CRA, Parcel, etc.) uses **Fast Refresh**.
* Fast Refresh does **not reload the entire app** like a browser refresh.
* Instead, it **patches the changed component in memory** and re-renders it.

---

### 🔹 What happens step by step?

1. You edit & save → React recompiles just that file.
2. Fast Refresh injects the new code into the running app.
3. The component **re-renders immediately**.
4. If state (`resInfo`) was already set earlier, it **doesn’t reset to null**.

   * You won’t see the full cycle (`null → fetch → data`) again.
5. You’ll just see the component re-render with preserved state.

⚠️ Exception: If you edited **hooks** (`useState`, `useEffect`, etc.), React may decide to **throw away state and remount** → this looks like a fresh load.

---

### 👉 Result of Save

* With Fast Refresh, **state is usually preserved**.
* Console won’t show `[]` again, only the final array of items.
* Depending on what you changed, you might see **1 or 2 re-renders**, not the full initial flow.

---

## 📝 How It Actually Works

* **Page refresh = full restart**

  * Component mounts fresh
  * State resets
  * Full render cycle (2 renders, or 3 in StrictMode)

* **VS Code save = hot reload (Fast Refresh)**

  * Code is patched in memory
  * State is often preserved
  * Only re-render(s), not a full mount cycle
  * If hooks are touched, React may reset state and remount

---

## ✅ Final Takeaway

* **Refresh in browser** → cold start, state resets, full lifecycle.
* **Save in VS Code** → hot reload, state is preserved (most of the time), only re-renders happen.

That’s why the behavior is different 🔥.

---

# 🔍 What is `useParams` in React Router?

When building apps with **React Router**, you often want to **read values from the URL**.
That’s where the hook **`useParams`** comes in.

---

## 🧩 What does it do?

`useParams` is a React Router hook that lets you **access dynamic parameters** from the current URL.

Example URL:

```
/users/42
```

Here, `42` is a **dynamic value** (user ID).
With `useParams`, you can grab that `42` inside your component.

---

## 📌 Example Usage

### Step 1: Define a Route with a Parameter

```jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* :id is a route parameter */}
        <Route path="/users/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

### Step 2: Use `useParams` Inside the Component

```jsx
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams(); // { id: "42" }

  return <h2>Showing profile of user {id}</h2>;
}
```

👉 If the URL is `/users/42`,
`useParams()` returns:

```js
{ id: "42" }
```

---

## 📝 Key Points (Beginner-Friendly)

* `useParams` returns an **object** with all URL parameters.
* The keys come from the `:something` you wrote in your route path.
* The values are always **strings** (even if they look like numbers).
* You can use these values to fetch data, display details, or pass them around.

---

## ✅ Final Takeaway

* `useParams` is like a tool to **read values from the URL**.
* Great for making **dynamic pages** (like user profiles, product details, blog posts).
* If your route is `/products/:productId`,
  → `useParams()` gives you `{ productId: "valueFromURL" }`.

It’s super useful whenever your React app needs to respond to **different URLs with different content**. 🚀
