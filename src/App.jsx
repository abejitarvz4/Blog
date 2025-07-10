import React, { useState, useEffect } from "react";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";
import SearchBar from "./components/SearchBar";
import LoadingSpinner from "./components/LoadingSpinner";
import ImageCarousel from "./components/ImageCarousel";
import "./App.css";

function App() {
  // Estados para manipulación del DOM
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // INTERCAMBIO ASÍNCRONO DE INFORMACIÓN
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [postsRes, usersRes, commentsRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users"),
          fetch("https://jsonplaceholder.typicode.com/comments")
        ]);

        if (!postsRes.ok || !usersRes.ok || !commentsRes.ok) {
          throw new Error('Error al cargar datos');
        }

        const [postsData, usersData, commentsData] = await Promise.all([
          postsRes.json(),
          usersRes.json(),
          commentsRes.json()
        ]);

        setPosts(postsData.slice(0, 15));
        setUsers(usersData);
        setComments(commentsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // MANIPULACIÓN DEL DOM - Filtrado en tiempo real
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  // MANIPULACIÓN DEL DOM - CRUD Operations
  const addPost = (newPost) => {
    const post = {
      id: Date.now(),
      title: newPost.title,
      body: newPost.body,
      userId: 1
    };
    setPosts([post, ...posts]);
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
    if (selectedPost && selectedPost.id === postId) {
      setSelectedPost(null);
    }
  };

  const updatePost = (postId, updatedData) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, ...updatedData } : post
    ));
  };

  const addComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      postId: postId,
      name: "Superviviente ARK",
      email: "survivor@ark.com",
      body: commentText
    };
    setComments([...comments, newComment]);
  };

  const deleteComment = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="ark-error">Error: {error}</div>;

  return (
    <div className={`ark-blog-bg ${darkMode ? 'dark-mode' : ''}`}>
      {/* Header con animaciones */}
      <header className="ark-header">
        <div className="ark-logo-container">
          <img 
            src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=120&h=120&fit=crop&crop=center" 
            alt="Ark Logo" 
            className="ark-logo animate-bounce"
          />
          <h1 className="ark-title typing-animation">ARK: Survival Ascended Blog</h1>
          <p className="ark-subtitle fade-in">Guías, tips y aventuras de supervivencia</p>
        </div>
        
        <button 
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      {/* Carrusel de imágenes */}
      <ImageCarousel />

      <main className="ark-main">
        {!selectedPost ? (
          <>
            <SearchBar search={search} setSearch={setSearch} />
            <PostList 
              posts={filteredPosts} 
              users={users} 
              onSelectPost={setSelectedPost}
              onDeletePost={deletePost}
              onAddPost={addPost}
            />
          </>
        ) : (
          <PostDetail 
            post={selectedPost}
            author={users.find(u => u.id === selectedPost.userId)}
            comments={comments.filter(c => c.postId === selectedPost.id)}
            onBack={() => setSelectedPost(null)}
            onAddComment={addComment}
            onDeleteComment={deleteComment}
            onUpdatePost={updatePost}
          />
        )}
      </main>

      <footer className="ark-footer">
        <p>&copy; 2025 ARK Survival Blog - Sobrevive y Evoluciona</p>
      </footer>
    </div>
  );
}

export default App;