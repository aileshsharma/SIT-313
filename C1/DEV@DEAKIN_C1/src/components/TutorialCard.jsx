function TutorialCard({ tutorial }) {
  return (
    <article className="content-card">
      <img
        src={tutorial.image}
        alt={tutorial.title}
      />

      <div className="card-body">
        <h3>{tutorial.title}</h3>

        <p>{tutorial.description}</p>

        <div className="rating">
          <span>★</span>
          {tutorial.rating}
        </div>

        <p className="author">
          {tutorial.username}
        </p>
      </div>
    </article>
  );
}

export default TutorialCard;