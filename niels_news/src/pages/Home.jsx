import HeroSection from '../components/Home/HeroSection.jsx';
import CategoryRow from '../components/Home/CategoryRow.jsx';

const CATEGORIES = [
  { name: 'Technology', slug: 'technology' },
  { name: 'Business', slug: 'business' },
  { name: 'Sports', slug: 'sports' },
  { name: 'Entertainment', slug: 'entertainment' },
  { name: 'Science', slug: 'science' },
];

function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark">
      <HeroSection />

      {CATEGORIES.map((cat) => (
        <CategoryRow key={cat.slug} category={cat} />
      ))}
    </div>
  );
}

export default Home;
