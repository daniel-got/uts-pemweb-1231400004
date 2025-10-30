import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import NewsCard from '../components/NewsCard';
import NewsCardSkeleton from '../components/NewsCardSkeleton';
import useNewsFetch from '../hooks/useNewsFetch';

function NewsList() {
  const { category: categoryParam } = useParams();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = categoryParam || (query ? null : 'general');

  const { articles, initialLoading, moreLoading, error, hasMore, fetchMore } = useNewsFetch(category, query);

  const getTitle = () => {
    if (query) return `Search: "${query}"`;
    if (category && category !== 'general') return `${category.charAt(0).toUpperCase() + category.slice(1)} News`;
    return 'Top Headlines';
  };

  const handleLoadMore = (e) => {
    e.currentTarget.blur();
    
    if (moreLoading) {
      return;
    }
    fetchMore();
  };

  if (initialLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">{getTitle()}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 9 }).map((_, i) => (
            <NewsCardSkeleton key={`initial-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (error && articles.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">{getTitle()}</h1>
        <p className="text-center text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple/20 rounded-full blur-3xl -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12">{getTitle()}</h1>

        {articles.length === 0 && !initialLoading && (
          <p className="text-center text-xl">No articles found.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div key={article.url}>
              <NewsCard article={article} />
            </div>
          ))}
          
          {moreLoading && (
            <>
              <NewsCardSkeleton key="more-skeleton-1" />
              <NewsCardSkeleton key="more-skeleton-2" />
              <NewsCardSkeleton key="more-skeleton-3" />
            </>
          )}
        </div>

        {error && !initialLoading && (
          <p className="text-center text-xl text-red-500 mt-8">{error}</p>
        )}

        <div className="text-center mt-12">
          {hasMore && (
            <button
              onClick={handleLoadMore}
              className={`btn ${moreLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {moreLoading ? 'Loading...' : 'Load More News'}
            </button>
          )}
          
          {!hasMore && articles.length > 0 && (
            <p className="text-center mt-12 opacity-70">You've reached the end of the news.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default NewsList;
