import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import NavTab from "./NavTab/NavTab";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import { Route, Routes } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Navigation from "../Navigation/Navigation";


function Main({location}) {
  return(
    <main className="main-block">
      <Navigation location={location}/>
      <Routes>
        <Route path="/signup" element={<Register/>}/>
        <Route path="/signin" element={<Login/>}/>
        <Route exact path="/" element={
          <section className="main-page">
            <Promo className="main__section-content"/>
            <NavTab className="main__section-content"/>
            <AboutProject className="main__section-content"/>
            <Techs className="main__section-content"/>
            <AboutMe className="main__section-content"/>
            <Portfolio className="main__section-content"/>
          </section>
        }/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/saved-movies" element={<SavedMovies/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default Main;
            