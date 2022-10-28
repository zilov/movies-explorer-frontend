import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({cards}) {
  return(
  <section className="movies">
    <SearchForm/>
    <MoviesCardList
      cards={cards}
    />
  </section>
  )
}

export default Movies;
            