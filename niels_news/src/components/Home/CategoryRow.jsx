import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../NewsCard.jsx';
import NewsCardSkeleton from '../NewsCardSkeleton.jsx';

function CategoryRow({ category }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_NEWS_API_BASE_URL}/top-headlines`, {
          params: { apiKey: import.meta.env.VITE_NEWS_API_KEY, category: category.slug, pageSize: 4, country: 'us' }
        });
        setArticles(res.data.articles);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategory();
  }, [category.slug]);

  return (
    <section className="container mx-auto px-6 py-8 border-t-2 border-black">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">{category.name}</h2>
        <Link to={`/category/${category.slug}`} className="text-yellow font-bold hover:underline">
          See more →
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((article, i) => (
            <NewsCard key={i} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}

export default CategoryRow;
