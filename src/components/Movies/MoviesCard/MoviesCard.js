import card_default_img from "../../../images/card_default_img.jpg";
import favorite_btn_inactive from "../../../images/favorite-btn-inactive.svg" 
import favorite_btn_active from "../../../images/favorite-btn-active.svg"

function MoviesCard() {
  return(
    <div className="movies-card">
      <div className="movies-card__info-box">
        <h2 className="movies-card__title">33 слова о дизайне</h2>
        <p className="movies-card__duration">1ч 47м</p>
      </div>
      <button className="movies-card__favorite-btn button-opacity" style={{backgroundImage: `url(${favorite_btn_active || favorite_btn_inactive})`}}/>
      <img className="movies-card__image" alt="обложка фильма" src={card_default_img}/>
    </div>
  )
}

export default MoviesCard;
            