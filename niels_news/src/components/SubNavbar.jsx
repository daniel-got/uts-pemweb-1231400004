const hotTags = ['AI', 'Election', 'Climate', 'Stocks', 'Olympics'];

function SubNavbar() {
  return (
    <div className="bg-gradient-to-r from-light-secondary to-light-primary py-4">
      <div className="container mx-auto flex justify-center space-x-4">
        <span className="font-semibold text-light-background">Hot Tags:</span>
        {hotTags.map((tag) => (
          <a key={tag} href={`/search?q=${tag}`} className="text-light-background hover:underline">
            #{tag}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SubNavbar;
