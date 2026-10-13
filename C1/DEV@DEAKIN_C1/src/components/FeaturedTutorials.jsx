import TutorialCard from "./TutorialCard";

const tutorials = [
  {
    title: "Understanding The Metamorphosis",
    description: "A guide to understanding Kafka's use of transformation, alienation, and the absurdity of life.",
    rating: "4",
    username: "Gwen Shapira",
    image: "/images/Guide1.jpg",
  },
  {
    title: "Guide to Understand Schopenhauer",
    description: "Learn how desire, suffering, and the endless search for satisfaction are connected in Schopenhauer's philosophy.",
    rating: "4.5",
    username: "Sandra Shapshay",
    image: "/images/Guide2.jpg",
  },
  {
    title: "Introduction to Stoicism",
    description: "Understand Marcus Aurelius and his views on Stoicism",
    rating: "4.9",
    username: "Donald J. Robertson",
    image: "/images/Guide3.jpg",
  },
];

function FeaturedTutorials() {
  return (
    <section id="tutorials" className="featured-section">
      <h2>Featured Tutorials</h2>

      <div className="cards-container">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.title}
            tutorial={tutorial}
          />
        ))}
      </div>

      <button className="see-more">
        See all tutorials
      </button>
    </section>
  );
}

export default FeaturedTutorials;