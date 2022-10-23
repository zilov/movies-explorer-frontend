import { NavLink } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";

function Navigation({location}) {
  if (["/movies", "/saved-movies", "/profile"].includes(location)) {
    const is_movies = location === "/movies";
    const is_saved = location === "/saved-movies"
    return(
      <nav className="navigation">
        <div className="navigation__content">
          <input type="checkbox" className='navigation__menu-btn-checkbox'/>
          <button className='navigation__menu-btn' type="button"/>
          <li className="navigation__menu">
            <NavLink to='/' className="navigation__menu-link link-opacity">Главная</NavLink>
            <NavLink to='/movies' className={`navigation__menu-link link-opacity ${is_movies && "navigation__menu-link_active"}`}>Фильмы</NavLink>
            <NavLink to='/saved-movies' className={`navigation__menu-link link-opacity ${is_saved && "navigation__menu-link_active"}`}>Сохраненные фильмы</NavLink>
            <NavLink to='/profile' className="navigation__menu-link link-opacity">
              <p>Аккаунт</p>
              <img src={accountIcon} alt="иконка профиля" className="navigation__profile-icon"/>
            </NavLink>
          </li>
          <div className="navigation__menu-opacity"/>
        </div>
      </nav>
      )
  } else {
    return null;
  }
}

export default Navigation;
            