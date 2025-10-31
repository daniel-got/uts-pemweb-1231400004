import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from "./pages/Home.jsx";
import NewsList from './pages/NewsList.jsx';
import NewsDetail from './pages/NewsDetail.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<NewsList />} />
          <Route path="/search" element={<NewsList />} />
          <Route path="/article" element={<NewsDetail />} />
        </Routes>
      </main>
    <Footer />
    </div>
  );
}

export default App;
