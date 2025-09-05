import React from "react";
import Reactdom from "react-dom/client";

//React Element => object =>redered into dom => HTMLELEMENT
//react element is not a html element ..
//it create a object.

// this is very clumsy way to write like this type of code.but this is core of react..not development freindly.not readable.

// const heading = React.createElement("h1", { id: "heading" }, "oye akshat react pad le");
// const root = ReactDOM.createRoot(document.getElementById("root"));
// console.log(root);

//facebook develpo create JSX which is easy way to create/write react elememt.JSX is not a part of REACT. jsx is seperat ,react is seperate.
//this id not html.this is JSX.JSX is html like syntax.. 
// this jsx is react element..
// both code are totally same..

// const jsxHeading =(<h1 id="heading"> Namaste React using JSX</h1>);
// const root = ReactDOM.createRoot(document.getElementById("root"));

//React component(normal js function)-> 2 type
// class based component -> old way component
// functional based component -> new way component..
// function which return some JSX is called function component 




// const Title = () =>{
//    return <h1 className = "head">namaste jii</h1>
// };

const title = (
    1000
);
const HeadingComponent =() =>(
    <div id="container">
    {title}  
    <h1> Namaste React Functional Component</h1>
    </div>
);

// root.render(jsxHeading); REACT ELEMENT READER LIKE THIS ..
const root = Reactdom.createRoot(document.getElementById("root"));
root.render(<HeadingComponent/>);