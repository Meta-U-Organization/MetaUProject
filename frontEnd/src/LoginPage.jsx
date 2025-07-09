import { useNavigate } from "react-router-dom";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "./App";
import useCCFetch from "./utils/utils";
//main page layout for the page
function LoginPage() {
  const navigate = useNavigate();
  const { setUser, backendUrl } = useContext(Context);
  const [trig, setTrig] = useState(1);
  let run = 1;
  const { fetchData, data } = useCCFetch();
  useEffect(() => {
    run++;
    if (trig === 1 || data == null) {
      return;
    } else if (data.message === "Login successful!") {
      setUser(data.user);
      navigate("/");
    } else if (data.message === "Username and password are required.") {
      alert("Username and password are required.");
    } else if (data.message === "Invalid Username") {
      alert("Invalid Username");
    } else {
      window.location.href = mainPage;
    }
  }),
    [trig];

  const loginFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("login"));
    const readableData = Object.fromEntries(formData);
    fetchData(`${backendUrl}/login`, "POST", JSON.stringify(readableData));
    setTrig(trig + 1);
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
