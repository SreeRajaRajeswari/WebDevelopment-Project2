import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="card">
      <h2>{post.title}</h2>
      <p><strong>By:</strong> {post.author || "Anonymous"}</p>
      <p>{post.content.substring(0, 120)}...</p>
      <p><strong>Tags:</strong> {post.tags.join(", ")}</p>
      <div className="actions">
        <Link to={`/post/${post.id}`} className="button">🔍 View</Link>
        <Link to={`/edit/${post.id}`} className="button edit">✏️ Edit</Link>
      </div>
    </div>
  );
}
