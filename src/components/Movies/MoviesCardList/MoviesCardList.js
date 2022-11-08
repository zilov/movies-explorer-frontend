import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList({states, handlers, stateSetters}) {
  
  return(
    <section className="movies-cards">
      <section className="movies-card-list">
        {
          states.location === "/movies" && states.searchText === ''
            ? <p className="movies-card-list__message">Введите ключевое слово</p>
            : states.preloader 
              ? <Preloader/> 
              : states.matchedCards.length === 0 
                ? <p className="movies-card-list__message">Ничего не найдено ;(</p>
                : states.cardsToRender.slice(0, states.visibleCards).map(item => {
                    return <MoviesCard
                    key={item.movieId}
                    isSaved={states.savedCards.some(card => {return card.movieId === item.movieId})}
                    cardInfo={item}
                    states={states}
                    handlers={handlers}
                    stateSetters={stateSetters}
                    />
                  })
        }
      </section>
      <button 
        className={
          `movies-card-list__more-btn 
          ${states.cardsLeft <= 0 && "movies-card-list__more-btn_hidden"}
          button-opacity`
        } 
        type="button"
        onClick={handlers.handleLoadMoreCards}
      >Ещё</button>
    </section>
  )
}

export default MoviesCardList;
            