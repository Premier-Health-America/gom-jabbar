import axios from "axios";
import { useEffect, useState } from "react";

export default function pagination(page, url) {
  const [data, setData] = useState([]); // stores data retrieved
  const [more, setMore] = useState(true); // indicates if there's more data to be retrieved from the API.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false); // indicates error existence

  useEffect(() => {
    // Reset error state before loading
    setError(false);

    // indicate that data-fetching is ongoing
    setLoading(true);

    // make call to API
    axios.get(url, {
      params: { // query params
        page,
        limit: 10, 
      }
    }).then(({ data: respData }) => {
      // add fetched data to list. We make use of Set to avoid duplicates
      setData((prev) => [...new Set([...prev, ...respData.data])]); 
      setMore(Boolean(respData.pageData.nextPage)); // set more to true if nextPage exists
      setLoading(false);
    })
    .catch(() => setError(true)); // set error to true if an exception was caught
  }, [page]);

  return { data, more, loading, error };
}