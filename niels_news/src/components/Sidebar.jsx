import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import DatePicker from 'react-datepicker';

function Sidebar({ 
  isOpen, 
  setIsOpen, 
  darkMode, 
  toggleDarkMode,
  selectedDate,
  setSelectedDate
}) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      navigate(`/search?q=${query}`);
      setQuery('');
      setIsOpen(false);
    }
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsOpen(false);
  };

  const clearDate = () => {
    setSelectedDate(null);
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      ></div>

      <div
        className={`fixed top-0 left-0 w-72 h-full bg-white dark:bg-dark z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/20 dark:border-white/20">
          <Link to="/" onClick={handleLinkClick} className="text-3xl font-bold font-display">
            News<span className="text-yellow">Hub</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="p-1">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 flex flex-col space-y-6">
          <form onSubmit={handleSearch} className="flex">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full px-4 py-2 rounded-l-full border-thick border-black"
            />
            <button className="bg-yellow px-4 py-2 rounded-r-full border-thick border-black font-bold">
              Search
            </button>
          </form>

          <nav className="flex flex-col space-y-4">
            {['Technology', 'Business', 'Sports'].map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                onClick={handleLinkClick}
                className="text-lg font-medium hover:text-yellow transition"
              >
                {cat}
              </Link>
            ))}
          </nav>
          
          <div className="pt-6 border-t border-black/20 dark:border-white/20">
            <h4 className="text-sm font-semibold mb-3">Filter by Date</h4>
            <div className="w-full">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                placeholderText="Select a date..."
                className="w-full px-4 py-2 rounded-full border-thick border-black"
                wrapperClassName="w-full"
                isClearable
                onClear={() => setSelectedDate(null)}
              />
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="flex items-center justify-between w-full text-lg font-medium p-3 bg-gray dark:bg-black/20 rounded-lg"
          >
            <span>Toggle Theme</span>
            {darkMode ? (
              <SunIcon className="h-6 w-6 text-yellow" />
            ) : (
              <MoonIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
