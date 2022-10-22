import './App.css';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import { useLocation } from 'react-router';

function App() {
  const location = useLocation().pathname;
  return (
    <div className="app">
      <Header location={location}/>
      <Main location={location}/>
      <Footer location={location}/>
    </div>
  );
}

export default App;
