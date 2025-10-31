import { Link } from 'react-router-dom';

const hotTags = ['AI', 'Election', 'Climate', 'Stocks', 'Olympics'];

function SubNavbar() {
  return (
    <div className="bg-gray dark:bg-dark py-3 border-b border-black/20 dark:border-white/20">
      <div className="container mx-auto flex justify-center items-center gap-4">
        <span className="font-bold text-sm">Hot Tags:</span>
        <div className="flex items-center gap-3 overflow-x-auto">
          {hotTags.map((tag) => (
            <Link
              key={tag}
              to={`/search?q=${tag}`}
              className="text-xs font-semibold px-3 py-1 bg-white dark:bg-black/20 border border-black/30 rounded-full whitespace-nowrap hover:bg-yellow transition"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SubNavbar;
