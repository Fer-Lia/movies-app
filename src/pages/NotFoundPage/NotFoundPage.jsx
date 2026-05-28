import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routesConfig";
import { TEXTS } from "../../config/textsConfig";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="not-found-page">
      <span className="not-found-page__code">404</span>
      <h1 className="not-found-page__title">{TEXTS.notFound.title}</h1>
      <p className="not-found-page__subtitle">{TEXTS.notFound.subtitle}</p>
      <button className="btn-primary" onClick={() => navigate(ROUTES.HOME)}>
        {TEXTS.notFound.button}
      </button>
    </main>
  );
}
