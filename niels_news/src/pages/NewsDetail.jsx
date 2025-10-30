import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';
function NewsDetail() {
  const { article } = useLocation().state || {};
  if (!article) return <p className="text-center text-red-500">Article not found.</p>;

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
        <img src={article.urlToImage} className="w-full rounded-3xl border-thick border-black mb-8 shadow-card" />
      )}

      <div className="prose prose-lg max-w-none">
        <p className="text-lg leading-relaxed">
          {article.content || article.description}
        </p>
      </div>

      <a href={article.url} target="_blank" className="btn inline-block mt-8">
        Read Full Article
      </a>
    </div>
  );
}
export default NewsDetail;
