import { useNavigate } from "react-router-dom";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "./App";
import useCCFetch from "./utils/useCCFetch";
//main page layout for the page
function LoginPage() {
  const navigate = useNavigate();
  const { setUser, backendUrl } = useContext(Context);
  const [loaded, setLoaded] = useState(false);
  const { fetchData, data, update, errorMsg } = useCCFetch();
  useEffect(() => {
    if (!loaded || (data == null && errorMsg == null)) {
      setLoaded(true);
      return;
    } else if (data?.message === "Login successful!") {
      setUser(data.user);
      navigate("/");
    } else if (errorMsg) {
      alert("Username and password are required.");
    }
  }),
    [update];

  const loginFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("login"));
    const readableData = Object.fromEntries(formData);
    fetchData(`${backendUrl}/login`, "POST", JSON.stringify(readableData));
  };

  return (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        <form id="login" style={{ display: "flex", flexDirection: "column" }}>
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
