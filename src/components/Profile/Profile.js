import { useState } from "react";
import { inputsValidation } from "../../utils/constants";

function Profile({ onLogout, onEdit, states, validator }) {

  const [edit, setEdit] = useState(false);
  const [errorOnEdit, setErrorOnEdit] = useState(false);
  const [editSuccess, setEditSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const currentUser = states.currentUser;

  const toggleEdit = () => {
    setEdit(!edit);
  }

  const handleIsValid = () => {
    const name = validator.getValues().name;
    const email = validator.getValues().email;
    if (validator.isValid) {
      if (name === states.currentUser.name && email === states.currentUser.email) {
        return setIsValid(false);
      }
      return setIsValid(true);
    }
    return setIsValid(false);
  }

  const handleEditSubmit = ({name, email}) => {
    onEdit(name, email)
      .then(() => {
        setEdit(false);
        setErrorOnEdit(false);
        setEditSuccess(true);
      })
      .catch(() => {
        setErrorOnEdit(true);
      })
    setTimeout(() => {
      setEditSuccess(false);
      setErrorOnEdit(false);
    }, 5000)
  }

  const handleLogout = (e) => {
    e.preventDefault(); 
    onLogout();
  }

  return(
    <section className="profile">
      <h2 className="profile__header">Привет, {currentUser.name}!</h2>
      <form className="profile-form" onSubmit={validator.handleSubmit(handleEditSubmit)}>
        <div className="profile__info-block">
          <h3 className="profile__info-key">Имя</h3>
          <input 
            className="profile__info-input"
            defaultValue={currentUser.name}
            disabled={!edit}
            {...validator.register("name", {
              ...inputsValidation.firstName,
              onChange: () => {
                handleIsValid();
              }
            })}
            />
        </div>
        <div className="profile__info-block">
          <h3 className="profile__info-key">E-mail</h3>
          <input 
            className="profile__info-input"
            defaultValue={currentUser.email}
            disabled={!edit}
            {...validator.register("email", {
              ...inputsValidation.email,
              onChange: () => {
                handleIsValid();
              }
            })}
          />
        </div>
        {
          validator.isValid &&
            validator.errors?.['email'] 
            ? <span className="profile__edit-error">{validator.errors?.["email"]?.message || "Ошибка валидации e-mail!"}</span>
            : validator.errors?.['name'] && <span className="profile__edit-error">{validator.errors?.["name"]?.message || "Ошибка валидации имени!"}</span>
        }
        {editSuccess && <span className="profile__edit-success">Данные успешно обновлены!</span>}
        {errorOnEdit && <span className="profile__edit-error">Ошибка при сохранении новых данных профиля!</span>}
        {
          edit
            && <button className="profile__edit-btn link-opacity" type="submit" disabled={!isValid}>Сохранить</button>
        }
        { edit || <button className="profile__edit-btn link-opacity" type="button" onClick={toggleEdit}>Редактировать</button>}
      </form>
      <button className="profile__logout-btn link-opacity" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
            