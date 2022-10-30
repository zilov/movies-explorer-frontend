import { useEffect, useState } from "react";
import { apiConfig } from "../../../utils/constants";
import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList({cards_type="search", states, handlers, stateSetters}) {

  const [cardsToRender, setCardsToRender] = useState(states.matchedCards);

  const convertMinutesToHours = (mins) => {
    if (mins > 60) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60
      return `${hours}ч ${minutes}м` 
    } else {
      return `${mins}м`
    }
  }

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
            id={item.id}
            cardType={cards_type}
            title={item.nameRU}
            duration={convertMinutesToHours(item.duration)}
            imageUrl={`${apiConfig.moviesImagesUrl}${item.image.url}`}
            onCardSave={handlers.handleCardSave}
            onCardDelete={handlers.handleCardDelete}
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
            