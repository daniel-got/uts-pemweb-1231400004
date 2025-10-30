
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

function NewsCard({ article }) {
  return (
    <Link 
      to={`/article/${encodeURIComponent(article.url)}`} 
      state={{ article }}
      className="card group block" // card + block
    >
      {article.urlToImage && (
        <div className="mb-4 overflow-hidden rounded-2xl border border-black">
          <img 
            src={article.urlToImage} 
            alt={article.title}
            className="w-full h-48 object-cover transition-transform group-hover:scale-105"
          />
        </div>
      )}
      
      <div className="flex items-center gap-2 mb-2">
        <span className="badge">NEW</span>
        <span className="text-xs font-bold">{article.source.name}</span>
      </div>

      <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-yellow transition">
        {article.title}
      </h3>

      <p className="text-sm opacity-80 line-clamp-3 mb-3">
        {article.description || 'No description available.'}
      </p>

      <div className="flex justify-between text-xs font-medium">
        <span>{format(new Date(article.publishedAt), 'MMM d, yyyy')}</span>
        <span className="text-yellow">Read</span>
      </div>
    </Link>
  );
}

export default NewsCard;
