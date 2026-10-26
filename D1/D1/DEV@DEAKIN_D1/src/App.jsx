import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useState } from 'react'

import Navbar from "./components/Navbar";
import Me from "./components/Me";
import About from "./components/About";
import PhotoGallery from "./components/PhotoGallery";
import FeaturedArticles from "./components/FeaturedArticles";
import FeaturedTutorials from "./components/FeaturedTutorials";
import Footer from "./components/Footer";
import Projects from "./components/Projects";
import Post from "./components/Post";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { AuthProvider } from "./context/AuthContext";
import Pricing from "./components/Pricing";

function App() {

  const [login, setLogin] = useState({ email: "", password: "" })
  const [signup, setSignup] = useState({ name: "", email: "", password: "", Cpassword: "" })

  const handleChange1 = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value })
  }

  const handleChange2 = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value })
  }

  const resetLogin = () => {
    setLogin({ email: "", password: "" });
  };

  const resetSignup = () => {
    setSignup({
      name: "",
      email: "",
      password: "",
      Cpassword: ""
    });
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <Navbar />
        <Me />
        <About />
        <Projects />
        <PhotoGallery />
        <FeaturedArticles />
        <FeaturedTutorials />
        <Footer />
      </>
    },
    {
      path: "/login",
      element: <><Navbar /><Login login={login} handleChange1={handleChange1} resetLogin={resetLogin} /></>
    },
    {
      path: "/signup",
      element: <><Navbar /><Signup signup={signup} handleChange2={handleChange2} resetSignup={resetSignup} /></>
    },
    {

      path: "/pricing",
      element: (
        <>
          <Navbar />
          <Pricing />

        </>
      )
    },
    {
      path: "/post",
      element: (
        <>
          <Navbar />
          <Post />
          <Footer />
        </>
      )
    }
  ])
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App