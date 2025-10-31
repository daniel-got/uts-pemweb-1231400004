import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewsCardSkeleton from '../NewsCardSkeleton';

function HeroSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="card h-96 animate-pulse bg-gray dark:bg-black/20"></div>
      </div>
      <div className="space-y-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="card flex gap-4 p-4 h-32 animate-pulse bg-gray dark:bg-black/20">
            <div className="w-24 h-full bg-gray-300 dark:bg-gray-700 rounded-2xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


function HeroSection() {
  const [heroNews, setHeroNews] = useState([]);
  const [heroLoading, setHeroLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      setHeroLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_NEWS_API_BASE_URL}/top-headlines`, {
          params: { apiKey: import.meta.env.VITE_NEWS_API_KEY, country: 'us', pageSize: 4 }
        });
        setHeroNews(res.data.articles);
      } catch (err) {
        console.error(err);
      } finally {
        setHeroLoading(false);
      }
    };
    fetchHero();
  }, []);

  if (heroLoading || heroNews.length === 0) {
    return (
      <section className="container mx-auto px-6 py-12">
        <HeroSkeleton />
      </section>
    );
  }

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Link
          to={`/article?url=${encodeURIComponent(heroNews[0].url)}`}
          state={{ article: heroNews[0] }}
          className="lg:col-span-2 group"
        >
          <div className="card h-96 bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${heroNews[0].urlToImage})` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 p-8 text-white">
              <span className="badge mb-3">HOT</span>
              <h1 className="text-3xl md:text-5xl font-bold mb-3 line-clamp-3 group-hover:text-yellow transition">
                {heroNews[0].title}
              </h1>
              <p className="text-sm opacity-90">{heroNews[0].source.name} • {new Date(heroNews[0].publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
        </Link>

        <div className="space-y-6">
          {heroNews.slice(1).map((article, i) => (
            <Link
              key={i}
              to={`/article?url=${encodeURIComponent(article.url)}`}
              state={{ article }}
              className="block group"
            >
              <div className="card flex gap-4 p-4 h-32">
                {article.urlToImage && (
                  <img src={article.urlToImage} className="w-24 h-full object-cover rounded-2xl border border-black" alt={article.title} />
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-sm line-clamp-2 group-hover:text-yellow transition">
                    {article.title}
                  </h3>
                  <p className="text-xs opacity-70 mt-1">{article.source.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="text-right mt-6">
        <Link to="/category/general" className="text-yellow font-bold hover:underline">
          See more →
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;
