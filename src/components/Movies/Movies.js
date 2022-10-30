import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({states, handlers, stateSetters}) {
  
  return(
  <section className="movies">
    <SearchForm
      states = {states}
      handlers = {handlers}
      stateSetters = {stateSetters}
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
            