import React, { useState } from "react";

function CommentForm({ onAddComment }) {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setIsSubmitting(true);
      
      // Simular delay de envío asíncrono
      setTimeout(() => {
        onAddComment(comment);
        setComment("");
        setIsSubmitting(false);
      }, 500);
    }
  };

  return (
    <form className="ark-comment-form" onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Comparte tu experiencia de supervivencia..."
        required
        disabled={isSubmitting}
      />
      <button 
        type="submit" 
        disabled={isSubmitting || !comment.trim()}
        className="ark-btn-comment"
      >
        {isSubmitting ? "📤 Enviando..." : "💬 Comentar"}
      </button>
    </form>
  );
}

export default CommentForm;