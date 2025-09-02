//const heading = React.createElement("h1",{},"hello react");


// hierarchical structure through react
{/* <div id="parent">
        <div id="child1">
                <h1>i m h1 child1</h1>
                <h2>i m h2 child1</h2>
        </div>
        <div id="child2">
                <h1>i m h1 child2</h1>
                <h2>i m h2 child2</h2>
        </div>
</div> */}

import React from "react";
import ReactDOM from "react-dom/client";  
const parent = React.createElement("div", { id: "parent" },
        [React.createElement("div", { id: "child1" }, [React.createElement("h1", {}, "i m h1 child1"), React.createElement("h1", {}, "i m h2 child1")]), React.createElement("div", { id: "child2" }, [React.createElement("h1", {}, "i m h1 child2"), React.createElement("h1", {}, "i m h2 child2")])]
)
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(parent);