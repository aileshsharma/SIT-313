import ArticleCard from "./ArticleCard";

const articles = [
  {
    title: "The Metamorphosis (1915)",
    description: "A novella that explores themes of transformation and the absurdity of life.",
    rating: "5",
    author: "Franz Kafka",
    image: "/images/Kafka.jpg",
  },
  {
    title: "On the Sufferings of the World",
    description: "Suffering is inherent to human existence, arising from desire, loss, and the instability of satisfaction.",
    rating: "4.8",
    author: "Arthur Schopenhauer",
    image: "/images/Arthur Schopenhauer.jpg",
  },
  {
    title: "The Meditations",
    description: "Importance of rational thought, self-control, and acceptance of the natural order of the universe.",
    rating: "4.9",
    author: "Marcus Aurelius",
    image: "/images/Marcus Aurelius.jpg",
  },

  
];

function FeaturedArticles() {
  return (
    <section id="articles" className="featured-section">
      <h2>Featured Articles</h2>

      <div className="cards-container">
        {articles.map((article) => (
          <ArticleCard
            key={article.title}
            article={article}
          />
        ))}
      </div>

      <button className="see-more">
        See all articles
      </button>
    </section>
  );
}

export default FeaturedArticles;