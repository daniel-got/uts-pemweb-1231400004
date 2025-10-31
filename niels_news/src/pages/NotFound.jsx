import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple/10 via-mint/20 to-yellow/10 px-6">
      <div className="card max-w-md w-full text-center p-10">
        <h1 className="text-9xl font-display font-bold text-yellow mb-4">404</h1>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg opacity-80 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="btn inline-block text-lg px-8 py-4"
        >
          Back to Home
        </Link>

        <div className="absolute -top-20 -left-20 w-48 h-48 bg-yellow/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-56 h-56 bg-purple/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      </div>
    </div>
  );
}
