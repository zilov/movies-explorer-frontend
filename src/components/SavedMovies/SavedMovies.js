import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies() {
  return(
    <section className="saved-movies">
      <SearchForm/>
      <MoviesCardList cards_type="saved"/>
    </section>
  )
}

export default SavedMovies;
            