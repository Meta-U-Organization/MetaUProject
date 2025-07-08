import { useNavigate } from "react-router-dom";
import "../App.css";
//main page layout for the page
function Navigation() {
  const navigate = useNavigate();

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
    </nav>
  );
}

export default Navigation;
