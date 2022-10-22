function Portfolio() {
  return(
    <section className="portfolio">
      <p className="portfolio__title">Портфолио</p>
      <ul className="portfolio__grid-table">
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link link-opacity" href="https://github.com/zilov/how-to-learn" target="_blank" rel="noreferrer">Статичный сайт</a>
          <a href="https://github.com/zilov/how-to-learn" className="portfolio__link-icon link-opacity" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link link-opacity" href="https://github.com/zilov/russian-travel" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <a href="https://github.com/zilov/russian-travel" className="portfolio__link-icon link-opacity" target="_blank" rel="noreferrer">↗</a>
        </li>
        <li className="portfolio__grid-table-item">
          <a className="portfolio__link link-opacity" href="https://github.com/zilov/react-mesto-auth" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <a href="https://github.com/zilov/react-mesto-auth" className="portfolio__link-icon link-opacity" target="_blank" rel="noreferrer">↗</a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio;
            