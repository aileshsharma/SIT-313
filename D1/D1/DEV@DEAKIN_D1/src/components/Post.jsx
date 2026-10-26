
import { useState } from "react";
import "./Post.css";

function Post() {
  const [postType, setPostType] = useState("question");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    abstract: "",
    articleText: "",
    tags: "",
  });

  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setMessage("");
  };

  const handlePostTypeChange = (event) => {
    setPostType(event.target.value);
    setMessage("");
    setShowPopup(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (postType === "question" && !formData.description.trim()) {
      setMessage("Please describe your question.");
      return;
    }

    if (postType === "article" && !formData.abstract.trim()) {
      setMessage("Please enter an abstract.");
      return;
    }

    if (postType === "article" && !formData.articleText.trim()) {
      setMessage("Please enter the article text.");
      return;
    }

    if (!formData.tags.trim()) {
      setMessage("Please enter at least one tag.");
      return;
    }

    setMessage("");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <main className="post-page">
      <h1>New Post</h1>

      <form onSubmit={handleSubmit}>
        <div className="post-type-section">
          <label className="section-label">
            Select Post Type
          </label>

          <div className="post-type-options">
            <label>
              <input
                type="radio"
                name="postType"
                value="question"
                checked={postType === "question"}
                onChange={handlePostTypeChange}
              />
              Question
            </label>

            <label>
              <input
                type="radio"
                name="postType"
                value="article"
                checked={postType === "article"}
                onChange={handlePostTypeChange}
              />
              Article
            </label>
          </div>
        </div>

        <div className="post-field">
          <label htmlFor="title">Title*</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a descriptive title"
          />
        </div>

        {postType === "question" && (
          <div className="post-field">
            <label htmlFor="description">
              Describe your problem*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your question or problem..."
              rows="6"
            />
          </div>
        )}

        {postType === "article" && (
          <>
            <div className="post-field">
              <label htmlFor="abstract">Abstract*</label>
              <textarea
                id="abstract"
                name="abstract"
                value={formData.abstract}
                onChange={handleChange}
                placeholder="Provide a short summary of your article..."
                rows="3"
              />
            </div>

            <div className="post-field">
              <label htmlFor="articleText">
                Article Text*
              </label>
              <textarea
                id="articleText"
                name="articleText"
                value={formData.articleText}
                onChange={handleChange}
                placeholder="Write your article here..."
                rows="8"
              />
            </div>
          </>
        )}

        <div className="post-field">
          <label htmlFor="tags">Tags*</label>
          <input
            id="tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="e.g. React, JavaScript, Web Development"
          />
          <small>Separate multiple tags with commas.</small>
        </div>

        {message && (
          <p className="post-error" role="alert">
            {message}
          </p>
        )}

        <button type="submit" className="post-submit">
          Post
        </button>
      </form>

      {showPopup && (
        <div className="post-popup-overlay">
          <div
            className="post-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="popup-title"
          >
            <h2 id="popup-title">
              {postType === "question"
                ? "Question Ready"
                : "Article Ready"}
            </h2>

            <p>
              Your {postType} has passed validation.
              No content has been published.
            </p>

            <button
              type="button"
              className="post-submit"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Post;