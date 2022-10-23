function Profile() {
  return(
    <section className="profile">
      <h2 className="profile__header">Привет, Виталий!</h2>
      <div className="profile__info-block">
        <h3 className="profile__info-key">Имя</h3>
        <h3 className="profile__info-value">Виталий</h3>
      </div>
      <div className="profile__info-block">
        <h3 className="profile__info-key">E-mail</h3>
        <h3 className="profile__info-value">pochta@pochta.ru</h3>
      </div>
      <button className="profile__edit-btn link-opacity" type="submit">Редактировать</button>
      <button className="profile__logout-btn link-opacity" type="button">Выйти из аккаунта</button>
    </section>
  )
}

export default Profile;
            