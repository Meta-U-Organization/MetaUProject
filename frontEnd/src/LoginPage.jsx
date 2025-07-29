import { useNavigate } from "react-router-dom";
import "./App.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "./App";
import useLogin from "./utils/useLogin";
import { socket } from "./utils/socket.js";
//main page layout for the page
function LoginPage() {
  const navigate = useNavigate();
  const { setSignedInUser } = useContext(Context);
  const { fetchLogin, confirmMessage, user, errorMsg } = useLogin();

  useEffect(() => {
    if (confirmMessage === "Login successful!") {
      sessionStorage.setItem("user", JSON.stringify(user));
      setSignedInUser(user);
      socket.emit("newUser", user.id);
      navigate("/items");
    }
  }, [confirmMessage]);
  const loginFunc = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("login"));
    const readableData = Object.fromEntries(formData);
    await fetchLogin(JSON.stringify(readableData));
  };

  return (
    <div>
      <header>
        <h1>Login</h1>
      </header>
      <main>
        {errorMsg !== null && <h3>{errorMsg}</h3>}
        <form id="login" style={{ display: "flex", flexDirection: "column" }}>
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Username"></input>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            name="password"
            placeholder="Enter your password"
          ></input>
          <button className="buttonStyle" type="submit" onClick={loginFunc}>
            Submit
          </button>
          <button className="buttonStyle"
            onClick={() => {
              navigate("/signUp");
            }}
          >
            Dont have an account?
          </button>
        </form>
      </main>
    </div>
  );
}

export default LoginPage;
