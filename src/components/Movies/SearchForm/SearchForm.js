import { useState } from "react";

function SearchForm({cards, setFilteredCards, setShorts}) {
  const [search, setSearch] = useState('');

  const handleInput = (e) => {
    setSearch(e.target.value);
  }

  const filterCards = (e) => {
    e.preventDefault();
    const keys = ['nameRU', 'nameEN', 'director', 'country', 'year', 'description']
    setFilteredCards(
      cards.filter(card => {
        for (const key of keys) {
          if (card[key].toLowerCase().includes(search.toLowerCase())) {
            console.log(search, key, card[key]);
            return card;
          }
        }
      }
    )
  )}

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
          <input className="search-form__checkbox" type="checkbox" id="short-checkbox"/>
          <div className="search-form__switch-slider"></div>
        </label>
        <p className="search-form__short-title">Короткометражки</p>
      </div>
    </form>
  )
}

export default SearchForm;
            