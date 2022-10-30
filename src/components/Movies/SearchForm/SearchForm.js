import { useState } from "react";

function SearchForm({states, handlers, stateSetters}) {
  const [search, setSearch] = useState('');

  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  const handleCheckboxClick = (e) => {
    if (e.target.checked) {
      stateSetters.setShorts(true)
    } else {
      stateSetters.setShorts(false)
    }
  }

  const filterCards = (e) => {
    e.preventDefault();
    stateSetters.setPreloader(true);
    handlers.handleCardSearch(search);
    stateSetters.setPreloader(false);
  }

  return(
    <form className="search-form">
      <input className="search-form__input"
        type="text"
        id="searchInput"
        maxLength="30"
        placeholder="Фильм"
        onChange={handleInput}
        required
      />
      <button className="search-form__submit-btn button-opacity" type="submit" onClick={filterCards}></button>
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
            