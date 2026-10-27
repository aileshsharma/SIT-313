function ArticleCard({ article }) {
  return (
    <article className="content-card">
      <img
        src={article.image}
        alt={article.title}
      />

      <div className="card-body">
        <h3>{article.title}</h3>

        <p>{article.description}</p>

        <div className="rating">
          <span>★</span>
          {article.rating}
        </div>

        <p className="author">
          {article.author}
        </p>
      </div>
    </article>
  );
}

export default ArticleCard;