import { useState } from "react";

function MoviesCard({isSaved, cardInfo, states, handlers, stateSetters}) {

  const [saved, setSaved] = useState(isSaved);
  
  const toggleSaveMovie = (e) => {
    if (saved) {
      setSaved(false);
      handlers.handleCardDelete(states.savedCards.find(card => card.movieId === cardInfo.movieId)._id);
      stateSetters.setSavedCards(states.savedCards.filter(card => {return card.movieId !== cardInfo.movieId}))
    } else {
      setSaved(true);
      handlers.handleCardSave(cardInfo).then((res) => {
        stateSetters.setSavedCards([res, ...states.savedCards])
      });
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
        ${states.location === "/movies" && saved && "movies-card__btn_active"} 
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
            