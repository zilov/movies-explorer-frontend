import avatar from "../../../images/avatar.jpg";

function AboutMe() {
  return(
    <div className="about-me">
      <div className="about-me__content">
        <h2 className="main__section-title">Обо мне</h2>
        <div className="main__section-title-underline"></div>
        <div className="about-me__grid-table">
          <h3 className="about-me__title about-me__grid-table-first-box">Данил</h3>
          <p className="about-me__subtitle about-me__grid-table-first-box">Фронтенд-разработчик, 25 лет</p>
          <p className="about-me__info about-me__grid-table-first-box">Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
  и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a className="about-me__link about-me__grid-table-first-box" href="https://github.com/zilov">GitHub</a>
          <img className="about-me__photo" src={avatar} alt="фото для портфолио"/>
        </div>
      </div>
    </div>
  )
}

export default AboutMe;
            