function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">DEV@Deakin</div>

        <ul className="nav-links">
          <li>
            <a href="#about">About</a>
          </li>

          <li>
            <a href="#projects">Work</a>
          </li>

          <li>
            <a href="#articles">Articles</a>
          </li>

          <li>
            <a href="#tutorials">Tutorials</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;