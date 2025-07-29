import { useNavigate } from "react-router-dom";
import "../App.css";
import { useContext } from "react";
import { Context } from "../App";
import useLogout from "../utils/useLogout";
//main page layout for the page
function Navigation() {
  const navigate = useNavigate();
  const { signedInUser, setSignedInUser } = useContext(Context);
  const signedInUserId = signedInUser.id;
  const { fetchLogout } = useLogout();

  const logOut = async (event) => {
    event.preventDefault();
    fetchLogout(JSON.stringify({id : signedInUserId}));
    sessionStorage.clear();
    setSignedInUser(null);
    navigate("/login");
  };

  return (
    <nav>
      <button className="buttonStyle"
        onClick={() => {
          navigate("/makeAPost");
        }}
      >
        Make a Post
      </button>
      <button className="buttonStyle"
        onClick={() => {
          navigate("/items");
        }}
      >
        Donations & Requests
      </button>

      <button className="buttonStyle"
        onClick={() => {
          navigate("/saved");
        }}
      >
        Saved
      </button>
      <button className="buttonStyle"
        onClick={() => {
          navigate("/myPosts");
        }}
      >
        My Posts
      </button>
      <button className="buttonStyle"
        onClick={() => {
          navigate("/settings");
        }}
      >
        Settings
      </button>
      <button className="buttonStyle" onClick={logOut}>Log Out</button>
    </nav>
  );
}

export default Navigation;
