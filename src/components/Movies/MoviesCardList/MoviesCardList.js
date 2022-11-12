import { useEffect, useState } from "react";
import Preloader from "../../Preloader/Preloader";
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList({states, handlers, stateSetters}) {

  const [cardsList, setCardsList] = useState([]);
  const [cardsLeft, setCardsLeft] = useState([]);

  useEffect(() => {
    setCardsList(states.cardsToRender.slice(0, states.visibleCards));
    setCardsLeft(states.cardsToRender.slice(states.visibleCards));
  }, [states.cardsToRender])

  const handleCardsLeft = () => {
    if (cardsLeft.length < states.addCardNumber) {
      return [];
    } else {
      return cardsLeft.slice(states.addCardNumber)
    }
  } 

  const handleAddCards = () => {
    setCardsList(cardsList.concat(cardsLeft.slice(0, states.addCardNumber)));
    setCardsLeft(handleCardsLeft);
  }
  
  return(
    <section className="movies-cards">
      <section className="movies-card-list">
        {
          states.location === "/movies" && states.searchText === ''
            ? <p className="movies-card-list__message">Введите ключевое слово</p>
            : states.preloader 
              ? <Preloader/> 
              : states.cardsToRender.length === 0 
                ? <p className="movies-card-list__message">Ничего не найдено ;(</p>
                : cardsList.map(item => {
                    return <MoviesCard
                    key={item.movieId}
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
          ${cardsLeft.length <= 0 && "movies-card-list__more-btn_hidden"}
          button-opacity`
        } 
        type="button"
        onClick={handleAddCards}
      >Ещё</button>
    </section>
  )
}

export default MoviesCardList;
            