import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function SavedPage() {
  return (
    <div>
      <header>
        <Navigation />
        <h1>Saved</h1>
      </header>
      <main></main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default SavedPage;
