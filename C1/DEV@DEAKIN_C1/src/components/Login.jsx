import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utilities/firebase";

function Login({ login, handleChange1, resetLogin }) {

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(
                auth,
                login.email,
                login.password
            );

            navigate("/");
        } catch (error) {
            console.log(error.code);
            console.log(error.message);

            if (error.code === "auth/invalid-credential") {
                alert("Account not found or incorrect password. Please try again or sign up.");
            }
            else if (error.code === "auth/invalid-email") {
                alert("Please enter a valid email.");
            }
            else if (error.code === "auth/missing-password") {
                alert("Please enter your password.");
            }
            else if (error.code === "auth/too-many-requests") {
                alert("Too many attempts. Please try again later.");
            }
            else {
                alert("Login failed: " + error.message);
            }
        }
        
        resetLogin();
    };

    return (
        <>
            <style>
                {`
            .container{
                display:flex;
                flex-direction:column;
                width:300px;
                border: 3px solid hsl(220, 100%, 50%);
                padding:70px;
                margin:100px auto;
            }
            p{
                color:black;
            }
            #btn1{
                width:80px;
                align-self:flex-end;
                background-color:white;
                border: 2px solid hsl(220, 100%, 50%);
                color:hsl(220, 100%, 50%);
                padding:5px;
                transition: transform 0.15s;
            }
            .container a {
                align-self: flex-end;
            }
            #btn1:hover{
                transform: scale(1.1);
                cursor:pointer;
            }
            #btn2{
                margin-top:30px;
                background-color:hsl(220, 100%, 50%);
                color:white;
                border:none;
                padding:4px;
                transition: background-color 0.15s;
            }
            #btn2:hover{
                background-color: hsl(220, 95%, 61%);
                cursor:pointer;
            }  
        `}
            </style>
            <div className='container'>
                <NavLink to="/signup"><button id='btn1'>Signup</button></NavLink>
                <p>email</p>
                <input onChange={handleChange1} type='email' name='email' value={login.email} />

                <p>password</p>
                <input onChange={handleChange1} type='password' name='password' value={login.password} />
                <button onClick={handleLogin} id='btn2'>Login</button>
            </div>
        </>
    )
}

export default Login
