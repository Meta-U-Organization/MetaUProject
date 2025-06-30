import { useState } from "react";
import "./App.css";
import Item from "./components/Item";
import Navigation from "./components/nav";
import { useEffect } from "react";
//This page will use a session to store user Id and will be specific to them, this is a base implimentation
function MyPosts() {
  const [isDonationList, setIsDonationList] = useState(true);
  const [updatePosts, setUpdatePosts] = useState(true);
  const [user, setUser] = useState({ donationPosts: [], requestPosts: [] });
  const backendUrl = import.meta.env.VITE_BACKEND;

  const changeItemType = () => {
    if (isDonationList) {
      document.getElementById("changeItemButton").innerHTML = "Go to Donations";
    } else {
      document.getElementById("changeItemButton").innerHTML = "Go to Requests";
    }
    setIsDonationList(!isDonationList);
  };

  useEffect(() => {
    fetch(`${backendUrl}users/2`)
      .then((response) => response.json())
      .then((user) => setUser(user))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [isDonationList, updatePosts]);
  return (
    <div>
      <header>
        <Navigation />
        <h1>My Posts</h1>
        <button id="changeItemButton" onClick={changeItemType}>
          Go to Requests
        </button>
      </header>
      <main>
        {isDonationList
          ? user.donationPosts.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={"2"}
                  postType={"donations"}
                  isMyPost={true}
                  item={item}
                  key={item.id}
                />
              );
            })
          : user.requestPosts.map((item) => {
              return (
                <Item
                  onPostChange={setUpdatePosts}
                  updatePosts={updatePosts}
                  userId={"2"}
                  postType={"requests"}
                  isMyPost={true}
                  title={item.title}
                  description={item.description}
                  key={item.id}
                  postId={item.id}
                  useState={item.useState}
                />
              );
            })}
      </main>
      <footer>
        Made by <a href="https://coff.ee/maheshbachu"> Mahesh Bachu</a>
      </footer>
    </div>
  );
}

export default MyPosts;
