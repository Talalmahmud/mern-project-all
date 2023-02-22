import { ReactNavbar } from "overlay-navbar";
import React from "react";

const Header = () => {
  return (
    <div>
      <ReactNavbar
        logo="https://www.lunapic.com/editor/premade/transparent.gif"
        burgerColor="crimson"
        navColor1="#fff5f5"
        burgerColorHover="#900"
        logoWidth="50%"
        logoHoverColor="crimson"
        link1Size="1.2rem"
        link1Color="#121212"
        link1Padding="1vmax"
        link1ColorHover="crimson"
        nav2justifyContent="flex-end"
        link1Margin="1vmax"
        link2Margin="1vmax"
        link3Margin="1vmax"
        link4Margin="1vmax"
        nav3justifyContent="flex-start"
        link1Text="Home"
        link1Family="sans-serif"
        link2Text="Products"
        link3Text="About Us"
        link4Text="Contact Us"
        link1Url="/"
        link2Url="/products"
        link3Url="/about"
        link4Url="/contact"
        nav4justifyContent="flex-start"
        searchIconMargin="0.5vmax"
        cartIconMargin="1vmax"
        profileIconMargin="0.5vmax"
        searchIconColor="black"
        cartIconColor="#121212"
        profileIconColor="#121212"
        searchIconColorHover="crimson"
        cartIconColorHover="crimson"
        profileIconColorHover="crimson"
      />
    </div>
  );
};

export default Header;
