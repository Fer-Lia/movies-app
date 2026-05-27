import { useState, useEffect, useCallback } from "react";
import { tmdb } from "../services/tmdb";

export function useMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    tmdb.getPopularMovies(page).then((data) => {
      setMovies((prev) => [...prev, ...data.results]);
      setHasMore(page < data.total_pages);
      setLoading(false);
    }).catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, [page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  return { movies, loading, error, hasMore, loadMore };
}
