import { useState, useEffect, useCallback, useRef } from "react";
import { tmdb } from "../services/tmdb";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const prevQuery = useRef(query);

  useEffect(() => {
    let cancelled = false;

    if (prevQuery.current !== query) {
      prevQuery.current = query;
      setMovies([]);
      setPage(1);
      setHasMore(true);
      setLoading(true);

      const request = query
        ? tmdb.searchMovies(query, 1)
        : tmdb.getPopularMovies(1);

      request.then((data) => {
        if (cancelled) return;
        setMovies(data.results);
        setHasMore(1 < data.total_pages);
        setLoading(false);
      }).catch((err) => {
        if (cancelled) return;
        setError(err.message);
        setLoading(false);
      });

      return () => { cancelled = true; };
    }

    const request = query
      ? tmdb.searchMovies(query, page)
      : tmdb.getPopularMovies(page);

    request.then((data) => {
      if (cancelled) return;
      setMovies((prev) => {
        const ids = new Set(prev.map((m) => m.id));
        return [...prev, ...data.results.filter((m) => !ids.has(m.id))];
      });
      setHasMore(page < data.total_pages);
      setLoading(false);
    }).catch((err) => {
      if (cancelled) return;
      setError(err.message);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [query, page]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  }, [loading, hasMore]);

  return { movies, loading, error, hasMore, loadMore };
}
