import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState } from "react";
import { INPUTS_VALIDATION } from "../../utils/constants";

function Login({handleLogin, validator}) {

  return(
    <section className="login">
      <div className="login__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="login__logo"/>
          </NavLink>
        <h2 className="login__title">Рады видеть!</h2>
        <form id="form-login" className="login__form" onSubmit={validator.handleSubmit(handleLogin)}>
          <FormSection
              validator={validator}
              header="E-mail"
              inputSettings={{
                type: "email",
                id: "email",
                validator: INPUTS_VALIDATION.email,
              }}
            />
          <FormSection
            validator={validator}
            header="Пароль"
            inputSettings={{
              type: "password",
              id: "password",
              validator: INPUTS_VALIDATION.password
            }}
          />
          <button type="submit" className="login__submit-btn button-opacity" disabled={!validator.isValid}>Войти</button>
        </form>
        <p className="login__paragraph">
          Еще не зарегистрированы?  <NavLink to="/signup" className="login__link link-opacity">Регистрация</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login;