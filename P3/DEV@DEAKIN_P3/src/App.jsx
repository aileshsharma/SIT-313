import Navbar from "./components/Navbar";
import Me from "./components/Me";
import About from "./components/About";
import PhotoGallery from "./components/PhotoGallery";
import FeaturedArticles from "./components/FeaturedArticles";
import FeaturedTutorials from "./components/FeaturedTutorials";
import Footer from "./components/Footer";
import Projects from "./components/Projects";


function App() {
  return (
    <>
      <Navbar />

      <main>
        <Me />
        <About />
        <Projects />
        <PhotoGallery />
        <FeaturedArticles />
        <FeaturedTutorials />
      </main>

      <Footer />
    </>
  );
}

export default App;