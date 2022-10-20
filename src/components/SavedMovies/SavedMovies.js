import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies() {
  return(
    <div className="saved-movies">
      <SearchForm/>
      <MoviesCardList cards_type="saved"/>
  </div>
  )
}

export default SavedMovies;
            