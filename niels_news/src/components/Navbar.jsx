import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { SunIcon, MoonIcon, Bars3Icon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

function Navbar({ toggleDarkMode, darkMode, setSidebarOpen, selectedDate, setSelectedDate }) {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const navigate = useNavigate();

  useEffect(() => {
    setQuery(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-lg border-b-thick border-black">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            className="p-1 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <Link to="/" className="text-3xl font-bold font-display">
            News<span className="text-yellow">Hub</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {['Technology', 'Business', 'Sports'].map(cat => (
            <Link key={cat} to={`/category/${cat.toLowerCase()}`}
                  className="text-lg font-medium hover:text-yellow transition">
              {cat}
            </Link>
          ))}
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search..." className="px-4 py-2 rounded-l-full border-thick border-black"
            />
            <button className="bg-yellow px-4 py-2 rounded-r-full border-thick border-black font-bold">
              Search
            </button>
          </form>
          
          <div className="w-40">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              placeholderText="Select a date..."
              className="w-full px-4 py-2 rounded-full border-thick border-black text-sm"
              wrapperClassName="w-full"
              isClearable
              onClear={() => setSelectedDate(null)}
            />
          </div>

          <button onClick={toggleDarkMode} className="ml-4">
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
