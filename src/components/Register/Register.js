import FormSection from "../FormSection/FormSection";

function Register() {
  return(
    <div className="register">
      <FormSection header="Имя" id="form-register-name"/>
      <FormSection header="E-mail" id="form-register-email"/>
      <FormSection header="Пароль" id="form-register-password"/>
    </div>
  )
}

export default Register;
            