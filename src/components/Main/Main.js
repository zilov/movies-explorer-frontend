import AboutMe from "./AboutMe/AboutMe";
import AboutProject from "./AboutProject/AboutProject";
import NavTab from "./NavTab/NavTab";
import Portfolio from "./Portfolio/Portfolio";
import Promo from "./Promo/Promo";
import Techs from "./Techs/Techs";

function Main() {
  return(
    <div className="main">
      <Promo className="main__section-content"/>
      <NavTab className="main__section-content"/>
      <AboutProject className="main__section-content"/>
      <Techs className="main__section-content"/>
      <AboutMe className="main__section-content"/>
      <Portfolio className="main__section-content"/>
    </div>
  )
}

export default Main;
            