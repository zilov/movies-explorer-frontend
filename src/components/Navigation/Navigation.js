import { NavLink } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";

function Navigation({states, stateSetters}) {

  const handleMenuClose = () => {
    stateSetters.setIsMenuOpen(false);
  }

  const handleCheckboxClick = (e) => {
    if (e.target.checked) {
      stateSetters.setIsMenuOpen(true)
    } else {
      stateSetters.setIsMenuOpen(false)
    }
  }
  
  if (["/movies", "/saved-movies", "/profile", '/'].includes(states.location)) {
    
    const is_movies = states.location === "/movies";
    const is_saved = states.location === "/saved-movies"
    const is_main = states.location === "/"


    return(
      <nav className="navigation">
        <div className="navigation__content">
          {
            !states.loggedIn 
              ? <div className="navigation__links-box">
                  <NavLink to="/signup" className="navigation__register-btn link-opacity">Регистрация</NavLink>
                  <NavLink to="/signin" className="navigation__login-btn button-opacity">Войти</NavLink>
                </div>
              : <>
                <input type="checkbox" className='navigation__menu-btn-checkbox' checked={states.isMenuOpen} onClick={handleCheckboxClick}/>
                <button className={`navigation__menu-btn ${is_main && "navigation__menu-btn_type_pink"}`} type="button"/>
                <li className="navigation__menu">
                  <NavLink to='/' className="navigation__menu-link link-opacity" onClick={handleMenuClose}>Главная</NavLink>
                  <NavLink 
                    to='/movies'
                    className={`navigation__menu-link link-opacity ${is_movies && "navigation__menu-link_active"}`}
                    onClick={handleMenuClose}
                  >Фильмы</NavLink>
                  <NavLink 
                    to='/saved-movies'
                    className={`navigation__menu-link link-opacity ${is_saved && "navigation__menu-link_active"}`}
                    onClick={handleMenuClose}
                  >Сохраненные фильмы</NavLink>
                  <NavLink to='/profile' className="navigation__menu-link link-opacity" onClick={handleMenuClose}>
                    <p>Аккаунт</p>
                    <img src={accountIcon} alt="иконка профиля" className="navigation__profile-icon"/>
                  </NavLink>
                </li>
                <div className="navigation__menu-opacity" onClick={handleMenuClose}/>
              </>
            }
        </div>
      </nav>
      )
  } else {
    return null;
  }
}

export default Navigation;
            