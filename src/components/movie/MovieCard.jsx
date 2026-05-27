import { tmdb } from "../../services/tmdb";
import "./MovieCard.css";

export default function MovieCard({ movie }) {
    const posterUrl = tmdb.getImageUrl(movie.poster_path);
    const year = movie.release_date?.slice(0, 4);
    
  return (
    <article className="movie-card">
        {posterUrl
  ? <img src={posterUrl} alt={movie.title} className="movie-card__poster" />
  : <div className="movie-card__poster--placeholder">🎬</div>
}

     <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <div className="movie-card__meta">
            <span className="movie-card__year">{year}</span>
            <span className="movie-card__rating">⭐ {movie.vote_average}</span>
        </div>
     </div>
    </article>
  );
}

