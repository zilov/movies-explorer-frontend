function Portfolio() {
  return(
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul>
        <li>
          <a className="portfolio__link" href="">Статичный сайт</a>
          <img className="potfolio__link-icon" alt="иконка ссылки"/>
          <div className="portfolio__link-underline"/>
        </li>
        <li>
          <a className="portfolio__link" href="">Адаптивный сайт</a>
          <img className="potfolio__link-icon" alt="иконка ссылки"/>
          <div className="portfolio__link-underline"/>
        </li>
        <li>
          <a className="portfolio__link" href="">Одностраничное приложение</a>
          <img className="potfolio__link-icon" alt="иконка ссылки"/>
          <div className="portfolio__link-underline"/>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;
            