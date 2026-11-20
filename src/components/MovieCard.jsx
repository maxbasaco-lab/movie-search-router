import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  const posterUrl =
    movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.svg';

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.imdbID}`} state={{ movie }} className="card-link">
        <img
          src={posterUrl}
          alt={movie.Title}
          onError={(e) => {
            e.currentTarget.src = '/no-poster.svg';
          }}
        />
        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
    </article>
  );
}

export default MovieCard;