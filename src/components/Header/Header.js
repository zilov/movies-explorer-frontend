import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

function Header() {
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
}

export default Header;
            