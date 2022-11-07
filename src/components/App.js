import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { loginRequest, logoutRequest, registerRequest } from '../utils/Auth';
import Cookies from 'js-cookie';
import MainApi from '../utils/MainApi';
import MoviesApi from '../utils/MoviesApi';
import { apiConfig } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUser';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation().pathname;

  // Auth states and handlers
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      MainApi.getProfileInfo()
        .then((res) => {
          console.log(res);
          setCurrentUser(res);
          setLoggedIn(true);
        })
        .catch(() => {
          console.log("Error in getting profile info!");
          Cookies.remove('jwt')
          setLoggedIn(false)
        })
    } else {
      setLoggedIn(false);
    }
  }, [])

  const navigate = useNavigate();
  
  const handleLoginSubmit = ({email, password}) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    setPreloader(true);
    loginRequest(email, password)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch(() => {console.log("Error in login submit!")})
      .finally(setPreloader(false));
  }

  const handleRegisterSubmit = ({email, password, name}) => {
    setPreloader(true);
    registerRequest(email, password, name).then((res) => {
      if (res.data) {
        setPreloader(false)
        handleLoginSubmit({email, password});
      }
    })
    .catch(console.log("Error on register submit!"))
    .finally(setPreloader(false));
  }

  const handleLogoutSubmit = () => {
    setPreloader(true);
    logoutRequest().then((res) => {
      if (res.status === 200) {
        setPreloader(false);
        setLoggedIn(false);
      }
    })
    .catch(console.log("Error on logout!"))
    .finally(setPreloader(false));
  }

  const handleUpdateUserInfo = (name, email) => {
    return MainApi.updateProfileInfo(name, email)
      .then(() => {
        setCurrentUser({name, email});
      })
      .catch(() => console.log("Error on update user info!"))
  }

  // cards states and handlers

  // full cards lists states
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  
  // filtered cards lists states
  const [cardsToSearchIn, setCardsToSearchIn] = useState(cards);
  const [matchedCards, setMatchedCards] = useState([]);
  const [cardsToRender, setCardsToRender] = useState([]);
  
  // search states
  const [searchText, setSearchText] = useState('');
  const [shorts, setShorts] = useState(false);
  
  // cards visibility states
  const [width, setWidth] = useState(window.innerWidth);
  const [visibleCards, setVisibleCards] = useState(0);
  const [addCardNumber, setAddCardNumber] = useState(0);
  const [cardsLeft, setCardsLeft] = useState(0);

  // other states
  const [preloader, setPreloader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  useEffect(() => {
    console.log("Location is updated!");
    setMatchedCards([]);
    setSearchText('');
    setShorts(false);
    handleCardDelete("636145a6d06489e02485b6dd")
    console.log("Search: ", searchText);
    if (location === "/saved-movies") {
      setSearchText('bla')
      setMatchedCards(savedCards);
      setCardsToSearchIn(savedCards); 
    } else if (location === "/movies") {
      setCardsToSearchIn(cards);
      if (localStorage.getItem('lastMatchedCards')) {
        setMatchedCards(JSON.parse(localStorage.getItem('lastMatchedCards')));
        setShorts(JSON.parse(localStorage.getItem('lastShorts')));
        setSearchText(JSON.parse(localStorage.getItem('lastSearch')));
      }
    }
  }, [location])


  useEffect(() => {
    if (loggedIn) {
      MainApi.getProfileInfo()
        .then((res) => setCurrentUser(res))
        .catch(() => console.log("Error in getting profile info!"))
      getSavedMovies();
      navigate('/movies');
    } else {
      navigate('/');
      setCards([]);
      setSavedCards([]);
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
    setCardsLeft(cardsToRender.length - visibleCards)
  }, [shorts, cardsToRender])

  useEffect(() => {
    console.log("Setting cards to render");
    console.log(matchedCards);
    setCardsToRender(
      matchedCards.filter(card => {
        if (shorts && card.duration > 40) {
          return false;
        }
        return true;
      })
    )
    console.log(`Matched to render: ${matchedCards}`);
  }, [shorts, matchedCards])


// save states to local after cards render
  useEffect(() => {
    console.log(searchText);
    if (location === "/movies") {
      localStorage.setItem('lastSearch', JSON.stringify(searchText));
      localStorage.setItem('lastMatchedCards', JSON.stringify(matchedCards));
      localStorage.setItem('lastShorts', JSON.stringify(shorts));
    }
  }, [cardsToRender])

  const handleCardsFilter = (searchInput, cards) => {
    const keys = ['nameRU', 'nameEN', 'director', 'country', 'year', 'description'];
    setMatchedCards(
      cards.filter(card => {
        let match = false;
        // filtering by search input
        for (const key of keys) {
          if (card[key].toLowerCase().includes(searchInput.toLowerCase())) {
            match=true;
            break;
          }}
        return match;
      })
      )
    setPreloader(false);
  }

  const getMovies = () => {
    return MoviesApi.getMovies()
      .then((res) => {
        setPreloader(true);
        const cards = res.map(item => {
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
          }})
        setCards(cards);
        return cards;
      })
      .catch(err => console.log(`Cannot get cards list ${err}`))
      .finally(() => setPreloader(false))
  }

  const getSavedMovies = () => {
    return MainApi.getMovies()
      .then((res) => {
        setSavedCards(res.map(item => item))    
      })
      .catch(err => console.log(`Cannot get saved cards list ${err}`))
  }

  const handleCardSearch = ({search}) => {
    setSearchText(search);
    if (search === '') {
      console.log("Empty input!");
      return;
    }
    setPreloader(true);
    if (location === "/movies") {
      if (cards.length === 0) {
        getMovies().then((cards) => {
          handleCardsFilter(search, cards);
        });
      } else {
        handleCardsFilter(search, cards);
      }
    } else {
      handleCardsFilter(search, savedCards);
    }
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
    loggedIn,
    currentUser,
    cards,
    savedCards,
    preloader,
    shorts,
    width,
    visibleCards,
    addCardNumber,
    cardsLeft,
    cardsToRender,
    cardsToSearchIn,
    matchedCards,
    searchText,
    isMenuOpen
  }

  const handlers = {
    handleLoginSubmit,
    handleLogoutSubmit,
    handleRegisterSubmit,
    handleUpdateUserInfo,
    handleCardSave,
    handleCardDelete,
    handleLoadMoreCards,
    handleCardSearch,
  }

  const stateSetters = {
    setCards,
    setLoggedIn,
    setPreloader,
    setSavedCards,
    setShorts,
    setCardsLeft,
    setIsMenuOpen,
    setSearchText
  }

  // validation hook

  const {
    register,
    formState: {
      errors, isValid
    },
    handleSubmit,
  } = useForm({mode: "onBlur"})

  const validator = {
    register, errors, isValid, handleSubmit
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Header location={states.location}/>
        <Main 
          states={states}
          handlers={handlers}
          stateSetters={stateSetters}
          validator={validator}
        />
        <Footer location={states.location}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
