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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


function Main({states, handlers, stateSetters, validator}) {

  return(
    <main className="main-block">
      <Navigation states={states} stateSetters={stateSetters}/>
      <Routes>
        <Route path="/signup" element={
          <Register
            handleRegister = {handlers.handleRegisterSubmit}
            validator={validator}
          />
        }/>
        <Route path="/signin" element={
          <Login
            handleLogin={handlers.handleLoginSubmit}
            validator={validator}
          />
        }/>
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
        <Route path="/movies" element={<ProtectedRoute states={states} element={
          <Movies 
            states={states}
            handlers={handlers}
            stateSetters={stateSetters}
            validator={validator}
          />}
        />}/>
        <Route path="/saved-movies" element={<ProtectedRoute states={states} element={
          <SavedMovies 
            states={states}
            handlers={handlers}
            stateSetters={stateSetters}
            validator={validator}
          />}
        />}/>
        <Route path="/profile" element={<ProtectedRoute states={states} element={
          <Profile
            onEdit={handlers.handleUpdateUserInfo} 
            onLogout={handlers.handleLogoutSubmit}
            validator={validator}
            states={states}
          />
        }/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </main>
  )
}

export default Main;
            