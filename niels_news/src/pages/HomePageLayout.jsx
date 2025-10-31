import Home from './Home.jsx';
import NewsList from './NewsList.jsx';

function HomePageLayout({ selectedDate }) {
  if (selectedDate) {
    return <NewsList selectedDate={selectedDate} />;
  }

  return <Home />;
}

export default HomePageLayout;
