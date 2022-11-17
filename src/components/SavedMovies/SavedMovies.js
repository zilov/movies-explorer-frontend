import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import SearchForm from "../Movies/SearchForm/SearchForm";

function SavedMovies({states, handlers, stateSetters, validator}) {
  return(
    <section className="saved-movies">
      <SearchForm
        states = {states}
        handlers = {handlers}
        stateSetters = {stateSetters}
        validator={validator}
      />
      <MoviesCardList
        states = {states}
        handlers = {handlers}
        stateSetters = {stateSetters}
      />
    </section>
  )
}

export default SavedMovies;
            