import { useState } from "react";
import { inputsValidation } from "../../../utils/constants";

function SearchForm({states, handlers, stateSetters, validator}) {

  const handleCheckboxClick = (e) => {
    if (e.target.checked) {
      stateSetters.setShorts(true)
    } else {
      stateSetters.setShorts(false)
    }
  }

  return(
    <form className="search-form" onSubmit={validator.handleSubmit(handlers.handleCardSearch)}>
      <input className="search-form__input"
        placeholder="Фильм"
        {...validator.register("search", inputsValidation.search)}
      />
      <button className="search-form__submit-btn button-opacity" type="submit" disabled={!validator.isValid}></button>
      {
        validator.isValid &&
          validator.errors?.['search'] && 
          <span className="search-form__error">{
            validator.errors?.["email"]?.message || "Ошибка валидации запроса!"
          }</span>
      }
      <div className="search-form__switch">
        <label className="search-form__switch-box" htmlFor="short-checkbox">
          <input className="search-form__checkbox" type="checkbox" id="short-checkbox" onClick={handleCheckboxClick}/>
          <div className="search-form__switch-slider"></div>
        </label>
        <p className="search-form__short-title">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
            