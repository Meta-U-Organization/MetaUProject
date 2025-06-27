import { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import Navigation from "./components/nav";
//main page layout for the page
function DonationAndRequestPage() {
  const [itemType, setItemType] = useState(true);
  const backednUrl = import.meta.env.VITE_BACKEND;

  const changeItemType = () => {
    if (itemType) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setItemType(!itemType);
  };

  return (
    <div>
      <header>
        <Navigation />
        <h1>Items in Your Area</h1>
        <button id="changeItemButton" onClick={changeItemType}>
          Go to Requests
        </button>
      </header>
      <main>
        <Item />
        <Item />
        <Item />
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default DonationAndRequestPage;
