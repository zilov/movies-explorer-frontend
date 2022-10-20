import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({cards_type="search"}) {
  return(
    <div className="movies-card-list">
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
      <MoviesCard cardType={cards_type}/>
    </div>
  )
}

export default MoviesCardList;
            