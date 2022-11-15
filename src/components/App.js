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
import { API_CONFIG, CARD_NUMBERS_ON_WIDTH, SHORTS_DURATION } from '../utils/constants';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../contexts/CurrentUser';
import { useWindowWidth } from '@react-hook/window-size';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation().pathname;

  // Auth states and handlers
  const jwt = Cookies.get('jwt');
  const [loggedIn, setLoggedIn] = useState(jwt ? true : false);
  const navigate = useNavigate();

  const auth = async (jwt) => {
    const user = await MainApi.getProfileInfo()
      .then((res) => {
        setCurrentUser(res);
        setLoggedIn(true);
        return true
      })
      .catch((err) => {
        console.log("Error in getting profile info!");
        setLoggedIn(false);
        return false
      })
    const cards = getSavedCards()
   return {user, cards};
  }

  const getSavedCards = async () => {
    return await MainApi.getMovies()
      .then((res) => {
        if (res.length > 0) {
          setSavedCards(res.map(item => item));
        }
      })
      .catch((err) => {
        console.log(`Cannot get saved cards list!`)
        handleError(err);
      })
  }
    
  useEffect(() => {
    if (loggedIn) {
      if (!currentUser.name) {
        auth();
      }
      if (['/signin', '/signup'].includes(location)){
        navigate('/movies');
      } else {
        console.log('Navigate to ', location);
        navigate(location);
      }
    } else {
      Cookies.remove('jwt');
      setCurrentUser({});
      setCards([]);
      setSavedCards([]);
      localStorage.clear();
      if (['/', '/signup', '/signin'].includes(location)) {
        navigate(location);
      }
    }
  }, [loggedIn]);

  
  const handleLoginSubmit = ({email, password}) => {
    // сравниваем данные с данными сервера, если успешно залогинились - обновляем токен
    // если не успешно - открываем попап ошибки
    setPreloader(true);
    return loginRequest(email, password)
      .then((res) => {
        setLoggedIn(true);
        return true;
      })
      .catch((err) => {
        console.log("Error in login submit!");
        handleError(err);
        return false;
      })
      .finally(setPreloader(false));
  }

  const handleRegisterSubmit = ({email, password, name}) => {
    setPreloader(true);
    return registerRequest(email, password, name).then((res) => {
      if (res.data) {
        setPreloader(false)
        handleLoginSubmit({email, password});
        return true;
      }
    })
    .catch((err) => {
      console.log("Error on register submit!");
      handleError(err);
      return false;
    })
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
    .catch((err) => {
      console.log("Error on logout!")
      handleError(err);
    })
    .finally(setPreloader(false));
  }

  const handleUpdateUserInfo = (name, email) => {
    return MainApi.updateProfileInfo(name, email)
      .then(() => {
        setCurrentUser({name, email});
        return true;
      })
      .catch((err) => {
        console.log("Error on update user info!");
        handleError(err);
        return false;
      })
  }

  // cards states and handlers

  // full cards lists states
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  
  // filtered cards lists states
  const [cardsToSearchIn, setCardsToSearchIn] = useState(cards);
  const [cardsToRender, setCardsToRender] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  
  // search states
  const [searchText, setSearchText] = useState('');
  const [shorts, setShorts] = useState(false);
  
  // cards visibility states
  const width = useWindowWidth();
  const [visibleCards, setVisibleCards] = useState(0);
  const [addCardNumber, setAddCardNumber] = useState(0);

  // other states
  const [preloader, setPreloader] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState({});


  useEffect(() => {
    console.log("Location is updated!", location);
    setMatchedCards([]);
    setSearchText('');
    setShorts(false);
    if (location === "/saved-movies") {
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
    if (location === "/saved-movies") {
      setMatchedCards(savedCards);
      setCardsToSearchIn(savedCards);   
    }
  }, [savedCards])



  // setting max initial cards number on movies page 
  useEffect(() => {
    if (width > 1279) {
      setVisibleCards(CARD_NUMBERS_ON_WIDTH[1280].visible);
      setAddCardNumber(CARD_NUMBERS_ON_WIDTH[1280].add);
    } else if (width > 767) {
      setVisibleCards(CARD_NUMBERS_ON_WIDTH[768].visible);
      setAddCardNumber(CARD_NUMBERS_ON_WIDTH[768].add);
    } else {
      setVisibleCards(CARD_NUMBERS_ON_WIDTH[320].visible);
      setAddCardNumber(CARD_NUMBERS_ON_WIDTH[320].add);
    }
  }, [width]);


  useEffect(() => {
    if (location === '/movies') {
      setCardsToRender(
        matchedCards.filter(card => {
          if (shorts && card.duration > SHORTS_DURATION) {
            return false;
          }
          return true;
        })
      )
    } else {
      setCardsToRender(
        savedCards.filter(card => {
          if (shorts && card.duration > SHORTS_DURATION) {
            return false;
          }
          return true;
        })
      )
    }
  }, [shorts, matchedCards])


// save states to local after cards render
  useEffect(() => {
    if (location === "/movies") {
      localStorage.setItem('lastSearch', JSON.stringify(searchText));
      localStorage.setItem('lastMatchedCards', JSON.stringify(matchedCards));
      localStorage.setItem('lastShorts', JSON.stringify(shorts));
    }
  }, [cardsToRender])

  const handleCardsFilter = (searchInput, cards) => {
    const keys = ['nameRU', 'nameEN'];
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
            image: `${API_CONFIG.moviesImagesUrl}${item.image.url}`,
            thumbnail: `${API_CONFIG.moviesImagesUrl}${item.image.formats.thumbnail.url}`,
            movieId: item.id,
          }})
        setCards(cards);
        return cards;
      })
      .catch((err) => {
        console.log(`Cannot get cards list ${err}`);
        handleError(err);
      })
      .finally(() => setPreloader(false))
  }

  const handleCardSearch = (search) => {
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
  }

  const handleCardSave = (card) => {
    return MoviesApi.addMovieToFavorite(card)
      .then(res => {
        setSavedCards([res, ...savedCards]);
      })
      .catch(err => {
        console.log(`Cannot save card to MainApi!`);
        handleError(err);
      });
  }

  const handleCardDelete = (card) => {
    const cardId = card._id
    return MoviesApi.deleteMovieFromFavorite(cardId)
      .then(() => {
        if (location === "/saved-movies") {
          setCardsToRender(cardsToRender.filter((card) => card._id !== cardId))
        }
        setSavedCards(savedCards.filter((card) => card._id !== cardId))
      })
      .catch((err) => {
        console.log("Error on card delete!");
        handleError(err);
      })
  }

  const handleError = async (err) => {
    const status = err.status;
    if (status === 401) {
      setLoggedIn(false);
    }
    if (status) {
      const { message } = await err.json();
      setError({status, message});
    } else {
      const status = 500;
      const message = '500: На сервере произошла ошибка или он недоступен.'
      setError({status, message});
    }
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
    matchedCards,
    cardsToRender,
    cardsToSearchIn,
    searchText,
    isMenuOpen,
    error
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
    handleError
  }

  const stateSetters = {
    setCards,
    setLoggedIn,
    setPreloader,
    setSavedCards,
    setShorts,
    setIsMenuOpen,
    setSearchText,
    setError,
  }

  // validation hook

  const {
    register,
    formState: {
      errors, isValid
    },
    handleSubmit,
    getValues,
  } = useForm({mode: "onBlur"})

  const validator = {
    register, errors, isValid, handleSubmit, getValues,
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
