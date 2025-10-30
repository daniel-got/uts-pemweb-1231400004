import { useParams, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import NewsCardSkeleton from '../components/NewsCardSkeleton';
import useNewsFetch from '../hooks/useNewsFetch';

function NewsList() {
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  
  const category = categoryParam || (query ? null : 'general');
  
  const { articles, loading, error } = useNewsFetch(category, query);

  const getTitle = () => {
    if (query) return `Search: "${query}"`;
    if (category && category !== 'general') return `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    return 'Top Headlines';
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          {getTitle()}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <NewsCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          {getTitle()}
        </h1>
        <p className="text-center text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">
          {getTitle()}
        </h1>
        
        {articles.length === 0 && !loading && (
          <p className="text-center text-xl">No articles found matching your criteria.</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <div key={article.url || i}>
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
