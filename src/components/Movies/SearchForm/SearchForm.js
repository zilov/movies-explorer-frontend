import { useEffect, useState } from "react";

function SearchForm({states, handlers, stateSetters, validator}) {

  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (e) => {
    stateSetters.setSearchText(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (states.searchText.length > 0) {
      setIsValid(true);
      handlers.handleCardSearch(states.searchText)
    } else {
      setIsValid(false);
    }
  }

  const handleSliderClick = () => {
    stateSetters.setShorts(!states.shorts)
  }

  return(
    <form className="search-form" onSubmit={handleSubmit}>
      <input className="search-form__input"
        placeholder="Фильм"
        value={states.searchText}
        onChange={handleInputChange}
      />
      {!isValid && <span className="search-form__error">Нужно ввести ключевое слово</span>}
      <button className="search-form__submit-btn button-opacity" type="submit"></button>
      <div className="search-form__switch">
        <label className="search-form__switch-box" onClick={handleSliderClick}>
          <div 
            className={`search-form__switch-slider ${states.shorts && "search-form__switch-slider_active"}`}
          ></div>
        </label>
        <p className="search-form__short-title">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
            