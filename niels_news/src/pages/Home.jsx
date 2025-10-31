import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import NewsCardSkeleton from '../components/NewsCardSkeleton';
import axios from 'axios';

const CATEGORIES = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Science', slug: 'science' },
];

function Home() {
  const [heroNews, setHeroNews] = useState(null);
  const [heroLoading, setHeroLoading] = useState(true);
  const [categories, setCategories] = useState(
    CATEGORIES.map(cat => ({ ...cat, articles: [], loading: true }))
  );

  useEffect(() => {
    const fetchHero = async () => {
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

  useEffect(() => {
    const fetchCategory = async (cat, index) => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_NEWS_API_BASE_URL}/top-headlines`, {
          params: { apiKey: import.meta.env.VITE_NEWS_API_KEY, category: cat.slug, pageSize: 4 }
        });
        setCategories(prev => {
          const updated = [...prev];
          updated[index] = { ...updated[index], articles: res.data.articles, loading: false };
          return updated;
        });
      } catch (err) {
        console.error(err);
      }
    };

    CATEGORIES.forEach((cat, i) => fetchCategory(cat, i));
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <section className="container mx-auto px-6 py-12">
        {heroLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NewsCardSkeleton height="h-96" />
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map(i => <NewsCardSkeleton key={i} />)}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Link
              to={`/article/${encodeURIComponent(heroNews[0].url)}`}
              state={{ article: heroNews[0] }}
              className="lg:col-span-2 group"
            >
              <div className="card h-full bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${heroNews[0].urlToImage})` }}>
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
                  to={`/article/${encodeURIComponent(article.url)}`}
                  state={{ article }}
                  className="block group"
                >
                  <div className="card flex gap-4 p-4 h-32">
                    {article.urlToImage && (
                      <img src={article.urlToImage} className="w-24 h-full object-cover rounded-2xl border border-black" />
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
        )}

        <div className="text-right mt-6">
          <Link to="/category/general" className="text-yellow font-bold hover:underline">
            See more →
          </Link>
        </div>
      </section>

      {categories.map((cat, idx) => (
        <section key={cat.slug} className="container mx-auto px-6 py-8 border-t-2 border-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">{cat.name}</h2>
            <Link to={`/category/${cat.slug}`} className="text-yellow font-bold hover:underline">
              See more →
            </Link>
          </div>

          {cat.loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <NewsCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.articles.map((article, i) => (
                <NewsCard key={i} article={article} />
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default Home;
