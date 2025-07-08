import { useNavigate } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import { Context } from "./App";
//main page layout for the page
function LoginPage() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const mainPage = `${import.meta.env.VITE_BASE_URL}`;
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { setUser } = useContext(Context);

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
      window.location.href = mainPage;
    }
  };

  return (
    <div>
      <header>
        <nav>
          <a href={mainPage}> Home</a>
        </nav>
        <h1>Login</h1>
      </header>
      <main>
        <form id="login" style={{ display: "flex", flexDirection: "column" }}>
          <a href={itemsPage}>Sign in with Google</a>
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
        </form>
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default LoginPage;
