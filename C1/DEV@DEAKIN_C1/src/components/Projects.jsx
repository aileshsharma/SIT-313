const projects = [
  {
    title: "BMI Calculator",
    image: "/images/Project1.jpg",
    description:
      "This is a BMI Calculator that I made using HTML, CSS and JavaScript. It categorizes users according to their weight.",
    github: "https://github.com/aileshsharma/BMI_Calculater",
  },
  {
    title: "Student Registration Portal",
    image: "/images/Project2.jpg",
    description:
      "This is a Student Registration Portal which takes student details as input and stores them in a table.",
    github: "https://github.com/aileshsharma/Student-Registration",
  },
];

function Projects() {
  return (
    <section id="projects" className="projects-section">
      {projects.map((project) => (
        <div className="project-card" key={project.title}>
          <img
            src={project.image}
            alt={project.title}
          />

          <div className="project-content">
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
            >
              View Project on GitHub →
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Projects;