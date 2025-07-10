import React, { useState } from "react";
import useDinosaurImages from "../hooks/useDinosaurImages";

function ImageCarousel() {
  const { images, loading } = useDinosaurImages(8);
  const [current, setCurrent] = useState(0);

  if (loading) {
    return (
      <div className="ark-spinner">
        <span>Cargando imágenes de dinosaurios...</span>
      </div>
    );
  }

  if (!images.length) {
    return (
      <div className="ark-spinner">
        <span>No se pudieron cargar imágenes de dinosaurios.</span>
      </div>
    );
  }

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="ark-carousel">
      <div className="ark-carousel-image">
        <img
          src={images[current]}
          alt={`Dinosaurio ${current + 1}`}
        />
      </div>
      <div className="ark-carousel-controls">
        <button className="ark-carousel-btn" onClick={prev}>⏪</button>
        <button className="ark-carousel-btn" onClick={next}>⏩</button>
      </div>
    </div>
  );
}

export default ImageCarousel;