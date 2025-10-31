import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const VITE_NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const VITE_NEWS_API_BASE_URL = import.meta.env.VITE_NEWS_API_BASE_URL;
const PAGE_SIZE = 12;

function useNewsFetch(category, query, selectedDate) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (pageNum) => {
    const isLoadingMore = pageNum > 1;
    if (isLoadingMore) {
      setMoreLoading(true);
    } else {
      setInitialLoading(true);
      setArticles([]); 
    }
    setError(null);

    try {
      const endpoint = (query || selectedDate) ? 'everything' : 'top-headlines';
      const params = {
        apiKey: VITE_NEWS_API_KEY,
        pageSize: PAGE_SIZE,
        page: pageNum,
      };

      if (selectedDate) {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        params.from = formattedDate;
        params.to = formattedDate;
        if (query) {
          params.q = query;
        } else if (category && category !== 'general') {
          params.q = category;
        } else {
          params.q = 'a'; 
        }
      } else if (query) {
        params.q = query;
      } else if (category && category !== 'general') {
        params.category = category;
      } else {
        params.country = 'us';
      }

      const res = await axios.get(`${VITE_NEWS_API_BASE_URL}/${endpoint}`, { params });
      
      if (!res.data.articles || res.data.articles.length === 0) {
        setTotalResults(prev => (isLoadingMore ? prev.length : 0));
      } else {
        setArticles(prev => isLoadingMore ? [...prev, ...res.data.articles] : res.data.articles);
        setTotalResults(res.data.totalResults);
      }
      setPage(pageNum);

    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again later.');
      if (isLoadingMore) {
        setTotalResults(prev => prev.length);
      }
    } finally {
      if (isLoadingMore) {
        setMoreLoading(false);
      } else {
        setInitialLoading(false);
      }
    }
  }, [category, query, selectedDate]); 

  useEffect(() => {
    setArticles([]);
    setPage(1);
    setTotalResults(0);
    fetchNews(1);
  }, [category, query, selectedDate, fetchNews]);

  const fetchMore = () => {
    if (articles.length < totalResults && !moreLoading) {
      fetchNews(page + 1);
    }
  };

  const hasMore = articles.length < totalResults;

  return { articles, initialLoading, moreLoading, error, hasMore, fetchMore };
}

export default useNewsFetch;
