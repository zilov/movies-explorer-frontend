import { useNavigate } from "react-router";

function NotFound() {
  const navigate = useNavigate();
  return(
    <section className="not-found">
      <p className="not-found__code">404</p>
      <p className="not-found__text">Страница не найдена</p>
      <button className="not-found__button" type="button" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}

export default NotFound;
            