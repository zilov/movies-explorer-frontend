import { useEffect, useState } from "react";
import { apiConfig } from "../../../utils/constants";
import MoviesCard from "../MoviesCard/MoviesCard"


function MoviesCardList({cards_type="search", cards}) {

    // cards states and handlers
    const [width, setWidth] = useState(window.innerWidth);
    const [visibleCards, setVisibleCards] = useState(0);
    const [addCardNumber, setAddCardNumber] = useState(0);
  
    // setting max initial cards number on movies page 
    useEffect(() => {
      setWidth(window.innerWidth)
      if (width > 1279) {
        setVisibleCards(12);
        setAddCardNumber(3);
      } else if (width > 767) {
        setVisibleCards(8);
        setAddCardNumber(2);
      } else {
        setVisibleCards(5);
        setAddCardNumber(2);
      }
    }, [window.innerWidth]);

  const convertMinutesToHours = (mins) => {
    if (mins > 60) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60
      return `${hours}ч ${minutes}м` 
    } else {
      return `${mins}м`
    }
  }
  
  const loadMoreCards = () => {
    setVisibleCards(visibleCards + addCardNumber)
  }


  return(
    <section className="movies-cards">
      <section className="movies-card-list">
        {cards.slice(0, visibleCards).map(item => {
          return <MoviesCard
            cardType={cards_type}
            title={item.nameRU}
            duration={convertMinutesToHours(item.duration)}
            imageUrl={`${apiConfig.moviesImagesUrl}${item.image.url}`}
          />
        })}
      </section>
      <button className="movies-card-list__more-btn button-opacity" type="button" onClick={loadMoreCards}>Ещё</button>
    </section>
  )
}

export default MoviesCardList;
            