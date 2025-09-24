import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, deletePost } = usePosts();

  const post = getPostById(id);

  if (!post) {
    return <div className="card">❌ Post not found</div>;
  }

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
      navigate("/");
    }
  };

  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p><strong>By:</strong> {post.author}</p>
      <p>{post.content}</p>
      <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
      <p><em>Created: {new Date(post.createdAt).toLocaleString()}</em></p>
      <p><em>Updated: {new Date(post.updatedAt).toLocaleString()}</em></p>

      <div className="actions">
        <Link to={`/edit/${post.id}`} className="button edit">✏️ Edit</Link>
        <button onClick={handleDelete} className="button delete">🗑️ Delete</button>
        <Link to="/" className="button">⬅ Back</Link>
      </div>
    </div>
  );
}
