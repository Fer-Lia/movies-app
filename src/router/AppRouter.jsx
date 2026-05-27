import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../config/routesConfig";
import Navbar from "../components/layout/Navbar";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<WelcomePage />} />
        <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
