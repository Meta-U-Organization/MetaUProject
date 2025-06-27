import { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import Navigation from "./components/nav";
import { useEffect } from "react";
//main page layout for the page
function DonationAndRequestPage() {
  const [isDonationItem, setIsDonationItem] = useState(true);
  const [users, setUsers] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND;

  const changeItemType = () => {
    if (isDonationItem) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationItem(!isDonationItem);
  };

  useEffect(() => {
    fetch(`${backendUrl}users`)
      .then((response) => response.json())
      .then((users) => setUsers(users))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [isDonationItem]);
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
        {users.map((user) => {
          if (isDonationItem) {
            return user.donationPosts.map((item) => {
              return (
                <Item
                  title={item.title}
                  description={item.description}
                  key={item.id}
                  useState={item.useState}
                />
              );
            });
          } else {
            return user.requestPosts.map((item) => {
              return (
                <Item
                  title={item.title}
                  description={item.description}
                  key={item.id}
                  useState={item.useState}
                />
              );
            });
          }
        })}
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default DonationAndRequestPage;
