
function Footer() {
  return (
    <footer className="bg-light-tertiary dark:bg-dark-background py-12 border-t border-light-neutral">
      <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-light-primary mb-4">News Portal</h3>
          <p className="text-light-text">Your trusted news source.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Categories</h4>
          <ul className="space-y-2 text-light-text">
            <li><a href="/category/technology">Technology</a></li>
            {/* etc */}
          </ul>
        </div>
        {/* Tambah columns untuk Resources, Company */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <p>info@newsportal.com</p>
        </div>
      </div>
      <div className="border-t border-light-neutral mt-8 pt-8 text-center text-light-text">
        © 2025 News Portal. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
