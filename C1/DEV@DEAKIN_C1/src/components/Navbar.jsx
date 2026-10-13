import { NavLink } from "react-router-dom";


function Navbar() {

    return (
        <>
            <style>
                {`
            nav {
                display: flex;
                align-items: center;
                background-color: hsl(0, 0%, 18%);
                position: sticky;
                top: 0;
                z-index: 10;
                height: 45px;
                box-sizing: border-box;
            }
            nav a {
                text-decoration: none;
                color: white;
            }
            .logo {
                width: 10%;
            }
            .search {
                width: 75%;
                height: 35px;
                display: flex;
                align-items: stretch;
            }

            .search-logo {
                width: 5%;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: white;
                box-sizing: border-box;
            }
            .search-bar {
                width: 95%;
            }
            .search-bar input {
                width: 100%;
                height: 100%;
                padding: 5px;
                box-sizing: border-box;
                border: none;
                outline:none;
            }
            .left {
                width: 15%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
            }       
        `}
            </style>

            <nav>
                <div className="logo">
                    <NavLink to="/">Dev@Deakin</NavLink>
                </div>

                <div className="search">
                    <div className="search-logo">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </div>

                    <div className="search-bar">
                        <input type="text" placeholder="search" />
                    </div>
                </div>

                <div className="left">
                    

                    <div className="login">
                        <NavLink to="/login">Login</NavLink>
                    </div>

                    <div className="post">
                        <NavLink to="/post">Post</NavLink>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar