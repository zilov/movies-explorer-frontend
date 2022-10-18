import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useLocation } from "react-router";
// import Navigation from "../Navigation/Navigation";

function Header() {
  const location = useLocation();
  if (location.pathname === "/") {
    return(
      <div className="header">
        <div className="header__content">
          <img src={logo} alt="Лого" className="header__logo"/>
          <div className="header__links-box">
            <NavLink to="/signup" className="header__register-btn">Регистрация</NavLink>
            <NavLink to="/signin" className="header__login-btn">Войти</NavLink>
          </div>  
        </div>      
      </div>
    )
  } else if (["/movies", "/saved-movies", "/profile"].includes(location.pathname)) {
    return(
      <div className="header header_type_white">
        <div className="header__content">
          <img src={logo} alt="Лого" className="header__logo"/>
          {/* <Navigation/> */}
        </div>      
      </div>
    )
  } else {
    return null;
  }

}

export default Header;
            