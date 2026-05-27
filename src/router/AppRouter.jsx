import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../config/routesConfig";
import Navbar from "../components/layout/Navbar";
import WelcomePage from "../pages/WelcomePage/WelcomePage";
import ExplorePage from "../pages/ExplorePage/ExplorePage";
import MovieDetailPage from "../pages/MovieDetailPage/MovieDetailPage";
import ActorDetailPage from "../pages/ActorDetailPage/ActorDetailPage";
import DirectorDetailPage from "../pages/DirectorDetailPage/DirectorDetailPage";
import FavoritesPage from "../pages/FavoritesPage/FavoritesPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={ROUTES.HOME} element={<WelcomePage />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
        <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetailPage />} />
        <Route path={ROUTES.ACTOR_DETAIL} element={<ActorDetailPage />} />
        <Route path={ROUTES.DIRECTOR_DETAIL} element={<DirectorDetailPage />} />
        <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
        <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
