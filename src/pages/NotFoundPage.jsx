import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="page not-found">
      <h1>404 — Страница не найдена</h1>
      <p>Такого адреса не существует.</p>
      <Link to="/" className="back-btn">
        На главную
      </Link>
    </main>
  );
}

export default NotFoundPage;