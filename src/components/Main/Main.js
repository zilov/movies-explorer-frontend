import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import NavTab from "./NavTab/NavTab";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

function Main() {
  return(
    <div className="main border">
      <p>Главная страница</p>
      <Promo/>
      <NavTab/>
      <AboutProject/>
      <Techs/>
      <AboutMe>
        
      </AboutMe>
      <Portfolio/>
    </div>
  )
}

export default Main;
            