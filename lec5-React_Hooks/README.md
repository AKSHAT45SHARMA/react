# React Q&A

## ❓ Question 1

Why does filtering an imported array in React
(`resList = resList.filter(...)`) not work, while filtering a locally
defined array does? How can this issue be fixed correctly?

### ✅ Answer

### 🔹 The Problem

-   When you define an array **inside a component**, like:

    ``` js
    let resList = [ ... ]; // local variable
    ```

    you can reassign it using:

    ``` js
    resList = resList.filter(...);
    ```

    This works because `resList` is just a local variable.

-   But when you **import** it:

    ``` js
    import resList from "../utilis/mock";
    ```

    and try:

    ``` js
    resList = resList.filter(...);
    ```

    it doesn't work.

------------------------------------------------------------------------

### 🔹 Why This Happens

-   **ES6 module imports are immutable bindings**.\

-   That means you **cannot reassign** an imported variable.\

-   Example:

    ``` js
    import resList from "./mock";
    resList = [] // ❌ not allowed
    ```

-   You *can* mutate contents if it's an object/array, but you cannot
    reassign the variable.

------------------------------------------------------------------------

### 🔹 Correct Fixes

#### ✅ Option 1: Make a local copy inside the component

``` jsx
import resList from "../utilis/mock";

const Body = () => {
  let localResList = [...resList]; // copy

  return (
    <div className="body">
      <button
        onClick={() => {
          localResList = localResList.filter(r => Number(r.data.avgRating) > 4);
          console.log(localResList);
        }}
      >
        Top Rated Restaurant
      </button>

      <div className="res-container">
        {localResList.map(r => (
          <RestaurantCard key={r.data.id} resData={r} />
        ))}
      </div>
    </div>
  );
};
```

------------------------------------------------------------------------

#### ✅ Option 2: Use React State (Best Practice)

``` jsx
import resList from "../utilis/mock";
import { useState } from "react";

const Body = () => {
  const [restaurants, setRestaurants] = useState(resList);

  return (
    <div className="body">
      <button
        onClick={() => {
          setRestaurants(restaurants.filter(r => Number(r.data.avgRating) > 4));
        }}
      >
        Top Rated Restaurant
      </button>

      <div className="res-container">
        {restaurants.map(r => (
          <RestaurantCard key={r.data.id} resData={r} />
        ))}
      </div>
    </div>
  );
};
```

------------------------------------------------------------------------

### 🔹 TL;DR

-   Local array → reassignment works.\
-   Imported array → cannot reassign (ES6 module rule).\
-   ✅ Fix: Either make a local copy, or better → use `useState`.

------------------------------------------------------------------------

## ❓ Question 2

The problem:

In your working version, you declared `resList` inside the component:

``` js
let resList = [ ... ]; // defined in Body.js
```

`resList` is a local variable.

When you do `resList = resList.filter(...)`, it works perfectly because
you're reassigning the local variable.

When you import `resList` from mock.js:

``` js
import resList from "../utilis/mock";
```

Modules in JS are **read-only views** of the exported values.\
You cannot reassign the imported `resList` in React (or JS modules).

So this line inside your component:

``` js
resList = resList.filter(r => Number(r.data.avgRating) > 4);
```

will not actually change the imported array --- it either throws an
error (if using const) or silently fails depending on bundler settings.

### 🔹 Why this happens:

-   **ES6 module imports are immutable bindings.**
-   You can mutate the contents of objects/arrays if they're objects,
    but reassigning the variable itself is not allowed.
-   So `resList.filter(...)` creates a new array --- but `resList = ...`
    tries to reassign the imported binding, which doesn't work.

### 🔹 Correct ways to fix it

**Option 1: Make a local copy in the component**

``` jsx
import resList from "../utilis/mock";

const Body = () => {
  let localResList = [...resList];

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            localResList = localResList.filter(r => Number(r.data.avgRating) > 4);
            console.log(localResList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {localResList.map(r => (
          <RestaurantCard key={r.data.id} resData={r} />
        ))}
      </div>
    </div>
  );
};
```

**Option 2: Use React state (recommended)**

``` jsx
import resList from "../utilis/mock";
import { useState } from "react";

const Body = () => {
  const [restaurants, setRestaurants] = useState(resList);

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            setRestaurants(restaurants.filter(r => Number(r.data.avgRating) > 4));
            console.log(restaurants);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      <div className="res-container">
        {restaurants.map(r => (
          <RestaurantCard key={r.data.id} resData={r} />
        ))}
      </div>
    </div>
  );
};
```

------------------------------------------------------------------------

### 🔹 TL;DR

-   Local array inside the component → `resList = resList.filter(...)`
    works.\
-   Imported array → you cannot reassign it.\
-   ✅ Fix: Copy it locally or use React state (`useState(resList)`).
