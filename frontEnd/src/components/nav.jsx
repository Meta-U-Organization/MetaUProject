import "../App.css";
//main page layout for the page
function Navigation() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const postCreationPage = `${import.meta.env.VITE_BASE_URL}makeAPost`;
  const settingsPage = `${import.meta.env.VITE_BASE_URL}settings`;
  const savedPage = `${import.meta.env.VITE_BASE_URL}saved`;
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
        href={settingsPage}
      >
        Settings
      </a>
    </nav>
  );
}

export default Navigation;
