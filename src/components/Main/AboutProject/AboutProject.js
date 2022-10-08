function AboutProject() {
  return(
    <div className="about-project" name="about-project">
      <div className="about-project__content">
        <h2 className="main__section-title">О проекте</h2>
        <div className="main__section-title-underline"></div>
        <div className="about-project__grid-table">
          <h3 className="about-project__subtitle">Дипломный проект включал 5 этапов</h3>
          <h3 className="about-project__subtitle">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__grid-timing">
          <p className="about-project__timing-block about-project__timing-block_type_black">1 неделя</p>
          <p className="about-project__timing-block about-project__timing-block_type_grey">4 недели</p>
          <p className="about-project__timing-subtitle">Backend</p>
          <p className="about-project__timing-subtitle">Frontend</p>
        </div>
      </div>
    </div>
  )
}

export default AboutProject;
            