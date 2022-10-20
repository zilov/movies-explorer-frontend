import card_default_img from "../../../images/card_default_img.jpg";

function MoviesCard({cardType="search"}) {
  return(
    <div className="movies-card">
      <div className="movies-card__info-box">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <p className="movies-card__duration">1ч 47м</p>
      </div>
      <input type="checkbox" className="movies-card__checkbox"/>
      <button className={`movies-card__btn ${cardType === "search" ? "movies-card__btn_type_favorite" : "movies_card__btn_type_delete"} button-opacity`}/>
      <img className="movies-card__image" alt="обложка фильма" src={card_default_img}/>
    </div>
  )
}

export default MoviesCard;
            