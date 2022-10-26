import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState } from "react";

function Login({handleLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
    setEmail('');
    setPassword('');
  }

  return(
    <section className="login">
      <div className="login__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="login__logo"/>
          </NavLink>
        <h2 className="login__title">Рады видеть!</h2>
        <form id="form-login" className="login__form">
          <FormSection 
            header="E-mail"
            inputSettings={{
              type: "email",
              id: "loginEmailInput",
              maxLength:'100',
              setValue: setEmail
              }}
          />
          <FormSection
            header="Пароль"
            inputSettings={{
              type: "password",
              id: "loginPasswordInput",
              minLength:'8',
              setValue: setPassword
            }}
          />
          <button type="submit" className="login__submit-btn button-opacity" onClick={handleSubmit}>Войти</button>
        </form>
        <p className="login__paragraph">
          Еще не зарегистрированы?  <NavLink to="/signup" className="login__link link-opacity">Регистрация</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login;