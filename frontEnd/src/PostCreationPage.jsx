import { useContext } from "react";
import "./App.css";
import Navigation from "./components/nav";
import { Context } from "./App";
import usePostCreation from "./utils/usePostCreation";
import { socket } from "./utils/socket";
//main page layout for the page
function PostCreationPage() {
  const { signedInUser } = useContext(Context);
  const { loading, fetchPostCreation } = usePostCreation();
  const makePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("newPostForm"));
    const type = Object.fromEntries(formData).type;
    formData.delete("type");
    const readableData = Object.fromEntries(formData);
    readableData.type = "New Donation In Your Area";
    readableData.notificationDescription = `${signedInUser.username} in your area posted a new item titled: ${readableData.title}`
    readableData.areaId = signedInUser.areaId;
    fetchPostCreation(signedInUser.id, JSON.stringify(readableData), type);

    const inputs = document.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++){
      inputs[i].value = "";
    }

  };

  return (
    <div>
      <header>
        <Navigation />
        <h1>Make a Post</h1>
      </header>
      <main>
        <form
          id="newPostForm"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <label htmlFor="type">Post Type</label>
          <select name="type" id="type">
            <option value="donations">Donation</option>
            <option value="requests">Request</option>
          </select>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title"></input>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description"></input>
          <label htmlFor="itemState">Use State</label>
          <select name="itemState" id="itemState">
            <option value="Used">Used</option>
            <option value="Used Like New">Used Like New</option>
            <option value="New">New</option>
          </select>
          {loading ? (
            <h3>Loading...</h3>
          ) : (
            <button onClick={makePost} type="submit">
              Submit
            </button>
          )}
        </form>
      </main>
    </div>
  );
}

export default PostCreationPage;
