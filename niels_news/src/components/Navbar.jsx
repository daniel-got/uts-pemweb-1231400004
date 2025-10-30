// src/components/Navbar.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ toggleDarkMode, darkMode }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${query}`);
      setQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-lg border-b-thick border-black">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-display font-bold">
          News<span className="text-yellow">Hub</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {['Technology', 'Business', 'Sports'].map(cat => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="text-lg font-medium hover:text-yellow transition"
            >
              {cat}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 rounded-l-full border-thick border-black text-sm w-48"
            />
            <button className="bg-yellow px-4 py-2 rounded-r-full border-thick border-black font-bold text-sm">
              Search
            </button>
          </form>

          <button
            onClick={toggleDarkMode}
            className="text-2xl"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 'Sun' : 'Moon'}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
