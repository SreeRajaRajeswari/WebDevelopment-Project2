import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePosts } from "../context/PostsContext";
import { validateTitle, validateContent, validateTags } from "../utils/validators";

export default function PostCreate() {
  const navigate = useNavigate();
  const { createPost } = usePosts();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const newErrors = {};
    const titleError = validateTitle(title);
    const contentError = validateContent(content);
    const tagsError = validateTags(tags);

    if (titleError) newErrors.title = titleError;
    if (contentError) newErrors.content = contentError;
    if (tagsError) newErrors.tags = tagsError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    createPost({
      title,
      author,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });

    navigate("/");
  }

  return (
    <div className="card">
      <h2>📝 Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label><br />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error">{errors.title}</p>}
        </div>

        <div>
          <label>Author:</label><br />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Anonymous"
          />
        </div>

        <div>
          <label>Content:</label><br />
          <textarea
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <p className="error">{errors.content}</p>}
        </div>

        <div>
          <label>Tags (comma separated):</label><br />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {errors.tags && <p className="error">{errors.tags}</p>}
        </div>

        <button type="submit" className="button" style={{ marginTop: "1rem" }}>
          ✅ Create Post
        </button>
      </form>
    </div>
  );
}
