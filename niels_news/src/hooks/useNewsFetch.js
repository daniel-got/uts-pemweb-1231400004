import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const PAGE_SIZE = 12;
let allArticlesCache = []; 

function useNewsFetch(category, query, selectedDate) {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [moreLoading, setMoreLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllNews = async () => {
      if (allArticlesCache.length > 0) {
        return; 
      }
      try {
        const res = await axios.get('/mockdata.json'); 
        allArticlesCache = res.data.articles || [];
      } catch (err) {
        console.error('Error fetching mock data:', err);
        setError('Failed to load mock data. Check public/mockdata.json.');
      }
    };
    fetchAllNews();
  }, []);

  useEffect(() => {
    setInitialLoading(true);

    let data = [...allArticlesCache];

    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      data = data.filter(art => art.publishedAt && art.publishedAt.startsWith(formattedDate));
    }

    if (query) {
      data = data.filter(art => 
        (art.title && art.title.toLowerCase().includes(query.toLowerCase())) ||
        (art.description && art.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
    
    if (category && category !== 'general' && !query) {
      data = data.filter(art => 
        (art.title && art.title.toLowerCase().includes(category.toLowerCase())) ||
        (art.description && art.description.toLowerCase().includes(category.toLowerCase()))
      );
    }

    setFilteredArticles(data);
    setPage(1); 
    setArticles(data.slice(0, PAGE_SIZE)); 
    setInitialLoading(false);
    
  }, [category, query, selectedDate]);

  const fetchMore = () => {
    if (articles.length >= filteredArticles.length) return;

    setMoreLoading(true);
    
    setTimeout(() => {
      const newPage = page + 1;
      const newArticles = filteredArticles.slice(articles.length, newPage * PAGE_SIZE);
      setArticles(prev => [...prev, ...newArticles]);
      setPage(newPage);
      setMoreLoading(false);
    }, 500); 
  };

  const hasMore = articles.length < filteredArticles.length;

  return { articles, initialLoading, moreLoading, error, hasMore, fetchMore };
}

export default useNewsFetch;
