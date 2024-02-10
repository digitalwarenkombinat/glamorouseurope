import { useEffect, useState } from "react";

import api from "./api";
import { ImageElement } from "./components/Select";

export const useFetch = () => {
  const [data, setData] = useState([] as ImageElement[]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(api.sparqlQuery());

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        setData(result.results.bindings);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
