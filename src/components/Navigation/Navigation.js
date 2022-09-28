import { NavLink } from "react-router-dom";

function Navigation() {
  return(
    <div className="navigation">
      <NavLink to='/signup'>Регистрация</NavLink>
      <NavLink to='/signin'>Войти</NavLink>
      <NavLink to='/'>Главная</NavLink>
      <NavLink to='/movies'>Фильмы</NavLink>
      <NavLink to='/saved-movies'>Сохраненные фильмы</NavLink>
      <NavLink to='/profile'>Профиль</NavLink>
    </div>
  )
}

export default Navigation;
            