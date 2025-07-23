import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { Context } from "../App";
import useLogout from "../utils/useLogout";
import { socket } from "../utils/socket";
//main page layout for the page
function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(Context);
  const { fetchLogout } = useLogout();

  const logOut = async (event) => {
    event.preventDefault();
    fetchLogout();
    sessionStorage.clear();
    socket.emit("logout", user.id);
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
