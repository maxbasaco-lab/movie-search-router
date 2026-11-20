import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(
          `https://www.omdbapi.com/?s=Marvel&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setError(data.Error || 'Не удалось загрузить подборку');
        }
      } catch {
        setError('Ошибка сети при загрузке фильмов');
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return (
    <main className="page">
      <h1>Популярная подборка</h1>

      {loading && <p className="status">Загрузка подборки...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default HomePage;