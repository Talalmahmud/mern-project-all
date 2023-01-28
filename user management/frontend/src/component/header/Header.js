import { NavLink } from "react-router-dom";
import "./header.css";
const Header = () => {
  return (
    <>
      <div className="header">
        <NavLink to="/">
          <h2>User management</h2>
        </NavLink>
      </div>
    </>
  );
};

export default Header;
