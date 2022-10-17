import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

function login() {
  return(
    <div className="login">
      <div className="login__content">
        <img src={logo} alt="Лого" className="login__logo"/>
        <h2 className="login__title">Рады видеть!</h2>
        <form id="form-login" className="login__form">
          <FormSection header="E-mail" id="form-login-email"/>
          <FormSection header="Пароль" id="form-login-password"/>
        </form>
        <button type="submit" className="login__submit-btn">Зарегистрироваться</button>
        <p className="login__paragraph">
          Еще не зарегистрированы?  <NavLink to="/signin" className="login__link">Регистрация</NavLink>
        </p>
      </div>
    </div>
  )
}

export default login;