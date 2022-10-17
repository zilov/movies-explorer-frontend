import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies() {
  return(
  <div className="movies">
    <SearchForm/>
    <MoviesCardList/>
    <div className="movies__more-btn"></div>
  </div>
  )
}

export default Movies;
            