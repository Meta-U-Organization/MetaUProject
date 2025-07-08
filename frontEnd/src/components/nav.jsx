import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { Context } from "../App";
//main page layout for the page
function Navigation() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND;
  const { setUser } = useContext(Context);

  const logOut = async (event) => {
    event.preventDefault();
    await fetch(`${backendUrl}logout`, {
      method: "POST",
      credentials: "include",
    });
    sessionStorage.clear();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <button
        onClick={() => {
          navigate("/makeAPost");
        }}
      >
        Make a Post
      </button>
      <button
        onClick={() => {
          navigate("/items");
        }}
      >
        Donations & Requests
      </button>

      <button
        onClick={() => {
          navigate("/saved");
        }}
      >
        Saved
      </button>
      <button
        onClick={() => {
          navigate("/myPosts");
        }}
      >
        My Posts
      </button>
      <button
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </button>
      <button onClick={logOut}>Log Out</button>
    </nav>
  );
}

export default Navigation;
