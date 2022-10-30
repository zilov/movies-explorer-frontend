import { useState } from "react";

function MoviesCard({cardType="search", id, checked, title, duration, imageUrl, onCardSave, onCardDelete}) {
  
  const toggleSaveMovie = (e) => {
    const cardId = e.target.closest(".movies-card").id;
    const isCardChecked = e.target.checked;
    if (isCardChecked) {
      onCardSave(cardId);
    } else {
      onCardDelete(cardId);
    }
  }

  return(
    <article className="movies-card" id={id}>
      <div className="movies-card__info-box">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <input type="checkbox" className="movies-card__checkbox" defaultChecked={checked} id={`${id}_input`} onClick={toggleSaveMovie}/>
      <button type="button" className={`movies-card__btn ${cardType === "search" ? "movies-card__btn_type_favorite" : "movies_card__btn_type_delete"} button-opacity`}/>
      <img src={imageUrl} className="movies-card__image" alt="обложка фильма"/>
    </article>
  )
}

export default MoviesCard;
            