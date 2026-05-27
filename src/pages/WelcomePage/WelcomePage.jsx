import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../config/routesConfig";
import { TEXTS } from "../../config/textsConfig";
import { tmdb } from "../../services/tmdb";
import "./WelcomePage.css";

export default function WelcomePage() {
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `linear-gradient(to bottom, rgba(19, 19, 19, 0.7), rgba(19, 19, 19, 0.95)), url('${tmdb.getImageUrl(TEXTS.welcome.backdropPath, "original")}')`,
  };

  return (
    <main className="welcome-page" style={backgroundStyle}>
      <section className="welcome-content">
        <h1 className="welcome-title">{TEXTS.welcome.title}</h1>
        <p className="welcome-subtitle">{TEXTS.welcome.subtitle}</p>
        <div className="welcome-actions">
          <button
            className="btn-primary"
            onClick={() => navigate(ROUTES.EXPLORE)}
          >
            {TEXTS.welcome.ctaExplore}
          </button>
          <button
            className="btn-secondary"
            onClick={() => navigate(ROUTES.LOGIN)}
          >
            {TEXTS.welcome.ctaLogin}
          </button>
        </div>
      </section>
    </main>
  );
}
