import { LOGO_URL } from "../utilis/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnName,setBtnName] = useState("login");
  console.log("render UI");
  return (
    <div className="header">
      <div className="logo-container">
        <img
          src={LOGO_URL}
          alt="App Logo"
          className="logo"
        />
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <li><Link to="/Grocery"> Grocery</Link></li>
          <button className="login" onClick={()=>{
            btnName === "login" ? setBtnName("logout") : setBtnName("login");
          }}
          >{btnName}</button>
        </ul>
      </div>
    </div>
  );
};

export default Header;