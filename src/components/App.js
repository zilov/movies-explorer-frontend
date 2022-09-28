import './App.css';
import Header from './Header/Header';
import Navigation from './Navigation/Navigation';
import Login from './Login/Login';
import Register from './Register/Register';
import Main from './Main/Main';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies/SavedMovies';
import Footer from './Footer/Footer';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header/>
      <Navigation/>
      <Switch>
        <Route path="/signup">
          <Register></Register>
        </Route>
        <Route path="/signin">
          <Login></Login>
        </Route>
        <Route exact path="/">
          <Main></Main>
        </Route>
        <Route path="/movies">
          <Movies></Movies>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies></SavedMovies>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
      </Switch>
      <Footer></Footer>
    </div>
  );
}

export default App;
