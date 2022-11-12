import { useState } from "react";

function MoviesCard({cardInfo, states, handlers, stateSetters}) {

  
  const [isSaved, setIsSaved] = useState(states.savedCards.some(card => {return card.movieId === cardInfo.movieId}));
  
  const toggleSaveMovie = (e) => {
    if (states.location === '/movies') {
      if (isSaved) {
        console.log(states.savedCards);
        setIsSaved(false)
        handlers.handleCardDelete(states.savedCards.find(card => card.movieId === cardInfo.movieId));
      } else {
        handlers.handleCardSave(cardInfo);
        setIsSaved(true);
      }
    } else {
      handlers.handleCardDelete(states.savedCards.find(card => card.movieId === cardInfo.movieId));
    }
  }

  const convertMinutesToHours = (mins) => {
    if (mins > 60) {
      const hours = Math.floor(mins / 60);
      const minutes = mins % 60
      return `${hours}ч ${minutes}м` 
    } else {
      return `${mins}м`
    }
  }

  return(
    <article className="movies-card" id={cardInfo.id}>
      <div className="movies-card__info-box">
        <h2 className="movies-card__title">{cardInfo.nameRU}</h2>
        <p className="movies-card__duration">{convertMinutesToHours(cardInfo.duration)}</p>
      </div>
      <button type="button" onClick={toggleSaveMovie} className={
        `movies-card__btn
        ${states.location === "/movies" && isSaved && "movies-card__btn_active"} 
        ${states.location === "/movies" ? "movies-card__btn_type_favorite" : "movies_card__btn_type_delete"}
        button-opacity`
      }
      />
      <a href={cardInfo.trailerLink} target={"_blank"} rel="noreferrer" className="link-opacity">
        <img src={cardInfo.image} className="movies-card__image" alt="обложка фильма"/>
      </a>
    </article>
  )
}

export default MoviesCard;
            