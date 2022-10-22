function SearchForm() {
  return(
    <form className="search-form">
      <input className="search-form__input" type="text" id="searchInput" maxLength="30" placeholder="Фильм" required/>
      <button className="search-form__submit-btn button-opacity" type="submit"></button>
      <div className="search-form__switch">
        <label className="search-form__switch-box" htmlFor="short-checkbox">
          <input className="search-form__checkbox" type="checkbox" id="short-checkbox"/>
          <div className="search-form__switch-slider"></div>
        </label>
        <p className="search-form__short-title">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
            