import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useState } from "react";
import { INPUTS_VALIDATION } from "../../utils/constants";

function Login({handleLogin, states, stateSetters, validator}) {

  const [errorOnLogin, setErrorOnLogin] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLoginSubmit = async ({email, password}) => {
    const res = await handleLogin({email, password});
    if (res) {
      setLoginSuccess(true);
    } else {
      setErrorOnLogin(true);
    }
    setTimeout(() => {
      setLoginSuccess(false);
      setErrorOnLogin(false);
      stateSetters.setError({});
    }, 5000)
  }

  return(
    <section className="login">
      <div className="login__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="login__logo"/>
          </NavLink>
        <h2 className="login__title">Рады видеть!</h2>
        <form id="form-login" className="login__form" onSubmit={validator.handleSubmit(handleLoginSubmit)}>
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
          <div className="login__submit-box">
            {loginSuccess && <span className="login__submit-success">Вход успешен!</span>}
            {errorOnLogin && <span className="login__submit-err">{states.error.message || 'Ошибка при попытке войти!'}</span>}
            <button type="submit" className="login__submit-btn button-opacity" disabled={!validator.isValid}>Войти</button>
          </div>
        </form>
        <p className="login__paragraph">
          Еще не зарегистрированы?  <NavLink to="/signup" className="login__link link-opacity">Регистрация</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Login;