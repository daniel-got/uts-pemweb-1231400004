import { useState, useEffect } from 'react';
import axios from 'axios';

const VITE_NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const VITE_NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;

function useArticleFetch(url, skip) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (skip || !url) {
      setLoading(false);
      return;
    }

    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = {
          apiKey: VITE_NEWS_API_KEY,
          q: url,
        };
        const res = await axios.get(`${VITE_NEWS_API_BASE_URL}/everything`, { params });
        
        if (res.data.articles && res.data.articles.length > 0) {
          setArticle(res.data.articles[0]);
        } else {
          setError('Article not found.');
        }
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load the article.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [url, skip]);

  return { article, loading, error };
}

export default useArticleFetch;
