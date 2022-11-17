import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({states, handlers, stateSetters, validator}) {
  
  return(
  <section className="movies">
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

export default Movies;
            