import { useState, useEffect } from 'react';
import axios from 'axios';

const VITE_NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const VITE_NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

function useNewsFetch(category, query) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const endpoint = query ? 'everything' : 'top-headlines';
        const params = {
          apiKey: VITE_NEWS_API_KEY,
          pageSize: 12,
        };

        if (query) {
          params.q = query;
        } else if (category && category !== 'general') {
          params.category = category;
        } else {
          params.country = 'us';
        }

        const res = await axios.get(`${VITE_NEWS_API_BASE_URL}/${endpoint}`, { params });
        setArticles(res.data.articles);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchNews();
  }, [category, query]);

  return { articles, loading, error };
}

export default useNewsFetch;
