import { useState, useEffect } from "react";
import { useMovies } from "../../hooks/useMovies";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import MovieCard from "../../components/movie/MovieCard";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import ErrorMessage from "../../components/ui/ErrorMessage";
import EmptyState from "../../components/ui/EmptyState";
import { TEXTS } from "../../config/textsConfig";
import "./ExplorePage.css";

export default function ExplorePage() {
  const [inputValue, setInputValue] = useState("");
  const [query, setQuery] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => setQuery(inputValue), 400);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { movies, loading, error, hasMore, loadMore } = useMovies(query);
  const bottomRef = useIntersectionObserver(loadMore);

  if (error)
    return (
      <main className="explore-page">
        <ErrorMessage
          message={error}
          onRetry={() => window.location.reload()}
        />
      </main>
    );

  return (
    <main className="explore-page">
      <input
        className="search-input"
        type="text"
        placeholder={TEXTS.explore.searchPlaceholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {!loading && movies.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="movie-grid">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieCard movie={movie} />
            </li>
          ))}
        </ul>
      )}
      {loading && movies.length === 0 && <LoadingSpinner />}
      {hasMore && <div ref={bottomRef} />}
    </main>
  );
}
