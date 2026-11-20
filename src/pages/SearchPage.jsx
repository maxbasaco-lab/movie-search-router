import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const q = searchParams.get('q');
    if (!q) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await fetch(
          `https://www.omdbapi.com/?s=${encodeURIComponent(q)}&apikey=${API_KEY}`
        );
        const data = await response.json();

        if (data.Response === 'True') {
          setMovies(data.Search);
        } else {
          setMovies([]);
          setError(data.Error || 'Фильмы не найдены');
        }
      } catch {
        setError('Ошибка сети при выполнении поиска');
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      setSearchParams({ q: trimmed });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="page">
      <h1>Поиск фильмов</h1>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название фильма (например, Matrix)..."
        />
        <button type="submit">Найти</button>
      </form>

      {loading && <p className="status">Поиск...</p>}
      {error && <p className="status error">{error}</p>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </main>
  );
}

export default SearchPage;