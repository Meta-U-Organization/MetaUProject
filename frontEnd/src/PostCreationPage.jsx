import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function PostCreationPage() {
  const backendUrl = import.meta.env.VITE_BACKEND;

  const makePost = async (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("newPostForm"));
    let readableData = Object.fromEntries(formData);
    formData.delete("type");
    if (readableData.type === "donation") {
      readableData = Object.fromEntries(formData);
      const response = await fetch(`${backendUrl}users/2/donations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readableData),
      });
    } else {
      readableData = Object.fromEntries(formData);
      const response = await fetch(`${backendUrl}users/2/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(readableData),
      });
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
            <option value="donation">Donation</option>
            <option value="request">Request</option>
          </select>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title"></input>
          <label htmlFor="description">Description</label>
          <input type="text" name="description" id="description"></input>
          <label htmlFor="">Photo</label>
          <input type="text" name="photo" id="photo"></input>
          <label htmlFor="useState">Use State</label>
          <select name="useState" id="useState">
            <option value="Used">Used</option>
            <option value="Used Like New">Used Like New</option>
            <option value="New">New</option>
          </select>
          <button onClick={makePost} type="submit">
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

export default PostCreationPage;
