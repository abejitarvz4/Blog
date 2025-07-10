import React, { useState } from "react";
import CommentForm from "./CommentForm";

function PostDetail({ post, author, comments, onBack, onAddComment, onDeleteComment, onUpdatePost }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState({ title: post.title, body: post.body });

  const handleUpdate = () => {
    onUpdatePost(post.id, editedPost);
    setIsEditing(false);
  };

  return (
    <div className="ark-post-detail fade-in">
      <button className="ark-btn-back" onClick={onBack}>
        ⬅️ Volver a la lista
      </button>

      <article className="ark-post-content">
        {isEditing ? (
          <div className="ark-edit-form">
            <input
              value={editedPost.title}
              onChange={(e) => setEditedPost({...editedPost, title: e.target.value})}
              className="ark-edit-title"
            />
            <textarea
              value={editedPost.body}
              onChange={(e) => setEditedPost({...editedPost, body: e.target.value})}
              className="ark-edit-body"
            />
            <div className="ark-edit-buttons">
              <button onClick={handleUpdate} className="ark-btn-save">💾 Guardar</button>
              <button onClick={() => setIsEditing(false)} className="ark-btn-cancel">❌ Cancelar</button>
            </div>
          </div>
        ) : (
          <>
            <h1>{post.title}</h1>
            <div className="ark-post-meta">
              <span>👤 Por: {author?.name || "Explorador Anónimo"}</span>
              <button onClick={() => setIsEditing(true)} className="ark-btn-edit">
                ✏️ Editar
              </button>
            </div>
            <div className="ark-post-body">
              <p>{post.body}</p>
            </div>
          </>
        )}
      </article>

      {/* Sección de comentarios */}
      <section className="ark-comments-section">
        <h3>💬 Comentarios ({comments.length})</h3>
        
        <CommentForm onAddComment={(text) => onAddComment(post.id, text)} />
        
        <div className="ark-comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="ark-comment slide-in">
              <div className="ark-comment-header">
                <strong>{comment.name}</strong>
                <button 
                  onClick={() => onDeleteComment(comment.id)}
                  className="ark-btn-delete-comment"
                >
                  🗑️
                </button>
              </div>
              <p>{comment.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PostDetail;