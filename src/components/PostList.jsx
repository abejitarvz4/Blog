import React, { useState } from "react";
import PostCard from "./PostCard";
import useScrollAnimation from "../hooks/useScrollAnimation";

function PostList({ posts, users, onSelectPost, onDeletePost, onAddPost }) {
  const [showForm, setShowForm] = useState(false);
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  
  // Hook personalizado para animaciones de scroll
  useScrollAnimation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.body) {
      onAddPost(newPost);
      setNewPost({ title: "", body: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="ark-postlist-container">
      {/* Botón para agregar post */}
      <div className="ark-add-post-section">
        <button 
          className="ark-btn-add-post"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "❌ Cancelar" : "➕ Nueva Guía"}
        </button>
      </div>

      {/* Formulario para nuevo post */}
      {showForm && (
        <form className="ark-new-post-form slide-down" onSubmit={handleSubmit}>
          <h3>🦕 Crear Nueva Guía de Supervivencia</h3>
          <input
            type="text"
            placeholder="Título de la guía..."
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
            required
          />
          <textarea
            placeholder="Contenido de la guía..."
            value={newPost.body}
            onChange={(e) => setNewPost({...newPost, body: e.target.value})}
            required
          />
          <button type="submit" className="ark-btn-submit">🚀 Publicar Guía</button>
        </form>
      )}

      {/* Lista de posts con animaciones */}
      <div className="ark-postlist">
        {posts.length === 0 ? (
          <div className="ark-no-results">
            <h3>🔍 No se encontraron guías</h3>
            <p>Intenta con otros términos de búsqueda</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <PostCard
              key={post.id}
              post={post}
              author={users.find(u => u.id === post.userId)?.name || "Explorador Anónimo"}
              onSelect={() => onSelectPost(post)}
              onDelete={() => onDeletePost(post.id)}
              animationDelay={index * 0.1}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default PostList;