import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function MovieDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [movie, setMovie] = useState(location.state?.movie || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(
          `https://www.omdbapi.com/?i=${id}&plot=full&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setMovie(null);
          setError(data.Error || 'Фильм не найден');
        }
      } catch {
        setError('Ошибка сети при загрузке данных о фильме');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const posterUrl =
    movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : '/no-poster.svg';

  return (
    <main className="page">
      <button onClick={() => navigate(-1)} className="back-btn">
        ← Назад
      </button>

      {error && <p className="status error">{error}</p>}

      {movie && (
        <div className="movie-details">
          <img
            src={posterUrl}
            alt={movie.Title}
            onError={(e) => {
              e.currentTarget.src = '/no-poster.svg';
            }}
          />
          <div className="details-content">
            <h1>
              {movie.Title} ({movie.Year})
            </h1>
            {loading && <p className="status">Загрузка подробностей...</p>}

            {movie.Genre && (
              <p>
                <strong>Жанр:</strong> {movie.Genre}
              </p>
            )}
            {movie.Director && (
              <p>
                <strong>Режиссёр:</strong> {movie.Director}
              </p>
            )}
            {movie.Actors && (
              <p>
                <strong>Актёры:</strong> {movie.Actors}
              </p>
            )}
            {movie.imdbRating && (
              <p>
                <strong>Рейтинг IMDb:</strong> {movie.imdbRating}
              </p>
            )}
            {movie.Plot && (
              <p className="plot">
                <strong>Сюжет:</strong> {movie.Plot}
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}

export default MovieDetailsPage;