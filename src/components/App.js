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
import { apiConfig } from '../utils/constants';

function App() {
  const location = useLocation().pathname;
  const [preloader, setPreloader] = useState(false);

  // Auth states and handlers
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
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
  const [savedCards, setSavedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [shorts, setShorts] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [visibleCards, setVisibleCards] = useState(0);
  const [addCardNumber, setAddCardNumber] = useState(0);
  const [cardsLeft, setCardsLeft] = useState(0)

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
      MoviesApi.getMovies()
        .then((res) => {
          setCards(res.map(item => {
            return {
              nameEN: item.nameEN,
              nameRU: item.nameRU,
              trailerLink: item.trailerLink,
              year: item.year,
              country: item.country,
              description: item.description,
              director: item.director,
              duration: item.duration,
              image: `${apiConfig.moviesImagesUrl}${item.image.url}`,
              thumbnail: `${apiConfig.moviesImagesUrl}${item.image.formats.thumbnail.url}`,
              movieId: item.id,
            }
          }))
        })
        .catch(err => console.log(`Cannot get cards list ${err}`))
      MainApi.getMovies()
        .then((res) => {
          setSavedCards(res.map(item => item))
        })
        .catch(err => console.log(`Cannot get saved cards list ${err}`))
    } else {
      navigate('/');
    }
  }, [loggedIn]);

  // setting max initial cards number on movies page 
  useEffect(() => {
    setWidth(window.innerWidth)
    if (width > 1279) {
      setVisibleCards(12);
      setAddCardNumber(3);
    } else if (width > 767) {
      setVisibleCards(8);
      setAddCardNumber(2);
    } else {
      setVisibleCards(5);
      setAddCardNumber(2);
    }
  }, [window.innerWidth]);


  useEffect(() => {
    setCardsLeft(matchedCards.length - visibleCards)
  }, [matchedCards, shorts])

  const handleCardSearch = (searchText) => {
    const keys = ['nameRU', 'nameEN', 'director', 'country', 'year', 'description']
    setMatchedCards(
      cards.filter(card => {
        let match = false;
        for (const key of keys) {
          if (card[key].toLowerCase().includes(searchText.toLowerCase())) {
            match=true;
            break;
          }}
        return match;
      })
    )
  }

  const handleLoadMoreCards = () => {
    setVisibleCards(visibleCards + addCardNumber)
    setCardsLeft(cardsLeft - addCardNumber)
  }

  const handleCardSave = (card) => {
    return MoviesApi.addMovieToFavorite(card)
      .then(res => {return res})
      .catch(err => {console.log(`Cannot save card to MainApi: ${err}`)});
  }

  const handleCardDelete = (cardId) => {
    MoviesApi.deleteMovieFromFavorite(cardId)
  }

  const states = {
    location,
    cards,
    savedCards,
    preloader,
    matchedCards,
    shorts,
    width,
    visibleCards,
    addCardNumber,
    cardsLeft
  }

  const handlers = {
    handleLoginSubmit,
    handleLogoutSubmit,
    handleRegisterSubmit,
    handleCardSave,
    handleCardDelete,
    handleLoadMoreCards,
    handleCardSearch
  }

  const stateSetters = {
    setCards,
    setLoggedIn,
    setPreloader,
    setSavedCards,
    setMatchedCards,
    setShorts,
    setCardsLeft
  }

  return (
    <div className="app">
      <Header location={states.location}/>
      <Main 
        states={states}
        handlers={handlers}
        stateSetters={stateSetters}
      />
      <Footer location={states.location}/>
    </div>
  );
}

export default App;
