import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import axios from 'axios';

function NewsList() {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const endpoint = query ? 'everything' : 'top-headlines';
        const params = {
          apiKey: import.meta.env.VITE_NEWS_API_KEY,
          pageSize: 12,
        };
        if (query) params.q = query;
        else if (category && category !== 'general') params.category = category;
        else params.country = 'us';

        const res = await axios.get(`${import.meta.env.VITE_NEWS_API_BASE_URL}/${endpoint}`, { params });
        setArticles(res.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [category, query]);

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-xl">Loading news...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          {query ? `Search: "${query}"` : category ? `${category.charAt(0).toUpperCase() + category.slice(1)} News` : 'Top Headlines'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={i} className={i === 1 ? 'md:col-span-2' : ''}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
