import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header({location}) {
  if (location === "/") {
    return(
      <div className="header">
        <div className="header__content">
          <img src={logo} alt="Лого" className="header__logo"/>
          <div className="header__links-box">
            <NavLink to="/signup" className="header__register-btn link-opacity">Регистрация</NavLink>
            <NavLink to="/signin" className="header__login-btn button-opacity">Войти</NavLink>
          </div>  
        </div>      
      </div>
    )
  } else if (["/movies", "/saved-movies", "/profile"].includes(location)) {
    return(
      <div className="header header_type_white">
        <div className="header__content">
          <img src={logo} alt="Лого" className="header__logo"/>
        </div>      
      </div>
    )
  } else {
    return null;
  }

}

export default Header;
            