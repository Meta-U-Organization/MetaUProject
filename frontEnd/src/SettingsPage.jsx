import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function SettingsPage() {
  return (
    <div>
      <header>
        <Navigation />
        <h1>Settings</h1>
      </header>
      <main></main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default SettingsPage;
