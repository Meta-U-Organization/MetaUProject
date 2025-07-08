import { useState } from "react";
import "./App.css";
import Navigation from "./components/nav";
//main page layout for the page
function MainPage() {
  return (
    <div>
      <header>
        <Navigation />
        <h1>Community Chest</h1>
      </header>
      <main>
        <section>
          <h2>Donate</h2>
        </section>
        <section>
          <h2>Request</h2>
        </section>
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default MainPage;
