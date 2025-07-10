import React, { useState } from "react";
import useDinosaurImages from "../hooks/useDinosaurImages";

function PostCard({ post, author, onSelect, onDelete, animationDelay }) {
  const { images, loading } = useDinosaurImages(10); 


const imgUrl = !loading && images.length
  ? images[post.id % images.length]
  : "https://placehold.co/400x200?text=Dinosaurio";

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`ark-postcard scroll-reveal ${isHovered ? 'hovered' : ''}`}
      style={{ animationDelay: `${animationDelay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="ark-postcard-image">
        <img src={imgUrl} alt="Dinosaurio" />
        <div className="ark-postcard-overlay">
          <button className="ark-btn-read" onClick={onSelect}>
            📖 Leer Guía
          </button>
          <button className="ark-btn-delete" onClick={onDelete}>
            🗑️ Eliminar
          </button>
        </div>
      </div>
      
      <div className="ark-postcard-content">
        <h3>{post.title}</h3>
        <p>{post.body.slice(0, 100)}...</p>
        <div className="ark-postcard-footer">
          <span className="ark-author">👤 {author}</span>
          <span className="ark-post-id">#{post.id}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;