import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
  return(
  <section className="movies">
    <SearchForm/>
    <MoviesCardList/>
    <button className="movies__more-btn button-opacity" type="button">Ещё</button>
  </section>
  )
}

export default Movies;
            