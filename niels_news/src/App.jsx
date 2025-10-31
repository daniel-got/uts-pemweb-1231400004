import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import SubNavbar from './components/SubNavbar.jsx';
import Home from "./pages/Home.jsx";
import NewsList from './pages/NewsList.jsx';
import NewsDetail from './pages/NewsDetail.jsx';
import NotFound from "./pages/NotFound.jsx";
import Footer from './components/Footer.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isSubNavVisible, setIsSubNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 10) {
        setIsSubNavVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setIsSubNavVisible(false);
      } else {
        setIsSubNavVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
      <div
        className={`sticky top-[71px] z-40 transition-all duration-300 ${
          isSubNavVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <SubNavbar />
      </div>
      
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<NewsList />} />
          <Route path="/search" element={<NewsList />} />
          <Route path="/article" element={<NewsDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    <Footer />
    </div>
  );
}

export default App;
