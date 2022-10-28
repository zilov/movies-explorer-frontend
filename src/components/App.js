import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { login, logout, register } from '../utils/Auth';
import Cookies from 'js-cookie';
import MainApi from '../utils/MainApi';
import MoviesApi from '../utils/MoviesApi';

function App() {
  const location = useLocation().pathname;
  const [preloader, setPreloader] = useState(false);

  // Auth states and handlers
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    // console.log(`JWT Token: ${jwt}`);
    if (jwt) {
      MainApi.getProfileInfo()
        .then(() => {setLoggedIn(true)})
        .catch(() => {
          Cookies.remove('jwt')
          setLoggedIn(false)
        })
    } else {
      setLoggedIn(false);
    }
  }, [])

  const navigate = useNavigate();
  
  const handleLoginSubmit = (email, password) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    setPreloader(true);
    login(email, password)
      .then((res) => {
        setLoggedIn(true);
      })
    .catch(() => {console.log("Error in login submit!")})
    .finally(setPreloader(false));
  }

  const handleRegisterSubmit = (email, password, name) => {
    setPreloader(true);
    register(email, password, name).then((res) => {
      if (res.data) {
        setPreloader(false)
        navigate('/signin');
      }
    })
    .catch(console.log("Error on register submit!"))
    .finally(setPreloader(false));
  }

  const handleLogoutSubmit = () => {
    setPreloader(true);
    logout().then((res) => {
      if (res.status === 200) {
        setPreloader(false);
        setLoggedIn(false);
      }
    })
    .catch(console.log("Error on logout!"))
    .finally(setPreloader(false));
  }

  // cards states and handlers

  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
      MoviesApi.getMovies()
        .then((res) => {
          setCards(res.map(item => item))
        })
        .catch(err => console.log(`Cannot get cards list ${err}`))
    } else {
      navigate('/');
    }
  }, [loggedIn]);


  return (
    <div className="app">
      <Header location={location}/>
      <Main 
        location={location}
        onRegisterSubmit={handleRegisterSubmit}
        onLoginSubmit={handleLoginSubmit}
        onLogoutSubmit={handleLogoutSubmit}
        cards={cards}
        isLoading={preloader}
      />
      <Footer location={location}/>
    </div>
  );
}

export default App;
