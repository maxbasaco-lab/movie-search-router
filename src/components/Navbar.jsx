import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <header className="header">
      <nav className="navbar">
        <NavLink to="/" end className="nav-link">
          Главная
        </NavLink>
        <NavLink to="/search" className="nav-link">
          Поиск фильмов
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;