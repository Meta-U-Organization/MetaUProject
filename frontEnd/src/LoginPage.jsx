import { useNavigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { Context } from "./App";
//main page layout for the page
function LoginPage() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const setUser = useContext(Context).setUser;

  const loginFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("login"));
    const readableData = Object.fromEntries(formData);
    const response = await fetch(`${backendUrl}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(readableData),
      credentials: "include",
    });

    const result = await response.json();
    if (result.message === "Login successful!") {
      setUser(result.user);
      navigate("/");
    } else if (result.message === "Username and password are required.") {
      alert("Username and password are required.");
    } else if (result.message === "Invalid Username") {
      alert("Invalid Username");
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <header>
        <nav>
          <a href=""> Home</a>
        </nav>
        <h1>Login</h1>
      </header>
      <main>
        <form id="login" style={{ display: "flex", flexDirection: "column" }}>
          <a href="">Sign in with Google</a>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username"></input>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
          ></input>
          <button type="submit" onClick={loginFunc}>
            Submit
          </button>
          <button
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Dont have an account?
          </button>
        </form>
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default LoginPage;
