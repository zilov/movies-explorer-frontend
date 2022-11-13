import FormSection from "../FormSection/FormSection";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.svg";
import { INPUTS_VALIDATION } from "../../utils/constants";

function Register({handleRegister, validator}) {

  return(
    <section className="register">
      <div className="register__content">
          <NavLink to="/">
            <img src={logo} alt="Лого" className="register__logo"/>
          </NavLink>
        <h2 className="register__title">Добро пожаловать!</h2>
        <form id="form-register" className="register__form" onSubmit={validator.handleSubmit(handleRegister)}>
          <FormSection 
            validator={validator}
            header="Имя"
            inputSettings={{
              id: "name",
              validator: INPUTS_VALIDATION.firstName
            }}
          />
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
          <button 
            type="submit" className="register__submit-btn button-opacity" disabled={!validator.isValid}>Зарегистрироваться</button>
        </form>
        <p className="register__paragraph">
          Уже зарегистрированы?  <NavLink to="/signin" className="register__link link-opacity">Войти</NavLink>
        </p>
      </div>
    </section>
  )
}

export default Register;
            