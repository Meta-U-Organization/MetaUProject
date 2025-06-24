import "../App.css";
//main page layout for the page
function Navigation() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const postCreationPage = `${import.meta.env.VITE_BASE_URL}makeAPost`;
  const settingsPage = `${import.meta.env.VITE_BASE_URL}settings`;
  const savedPage = `${import.meta.env.VITE_BASE_URL}saved`;
  return (
    <nav>
      <a href={postCreationPage}>Make a Post</a>
      <a href={settingsPage}>Settings</a>
      <a href={itemsPage}>Donation / Requests</a>
      <a href={savedPage}>Saved</a>
    </nav>
  );
}

export default Navigation;
