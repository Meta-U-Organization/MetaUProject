import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function PostCreationPage() {
  const itemsPage = `${import.meta.env.VITE_BASE_URL}items`;
  const settingsPage = `${import.meta.env.VITE_BASE_URL}settings`;
  return (
    <div>
      <header>
        <Navigation />
        <h1>Community Chest</h1>
      </header>
      <main></main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default PostCreationPage;
