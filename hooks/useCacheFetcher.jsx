import { useEffect, useState } from 'react';

export function mutate (url, value) {
  const cachedItem = localStorage.getItem(url);

  if (cachedItem) {
    localStorage.setItem(url, JSON.stringify(value));
    return true;
  } else return `Cache for ${url} doesnt exist`;
}

export function useCacheFetcher(url, fetcher, params) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    if (!url || typeof fetcher !== 'function') {
      console.error('Invalid arguments passed to useCustomHook');
      return;
    }

    const fetchData = async () => {
      try {
        const cachedData = params?.cache ? localStorage.getItem(url) : null;

        if (params?.cache) {
          if (cachedData) {
            setData(JSON.parse(cachedData));
            setLoading(false)
          }
        }

        const fetchedData = await fetcher(url);

        if (fetchedData.response.status === 200 || (params?.cache && JSON?.stringify(fetchedData) !== JSON?.stringify(cachedData)) && fetchedData.response.status === 200) {
          if (params?.cache) localStorage.setItem(url, JSON.stringify(fetchedData || {}));
          setData(fetchedData);
          setLoading(false);
          setError(null);
        }
      } catch (err) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading, mutate };
}

export function clearCache (url) {
  if (url === "*") {
    localStorage.clear();
  } else {
    const cachedItem = localStorage.getItem(url);

    if (cachedItem) {
      localStorage.removeItem(url);
    } 
  }
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