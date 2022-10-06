function Portfolio() {
  return(
    <div className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__grid-table">
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link" href="https://github.com/zilov">Статичный сайт</a>
          <a href="https://github.com/zilov" className="portfolio__link-icon">↗</a>
        </li>
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link" href="https://github.com/zilov">Адаптивный сайт</a>
          <a href="https://github.com/zilov" className="portfolio__link-icon">↗</a>
        </li>
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link" href="https://github.com/zilov">Одностраничное приложение</a>
          <a href="https://github.com/zilov" className="portfolio__link-icon">↗</a>
        </li>
      </ul>
    </div>
  )
}

export default Portfolio;
            