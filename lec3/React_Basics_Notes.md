# React Basics - Complete Notes

This README covers all 12 concepts/questions in detail for beginners learning React.

---

## 1) Scripts in package.json
At development and production level, we configure commands in the **scripts** section of `package.json`.  
- `start` → used for development (`parcel index.html`)  
- `build` → used for production (`parcel build index.html`)  

So, instead of writing commands like `npx parcel index.html`, we can simply run:
```bash
npm run start
npm run build
```
👉 This is the **industry standard**.

---

## 2) What is React and ReactDOM?
- **React** → A JavaScript library for building user interfaces using components. It handles the creation of UI elements.
- **ReactDOM** → Provides DOM-specific methods that let React interact with the browser DOM.

---

## 3) Difference between React and ReactDOM
| React | ReactDOM |
|-------|----------|
| Core library for building UI | Handles rendering in the browser |
| Defines components and elements | Injects them into the DOM |
| Platform-agnostic | Specific to web browsers |

---

## 4) React Element Basics
- React Element is **not** an HTML element.  
- It is a plain **JavaScript object**.  
- React replaces everything inside the root (does not append).

Example:
```jsx
const heading = React.createElement("h1", { id: "heading" }, "Oye Akshat, React pad le");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(heading);
```

---

## 5) JSX
- JSX is created by **Facebook developers** as an easier way to write React elements.  
- JSX is **not HTML**, but looks similar.  
- JSX is transpiled into `React.createElement` under the hood.

Example:
```jsx
const jsxHeading = <h1 id="heading">Namaste React using JSX</h1>;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsxHeading);
```

---

## 6) How JSX Runs in Browser
- JS engine cannot understand JSX (not valid JS).  
- **Parcel + Babel** transpile JSX into pure JavaScript before execution.  
- Process:
```
JSX → React.createElement → React Element (JS Object) → Rendered as HTML DOM element
```

---

## 7) Difference Between HTML and JSX
- In JSX, syntax is slightly different.  
- Use `className` instead of `class`.  
- Properties are camelCase.  

Examples:

| HTML | JSX |
|------|-----|
| `<div class="box"></div>` | `<div className="box"></div>` |
| `<label for="name"></label>` | `<label htmlFor="name"></label>` |
| `<onclick="fn()">` | `<onClick={fn}>` |
| `<tabindex="1">` | `<tabIndex="1">` |
| `<maxlength="5">` | `<maxLength="5">` |
| `<stroke-width="2">` | `<strokeWidth="2">` |
| `<autoplay>` | `<autoPlay />` |
| `<readonly>` | `<readOnly />` |
| `<colspan="2">` | `<colSpan="2">` |
| `<cellpadding="5">` | `<cellPadding="5">` |
| `<frameborder="0">` | `<frameBorder="0">` |
| `<accesskey="a">` | `<accessKey="a">` |
| `<contenteditable>` | `<contentEditable />` |
| `<spellcheck>` | `<spellCheck />` |
| `<novalidate>` | `<noValidate />` |
| `<datetime="2020-01-01">` | `<dateTime="2020-01-01">` |

👉 For multiline JSX, wrap in `()`:
```jsx
const jsx = (
  <div>
    <h1>Hello</h1>
    <p>World</p>
  </div>
);
```

---

## 8) React Components
Components are reusable pieces of UI.  
**Naming Rule:** Start with a **capital letter**.

Types:
1. **Class-based Components** (old way)
```jsx
class MyComponent extends React.Component {
  render() {
    return <h1>Hello from Class Component</h1>;
  }
}
```

2. **Functional Components** (modern way)
```jsx
function MyComponent() {
  return <h1>Hello from Functional Component</h1>;
}
```

---

## 9) Component Composition
Using components inside other components (nesting).  
Example:
```jsx
function Header() {
  return <h1>This is Header</h1>;
}

function App() {
  return (
    <div>
      <Header />
      <p>This is body</p>
    </div>
  );
}
```

---

## 10) Using Curly Braces {}
Curly braces allow embedding JS expressions inside JSX.  
Example:
```jsx
const name = "Akshat";
const element = <h1>Hello, {name}!</h1>;
```

---

## 11) Ways of Combining Elements and Components

### i) React Element inside React Element
```jsx
const child = <span>Child</span>;
const parent = <div>{child}</div>;
```

### ii) React Element inside React Component
```jsx
const element = <h1>Hi</h1>;
function App() {
  return <div>{element}</div>;
}
```

### iii) React Component inside React Component
```jsx
function Child() {
  return <h2>Child Component</h2>;
}
function Parent() {
  return <div><Child /></div>;
}
```

### iv) React Component inside React Element
```jsx
function Child() {
  return <h2>Child Component</h2>;
}
const element = <div><Child /></div>;
```

---

## 12) JSX and Security (Injection Attacks)
- JSX automatically escapes values before rendering.  
- Prevents **Cross-Site Scripting (XSS)**.  
- Example:
```jsx
const malicious = "<img src=x onerror=alert('hacked') />";
const element = <div>{malicious}</div>; // renders as plain text, not HTML
```

👉 This makes JSX **safe by default**.

---

## ✅ Summary
- React = Library for UI, ReactDOM = DOM rendering.  
- JSX = Cleaner syntax, transpiled by Babel.  
- React Elements are objects → converted to HTML elements.  
- Components = Reusable blocks (functional preferred).  
- JSX protects against XSS by escaping values.  
