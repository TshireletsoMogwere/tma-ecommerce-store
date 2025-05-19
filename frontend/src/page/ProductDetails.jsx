    import React, { useState, useEffect } from 'react';

    function ProductPage() {
      const [data, setData] = useState(null);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`https://dummyjson.com/products/1`); 
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const json = await response.json();
            setData(json);
          } catch (err) {
            setError(err);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
      }, []);

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error: {error.message}</p>;
      }

      return (
        <div>
          {data && (
            <pre>{JSON.stringify(data, null, 2)}</pre>
          )}
        </div>
      );
    }

    export default ProductPage;