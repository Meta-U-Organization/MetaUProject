import { useContext } from "react";
import "./App.css";
import Navigation from "./components/nav";
import { Context } from "./App";
import usePostCreation from "./utils/usePostCreation";
//main page layout for the page
function PostCreationPage() {
  const { user } = useContext(Context);
  const { loading, fetchPostCreation } = usePostCreation();
  const makePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("newPostForm"));
    const type = Object.fromEntries(formData).type;
    formData.delete("type");
    const readableData = Object.fromEntries(formData);
    fetchPostCreation(user.id, JSON.stringify(readableData), type);
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
          <label htmlFor="">Photo</label>
          <input type="text" name="photo" id="photo"></input>
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
