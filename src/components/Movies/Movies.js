import { useEffect, useState } from "react";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import SearchForm from "./SearchForm/SearchForm";

function Movies({cards}) {

  const [filteredCards, setFilteredCards] = useState([]);
  const [shorts, setShorts] = useState(false);

  console.log(filteredCards);

  return(
  <section className="movies">
    <SearchForm
      cards={cards}
      setFilteredCards={setFilteredCards}
      setShorts={setShorts}
    />
    <MoviesCardList
      cards={filteredCards}
      shorts={shorts}
    />
  </section>
  )
}

export default Movies;
            