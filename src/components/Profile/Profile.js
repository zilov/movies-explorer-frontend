import { useState } from "react";
import { INPUTS_VALIDATION } from "../../utils/constants";

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
        setIsValid(false);
        return false;
      }
      setIsValid(true);
      return true;
    } else {
      setIsValid(false);
      return false
    }
  }

  const handleEditSubmit = async ({name, email}) => {
    onEdit(name, email).then((res) => {
      console.log(res);
    if (res) {
      setEdit(false);
      setErrorOnEdit(false);
      setEditSuccess(true);
    } else {
      setErrorOnEdit(true); 
    }
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
              ...INPUTS_VALIDATION.firstName,
              onChange: () => {
                handleIsValid();
              }
            })}
            />
        </div>
        {
            validator.errors?.["name"] && 
              <span className="profile__info-input-err">
                {validator.errors?.['name']?.message || "Ошибка валидации имени!"}
              </span>
        }
        <div className="profile__info-block">
          <h3 className="profile__info-key">E-mail</h3>
          <input 
            className="profile__info-input"
            defaultValue={currentUser.email}
            disabled={!edit}
            {...validator.register("email", {
              ...INPUTS_VALIDATION.email,
              onChange: () => {
                handleIsValid();
              }
            })}
          />
        </div>
        {
          validator.errors?.["email"] && 
            <span className="profile__info-input-err">
              {validator.errors?.['email']?.message || "Ошибка валидации e-mail!"}
            </span>
        }
        <article className="profile-form__submit-box">
          {editSuccess && <span className="profile__edit-success">Данные успешно обновлены!</span>}
          {errorOnEdit && <span className="profile__edit-error">
            {states.error.message || 'Ошибка при сохранении новых данных профиля!'}
          </span>}
          {
            edit
              && <button className="profile__edit-btn link-opacity" type="submit" disabled={!isValid}>Сохранить</button>
          }
          { edit || <button className="profile__edit-btn link-opacity" type="button" onClick={toggleEdit}>Редактировать</button>}
        </article>
      </form>
      <button className="profile__logout-btn link-opacity" type="button" onClick={handleLogout}>Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
            