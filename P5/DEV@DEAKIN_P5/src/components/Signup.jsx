import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./utilities/firebase";

function Signup({ signup, handleChange2, resetSignup }) {

const handleSignup = async () => {
  if (signup.password !== signup.Cpassword) {
    alert("Passwords do not match");
    return;
  }

  try {
    await createUserWithEmailAndPassword(
      auth,
      signup.email,
      signup.password 
    );

    await addDoc(collection(db, "users"), {
      name: signup.name,
      email: signup.email
    });

    console.log("Account created successfully");
    alert("Account created successfully");

  } catch (error) {
    console.log("Firebase error:", error);
    alert(error.message);
  }

  resetSignup();
};

  return (
    <>
      <style>
        {`
          .signup-container {
            display: flex;
            flex-direction: column;
            width: 550px;
            border: 3px solid hsl(220, 100%, 50%);
            padding: 20px 30px 35px;
            margin: 30px auto;
          }

          .signup-container h2 {
            text-align: center;
            color: hsl(220, 100%, 50%);
            margin-bottom: 20px;
          }

          .form-row {
            display: flex;
            align-items: center;
            margin: 10px 0;
          }

          .form-row label {
            width: 140px;
          }

          .form-row input {
            flex: 1;
            padding: 6px;
          }

          #create-btn {
            margin-left: 140px;
            margin-top: 25px;
            background-color: hsl(220, 100%, 50%);
            color: white;
            border: none;
            padding: 7px;
            transition: background-color 0.15s;
          }

          #create-btn:hover {
            background-color: hsl(220, 95%, 61%);
            cursor: pointer;
          }
        `}
      </style>

      <div className="signup-container">

        <h2>Create a DEV@Deakin Account</h2>

        <div className="form-row">
          <label>Name*</label>
          <input onChange={handleChange2} type="text" name='name' value={signup.name} />
        </div>

        <div className="form-row">
          <label>Email*</label>
          <input onChange={handleChange2} type="email" name='email' value={signup.email} />
        </div>

        <div className="form-row">
          <label>Password*</label>
          <input onChange={handleChange2} type="password" name='password' value={signup.password} />
        </div>

        <div className="form-row">
          <label>Confirm password*</label>
          <input onChange={handleChange2} type="password" name='Cpassword' value={signup.Cpassword} />
        </div>

        <button onClick={handleSignup} id="create-btn">Create</button>

      </div>
    </>
  )
}

export default Signup