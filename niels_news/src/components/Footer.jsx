import { Link } from 'react-router-dom';
import { Twitter, Instagram } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white dark:bg-dark border-t-thick border-black mt-12">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="text-3xl font-bold font-display">
              News<span className="text-yellow">Hub</span>
            </Link>
            <p className="mt-4 opacity-80 text-sm">
              News Portal For Anyone, Get Your Information From Here.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/technology" className="hover:text-yellow">Technology</Link></li>
              <li><Link to="/category/business" className="hover:text-yellow">Business</Link></li>
              <li><Link to="/category/sports" className="hover:text-yellow">Sports</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-yellow">Home</Link></li>
              <li><Link to="/search?q=latest" className="hover:text-yellow">Search</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-yellow" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-yellow" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-black/20 dark:border-white/20 mt-12 pt-8 text-center opacity-70">
          © 2025 NewsHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
