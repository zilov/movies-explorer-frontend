import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { checkToken, login, register } from '../utils/Auth';
import Cookies from 'js-cookie';
import MainApi from '../utils/MainApi';

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

  useEffect(() => {
    if (loggedIn) {
      navigate('/movies');
    } else {
      navigate('/');
      localStorage.removeItem('jwt');
    }
  }, [loggedIn]);
  
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

  return (
    <div className="app">
      <Header location={location}/>
      <Main 
        location={location}
        onRegisterSubmit={handleRegisterSubmit}
        onLoginSubmit={handleLoginSubmit}
        isLoading={preloader}
      />
      <Footer location={location}/>
    </div>
  );
}

export default App;
