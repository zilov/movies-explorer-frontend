import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList({cards_type="search", states, handlers, stateSetters}) {

  const [cardsToRender, setCardsToRender] = useState(states.matchedCards);

  useEffect(() => {
    setCardsToRender(states.matchedCards.filter(card => {
      if (states.shorts && card.duration > 40) {
        return false;
      } else {
        return true;
      }
    }))
    console.log(cardsToRender);
  }, [states.shorts, states.matchedCards])
  
  return(
    <section className="movies-cards">
      <section className="movies-card-list">
        {cardsToRender.slice(0, states.visibleCards).map(item => {
          return <MoviesCard
          key={item.id}
          cardType={cards_type}
          isSaved={false}
          cardInfo={item}
          handlers={handlers}
          />
        })}
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
      <Preloader states={states}/>
    </section>
  )
}

export default MoviesCardList;
            