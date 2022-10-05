function AboutMe() {
  return(
    <div className="about-me">
      <h2 className="main__section-title">Обо мне</h2>
      <div className="main__section-title-underline"></div>
      <div className="about-me__grid-table">
        <h3 className="about-me__title">Данил</h3>
        <p className="about-me__subtitle">Фронтенд-разработчик, 25 лет</p>
        <p className="about-me__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
        <a className="about-me__link" href="">GitHub</a>
        <img className="about-me__photo" alt="фото для портфолио"/>
      </div>
    </div>
  )
}

export default AboutMe;
            