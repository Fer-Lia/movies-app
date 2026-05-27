import { useMovies } from "../../hooks/useMovies";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import MovieCard from "../../components/movie/MovieCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import EmptyState from "../../components/ui/EmptyState";
import { TEXTS } from "../../config/textsConfig";
import "./ExplorePage.css";

export default function ExplorePage() {
  const { movies, loading, error, hasMore, loadMore } = useMovies();
  const bottomRef = useIntersectionObserver(loadMore);

  if (error) return <main className="explore-page"><ErrorMessage message={error} onRetry={() => window.location.reload()} /></main>;
  if (!loading && movies.length === 0) return <main className="explore-page"><EmptyState /></main>;

  return (
    <main className="explore-page">
      <ul className="movie-grid">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
      {loading && <LoadingSpinner />}
      {hasMore && <div ref={bottomRef} />}
    </main>
  );
}
