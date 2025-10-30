import { useLocation, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import useArticleFetch from '../hooks/useArticleFetch';

function NewsDetail() {
  const { state } = useLocation();
  const [searchParams] = useSearchParams();
  const url = searchParams.get('url');

  const hasArticleInState = !!state?.article;
  const { article: fetchedArticle, loading, error } = useArticleFetch(url, hasArticleInState);

  const article = state?.article || fetchedArticle;

  if (loading) {
    return <p className="text-center text-xl p-12">Loading article...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 p-12">{error}</p>;
  }

  if (!article) {
    return <p className="text-center text-red-500 p-12">Article not found.</p>;
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      <div className="card bg-gradient-to-br from-purple/10 to-yellow/10 mb-12">
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
          {article.title}
        </h1>
        <div className="flex flex-wrap gap-3 mb-6">
          <span className="badge">{article.source.name}</span>
          <span className="badge">{format(new Date(article.publishedAt), 'PPP')}</span>
        </div>
      </div>

      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-full rounded-3xl border-thick border-black mb-8 shadow-card" />
      )}

      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed">
          {article.content || article.description}
        </p>
      </div>

      <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn inline-block mt-8">
        Read Full Article
      </a>
    </div>
  );
}
export default NewsDetail;
