import { Link } from "react-router-dom";
import { ROUTES } from "../../config/routesConfig";
import { TEXTS } from "../../config/textsConfig";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar__logo" to={ROUTES.HOME}>
        {TEXTS.app.name}
      </Link>
    </nav>
  );
}
