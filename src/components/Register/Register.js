import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState } from "react";

function Register({handleRegister}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, name);
    handleRegister(email, password, name);
    setEmail("");
    setPassword("");
    setName("")
  }

  return(
    <section className="register">
      <div className="register__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="register__logo"/>
          </NavLink>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form id="form-register" className="register__form">
          <FormSection 
            header="Имя"
            inputSettings={{
              type: "text",
              id: "registerNameInput",
              placeholder: "Имя",
              minLength:"2",
              maxLength:'30',
              setValue: setName
              }}
          />
          <FormSection
            header="E-mail"
            inputSettings={{
              type: "email",
              id: "registerEmailInput",
              maxLength:'100',
              setValue: setEmail
              }}
          />
          <FormSection
            header="Пароль"
            inputSettings={{
              type: "password",
              id: "registerPasswordInput",
              minLength:'8',
              setValue: setPassword
            }}
          />
          <button type="submit" className="register__submit-btn button-opacity" onClick={handleSubmit}>Зарегистрироваться</button>
        </form>
        <p className="register__paragraph">
          Уже зарегистрированы?  <NavLink to="/signin" className="register__link link-opacity">Войти</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Register;
            