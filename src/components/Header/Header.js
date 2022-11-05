import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({location}) {
  if (["/movies", "/saved-movies", "/profile", '/'].includes(location)) {
    return(
      <header className={
        `header 
        ${location !== "/" && "header_type_white"}`}>
        <div className="header__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="header__logo"/>
          </NavLink>
        </div>      
      </header>
    )
  } else {
    return null;
  }
}

export default Header;
            