import { useEffect, useState } from "react";

const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

export default function useDinosaurImages(count = 10) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ACCESS_KEY) {
      setImages([]);
      setLoading(false);
      return;
    }

    fetch(
      `https://api.unsplash.com/search/photos?query=dinosaur&per_page=${count}&client_id=${ACCESS_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.results) {
          setImages(data.results.map(img => img.urls.regular));
        } else {
          setImages([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setImages([]);
        setLoading(false);
      });
  }, [count]);

  return { images, loading };
}