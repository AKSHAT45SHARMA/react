# 📘 React Class Components – Complete Beginner Guide

This guide explains everything about **class-based components** in React: syntax, props, state, lifecycle methods, cleanup, and more. It is written in a way that even beginners can understand.

---

## 1️⃣ What is a Class-Based Component?

A **class-based component** is a way to define a React component using **ES6 classes** instead of functions.

👉 In simple words:
It is a **JavaScript class** that **extends** (`inherits from`) `React.Component` and **must** have a `render()` method that returns JSX.

---

### ✅ Syntax

```jsx
import React from "react";

class MyComponent extends React.Component {
  render() {
    return <h1>Hello from Class Component</h1>;
  }
}

export default MyComponent;
```

### 🔎 Explanation (word by word)

* `class MyComponent` → Creates a new class named `MyComponent`.
* `extends React.Component` → Inherits all features from `React.Component` so it can act like a React component.
* `render()` → A **required method** in every class component. It tells React **what to display** (JSX).
* `return <h1>...</h1>` → The actual UI output.

---

## 2️⃣ The `render()` Method

* `render()` is a **mandatory method** in class components.
* It **returns JSX** (the UI).
* It is called **every time the component is rendered/re-rendered**.

```jsx
class Greeting extends React.Component {
  render() {
    return <p>Welcome to React Class Components</p>;
  }
}
```

---

## 3️⃣ Props in Class Components

Props (short for **properties**) are used to **pass data from parent → child** component.

### Sending Props

```jsx
<Child name="Akshat" age={22} />
```

### Receiving Props in Class Component

```jsx
class Child extends React.Component {
  render() {
    return (
      <div>
        <h1>Name: {this.props.name}</h1>
        <h2>Age: {this.props.age}</h2>
      </div>
    );
  }
}
```

🔎 Explanation:

* `this.props` → Holds all props passed from parent.
* `{this.props.name}` → Accessing `name` prop.

---

## 4️⃣ State in Class Components

Unlike props (read-only), **state is internal & changeable**.

### Declaring State

```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props); // Must call super(props) before using `this`
    this.state = {
      count: 0
    };
  }

  render() {
    return <h2>Count: {this.state.count}</h2>;
  }
}
```

### Updating State

```jsx
this.setState({ count: this.state.count + 1 });
```

🔎 Explanation:

* `this.state` → Holds state variables.
* `this.setState()` → Updates state **and triggers re-render**.

---

## 5️⃣ Lifecycle of Class Components

A class component has **lifecycle phases**:

1. **Mounting** (component is created & added to DOM)

   * `constructor()`
   * `render()`
   * `componentDidMount()`

2. **Updating** (when props/state changes → re-render)

   * `render()`
   * `componentDidUpdate()`

3. **Unmounting** (when component is removed)

   * `componentWillUnmount()`

---

### Lifecycle Diagram

```
Mounting                Updating                 Unmounting
---------               ---------                -----------
constructor()           render()                 componentWillUnmount()
render()                componentDidUpdate()
componentDidMount()
```

---

## 6️⃣ `componentDidMount()`

* Called **once after the first render**.
* Used for:

  * Fetching data from APIs
  * Starting timers/intervals
  * Adding event listeners

```jsx
componentDidMount() {
  console.log("Component mounted!");
}
```

---

## 7️⃣ Example: Multiple Child Components

```jsx
class Child extends React.Component {
  constructor(props) {
    super(props);
    console.log("Child Constructor:", props.name);
  }

  componentDidMount() {
    console.log("Child Mounted:", this.props.name);
  }

  render() {
    console.log("Child Render:", this.props.name);
    return <h2>Child: {this.props.name}</h2>;
  }
}

class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child name="One" />
        <Child name="Two" />
        <Child name="Three" />
      </div>
    );
  }
}
```

### React Batching

* React batches updates → All children `render()` first.
* Then `componentDidMount()` is called for each child.

**Order:**

1. Constructor of all children
2. Render of all children
3. `componentDidMount()` for all children

---

## 8️⃣ `componentWillUnmount()`

* Called **just before component is removed from DOM**.
* Used for **cleanup**:

  * Clearing timers/intervals
  * Removing event listeners

```jsx
componentWillUnmount() {
  console.log("Component is being removed");
  clearInterval(this.timer); // cleanup
}
```

---

## 9️⃣ SPA (Single Page Application) – Cons

SPA loads only **one HTML page** and updates UI dynamically.
**Problem:** Background tasks (like `setInterval`) may continue running if not cleaned up.

```jsx
componentDidMount() {
  this.timer = setInterval(() => {
    console.log("Running...");
  }, 1000);
}

componentWillUnmount() {
  clearInterval(this.timer); // Prevent memory leak
}
```

If you don’t clean it → The interval runs **forever** even after navigating away → **memory leak**.

---

## 🔟 Cleanup in Class vs Functional Components

### Class Component Cleanup

```jsx
componentWillUnmount() {
  clearInterval(this.timer);
}
```

### Functional Component Cleanup

```jsx
useEffect(() => {
  const timer = setInterval(() => console.log("Running..."), 1000);

  return () => {
    clearInterval(timer); // cleanup
  };
}, []);
```

---

## 1️⃣1️⃣ Why Not `async` in `useEffect`?

---

## ❌ The Wrong Way

```jsx
useEffect(async () => {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  console.log(data);
}, []);
```

At first glance, this looks fine… but it actually causes problems.

---

## 🔎 Why is This Wrong?

The function you pass to `useEffect` should return either:

1. **Nothing** (`undefined`)
2. **A cleanup function** (for unmount/teardown)

But when you make the function `async`, it **always returns a Promise** (since every async function returns a Promise automatically).

👉 React sees the Promise and mistakenly treats it as a **cleanup function**, which is incorrect.
This can cause:

* Memory leaks
* Unexpected behavior

---

## ✅ The Correct Way – Define an Async Function Inside

Instead of making the effect itself async, you define an async function inside it and then call it:

```jsx
useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  };

  fetchData();
}, []);
```

### Explanation

* The outer function (`useEffect`) is **synchronous** ✅
* Inside, `fetchData` is async and handles the async logic ✅
* React doesn’t confuse it with a cleanup function ✅

---

## ⚡ Shortcut – Using an IIFE

You can also use an **Immediately Invoked Function Expression (IIFE)**:

```jsx
useEffect(() => {
  (async () => {
    const res = await fetch("https://api.example.com/data");
    const data = await res.json();
    console.log(data);
  })();
}, []);
```

### Explanation

* The effect itself is still **synchronous** ✅
* The async function runs immediately ✅

---

## 🎯 Key Takeaway

We **don’t use**:

```jsx
useEffect(async () => { ... }, []);
```

Because:

* React expects either `undefined` or a **cleanup function**
* An async function always returns a **Promise**
* This breaks React’s expectations and can cause **memory leaks**

✅ Instead, always:

* Define an **async function inside** `useEffect`, OR
* Use an **IIFE**

---

``
```

---

# 🎯 Key Takeaways

* Class components use `render()` to return JSX.
* Props are accessed via `this.props`.
* State is declared in constructor & updated via `this.setState`.
* Lifecycle: **Mount → Update → Unmount**.
* Always cleanup intervals, listeners in `componentWillUnmount` or `useEffect` cleanup.
* Never use `async` directly in `useEffect`.

---
