import { useLocation } from "react-router";

function Footer() {
  const location = useLocation();
  if (["/movies", "/saved-movies", "/"].includes(location.pathname)) {
    return(
      <div className="footer">
        <div className="footer__content">
          <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <div className="footer__copyright-box">
            <p className="footer__copyright">© 2022</p>
            <div className="footer__links-box">
              <a href="https://github.com/zilov/movies-explorer-frontend" className="footer__link">Яндекс Практикум</a>
              <a href="https://github.com/zilov/movies-explorer-frontend" className="footer__link">GitHub</a>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return null;
  }
}
            
export default Footer;
            