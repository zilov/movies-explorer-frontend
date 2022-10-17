import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";

function Register() {
  return(
    <div className="register">
      <div className="register__content">
        <img src={logo} alt="Лого" className="register__logo"/>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form id="form-register" className="register__form">
          <FormSection header="Имя" id="form-register-name"/>
          <FormSection header="E-mail" id="form-register-email"/>
          <FormSection header="Пароль" id="form-register-password"/>
        </form>
        <button type="submit" className="register__submit-btn">Зарегистрироваться</button>
        <p className="register__paragraph">
          Уже зарегистрированы?  <NavLink to="/signin" className="register__link">Войти</NavLink>
        </p>
      </div>
    </div>
  )
}

export default Register;
            