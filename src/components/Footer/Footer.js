function Footer({location}) {
  if (["/movies", "/saved-movies", "/"].includes(location)) {
    return(
      <footer className="footer">
        <div className="footer__content">
          <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
          <div className="footer__copyright-box">
            <p className="footer__copyright">© 2022</p>
            <div className="footer__links-box">
              <a href="https://practicum.yandex.ru/" className="footer__link link-opacity" target="_blank" rel="noreferrer">Яндекс Практикум</a>
              <a href="https://github.com/zilov/movies-explorer-frontend" className="footer__link link-opacity" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    )
  } else {
    return null;
  }
}
            
export default Footer;
            