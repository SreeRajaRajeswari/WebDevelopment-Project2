import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostForm({ initialData, onSubmit }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert("Title and Content are required!");
      return;
    }
    onSubmit({
      title,
      author: author || "Anonymous",
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    navigate("/");
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div>
        <label>Title:</label><br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Author:</label><br />
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
      </div>
      <div>
        <label>Content:</label><br />
        <textarea rows="5" value={content} onChange={(e) => setContent(e.target.value)} required />
      </div>
      <div>
        <label>Tags (comma separated):</label><br />
        <input value={tags} onChange={(e) => setTags(e.target.value)} />
      </div>
      <button type="submit" className="button">Save</button>
    </form>
  );
}
