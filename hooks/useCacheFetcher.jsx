import { useEffect, useState } from 'react';

export function useCacheFetcher(url, fetcher) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (!url || typeof fetcher !== 'function') {
      console.error('Invalid arguments passed to useCustomHook');
      return;
    }

    const fetchData = async () => {
      try {
        const cachedData = localStorage.getItem(url);

        if (cachedData) {
          setData(JSON.parse(cachedData));
          setLoading(false)
        }

        const fetchedData = await fetcher(url);
        
        if (JSON.stringify(fetchedData) !== JSON.stringify(cachedData)) {
          localStorage.setItem(url, JSON.stringify(fetchedData || {}));
          setData(fetchedData);
          setLoading(false)
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
}

export function useClearCache(url) {
  const [isClearing, setIsClearing] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      if (url) {
        if (url === "*") {
          localStorage.clear();
        } else {
          const cachedItem = localStorage.getItem(url);

          if (cachedItem) {
            localStorage.removeItem(url);
          } else setError(`Cache for ${url} doesnt exist`);
        }        
      }
      setIsClearing(false);
    } catch (err) {
      setError(err.message || "An error occured")
    }
  }, [url]);

  return { isClearing, error };
}