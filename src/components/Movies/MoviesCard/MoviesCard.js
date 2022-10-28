function MoviesCard({cardType="search", title, duration, imageUrl}) {
  return(
    <article className="movies-card">
      <div className="movies-card__info-box">
        <h2 className="movies-card__title">{title}</h2>
        <p className="movies-card__duration">{duration}</p>
      </div>
      <input type="checkbox" className="movies-card__checkbox"/>
      <button type="button" className={`movies-card__btn ${cardType === "search" ? "movies-card__btn_type_favorite" : "movies_card__btn_type_delete"} button-opacity`}/>
      <img src={imageUrl} className="movies-card__image" alt="обложка фильма"/>
    </article>
  )
}

export default MoviesCard;
            