import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards_type="search"}) {
  return(
    <section className="movies-card-list">
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
    </section>
  )
}

export default MoviesCardList;
            