import "../App.css";
//main page layout for the page
function Navigation() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const postCreationPage = `${import.meta.env.VITE_BASE_URL}makeAPost`;
  const settingsPage = `${import.meta.env.VITE_BASE_URL}settings`;
  const savedPage = `${import.meta.env.VITE_BASE_URL}saved`;
  const myPosts = `${import.meta.env.VITE_BASE_URL}myPosts`;
  const backendUrl = import.meta.env.VITE_BACKEND;
  const logOut = async (event) => {
    event.preventDefault();
    await fetch(`${backendUrl}logout`, {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/"; // Redirect to homepage
  };
  return (
    <nav>
      <a
        style={{
          border: "1px solid black",
          padding: "3px",
          borderRadius: "5px",
          margin: "5px",
        }}
        href={postCreationPage}
      >
        Make a Post
      </a>
      <a
        style={{
          border: "1px solid black",
          padding: "3px",
          borderRadius: "5px",
          margin: "5px",
        }}
        href={itemsPage}
      >
        Donation / Requests
      </a>
      <a
        style={{
          border: "1px solid black",
          padding: "3px",
          borderRadius: "5px",
          margin: "5px",
        }}
        href={savedPage}
      >
        Saved
      </a>
      <a
        style={{
          border: "1px solid black",
          padding: "3px",
          borderRadius: "5px",
          margin: "5px",
        }}
        href={myPosts}
      >
        My Posts
      </a>
      <a
        style={{
          border: "1px solid black",
          padding: "3px",
          borderRadius: "5px",
          margin: "5px",
        }}
        href={settingsPage}
      >
        Settings
      </a>
      <button onClick={logOut}>Log Out</button>
    </nav>
  );
}

export default Navigation;
