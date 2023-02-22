import React from "react";
import { BsFacebook, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="left-footer">
        <h4>Download our App</h4>
        <p>Download app for android and ios mobiile phone</p>
      </div>
      <div className="middle-footer">
        <h1>Ecom</h1>
        <p>High quality is our first priority</p>
        <p>Copright 2023 @, Talal Mahmmud</p>
      </div>
      <div className="right-footer">
        <h4>Follow Us</h4>
        <Link>
          <BsFacebook />
        </Link>
        <Link>
          <BsInstagram />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
